<template lang="">
    <div class="container">
        <div class="home">
            <Sidebar/>
            <Feedbacks/>
        </div>
    </div>
</template>
<script>
import Sidebar from '@/layouts/sidebar/index';
import Feedbacks from '@/layouts/feedbacks/index'
export default {
    components:{
        Sidebar,
        Feedbacks
    },
    data() {
    return {
      
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
}
</script>
<style lang="">
    
</style>