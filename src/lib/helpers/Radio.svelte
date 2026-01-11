<script lang="ts">
	import { RadioGroup } from 'bits-ui';

	interface Props {
		value: string;
		options: Array<{ value: string; label: string }>;
		onValueChange?: (value: string) => void;
	}

	let { value = $bindable(), options, onValueChange }: Props = $props();
</script>

<RadioGroup.Root bind:value orientation="horizontal" class="flex gap-4 button-text mb-8">
	{#each options as option}
		<RadioGroup.Item value={option.value}>
			{#snippet children({ checked })}
				<button
					type="button"
					class={`flex cursor-pointer items-center justify-center rounded-md uppercase px-2 py-1
				transition-all duration-300 ease-in-out
				${
					checked
						? 'bg-accent-blue text-accent-cream ring-3 ring-accent-blue ring-offset-2 ring-offset-dark-gray'
						: 'bg-accent-cream text-black ring-0'
				}
				hover:bg-accent-blue hover:text-accent-cream hover:ring-3 hover:ring-accent-blue hover:ring-offset-2 hover:ring-offset-dark-gray`}
				>
					{option.label}
				</button>
			{/snippet}
		</RadioGroup.Item>
	{/each}
</RadioGroup.Root>
