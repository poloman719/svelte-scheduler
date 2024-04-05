<script>
  import "../app.css";
  import SideBar from "./SideBar.svelte"
</script>

<div class="flex w-full h-screen text-main-50">
  <SideBar />
  <div class="flex-grow flex">
    <slot />
  </div>
</div>