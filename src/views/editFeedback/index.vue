<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <router-link :to="{ name: 'feedback', params: { id: $route.params.id }}" class="link">
        <span>
          <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
        </span>
        Go back
      </router-link>
      <EditFeedback />
    </div>
  </div>
</template>
<script>
import EditFeedback from "@/layouts/editFeedback";
export default {
  components: {
    EditFeedback,
  },
};
</script>
<style lang=""></style>
