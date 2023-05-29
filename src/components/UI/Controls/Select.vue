<template lang="">
  <div class="control">
    <slot name="label"></slot>
    <!-- <select
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
    </select> -->
    <div class="control__item control__select">
      <div
        @click="isOpen = !isOpen"
        class="control__select--btn"
      >
        {{ selected }}
      </div>
      <div v-if="isOpen" class="control__select--list">
        <div
          v-for="option in options"
          :key="option"
          @click="handleSelect(option)"
        >
          {{ option }}
        </div>
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
    active: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      selected: "",
      isOpen: false,
    };
  },
  methods: {
    handleSelect(value) {
      this.selected = value;
      this.isOpen = false;
    },
  },
  mounted() {
    console.log(this.options)
    console.log(this.active)
    this.selected = this.active

  },
};
</script>
<style lang=""></style>
