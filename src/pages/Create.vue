<template>
  <section class="pb-24 min-h-screen">
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
            class="w-full mt-3 rounded-md text-lg bg-white text-slate-600 outline-none border-none px-2"
          />
        </label>
        <label class="flex flex-col mb-4 w-full">
          Description
          <textarea
            v-model="feedback.desc"
            name="desc"
            rows="5"
            class="w-full rounded-md border-none outline-none text-lg text-slate-600 mt-3 px-2"
          ></textarea>
        </label>
        <label for="uploadImage" class="inline-block w-full mb-3">
          Image:
          <div
            class="bg-[rgba(255,255,255,0.8)] w-full h-[150px] rounded-md mt-3 flex items-center justify-center cursor-pointer"
          >
            <input
              id="uploadImage"
              type="file"
              accept="image/png, image/gif, image/jpg"
              @change="uploadImage"
              class="hidden"
            />
            <arrow-up-on-square-icon
              v-if="!image && !imageLoading"
              class="w-24 text-slate-600"
            />
            <div class="w-hull h-full flex items-center justify-center" v-else>
              <span v-if="imageLoading">
                <i class="fa fa-spinner fa-spin text-12 text-slate-600"></i>
              </span>
              <img
                v-else
                :src="image"
                alt=""
                class="w-full object-cover rounded-md h-full"
              />
            </div>
          </div>
        </label>
        <h2
          v-show="errorMessage"
          class="mb-3 text-red-500 text-xl bg-[rgba(255,255,255,0.7)] px-3 py-2 rounded-md border border-red-500"
        >
          {{ errorMessage }}
        </h2>
        <button
          class="bg-sky-600 text-xl px-5 py-2 font-bold rounded-md w-[200px]"
          @click="handleClick"
        >
          <span v-if="loading">
            <i class="fa fa-spinner fa-spin text-12 text-slate-200"></i>
          </span>
          <span v-else> Create feedback </span>
        </button>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ArrowUpOnSquareIcon } from "@heroicons/vue/24/outline";
import { getImage } from "@/composable/uploadImage";
import { useAuthStore } from "@/store/auth";
import { addStore } from "@/composable/fireStore";
import { useRouter } from "vue-router";
// import { useFeedbackStore } from "@/store/feedback";

const imageLoading = ref(false);
const image = ref();
const errorMessage = ref("");
const loading = ref(false);
const store = useAuthStore();
// const feedbackStore = useFeedbackStore();
const router = useRouter();
const feedback = ref({
  id: "",
  title: "",
  desc: "",
  img: "",
  likes: [],
  userId: store.authToken,
});
const uploadImage = async (item: any) => {
  imageLoading.value = true;
  const imgEl: any = item.target.files[0];
  image.value = await getImage(imgEl);
  imageLoading.value = false;
};

const handleClick = async () => {
  const { title, desc } = feedback.value;
  loading.value = true;
  if (title && desc && image.value) {
    await addStore({ ...feedback.value, img: image.value }, "feedbacks")
      .then(() => {
        router.push("/");
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => (loading.value = false));
  } else {
    errorMessage.value = "Please enter complete information!";
    setTimeout(() => {
      errorMessage.value = "";
    }, 2500);
  }
};
</script>
