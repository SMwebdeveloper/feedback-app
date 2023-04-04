<template>
  <div class="container">
    <div class="home__wrapper">
      <div class="home__wrapper--item">
        <Sidebar :sidebarAnim="sidebarAnim" />
      </div>
      <div class="home__wrapper--item">
        <Intro />
        <Card v-if="cards" :cards="cards"/>
        <NotFound v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/layouts/Sidebar.vue";
import Intro from "@/layouts/Intro.vue";
import NotFound from "@/layouts/NotFound.vue";
import Card from "@/layouts/Card.vue";

export default {
  components: {
    Sidebar,
    Intro,
    NotFound,
    Card,
  },
 
};
</script>

<style lang="scss"></style>
