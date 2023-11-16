<template>
  <section class="fixed bottom-0 left-0 w-full h-[80px] py-2 bg-slate-300 shadow-sm shadow-slate-400">
    <ul class="project-container flex items-center justify-around h-full text-sltae-900">
      <li
        class=" w-[35px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/"> <HomeIcon /> </router-link>
      </li>
      <li class=" w-[35px] cursor-pointer duration-200 hover:text-slate-400">
            <MagnifyingGlassIcon/>
          </li >
      <li
        class=" w-[35px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/add-publication">
          <PlusCircleIcon />
        </router-link>
      </li>
      <li
        class=" w-[35px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/profile">
          <UserIcon />
        </router-link>
      </li>
      <li
        class=" w-[35px] cursor-pointer duration-200 hover:text-slate-400"
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
  MagnifyingGlassIcon,
  UserIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";
</script>
<!-- <style>

.router-link-active {
  color: rgb(73, 132, 180);
}
</style> -->