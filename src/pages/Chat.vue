<template>
  <div class="project-container">
    <a>
      <chevron-left-icon
        @click="router.back()"
        class="text-white w-10 font-medium mb-5 cursor-pointer"
      />
    </a>
    <form @submit.prevent="addMessage">
      <input v-model="message" type="text" />
      <button >add</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { useRouter, useRoute } from "vue-router";
import { useChatStore } from "@/store/chat";
import { ref } from "vue";

const router = useRouter();
const route = useRoute()
const chatStore = useChatStore()
const message = ref("");

const addMessage = async () => {
  await chatStore.setChat(route.params.id, message.value)
};
</script>
