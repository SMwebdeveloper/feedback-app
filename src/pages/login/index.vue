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
          class="bg-slate-200 mt-3 text-sm py-2 px-4 outline-none rounded-lg shadow-sm"
        />
        <span v-if="errMessage.email"></span>
      </label>
      <label class="flex flex-col w-[300px] text-xl text-slate-800 font-bold">
        Name
        <input
          type="text"
          v-model="user.name"
          class="bg-slate-200 mt-3 text-sm py-2 px-4 outline-none rounded-lg shadow-sm"
        />
      </label>
      <label class="flex flex-col w-[300px] text-xl text-slate-800 font-bold">
        Password
        <input
          type="password"
          v-model="user.password"
          class="bg-slate-200 mt-3 text-sm py-2 px-4 outline-none rounded-lg shadow-sm"
        />
      </label>
      <button
        class="bg-sky-600 mx-auto px-6 py-2 rounded-lg text-white font-semibold duration-150 hover:bg-sky-800"
      >
        Log In
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth as getAuth } from "@/firebase/config";
import { v4 as uuid } from "uuid";
import { useAuthStore } from "@/store/auth";

const store = useAuthStore();

const errMessage = ref({
  name: false,
  email: false,
  password: false,
});

const user = ref({
  id: uuid(),
  email: "",
  name: "",
  password: "",
  image: "",
});
const handleClick = async () => {
  const { email, name, password } = user.value;
  if (email === "") {
    return errMessage.value.email = true
  }
  if ( name === "") {
    return errMessage.value.name = false
  }
  if (password === "") {
    return errMessage.value.password = false
  }
  if (email && name && password) {
    await createUserWithEmailAndPassword(getAuth, email, password)
      .then((e) => {
        store.addUser(user.value);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  
};
</script>
