<template lang="">
  <div class="control">
    <slot name="label"></slot>
    <select
      v-model="selected"
      @input="
        (event) => {
          $emit('input', event.target.value);
        }
      "
      class="control__item control__select"
    >
      <option v-for="item in options" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: "",
    };
  },
  mounted() {
    this.selected = this.value;
  },
  watch: {
    value: function (newValue) {
      this.selected = newValue;
    },
  },
};
</script>
<style lang=""></style>
