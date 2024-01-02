<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "./store/auth";

const router = useRouter();
const route = useRoute();
const store = useAuthStore()
onBeforeMount(async () => {
  await onAuthStateChanged(auth, (user: any) => {
    if (user) {
        store.authToken = user.uid
    }
    if (!user) {
      router.replace("/login");
    } else if (route.path == "/login" || route.path == "sign-up") {
      router.replace("/");
    }
  });
});
</script>
