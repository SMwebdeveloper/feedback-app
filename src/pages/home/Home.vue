<template>
    <div>
        <sidebar/>
        <main class="pl-20">
           <router-view/>
        </main>
    </div>
</template>
<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue"
</script>

