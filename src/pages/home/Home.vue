<template>
    <div>
        <sidebar/>
        <main class="bg-slate-600 h-screen pl-24">
           <router-view/>
        </main>
    </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
</script>
