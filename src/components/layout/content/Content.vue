<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
export default {
    name: 'Content'
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background-color: #eee;
  overflow: hidden;
}
</style>
