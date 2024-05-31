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

	const mouseDown = (e) => {
		dragging = true;
		startX = e.clientX;
		startY = e.clientY;
	};

	const move = (e) => {
		if (!dragging) return;

		newX = startX - e.clientX;
		newY = startY - e.clientY;

		Y = el.offsetTop - newY;
		X = el.offsetLeft - newX;
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`fixed top-[${Y}px] left-[${X}px] select-none`}
	bind:this={el}
	on:mousedown={mouseDown}
  draggable="true"
>
	<slot />
</div>
<svelte:document on:mousemove={move} on:mouseup={() => (dragging = false)} />
{X}
{Y}
{dragging}
