<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { fly } from 'svelte/transition';
	interface Item {
		href: string;
		title: string;
	}

	interface Props {
		items: Item[];
		text: string;
		activeHref?: string;
		class?: string;
		triggerClass?: string;
		itemClass?: string;
		activeClass?: string;
		dividerAfter?: number;
	}

	let {
		items,
		text,
		activeHref,
		class: className = '',
		triggerClass = '',
		itemClass = '',
		activeClass = 'italic',
		dividerAfter = -1
	}: Props = $props();

	let open = $state(false);
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger class="{className} {triggerClass} items-center flex gap-2">
		{text}
		<iconify-icon
			icon="mingcute:down-fill"
			class="mt-1 text-lg"
			style="display: inline-block; transition: transform 0.3s; transform: rotate({open
				? '180'
				: '0'}deg);"
		></iconify-icon>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="z-50" align="end" sideOffset={4} forceMount>
		{#if open}
			<div
				class="flex flex-col gap-2 mt-2 md:mt-4 bg-dark-gray p-4 border border-lime border-dashed"
				transition:fly={{ y: -8, duration: 300 }}
			>
				{#each items as item, i}
					<DropdownMenu.Item class="outline-none">
						<a href={item.href}>
							<p class="{itemClass} {activeHref === item.href ? activeClass : 'text-bone'}">
								{item.title}
							</p>
						</a>
					</DropdownMenu.Item>
					{#if i === dividerAfter}
						<div class="text-lg text-center text-lime">✧</div>
					{/if}
				{/each}
			</div>
		{/if}
	</DropdownMenu.Content>
</DropdownMenu.Root>
