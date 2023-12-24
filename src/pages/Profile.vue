<template>
  <div class="project-container pb-24 relative">
    <loader v-if="!store.user?.name" />
    <div v-else>
      <profile-user-content :user="user" @logOut="logOut" />
      <div class="flex items-center justify-around mb-8">
        <button
          @click="visibleClick"
          class="text-base text-white flex items-center cursor-pointer duration-100"
          :class="{ ' text-slate-300 font-bold ': !commentVisible }"
        >
          <h4 class="flex flex-col mr-2">Feedbacks {{ feedbacks.length }}</h4>
          <table-cells-icon class="w-7" />
        </button>
        <button
          @click="visibleClick"
          class="text-base text-white flex items-center cursor-pointer duration-100"
          :class="{
            ' text-slate-300 font-bold ': commentVisible
          }"
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
            Feedbacks not found
          </h3>
        </div>
        <div v-else>
          <comments v-if="!loading && comments.length" :comments="comments" />
          <h3
            v-if="!loading && !comments.length"
            class="text-lg font-semibold text-white text-center"
          >
            Comments not found
          </h3>
        </div>
      </div>
    </div>
    <delete-modal
      v-if="modal"
      @closeModal="modal = false"
      :message="modalMessage"
      @deleted="deleteFedCom"
    />
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
import { deleteStore } from "@/composable/fireStore";
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
const modalMessage = ref("");
const deletedCont = ref({
  id: "",
  name: "",
});

// log out
const logOut = async () => {
  await store.logOut();
  store.$reset();
  feedbackStore.$reset(),
  commentStore.$reset()
};

const user = computed(() => store.user);
const feedbacks = computed(() => feedbackStore.myFeedbacks);
const comments = computed(() => commentStore.comments);

// visible modal
window.addEventListener("click", (e: any) => {
  const el = e.target;
  const name = el.getAttribute("data-name");
  if (name === "feedbacks") {
    modal.value = true;
    modalMessage.value = "feedback";
    deletedCont.value.id = el.getAttribute("data-id");
    deletedCont.value.name = name;
  } else if (name === "comments") {
    modal.value = true;
    modalMessage.value = "comment";
    deletedCont.value.id = el.getAttribute("data-id");
    deletedCont.value.name = name;
  } else {
    modal.value = false;
  }
});

// delted feedback comment
const deleteFedCom = async () => {
  loading.value = true;
  if (deletedCont.value.name === "feedbacks") {
    await deleteStore(deletedCont.value.id, deletedCont.value.name).then(
      async () => {
        await commentStore.getComments(store.authToken, "userId");
        await feedbackStore.getFeedbacks();
        await feedbackStore.getMyFeedbacks();
      }
    );

    await commentStore.comments.forEach((comment: any) => {
      if (comment.feedbackId === deletedCont.value.id) {
        deleteStore(comment.id, "comments");
      }
    });
  }
  if (deletedCont.value.name === "comments") {
    await deleteStore(deletedCont.value.id, deletedCont.value.name).then(
      async () => {
        await commentStore.getComments(store.authToken, "userId");
      }
    );
  }

  loading.value = false;
};

// visible comment and feedback
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
