# Sachin S. S — Portfolio

Personal portfolio: a motorsport-inspired, single-page React app — oversized editorial typography, racing-green and lime accents, an interactive terminal, a Ctrl/⌘ + K command palette, a live GitHub feed and a working contact form.

Live: https://sachin-techfolio.netlify.app/

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Archivo / Inter / JetBrains Mono (self-hosted via Fontsource)

## Run it locally

```bash
npm install
npm run dev       # development server
npm run build     # type-check and build into dist/
npm run preview   # serve the production build
```

## Updating the content

Everything the site says lives in [`src/data/portfolio.ts`](src/data/portfolio.ts): profile, experience, projects, skills, education and achievements. Edit that file and every section, the terminal and the command palette pick the change up.

- Résumé PDF: replace `public/Sachin_SS_Resume.pdf`.
- Images: add them under `src/assets/` and import them in `src/data/portfolio.ts`.

## Deploying

`netlify.toml` holds the build settings (`npm run build`, publish `dist`). The build uses relative asset paths, so `dist/` also works on GitHub Pages or any static host.
