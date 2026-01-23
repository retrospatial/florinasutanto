---
title: Building This Site
desc: A walkthrough of the tech stack and design decisions behind this website
date: 2025-01-22
tags: [dev, site]
---

#dev #site

Hello! Welcome to my site. This space is meant to be a catch-all for me to showcase my professional portfolio, practice web design and development, experiment with graphics, post personal projects, and write about things I find interesting.

I imagine that everything here will constantly be in flux as my tastes and interests grow and change, but I'd like to document how I built this site as best as I can, both for my own sake and for whoever might find this useful.

# Stack

This site is built ("hand coded") with Svelte on the SvelteKit framework. Svelte allows me to easily write HTML, CSS, and JavaScript in self-contained component files, which it then compiles into small, optimized JavaScript bundles. SvelteKit is a web application framework that builds on top of these files by providing features like page and API routing, server-side rendering, static site generation, data loading, and so on. I got started with SvelteKit after poking around [The Pudding](https://pudding.cool/)'s public repos for their stories and it's been really easy to learn on the go! Now I use it for all web development projects at my job.

I primarily use Tailwind for styling, though vanilla CSS comes in handy when there are edge cases that Tailwind can't handle. I'm a big fan of Tailwind's class-based styling system; it keeps everything in one place and makes it _so_ easy to make things responsive. No need to worry about hunting down class names up and down a long CSS file. For reoccurring styles, I use design and styling tokens that are applied globally.

All of my writings are written in Markdown. Structured, repeatable texts like my project descriptions live in `.yaml` files, since it's easy to iterate through them. Since blog posts are longer and more varied, I'll draft them in Obsidian and publish through a headless CMS called [Sveltia CMS](https://sveltiacms.app/), which I learned about from [this blog post](https://aman.bh/blog/2025/sveltia-cms-is-golden). With Sveltia, I don't have to touch my repo whenever I want to post––simply adding `admin/index.html` at the end of my domain will pull up the UI. Since it's a Git-based CMS, publishing a post will automatically push the associated Markdown file (as well as any images) to my GitHub repo, which will in turn trigger an automatic deployment on Vercel. So easy!

As a note, I do have to log into Sveltia with a GitHub Personal Access Token (PAT). I think it won't allow me to log in with my GitHub account because I'm deploying my site on Vercel.

# Design

With personal projects, I normally do a bit of design testing on Figma (basic layout, color options, etc.), but truth be told, I find designing on the fly fun! They're not avant garde by any means, but I like each page to look a little different from each other so more of my personality and choices can shine through. I am very inspired and influenced by the Indie Web and, following that ethos, want my web presence to feel uniquely myself.

The little doodles on the personal page were drawn using Affinity Designer (which is now [FREE](https://www.canva.com/newsroom/news/affinity-free/)?!) as vectors on my iPad.

# Deployment & Hosting

The previous three iterations of my site were hosted on GitHub Pages; this is the first that's hosted on Vercel. I'll be honest, deploying a SvelteKit app to gh-pages was always a major pain in the ass.

add my API Keys to the environment variables

pnpm dev --host (computer and phone must be on the same network) and then open the Network link on your phone

I pay $20 a year for my domain via Squarespace. It has been okay to use and I honestly barely touch it. I've learned that it's much cheaper (~$11) to buy a domain off Porkbun, which is also highly rated, so when my plan ends this year I might make the switch (hopefully I remember).

# APIs and Components

## LastFM + Discogs

ch it. I've learned that it's much cheaper (~$11) to buy a domain off Porkbun, which is also highly rated, so when my plan

## Hardcover

ch it. I've learned that it's much cheaper (~$11) to buy a domain off Porkbun, which is also highly rated, so when my plan

## Piano

ch it. I've learned that it's much cheaper (~$11) to buy a domain off Porkbun, which is also highly rated, so when my plan

# Note on AI

Aside from occasionally using Grammarly for spell and grammar checks,

As you may be able to tell, much of this site has been inspired and influenced by other developers in the Indie Web.

404 error handling

- [x] Incorporate mdsvex
- [x] Dynamically create background
- [ ] Light/dark mode
- [ ] Image gallery
- [ ] Pagination and filter for blog
- [ ] Syntax color highlighting for code blocks
- [ ] Set up RSS feed
- [ ] Reminder to re-generate the Hardcover API key on Jan 14 next year

```
test
```

whenever I want to post––simply adding `admin/index.html` at the end of my domain will pull up the UI. Since it's a Git-based CMS, publishing a post will automatically push the associated Markdown file (as well as any images) to my GitHub repo, which will in turn trigger an automatic deployment on Vercel. So easy!
