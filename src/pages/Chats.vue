<template>
  <section>
    <div class="project-container relative">
      <loader v-if="loading "/>
      <ul v-else class="">
        <li
          v-for="item in allChats"
          :key="item.id"
          class="flex items-center border-b-2 border-whtie py-4"
        >
          
            <img
              :src="item?.img"
              alt="user image"
              class="w-10 h-10 rounded-full mr-8"
            />
            <h2 class="text-white text-2xl font-bold">{{ item?.name }}</h2>
          
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, computed , ref} from "vue";
import { useChatStore } from "@/store/chat";
import { useAuthStore } from "@/store/auth";

const chatStore = useChatStore();
const store = useAuthStore();
const loading = ref(false)

const allChats = computed(() => chatStore.allChats);

onMounted(async () => {
  loading.value = true
  await store.getUsers()
  await chatStore.getAllChats();
  console.log(allChats.value)
  loading.value = false
});
</script>
