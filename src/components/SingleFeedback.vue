<template>
  <div class="h-[300px] mb-4">
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
        <h2 class="ml-3 text-base text-slate-50 font-bold">{{ likesCount }}</h2>
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
import { BookmarkIcon, HandThumbUpIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import { useFeedbackStore } from "@/store/feedback";
import userImage from "@/assets/images/user-image.jpg";
const props = defineProps({
  feedback: {
    type: Object,
    required: true,
  },
});

const store = useAuthStore();
const feedbackStore = useFeedbackStore();

const feedback = computed(() => props.feedback);
const likesCount = computed(() => feedback.value.likes?.length)
const likes = ref(false);
const save = ref(false);


const likeFeedbakcs = (key: any) => {
  likes.value = !likes.value;
  feedback.value.likes = feedback.value.likes.filter((item: any) => {
    return item !== store.authToken;
  });
  feedbackStore.toggleLikesFeedbacks(key, likes.value);
};

const saveFeedback = (key: any) => {
  save.value = !save.value;
  if (save.value) {
    feedbackStore.addSaveFeedbacks(key);
  } else {
    feedbackStore.removeSaveFeedbacks(key);
  }
};
onMounted(async () => {
  await store.getUsers();
  await store.getSingleUser();
  await feedbackStore.getSaveFeedback()
  store.user.saveFeedbacks?.forEach((item: any) => {
    if (item === feedback.value.id) {
    save.value = true;
  }
  });
  feedback.value.likes?.forEach((item: any) => {
  if (item === store.authToken) {
    likes.value = true;
  }
});
})
</script>
