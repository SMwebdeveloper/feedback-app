<template>
    <div class="container mx-auto">
        <div>
            <img src="" alt="">

            <h3>Name</h3>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import {useAuthStore} from '@/store/auth'
import {onMounted } from 'vue';
import { onSnapshot, doc } from 'firebase/firestore';
import {db} from '@/firebase/config'
const store = useAuthStore()

const getUser = async () => {
    const docRef = await doc(db, 'users', store.authToken)
    await onSnapshot(docRef, (user) => {
    console.log(user)
   })
}
// const token = store.authToken
onMounted(async () => {
  await getUser()
})
</script>