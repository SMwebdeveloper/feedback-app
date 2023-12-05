<template>
  <div class="pb-24">
    <div class="project-container mx-auto">
      <loader v-if="feedbacks.length === 0" />
      <div v-else class="flex flex-col gap-y-2">
        <div
          v-for="{ title, desc, img, id } in feedbacks"
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
                  src="@/assets/images/user-image.jpg"
                  alt=""
                  class="w-7 h-7 border border-slate-200 object-cover rounded-full mr-2"
                />
                <button class="text-sm text-gray-800 font-semibold">Comments: 20</button>
              </div>
              <div class="flex">
                <bookmark-icon class="w-6 cursor-pointer text-white" :class="`${save ? 'text-red-500' : 'text-white'}`" @click="save = !save"/>
                <hand-thumb-up-icon class="w-6 cursor-pointer text-white" />
                <ellipsis-horizontal-circle-icon class="w-6 cursor-pointer text-white" @click="contentHidden(id)"/>
              </div>
            </div>
          </div>
          <div class="hidden max-h-[200px]" :id="id">
            <div class="w-full border-b border-slate-200 px-4 pb-2">
              <h2 class="text-xl text-slate-600 capitalize font-semibold">{{ title }}</h2>
              <h2 class="text-lg font-medium text-slate-800">{{ desc }}</h2>
            </div>
            <ul class="py-2 px-4 max-h-[100px] overflow-y-scroll bg-slate-200">
              <li  class="flex mb-2"> 
                <img src="@/assets/images/user-image.jpg" alt="user image" class="w-6 h-6 rounded-full mr-3">
                <span class="inline-block w-[90%] text-slate-800 font-bold">Lorem fdjdhfjhdfjhdfjhjjhfd fdjhfdjh</span>
              </li>
            </ul>
           <div class="flex items-center justify-between border-t border-t-slate-700 text-slate-700 ">
            <input type="text" placeholder="Add comments" class="w-[90%] rounded-b-md bg-transparent outline-none  font-meduim placeholder:text-slate-700 px-2 py-1">
            <button class="bg-slate-200 h-full py-1 px-2 rounded-br-md duration-150 hover:text-slate-200 hover:bg-slate-700">Add</button>
           </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFeedbackStore } from "@/store/feedback";
import { computed, onMounted, ref } from "vue";
import { BookmarkIcon, HandThumbUpIcon, EllipsisHorizontalCircleIcon, } from "@heroicons/vue/24/solid";

// const likes = ref(false)
const save = ref(false)
const feedbackStore = useFeedbackStore();
const feedbacks = computed(() => feedbackStore.feedbacks);


const contentHidden = (e: string) => {
  const card = document.querySelector(`#${e}`)
  card?.classList.toggle('block')
}

// if (feedbacks.value) {
//   await feedbackStore.getFeedbacks()
// }
onMounted(async () => {
  
  await feedbackStore.getFeedbacks()
});
</script>

<style scoped>
.block {
  display: block;
}
</style>
