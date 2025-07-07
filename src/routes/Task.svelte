<script>
	// @ts-nocheck

	import Time from './Time.svelte';
	import drag from '$lib/_drag.svg';
	import { draggable } from '$lib/draggable';
	import Draggable from './Draggable.svelte';

	export let text = '';
	export let duration = 0;
	export let time = 0;
	export let onTextChange;
	export let onDurationChange;
	export let onStartDrag;
	export let updateDistance = () => {};
	export let adjacent;
	export let dragging = false;

	let dragEl;
	let hour;
	let minute;
	let startX;
	let startY;
	let draggableArea;
	$: {
		const date = new Date(time);
		hour = date.getHours();
		minute = date.getMinutes();
	}

	const onMouseDown = (e) => {
		if (e.target != draggableArea) return;
		e.preventDefault();
		dragging = true;
		startX = e.clientX;
		startY = e.clientY;
		const rect = draggableArea?.getClientRects()[0];
		onStartDrag(rect.x, rect.y, Math.floor(rect.width), startX, startY);
	};

	$: {
		if (adjacent) {
			const rect = draggableArea?.getClientRects()[0];
			updateDistance(rect.y);
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div>
	<div
		class="rounded-3xl bg-main-500 p-7 pl-2 flex justify-between gap-2 relative hover:cursor-grab"
		class:opacity-50={dragging}
		on:mousedown={onMouseDown}
		bind:this={draggableArea}
	>
		<img src={drag} alt="handle" title="drag" class="pointer-events-none select-none" />
		<input type="text" class="outline-none w-3/4" bind:value={text} on:change={onTextChange} />
		<input
			type="text"
			class="outline-none w-5 text-end"
			bind:value={duration}
			on:change={onDurationChange}
		/>
		min
	</div>
</div>
<div class="text-center"><Time {hour} {minute} /></div>
<svelte:document />
