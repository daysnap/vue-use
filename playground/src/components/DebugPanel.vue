<template>
  <div class="debug-panel">
    <h2>监控面板：</h2>
    <div class="debug-panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  //
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .debug-panel {
    @extend %pf;
    @extend %cfff;
    @extend %pen;
    font-size: j(12);
    top: 10vh;
    width: 40vw;
    right: j(10);
    padding: j(10);
    border-radius: j(4);
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99999;
  }
  .debug-panel-content {
    margin-top: j(6);
  }
</style>
