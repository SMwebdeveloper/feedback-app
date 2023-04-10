<template lang="">
  <div class="comment">
    <img src="@/assets/img/user.png" alt="user image" />

    <div class="comment--main">
      <div class="comment__content">
        <div>
          <h5 class="commnet__title">Elijah Moss</h5>
          <p class="descr__small">@hexagon.bestagon</p>
        </div>
        <button @click="replyForm = !replyForm" class="comment__btn">Reply</button>
      </div>
      <p class="descr">
        Also, please allow styles to be applied based on system preferences. I
        would love to be able to browse Frontend Mentor in the evening after my
        device’s dark mode turns on without the bright background it currently
        has.
      </p>
      <form @submit.prevent v-if="replyForm">
        <textarea class="comment__form--textarea"></textarea>
        <button class="btn btn__primary">Post reply</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            replyComment:'',
            replyForm:false
        }
    }
};
</script>
<style lang=""></style>
