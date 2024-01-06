<template>
  <div class="flex items-start h-[80px] mb-8">
    <img
      :src="user?.img !== '' ? user?.img : UserImg"
      alt="user image"
      class="w-[80px] h-[80px] rounded-full mr-6 border border-slate-200 object-contain"
    />
    <div class="flex-1">
      <div>
        <div>
          <button
            class="text-base font-semibold bg-sky-600 px-2 py-1 text-slate-200 rounded-lg"
          >
            Following
          </button>
          <button
            class="text-base font-semibold bg-red-600 px-2 py-1 text-slate-200 rounded-lg"
          >
            Unfollowing
          </button>
          <button
            class="text-base font-semibold bg-slate-900 px-2 py-1 text-slate-200 rounded-lg"
          >
            Message
          </button>
        </div>
        <div>
          <h2 class="text-xl text-white capitalize">{{ user?.name }}</h2>
          <p class="text-xl text-white">{{ user?.bio }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-start">
      <div v-show="table" class="text-end relative">
        <bars-3-center-left-icon
          class="w-7 text-white cursor-pointer border border-slate-200 ml-2 rounded-md"
          @click="settingTable = !settingTable"
        />
        <div
          v-show="settingTable"
          class="absolute top-9 right-0 w-[85px] bg-slate-200 shadow-md shadow-slate-200 px-3 py-1 rounded-md flex flex-col items-start text-slate-700 font-medium transition-all duration-300"
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

const user = computed(() => props.user);
watchEffect(() => {
  if (route.name !== "user") {
    table.value = true;
  }
});
</script>
