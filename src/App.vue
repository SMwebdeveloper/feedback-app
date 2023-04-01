<template>

  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
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
