<template>
  <div class="container">
    <div class="home__wrapper">
        <div class="home__wrapper--item">
          <Sidebar :sidebarAnim="sidebarAnim"/>
        </div>
        <div class="home__wrapper--item">
          <Intro/>
        </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layouts/Sidebar.vue';
import Intro from '@/layouts/Intro.vue';

export default {
  components:{
    Sidebar,
    Intro
  },
  data() {
    return {
      sidebarAnim: false,
    };
  },
};
</script>

<style lang="scss">
.home__wrapper{
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
</style>