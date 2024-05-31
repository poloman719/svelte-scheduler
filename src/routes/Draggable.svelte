<script>
// @ts-nocheck

	let dragging = false;
  let el;
  let newX = 0, newY = 0, startX = 0, startY = 0, X = 0, Y = 0;

  const mouseDown = (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
  }

  const move = (e) => {
    if (!dragging) return;

    newX = startX - e.clientX;
    newY = startY - e.clientY;

    Y = el.offsetTop - newY
    X = el.offsetLeft - newX
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fixed top-[{Y}] left-[{X}]"
  bind:this={el}
  on:mousedown={mouseDown}
  on:mouseup={() => (dragging = false)}
  on:mousemove={move}
>
	<slot />
</div>
