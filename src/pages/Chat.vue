<template>
  <section class="min-h-screen">
    <div class="project-container relative">
      <loader v-if="loading" />
      <div v-else>
        <div
          class="flex items-center border-b border-slate-200 pb-2 fixed top-0 w-[367px] bg-slate-600 pt-4"
        >
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
          <h3 class="text-3xl text-slate-50 font-bold">
            {{ chat.user?.name }}
          </h3>
        </div>

        <h2
        v-show="!messages.length && !messageLoader"
        class="mt-24 text-center text-white text-xl"
        >
        There are no messages yet
      </h2>
      <div v-if="messageLoader" class="mt-40">
        <second-loader/>
      </div>
        <ul v-else class="mt-14 h-[80vh] chat-list pt-4 pb-2">
          <li
            v-for="{ message, userId, id } in chatStore.messages"
            :key="id"
            class="w-1/2 text-slate-200 font-semibold border rounded-xl px-2 py-1 mb-2 last:mb-0"
            :class="`${
              userId === store.authToken
                ? 'border-slate-900 bg-slate-700 ml-auto'
                : 'border-slate-200 bg-slate-600 mr-auto'
            }`"
          >
            <h4>{{ message }}</h4>
          </li>
        </ul>
        <form
          @submit.prevent="addMessage"
          class="fixed bottom-2 w-[367px] bg-slate-600 border rounded-full border-slate-200 pl-2 py-2 flex items-center"
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
  </section>
</template>
<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useChatStore } from "@/store/chat";
import { computed, onMounted, ref, watchEffect } from "vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { update, ref as messageRef } from "firebase/database";
import userImage from "@/assets/images/user-image.jpg";
import SecondLoader from "@/components/SecondLoader.vue";
import { database } from "@/firebase/config";

const router = useRouter();
const route = useRoute();
const store = useAuthStore();
const chatStore = useChatStore();
const loading = ref(false);
const messageLoader = ref(false);
const message = ref("");

const key = route.params.id;

const addMessage = async () => {
  if (message.value) {
    messageLoader.value = true;
    await chatStore.setMessage(route.params.id, message.value);
    message.value = "";
  }
  messageLoader.value = false;
};
const chat = computed(() => chatStore.chat);
const messages = computed(() => {
  chatStore.messages.sort((a, b) => new Date(a.time) - new Date(b.time));
  return chatStore.messages;
});

onMounted(async () => {
  console.log(key)
  loading.value = true;
    await store.getUsers();
    await chatStore.getAllChats();
    await chatStore.getSingleChat(key);
  loading.value = false;
})
watchEffect(async () => {
  messageLoader.value = true;
  
  messageLoader.value = false;
  messages.value?.forEach(async (message: any) => {
    if (message.userId !== store.authToken) {
      if (!message.visible) {
        const db = messageRef(database, "messages/" + message.id);
        console.log(message);
        const newObj = {
          ...message,
          visible: true,
        };
        await update(db, newObj)
          .then(() => console.log("done"))
          .catch((error: any) => console.log(error.message));
      }
    }
  });
});
</script>
<style scoped lang="css">
.chat-list {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.chat-list::-webkit-scrollbar {
  width: 0;
}
</style>
