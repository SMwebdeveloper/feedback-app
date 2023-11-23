import { defineStore } from "pinia";
// import { useRepo } from "pinia-orm";
// import { Users } from "@/models/users";
import { collection, addDoc, query, where, onSnapshot, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

// const userRepo = useRepo(Users);
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      users: <any>[],
      feedbacks: <any>[],
      authToken: localStorage.getItem("token"),
    };
  },
  actions: {
    fetchUser(payload: any) {
      this.user = payload
    },
    async addUser(user: any) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          userId: user.userId,
          name: user.name,
          email: user.email,
          bio: user.bio,
          img: user.img,
        });
        console.log(docRef);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async getUser() {
      const colRef = collection(db, "users");
      console.log(1)
      // const q = query(colRef, where("userId", "==", this.authToken))
      await onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          const user = doc.data()
          if (user.userId === this.authToken) {
           this.user = {...user, id:doc.id}
         }
       })
     })
       
    },
    async getFeedbacks() {
      const colRef = collection(db, 'feedbacks')
      await onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.feedbacks.push({...doc.data(), id: doc.id})
        })
      })
    },
    async logOut() {
      localStorage.removeItem("token");
      this.user = {}
      await signOut(auth).then(() => console.log("Log Out"));
    },
  },
});
