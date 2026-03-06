---
title: Adding a Comment Section with HTML Comment Box
slug: html-comment-box
desc: With some SvelteKit modifications.
cover: /assets/blog/hcb.png
date_published: 2026-03-05
date_updated: ''
tags:
  - dev
  - tutorial
  - site
---

My blog now has a comment section. Yay!

I'm using [HTML Comment Box](https://www.htmlcommentbox.com/), which everybody on Neocities seems to use on their site. While it is framework agnostic (being a simple HTML widget), I haven't seen it on any of the non-Neocities blogs I follow—those typically have a custom or more complicated set up for comments. I don't really need a feature-rich comment section with analytics or user icons, nor do I want to set up a database for it, so HCB seemed like the best solution for my site (for now).

HCB pretty much works right out of the box. After logging in with a Google account, click the `+ options` button to customize your widget. The most useful customization for me was 'Show website field', which links the comment author's display name with their website.

![Screenshot of HTML Comment Box's home page](/assets/blog/hcb1.png)

![Screenshot of HTML Comment Box's home page](/assets/blog/hcb2.png)

By default, the widget comes with an email field that allows visitors to be notified if anyone replies to their comment, but I've never liked the idea of submitting my personal email to random people's blogs, so I decided to get rid of it on mine. Besides, if you have an HCB account and are logged in in your browser, it'll automatically track every comment you receive or post on other HCB-powered comment sections.

![Testing my comment section](/assets/blog/hcb3.png)

![Comments received in HCB's page](/assets/blog/hcb4.png)

The best part of HCB is that you have total control of the styling via CSS! You can read more about it [here](https://www.htmlcommentbox.com/css-guide.html), but essentially all I had to do was open Inspect Element and figure out which tags or classes to target.

Here's how other people have customized their widgets:

[![ribo.zone's comment section](/assets/blog/hcb5.png)](https://ribo.zone/)

from <span class="caption"><a href="https://ribo.zone">ribo.zone</a></span>

[![Kaylee Rowena's comment section](/assets/blog/hcb6.png)](https://kayleerowena.com/)

from <span class="caption"><a href="https://kayleerowena.com/">Kaylee Rowena</a></span>

# Svelteifying the Embed Code

Immediately after logging in, HCB will give you code that you can copy and paste straight into your file. This is what it looks like by default.

![Default HCB styling](/assets/blog/hcb7.png)

<span class="caption">kinda ugly...</span>

If you're working on a plain HTML file, you can stop here. All you need to do is style the elements accordingly.

![Inspecting element for styling](/assets/blog/hcb8.png)

<span class="caption">happy hunting</span>

If you're using SvelteKit like I am, you need to place the script in an `onMount` hook so that it runs in the browser only after the component has been mounted. Otherwise, SvelteKit may try to render it in the server and cause a runtime error.

Replace this:

```javascript
<script type="text/javascript" id="hcb">
	/*<!--*/ if (!window.hcb_user) {
		hcb_user = {};
	}
	(function () {
		var s = document.createElement('script'),
			l = hcb_user.PAGE || ('' + window.location).replace(/'/g, '%27'),
			h = 'https://www.htmlcommentbox.com';
		s.setAttribute('type', 'text/javascript');
		s.setAttribute(
			'src',
			h +
				'/jread?page=' +
				encodeURIComponent(l).replace('+', '%2B') +
				'&mod=%241%24wq1rdBcg%247pXLI2Nftu0UD3pl.2vzg%2F' +
				'&opts=16798&num=10&ts=1772765904575'
		);
		if (typeof s != 'undefined') document.getElementsByTagName('head')[0].appendChild(s);
	})(); /*-->*/
</script>
```

With this:

```typescript
<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    (window as any).hcb_user = {};

    const l = window.location.toString().replace(/'/g, '%27');
    const h = 'https://www.htmlcommentbox.com';
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src =
      h +
      '/jread?page=' +
      encodeURIComponent(l).replace('+', '%2B') +
      '&mod=%241%24wq1rdBcg%247pXLI2Nftu0UD3pl.2vzg%2F' +
      '&opts=16798&num=10&ts=1772765904575';
    document.head.appendChild(s);
  });
</script>
```

Additionally, you can customize the labels by adding [this script](https://www.htmlcommentbox.com/advanced.html) to the `hcb_user` variable:

```typescript
onMount(() => {
  (window as any).hcb_user = {
    /* L10N */
    comments_header: 'Comments',
    name_label: 'Name',
    content_label: 'Leave a comment',
    // rest of script
```

As the name suggests, HTML Comment Box supports formatting in HTML and not Markdown. Markdown is faster and easier to write in, but there's something old-school about writing out HTML tags that I enjoy.
