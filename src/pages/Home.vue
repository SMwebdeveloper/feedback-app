<template>
  <div class="pb-24">
    <div class="project-container">
      <div v-if="loading">
        <loader/>
      </div>
      <div v-else>
        <h2 class="text-3xl text-slate-200 font-bold mb-5">Feedbakcs</h2>
      <div v-for="feedback in feedbacks" :key="feedback.id">
       <feedback :feedback="feedback"/>
      </div>
      </div>
      <div v-if="!feedbacks.length && !loading">
        <h2 class="text-center text-white text-xl">There are no feedbacks yet</h2>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {useAuthStore} from '@/store/auth'
import { useFeedbackStore } from "@/store/feedback";
import { useCommentStore } from "@/store/comment";
import {useChatStore} from '@/store/chat'

const loading = ref(false)
const store = useAuthStore()
const feedbackStore = useFeedbackStore();
const commentStore = useCommentStore()
const chatStore = useChatStore()
const feedbacks = computed(() => feedbackStore.feedbacks);

onMounted(async () => {
  loading.value = true
  await store.getUsers()
  await store.getSingleUser(store.authToken, 'userId')
  await feedbackStore.getFeedbacks()
  await commentStore.getComments('__', 'feedbackId')
  await chatStore.getAllChats()
  loading.value = false
});
</script>

