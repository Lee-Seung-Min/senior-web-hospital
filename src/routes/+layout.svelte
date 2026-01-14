<script>
  import { onMount } from "svelte";
  import Head from "$lib/sub/Head.svelte";
  import Footer from "$lib/sub/Footer.svelte";
  export const mainlayout = false;
  // export const ssr = false;
  import "../assets/css/common.css";
  import "../assets/css/reset.css";
  import "../assets/css/jquery-ui.css";
  import "../assets/font/XEIcon/xeicon.min.css";
  import "../assets/font/icomoon/style.css";
  import "../assets/font/pretendard.css";
  import "../assets/css/publish.css";
  import { afterNavigate, beforeNavigate } from "$app/navigation";

  // import '../assets/js/jquery-3.3.1.min';
  // import '../assets/js/html5shiv.min';
  // import '../assets/js/placeholders.min';
  // import '../assets/js/common.js';
  // import '../assets/js/menu.js';
  onMount(() => {});
</script>

<Head />
<div class="app">
  <main>
    <div id="content">
      <slot />
    </div>
  </main>
</div>
