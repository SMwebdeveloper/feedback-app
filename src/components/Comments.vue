<template>
  <ul class="pt-5 pb-11">
    <li
      v-for="{ comment, author: { img, name } } in comments"
      class="flex mb-2 bg-slate-100 p-1 rounded-lg"
    >
      <img :src="img" alt="user image" class="w-8 h-8 rounded-full mr-3" />
      <div>
        <h6 class="text-sm">{{ name }}</h6>
        <span class="inline-block w-full text-slate-800 font-bold">{{
          comment
        }}</span>
      </div>
    </li>
  </ul>
  
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
});

const comments = computed(() => props.comments);
</script>
