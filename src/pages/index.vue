<template>
  <div>
    <suspense>
      <template #default class="h-full">
        <router-view />
      </template>
      <template #fallback>
        <loader />
      </template>
    </suspense>

    <app-footer />
  </div>
</template>
<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import { useAuthStore } from "@/store/auth";
import { onMounted } from "vue";

const store = useAuthStore();

onMounted(async () => {
  await store.getUsers();
});
</script>
