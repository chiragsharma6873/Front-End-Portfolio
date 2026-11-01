import { ArrowUpRight } from "lucide-react";

// The text inside an open accordion panel: title, type, description, stack and links.
export default function ProjectCard({ project, barRef, bodyRef }) {
  return (
    <div className="ag-panel__body" ref={bodyRef}>
      <div className="x-bar" ref={barRef} />
      <h3>{project.title}</h3>
      <p className="ag-panel__type x-mono">{project.type}</p>
      <p className="ag-panel__desc">{project.description}</p>
      <ul className="x-pills">
        {project.stack.map((item) => (
          <li key={item} className="x-pill">
            {item}
          </li>
        ))}
      </ul>
      <div className="ag-panel__btns">
        {project.live ? (
          <a
            className="x-btn x-btn--lime x-btn--sm"
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live site <span className="x-arr"><ArrowUpRight size={15} /></span>
          </a>
        ) : null}
        {project.github ? (
          <a
            className="x-btn x-btn--sm"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span className="x-arr"><ArrowUpRight size={15} /></span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
