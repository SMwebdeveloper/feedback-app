<template>
  <div
    :to="`/feedback/${feedback.id}`"
    class="inline-block bg-slate-400 min-h-[170px] w-full rounded-md shadow-sm shadow-slate-100 mb-5"
  >
    <div class="w-full pt-2">
        <div class="mb-3 px-3 flex">
            <img
            :src="feedback.author.img ? feedback.author.img : userImage"
            alt=""
            class="w-7 h-7 border border-slate-200 object-cover rounded-full mr-2"
          />
          <h3 class="flex-1 text-lg capitalize text-white font-bold">{{ feedback.author.name }}</h3>
          <button v-if="deleteBtn" class="p-1">
            <img src="@/assets/images/trash.svg" class="w-5" data-attr="deleteBtn" :data-id="feedback.id" data-name="feedback"/>
          </button>
        </div>
      <router-link :to="`/feedback/${feedback.id}`">
        <img
        :src="feedback.img"
        alt="title"
        class=" border border-b-slate-200 w-full h-[170px] object-cover mb-2"
      />
      <div class="flex items-center justify-between w-full px-3 mb-2">
        <div class="flex items-center">
          
          <button class="text-sm text-gray-800 font-semibold">
            Comments: 20
          </button>
        </div>
        <div class="flex">
          <bookmark-icon class="w-6 cursor-pointer text-white" />
          <hand-thumb-up-icon class="w-6 cursor-pointer text-white" />
        </div>
      </div>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { BookmarkIcon, HandThumbUpIcon, TrashIcon } from "@heroicons/vue/24/solid";
import userImage from "@/assets/images/user-image.jpg";
const props = defineProps({
  feedback: {
    type: Object,
    default: true,
  },
});


const route = useRoute()
const deleteBtn = ref(false)
const feedback = computed(() => props.feedback);


watchEffect(() => {
  if (route.name === 'profile') {
    deleteBtn.value = true
  } else {
    deleteBtn.value = false
  }
})
</script>
