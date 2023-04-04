<template lang="">
  <div class="sidebar__item sidebar__item--content">
    <div class="sidebar__content--text">
      <h3 class="sidebar__title">Forntend Mentor</h3>
      <h5 class="sidebar__subtitle">FeedBack Board</h5>
    </div>

    <button class="sidebar__header--btn" type="button" v-if="!sidebar" @click="$emit('toggle')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path
          d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"
          fill="#fff"
        ></path>
      </svg>
    </button>
    <button class="sidebar__header--btn" v-else @click="$emit('toggle')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
      >
        <path
          d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
          fill="#fff"
        ></path>
      </svg>
    </button>
  </div>
</template>
<script>
export default {
    props:{
        sidebar:{
            type:Boolean,
            default:false
        }
    }
};
</script>
<style lang=""></style>
