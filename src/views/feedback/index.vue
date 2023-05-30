<template lang="">
  <div class="container">
    <div v-if="feedback" class="feedback__about">
      <div class="feedback__about--link">
        <router-link to="/" class="link">
          <span>
            <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
          </span>
          Go back
        </router-link>
        <router-link
          :to="{ name: 'edit', params: { id: feedback.feedbackId } }"
          class="btn btn__secondary"
        >
          Edit Feedback
        </router-link>
      </div>
      <Card :feedback="feedback" :feedbackLink="feedbackLink" />
      <div class="comments">
        <div class="comments-card comments__header">
          <h4 class="subtitle">4 Comment</h4>
          <Comment />
        </div>
        <div class="comments-card">
          <h4 class="subtitle">Add Comment</h4>
          <CommentForm />
        </div>
      </div>
    </div>
    <Loader v-else />
  </div>
</template>
<script>
import Card from "@/components/feedback/Item";
import Select from "@/components/Controls/Select.vue";
import Comment from "@/views/feedback/feedbackComment/Comment.vue";
import CommentForm from "@/views/feedback/feedbackComment/CommentForm.vue";
import Loader from "@/components/Controls/Loader.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "feedback",
  components: {
    Card,
    Select,
    Comment,
    CommentForm,
    Loader,
  },
  data() {
    return {
      feedback: null,
      feedbackLink: true,
    };
  },
  computed: {
    ...mapGetters({
      getFeedback: "getFeedback",
    }),
  },

  methods: {
    ...mapActions({
      fetchFeedbacks: "fetchFeedback",
    }),
  },
  async mounted() {
    await this.fetchFeedbacks(this.$route.params.id);
    this.feedback = this.getFeedback;
  },
};
</script>
<style lang=""></style>
