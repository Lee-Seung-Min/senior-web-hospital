<script>
    export let sectionClass = "z_alert";
    export let popUp=false;
</script>
{#if popUp}
    <section class={sectionClass}>
        <div class="bg"></div>
        <div class="box_1">
        <p class="tex"><slot></slot></p>
        <slot name="btns"></slot>
        </div>
    </section>
{/if}