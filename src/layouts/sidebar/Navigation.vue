<template lang="">
  <div class="sidebar__item sidebar__item--filter">
    <button
      class="sidebar__btn"
      v-for="tab in tabs"
      :key="tab"
      :class="{'active': tab === active }"
      @click="active = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      active: 'All',
      tabs: ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature' ]
    };
  },
  watch: {
    active: {
      handler (value) {
        this.filterFeedbacks(value)
        console.log(333)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      setSidebarTab: "setSidebarTab",
      filterFeedbacks: 'filterFeedbacks'
    })
  }
};
</script>
<style lang="">
</style>
