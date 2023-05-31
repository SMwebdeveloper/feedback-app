<template lang="">
  <form class="comment__form" @submit.prevent="handleClick">
    <textarea class="comment__form--textarea" v-model="comment.text"></textarea>
    <div class="comment__form--footer">
      <p>225 characters left</p>
      <button class="btn btn__primary">Post Comment</button>
    </div>
  </form>
</template>
<script>
export default {
  data () {
    return {
      comment:{
        text: ""
      }
    }
  },
  methods:{
    handleClick(){
      this.$emit("newComment",{feedbackId: this.$route.params.id, ...this.comment})
      this.comment.text = ""
    }
  },
  mounted () {
    console.log(this.$route.params.id)
  }
};
</script>
<style lang=""></style>
