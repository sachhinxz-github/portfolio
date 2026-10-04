# Sachin S. S — Portfolio

Personal portfolio: a single-page React app with an interactive terminal, a Ctrl/⌘ + K command palette, dark and light themes, a live GitHub feed and a working contact form.

Live: https://sachin-techfolio.netlify.app/

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion

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
