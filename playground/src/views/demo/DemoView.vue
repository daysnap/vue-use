<template>
  <div class="demo-wrap">
    <br />
    <input v-model="value" />
    <p>value => {{ value }}</p>
    <br />
    <RouterLink to="/demo/use-keep-alive">push 去 UseKeepAlive</RouterLink>
    <br />
    <RouterLink to="/demo/use-keep-alive" replace>replace 去 UseKeepAlive</RouterLink>
  </div>
</template>

<script setup lang="ts">
  const value = ref('')
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
  .demo-wrap {
    background-color: rgb(0, 221, 255);
  }
</style>
