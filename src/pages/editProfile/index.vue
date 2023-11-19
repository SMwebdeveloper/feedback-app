<template>
  <div class="project-container">
    <router-link to="/profile">
      <chevron-left-icon class="text-white w-10 font-medium mb-7" />
    </router-link>
    <div class="flex items-end justify-start">
      <img
        src="../../assets/images/user-image.jpg"
        alt="user image"
        class="w-[150px] h-[150px] rounded-full border border-slate-200"
      />
      <pencil-icon class="text-white w-5" />
    </div>
    <form action="">
      <label for=""></label>
      <input type="text" />
    </form>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeftIcon, PencilIcon } from "@heroicons/vue/24/solid";
</script>
