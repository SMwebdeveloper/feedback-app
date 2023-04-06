<template lang="">
  <div class="feedbackHeader">
    <div class="feedbackHeader__content">
      <div class="feedbackHeader__content--suggetions">
        <img src="@/assets/img/suggetion.svg" alt="suggetion image">
        <h4 class="feedbackHeader__content--suggetions__title">
          <span>{{feedbacksLength}}</span>
          Suggetions
        </h4>
      </div>

      <FeedbackSelect
        :options="selectOptions"
        @selectOption="selectOption"
      />
    </div>

    <router-link to="/addFeedback" class="btn btn__primary"
      >+Add Feedback</router-link
    >
  </div>
</template>
<script>
import FeedbackSelect from "@/components/feedback/feedbackSelect";
import { mapGetters } from "vuex";
export default {
  name: "FeedbackHeader",
  components: {
    FeedbackSelect,
  },
  props:{
   fedbacksLength:{
    typeof:Number,
    default:0
   }
  },
  data() {
    return {
      selectOptions: [
        { name: "Most Upvotes", value: "mostUpvotes", check: true },
        { name: "Least Upvotes", value: "leastUpvotes", check: false },
        { name: "Most Comments", value: "mostComments", check: false },
        { name: "Least Comments", value: "leastComments", check: false },
      ],
    };
  },
  methods: {
    selectOption(item) {
      this.selected = item.name;
      this.areOptionsVisible = false;
    },

  },
  computed:{
    ...mapGetters({
       feedbacksLength:'getFeedbacksLength'
    })
  }
};
</script>
<style lang=""></style>
