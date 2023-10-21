<template>
    <router-view></router-view>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import {useRouter, useRoute} from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import {useAuthStore} from '@/store/auth'
import {auth} from '@/firebase/config'

const router = useRouter()
const route = useRoute()
const store = useAuthStore()

onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (!user) {
           router.replace('/login') 
        } else if (route.path == "/login" || route.path == 'sign-up') {
            router.replace('/')
            store.authToken = user.uid
        }
    })
})
</script>
