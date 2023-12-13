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
            <bookmark-icon class="w-8 text-white" />
            <hand-thumb-up-icon class="w-8 text-white" />
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
          <ul class="pt-5 pb-11">
            <second-loader v-if="commentLoading"/>
            <h3 v-else-if="!commentLoading && comments.length === 0">Comments not found</h3>
            <li v-else 
              v-for="{ comment, author:{img, name} } in comments"
              class="flex mb-2 bg-slate-100 p-1 rounded-lg"
            >
              <img
                :src="img"
                alt="user image"
                class="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <h6 class="text-sm">{{ name }}</h6>
                <span class="inline-block w-full text-slate-800 font-bold">{{
                  comment
                }}</span>
              </div>
            </li>
          </ul>
          <div
            class="fixed bottom-0 left-0 w-full h-10 flex items-center border-t border-t-slate-700 text-slate-700"
          >
            <input
              v-model="comment.comment"
              type="text"
              placeholder="Add comments"
              class="w-[80%] h-full rounded-bl-md bg-slate-400 outline-none font-meduim placeholder:text-slate-700 px-2 py-1"
            />
            <button
              @click="addComment"
              class="bg-slate-200 w-[20%] h-full py-1 px-2 rounded-br-md duration-150 hover:text-slate-200 hover:bg-slate-700"
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
import { useRoute } from "vue-router";
import { useFeedbackStore } from "@/store/feedback";
import { useAuthStore } from "@/store/auth";
import { useCommentStore } from "@/store/comment";
import { addStore } from "@/composable/fireStore";
import userImage from "@/assets/images/user-image.jpg";

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
    await commentStore.getComments(key, 'feedbackId');
  }
  commentLoading.value = false
});

</script>
