<script>
	export let text = '';
	export let duration = 0;
	export let time = 0;
  export let onChange;
  $: onChange(text);
</script>

<div>
	<div class="rounded-3xl bg-main-500 p-7 flex justify-between">
		<input type="text" class="outline-none bg-main-500" bind:value={text} on:change={() => text = "change"}/>
		<div>{duration} min</div>
	</div>
	<div class="text-center">{time}</div>
</div>
