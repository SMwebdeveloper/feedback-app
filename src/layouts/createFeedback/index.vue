<template lang="">
  <div class="feedback-form">
    <span class="feedback-form__icon">
      <img src="@/assets/img/plus.png" alt="plus image" />
    </span>
    <h2 class="subtitle">Create new Feedback</h2>
    <form @submit.prevent="onSubmit">
      <AppInput v-model="feedback.title" />
      <div>
        <h2 class="control__title">Category</h2>
        <p class="descr">Choose a category for your feedback</p>
        <select
          name=""
          id=""
          v-model="feedback.type"
          class="control__item control__select"
        >
          <option
            v-for="item in selectList"
            :key="item.name"
            :value="item.name"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <AppTextarea v-model="feedback.descr" />

      <div class="feedback-form__btn">
        <router-link to="/" class="btn btn__dark">Cancel</router-link>
        <button class="btn btn__primary">Add Feedback</button>
      </div>
    </form>
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
      selectList: [
        {
          name: "Feature",
          type: true,
          id: "1",
        },
        {
          name: "UI",
          type: false,
          id: "2",
        },
        {
          name: "UX",
          type: false,
          id: "3",
        },
        {
          name: "Enhancement",
          type: false,
          id: "4",
        },
        {
          name: "Bug",
          type: false,
          id: "5",
        },
      ],
      feedback: {
        title: "",
        type: "",
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
