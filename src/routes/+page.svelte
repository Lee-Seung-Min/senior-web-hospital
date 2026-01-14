<script>
  import { goto } from "$app/navigation";
  import { URL } from "$lib/URL";
  import { onMount } from "svelte";

  onMount(() => {
    goto(URL.awLogin);
  });
</script>
