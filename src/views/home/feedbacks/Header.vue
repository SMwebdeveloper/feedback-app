<template lang="">
  <div class="feedback-header">
    <div class="feedback-header__content">
      <div class="feedback-header__content--suggetions">
        <img src="@/assets/img/suggetion.svg" alt="suggetion image" />
        <h4 class="feedback-header__content--suggetions__title">
          <span>{{ feedbacksLength }}</span>
          Suggetions
        </h4>
      </div>

      <Select :options="selectOptions" @selectOption="selectOption" />
    </div>
     
    <div v-if="user == null"  style="display:flex">
      <router-link to="/register" class="btn btn__primary">Register</router-link> |
      <router-link to="/signin" class="btn btn__secondary">SignIn</router-link>
    </div>
    <div v-else style="display:flex; align-items:center">
      <h4 style="color:white; margin-right:20px; font-size:22px">{{user.email}}</h4>
      <router-link to="/create" class="btn btn__primary"
        >+Add Feedback</router-link
      >
    </div>
  </div>
</template>
<script>
import Select from "@/views/home/feedbacks/Select";
import { mapGetters } from "vuex";
export default {
  name: "Feedback-header",
  components: {
    Select,
  },
  props: {
    fedbacksLength: {
      typeof: Number,
      default: 0,
    },
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
  computed: {
    ...mapGetters({
      feedbacksLength: "getFeedbacksLength",
      user: "getUser",
    }),
  },
  mounted () {
    const users = this.$store.state.users
  }
};
</script>
<style lang=""></style>
