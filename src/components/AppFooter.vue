<template>
  <section id="app-footer"
    class="fixed bottom-0 left-0 w-full h-[80px] py-2 bg-slate-300 shadow-sm shadow-slate-400"
  >
    <ul
      class="project-container flex items-center justify-between h-full text-sltae-900 z-50"
    >
      <li class="w-[40px] cursor-pointer duration-200 hover:text-slate-400">
        <router-link to="/" exact-active-class="text-slate-600">
          <HomeIcon />
        </router-link>
      </li>
      <li class="w-[40px] cursor-pointer duration-200 hover:text-slate-400">
        <router-link to="/users" exact-active-class="text-slate-600">
          <UsersIcon
        /></router-link>
      </li>
      <li class="w-[40px] cursor-pointer duration-200 hover:text-slate-400 relative">
        <span v-show="norifacation" class="inline-block absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full"></span>
        <router-link to="/chats" exact-active-class="text-slate-600">
          <ChatBubbleOvalLeftEllipsisIcon 
        /></router-link>
      </li>
      <li class="w-[40px] cursor-pointer duration-200 hover:text-slate-400">
        <router-link to="/add-publication" exact-active-class="text-slate-600">
          <PlusCircleIcon />
        </router-link>
      </li>
      <li class="w-[40px] cursor-pointer duration-200 hover:text-slate-400">
        <router-link to="/save" exact-active-class="text-slate-600">
          <BookmarkIcon />
        </router-link>
      </li>
      <li class="w-[40px] cursor-pointer duration-200 hover:text-slate-400">
        <router-link to="/profile" exact-active-class="text-slate-600">
          <UserIcon />
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import {
  HomeIcon,
  PlusCircleIcon,
  UsersIcon,
  UserIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";
import { useChatStore } from "@/store/chat";
import { onMounted, ref, watchEffect } from "vue";

const store = useChatStore()
const norifacation = ref(false);
watchEffect(async () => {
  store.allChats.forEach((message: any) => {
    if (message.unreadMessage) {
      norifacation.value = true
    }
  })
});
onMounted(async () => {
  await store.getAllChats()
})
</script>
