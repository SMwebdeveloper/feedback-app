<template>
  <section class="fixed bottom-0 left-0 w-full h-[80px] py-2 bg-slate-300 shadow-sm shadow-slate-400">
    <ul class="project-container flex items-center justify-between h-full text-sltae-900 z-50">
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/" exact-active-class="text-slate-600"> <HomeIcon /> </router-link>
      </li>
      <li class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400">
            <router-link to="/users" exact-active-class="text-slate-600"> <UsersIcon/></router-link>
          </li >
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/add-publication" exact-active-class="text-slate-600">
          <PlusCircleIcon />
        </router-link>
      </li>
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/save" exact-active-class="text-slate-600">
          <BookmarkIcon />
        </router-link>
      </li>
      <li
        class=" w-[40px] cursor-pointer duration-200 hover:text-slate-400"
      >
        <router-link to="/profile" exact-active-class="text-slate-600">
          <UserIcon />
        </router-link>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
import {
  HomeIcon,
  PlusCircleIcon,
  UsersIcon,
  UserIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";


</script>
<!-- <style>

.router-link-active {
  color: rgb(73, 132, 180);
}
</style> -->