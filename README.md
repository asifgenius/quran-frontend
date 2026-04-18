# Quran Web App

Frontend for the Quran assignment project.

## Stack

- Next.js
- TypeScript
- Tailwind CSS

## Requirements

- Node.js 20+ or Bun
- The backend running locally

## Run locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev -- --port 4020
```

Open `http://localhost:4020`.

## Build and run

```bash
npm run build
npm run start
```

## Environment

The app can run without env vars if the backend is available at `http://localhost:4000`.

If you want to point the frontend to a different API URL, copy the example file:

```bash
cp .env.example .env.local
```

Available value:

- `NEXT_PUBLIC_QURAN_API_URL` - API base URL used by the app

The server-side code falls back to this same value, so one variable is enough for normal local work.

## Notes

- Search and pagination are backed by the API
- Settings are saved in local storage
