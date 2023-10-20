<template>
    <div class="container mx-auto">
        <h2>Home page</h2>
        <button @click="logOut">Log out</button>
    </div>
</template>
<script setup lang="ts">
import {useAuthStore} from '@/store/auth'
const store = useAuthStore()

const logOut = () => {
    store.logOut()
}
</script>