import { defineStore } from "pinia";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import {User} from '@/types/user'
import { addStore, getStore } from "@/usable/fireStore";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user:<User>{},
      feedbacks: <any>[],
      authToken: localStorage.getItem("token"),
    };
  },
  actions: {
    addUser(payload: any) {
      addStore(payload, "followers");
    },
    async getUser() {
      const colRef = collection(db, "users");
      // const q = query(colRef, where("userId", "==", this.authToken));
      await onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log(doc.data());
          if (doc.data().userId === this.authToken) {
            this.user =  { ...doc.data(), id: doc.id }
          }
        });
   
      })
    },
    async getFeedbacks() {
      const colRef = collection(db, "feedbacks");
      await onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.feedbacks.push({ ...doc.data(), id: doc.id });
        });
      });
    },
    async logOut() {
      localStorage.removeItem("token");
      await signOut(auth).then(() => console.log("Log Out"));
    },
  },
});
