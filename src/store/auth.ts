import { defineStore } from "pinia";
import { User } from "@/types/user";
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/config";

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
      try {
        const docRef = await addDoc(collection(db, "users"), {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          password: user.password,
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async logOut() {
      await signOut(auth)
        .then(() => console.log("log out"))
        .catch((e) => console.log(e.message));
    },
  },
});
