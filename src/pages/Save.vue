<template>
  <div class="project-container">
    <h2 v-if="loading">Loading..</h2>

    <div v-for="feedback in feedbacks">
      <h2>{{ feedback }}</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useFeedbackStore } from '@/store/feedback';
import { computed, onMounted, ref } from 'vue';

const store = useAuthStore()
const feedbackStore = useFeedbackStore()
const loading = ref(false)

const user = computed(() => store.user)
const feedbacks = computed(() => feedbackStore.saveFeedbacks)

onMounted(async () => {
  loading.value = true
  await store.getUsers()
  await store.getSingleUser()
  await feedbackStore.getSaveFeedback()
  loading.value = false
})
</script>
<style scoped></style>
