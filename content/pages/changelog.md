---
title: Changelog
---

<!-- ## 2026-08-16

- Nested the [bookshelf](/bookshelf), [music page](/music), and concerts under [media](/media)
- Added an [archive](/archive) page for previous site designs -->

## 2026-08-15

Created this changelog page, so...let's fast forward the past 8 months.

Many major updates (in a single commit, no less...):

- Moved the [colophon](/colophon) from a blog post to its own route
- Created a [sitemap](/sitemap), [style guide](/style), and [cheatsheet](/cheatsheet)
- Added a [concerts](/concerts) page
- Added an aside component
- Added each bookshelf post to the RSS
- Realized that I had never actually applied Neue Montreal as the body font and had just been reading in Apple's default SF Pro the entire time until now 🙃

Right now links are being rendered 5 different ways throughout the site. It's really inconsistent and I need to figure out a better rule for it.

<div class="link-cases">

- [Universal links](/blog) are colored teal and turn lime when hovered. Most consistently used in blog posts. It looks good against the dark background but doesn't work against a light one.
- Links on the [now page](/now) are black and auto underlined; no hover behavior. This is because links need to be visibly discernible.
- Links on the [blogroll page](/blogroll) are black and turn underlined when hovered. This is different from the now page because 1) it's more intuitively clear that each line is a link, so people will know to hover and 2) having everything on the list auto underlined looks bad.
- Links on the [sitemap](/sitemap) are bone colored and turn teal when hovered. Having each line be all teal also doesn't seem visually balanced.
- Links in the callout component (like in this [blog post](/blog/2026/html-comment-box)) are lime (with no hover action) to match the surrounding box.

</div>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	.link-cases li:nth-child(2) a {
		@apply bg-bone px-1 text-black underline underline-offset-2;
	}

	.link-cases li:nth-child(3) a {
		@apply bg-bone cursor-pointer px-1 text-black underline decoration-transparent decoration-2 underline-offset-2 transition-colors duration-300 hover:decoration-black;
	}

	.link-cases li:nth-child(4) a {
		@apply border-outset-small text-bone hover:text-teal px-1 transition-colors duration-300;
	}

	.link-cases li:nth-child(5) a {
		@apply text-lime;
	}
</style>

## 2026-03-25

Settled on a design after weeks of waffling. See previous iterations [here](/archive).

## 2026-01-10

Nuked the third iteration of my website and started over with a new SvelteKit project. Yay!
