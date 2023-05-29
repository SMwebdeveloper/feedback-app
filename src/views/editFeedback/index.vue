<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <router-link
        :to="{ name: 'feedback', params: { id: $route.params.id } }"
        class="link"
      >
        <span>
          <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
        </span>
        Go back
      </router-link>
      <div class="feedback-form">
        <span class="feedback-form__icon feedback-form__icon--second">
          <img src="@/assets/img/combined.png" alt="combined image" />
        </span>
        <h2 class="subtitle">Editing ‘Add a dark theme option’</h2>
        <form @submit.prevent="editFeedback" v-if="feedback">
          <AppInput v-model="feedback.title" />

          <AppSelect
            :options="typeList"
            :active="feedback.type"
            @selected="($event) => (feedback.type = $event)"
          >
            <template #label>
              <div>
                <h2 class="control__title">Category</h2>
                <p class="descr">Choose a category for your feedback</p>
              </div>
            </template>
          </AppSelect>

          <AppSelect
            :options="statusList"
            :active="feedback.status"
            @selected="($event) => (feedback.status = $event)"
          >
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
            <button type="submit" class="btn btn__primary">
              Edit Feedback
            </button>
          </div>
        </form>
        <Loader v-else />
      </div>
    </div>
  </div>
</template>
<script>
import AppInput from "@/components/UI/Controls/Input";
import AppSelect from "@/components/UI/Controls/Select";
import AppTextarea from "@/components/UI/Controls/Textarea";
import Loader from "@/components/UI/Controls/Loader";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  components: {
    AppInput,
    AppSelect,
    AppTextarea,
    Loader,
  },
  data() {
    return {
      typeList: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      statusList: ["Suggestion", "Planned", "In-Progress", "Live"],
      feedback: null,
    };
  },
  computed: {
    ...mapGetters({
      getFeedback: "getFeedback",
    }),
  },
  methods: {
    ...mapActions({
      fetchFeedback: "fetchFeedback",
    }),
    editFeedback() {
      console.log(this.feedback.type);
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
  async mounted() {
    await this.fetchFeedback(this.$route.params.id);
    this.feedback = this.getFeedback;
  },
};
</script>
<style lang=""></style>
