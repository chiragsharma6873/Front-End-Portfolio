const groups = [
  {
    title: "01 / Core",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Mobile-First", "Accessibility"],
  },
  {
    title: "02 / Frameworks & libraries",
    items: ["React", "React Hooks", "React Router", "Tailwind CSS", "Bootstrap", "DaisyUI", "React Bits"],
  },
  {
    title: "03 / Tools, motion & data",
    items: ["Git", "GitHub", "Vite", "GSAP", "Framer Motion", "MongoDB", "MySQL", "API Integration"],
  },
];

const values = [
  "Performance Optimization",
  "Cross-Browser Compatibility",
  "State Management",
  "Clean Code",
  "Debugging & DevTools",
];

export default function Skills() {
  return (
    <section className="x-sec" id="skills">
      <div className="x-wrap">
        <div className="x-sec__head">
          <div className="reveal">
            <p className="x-mono">03 / My toolkit</p>
            <h2 className="x-h2">
              Tools of the <span className="x-lime">trade.</span>
            </h2>
          </div>
          <p className="x-side reveal">
            The technologies I use to bring web interfaces to life.
          </p>
        </div>

        <div className="x-skills">
          {groups.map((group) => (
            <div className="x-skill" key={group.title}>
              <p className="x-mono reveal">{group.title}</p>
              <ul className="x-pills">
                {group.items.map((item) => (
                  <li className="x-pill reveal" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="x-care">
          <h3 className="x-mono reveal">What I care about</h3>
          <ul className="x-pills">
            {values.map((item) => (
              <li className="x-pill reveal" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
