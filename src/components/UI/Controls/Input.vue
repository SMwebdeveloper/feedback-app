<template lang="">
  <div class="control">
    <h5 class="control__title">Feedback Title</h5>
    <p class="descr">Add a short, descriptive headline</p>
    <input
      class="control__item"
      v-bind="$attrs"
      :type="type"
      :value="value"
      requireed
      @input="$emit('input', $event.target.value)"
    />
    <!-- <p class="error" v-if="!$v.required">Can’t be empty</p> -->
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

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
  validations: {
    value: {
      required,
    },
  },
};
</script>
<style lang=""></style>
