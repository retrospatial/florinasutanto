---
title: Colophon
desc: How I built this site.
cover: ''
date: 2026-01-25
tags:
  - dev
  - site
---

Hello! Welcome to my site. This space is meant to be a catch-all for me to showcase my professional portfolio, practice web design and development, experiment with graphics, post personal projects, and write about things I find interesting. 

I imagine that everything here will constantly be in flux as my tastes and interests grow and change, but I'd like to document how I built this site as best as I can, both for my own sake and for whoever might find this useful. 

# Design

With personal projects, I normally do a bit of design testing on Figma (basic layout, color options, fonts, etc.), but truth be told, I find designing on the fly fun! They're not avant garde by any means, but I like each page to look a little different from each other so more of my personality and choices can shine through. I am very inspired and influenced by the Indie Web and, following that ethos, want my web presence to reflect myself uniquely.

The little doodles on the personal page were drawn using Affinity Designer (which is now [FREE](https://www.canva.com/newsroom/news/affinity-free/)?!) as vectors on my iPad, then exported and edited on Figma. I find it faster to make final touches to SVGs on my laptop rather than my iPad. 

Animations were made using the [GSAP library](https://gsap.com/).

# Stack

This site is built ("hand coded") with Svelte on the SvelteKit framework. Svelte allows me to easily write HTML, CSS, and JavaScript in self-contained component files, which it then compiles into small, optimized JavaScript bundles. SvelteKit is a web application framework that builds on top of these files by providing features like page and API routing, server-side rendering, static site generation, data loading, and so on. I got started with SvelteKit after poking around [The Pudding](https://pudding.cool/)'s public repos for their stories and it's been really easy to learn on the go! Now I use it for all web development projects at my job.

I primarily use Tailwind for styling, though vanilla CSS comes in handy when there are edge cases that Tailwind can't handle. I'm a big fan of Tailwind's class-based styling system; it keeps everything in one place and makes it \*so\* easy to make things responsive. No need to worry about hunting down class names up and down a long CSS file. For reoccurring styles, I use design and styling tokens that are applied globally.

All my writings are written in Markdown. Structured, repeatable texts like project descriptions live in \`.yaml\` files, since it's easy to iterate through them. Since blog posts are longer and more varied, I'll draft them in Obsidian and publish through a headless CMS called [Sveltia CMS](https://sveltiacms.app/), which I learned about from [this blog post](https://aman.bh/blog/2025/sveltia-cms-is-golden). With Sveltia, I don't have to touch my repo whenever I want to post––simply adding \`/admin/index.html\` at the end of my domain will pull up the UI. Since it's a Git-based CMS, publishing a post will automatically push the associated Markdown file (as well as any images) to my GitHub repo, which will in turn trigger an automatic deployment on Vercel. So easy! 

As a note, I do have to log into Sveltia with a GitHub Personal Access Token (PAT). I think it won't allow me to log in with my GitHub account because I'm deploying my site on Vercel.

# Deployment & Hosting

The previous three iterations of my site were hosted on GitHub Pages; this is the first that's hosted on Vercel. I'll be honest, deploying a SvelteKit app to gh-pages was always a pain in the ass. I needed to route it in a specific way and remember to bypass Jekyll and add a CNAME file to the repo. I did it because I liked storing and hosting everything on one platform, and though it worked it was annoying to have to do this every time I rebuilt my site from scratch.

Now that I have components that make dynamic API calls, I can't use GitHub Pages anymore since it can only deploy static sites. Luckily I'm used to using Vercel at work so it was an easy switch––just had to connect the repo, add my API keys to the environment variables, and that's it! I'm not too worried about the bandwidth limits on the free tier right now, but as my site grows (especially with images) I might have to look into setting up a CDN.

The only thing I pay for to get this site on the internet is my domain name, which costs $20/year via Squarespace. It's been fine to use and I honestly barely touch it. I've learned that it's much cheaper (\~$11/year) to buy a domain off Porkbun, which is also highly rated, so when my plan ends this year I might make the switch (hopefully I remember).

> \*\*Dev tip:\*\* To open localhost on your phone or tablet (for responsivity testing), run the command \`pnpm dev --host\`, copy the Network link, and open the link in a mobile browser. Make sure all devices are connected to the same network. It's much easier and more reliable than using an emulator!

# APIs and Components

## LastFM + Discogs

The "Favorite Songs This Week" list in my scrapbook section displays my most listened to songs from the past 7 days in real time!

To do this, I use [LastFM](https://www.last.fm/home)'s API to pull the track name, artist, and URL. Unfortunately, their API doesn't return any cover images or artwork, which I also want to display. To circumvent this, I first tried using [MusicBrainz](https://musicbrainz.org/)'s API to query cover images based on the track and artist, but their rate limits made the requests way too slow––slow enough that I would scroll away because I got bored waiting for the covers to load.

Luckily, I found out about [Discogs](https://www.discogs.com/) through a Reddit thread, and their API works great for me. The only thing is that a lot of their listings have user-submitted, manually-taken photographs of vinyl covers as the cover artwork, instead of an official digital image for some reason. It's not a big deal, but if any of the covers on my list look a little funny, that's why. Personally, I think it's odd but charming!

## Hardcover

[Hardcover](https://hardcover.app/) is a great book-tracking alternative to Goodreads and StoryGraph, particularly because it's the only one out of the three that offers an API.

One of Hardcover's developers has [a great tutorial on how to get started with the API](https://www.emgoto.com/hardcover-book-api/). The schema was kind of confusing to me at first (they say 'contributor' instead of 'author', which tripped me up), but once I got the hang of the GraphQL structure I was able to query books from three lists: my currently reading (which is just status id = 2), recently read (status id = 3), and favorites, which pulls from a list I created in Hardcover called site-favorites. The reason for the last one is that I didn't necessarily want to display any book I rated 5 stars as my personal favorites, and I want to be able to manually control what goes in that list.

While the API is still in development and could change at any time, I found their docs to be really helpful; they even have "try it yourself" sections that auto-load specific queries associated with your account, so you can just copy and paste it to your request.

Aside from the API, I actually enjoy using Hardcover as my book-tracker platform. Their UI is more appealing to me than the other two, and I find it fitting that the founders [specifically built it in response to Goodreads sunsetting their API](https://hardcover.app/pages/about), which disrupted them from displaying their reading lists on their blog (which is what I'm doing!). They're a community-driven, soon to be open-source project, and I wish them all the success! I also joined their Discord channel so I can keep an eye out for development updates.

## Piano

The piano component at the bottom of my scrapbook section was lifted from [Svelte Piano](https://svelte-piano.vercel.app/). 

# AI Policy

I use Claude as a coding assistant, though I try not to use it gratuitously in an effort to learn and improve my programming skills. Aside from occasionally using Grammarly to check for spelling and grammar, I don't use AI to generate any of the writing or art on my site. I am generally uninterested in using generative AI to create any creative output.

# Source Code

The full code for this site can be found [here](https://github.com/retrospatial/florinasutanto).
