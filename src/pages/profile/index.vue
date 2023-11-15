<template>
  <div class="container mx-auto">
    <div>
      <img src="" alt="" />

      <h3>Name</h3>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
const store = useAuthStore();
const loading = ref(false);
const userProfile: any = ref({});

onMounted(async () => {
  
});
</script>
