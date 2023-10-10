<template>
  <section class="fixed top-0 left-0 h-screen w-[70px] bg-slate-800">
    <ul class="flex flex-col items-center justify-center gap-y-5 h-full">
      <li
        class="text-white w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/"> <HomeIcon /> </router-link>
      </li>
      <!-- <li class="text-white w-[40px]">
            <MagnifyingGlassIcon/>
          </li > -->
      <li
        class="text-white w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/add-publication">
          <PlusCircleIcon />
        </router-link>
      </li>
      <li
        class="text-white w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/profile">
          <UserIcon />
        </router-link>
      </li>
      <li
        class="text-white w-[40px] cursor-pointer duration-200 hover:text-slate-400"
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
  MagnifyingGlassIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";
</script>
