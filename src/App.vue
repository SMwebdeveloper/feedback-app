<template>
  <div id="app">
    <HomeView/>
    <router-view/>
  </div>
</template>
<script>
import HomeView from './views/HomeView.vue';
export default{
  comments:{
    HomeView
  }
}
</script>
<style lang="scss">
</style>
