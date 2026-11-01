import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";
import "./AccordionGallery.css";

const DESKTOP_QUERY = "(min-width: 861px)";

const AccordionGallery = ({
  items = [],
  defaultIndex = 0,
  expandRatio = 5, // flex-grow of the open panel (closed panels are 1)
  tilt = 5, // degrees closed panels lean toward the open one
  duration = 0.8,
  ease = "expo.out",
  className = "",
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const labelRefs = useRef([]);
  const bodyRefs = useRef([]);
  const barRefs = useRef([]);
  const firstRunRef = useRef(true);

  const count = items.length;
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
  );
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia(DESKTOP_QUERY).matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // GSAP drives the whole accordion on desktop: panel width (flex-grow), 3D tilt,
  // image colour/scale and the text reveal. On small screens panels simply stack,
  // so every inline style GSAP added is cleared and plain CSS takes over.
  useGSAP(
    () => {
      const panels = panelRefs.current.filter(Boolean);
      if (!panels.length) return;

      if (!isDesktop) {
        gsap.killTweensOf([
          ...panels,
          ...mediaRefs.current,
          ...labelRefs.current,
          ...bodyRefs.current,
          ...barRefs.current,
        ]);
        gsap.set(
          [...panels, ...mediaRefs.current, ...labelRefs.current, ...bodyRefs.current, ...barRefs.current].filter(Boolean),
          { clearProps: "all" },
        );
        firstRunRef.current = true;
        return;
      }

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dur = firstRunRef.current || reduce ? 0 : duration;
      firstRunRef.current = false;

      panels.forEach((panel, i) => {
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const label = labelRefs.current[i];
        const body = bodyRefs.current[i];
        const bar = barRefs.current[i];

        gsap.to(panel, {
          flexGrow: isActive ? expandRatio : 1,
          rotateY: isActive ? 0 : i < active ? tilt : -tilt,
          opacity: isActive ? 1 : 0.6,
          duration: dur,
          ease,
          overwrite: "auto",
        });

        if (media) {
          gsap.to(media, {
            scale: isActive ? 1.04 : 1,
            "--ag-gray": isActive ? 0 : 1,
            "--ag-bright": isActive ? 1 : 0.55,
            duration: dur * 1.2,
            ease,
            overwrite: "auto",
          });
        }

        if (label) {
          gsap.to(label, { autoAlpha: isActive ? 0 : 1, duration: dur * 0.5, overwrite: "auto" });
        }

        if (body) {
          if (isActive) {
            gsap.fromTo(
              body,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: dur * 0.75, delay: dur ? 0.25 : 0, ease, overwrite: "auto" },
            );
            if (bar) {
              gsap.fromTo(
                bar,
                { scaleX: 0 },
                { scaleX: 1, duration: dur * 0.75, delay: dur ? 0.35 : 0, ease, overwrite: "auto" },
              );
            }
          } else {
            gsap.to(body, { autoAlpha: 0, y: 20, duration: dur * 0.4, overwrite: "auto" });
          }
        }
      });

      // Runs only when the component unmounts (or StrictMode re-mounts it):
      // the next mount should snap to its state instead of animating in.
      return () => {
        firstRunRef.current = true;
      };
    },
    { dependencies: [active, isDesktop, expandRatio, tilt, duration, ease], scope: rootRef },
  );

  const onKeyDown = (e, i) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight" && panelRefs.current[i + 1]) {
      e.preventDefault();
      panelRefs.current[i + 1].focus();
    }
    if (e.key === "ArrowLeft" && panelRefs.current[i - 1]) {
      e.preventDefault();
      panelRefs.current[i - 1].focus();
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${className ? ` ${className}` : ""}`}
    >
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <article
            key={item.title}
            ref={(el) => (panelRefs.current[i] = el)}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            tabIndex={0}
            aria-label={item.title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <img
              ref={(el) => (mediaRefs.current[i] = el)}
              className="ag-panel__media"
              src={item.image}
              alt={item.imageAlt || item.title}
              loading={i === 0 ? "eager" : "lazy"}
              draggable="false"
            />
            <span className="ag-panel__num x-mono">{item.number}</span>
            <span
              className="ag-panel__label"
              aria-hidden="true"
              ref={(el) => (labelRefs.current[i] = el)}
            >
              {item.title}
            </span>
            <ProjectCard
              project={item}
              bodyRef={(el) => (bodyRefs.current[i] = el)}
              barRef={(el) => (barRefs.current[i] = el)}
            />
          </article>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
