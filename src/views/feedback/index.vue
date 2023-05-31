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
          <h4 class="subtitle">{{comments.length}} Comment</h4>
          <Comment v-for="comment in comments"  :comment="comment"/>
        </div>
        <div class="comments-card">
          <h4 class="subtitle">Add Comment</h4>
          <CommentForm @newComment="($event) => addComment($event)" />
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
import axios from "axios";

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
      comments: [],
      feedbackId: this.$route.params.id
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
    async addComment(comment) {
      await axios.post(
        "https://feedback-8e94b-default-rtdb.firebaseio.com/comments.json",
        comment
      );
      this.comments.push(comment)
    },
  },
  async mounted() {
    // fetch feedbacks
    await this.fetchFeedbacks(this.feedbackId);
    this.feedback = this.getFeedback;

    // fetch comments
    const { data } = await axios.get(
      "https://feedback-8e94b-default-rtdb.firebaseio.com/comments.json"
    );
    const res = Object.values(data)
    console.log(res)
    res.forEach(item => {
      if(item.feedbackId == this.feedbackId ) {
        this.comments.push(item)
      }
    })
  },
};
</script>
<style lang=""></style>
