<template>
  <div>
    <br />
    <HorCellGroup>
      <HorCell
        v-for="(item, index) in demos"
        :key="index"
        :label="item.meta?.title"
        arrow
        @click="$router.push(item.path)"
      />
    </HorCellGroup>
  </div>
</template>

<script setup lang="ts">
  const router = useRouter()

  const demos = computed(() => {
    return router.options.routes.filter((item) => {
      const { path } = item
      return path.startsWith('/demo/') && path.split('/').length === 3
    })
  })
</script>
