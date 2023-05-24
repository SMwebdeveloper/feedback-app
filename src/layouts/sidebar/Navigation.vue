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
import { mapGetters } from 'vuex';

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
  methods:{
    btnClick(item){
      this.btn.forEach(e => {
        e.type = true ? false : ''
      })

      this.feedbacks.filter(feedback => {
        if (feedback.type === item.name) {
          this.feedbacksFilter.push(feedback)
        }
      })
      item.type = true
    }
  },
  computed: {
    ...mapGetters({
      feedbacks: "getFeedbacks",
      feedbacksFilter: "getFeedbacksFilter"
    }),
  },
};
</script>
<style lang=""></style>
