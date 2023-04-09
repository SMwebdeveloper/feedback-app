<template lang="">
  <div class="comments">
    <div class="comments-card comments__header">
      <h4 class="subtitle">4 Comment</h4>
      <Comment />
    </div>
    <div class="comments-card">
      <h4 class="subtitle">Add Comment</h4>
      <CommentForm />
    </div>
  </div>
</template>
<script>
import Comment from '@/layouts/feedbackComment/Comment.vue';
import CommentForm from '@/layouts/feedbackComment/CommentForm.vue'

export default {
    components:{
        Comment,
        CommentForm
    },
    
}
</script>
<style lang=""></style>
