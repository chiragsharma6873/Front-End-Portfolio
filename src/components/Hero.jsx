import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import RotatingText from "./RotatingText"; // <-- Import the component

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out", duration: 1 },
        });
        tl.from(".x-intro--1", { autoAlpha: 0, y: 18 }, 0.05)
          .from(
            ".x-line > span",
            { yPercent: 108, duration: 1.1, stagger: 0.12 },
            0.25,
          )
          .from(".x-intro--2", { autoAlpha: 0, y: 18 }, 0.85)
          .from(".x-intro--3", { autoAlpha: 0, y: 18 }, 1)
          .from(".x-intro--4", { autoAlpha: 0, y: 18 }, 1.15);
      });
    },
    { scope: heroRef },
  );

  return (
    <section className="x-hero" id="home" aria-label="Intro" ref={heroRef}>
      <div className="x-wrap x-hero__grid">
        <div>
          <p className="x-eyebrow x-mono x-intro--1">
            <span className="x-status">
              <span className="x-pulse" aria-hidden="true" />
              Front-end developer · New Delhi, India
            </span>
          </p>

          <h1 className="x-title">
            <span className="x-line">
              <span>I build</span>
            </span>
            <span className="x-line">
              <span className="x-lime">Digital</span>
            </span>
            <span className="x-line">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25em",
                  flexWrap: "wrap",
                }}
              >
                <RotatingText
                  texts={["Ankush", "Chirag", "Manish", "Lakshay"]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-[#c6ff6b] text-black overflow-hidden py-0.5 sm:py-1 md:py-1 justify-center rounded-lg"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  rotationInterval={2000}
                />
                <span className="x-lime">.</span>
              </span>
            </span>
          </h1>

          <p className="x-hero__copy x-intro--2">
            I turn ideas into thoughtful, responsive web experiences with clean
            code, purposeful design, and a little motion.
          </p>

          <div className="x-hero__btns x-intro--3">
            <a className="x-btn x-btn--lime x-mag" href="#work">
              Explore my work{" "}
              <span className="x-arr">
                <ArrowUpRight size={17} />
              </span>
            </a>
            <a
              className="x-btn x-mag"
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume{" "}
              <span className="x-arr">
                <ArrowUpRight size={17} />
              </span>
            </a>
          </div>
        </div>

        {/* Updated Aside with flexible scale */}
        <aside
          className="x-aside x-intro--4"
          style={{ width: "100%", height: "100%" }}
        >
          <div
            className="x-video-wrap"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "400px",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <video
              src="/2.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
