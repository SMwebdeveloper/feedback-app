<template lang="">
  <div class="container">
    <div class="feedback__about">
      <div class="feedback__about--link">
        <router-link to="/" class="link">
          <span>
            <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
          </span>
          Go back
        </router-link>
        <router-link
          :to="{ name: 'edit', params: { id: feedback.id } }"
          class="btn btn__secondary"
        >
          Edit Feedback
        </router-link>
      </div>
      <Card :feedback="feedback" :feedbackLink="feedbackLink"/>
      <FeedbackComment />
    </div>
  </div>
</template>
<script>
import Card from "@/components/feedback/FeedbackItems.vue";
import Select from "@/components/UI/Controls/Select.vue";
import FeedbackComment from "@/layouts/feedbackComment/index.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "feedback",
  components: {
    Card,
    Select,
    FeedbackComment,
  },
  data() {
    return {
      feedback: {
        title: "",
        id: "",
        type: "",
        descr: "",
      },
      feedbackLink:true,
    };
  },
  computed: {
    ...mapGetters({
      getFeedback: "getFeedback",
    }),
  },

  methods: {
    ...mapActions({
      getFeedbacks: "fetchFeedback",
    }),
    async fetchFeedback() {
      try {
        await this.getFeedbacks(this.$route.params.id);
        this.feedback = {
          title: this.getFeedback.title,
          type: this.getFeedback.type,
          id: this.getFeedback.id,
          descr: this.getFeedback.descr,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchFeedback();
  },
};
</script>
<style lang=""></style>
