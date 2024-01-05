<template>
    <section class="pb-24">
        <div class="project-container">
            <h3 class="text-3xl text-slate-200 font-bold mb-5">Search user</h3>
            <label class="flex border border-slate-300 px-1 py-1 rounded-2xl bg-slate-500 mb-5">
                <input v-model="search" type="text" placeholder="Search user" class="bg-transparent flex-1 outline-none border-none text-slate-200 text-base font-bold placeholder:text-slate-200 placeholder:font-medium">
                <magnifying-glass-icon class="w-6 text-slate-300"/>
            </label>
            <ul >
                <li v-for="{id, name, img} in result" v-if="!loading && result.length" :key="id" class="w-full flex items-center border border-slate-200 rounded-lg py-2 px-2 text-slate-200 shadow-sm shadow-slate-200">
                    <img :src="img ? img : userImage" alt="user image" class="w-10 h-10 rounded-full mr-3">
                    <router-link :to="`/user/${id}`">
                        <h5 class="text-xl capitalize">{{ name }}</h5>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/store/auth';
import { computed, ref, watch } from 'vue';
import userImage from '@/assets/images/user-image.jpg'

const search = ref('')
const loading = ref(false)
const result = ref([])
const store = useAuthStore()
const users = computed(() => store.users)
watch(search, async (searched, searching) => {
    loading.value = true
    result.value = await users.value.filter((user: any) => {
        const userName = user.name.toLowerCase()
        const searchName = searched.toLowerCase()
        return userName === searchName
     })
    loading.value = false 
})
</script>

