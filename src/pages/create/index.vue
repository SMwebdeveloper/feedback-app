<template>
  <section class="w-full h-screen">
    <div class="project-container">
      <form
        @submit.prevent
        action=""
        class="flex flex-col items-center justify-center w-full text-white text-3xl"
      >
        <label class="flex flex-col mb-4 w-full">
          Title
          <input
            v-model="feedback.title"
            type="text"
            class="w-full mt-3 rounded-md text-lg bg-white text-slate-600 outline-none border-none"
          />
        </label>
        <label class="flex flex-col mb-4 w-full">
          Description
          <textarea
            v-model="feedback.description"
            name="desc"
            rows="5"
            class="w-full rounded-md border-none outline-none text-lg text-slate-600 mt-3"
          ></textarea>
        </label>
        <label class="mb-3">
          Image
          <input
            type="file"
            accept="image/png, image/gif, image/jpg"
            @change="uploadImage"
            class="w-[300px] text-sm mb-2"
          />
          <div class="w-[200px]">
            <span v-if="loading">
              <i class="fa fa-spinner fa-spin"></i>
            </span>
            <img
               v-else
              :src="img"
              alt=""
              class="w-full object-cover rounded-md"
            />
          </div>
        </label>
        <button class="bg-sky-600 text-xl px-5 py-2 font-bold rounded-md"  @click="handleClick">
          Create feedback
        </button>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
import {  ref } from "vue";
import { getImage } from "@/usable/uploadImage";

const loading = ref(false);
const img = ref()
const feedback = ref({
  title: "",
  description: "",
  img: "",
});
const uploadImage = async (item: any) => {
  loading.value = true;
  const imgEl: any = item.target.files[0];
  img.value = await getImage(imgEl)
  loading.value = false
};

const handleClick = ():any => {
  console.log(2)
}
</script>
