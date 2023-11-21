<template>
  <div class="project-container">
    <router-link to="/profile">
      <chevron-left-icon class="text-white w-10 font-medium mb-7" />
    </router-link>
    <loader v-if="loading" />
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
      <!-- <label for="" class="block mb-4">
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
      </label> -->

      <button
        class="bg-green-600 text-white border-none w-1/3 py-2 text-xl font-medium rounded-md"
        @click.prevent="userEdit"
      >
        Edit
      </button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import userImage from "@/assets/images/user-image.jpg";
import { getImage } from "@/usable/uploadImage";
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
// const passwordHidden = ref(false)
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
  const { name, bio } = editUser.value;
  loading.value = true;
  const docRef = doc(db, "users", editUser.value.id);
  await updateDoc(docRef, {
    name: name,
    bio: bio,
    img: image.value,
  })
    .then((item) => {
      console.log(item);
      router.push('/profile')
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(async () => {
  loading.value = true;
  await store.getUser();
  const { name, id, bio }: any = store.user;
  editUser.value = {
    name: name,
    id: id,
    bio: bio,
  };
  loading.value = false;
});
</script>
