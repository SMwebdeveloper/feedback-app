import { defineStore } from "pinia";
// import {useRepo} from 'pinia-orm'
import { collection, onSnapshot, query, where} from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { User } from "@/types/user";
import { addStore } from "@/composable/fireStore";
// import { Users } from "@/models/users";


// const usersRepo = useRepo(Users)
const colRef = collection(db, "users");

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: <User>{},
      users: <any>[],
      authToken: localStorage.getItem("token"),
    };
  },
  actions: {
    addUser(payload: any) {
      addStore(payload, "users");
    },
    async getSingleUser() {
      const q= query(colRef, where('userId', '==', this.authToken))
      await onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
          this.user = {...doc.data(), id:doc.id}
        }) 
      })
    },
    async getUsers() {
      // const colRef = collection(db, "users");
      await onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const user = { ...doc.data(), id: doc.id }
          this.users.push(user);
        });
      });
      // usersRepo.save(this.users)
    },
    async logOut() {
      localStorage.removeItem("token");
      await signOut(auth).then(() => console.log("Log Out"));
    },
  },
});
