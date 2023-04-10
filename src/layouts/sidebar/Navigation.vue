<template lang="">
  <div class="sidebar__item sidebar__item--filter">
    <button
      class="sidebar__btn"
      v-for="item in btn"
      :key="item.name"
      :class="{ active: item.type }"
      @click="btnClick(item)"
    >
      {{ item.name }}
    </button>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      btn: [
        { name: "All", type: true },
        { name: "UI", type: false },
        { name: "UX", type: false },
        { name: "Enhancement", type: false },
        { name: "Bug", type: false },
        { name: "Feature", type: false },
      ],
    };
  },
  computed: {
   ...mapGetters({
    feedback:'getFeedbacks'
   })
  },
  methods: {
    btnClick(e) {
     this.feedback.filter(item => item.type = item.name ? item : '')
    },
  }
};
</script>
<style lang=""></style>
