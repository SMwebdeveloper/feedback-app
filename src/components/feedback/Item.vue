<template lang="">
  <div :key="feedback.id" class="feedback__item">
    <div class="feedback__item--content">
      <button class="feedback__content--reating">
        <img src="@/assets/img/arrow-up-contain.svg" alt="arrow up icon" />
        <span>123</span>
      </button>

      <div class="feedback__content--info">
        <router-link
          v-if="!feedbackLink && user"
          class="title"
          :to="{ name: 'feedback', params: { id: feedback.feedbackId } }"
        >
          {{ feedback.title }}
        </router-link>
        <h4 v-else class="title">
          {{ feedback.title }}
        </h4>
        <p class="descr">{{ feedback.descr }}</p>

        <span class="feedback__item--type">{{ feedback.type }}</span>
        <img :src="feedback.img" alt="" class="feedback-image">
      </div>
    </div>

    <div class="feedback__item--message">
      <img src="@/assets/img/message-icon.svg" alt="message-icon" />
      <p>2</p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: "FeedbackItem",
  props: {
    feedback: {
      type: Object,
      required: true,
    },
    feedbackLink: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    ...mapGetters({
      user:"getUser"
    })
  }
};
</script>
<style lang="css">

.feedback-image{
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
