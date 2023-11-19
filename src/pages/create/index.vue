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
              :src="feedback.img"
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
import { reactive, ref } from "vue";
import {
  uploadBytes,
  ref as imgRef,
  getStorage,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();
const loading = ref(false);
// const htmlCod = "style='color:red'"
// const isButtonDisabled = ref(false)
const feedback = ref({
  title: "",
  description: "",
  img: "",
});
// const count = ref(0)
// const state = reactive({
//   count
// })

// console.log(state.count) // 0

// state.count = 1
// console.log(count.value) // 1
// const books = reactive([ref('Vue 3 Guide')])
// // need .value here
// console.log(books[0].value)

// const map = reactive(new Map([['count', ref(0)]]))
// // need .value here
// console.log(map.get('count').value)
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

const handleClick = ():any => {
  console.log(2)
}
</script>
