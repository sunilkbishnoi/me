Vercel deployment checklist

1. Build command

   - Set the Vercel Project Build Command to:

     npm run build:vercel

   - Leave the Output Directory empty (Nitro uses the Output API).

2. Environment variables

   - Add any runtime environment variables used by the app (e.g., API keys).

3. Node version

   - This repo sets `engines.node` to `>=18.0.0`. Configure if you need a different Node version.

4. Local testing

   - Install deps and build locally:

     npm install
     npm run build:vercel

   - Run a local Vercel dev server:

     npx vercel dev

5. Troubleshooting

   - If the Nitro build fails, open the build log; common fixes: missing deps, env vars, or incompatible Node version.
   - If you intended a static-only site, remove `src/server.ts` and related Nitro config and use `npm run build`.
