<template>
  <div class="project-container">
    <input ref="input">
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
const store = useAuthStore()

onMounted(() => {
  store.getUser()
})

</script>
