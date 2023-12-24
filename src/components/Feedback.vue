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
            View comments..
          </router-link>
        </div>
        <div class="flex">
          <bookmark-icon
            @click="saveFeedback(feedback.id)"
            class="w-6 cursor-pointer"
            :class="`${save ? 'text-red-500' : 'text-white'}`"
          />
          <hand-thumb-up-icon
            @click="likes = !likes"
            class="w-6 cursor-pointer"
            :class="`${likes ? 'text-red-500' : 'text-white'}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import { useFeedbackStore } from "@/store/feedback";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { BookmarkIcon, HandThumbUpIcon } from "@heroicons/vue/24/solid";
import userImage from "@/assets/images/user-image.jpg";

// const feedbackStore = useFeedbackStore();
const likes = ref(false);
const save = ref(false);
const props = defineProps({
  feedback: {
    type: Object,
    default: true,
  },
});
const saveFeedback = async (key: string) => {
  // const docRef = doc(db, 'users', store.user.id)
  // await updateDoc(docRef, {
  //   saveFeedbacks:
  // })
  return (save.value = !save.value);
};
const route = useRoute();
const store = useAuthStore();
const deleteBtn = ref(false);
const feedback = computed(() => props.feedback);

watchEffect(() => {
  if (route.name === "profile") {
    deleteBtn.value = true;
  } else {
    deleteBtn.value = false;
  }
});
onMounted(async () => {
  await store.getUsers();
  await store.getSingleUser();
  // await feedbackStore.getSaveFeedback()
});
</script>
