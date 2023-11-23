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
import { onMounted } from "vue";

const store = useAuthStore()

onMounted(async () => {
    await store.getFeedbacks()
})
</script>
