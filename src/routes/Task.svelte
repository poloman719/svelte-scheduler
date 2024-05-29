<script>
// @ts-nocheck

	import Time from "./Time.svelte";

	export let text = '';
	export let duration = 0;
	export let time = 0;
	export let onTextChange;
	export let onDurationChange;
	let hour;
	let minute;
	$: {
		const date = new Date(time);
		hour = date.getHours();
		minute = date.getMinutes();
	}
</script>

<div class="rounded-3xl bg-main-500 p-7 flex justify-between gap-2">
	<input type="text" class="outline-none w-3/4" bind:value={text} on:change={onTextChange} />
	<input
		type="text"
		class="outline-none w-5"
		bind:value={duration}
		on:change={onDurationChange}
	/> min
</div>
<div class="text-center"><Time hour={hour} minute={minute}/></div>
