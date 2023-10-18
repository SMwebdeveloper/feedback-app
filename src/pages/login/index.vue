<template>
  <section
    class="bg-slate-800 w-full h-screen flex flex-col items-center justify-center"
  >
    <h2 class="text-3xl text-white font-semibold mb-5">Log In</h2>
    <form
      @submit.prevent="handleClick"
      class="flex flex-col gap-y-3 bg-white px-5 py-7 shadow-sm rounded-md shadow-white"
    >
      <label class="flex flex-col w-[300px] text-xl text-slate-800 font-bold">
        Email
        <input
          type="email"
          v-model="user.email"
          class="bg-slate-200 mt-3 text-sm py-2 px-4 outline-none rounded-lg shadow-sm border border-solid"
          :class="`${errMessage.email ? 'border-red-500' : 'border-slate-200'}`"
        />
        <span v-if="errMessage.email" class="text-sm font-bold text-red-500">{{
          errMessage.emailMessage
        }}</span>
      </label>
      <label class="flex flex-col w-[300px] text-xl text-slate-800 font-bold">
        Name
        <input
          type="text"
          v-model="user.name"
          class="bg-slate-200 mt-3 text-sm py-2 px-4 outline-none rounded-lg shadow-sm border border-solid"
          :class="`${errMessage.name ? 'border-red-500' : 'border-slate-200'}`"
        />
        <span v-if="errMessage.name" class="text-sm font-bold text-red-500">{{
          errMessage.nameMessage
        }}</span>
      </label>
      <label class="flex flex-col w-[300px] text-xl text-slate-800 font-bold">
        Password
        <input
          type="password"
          v-model="user.password"
          class="bg-slate-200 mt-3 text-sm py-2 px-4 outline-none rounded-lg shadow-sm border border-solid"
          :class="`${
            errMessage.password ? 'border-red-500' : 'border-slate-200'
          }`"
        />
        <span
          v-if="errMessage.password"
          class="text-sm text-red-500 font-bold"
          >{{ errMessage.passwordMessage }}</span
        >
      </label>
      <button
        class="bg-sky-600 w-[100px] mx-auto px-6 py-2 rounded-lg text-white font-semibold duration-150 hover:bg-sky-800"
      >
        <span v-if="loading">
          <i class="fa fa-spinner fa-spin"></i>
        </span>
        <span v-else>Log In</span>
      </button>
      
    </form>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth as getAuth } from "@/firebase/config";
import { uuid } from "uuidv4";
import { useAuthStore } from "@/store/auth";
import { authUserValid } from "@/validations/auhtValid";
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();
const loading = ref(false);
const errMessage = ref({
  name: false,
  nameMessage: "",
  email: false,
  emailMessage: "",
  password: false,
  passwordMessage: "",
});

const user = ref({
  id: uuid(),
  email: "",
  name: "",
  password: "",
  image:
    "https://firebasestorage.googleapis.com/v0/b/portfolio-project-dc366.appspot.com/o/user-image.jpg?alt=media&token=1c6f67a4-9413-4ac3-946b-339850184748&_gl=1*lfd522*_ga*NjU3MzU0MjAuMTY5NjE3NDYxNQ..*_ga_CW55HF8NVT*MTY5NzI2Nzc3My4yMy4xLjE2OTcyNjg3MjMuMzEuMC4w",
});
const handleClick = async () => {
  const { email, name, password } = user.value;
  loading.value = true;
  await createUserWithEmailAndPassword(getAuth, email, password)
    .then(() => {
      loading.value = true;
      store.addUser(user.value);
      router.push("/");
    })
    .catch((error) => {
      errMessage.value = authUserValid({ error, user: user.value });
      console.log(error)
      if (name === "") {
        errMessage.value.name = true;
        errMessage.value.nameMessage = "Please enter your name!";
      }
      setTimeout(() => {
        errMessage.value.email = false;
        errMessage.value.name = false;
        errMessage.value.password = false;
      }, 3000);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
