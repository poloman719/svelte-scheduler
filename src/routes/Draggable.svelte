<script>
	// @ts-nocheck

	let dragging = false;
	let el;
	let newX = 0;
	let newY = 0;
	let startX = 0;
	let startY = 0;
	let X = 50;
	let Y = 50;
	let offsetX = 50;
	let offsetY = 50;

	const mouseDown = (e) => {
		dragging = true;
		startX = e.clientX;
		startY = e.clientY;
	};

	const mouseUp = (e) => {
		offsetX = X;
		offsetY = Y;
	};

	const move = (e) => {
		if (!dragging) return;

		newX = startX - e.clientX;
		newY = startY - e.clientY;

		X = offsetX - newX;
		Y = offsetY - newY;

		// Y = el.offsetTop - newY;
		// X = el.offsetLeft - newX;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`relative select-none`}
	style={`top: ${Y}px; left: ${X}px;`}
	bind:this={el}
	on:mousedown={mouseDown}
	on:mouseup={mouseUp}
	draggable="false"
>
	<slot />
</div>
<svelte:document on:mousemove={move} on:mouseup={() => (dragging = false)} />
{startX - newX}
{startY - newY}
{startX}
{startY}
{offsetX}
{offsetY}
{dragging}
