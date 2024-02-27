<template>
  <section>
    <div class="project-container relative">
      <loader v-if="loading" />
      <ul v-else class="">
        <li v-for="item in allChats" :key="item.id">
          <router-link
            :to="`/chat/${item?.user.id}`"
            class="flex items-center border-b-2 border-whtie py-4 pl-2 pr-4"
          >
            <img
              :src="item?.user.img ? item.user.img : userImage"
              alt="user image"
              class="w-12 h-12 rounded-full mr-4"
            />
            <h2 class="text-slate-100 text-xl font-bold flex-1">
              {{ item?.user.name }}
            </h2>

            <span
              v-if="item.unreadMessage"
              class="inline-block text-white text-base w-7 h-7 text-center bg-red-600 rounded-full"
              >{{ item.unreadMessage }}</span
            >
          </router-link>
        </li>
      </ul>
      <h2 v-if="!loading && !allChats.length" class="text-slate-200 text-3xl font-semibold text-center mt-52">Chats not yet</h2>
    </div>
  </section>
</template>
<script setup lang="ts">
import userImage from '@/assets/images/user-image.jpg'
import { onMounted, computed, ref } from "vue";
import { useChatStore } from "@/store/chat";
import { useAuthStore } from "@/store/auth";

const chatStore = useChatStore();
const store = useAuthStore();
const loading = ref(false);

const allChats = computed(() => chatStore.allChats);

onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await chatStore.getAllChats();
  loading.value = false;
});
</script>
