<template>
    <div class="project-container mx-auto">
        <loader v-if="store.feedbacks.length === 0"/>
        <div v-else>
            <div v-for="feedback in store.feedbacks" :key="feedback.id">
                <h2>{{ feedback.title }}</h2>
                <h2>{{ feedback.desc }}</h2>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {useAuthStore} from '@/store/auth'
// import { onMounted } from 'vue';
const store = useAuthStore()

// onMounted(async () => {
//     await store.getFeedbacks()
// })
</script>