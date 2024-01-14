<template>
  <div class="border-y-2 border-y-slate-200 flex items-center py-2 px-1 mb-2">
    <img
      :src="follow.img ? follow.img : userImage"
      alt="follow image"
      class="w-14 h-14 rounded-full mr-2"
    />
    <h2 class="text-xl text-slate-200 flex-1">{{ follow.name }}</h2>
    <div v-if="!myFollowing">
      <button
        v-if="!visibleBtn"
        @click="clickFollow"
        class="text-base font-semibold bg-sky-600 px-2 py-1 text-slate-200 rounded-lg mr-2"
      >
        <span v-if="!btnLoading"> Follow </span>
        <span v-else>
          <i class="fa fa-spinner fa-spin text-8 text-slate-200"></i>
        </span>
      </button>
      <button
        v-else
        @click="clickFollow"
        class="text-base font-semibold bg-sky-600 px-2 py-1 text-slate-200 rounded-lg mr-2"
      >
        <span v-if="!btnLoading"> Unfollow </span>
        <span v-else>
          <i class="fa fa-spinner fa-spin text-8 text-slate-200"></i>
        </span>
      </button>
    </div>
    <h2 v-else class="text-xl text-sky-500 font-semibold">My profile</h2>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import userImage from "@/assets/images/user-image.jpg";
import { useAuthStore } from "@/store/auth";
import { useRoute } from "vue-router";
const props = defineProps({
  follow: {
    type: Object,
    required: true,
  },
});

const store = useAuthStore();
const route = useRoute();
const btnLoading = ref(false);
const visibleBtn = ref(false);
const myFollowing = ref(false);
const followKey = ref("");
const follow = computed(() => props.follow);

if (follow.value.userId === store.authToken) {
  myFollowing.value = true;
}
follow.value.followers?.forEach((follow: any) => {
  if (follow === store.authToken) {
    visibleBtn.value = true;
  }
});
const clickFollow = async () => {
  btnLoading.value = true;
  visibleBtn.value = !visibleBtn.value;
  await store.addRemoveFollowers(follow.value.id, visibleBtn.value, followKey).then(async () => {
    if (followKey.value === 'following') {
     await store.getUsers()
     await store.getSingleUser(store.authToken, 'userId')
     await store.getFollowings(store.authToken)
  }
  })  
  btnLoading.value = false;
};
watchEffect(() => {
  if (route.name === "profile") {
    followKey.value = "following";
  } else {
    followKey.value = "follower";
  }
});
</script>
