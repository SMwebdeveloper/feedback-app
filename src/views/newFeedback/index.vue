<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <router-link to="/" class="link">
        <span>
          <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
        </span>
        Go back
      </router-link>
      <CreateFeedback />
    </div>
  </div>
</template>
<script>
import CreateFeedback from "@/layouts/createFeedback";
export default {
  components: {
    CreateFeedback,
  },
};
</script>
<style lang=""></style>
