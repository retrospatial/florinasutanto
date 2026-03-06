<script lang="ts">
	let { children, color = 'bg-accent-blue', class: classes = '' }: Props = $props();

	interface Props {
		class?: Classes;
		color?: string;
		children: any;
	}
</script>

<div class="body-md about-link bg-white border-outset w-full {classes}">
	<div class="relative w-full">
		<header class="{color} top-0 h-6 w-full">
			<div
				class="border-outset-small absolute right-2 top-1/2 flex h-3 w-3 -translate-y-1/2 transform items-center justify-center border bg-white text-black text-sm font-mono pb-px"
			>
				x
			</div>
		</header>
	</div>
	<div class="px-5 py-4 body flex flex-col gap-4 text-black">
		{@render children()}
	</div>
</div>
