# Chirag Sharma — Portfolio (React + GSAP)

Personal portfolio built with **React 19**, **Vite 6**, **GSAP** (`useGSAP` + `ScrollTrigger`), Tailwind CSS v4 (available, styles are mostly plain CSS) and `lucide-react` icons.

## Run locally

Requires Node.js 18+ (20 or 22 recommended).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Project structure

```
index.html                 fonts (Space Grotesk, DM Mono) + root element
public/                    Resume.pdf and images (served from /)
src/main.jsx               React entry
src/App.jsx                page layout, scroll reveals, magnetic buttons
src/index.css              all site styles (Tailwind imported at the top)
src/data/projects.js       the 5 projects shown in the Work accordion
src/components/
  Navbar.jsx               sticky nav, blur on scroll, mobile menu
  Hero.jsx                 masked line intro + orbit art
  Stats.jsx                animated counters
  Projects.jsx             "Things I've built" section
  AccordionGallery.jsx/.css  GSAP accordion of project panels
  ProjectCard.jsx          text + links inside an open project panel
  About.jsx  Skills.jsx  Journey.jsx  Contact.jsx  Footer.jsx
  Cursor.jsx               custom cursor (mouse/trackpad only)
```

To add or edit a project, change `src/data/projects.js` (put local images in `public/` and reference them as `/file.png`).

All motion respects `prefers-reduced-motion`: with it on, content shows immediately with no GSAP animation.

## Deploy to Netlify

**Option A — Git:** push this folder to GitHub, then in Netlify choose *Add new site → Import an existing project* and set:

- Build command: `npm run build`
- Publish directory: `dist`

**Option B — drag and drop:** run `npm run build` locally and drag the `dist/` folder onto https://app.netlify.com/drop.
