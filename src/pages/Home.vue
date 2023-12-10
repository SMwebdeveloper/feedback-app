<template>
  <div class="pb-24">
    <div class="project-container mx-auto">
      <div v-if="loading">
        <loader/>
      </div>
      <div v-else-if="!loading && feedbacks.length === 0">
         <h2 class="text-white text-lg">Feedbacks not found</h2>
      </div>
      <div v-else class="flex flex-col gap-y-2">
        <router-link :to="`/feedback/${id}`"
          v-for="{ img, id, author } in feedbacks"
          :key="id"
          class="bg-slate-400 min-h-[170px] rounded-md shadow-sm shadow-slate-100 "
        >
          <div class="w-full">
            <img
              :src="img"
              alt="title"
              class="rounded-t-md border border-b-slate-200 w-full h-[170px] object-cover mb-2"
            />
            <div class="flex items-center justify-between w-full px-3 mb-2">
              <div class="flex items-center">
                <img
                  :src="author.img ? author.img : userImage"
                  alt=""
                  class="w-7 h-7 border border-slate-200 object-cover rounded-full mr-2"
                />
                <button class="text-sm text-gray-800 font-semibold">Comments: 20</button>
              </div>
              <div class="flex">
                <bookmark-icon class="w-6 cursor-pointer text-white" :class="`${save ? 'text-red-500' : 'text-white'}`" @click="save = !save"/>
                <hand-thumb-up-icon class="w-6 cursor-pointer text-white" />
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFeedbackStore } from "@/store/feedback";
import { computed, onMounted, ref } from "vue";
import { BookmarkIcon, HandThumbUpIcon, } from "@heroicons/vue/24/solid";
import userImage from '@/assets/images/user-image.jpg'
// const likes = ref(false)
const save = ref(false)
const loading = ref(false)
const feedbackStore = useFeedbackStore();
const feedbacks = computed(() => feedbackStore.feedbacks);

onMounted(async () => {
  loading.value = true
  await feedbackStore.getFeedbacks()
  loading.value = false
});
</script>

<style scoped>
.block {
  display: block;
}
</style>
