<template lang="">
  <div class="container">
    <div class="home">
      <Sidebar />
      <Feedbacks />
    </div>
  </div>
</template>
<script>
import Sidebar from "@/layouts/sidebar/index";
import Feedbacks from "@/layouts/feedbacks/index";
export default {
  components: {
    Sidebar,
    Feedbacks,
  },
};
</script>
<style lang=""></style>
