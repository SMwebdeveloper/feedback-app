<template lang="">
  <div v-if="feedback" class="feedback-form">
    <span class="feedback-form__icon feedback-form__icon--second">
      <img src="@/assets/img/combined.png" alt="combined image" />
    </span>
    <h2 class="subtitle">Editing ‘Add a dark theme option’</h2>
    <form @submit.prevent="editFeedback">
      <AppInput v-model="feedback.title" />

      <AppSelect :options="selectList" :active="feedback.type">
        <template #label>
          <div>
            <h2 class="control__title">Category</h2>
            <p class="descr">Choose a category for your feedback</p>
          </div>
        </template>
      </AppSelect>

      <AppSelect :options="selectSecondList" v-model="feedback.status">
        <template #label>
          <div>
            <h2 class="control__title">Update Status</h2>
            <p class="descr">Change feature state</p>
          </div>
        </template>
      </AppSelect>

      <AppTextarea v-model="feedback.descr" />

      <div class="feedback-form__btn">
        <button
          type="button"
          @click="deleteFeedback($route.params.id)"
          class="btn btn__danger"
        >
          Delete
        </button>
        <router-link
          :to="{ name: 'feedback', params: { id: feedback.feedbackId } }"
          class="btn btn__dark"
          >Cancel</router-link
        >
        <button type="submit" class="btn btn__primary">Edit Feedback</button>
      </div>
    </form>
  </div>
</template>
<script>
import AppInput from "@/components/UI/Controls/Input";
import AppSelect from "@/components/UI/Controls/Select";
import AppTextarea from "@/components/UI/Controls/Textarea";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    AppInput,
    AppSelect,
    AppTextarea,
  },
  data() {
    return {
      selectList: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      selectSecondList: ["Suggestion", "Planned", "In-Progress", "Live"],
      feedback: {
        title: "",
        type: "",
        descr: "",
        status: "",
        feedbackId: "",
      },
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
        await this.getFeedbacks(this.$route.params.feedbackId);
      } catch (error) {
        console.log(error);
      }
    },

    editFeedback() {
      console.log(this.feedback.type)
      this.$store
        .dispatch("editFeedback", this.feedback)
        .then(() => this.$router.push(`/feedback/${this.feedback.feedbackId}`));
    },

    async deleteFeedback(id) {
      await axios
        .delete(
          `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${id}.json`
        )
        .then(() => this.$router.push("/"));
    },
  },
  mounted() {
    this.fetchFeedback();
    this.feedback = {
      title: this.getFeedback.title,
      type: this.getFeedback.type,
      id: this.getFeedback.id,
      descr: this.getFeedback.descr,
      feedbackId: this.getFeedback.feedbackId,
    };
  }
};
</script>
<style lang=""></style>
