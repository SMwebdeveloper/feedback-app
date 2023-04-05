<template lang="">
  <div class="control">
 
        <slot name="label"></slot>
   
    <div class="control__item control__select">
      <button
        type="button"
        class="control__select--btn"
        @click="selectIn = !selectIn"
      >
        <p>{{ selected }}</p>
        <div class="control__btn--icon" v-if="selectIn">
          <img src="@/assets/img/arrow-up.png" alt="arrow down" />
        </div>
        <div class="control__btn--icon" v-else>
          <img src="@/assets/img/arrow-down.png" alt="arrow down" />
        </div>
      </button>

      <div class="control__select--list" v-if="selectIn">
        <button
          type="button"
          class="control__list--item"
          v-for="item in selectList"
          ::key="item.id"
          @click="$emit('selectOn', item)"
        >
          {{ item.name }}
          <div v-if="item.type">
            <img src="@/assets/img/check.svg" alt="check icon" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {

    selectList: {
      type: Array,
      required: true,
    },
    selectIn: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
