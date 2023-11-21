<template>
  <div class="project-container pb-24">
    <loader v-if="loading" />
    <div v-else>
      <div class="flex items-start h-[80px] mb-8">
        <img
          :src="user.img !== ''? user.img : UserImg"
          alt="user image"
          class="w-20 h-20 rounded-full mr-6 border border-slate-200 object-cover"
        />
        <div class="flex-1">
          <h2 class="text-xl text-white capitalize">{{ user.name }}</h2>
           <p class="text-xl text-white">{{ user.bio }}</p>
        </div>
        <div class="flex flex-col items-end">
          <bars-3-center-left-icon
            class="w-7 text-white cursor-pointer"
            @click="settingTable = !settingTable"
          />
          <div
            v-show="settingTable"
            class="bg-slate-200 px-3 py-1 rounded-md flex flex-col text-slate-700 font-medium duration-100"
          >
            <router-link
              to="/edit-profile"
              class="hover:text-red-500 duration-100"
              >Edit</router-link
            >
            <button class="hover:text-red-500 duration-100" @click="logOut">
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-around mb-8">
        <div class="text-base text-white">
          <h4 class="flex flex-col">posts 20</h4>
          <table-cells-icon class="w-7" />
        </div>
        <div class="text-base text-white">
          <h4 class="flex flex-col">Comments 20</h4>
          <chat-bubble-left-ellipsis-icon class="w-7" />
        </div>
      </div>

      <div class="w-full">
        <div class="bg-slate-200 h-[300px] w-full rounded-md"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
import {
  TableCellsIcon,
  ChatBubbleLeftEllipsisIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/vue/24/solid";
import UserImg from "@/assets/images/user-image.jpg";

const store = useAuthStore();
const loading = ref(false);
const settingTable = ref(false);


const user = ref({
})
const logOut = async () => {
  await store.logOut();
};
onMounted(async () => {
  loading.value = true;
  await store
    .getUser()
    .then(() => {
      user.value = store.user
      console.log(user.value)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
});
</script>
