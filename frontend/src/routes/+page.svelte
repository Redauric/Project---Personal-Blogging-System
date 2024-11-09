<!-- Main page is actually /articles so redirecting all homepage requests to /articles -->

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => goto("articles"));
</script>

<div></div>

<style>
</style>
