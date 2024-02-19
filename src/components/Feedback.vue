<template>
  <div
    class="inline-block bg-slate-400 min-h-[170px] w-full rounded-md shadow-sm shadow-slate-100 mb-5"
  >
    <div class="w-full pt-2">
      <div class="mb-3 px-3 flex">
        <img
          :src="feedback.author.img ? feedback.author.img : userImage"
          alt=""
          class="w-7 h-7 border border-slate-200 object-cover rounded-full mr-2"
        />
        <h3 class="flex-1 text-lg capitalize text-white font-bold">
          {{ feedback.author.name }}
        </h3>
        <button v-if="deleteBtn" class="p-1">
          <img
            src="@/assets/images/trash.svg"
            class="w-5"
            :data-id="feedback.id"
            data-name="feedbacks"
          />
        </button>
      </div>
      <img
        :src="feedback.img"
        alt="title"
        class="border border-b-slate-200 w-full h-[170px] object-cover mb-2"
      />
      <div class="flex items-center justify-between w-full px-3 mb-2">
        <div class="flex items-center">
          <router-link
            :to="`/feedback/${feedback.id}`"
            class="text-sm text-gray-800 font-semibold"
          >
            View all comments
          </router-link>
        </div>
        <div class="flex">
          <bookmark-icon
            @click="saveFeedback(feedback.id)"
            class="w-6 cursor-pointer"
            :class="`${save ? 'text-red-500' : 'text-white'}`"
          />
          <hand-thumb-up-icon
            @click="likeFeedbakcs(feedback.id)"
            class="w-6 cursor-pointer"
            :class="`${likes ? 'text-red-500' : 'text-white'}`"
          />
          <h2 class="ml-3 text-base text-slate-700 font-bold">
            {{ likesCount }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useFeedbackStore } from "@/store/feedback";
import { BookmarkIcon, HandThumbUpIcon } from "@heroicons/vue/24/solid";
import userImage from "@/assets/images/user-image.jpg";

const likes = ref(false);
const deleteBtn = ref(false);
const save = ref(false);
const props = defineProps({
  feedback: {
    type: Object,
    default: true,
  },
});

const route = useRoute();
const store = useAuthStore();
const feedbackStore = useFeedbackStore();

const feedback = computed(() => props.feedback);
const likesCount = computed(() => feedback.value.likes.length);


store.user.saveFeedbacks?.forEach((item: any) => {
  if (item === feedback.value.id) {
    save.value = true;
  }
});
feedback.value.likes.forEach((item: any) => {
  if (item === store.authToken) {
    likes.value = true;
  }
});


const saveFeedback = async (key: string) => {
  save.value = !save.value;
  await feedbackStore.toggleSaveFeedbacks(key, save.value);
};
const likeFeedbakcs = async (key: string) => {
  likes.value = !likes.value;
  feedback.value.likes = feedback.value.likes.filter((item: any) => {
    return item !== store.authToken;
  });
  feedbackStore.toggleLikesFeedbacks(key, likes.value);
};

watchEffect(() => {
  if (route.name === "profile") {
    deleteBtn.value = true;
  } else {
    deleteBtn.value = false;
  }
});

onMounted(async () => {
  await feedbackStore.getSaveFeedback();
});
</script>
