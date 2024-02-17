<template>
  <div class="project-container relative">
    <loader v-if="loading" />
    <div v-else>
      <div class="flex items-center border-b border-slate-200 pb-2">
        <a class="h-8">
          <chevron-left-icon
            @click="router.back()"
            class="text-white w-8 h-8 font-medium mb-5 cursor-pointer"
          />
        </a>
        <img
          :src="chat.user?.img"
          alt="user image"
          class="w-12 h-12 rounded-full mr-4"
        />
        <h3 class="text-3xl text-slate-50 font-bold">{{ chat.user?.name }}</h3>
      </div>
      <ul class="h-[78vh] flex flex-col justify-end">
        <li
          v-for="message in chat.messages"
          :key="message?.id"
          class="w-1/2 min-h-[30px] bg-slate-400 rounded-full px-2 ml-auto"
        >
          <h4>{{ message.message }}</h4>
        </li>
      </ul>
      <form
        @submit.prevent="addMessage"
        class="fixed bottom-0 mb-2 w-[390px] border rounded-full border-slate-200 pl-2 py-2 flex items-center"
      >
        <input
          v-model="message"
          type="text"
          class="bg-transparent w-[90%] border-none outline-none text-slate-200 font-medium"
        />
        <button class="h-6">
          <paper-airplane-icon class="w-6 text-white -rotate-45" />
        </button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { computed, onMounted, ref } from "vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const chatStore = useChatStore();
const loading = ref(false);
const message = ref("");

const key = route.params.id;
const addMessage = async () => {
  await chatStore.setChat(route.params.id, message.value);
};
const chat = computed(() => chatStore.chat);

onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await chatStore.getAllChats();
  await chatStore.getSingleChat(key);
  loading.value = false;
});
</script>
