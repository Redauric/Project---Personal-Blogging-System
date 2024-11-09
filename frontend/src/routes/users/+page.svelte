<!-- In case user manually navigate to this page, redirect to my account if user is logged in, else redirect to /articles -->

<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
  
    onMount(() => goto("/users/account"));
  </script>