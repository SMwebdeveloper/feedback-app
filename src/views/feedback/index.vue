<template lang="">
  <div class="container">
    <div class="feedback__about">

      <div class="feedback__about--link">
        <router-link to="/" class="link">
          <span>
            <img src="@/assets/img/arrow-left.svg" alt="arrow icon" />
          </span>
          Go back
        </router-link>
        <router-link to="/editFeedback" class="btn btn__secondary">
            Edit Feedback
        </router-link>
      </div>
      <Card :feedback='feedback'/>
      <FeedbackComment/>
    </div>
  </div>
</template>
<script>
import Card from '@/components/feedback/FeedbackItems.vue'
import Select from '@/components/UI/Controls/Select.vue';
import FeedbackComment from '@/layouts/feedbackComment/index.vue'
export default {
    name:'feedback',
    components:{
        Card,
        Select,
        FeedbackComment
    },
    data() {
        return {
            feedback:{
                id:'1',
                title:'Samandar',
                descr:'Mirzarahmonov',
                type:'Bug'
            }
        }
    },
};
</script>
<style lang=""></style>
