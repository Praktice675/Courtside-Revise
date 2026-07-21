Courtside is an NBA scouting and analytics platform built with [Next.js](https://nextjs.org). See [`docs/`](docs/) for product and engineering documentation.

## Prerequisites

This project standardizes on **Node.js 24.18.0** (Active LTS) and **npm** as the only supported package manager. See [Decision Log D-14](docs/DECISION_LOG.md).

Activate the pinned runtime with [nvm](https://github.com/nvm-sh/nvm) — both commands read `.nvmrc`:

```bash
nvm install   # installs Node.js 24.18.0 (with npm 11.16.0 bundled)
nvm use
```

Not using nvm? Install **Node.js 24.18.0** directly from [nodejs.org](https://nodejs.org). Confirm your versions:

```bash
node --version   # v24.18.0
npm --version    # 11.16.0
```

## Getting Started

Install dependencies from the committed lockfile, then start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
npm run dev         # start the development server
npm run typecheck   # type-check with tsc --noEmit (no build, no files emitted)
npm run lint        # run ESLint
npm test            # run the unit tests once (Vitest, finite run)
npm run test:watch  # run the unit tests in watch mode
npm run test:e2e    # run the Playwright E2E smoke tests (builds and serves the app)
npm run test:e2e:ui # run the E2E tests in the Playwright UI (local debugging)
npm run build       # create a production build
npm run start       # serve the production build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
