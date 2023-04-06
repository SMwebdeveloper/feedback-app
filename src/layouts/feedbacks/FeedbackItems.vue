<template lang="">
  <div class="card">
    <div
     :key="feedback.id"
      class="card__item"
    >
      <div class="card__item--content">
        <button class="card__content--plugin">
            <img src="@/assets/img/arrow-up-contain.svg" alt="arrow up icon">
          <span>123</span>
        </button>

        <div class="card__content--info">
          <router-link to="/editFeedback" class="title">{{ feedback.title }}</router-link>
          <p class="descr">{{ feedback.descr }}</p>

          <button class="filter__btn">{{ feedback.type }}</button>
        </div>
      </div>

      <div class="card__item--message">
        <img src="@/assets/img/message-icon.svg" alt="message-icon">
        <p>2</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ['feedback']
};
</script>
<style lang=""></style>
