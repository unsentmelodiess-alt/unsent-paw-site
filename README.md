# Pet Memory Studio

A responsive, English-language React and Tailwind web experience for pet memories, calming audio, gentle behavior guides, a searchable editorial Journal, and Etsy-based digital products.

## Stack

The project is a static React 19 application built with Vite, TypeScript, Tailwind CSS 4, shadcn/ui primitives, Lucide icons, and Wouter. It can be hosted on any static-compatible platform, including Vercel and GitHub Pages after choosing the correct output settings.

## Local development

```bash
pnpm install
pnpm dev
```

Open the address shown in the terminal. For a production check, run:

```bash
pnpm check
pnpm build
```

## Change the temporary brand

All important brand labels, external links, contact email, and asset URLs live in `client/src/config/site.ts`. Update `brandName`, `brandTagline`, and the links there once the final name is selected. This avoids hunting for the name across the UI.

## Connect Etsy

Replace `social.etsy` in `client/src/config/site.ts` with the Etsy shop URL or extend the `products` data in `client/src/pages/Home.tsx` with a distinct link for every listing. The storefront deliberately sends checkout and downloads to Etsy, leaving payment and digital fulfillment to Etsy.

## Manage the Journal

The six initial Journal articles are centralized in `client/src/data/journal.ts`. Add a new article object there to publish a searchable card and route automatically. The shared article template at `client/src/pages/JournalArticle.tsx` supplies a related listening prompt, an Etsy path, a safety note, and source links. Keep advice educational, cite dependable sources for factual claims, and avoid diagnosis or treatment claims.

## Important production note

The tribute wall is an interface prototype: submitted notes are stored only in the current browser session. A live public wall needs a backend, authenticated moderation tools, consent controls, secure image storage, deletion workflows, and a privacy policy. Do not collect public tributes in production without these safeguards.

## GitHub and Vercel

1. Create a new empty GitHub repository.
2. From this project directory, run `git init`, `git add .`, `git commit -m "Initial Pet Memory Studio"`, add the GitHub remote, then push the `main` branch.
3. Import the repository into Vercel. It will detect Vite. Use `pnpm build` as the build command and `dist/public` as the output directory if Vercel requests an output path.

No secrets are required for the current static prototype.
