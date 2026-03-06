<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		(window as any).hcb_user = {
			/* L10N */
			comments_header: 'Comments',
			name_label: 'Name',
			content_label: 'Leave a comment',
			submit: 'Comment',
			logout_link:
				'<img title="log out" src="https://www.htmlcommentbox.com/static/images/door_out.svg" alt="[logout]" class="hcb-icon hcb-door-out"/>',
			admin_link:
				'<img src="https://www.htmlcommentbox.com/static/images/door_in.svg" alt="[login]" class="hcb-icon hcb-door-in"/>',
			no_comments_msg: 'No one has commented yet. Be the first!',
			add: 'Add your comment',
			again: 'Post another comment',
			rss: '<img src="https://www.htmlcommentbox.com/static/images/feed.svg" class="hcb-icon" alt="rss"/> ',
			said: 'said:',
			prev_page:
				'<img src="https://www.htmlcommentbox.com/static/images/arrow_left.png" class="hcb-icon" title="previous page" alt="[prev]"/>',
			next_page:
				'<img src="https://www.htmlcommentbox.com/static/images/arrow_right.png" class="hcb-icon" title="next page" alt="[next]"/>',
			showing: 'Showing',
			to: 'to',
			website_label: 'Website (optional)',
			email_label: 'Email',
			anonymous: 'Anonymous',
			mod_label: '(mod)',
			subscribe: 'Email Me Replies',
			add_image: 'Add Image',
			are_you_sure: 'Do you want to flag this comment as inappropriate?',

			reply: 'Reply',
			flag: 'Flag',
			like: 'Like',

			/* dates */
			days_ago: 'days ago',
			hours_ago: 'hours ago',
			minutes_ago: 'minutes ago',
			within_the_last_minute: 'within the last minute',

			msg_thankyou: 'Thanks for commenting!',
			msg_approval: 'NOTE: This comment is not published until approved',
			msg_approval_required:
				'Thanks for commenting! Your comment will appear once approved by a moderator.',

			err_bad_html: 'Your comment contained bad html.',
			err_bad_email: 'Please enter a valid email address.',
			err_too_frequent: 'You must wait a few seconds between posting comments.',
			err_comment_empty: 'Your comment was not posted because it was empty!',
			err_denied: 'Your comment was not accepted.',
			err_unknown: 'Your comment was blocked for unknown reasons, please report this.',
			err_spam: 'Your comment was detected as spam.',
			err_blocked: 'Your comment was blocked by site policy.',

			/* SETTINGS */
			MAX_CHARS: 8192,
			PAGE: '',
			ON_COMMENT: function () {},
			RELATIVE_DATES: true
		};

		const l = ((window as any).hcb_user.PAGE || window.location.toString()).replace(/'/g, '%27');
		const h = 'https://www.htmlcommentbox.com';
		const s = document.createElement('script');
		s.type = 'text/javascript';
		s.src =
			h +
			'/jread?page=' +
			encodeURIComponent(l).replace('+', '%2B') +
			'&mod=%241%24wq1rdBcg%247pXLI2Nftu0UD3pl.2vzg%2F' +
			'&opts=17822&num=10&ts=1772734574904';
		document.head.appendChild(s);

		const box = document.getElementById('HCB_comment_box');
		if (box) {
			new MutationObserver(() => {
				const seen = new Set<string>();
				box.querySelectorAll('.comment').forEach((el) => {
					if (seen.has(el.id)) {
						el.remove();
					} else {
						seen.add(el.id);
					}
				});
			}).observe(box, { childList: true, subtree: true });
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0"
	/>
</svelte:head>

<div class="w-full mt-16 border-t-2 border-dotted border-accent-pink"></div>

<div id="HCB_comment_box" class="mt-8">Loading comments...</div>

<style lang="postcss">
	@reference '$lib/styles/app.css';

	:global {
		html #HCB_comment_box {
			--hcb-font-size: 0.875rem;
			--hcb-font-size-lg: 1.125rem;
			--hcb-font-size-sm: 0.7rem;

			@media (min-width: 768px) {
				--hcb-font-size: 1rem;
				--hcb-font-size-lg: 1.25rem;
				--hcb-font-size-sm: 0.8rem;
			}

			font-family: 'Exposure', sans-serif !important;
			color: white !important;
			font-size: var(--hcb-font-size) !important;

			* {
				font-family: inherit !important;
			}

			/* links */
			a {
				color: var(--color-accent-pink) !important;
				&:hover {
					text-decoration: underline;
				}
			}

			/* comment metadata */
			.author {
				font-style: normal !important;
				font-weight: 300 !important;
				font-size: var(--hcb-font-size-lg) !important;
			}

			.date {
				color: var(--color-white) !important;
				font-family: 'Fira Code', monospace !important;
				text-transform: uppercase !important;
			}

			/* form layout */
			#HCB_comment_form_box form {
				display: flex;
				flex-wrap: wrap;
				column-gap: 12px;
			}

			.hcb-wrapper {
				flex-basis: 100% !important;
				margin-bottom: 8px !important;
			}

			/* inputs & textarea */
			#hcb_form_name,
			#hcb_form_website,
			textarea {
				background-color: var(--color-dark-gray);
				border: 0.5px solid white;
				border-radius: 4px;
				padding: 8px;
				outline: none !important;

				&:focus {
					border-color: var(--color-accent-pink) !important;
					box-shadow: 0 0 0 2px rgb(229 102 132 / 0.3) !important;
				}
				width: 100% !important;
				box-sizing: border-box;
				font: inherit !important;
				font-size: inherit !important;
				color: white !important;

				&::placeholder {
					color: var(--color-white) !important;
					opacity: 0.6 !important;
					font: inherit !important;
					font-size: inherit !important;
				}
			}

			/* comment body */
			blockquote,
			.hcb-comment-body {
				font-family: inherit !important;
				font-size: inherit !important;
			}

			#hcb_msg {
				margin-bottom: 18px;
			}

			/* buttons */
			.btn {
				background-color: var(--color-dark-gray) !important;
				border: 0.5px solid var(--color-accent-pink) !important;
				border-radius: 4px;
				padding: 4px 8px;
				font: inherit !important;
				font-size: inherit !important;
				font-family: 'Fira Code', monospace !important;
				text-transform: uppercase !important;
				color: var(--color-white) !important;
				cursor: pointer;
				transition: background-color 0.3s ease-in-out !important;

				&:hover {
					background-color: rgb(229 102 132 / 0.3) !important;
				}
			}

			/* comment actions */
			.hcb-reply,
			.hcb-flag,
			.del {
				color: var(--color-accent-pink) !important;
				font-weight: 400 !important;
				opacity: 0.8 !important;
				font-family: 'Fira Code', monospace !important;
				text-transform: uppercase !important;

				&:hover {
					text-decoration: underline !important;
				}
			}

			.del {
				font-size: 0 !important;

				img {
					display: none;
				}

				&::before {
					content: 'delete';
					font-size: var(--hcb-font-size-sm) !important;
				}
			}

			/* comments container */
			#comments_list {
				padding: 0 !important;
				margin: 0 !important;
			}

			/* comment card */
			.comment {
				border: 2px dotted var(--color-accent-pink) !important;
				background-color: var(--color-dark-gray) !important;
				border-radius: 4px;
				padding: 12px 16px;
				margin-bottom: 2rem !important;
				margin-left: 0 !important;
				margin-right: 0 !important;
				box-sizing: border-box !important;
				max-width: none !important;
				width: auto !important;

				&:last-child {
					margin-bottom: 1rem !important;
				}
			}

			/* subscribe & settings */
			#hcb_subscribe,
			small:has(#hcb_settings),
			#hcb_settings {
				display: inline-flex !important;
				align-items: center !important;
				gap: 4px !important;
				font-family: 'Fira Code', monospace !important;
				text-transform: uppercase !important;
				font-size: var(--hcb-font-size-sm) !important;
				font-weight: 400 !important;
				color: var(--color-white) !important;
				flex-basis: auto !important;
			}

			#hcb_settings img.hcb-icon {
				display: inline-block !important;
				width: 0.8rem !important;
				height: 0.8rem !important;
			}

			input[type='checkbox'] {
				accent-color: var(--color-accent-pink) !important;
			}

			/* hidden elements */
			.home-desc,
			.hcb-like,
			.hcb-door-in,
			.hcb-door-out,
			img[alt='rss'],
			#no_comments,
			h3 {
				display: none !important;
			}
		}
	}
</style>
