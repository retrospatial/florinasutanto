<script lang="ts">
	interface Props {
		label: string;
		href: string;
		class?: string;
		bgColor?: string;
		textColor?: string;
	}

	let {
		label,
		href,
		class: classes = '',
		bgColor = 'bg-lime',
		textColor = 'text-black'
	}: Props = $props();
</script>

<a
	{href}
	target="_self"
	rel="noopener noreferrer"
	class="group flex cursor-pointer items-center justify-center gap-2 border-outset uppercase px-4 py-2
		transition-all duration-300 ease-in-out hover:border-inset {bgColor} {textColor} {classes}"
>
	{label}
</a>

<style lang="postcss">
	@reference '$lib/styles/app.css';
</style>
