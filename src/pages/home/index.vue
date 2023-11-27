<template>
  <div class="pb-24">
    <div class="project-container mx-auto">
      <loader v-if="feedbacks.length === 0" />
      <div v-else class="flex flex-col gap-y-2">
        <div
          v-for="{ title, desc, img, id } in feedbacks"
          :key="id"
          class="bg-slate-400 min-h-[170px] rounded-md shadow-sm pb-2 shadow-slate-100"
        >
          <div class="w-full">
            <img
              :src="img"
              alt="title"
              class="rounded-t-md border border-b-slate-200 w-full h-[170px] object-cover mb-2"
            />
            <div class="flex items-center justify-between w-full px-3">
              <div class="flex items-center">
                <img
                  src="@/assets/images/user-image.jpg"
                  alt=""
                  class="w-7 h-7 border border-slate-200 object-cover rounded-full mr-2"
                />
                <button class="text-sm text-gray-800 font-semibold">Comments: 20</button>
              </div>
              <div class="flex">
                <bookmark-icon class="w-6 cursor-pointer text-white" />
                <hand-thumb-up-icon class="w-6 cursor-pointer text-white" />
                <ellipsis-horizontal-circle-icon class="w-6 cursor-pointer text-white" @click="contentHidden(id)"/>
              </div>
            </div>
          </div>
          <div class="px-4 hidden" :id="id">
            <div class="w-full flex items-center justify-between">
              <h2>{{ title }}</h2>
            </div>
            <h2>{{ desc }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFeedbackStore } from "@/store/feedback";
import { computed, onMounted, ref } from "vue";
import { BookmarkIcon, HandThumbUpIcon, EllipsisHorizontalCircleIcon } from "@heroicons/vue/24/solid";

const feedbackContent = ref(false)
const feedbackStore = useFeedbackStore();
const feedbacks = computed(() => feedbackStore.feedbacks);


const contentHidden = (e: string) => {
  const card = document.querySelector(`#${e}`)
  card?.classList.toggle('block')
}
onMounted(async () => {
  // await feedbackStore.getFeedbacks();
});
</script>

<style scoped>
.block {
  display: block;
}
</style>
