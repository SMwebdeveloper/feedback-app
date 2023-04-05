<template lang="">
  <div class="control">
    <slot name="label"></slot>

    <div class="control__item control__select">
      <button
        type="button"
        class="control__select--btn"
        @click="areOptionsVisible = !areOptionsVisible"
      >
        <span>{{ selected }}</span>

        <img
          class="control__btn--icon"
          :class="`${areOptionsVisible && 'active'}`"
          src="@/assets/img/arrow-up.png"
          alt="arrow down"
        />
      </button>

      <div class="control__select--list" v-if="areOptionsVisible">
        <button
          type="button"
          class="control__list--item"
          v-for="item in options"
          ::key="item.id"
          @click="selecOption(item)"
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
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: "Feature",
      areOptionsVisible: false,
    };
  },

  methods: {
    selecOption(item) {
      this.options.forEach((select) => {
        return (select.type = true ? false : true);
      });
      this.$emit("selectOn", item);
      item.type = true;
      this.selected = item.name;
      this.areOptionsVisible = false;
    },
  },
};
</script>
<style lang=""></style>
