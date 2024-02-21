<template>
  <div class="project-container relative">
    <loader v-if="loading" />
    <div v-else>
      <div class="flex items-center border-b border-slate-200 pb-2 fixed top-0 w-[390px] bg-slate-600">
        <a class="h-8">
          <chevron-left-icon
            @click="router.back()"
            class="text-white w-8 h-8 font-medium mb-5 cursor-pointer"
          />
        </a>
        <img
          :src="chat.user?.img ? chat.user.img : userImage"
          alt="user image"
          class="w-12 h-12 rounded-full mr-4"
        />
        <h3 class="text-3xl text-slate-50 font-bold">{{ chat.user?.name }}</h3>
      </div>
      <ul class="flex flex-col justify-end pt-12 pb-8">
        <li
          v-for="{ message, id, userId } in messages"
          :key="id"
          class="w-1/2 min-h-[30px] border-2 rounded-full px-2 text-lg text-slate-900 font-semibold mb-2 last:mb-0" :class="`${userId === store.authToken ? 'bg-slate-400 ml-auto border-slate-700'  : 'bg-[rgba(255,255,255,0.7)] mr-auto border-white'}`"
        >
          <h4>{{ message }}</h4>
        </li>
      </ul>
      <!-- <h2 v-if="!messages" class="text-center my-[200px] text-slate-200 text-2xl font-semibold">Not yet messages</h2> -->
      <form
        @submit.prevent="addMessage"
        class="fixed bottom-0 w-[390px] bg-slate-600 border rounded-full border-slate-200 pl-2 py-2 flex items-center"
      >
        <input
          v-model="message"
          type="text"
          placeholder="Send message"
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
import userImage from "@/assets/images/user-image.jpg";
// import { database } from "@/firebase/config";
// import {ref as fireRef, onChildAdded} from 'firebase/database'

const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const chatStore = useChatStore();
const loading = ref(false);
const message = ref("");

const key = route.params.id;

const addMessage = async () => {
  if (message.value) {
    await chatStore.setMessage(route.params.id, message.value);
    message.value = "";
  }
};
const chat = computed(() => chatStore.chat);
const messages = computed(() => chat.value.messages);

onMounted(async () => {
  loading.value = true;
  await store.getUsers();
  await chatStore.getAllChats();
  await chatStore.getSingleChat(key);
  loading.value = false;
  // const messageRef = fireRef(database, 'allChats/' + chat.value.id + '/messages') 
  //       await onChildAdded(messageRef, (data) => {
  //         messages.value = data.val()
  //       })
});
</script>
