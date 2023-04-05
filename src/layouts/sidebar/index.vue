<template lang="">
  <div class="sidebar">
    <Header :sidebar="sidebar" @toggle="sidebar = !sidebar"/>
    <div class="sidebar__components" :class="`${sidebar && 'sidebar__mobile'}`">
      <Navigation />
      <Roadmap />
    </div>
  </div>
</template>
<script>
import Header from "@/layouts/sidebar/Header";
import Navigation from "@/layouts/sidebar/Navigation";
import Roadmap from "@/layouts/sidebar/Roadmap";
export default {
  components: {
    Header,
    Navigation,
    Roadmap,
  },
  data(){
    return{
        sidebar:false,
    }
  }
};
</script>
<style lang=""></style>
