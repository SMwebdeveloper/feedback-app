<template>
  <div v-bind="$attrs">
    <h2>
      <slot :text="greetingMessage" :count="1" name="header"></slot>
    </h2>
    <h2>
      <slot name="main"></slot>
    </h2>
    <h2>
      <slot name="footer"></slot>
    </h2>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  inheritAttrs: false,
});
const greetingMessage = ref('AAA')
</script>
