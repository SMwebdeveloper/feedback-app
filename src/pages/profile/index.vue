<template>
  <div class="project-container pb-24">
    <!-- <loader v-if="!store.user.name" /> -->
    <div >
      <div  class="flex items-start h-[80px] mb-8">
        <img
          :src="user?.img !== ''? user?.img : UserImg"
          alt="user image"
          class="w-[80px] h-[80px] rounded-full mr-6 border border-slate-200 object-contain"
        />
        <div class="flex-1">
          <h2 class="text-xl text-white capitalize">{{user?.name }}</h2>
           <p class="text-xl text-white">{{ user?.bio }}</p>
        </div>  

        
        <div class="text-end relative">
          <bars-3-center-left-icon
            class="w-7 text-white cursor-pointer"
            @click="settingTable = !settingTable"
          />
          <div
            v-show="settingTable"
            class=" absolute top-8 right-0 w-[85px] bg-slate-200 px-3 py-1 rounded-md flex flex-col items-start text-slate-700 font-medium transition-all duration-300"
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
import {  computed, onMounted, ref } from "vue";
import {
  TableCellsIcon,
  ChatBubbleLeftEllipsisIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/vue/24/solid";
import UserImg from "@/assets/images/user-image.jpg";

const store = useAuthStore();
const settingTable = ref(false);


const logOut = async () => {
  await store.logOut();
};

const user = computed(() => store.user)

onMounted(() => {
  store.getSingleUser()
})
</script>
