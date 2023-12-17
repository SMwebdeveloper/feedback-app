<template>
  <div class="flex items-start h-[80px] mb-8">
    <img
      :src="user?.img !== '' ? user?.img : UserImg"
      alt="user image"
      class="w-[80px] h-[80px] rounded-full mr-6 border border-slate-200 object-contain"
    />
    <div class="flex-1">
      <h2 class="text-xl text-white capitalize">{{ user?.name }}</h2>
      <p class="text-xl text-white">{{ user?.bio }}</p>
    </div>

    <div class="text-end relative">
      <bars-3-center-left-icon
        class="w-7 text-white cursor-pointer"
        @click="settingTable = !settingTable"
      />
      <div
        v-show="settingTable"
        class="absolute top-8 right-0 w-[85px] bg-slate-200 px-3 py-1 rounded-md flex flex-col items-start text-slate-700 font-medium transition-all duration-300"
      >
        <router-link to="/edit-profile" class="hover:text-red-500 duration-100"
          >Edit</router-link
        >
        <button class="hover:text-red-500 duration-100" @click="$emit('logOut')">
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserImg from "@/assets/images/user-image.jpg";
import { Bars3CenterLeftIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";

const settingTable = ref(false);
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const user = computed(() => props.user);
</script>
