# Portfolio Site

This repository contains a Next.js portfolio site prepared for deployment on Vercel.

## Stack

- Next.js 15
- React 19
- App Router
- CSS Modules

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Domain Configuration

Set your production domain in an environment variable before deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

You can copy `.env.example` to `.env.local` for local testing.

The site uses this value for:

- `metadataBase`
- `/robots.txt`
- `/sitemap.xml`

## Deploy To Vercel

1. Push this repository to GitHub.
2. Create a new project in Vercel and import the repository.
3. Confirm the framework is detected as `Next.js`.
4. Add the environment variable `NEXT_PUBLIC_SITE_URL` in Vercel:
   `Project Settings -> Environment Variables`
5. Deploy.

## Connect Your Custom Domain

1. Open your Vercel project.
2. Go to `Settings -> Domains`.
3. Add your purchased domain.
4. Follow Vercel's DNS instructions at your domain registrar.
5. After DNS propagates, keep `NEXT_PUBLIC_SITE_URL` set to the final production domain.

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://portfolio.yourdomain.com
```

## Notes

- Static assets are served from `public/framer-assets`.
- `legacy-reference/` is reference material only and is not part of the app runtime.
- The site now generates `robots.txt` and `sitemap.xml` from the App Router instead of shipping hard-coded files.
