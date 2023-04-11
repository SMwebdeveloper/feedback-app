<template lang="">
  <div class="sidebar__item sidebar__item--content">
    <div class="sidebar__content--text">
      <h3 class="sidebar__title">Forntend Mentor</h3>
      <h5 class="sidebar__subtitle">FeedBack Board</h5>
    </div>

    <button
      class="hamburger"
      @click="$emit('toggle')"
      :class="`${sidebar && 'is-active'}`"
    >
      <div class="bar"></div>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    sidebar: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang=""></style>
