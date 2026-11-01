import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const quickLinks = [
  { label: "Home", href: "#top" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const connectLinks = [
  { label: "GitHub", href: "https://github.com/chiragsharma6873", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/chirag-sharma-167b44256", external: true },
  { label: "Email", href: "mailto:chirag0616sharma@gmail.com" },
];

export default function Footer() {
  const footRef = useRef(null);

  // The big CHIRAG watermark drifts into place as the footer scrolls in.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".x-wm",
          { x: -40, y: 60 },
          {
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: footRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: footRef },
  );

  return (
    <footer className="x-foot" ref={footRef}>
      <div className="x-wrap">
        <div className="x-foot__grid">
          <p className="x-tag reveal">
            <span>Creative Mindset.</span>
            <br />
            <span>Development Skills.</span>
            <br />
            <span className="x-lime">Problem Solving.</span>
          </p>

          <div className="reveal">
            <h3 className="x-mono">Quick links</h3>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal">
            <h3 className="x-mono">Connect me on</h3>
            <ul>
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="x-wm" aria-hidden="true">
          CHIRAG
        </p>

        <div className="x-foot__bottom">
          <p className="x-mono">
            © {new Date().getFullYear()} Chirag Sharma · Designed &amp; built with care.
          </p>
          <a className="x-mono x-totop" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
