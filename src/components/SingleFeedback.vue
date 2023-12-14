<template>
  <div>
    <img
      :src="feedback?.img"
      alt="feedback image"
      class="w-full h-[180px] border boder-slate-200 object-cover mb-4 rounded-md"
    />
    <div class="flex items-center">
      <img
        :src="feedback.author?.img ? feedback.author?.img : userImage"
        alt="user image"
        class="w-10 h-10 rounded-full mr-5"
      />
      <h2 class="text-xl text-white flex-1 capitalize">
        {{ feedback.author?.name }}
      </h2>
      <div class="flex items-center">
        <bookmark-icon class="w-8 text-white" />
        <hand-thumb-up-icon class="w-8 text-white" />
      </div>
    </div>
    <div class="relative h-1/2">
      <div class="w-full mb-4">
        <h2 class="text-xl text-slate-200 capitalize font-semibold">
          {{ feedback?.title }}
        </h2>
        <h2 class="text-sm font-bold text-slate-200">
          {{ feedback?.desc }}
        </h2>
      </div>
      
    </div>
  </div>
</template>
<script setup lang="ts">
import { BookmarkIcon, HandThumbUpIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
const props = defineProps({
    feedback: {
        type: Object,
        required: true
    }
})

const feedback = computed(() => props.feedback)
</script>
