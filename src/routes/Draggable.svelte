<script>
// @ts-nocheck

	let dragging;

  const move = (e) => {
    if (!dragging) return;
    
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fixed"
  on:mousedown={() => (dragging = true)}
  on:mouseup={() => (dragging = false)}
  on:mousemove={move}
>
	<slot />
</div>
