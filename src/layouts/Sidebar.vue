<template lang="">
  <div>
    <div class="sidebar">
        <!-- sidebar content -->
      <div class="sidebar__item sidebar__item--content">
        <h3 class="sidebar__title">Forntend Mentor</h3>
        <h5 class="sidebar__subtitle">FeedBack Board</h5>
      </div>

      <!-- sidebar filter -->
      <div class="sidebar__item sidebar__item--filter">
        <button class="sidebar__btn">All</button>
        <button class="sidebar__btn">UI</button>
        <button class="sidebar__btn">UX</button>
        <button class="sidebar__btn">Enhancement</button>
        <button class="sidebar__btn">Bug</button>
        <button class="sidebar__btn">Feature</button>
      </div>

       <!-- sidebar roadmap -->
      <div class="sidebar__item sidebar__item--roadmap">
        <div class="sidebar__roadmap--content">
          <h6 class="title">Roadmap</h6>
          <a href="#" class="sidebar__roadmap--link">View</a>
        </div>

        <ul class="sidebar__roadmap--list">
          <li class="sidebar__roadmap--list__item">
            <p class="sidebar__roadmap--text">
              <span class="sidebar__roadmap--circle"></span>
              Planned
            </p>
            <p class="sidebar__roadmap--number">2</p>
          </li>

          <li class="sidebar__roadmap--list__item">
            <p class="sidebar__roadmap--text">
              <span class="sidebar__roadmap--circle"></span>
              In-Progress
            </p>
            <p class="sidebar__roadmap--number">3</p>
          </li>

          <li class="sidebar__roadmap--list__item">
            <p class="sidebar__roadmap--text">
              <span class="sidebar__roadmap--circle"></span>
              Live
            </p>
            <p class="sidebar__roadmap--number">1</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- sidebar mobile -->
    <div class="sidebar__mobile">
        <!-- sidebar mobile content -->
      <div class="sidebar__content">
        <div class="sidebar__content--text">
          <h3 class="sidebar__title">Forntend Mentor</h3>
          <h5 class="sidebar__subtitle">FeedBack Board</h5>
        </div>
        <button type="button" v-if="!sidebarAnim" @click="toggleButton">
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
        <button v-else @click="toggleButton">
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

      <!-- sidebar mobile filter -->
      <div class="sidebar__mobile--blackmode" :class="`${sidebarAnim && 'sidebar__mobile--bg'}`">
        <div
        class="sidebar__mobile--item"
        :class="`${sidebarAnim && 'sidebar__mobile--animation'}`"
      >
        <div class="sidebar__item sidebar__item--filter">
          <button class="sidebar__btn">All</button>
          <button class="sidebar__btn">UI</button>
          <button class="sidebar__btn">UX</button>
          <button class="sidebar__btn">Enhancement</button>
          <button class="sidebar__btn">Bug</button>
          <button class="sidebar__btn">Feature</button>
        </div>

        <!-- sidebar mobile roadmap -->
        <div class="sidebar__item sidebar__item--roadmap">
          <div class="sidebar__roadmap--content">
            <h6 class="title">Roadmap</h6>
            <a href="#" class="sidebar__roadmap--link">View</a>
          </div>

          <ul class="sidebar__roadmap--list">
            <li class="sidebar__roadmap--list__item">
              <p class="sidebar__roadmap--text">
                <span class="sidebar__roadmap--circle"></span>
                Planned
              </p>
              <p class="sidebar__roadmap--number">2</p>
            </li>

            <li class="sidebar__roadmap--list__item">
              <p class="sidebar__roadmap--text">
                <span class="sidebar__roadmap--circle"></span>
                In-Progress
              </p>
              <p class="sidebar__roadmap--number">3</p>
            </li>

            <li class="sidebar__roadmap--list__item">
              <p class="sidebar__roadmap--text">
                <span class="sidebar__roadmap--circle"></span>
                Live
              </p>
              <p class="sidebar__roadmap--number">1</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
      </div>
  </div>
</template>
<script>
export default {
  props: {
    sidebarAnim: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleButton() {
      return (this.sidebarAnim = !this.sidebarAnim);
    },
  },
};
</script>
<style lang=""></style>
