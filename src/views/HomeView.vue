<template>
  <div class="container">
    <div class="home__wrapper">
      <div class="sidebar">
        <div class="sidebar__item sidebar__item--content">
          <h3 class="sidebar__title">Forntend Mentor</h3>
          <h5 class="sidebar__subtitle">FeedBack Board</h5>
        </div>

        <div class="sidebar__item sidebar__item--filter">
          <button class="sidebar__btn">All</button>
          <button class="sidebar__btn">UI</button>
          <button class="sidebar__btn">UX</button>
          <button class="sidebar__btn">Enhancement</button>
          <button class="sidebar__btn">Bug</button>
          <button class="sidebar__btn">Feature</button>
        </div>

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
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>
