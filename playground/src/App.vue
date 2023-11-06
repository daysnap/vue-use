<template>
  <RouterView v-slot="{ Component }">
    <Transition :name="transitionName">
      <KeepAlive max="10" :include="includes">
        <Component class="view-wrap" :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
  <!-- <DebugPanel>
    <p>includes: {{ includes }}</p>
    <p>transitionName: {{ transitionName }}</p>
  </DebugPanel> -->
</template>

<script setup lang="ts">
  import { useTransitionName, useKeepAliveByPosition } from '@daysnap/vue-use'

  const { includes } = useKeepAliveByPosition(false)

  const transitionName = useTransitionName({
    enterClass: 'slide-plus-left',
    leaveClass: 'slide-plus-right',
  })
</script>

<style lang="scss">
  @import '@/assets/scss/global.scss';
  .view-wrap {
    @extend %pa;
    @extend %t0;
    @extend %l0;
    @extend %w100;
    @extend %h100;
    @extend %bsb;
    @extend %oya;
    background-color: #f2f3f4;
  }
</style>
