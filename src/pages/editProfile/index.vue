<template>
  <div class="project-container">
    <router-link to="/profile">
      <chevron-left-icon class="text-white w-10 font-medium mb-7" />
    </router-link>
     <loader v-if="loading"/>
    <form v-else>
      <label for="uploadImage" class="block mb-4 relative cursor-pointer">
        <img
          :src="editUser.img === '' ? userImage : editUser.img"
          alt="user image"
          class="w-[140px] h-[140px] rounded-full"
        />
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
        <input
          type="email"
          v-model="editUser.email"
          placeholder="Email"
          class="bg-slate-800 px-2 py-1 rounded-md text-white border outline-none border-b-slate-200 w-full"
        />
      </label>
      <label for="" class="mb-4 bg-slate-800 px-2 py-1 rounded-md text-white border outline-none border-b-slate-200 w-full flex items-center justify-between">
        <input
          :type="passwordHidden ? 'text' : 'password'"
          v-model="editUser.password"
          placeholder="Name"
          class="bg-transparent outline-none border-none"
        />
        <button @click.prevent="passwordHidden = !passwordHidden">
          <eye-icon v-if="passwordHidden" class="w-4"/>
          <eye-slash-icon v-else else class="w-4" />
        </button>
      </label>

      <button class="bg-green-600 text-white border-none w-1/3 py-2 text-xl font-medium rounded-md" @click.prevent="userEdit">Edit</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/auth";
import userImage from "@/assets/images/user-image.jpg";
import {getImage} from '@/usable/uploadImage'
import {
  ChevronLeftIcon,
  PencilIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/vue/24/solid";

const store = useAuthStore();
const loading = ref(false);
const passwordHidden = ref(false)
const editUser = ref({
  name: "",
  email: "",
  password: "",
  img: "",
});


const userEdit = async () => {
    loading
   
}
onMounted(async () => {
  loading.value = true;
  await store.getUser();
  const { name, email, password, image }: any = store.user;
  editUser.value = {
    name: name,
    email: email,
    password: password,
    img: image,
  };
  loading.value = false
});

const uploadImage = () => {};
</script>
