<template>
  <div>
    <suspense>
      <template #default class="h-full">
        <router-view />
      </template>
      <template #fallback>
        <loader />
      </template>
    </suspense>

    <sidebar />
  </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useAuthStore } from "@/store/auth";
// import { useFeedbackStore } from "@/store/feedback";
import { onMounted } from "vue";

const store = useAuthStore();
// const feedbackStore = useFeedbackStore();

onMounted(async () => {
  await store.getUsers();
});
</script>
