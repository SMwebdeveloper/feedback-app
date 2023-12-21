<template>
  <div class="pb-24">
    <div class="project-container mx-auto">
      
      
      <div v-for="feedback in feedbacks" :key="feedback.id">
       <feedback :feedback="feedback"/>
      </div>
      <div v-if="!feedbacks.length && !loading">
        <h2 class="text-center text-white text-xl">Feedback not found</h2>
      </div>
      <div v-if="loading">
        <loader/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFeedbackStore } from "@/store/feedback";
import { computed, onMounted, ref } from "vue";
import {useAuthStore} from '@/store/auth'
// const likes = ref(false)
// const save = ref(false)
const loading = ref(false)
const store = useAuthStore()
const feedbackStore = useFeedbackStore();
const feedbacks = computed(() => feedbackStore.feedbacks);

onMounted(async () => {
  loading.value = true
  await store.getUsers()
  await feedbackStore.getFeedbacks().then((item) => {
    console.log(item)
  }).catch((error) => {
    console.log(error)
  } )  
  loading.value = false
});
</script>

<style scoped>
.block {
  display: block;
}
</style>
