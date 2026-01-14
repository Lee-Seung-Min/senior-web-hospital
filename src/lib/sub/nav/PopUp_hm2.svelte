<script>
    export let sectionClass = "z_alert";
    export let popup_hm2 = false;
</script>
  
  <!--팝업 창-->
  {#if popup_hm2}
    <section class={sectionClass}>
      <div class="bg" />
      <div class="box_1">
        <p class="tex"><slot /></p>
        <slot name="btns" />
      </div>
    </section>
  {/if}