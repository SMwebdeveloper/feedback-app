<template>
  <div class="container">
    <div class="home__wrapper">
      <Sidebar :sidebarAnim="sidebarAnim"/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/layouts/Sidebar.vue';

export default {
  components:{
    Sidebar
  },
  data() {
    return {
      sidebarAnim: false,
    };
  },
};
</script>
