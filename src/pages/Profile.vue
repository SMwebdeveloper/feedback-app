<template>
  <div class="project-container pb-24 relative">
    <loader v-if="!store.user?.name" />
    <div v-else>
      <profile-user-content :user="user" @logOut="logOut" />
      <div
        class="mx-0 w-full h-auto flex items-start justify-between mb-4 px-2 nav-scroll"
      >
        <h2
          @click="visibleComponents = 'feedbacks'"
          class="text-lg text-slate-200 flex flex-col-reverse items-center cursor-pointer duration-150 mr-5"
          :class="{
            'border-b-2 border-b-slate-200 font-bold':
              visibleComponents === 'feedbacks',
          }"
        >
          Feedbacks
          <span class="font-extrabold inline-block">{{
            feedbacks.length
          }}</span>
        </h2>
        <h2
          @click="visibleComponents = 'comments'"
          class="text-lg text-slate-200 flex flex-col-reverse items-center cursor-pointer duration-150 mr-5"
          :class="{
            'border-b-2 border-b-slate-200 font-bold':
              visibleComponents === 'comments',
          }"
        >
          Comments
          <span class="font-extrabold inline-block">{{ comments.length }}</span>
        </h2>
        <h2
          @click="visibleComponents = 'followers'"
          class="text-lg text-slate-200 mr-5 flex flex-col-reverse items-center cursor-pointer duration-150"
          :class="{
            'border-b-2 border-b-slate-200 font-bold':
              visibleComponents === 'followers',
          }"
        >
          Followers
          <span class="font-extrabold inline-block">{{
            followers.length
          }}</span>
        </h2>
        <h2
          @click="visibleComponents = 'followings'"
          class="text-lg text-slate-200 flex flex-col-reverse items-center cursor-pointer duration-150"
          :class="{
            'border-b-2 border-b-slate-200 font-bold':
              visibleComponents === 'followings',
          }"
        >
          Following
          <span class="font-extrabold inline-block">{{
            followings.length
          }}</span>
        </h2>
      </div>

      <div class="w-full pb-16">
        <second-loader v-if="loading" />
        <div v-show="visibleComponents === 'feedbacks'">
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
            There are no feedbacks yet
          </h3>
        </div>
        <div v-show="visibleComponents === 'comments'">
          <comments v-if="!loading && comments.length" :comments="comments" />
          <h3
            v-if="!loading && !comments.length"
            class="text-lg font-semibold text-white text-center"
          >
            There are no comments yet
          </h3>
        </div>
        <div v-show="visibleComponents === 'followers'">
          <user v-for="follow in followers" :key="follow.id" :follow="follow" />
          <h3
            v-if="!loading && !followers.length"
            class="text-lg font-semibold text-white text-center"
          >
            There are no followers yet
          </h3>
        </div>
        <div v-show="visibleComponents === 'followings'">
          <user
            v-for="follow in followings"
            :key="follow.id"
            :follow="follow"
          />
          <h3
            v-if="!loading && !followings.length"
            class="text-lg font-semibold text-white text-center"
          >
            There are no following yet
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
import User from "@/components/User.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const store = useAuthStore();
const feedbackStore = useFeedbackStore();
const commentStore = useCommentStore();
const loading = ref(false);
const modal = ref(false);
const visibleComponents = ref("feedbacks");
const modalMessage = ref("");
const deletedCont = ref({
  id: "",
  name: "",
});

// log out
const logOut = async () => {
  await store.logOut();
  store.$reset();
  feedbackStore.$reset(), commentStore.$reset();
};

const user = computed(() => store.user);
const feedbacks = computed(() => feedbackStore.userFeedbacks);
const comments = computed(() => commentStore.comments);
const followers = computed(() => store.followers);
const followings = computed(() => store.following);
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
    await feedbackStore.deleteFeedbacks(deletedCont.value.id);
    await commentStore.comments.forEach((comment: any) => {
      if (comment.feedbackId === deletedCont.value.id) {
        commentStore.deleteComments(comment.id);
      }
    });
  }
  if (deletedCont.value.name === "comments") {
    await commentStore.deleteComments(deletedCont.value.id);
  }
  loading.value = false;
};

// fetch feedback
const fetchFeedbacks = async () => {
  await feedbackStore.getFeedbacks(); //  console.log(followers)
  await feedbackStore.getUserFeedbacks(store.authToken);
  await commentStore.getComments(store.authToken, "userId");
};

onMounted(async () => {
  await store.getUsers();
  await store.getSingleUser(store.authToken, "userId");
  loading.value = true;
  await fetchFeedbacks();
  await store.getFollowers(user.value.id);
  await store.getFollowings(store.authToken);
  loading.value = false;
});
</script>

<style scoped lang="css">
.nav-scroll {
  overflow-x: scroll;
}
.nav-scroll::-webkit-scrollbar {
  width: 0;
}
</style>
