<template>
  <div id="app">
    <router-view name="blank"></router-view>
    <router-view class="app"></router-view>
  </div>
</template>
<script>
export default {
    name: 'app',
}
</script>
<style scoped>
.app{
  overflow-x: hidden;
}
</style>

