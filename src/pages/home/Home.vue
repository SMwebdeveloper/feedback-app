<template>
    <div>
        <sidebar/>
        <main class="h-full">
           <router-view/>
        </main>
    </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
import { useAuthStore } from "@/store/auth";
import {useFeedbackStore} from '@/store/feedback'
import { onMounted } from "vue";

const store = useAuthStore()
const feedbackStore = useFeedbackStore()

onMounted(() => {
    store.getUsers()
    feedbackStore.getFeedbacks()
})
</script>
