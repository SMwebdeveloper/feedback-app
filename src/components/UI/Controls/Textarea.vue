<template lang="">
  <div class="control">
    <h5 class="control__title">Feedback Detail</h5>
    <p class="descr">
      Include any specific comments on what should be improved, added, etc.
    </p>
    <textarea
      class="control__item"
      :value="value"
      required
      @input="$emit('input', $event.target.value)"
      row="10"
    ></textarea>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang=""></style>
