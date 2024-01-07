<template>
  <div class="flex items-start h-[80px] mb-8">
    <img
      :src="user?.img !== '' ? user?.img : UserImg"
      alt="user image"
      class="w-[80px] h-[80px] rounded-full mr-6 border border-slate-200 object-contain"
    />
    <div class="flex-1">
      <div class="mb-3">
        <h2 class="text-2xl text-white font-semibold capitalize">{{ user?.name }}</h2>
        <p class="text-xl text-white">{{ user?.bio }}</p>
      </div>
      <div v-if="!table">
        <button
          class="text-base font-semibold bg-sky-600 px-2 py-1 text-slate-200 rounded-lg mr-2"
        >
          Following
        </button>
        <button 
          class="text-base font-semibold bg-red-600 px-2 py-1 text-slate-200 rounded-lg hidden"
        >
          Unfollowing
        </button>
        <button
          class="text-base font-semibold bg-slate-900 px-2 py-1 text-slate-200 rounded-lg"
        >
          Message
        </button>
      </div>
    </div>

    <div class="flex items-start">
      <div v-show="table" class="text-end relative">
        <bars-3-center-left-icon
          class="w-7 text-white cursor-pointer "
          @click="settingTable = !settingTable"
        />
        <div
          id="visibleTable"
          v-show="settingTable"
          class="absolute top-9 right-0 w-[85px] bg-slate-200 shadow-sm shadow-slate-200 px-3 py-1 rounded-md flex flex-col items-start text-slate-700 font-medium transition-all duration-300"
        >
          <router-link
            to="/edit-profile"
            class="hover:text-red-500 duration-100"
            >Edit</router-link
          >
          <button
            class="hover:text-red-500 duration-100"
            @click="$emit('logOut')"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserImg from "@/assets/images/user-image.jpg";
import { Bars3CenterLeftIcon } from "@heroicons/vue/24/solid";
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const table = ref(false);
const settingTable = ref(false);
const route = useRoute();
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// window.addEventListener('click', (e:any) => {
//   const idName = e.target.getAttribute('id')
//   if (idName !== 'visibleTable') {
//     table.value = false
//   } 
// })

const user = computed(() => props.user);
watchEffect(() => {
  if (route.name !== "user") {
    table.value = true;
  }
});
</script>
