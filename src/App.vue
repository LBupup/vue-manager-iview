<template>
  <div id="app">
    <!-- <router-view name="blank"></router-view> -->
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
export default {
    name: 'app',
    
}
</script>
