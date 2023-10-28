<template>
  <section class="w-full h-screen py-14">
    <div class="container mx-auto">
      <form
        action=""
        class="flex flex-col items-center justify-center w-full text-white text-3xl"
      >
        <label class="flex flex-col mb-4">
          Title
          <input
            v-model="feedback.title"
            type="text"
            class="w-[400px] mt-3 rounded-md text-lg bg-white text-slate-800 outline-none border-none"
          />
        </label>
        <label class="flex flex-col mb-4">
          Description
          <textarea
            v-model="feedback.description"
            name="desc"
            rows="5"
            class="w-[400px] rounded-md border-none outline-none text-lg text-slate-600 mt-3"
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
              :src="feedback.img"
              alt=""
              class="w-full object-cover rounded-md"
            />
          </div>
        </label>

        <button class="bg-sky-600 text-xl px-5 py-2 font-bold rounded-md" @click="handleClick">
          Create feedback
        </button>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  uploadBytes,
  ref as imgRef,
  getStorage,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
const loading = ref(false);
const feedback = ref({
  title: "",
  description: "",
  img: "",
});
const uploadImage = async (item: any) => {
  const imgEl: any = item.target.files[0];
  const storageRef = imgRef(storage, `images/${imgEl.name}`);
  loading.value = true;
  await uploadBytes(storageRef, imgEl);
  await getDownloadURL(imgRef(storage, `images/${imgEl.name}`))
    .then((url) => {
      feedback.value.img = url;
    })
    .catch((e) => console.log(e))
    loading.value = false
};

const handleClick = () => {
  
}
</script>
