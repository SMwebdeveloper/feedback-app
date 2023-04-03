<template>
  <div class="container">
    <div class="home__wrapper">
      <div class="home__wrapper--item">
        <Sidebar :sidebarAnim="sidebarAnim" />
      </div>
      <div class="home__wrapper--item">
        <Intro />
        <Card v-if="cards" :cards="cards"/>
        <NotFound v-else/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/layouts/Sidebar.vue";
import Intro from "@/layouts/Intro.vue";
import NotFound from "@/layouts/NotFound.vue";
import Card from "@/layouts/Card.vue";

export default {
  components: {
    Sidebar,
    Intro,
    NotFound,
    Card,
  },
  data() {
    return {
      sidebarAnim: false,
      cards: [
        {
          id: 0,
          text: "Easier to search for solutions based on a specific stack.",
          title: "Add tags for solutions",
          type: "Enhancement",
        },
        {
          id: 1,
          text: "It would help people with light sensitivities and who prefer dark mode.",
          title: "Add a dark theme option",
          type: "UI",
        },
        {
          id: 2,
          text: "Challenge-specific Q&A would make for easy reference.",
          title: "Q&A within the challenge hubs",
          type: "Feature",
        },
        {
          id: 3,
          text: "Images and screencasts can enhance comments on solutions.",
          title: "Allow image/video upload to feedback",
          type: "Bug",
        },
        {
          id: 4,
          text: "Stay updated on comments and solutions other people post.",
          title: "Ability to follow others",
          type: "UX",
        },
      ],
    };
  },
};
</script>

<style lang="scss"></style>
