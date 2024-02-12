<template>
  <div class="project-container">
    <a>
      <chevron-left-icon
        @click="router.back()"
        class="text-white w-10 font-medium mb-5 cursor-pointer"
      />
    </a>
    <form>
        <input v-model="message" type="text">
        <button click="addMessage">add</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router'
import {ref} from 'vue'
// import { database } from '@/firebase/config';
import { set, ref as dataRef, set, get, child, onValue, getDatabase } from 'firebase/database'
const router = useRouter()
const message = ref('')
const db = dataRef(getDatabase())

const addMessage = () => {
    
}
</script>
