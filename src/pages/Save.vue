<template>
  <section class="pb-24 min-h-screen">
    <div class="project-container">
      <loader v-if="loading" />
      <div v-else>
        <h2 class="text-3xl text-slate-200 font-bold mb-5">Save feedbacks</h2>
        <div v-for="feedback in feedbacks" :key="feedback.id">
          <feedback :feedback="feedback" />
        </div>
      </div>
      <div v-if="!loading && !feedbacks.length" class="text-xl text-white font-bold mb-5">There are no save feedbakcs yet</div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useFeedbackStore } from "@/store/feedback";
import { computed, onMounted, ref } from "vue";

const store = useAuthStore();
const feedbackStore = useFeedbackStore();
const loading = ref(false);

const feedbacks = computed(() => feedbackStore.saveFeedbacks);

onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await store.getSingleUser(store.authToken, 'userId');
  await feedbackStore.getFeedbacks();
  await feedbackStore.getSaveFeedback();
  loading.value = false;
});
</script>