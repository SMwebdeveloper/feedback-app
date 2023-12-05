<template>
  <div class="project-container">
    <h2>Save page</h2>
    <h2 v-if="!user?.name">Loading..</h2>

    <h2 v-else> {{ user.name }}</h2>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

const store = useAuthStore()

const user = computed(() => store.user)

if (!store.user.name) {
  await store.getUsers()
}
// onMounted(async () => {
//   await store.getUsers()
// })
</script>
<style scoped></style>
