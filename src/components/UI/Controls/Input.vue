<template lang="">
  <div class="control">
    <h5 class="control__title">Feedback Title</h5>
    <p class="descr">Add a short, descriptive headline</p>
    <input
      class="control__item"
      v-bind="$attrs"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
<style lang=""></style>
