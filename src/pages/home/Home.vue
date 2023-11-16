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
</script>
