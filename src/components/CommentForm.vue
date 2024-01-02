<template>
  <form
    @click.prevent="handleClick"
    class="fixed bottom-0 left-0 w-full h-10 flex items-center border-t border-t-slate-700 text-slate-700"
  >
    <input
      v-model="comment"
      type="text"
      placeholder="Add comments"
      class="w-[80%] h-full bg-slate-400 outline-none font-meduim placeholder:text-slate-700 px-2 py-1"
    />
    <button
      class="bg-slate-200 w-[20%] h-full py-1 px-2 duration-150 hover:text-slate-200 hover:bg-slate-700"
    >
      Add
    </button>
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";

const comment = ref("");
const emit = defineEmits(["addComment"]);

const handleClick = () => {
  emit("addComment", comment.value);
  comment.value = ''
};
</script>
