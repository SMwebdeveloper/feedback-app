<template>
  <div class="container">
    <div class="home__wrapper">
        <div class="home__wrapper--item">
          <Sidebar :sidebarAnim="sidebarAnim"/>
        </div>
        <div class="home__wrapper--item">
          <Intro/>
          <NotFound/>
        </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layouts/Sidebar.vue';
import Intro from '@/layouts/Intro.vue';
import NotFound from '@/layouts/NotFound.vue';

export default {
  components:{
    Sidebar,
    Intro,
    NotFound
  },
  data() {
    return {
      sidebarAnim: false,
    };
  },
};
</script>

<style lang="scss">

</style>