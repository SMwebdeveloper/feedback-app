<template lang="">
  <div class="feedbackForm">
    <span class="feedbackForm__icon">
      <img src="@/assets/img/plus.png" alt="plus image" />
    </span>
    <h2 class="subtitle">Create new Feedback</h2>
    <form>
      <AppInput />
      <AppSelect
        @selectOn="selectOption"
        :options="selectList"
      >
        <template #label>
          <div>
            <h2 class="control__title">Category</h2>
            <p class="descr">Choose a category for your feedback</p>
          </div>
        </template>
      </AppSelect>
      <AppTextarea />
    </form>

    <div class="feedbackForm__btn">
      <router-link to="/" class="btn btn__dark">Cancel</router-link>
      <button class="btn btn__primary">Add Feedback</button>
    </div>
  </div>
</template>
<script>
import AppInput from "@/components/UI/Controls/Input";
import AppSelect from "@/components/UI/Controls/Select";
import AppTextarea from "@/components/UI/Controls/Textarea";
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

    };
  },
  methods: {
    selectOption(item) {
      
      item.type = true
      this.selected = item.name;
    },
  },
};
</script>
<style lang=""></style>
