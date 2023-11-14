<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const router = useRouter();
const route = useRoute();
onBeforeMount(async () => {
  await onAuthStateChanged(auth, (user: any) => {
    if (user) {
      console.log('have user profile')
    }
    if (!user) {
      router.replace("/login");
    } else if (route.path == "/login" || route.path == "sign-up") {
      router.replace("/");
    }
  });
});
</script>
