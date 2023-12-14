<template>
  <section class="pt-5 h-screen">
    <div class="project-container h-full">
      <a>
        <router-link to="/">
          <chevron-left-icon class="text-white w-10 font-medium mb-5" />
        </router-link>
      </a>
      <div v-if="loading">
        <loader />
      </div>
      <div v-else>
        <single-feedback :feedback="feedback"/>
        <second-loader v-if="commentLoading" />
        <comments :comments="comments"/>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import {
  ChevronLeftIcon
} from "@heroicons/vue/24/outline";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useFeedbackStore } from "@/store/feedback";
import { useAuthStore } from "@/store/auth";
import { useCommentStore } from "@/store/comment";
import { addStore } from "@/composable/fireStore";
import SingleFeedback from "@/components/SingleFeedback.vue";
import Comments from "@/components/Comments.vue";
// import userImage from "@/assets/images/user-image.jpg";

const route = useRoute();
const store = useAuthStore();
const commentStore = useCommentStore();
const feedbackStore = useFeedbackStore();

const key = route.params.id;
const comment = ref({
  comment: "",
  feedbackId: key,
  userId: store.authToken,
});
const errCommentMes = ref({
  error: false,
  message: "",
});
const loading = ref(false);
const commentLoading = ref(false);

const addComment = async () => {
  commentLoading.value = true;
  if (comment.value.comment !== "") {
    await addStore(comment.value, "comments")
      .then(async () =>
      await commentStore.getComments(key)
    );
  } else {
    errCommentMes.value.error = true;
    errCommentMes.value.message = "Please enter your comment";
    setTimeout(() => {
      errCommentMes.value.error = false;
    }, 3000);
  }
  commentLoading.value = false;
  comment.value.comment = "";
};

const feedback = computed(() => feedbackStore.feedback);
const comments = computed(() => commentStore?.comments);
if (comments.value.length === 0) {
  commentLoading.value = false
}
onMounted(async () => {
  loading.value = true;
  await feedbackStore.getSingleFeedback(key);
  loading.value = false;
  if (commentStore.comments.length !== 0) {
    commentLoading.value = true
  }
  await commentStore.getComments(key, 'feedbackId');
  commentLoading.value = false
});

</script>
