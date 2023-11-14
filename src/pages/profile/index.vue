<template>
  <div class="container mx-auto">
    <div>
      <img src="" alt="" />

      <h3>Name</h3>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { onMounted, ref } from "vue";
const store = useAuthStore();
const loading = ref(false);
const userProfile: any = ref({});

onMounted( async() => {
    loading.value = true;
  await store.getUser()
  store.users.forEach(item => {
    // if (item.userId == store.authToken) {
      //     userProfile.value = item
      //     console.log(userProfile.value)
      // } else {
        //     console.log('Upps')
        //   }
        console.log('this token',store.authToken)
    console.log(item)
     })


    loading.value = true;
});
</script>
