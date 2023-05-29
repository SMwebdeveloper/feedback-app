<template lang="">
  <div class="container">
    <div class="feedbackPage">
      <router-link to="/" class="link">
        <span>
          <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
        </span>
        Go back
      </router-link>
      <div class="feedback-form">
        <span class="feedback-form__icon">
          <img src="@/assets/img/plus.png" alt="plus image" />
        </span>
        <h2 class="subtitle">Create new Feedback</h2>
        <form @submit.prevent="onSubmit">
          <AppInput v-model="feedback.title" />

          <AppSelect
            :options="selectList"
            @selected="($event) => (feedback.type = $event)"
          >
            <template #label>
              <div>
                <h2 class="control__title">Category</h2>
                <p class="descr">Choose a category for your feedback</p>
              </div>
            </template>
          </AppSelect>
          <AppTextarea v-model="feedback.descr" />

          <div class="feedback-form__btn">
            <router-link to="/" class="btn btn__dark">Cancel</router-link>
            <button class="btn btn__primary">Add Feedback</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import AppInput from "@/components/UI/Controls/Input";
import AppSelect from "@/components/UI/Controls/Select";
import AppTextarea from "@/components/UI/Controls/Textarea";
import { v4 as uuidv4 } from "uuid";
import { mapActions } from "vuex";

export default {
  components: {
    AppInput,
    AppSelect,
    AppTextarea,
  },
  data() {
    return {
      selectList: ["Feature", "UI", "UX", "Enhancement", "Bug"],
      feedback: {
        title: "",
        type: "Feature",
        descr: "",
        id: uuidv4(),
      },
    };
  },
  methods: {
    ...mapActions({
      addFeedback: "addFeedback",
    }),
    onSubmit() {
      this.addFeedback(this.feedback).then((res) => this.$router.push("/"));
    },
  },
};
</script>
<style lang=""></style>
