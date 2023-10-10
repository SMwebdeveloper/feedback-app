<template>
    <section class="fixed top-0 left-0 h-screen w-[70px] bg-slate-800">
        <ul class="flex flex-col items-center justify-center gap-y-5 h-full ">
          <li class="text-white w-[40px]">
            <HomeIcon />
          </li>
          <li class="text-white w-[40px]">
            <MagnifyingGlassIcon/>
          </li >
          <li class="text-white w-[40px]">
            <PlusCircleIcon/>
          </li>
          <li class="text-white w-[40px]">
            <UserIcon/>
          </li>
          <li class="text-white w-[40px]">
            <BookmarkIcon/>
          </li>
        </ul>
    </section>
</template>
<script setup lang="ts">
import {HomeIcon,  PlusCircleIcon, UserIcon, MagnifyingGlassIcon, BookmarkIcon} from '@heroicons/vue/24/outline'
</script>
