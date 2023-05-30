<template lang="">
  <form class="comment__form" @submit.prevent="handleClick(comment)">
    <textarea class="comment__form--textarea" v-model="comment"></textarea>
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
      comment:''
    }
  },
  methods:{
    handleClick(e){
      console.log(e)
      this.$store.dispatch('addComments', { e })
    }
  }
};
</script>
<style lang=""></style>
