<template lang="">
  <div class="control">
    <slot name="label"></slot>
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
      type: String
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
      this.$emit('selected', value)
      this.isOpen = false;
    },
  },
  mounted() {
    console.log(this.options)
    console.log(this.active)
    this.selected = this.active ? this.active : this.options[0]

  },
};
</script>
<style lang=""></style>
