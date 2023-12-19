<template>
  <div class="project-container pb-24 relative">
    <loader v-if="!store.user?.name" />
    <div v-else>
      <profile-user-content :user="user" @logOut="logOut" />
      <div class="flex items-center justify-around mb-8">
        <button
          @click="visibleClick"
          class="text-base text-white flex items-center cursor-pointer duration-100"
          :class="{ ' text-slate-300 ': !commentVisible }"
        >
          <h4 class="flex flex-col mr-2">Feedbacks {{ feedbacks.length }}</h4>
          <table-cells-icon class="w-7" />
        </button>
        <button
          @click="visibleClick"
          class="text-base text-white flex items-center cursor-pointer duration-100"
          :class="{ ' text-slate-300 ': commentVisible }"
        >
          <h4 class="flex flex-col mr-2">Comments {{ comments.length }}</h4>
          <chat-bubble-left-ellipsis-icon class="w-7" />
        </button>
      </div>

      <div class="w-full pb-16">
        <second-loader v-if="loading" />
        <div v-if="!commentVisible">
          <feedback
            v-if="!loading && feedbacks.length"
            v-for="feedback in feedbacks"
            :key="feedback.id"
            :feedback="feedback"
          />
          <h3
            v-else-if="!loading && !feedbacks.length"
            class="text-lg font-semibold text-white text-center"
          >
            Feedback not found
          </h3>
        </div>
        <div v-else>
          <comments v-if="comments.length" :comments="comments" />
          <h3 v-else class="text-lg font-semibold text-white">
            Comments not found
          </h3>
        </div>
      </div>
    </div>
    <delete-modal v-if="modal" @closeModal="modal = false" :message="modalMessage"/>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useFeedbackStore } from "@/store/feedback";
import { useCommentStore } from "@/store/comment";
import { computed, onMounted, ref } from "vue";
import Comments from "@/components/Comments.vue";
import ProfileUserContent from "@/components/ProfileUserContent.vue";
import DeleteModal from "@/components/DeleteModal.vue";
import {
  TableCellsIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/vue/24/solid";

const store = useAuthStore();
const feedbackStore = useFeedbackStore();
const commentStore = useCommentStore();
const loading = ref(false);
const commentVisible = ref(false);
const modal = ref(false);
const modalMessage = ref('')
const logOut = async () => {
  await store.logOut();
  store.$reset();
};

const user = computed(() => store.user);

const feedbacks = computed(() => feedbackStore.myFeedbacks);
const comments = computed(() => commentStore.comments);

window.addEventListener("click", (e: any) => {
  const el = e.target;
  if (el.getAttribute("data-name") === "feedback") {
    modal.value = true;
    modalMessage.value = 'feedback'
  } else if (el.getAttribute("data-name") === "user") {
  } else {
    modal.value = false;
  }
});


// const deleteFedCom = () => {
//    console.log()
// }
const visibleClick = () => {
  return (commentVisible.value = !commentVisible.value);
};
onMounted(async () => {
  await store.getUsers();
  await store.getSingleUser();
  loading.value = true;
  await feedbackStore.getFeedbacks();
  await feedbackStore.getMyFeedbacks();
  await commentStore.getComments(store.authToken, "userId");
  loading.value = false;
});
</script>
