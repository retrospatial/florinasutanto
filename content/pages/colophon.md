---
title: Colophon
date_updated: 2026-08-15
---

Hello! Welcome to my site. This space is meant to be a catch-all for me to showcase my professional portfolio, practice web design and development, experiment with graphics, post personal projects, and write about things I find interesting.

I imagine that everything here will constantly be in flux as my tastes and interests grow and change, but I'd like to document how I built this site as best as I can, both for my own sake and for whoever might find this useful. I am very inspired and influenced by the Indie Web and, following that ethos, want my web presence to reflect myself uniquely.

## Related Pages

- [Sitemap](/sitemap)
- [Changelog](/changelog)

## Stack

This site is built with [SvelteKit](https://svelte.dev/docs/kit/introduction) and hosted on Vercel. Components are written in Svelte and styled primarily using Tailwind.

I write all of my content in one of two formats (sometimes together, but that tends to get messy): `yaml` for structured texts that can be parsed repetitively (e.g. project descriptions), and Markdown (bolstered with [mdsvex](https://mdsvex.pngwn.io/)) for long posts.

For the latter, I draft in Obsidian and publish through a headless CMS called [Sveltia CMS](https://sveltiacms.app/), which I learned about from [this blog post](https://aman.bh/blog/2025/sveltia-cms-is-golden). Since it's a Git-based CMS, publishing a post will automatically push the Markdown file (as well as any images) to my GitHub repo, which will in turn trigger an automatic deployment on Vercel. The UI looks nice and it's pretty easy to use. In theory this means that I shouldn't have to write or make edits in the bare `.md` files, but...weirdly I like using VSCode as a text editor, so sometimes I'll just rawdog posts straight in my repo, lol.

I pay US$20/year to Squarespace for my domain, which is the only expense I spend to get this site on the internet. It comes with email forwarding (emails sent to hello@florinasutanto.com get forwarded to my personal email) as a nice bonus. In retrospect, I wish I hadn't gone with my full name as the domain to preserve some anonymity, but I don't want to break inbounding links to my site at this point.

## Media

To compress images, I run [an ImageMagick command](/cheatsheet#images) to resize and convert them to `.webp` files. I then apply Vercel's built-in [Image Optimizer](https://vercel.com/docs/image-optimization) to compress and cache the images at serve time, making them load faster on this site.

I compress videos by running [an ffmpeg command](/cheatsheet#videos), which resizes the video, re-encodes it to HEVC, and then overwrites the original file so there's only one copy at the end. This is hands down the best solution I've seen for getting 20+ MB videos down to less than 1 MB without compromising on video quality.

I'm not sure if these are the best ways to deal with media optimization, to be honest. I want this process to be as frictionless as possible, and right now it involves a lot of manual manipulation to check if I'm striking the right balance between quality and size for each image or video. Compressing project covers is fine, since I'll likely only have to it once in a while, but frequently dealing with blog images—especially ones with lots of text—might get tiring down the line. I'll keep looking for better ways to deal with this issue.

## Components

### Comments

I use [HTML Comment Box](https://www.htmlcommentbox.com/) for the comment section; you can read more about how I use it [here](/blog/2026/html-comment-box). The data is stored on HCB's site but I can easily export all the comments I've received as a `.csv`, `.json`, and `.html` file if I ever need to.

### Music

My [music page](/music) shuffles through a list of my recent favorite songs and plays a 30-second snippet of each one via a 'casette player'. The implementation deserves its own post, which I've been procrastinating on, but in short, it pulls a list of my top 50 most listened to songs in the past 3 months from [last.fm](https://www.last.fm/user/sunmetric), and then in parallel fetches cover images from [Discogs](https://www.discogs.com/) and a preview track from iTunes. It's three APIs stitched together (not very seamlessly), basically.

### Bookshelf

I use [Hardcover](https://hardcover.app/) to track my [reading](/bookshelf), both because I like the UI and because it's the only book-tracking platform I know that offers an API. One of Hardcover's developers has [a great tutorial](https://www.emgoto.com/hardcover-book-api/) on how to get started with it.

## Image Credits

[Media](/media) page:

- [Knigi](https://www.rile.space/books/knigi) by Benjamin Sommerhalder
- [Kolędnicy](https://www.instagram.com/p/DEcruhPu_h1/?img_index=1) by Zuza Kamińska
