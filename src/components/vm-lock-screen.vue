<template>
  <div class="vm-lock-screen vm-panel">
   <div class="company">
     <img src="../assets/img/logo.png" height="18" alt="">
     <span>VUE</span>MANAGER
   </div>
   <div class="user">
     <img src="../assets/img/photo.jpg" height="100" alt="">
     <p class="name">JesseLuo</p>
   </div>
   <i-input v-model="password" placeholder="Please enter code" type="password" :style="{ width: 300 + 'px' }"></i-input>
   <Button type="primary">Enter</Button>
  </div>
</template>
<script>
  export default {
    name: 'VmLockScreen',
    data: function () {
      return {
        password: ''
      }
    }
  }
</script>
