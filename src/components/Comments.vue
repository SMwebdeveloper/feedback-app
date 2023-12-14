<template>
    <ul class="pt-5 pb-11">
        
        <li
          v-for="{ comment, author: { img, name } } in comments"
          class="flex mb-2 bg-slate-100 p-1 rounded-lg"
        >
          <img :src="img" alt="user image" class="w-8 h-8 rounded-full mr-3" />
          <div>
            <h6 class="text-sm">{{ name }}</h6>
            <span class="inline-block w-full text-slate-800 font-bold">{{
              comment
            }}</span>
          </div>
        </li>
      </ul>
      <form  @click.prevent="addComment"
        class="fixed bottom-0 left-0 w-full h-10 flex items-center border-t border-t-slate-700 text-slate-700"
      >
        <input
          v-model="comment.comment"
          type="text"
          placeholder="Add comments"
          class="w-[80%] h-full rounded-bl-md bg-slate-400 outline-none font-meduim placeholder:text-slate-700 px-2 py-1"
        />
        <button
         
          class="bg-slate-200 w-[20%] h-full py-1 px-2 rounded-br-md duration-150 hover:text-slate-200 hover:bg-slate-700"
        >
          Add
        </button>
    </form>
</template>
<script setup lang="ts">

const addComment = () => {

}
</script>