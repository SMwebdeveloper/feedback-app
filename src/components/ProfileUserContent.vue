<template>
  <div class="flex items-start  mb-8">
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
        <button v-if="!visibleBtn"  @click="clickFollow"
          class="text-base font-semibold bg-sky-600 px-2 py-1 text-slate-200 rounded-lg mr-2"
        >
          <span v-if="!btnLoading">
            Follow
          </span>
          <span v-else>
            <i class="fa fa-spinner fa-spin text-8 text-slate-200"></i>
          </span>
        </button>
        <button 
          v-else
           @click="clickFollow"
          class="text-base font-semibold bg-sky-600 px-2 py-1 text-slate-200 rounded-lg mr-2"
        >
        <span v-if="!btnLoading">
            Unfollow
          </span>
          <span v-else>
            <i class="fa fa-spinner fa-spin text-8 text-slate-200"></i>
          </span>
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
import { useAuthStore } from "@/store/auth";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

const route = useRoute();
const store = useAuthStore()
const table = ref(false);
const visibleBtn = ref(false)
const btnLoading = ref(false)
const settingTable = ref(false);

const user = computed(() => props.user);

user.value.followers?.forEach((follow: any) => {
  if (follow === store.authToken) {
    visibleBtn.value = true
  }
})
const clickFollow = async () => {
  btnLoading.value = true
  visibleBtn.value = !visibleBtn.value
  await store.addRemoveFollowers(user.value.id, visibleBtn.value).then(async () => {
    await store.getUsers();
    await store.getSingleUser(user.value.id, "id");
    await store.getFollowers(user.value.id);
    await store.getFollowings(user.value.userId);
  });
  btnLoading.value = false
}


// window.addEventListener('click', (e:any) => {
//   const idName = e.target.getAttribute('id')
//   if (idName !== 'visibleTable') {
//     table.value = false
//   } 
// })

watchEffect(() => {
  if (route.name !== "user") {
    table.value = true;
  }
});
</script>
