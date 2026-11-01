import AccordionGallery from "./AccordionGallery";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="x-sec" id="work">
      <div className="x-wrap">
        <div className="x-sec__head">
          <div className="reveal">
            <p className="x-mono">01 / Selected work</p>
            <h2 className="x-h2">
              Things I've <span className="x-lime">built.</span>
            </h2>
          </div>
          <p className="x-side reveal">
            Five responsive front-end projects, from storefronts to editorial
            landing pages.
          </p>
        </div>

        <div className="reveal">
          <AccordionGallery items={projects} />
        </div>
        <p className="x-mono x-hint reveal">Hover or focus a panel to open it</p>
      </div>
    </section>
  );
}
