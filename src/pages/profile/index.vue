<template>
  <div class="project-container">
    <div v-if="loading" class="flex items-center justify-center mt-[50%]">
      <img src="@/assets/images/loader.svg" alt="loader" class="w-[150px]">
    </div>
    <div v-else >
      <div class="flex items-center mb-4">
        <img :src="userProfile.img" alt="user image" class="w-20 h-20 rounded-full mr-6 border border-slate-200 object-cover" />
       <div >
        <h2 class="text-xl text-white capitalize">{{ userProfile.name }}</h2>
       </div>
      </div>
      <div class="flex items-center justify-around mb-8">
        <div class="text-base text-white">
           <h4 class="flex flex-col">posts 20</h4>
           <table-cells-icon class="w-7"/>
        </div>
        <div class="text-base text-white">
          <h4 class="flex flex-col">Comments 20</h4>
           <chat-bubble-left-ellipsis-icon class="w-7"/>
        </div>
      </div>

      <div class="w-full">
        <div class="bg-slate-200 h-[200px] w-full">

        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
import {TableCellsIcon, ChatBubbleLeftEllipsisIcon} from '@heroicons/vue/24/solid'
const store = useAuthStore();
const loading = ref(false);
const userProfile: any = ref({
  img: '',
  name: '',
  email: '',
  
});

onMounted(async () => {
 loading.value = true
  await store.getUser().then(() => {
    const {image, name, email}:any = store.user
    userProfile.value = {
      img: image,
      name: name,
      email: email
   }
  }).catch((error) => {
    console.log(error)
 }).finally(() => loading.value = false)
 
});
</script>
