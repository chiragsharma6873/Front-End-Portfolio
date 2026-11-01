import { ArrowDown } from "lucide-react";

const timeline = [
  {
    when: "Now",
    now: true,
    title: "Upskilling in back-end development",
    text: "Learning Node.js and Express.js, RESTful APIs, server-side architecture and MongoDB integration for full-stack, data-driven apps.",
  },
  {
    when: "2025",
    title: "BCA Graduate",
    text: "Chaudhary Charan Singh University (Management of Education, Sahibabad).",
  },
  {
    when: "Projects",
    title: "Shipped 5 responsive front-end projects",
    text: "E-commerce, fitness, space, restaurant and salon.",
  },
];

export default function Journey() {
  return (
    <section className="x-sec" id="journey">
      <div className="x-wrap x-journey">
        <div className="x-journey__side">
          <p className="x-mono reveal">04 / Journey</p>
          <h2 className="x-h2 reveal">
            Where I'm <span className="x-lime">headed.</span>
          </h2>
          <p className="reveal">Education, shipped work, and what I'm learning now.</p>
          {/* wrapper takes the reveal so the button's own transform stays free for the magnetic effect */}
          <div className="reveal">
            <a className="x-btn x-mag" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
              Download resume <span className="x-arr x-arr--down"><ArrowDown size={17} /></span>
            </a>
          </div>
        </div>

        <ol className="x-tl">
          {timeline.map((item) => (
            <li className={`reveal${item.now ? " is-now" : ""}`} key={item.title}>
              <p className="x-tl__when x-mono">
                <span className={item.now ? "x-pulse" : "x-dot"} aria-hidden="true" />
                {item.when}
              </p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
