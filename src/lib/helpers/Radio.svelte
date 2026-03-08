<script lang="ts">
	import { RadioGroup } from 'bits-ui';

	interface Props {
		value: string;
		options: Array<{ value: string; label: string }>;
		onValueChange?: (value: string) => void;
	}

	let { value = $bindable(), options, onValueChange }: Props = $props();
</script>

<RadioGroup.Root
	bind:value
	orientation="horizontal"
	class="flex gap-4 font-semibold detail-sm mb-8"
>
	{#each options as option}
		<RadioGroup.Item value={option.value}>
			{#snippet children({ checked })}
				<button
					type="button"
					class={`flex cursor-pointer items-center justify-center border-outset uppercase px-2 py-1
				transition-all duration-300 ease-in-out
				${checked ? 'bg-accent-blue text-accent-cream ' : 'bg-accent-cream text-black'} hover:border-inset
				`}
				>
					{option.label}
				</button>
			{/snippet}
		</RadioGroup.Item>
	{/each}
</RadioGroup.Root>
