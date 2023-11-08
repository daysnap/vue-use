<template>
  <HorView>
    <p></p>
  </HorView>
</template>

<script setup lang="ts">
  import { useAsyncTask } from '@daysnap/vue-use'

  const {} = useAsyncTask()
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define.scss';
</style>
