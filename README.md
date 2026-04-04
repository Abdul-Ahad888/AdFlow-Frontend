# Ad Flow — Frontend

Single-page app for advertising workflows: dashboard analytics, clients, campaigns, creative briefs, and a creative toolkit UI. Light and dark themes, responsive layout.

## Stack

- **React 19** + **Vite 8**
- **React Router** (protected routes)
- **Tailwind CSS**
- **Framer Motion**, **Lucide React**, **Recharts**

## Features

- **Login** — auth flow with token stored in `localStorage`
- **Dashboard** — KPI cards, charts, recent campaign table (mock data)
- **Clients** & **Campaigns** — agency-style management views
- **Creative Brief Builder** — step-by-step brief workflow
- **Creative Engine** — copy, social, and hashtag assistant panels
- **Settings** — preferences

## Prerequisites

- **Node.js** 18+

## Setup

```bash
cd client
npm install
npm run dev
```

## Scripts

| Command           | Description              |
|-------------------|--------------------------|
| `npm run dev`     | Dev server (Vite + HMR)  |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`    | ESLint                   |

## Project layout

- `src/pages/` — screens (login, dashboard, brief builder, creative engine)
- `src/components/` — layout, domain UI, and creative subcomponents
- `src/mock/` — sample KPI and table data for the dashboard

## License

Private / unlicensed unless you add a `LICENSE` file at the repository root.
