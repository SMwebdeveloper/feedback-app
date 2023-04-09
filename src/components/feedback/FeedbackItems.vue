<template lang="">
    <div
     :key="feedback.id"
      class="feedback__item"
    >
      <div class="feedback__item--content">
        <button class="feedback__content--reating">
            <img src="@/assets/img/arrow-up-contain.svg" alt="arrow up icon">
          <span>123</span>
        </button>

        <div class="feedback__content--info">
          <router-link 
            v-if="!feedbackLink" 
            class="title"
            :to="{name:'feedback', params:{ id: feedback.id }}"
            >
            {{ feedback.title }}
          </router-link>
          <h4 v-else class="title">
            {{ feedback.title }}
          </h4>
          <p class="descr">{{ feedback.descr }}</p>

          <span class="feedback__item--type">{{ feedback.type }}</span>
        </div>
      </div>

      <div class="feedback__item--message">
        <img src="@/assets/img/message-icon.svg" alt="message-icon">
        <p>2</p>
      </div>
    </div>
</template>
<script>
export default {
    name:'feedbackItems',
    props:{
      feedback:{
        type:Object,
        required:true
      },
      feedbackLink:{
        type:Boolean,
        default:false
      }
    },
};
</script>
<style lang=""></style>
