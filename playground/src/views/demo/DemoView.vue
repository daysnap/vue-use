<template>
  <HorView :left-arrow="false">
    <br />
    <input v-model="value" />
    <p>value => {{ value }}</p>
    <br />
    <RouterLink to="/demo/use-keep-alive">push 去 UseKeepAlive</RouterLink>
    <br />
    <RouterLink to="/demo/use-keep-alive" replace>replace 去 UseKeepAlive</RouterLink>
  </HorView>
</template>

<script setup lang="ts">
  const value = ref('')
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
</style>
