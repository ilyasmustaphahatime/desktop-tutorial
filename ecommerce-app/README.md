# Ecommerce App

This project is a static React app built with Vite. It can be hosted on any static hosting platform.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

The production files will be generated in `dist/`.

## Fastest hosting options

### Vercel

1. Push this project to GitHub.
2. Go to Vercel and import the GitHub repository.
3. Keep the default settings:
   Build command: `npm run build`
   Output directory: `dist`
4. Deploy.

### Netlify

1. Push this project to GitHub.
2. Go to Netlify and add a new project from Git.
3. Use these settings:
   Build command: `npm run build`
   Publish directory: `dist`
4. Deploy.

### GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that deploys automatically on pushes to `master`.

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Source: GitHub Actions`.
4. Push to the `master` branch again, or run the workflow manually from the `Actions` tab.
5. Wait for the `Deploy to GitHub Pages` workflow to finish.

Your site URL will usually be:

- Project site: `https://username.github.io/repository-name/`
- User site: `https://username.github.io/`

The workflow automatically sets the correct Vite base path for both cases.

## Notes

- The app now uses Vite's `BASE_PATH` support, so assets can work on both root domains and subpaths.
- For Vercel or Netlify, you usually do not need to set `BASE_PATH`.
