import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section className="x-sec" id="about">
      <div className="x-wrap x-about">
        {/* Left side: photo */}
        <figure className="x-photo reveal">
          <div className="x-photo__frame">
            <img src="/image3.jpg" alt="Portrait of Chirag Sharma" loading="lazy" />
          </div>
          <figcaption className="x-mono">Chirag Sharma · New Delhi</figcaption>
        </figure>

        {/* Right side: heading and copy */}
        <div>
          <p className="x-mono reveal">02 / About me</p>
          <h2 className="x-h2 reveal">
            Curious by nature.
            <br />
            <span className="x-lime">Developer by choice.</span>
          </h2>
          <p className="x-lead reveal">
            I'm a front-end developer who enjoys turning ideas into useful,
            polished digital experiences.
          </p>
          <p className="x-body-copy reveal">
            A 2025 BCA graduate from Chaudhary Charan Singh University, I build
            responsive, user-friendly and visually engaging web applications
            with React, JavaScript and Tailwind CSS, with a focus on clean,
            maintainable code, accessibility and motion. I'm now expanding into
            the back end with Node.js, Express.js and REST APIs to build
            full-stack applications, and I'm eager to contribute to real-world
            projects.
          </p>
          <div className="reveal">
            <a
              className="x-tlink"
              href="https://www.linkedin.com/in/chirag-sharma-167b44256"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
