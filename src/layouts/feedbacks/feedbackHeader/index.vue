<template lang="">
  <div class="feedbackHeader">
    <div class="feedbackHeader__content">
      <img
        src="@/assets/img/intro-log.svg"
        alt="feedbackHeader logo img" />

      <FeedbackSelect
        :selectOn="selectOn"
        @selectOption="selectOption"
        :areOptionsVisible="areOptionsVisible"
        :selected="selected"
      />
    </div>

    <router-link to="/newFeedback" class="btn btn__primary"
      >+Add Feedback</router-link
    >
  </div>
</template>
<script>
import FeedbackSelect from "@/layouts/feedbacks/feedbackSelect/index";
export default {
  name: "FeedbackHeader",
  components: {
    FeedbackSelect,
  },
  data() {
    return {
      selectOn: [
        { name: "Most Upvotes", value: "mostUpvotes", check: true },
        { name: "Least Upvotes", value: "leastUpvotes", check: false },
        { name: "Most Comments", value: "mostComments", check: false },
        { name: "Least Comments", value: "leastComments", check: false },
      ],
      areOptionsVisible: false,
      selected: "Most Upvotes",
    };
  },
  methods: {
    selectOption(item) {
      this.selectOn.forEach((select) => {
        return (select.check = true ? false : true);
      });
      this.selected = item.name;
      item.check = true;
      this.areOptionsVisible = false;
    },

  },
};
</script>
<style lang=""></style>
