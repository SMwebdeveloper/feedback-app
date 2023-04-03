<template lang="">
  <div class="card">
    <div class="card__item" v-for="card in cards" :key="card.id">
      <div class="card__item--content">
        <button class="card__content--plugin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="15"
          >
            <path
              d="M11.9997 10.8284L7.04996 15.7782L5.63574 14.364L11.9997 8L18.3637 14.364L16.9495 15.7782L11.9997 10.8284Z"
              fill="#4661E6"
            ></path>
          </svg>
          <p>123</p>
        </button>

        <div class="card__content--info">
            <h3 class="title">{{card.title}}</h3>
            <p class="descr">{{card.text}}</p>

            <button class="filter__btn">{{card.type}}</button>
        </div>
      </div>


      <div class="card__item--message">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="16"><path d="M7.29117 20.8242L2 22L3.17581 16.7088C2.42544 15.3056 2 13.7025 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.2975 22 8.6944 21.5746 7.29117 20.8242Z" fill="rgba(205,210,238,1)"></path></svg>
        <p>2</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
