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
          <router-link :to="{name:'feedback', params:{ id: feedback.id }}" class="title">{{ feedback.title }}</router-link>
          <p class="descr">{{ feedback.descr }}</p>

          <div class="filter__btn">{{ feedback.type }}</div>
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
    props: ['feedback'],
};
</script>
<style lang=""></style>
