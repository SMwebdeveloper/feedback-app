import { defineStore } from "pinia";
import { User } from "@/types/user";
// import {createUserWithEmailAndPassword,} from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: <User>{},
      users: [],
      authToken: null,
    };
  },
  actions: {
    async addUser(user: any) {
    console.log(user)
      const docRef = await addDoc(collection(db, "users"), {
        
      }).then(e => {
        console.log(e, docRef)
      }).catch(error => console.log(error.message))
    },
  },
});
