import { defineStore } from "pinia";
import {useRepo} from 'pinia-orm'
import { Users} from '@/models/users'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase/config";
import {signOut} from 'firebase/auth'

const userRepo = useRepo(Users)
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      users: <any> [],
      authToken: localStorage.getItem('token'),
    };
  },
  actions: {
    async addUser(user: any) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          id: user.id,
          userId:user.userId,
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
    async getUser() {
      console.log(2)
      const colRef = collection(db, "users")
      const querySnapshot = await getDocs(colRef)
      const firstArr: any[] = []
      querySnapshot.forEach(item => {
        firstArr.push(item.data())
      })
      userRepo.save(firstArr)
      const data = userRepo.query().get()
      console.log(data)
      this.users = data
    },
    async logOut() {
       localStorage.clear()
       await signOut(auth).then(() => console.log('Log Out'))
    },
  },
});
