<script>
	import Draggable from './Draggable.svelte';
	export let drag;
	export let text;
	export let duration;
	let dragEl;
</script>

<Draggable bind:this={dragEl}>
	<div class="rounded-3xl bg-main-500 p-7 pl-2 flex justify-between gap-2 absolute w-full z-50">
		<img src={drag} alt="handle" />
		<div class="w-3/4">{text}</div>
		<div class="w-5 text-end">{duration}</div>
		min
	</div>
</Draggable>
