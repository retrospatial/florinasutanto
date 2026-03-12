<script lang="ts">
	let {
		children,
		color = 'bg-accent-blue',
		scrollbarTrack = 'var(--color-white)',
		scrollbarThumb = 'var(--color-dark-gray)',
		class: classes = '',
		style = ''
	}: Props = $props();

	interface Props {
		class?: string;
		color?: string;
		scrollbarTrack?: string;
		scrollbarThumb?: string;
		style?: string;
		children: any;
	}
</script>

<div class="bg-white border-outset w-full flex flex-col {classes}" {style}>
	<div class="relative w-full">
		<header class="{color} top-0 h-6 w-full">
			<div
				class="border-outset-small absolute right-2 top-1/2 flex h-3 w-3 -translate-y-1/2 transform items-center justify-center border bg-white text-black text-sm font-mono pb-px"
			>
				x
			</div>
		</header>
	</div>
	<div
		class="window-body px-5 py-4 body flex flex-col gap-4 text-black body-md mb-0 flex-1 min-h-0 overflow-y-auto"
		style="--scrollbar-track: {scrollbarTrack}; --scrollbar-thumb: {scrollbarThumb};"
	>
		{@render children()}
	</div>
</div>

<style>
	.window-body::-webkit-scrollbar {
		width: 6px;
	}

	.window-body::-webkit-scrollbar-track {
		background: var(--scrollbar-track);
	}

	.window-body::-webkit-scrollbar-thumb {
		background: var(--scrollbar-thumb);
	}
</style>
