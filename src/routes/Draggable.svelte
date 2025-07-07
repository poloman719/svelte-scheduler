<script>
	// @ts-nocheck
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let absolute = false;
	export let X = 0;
	export let Y = 0;
	export let onDragEnd = () => {};

	let dragging = false;
	let el;
	let newX = 0;
	let newY = 0;
	let startX = 0;
	let startY = 0;
	let offsetX = X;
	let offsetY = Y;

	console.log(X, Y);

	export const startDrag = (x, y) => {
		console.log('drag started');
		dragging = true;
		startX = x;
		startY = y;
	};

	export const endDrag = (e) => {
		dragging = false;
		offsetX = X;
		offsetY = Y;
		onDragEnd();
	};

	// const mouseUp = (e) => {
	// };

	const move = (e) => {
		if (!dragging) return;

		newX = startX - e.clientX;
		newY = startY - e.clientY;

		X = offsetX - newX;
		Y = offsetY - newY;

		dispatch('move', {
			X: newX,
			Y: newY
		});

		// Y = el.offsetTop - newY;
		// X = el.offsetLeft - newX;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`${absolute ? 'absolute' : 'relative'} select-none`}
	style={`top: ${Y}px; left: ${X}px;`}
	draggable="false"
	on:mousedown
>
	<slot />
</div>
<svelte:document on:mousemove={move} />
