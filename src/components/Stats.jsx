import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const stats = [
  { value: 5, suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 2025, from: 2000, label: "BCA graduate" },
  { value: 100, suffix: "%", label: "Responsive builds" },
];

export default function Stats() {
  const statsRef = useRef(null);

  // Count each number up once the strip scrolls into view.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".x-count").forEach((el) => {
          const to = Number(el.dataset.count);
          const counter = { val: Number(el.dataset.from || 0) };
          el.textContent = counter.val;
          gsap.to(counter, {
            val: to,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 88%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(counter.val);
            },
          });
        });
      });
    },
    { scope: statsRef },
  );

  return (
    <section className="x-stats" aria-label="At a glance" ref={statsRef}>
      <div className="x-wrap x-stats__grid">
        {stats.map((stat) => (
          <div className="x-stat reveal" key={stat.label}>
            <span className="x-stat__fig">
              <span className="x-count" data-count={stat.value} data-from={stat.from || 0}>
                {stat.value}
              </span>
              {stat.suffix ? <i>{stat.suffix}</i> : null}
            </span>
            <span className="x-mono">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
