<template lang="">
  <div class="container">
    <div class="home">
      <div class="sidebar">
        <Header :sidebar="sidebar" @toggle="sidebar = !sidebar" />
        <div
          class="sidebar__components"
          :class="`${sidebar && 'sidebar__mobile'}`"
        >
          <Navigation />
          <Roadmap />
        </div>
      </div>
      <div class="feedbacks">
        <FeedbackHeader :feedbacksLength="feedbacks.length" />
        <div class="feedback" v-if="feedbacks.length">
          <FeedbackItem
            v-for="feedback in feedbacks"
            :feedback="feedback"
            :key="feedback.id"
          />
        </div>
        <Loader v-if="loading" />
        <NotFeedbacks v-if="!feedbacks.length" />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/views/home/sidebar/Header";
import Navigation from "@/views/home/sidebar/Navigation";
import Roadmap from "@/views/home/sidebar/Roadmap";
import FeedbackHeader from "@/views/home/feedbacks/Header";
import FeedbackItem from "@/components/feedback/Item";
import NotFeedbacks from "@/views/home/feedbacks/NotFeedbacks";
import Loader from "@/components/Controls/Loader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header,
    Navigation,
    Roadmap,
    FeedbackHeader,
    FeedbackItem,
    NotFeedbacks,
    Loader,
  },
  data() {
    return {
      sidebar: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      getFeedbacks: "fetchFeedbacks",
      filterFeedbacks: "filterFeedbacks"
    }),
    async fetchFeedbacks() {
      try {
        this.loading = true;
        await this.getFeedbacks();
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters({
      feedbacks: "getFeedbacks",
    }),
  },
  async mounted() {
    await this.fetchFeedbacks();
    this.filterFeedbacks("All");
    console.log(this.feedbacks)
  },
};
</script>
<style lang=""></style>
