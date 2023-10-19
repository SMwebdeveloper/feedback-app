<template>
  <section
    class="bg-slate-800 w-full h-screen flex flex-col items-center justify-center"
  >
    <h2 class="text-3xl text-white font-semibold mb-5">Sing In</h2>
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
        <span v-else>Sing In</span>
      </button>
      <router-link
        to="/login"
        class="text-base font-bold text-slate-600 mx-auto duration-200 hover:text-slate-900 underline"
        >Log in</router-link
      >
    </form>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth as getAuth } from "@/firebase/config";
import { authUserValid } from "@/validations/auhtValid";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const errMessage = ref({
  email: false,
  emailMessage: "",
  password: false,
  passwordMessage: "",
});

const user = ref({
  email: "",
  password: "",
});
const handleClick = async () => {
  const { email, password } = user.value;
  loading.value = true;
  await signInWithEmailAndPassword(getAuth, email, password)
    .then((item) => {
      loading.value = true;
      localStorage.setItem("authToken", item.user.uid);
      router.push("/");
    })
    .catch((error) => {
      errMessage.value = authUserValid({ error, user: user.value });
      console.log(error);
      setTimeout(() => {
        errMessage.value.email = false;
        errMessage.value.password = false;
      }, 3000);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
