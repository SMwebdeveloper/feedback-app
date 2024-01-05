<template>
  <section>
    <div class="project-container">
      <a>
        <chevron-left-icon
          @click="router.back()"
          class="text-white w-10 font-medium mb-5 cursor-pointer"
        />
      </a>
      <h2>User page</h2>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useFeedbackStore } from "@/store/feedback";
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const feedbackStore = useFeedbackStore();
// const feedbacks = computed(() => feedbackStore.)
onMounted(async () => {
  await store.getUsers();
});
</script>
