<template>
    <div class="fixed top-0 z-50 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex items-center justify-center transition-all duration-300 delay-500">
       <div class="w-[350px] h-[150px] pt-6 flex flex-col  bg-slate-200 rounded-lg">
            <h3 class="mb-auto text-center text-xl text-slate-800 font-bold">Do you really want to delete the {{message}}?</h3>
            <div class="w-full">
                <button @click="$emit('closeModal')" class="w-1/2 py-2 bg-sky-500 rounded-bl-lg text-lg text-slate-200 font-extrabold duration-100 hover:bg-sky-700">No</button>
                <button @click="$emit('deleted')" class="w-1/2 py-2 bg-red-600 rounded-br-lg text-lg text-slate-200 font-extrabold duration-100 hover:bg-red-800">Yes</button>
            </div>
       </div>
    </div>
</template>
<script setup lang="ts">
defineProps(['message'])
</script>