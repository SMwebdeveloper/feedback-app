<template>
  <section class="fixed top-4 left-[35%] mx-auto w-[350px] py-2 rounded-md bg-slate-200 shadow-md shadow-slate-300">
    <ul class="flex  items-center justify-around gap-y-5 h-full text-sltae-900">
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/"> <HomeIcon /> </router-link>
      </li>
      <!-- <li class=" w-[40px]">
            <MagnifyingGlassIcon/>
          </li > -->
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/add-publication">
          <PlusCircleIcon />
        </router-link>
      </li>
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/profile">
          <UserIcon />
        </router-link>
      </li>
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/save">
          <BookmarkIcon />
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import {
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";
</script>
