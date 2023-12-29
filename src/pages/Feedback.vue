<template>
  <section class="pt-5 h-screen">
    <div class="project-container h-full">
      <a>
        <chevron-left-icon
          @click="router.back()"
          class="text-white w-10 font-medium mb-5 cursor-pointer"
        />
      </a>
      <div v-if="loading">
        <loader />
      </div>
      <div v-else>
        <single-feedback :feedback="feedback" />
        <second-loader v-if="commentLoading" />
        <comments v-else :comments="comments" />
        <div v-if="comments.length === 0 && !commentLoading" class="text-center text-white text-xl">
          There are no comments yet
        </div>
        <comment-form @addComment="addComment" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFeedbackStore } from "@/store/feedback";
import { useAuthStore } from "@/store/auth";
import { useCommentStore } from "@/store/comment";
import { addStore } from "@/composable/fireStore";
import SingleFeedback from "@/components/SingleFeedback.vue";
import Comments from "@/components/Comments.vue";
import CommentForm from "@/components/CommentForm.vue";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const commentStore = useCommentStore();
const feedbackStore = useFeedbackStore();

const key = route.params.id;
const errCommentMes = ref({
  error: false,
  message: "",
});
const loading = ref(false);
const commentLoading = ref(false);

const addComment = async (comment: string) => {
  commentLoading.value = true;
  if (comment !== "") {
    const newComment = {
      comment: comment,
      userId: store.authToken,
      feedbackId: key,
    };
    await addStore(newComment, "comments").then(
      async () => await commentStore.getComments(key, "feedbackId")
    );
  } else {
    errCommentMes.value.error = true;
    errCommentMes.value.message = "Please enter your comment";
    setTimeout(() => {
      errCommentMes.value.error = false;
    }, 3000);
  }
  commentLoading.value = false;
};

const feedback = computed(() => feedbackStore.feedback);
const comments = computed(() => commentStore?.comments);

onMounted(async () => {
  loading.value = true;
  await feedbackStore.getFeedbacks();
  await feedbackStore.getSingleFeedback(key);
  loading.value = false;
  commentLoading.value = true;
  await commentStore.getComments(key, "feedbackId");
  commentLoading.value = false;
});
</script>
