<template>
  <section class="pt-5 h-screen">
    <div class="project-container h-full">
      <a>
        <router-link to="/">
          <chevron-left-icon class="text-white w-10 font-medium mb-5" />
        </router-link>
      </a>
      <div v-if="loading">
        <loader/>
      </div>
      <div v-else>
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
          <h2 class="text-xl text-white flex-1 capitalize">{{feedback.author?.name}}</h2>
          <div class="flex items-center">
            <bookmark-icon class="w-8 text-white" />
            <hand-thumb-up-icon class="w-8 text-white" />
          </div>
        </div>
        <div class="relative h-1/2 ">
          <div class="w-full mb-4">
            <h2 class="text-xl text-slate-200 capitalize font-semibold">
              {{ feedback?.title }}
            </h2>
            <h2 class="text-sm font-bold text-slate-200">
              {{ feedback?.desc }}
            </h2>
          </div>
          <ul class="pt-5 pb-11">
            <li class="flex mb-2 bg-slate-100 p-1 rounded-lg">
              <img
                src="@/assets/images/user-image.jpg"
                alt="user image"
                class="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <h6 class="text-sm">Samandar</h6>
                <span class="inline-block w-full text-slate-800 font-bold"
                  >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolore, vero!</span
                >
              </div>
            </li>
          </ul>
          <div
            class="fixed bottom-0 left-0 w-full h-10 flex items-center justify-between border-t border-t-slate-700 text-slate-700"
          >
            <input
              type="text"
              placeholder="Add comments"
              class="w-[90%] h-full rounded-bl-md bg-slate-400 outline-none font-meduim placeholder:text-slate-700 px-2 py-1"
            />
            <button
              class="bg-slate-200 h-full py-1 px-2 rounded-br-md duration-150 hover:text-slate-200 hover:bg-slate-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {
  ChevronLeftIcon,
  BookmarkIcon,
  HandThumbUpIcon,
} from "@heroicons/vue/24/outline";
import { computed, onMounted, ref } from "vue";
import {useRoute} from 'vue-router'
import { useFeedbackStore } from '@/store/feedback'
import userImage from '@/assets/images/user-image.jpg'

const route = useRoute()
const feedbackStore = useFeedbackStore()
const loading = ref(false)

const feedback = computed(() => feedbackStore.feedback)
onMounted(async () => {
    loading.value = true
    await feedbackStore.getSingleFeedback(route.params.id)
    loading.value = false
})
</script>
