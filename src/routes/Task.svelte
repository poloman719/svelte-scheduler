<script>
	export let text = '';
	export let duration = 0;
	export let time = 0;
	export let onTextChange;
	export let onTimeChange;
</script>

<div class="rounded-3xl bg-main-500 p-7 flex justify-between">
	<input type="text" class="outline-none bg-main-500" bind:value={text} on:change={onTextChange} />
	<div>
		<input
			type="text"
			class="outline-none bg-main-500 w-2"
			bind:value={time}
			on:change={onTimeChange}
		/> min
	</div>
</div>
<div class="text-center">{time}</div>
