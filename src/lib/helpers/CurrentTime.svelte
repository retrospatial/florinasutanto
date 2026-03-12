<script lang="ts" module>
	import { SvelteDate } from 'svelte/reactivity';

	export const date = new SvelteDate();

	setInterval(() => {
		date.setTime(Date.now());
	}, 1000);

	export const formatter = new Intl.DateTimeFormat(undefined, {
		timeZone: 'America/New_York',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});

	export function getTime() {
		return formatter.format(date);
	}
</script>
