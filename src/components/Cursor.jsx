import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Custom cursor: a small dot plus a lime ring that trails it and grows over links.
// Only on mouse/trackpad devices and when reduced motion is not requested.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [onLink, setOnLink] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
      () => {
        const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "power3.out" });
        const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "power3.out" });
        const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" });
        const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" });
        let shown = false;

        const move = (e) => {
          if (!shown) {
            shown = true;
            gsap.set([dotRef.current, ringRef.current], { x: e.clientX, y: e.clientY });
            setVisible(true);
          }
          dotX(e.clientX);
          dotY(e.clientY);
          ringX(e.clientX);
          ringY(e.clientY);
        };
        const leave = () => {
          shown = false;
          setVisible(false);
        };
        const over = (e) => {
          setOnLink(!!e.target.closest("a, button, .ag-panel:not(.ag-panel--active)"));
        };

        document.addEventListener("mousemove", move);
        document.documentElement.addEventListener("mouseleave", leave);
        document.addEventListener("mouseover", over);
        return () => {
          document.removeEventListener("mousemove", move);
          document.documentElement.removeEventListener("mouseleave", leave);
          document.removeEventListener("mouseover", over);
          setVisible(false);
        };
      },
    );
  });

  return (
    <>
      <div ref={dotRef} className={`x-cursor${visible ? " is-on" : ""}`} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`x-cursor-ring${visible ? " is-on" : ""}${onLink ? " is-link" : ""}`}
        aria-hidden="true"
      />
    </>
  );
}
