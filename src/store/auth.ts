import { defineStore } from "pinia";
import {useRepo} from 'pinia-orm'
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { User } from "@/types/user";
import { addStore, getStore } from "@/composable/fireStore";
import { Users } from "@/models/users";


const usersRepo = useRepo(Users)
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: <User>{},
      users: <any>[],
      authToken: '',
    };
  },
  actions: {
    addUser(payload: any) {
      addStore(payload, "users");
    },
    getSingleUser(key:string, type:string) {
      const data = usersRepo.query().get()
      data.forEach((item) => {
        switch (type) {
          case 'id':
            if (item.id === key) {
              this.user = item
            }
            break;
          case 'userId':
            if (item.userId === key) {
              this.user = item
            }
            break;
          default: 
            return item
        }
      })
    },
    async getUsers() {;
      const {newArr} = await getStore("users")
      usersRepo.save(newArr.value)
      const data = usersRepo.query().get()      
      this.users = data
      
    },
    async logOut() {
      localStorage.removeItem("token");
      await signOut(auth).then(() => console.log("Log Out"));
    },
    getFollowers() {},
    addRemoveFollowers() {},
  },
});
