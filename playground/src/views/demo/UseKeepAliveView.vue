<template>
  <HorView>
    <br />
    <input v-model="value" />
    <p>value => {{ value }}</p>
    <br />
    <RouterLink to="/demo/use-keep-alive/push">PUSH INFO</RouterLink>
    <br />
    <RouterLink to="/demo/use-keep-alive/replace" replace>REPLACE INFO</RouterLink>
    <br />
  </HorView>
</template>

<script setup lang="ts">
  const value = ref('')
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
</style>
