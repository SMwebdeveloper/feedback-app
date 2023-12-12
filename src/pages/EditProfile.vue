<template>
  <div class="project-container">
    <router-link to="/profile">
      <chevron-left-icon class="text-white w-10 font-medium mb-7" />
    </router-link>
    <loader v-if="!editUser.name" />
    <form v-else>
      <label for="uploadImage" class="block mb-4 relative cursor-pointer">
        <div
          class="w-[140px] h-[140px] rounded-full flex items-center justify-center border border-slate-200"
        >
          <i
            v-if="imgLoader"
            class="fa fa-spinner fa-spin text-3xl text-white"
          ></i>
          <img
            v-else
            :src="image ? image : userImage"
            alt="user image"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <div
          class="absolute bottom-0 left-[100px] rounded-full p-2 inline-block bg-slate-600 border border-slate-300"
        >
          <pencil-icon class="text-white w-4" />
        </div>
        <input
          id="uploadImage"
          type="file"
          accept="image/png, image/pdf, image/jpeg"
          class="hidden"
          @change="uploadImage"
        />
      </label>
      <label for="" class="block mb-4">
        <input
          type="text"
          v-model="editUser.name"
          placeholder="Name"
          class="bg-slate-800 px-2 py-1 rounded-md text-white border outline-none border-b-slate-200 w-full"
        />
      </label>
      <label for="" class="block mb-4">
        <textarea
          name=""
          id=""
          rows="5"
          placeholder="Bio"
          v-model="editUser.bio"
          class="bg-slate-800 px-2 py-1 rounded-md text-white border outline-none border-b-slate-200 w-full"
        ></textarea>
      </label>
      <button
        class="bg-green-600 text-white border-none w-1/3 py-2 text-xl font-medium rounded-md"
        @click.prevent="userEdit"
      >
        <span v-if="loading">
          <i class="fa fa-spinner fa-spin text-12 text-slate-200"></i>
        </span>
        <span v-else>Edit</span>
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import userImage from "@/assets/images/user-image.jpg";
import { getImage } from "@/composable/uploadImage";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { ChevronLeftIcon, PencilIcon } from "@heroicons/vue/24/solid";
// EyeSlashIcon,
// EyeIcon,

const store = useAuthStore();
const router = useRouter();
const loading = ref(false);
const imgLoader = ref(false);
const image = ref();
const editUser = ref({
  name: "",
  id: "",
  bio: "",
});

const uploadImage = async (e: any) => {
  const imgEl = e.target.files[0];
  imgLoader.value = true;
  image.value = await getImage(imgEl);
  imgLoader.value = false;
};
const userEdit = async () => {
  loading.value = true;
  const { name, bio } = editUser.value;
  const docRef = doc(db, "users", editUser.value.id);
  await updateDoc(docRef, {
    name: name,
    bio: bio,
    img: image.value,
  })
    .then(() => {
      router.push("/profile");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
};
onMounted(async () => {
  loading.value = true;
  const { name, id, bio, img }: any = store.user;
  editUser.value = {
    name: name,
    id: id,
    bio: bio,
  };
  image.value = img;
  loading.value = false;
});
</script>
