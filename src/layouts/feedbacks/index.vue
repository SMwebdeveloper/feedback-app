<template lang="">
  <div class="feedbacks">
    <FeedbackHeader :feedbacksLength="feedbacks.length" />
    <div
    class="feedback"
    v-if="feedbacks.length"
    >
    <FeedbackItem 
    v-for="feedback in feedbacks"
    :feedback="feedback"
    />
  </div>
  <Loader v-if="loading"/>
    <NotFeedbacks v-if="feedbacks.length === 0" />
  </div>
</template>
<script>
import FeedbackHeader from "@/layouts/feedbacks/Header";
import FeedbackItem from "@/components/feedback/Item";
import NotFeedbacks from "@/layouts/feedbacks/NotFeedbacks";
import Loader from "@/components/UI/Controls/Loader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    FeedbackHeader,
    FeedbackItem,
    NotFeedbacks,
    Loader
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getFeedbacks: "fetchFeedbacks",
    }),
    async fetchFeedbacks() {
      try {
        this.loading = true;
        await this.getFeedbacks();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

  },
  computed: {
    ...mapGetters({
      feedbacks: "getFeedbacks",
    }),
  },
  mounted() {
    this.fetchFeedbacks();
  },
};
</script>
<style lang="scss"></style>
