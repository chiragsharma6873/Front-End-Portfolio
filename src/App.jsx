import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  const appRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Scroll reveals: anything with .reveal fades up as it enters the viewport.
      // Elements entering together are staggered as one batch.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".reveal", { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(".reveal", {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });
      });

      // Magnetic buttons (mouse / trackpad only).
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const cleanups = gsap.utils.toArray(".x-mag").map((btn) => {
            const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
            const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
            const move = (e) => {
              const r = btn.getBoundingClientRect();
              xTo((e.clientX - r.left - r.width / 2) * 0.25);
              yTo((e.clientY - r.top - r.height / 2) * 0.35);
            };
            const leave = () => {
              xTo(0);
              yTo(0);
            };
            btn.addEventListener("mousemove", move);
            btn.addEventListener("mouseleave", leave);
            return () => {
              btn.removeEventListener("mousemove", move);
              btn.removeEventListener("mouseleave", leave);
            };
          });
          return () => cleanups.forEach((fn) => fn());
        },
      );
    },
    { scope: appRef },
  );

  return (
    <div ref={appRef} className="site-shell" id="top">
      <a className="x-skip" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <Projects />
        <About />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <Cursor />
    </div>
  );
}
