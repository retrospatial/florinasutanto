---
title: How to Deploy a SvelteKit App to GitHub Pages
slug: deploy-sveltekit-to-gh-pages
desc: What it says on the tin.
cover: ''
date_published: 2026-03-01
tags:
  - dev
  - tutorial
---

This is the process I use to quickly set up a static SvelteKit app and publish it through GitHub Pages. This only works for simple, static sites—anything that requires code to run the server side (e.g. API calls that need to happen at runtime, anything with private keys) will not work with GH Pages.

## 1. Create a new project and set up the dependencies

```bash
npx sv create YOUR_REPO_NAME
```

My typical dependencies:

- Which template would you like? `SvelteKit minimal`
- Add type checking with TypeScript? `Yes, using Typescript syntax`
- What would you like to add to your project? `prettier`, `eslint`, `tailwindcss`, `sveltekit-adapter`, `mdsvex`
- Tailwindcss: Which plugins would you like to add? `typography`
- Sveltekit-adapter: Which SvelteKit adapter would you like to use? `static`
- Which package manager do you want to install dependencies with? `pnpm`

## 2. Make the following modifications to your codebase

- Install the gh-pages package

```bash
pnpm i -D gh-pages
```

- Replace the contents of `svelte.config.js` with the following:

```typescript filename: svelte.config.js
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */

export default {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		paths: {
			base: dev ? '' : '/YOUR_REPO_NAME'
		}
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};
```

If you're deploying to your root GitHub domain (e.g. username.github.io), remove `/YOUR_REPO_NAME` and leave it as an empty string (`''`).

- In `src/routes`, create a `+layout.ts` file and add: `export const prerender = true;`
- In `package.json`, under `scripts`, add: `"deploy": "pnpm run build && gh-pages -d build -t",`
- In the static folder, create an empty `.nojekyll` file. This is needed to bypass GitHub Pages' default use of Jekyll as the static site generator. If you skip this step, your Pages site will only display the contents of README.md.

## 3. Initialize git and push the repo (from the CLI)

```bash
git init -b main
git add .
git commit -m "Initial commit"
gh repo create YOUR_REPO_NAME --public --source=. --remote=origin --push
```

Or, if you've created the repo manually on GitHub's site, run these commands after committing:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 4. Deploy to the gh-pages branch

```bash
pnpm run deploy
```

## 5. Set up GitHub Pages

- Navigate to your repo on GitHub
- Go to Settings, then Pages on the left panel
- Make sure source is set to `Deploy from a branch` and branch is set to `gh-pages`, then save
- Once it's done generating your site, you can find the link at the top of this page

## 6. In the future

- To push files to the main branch:

```bash
git add .
git commit -m "commit message"
git push origin main
```

- To deploy to the gh-pages branch:

```bash
pnpm run deploy
```

If everything goes correctly, this is what you should see at `username.github.io/YOUR_REPO_NAME`:

![Successful SvelteKit deployment to GitHub Pages](/assets/blog/demo.jpeg)

That's it!
