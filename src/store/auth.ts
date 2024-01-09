import { defineStore } from "pinia";
import { useRepo } from "pinia-orm";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import { User } from "@/types/user";
import { addStore, getStore, updateStore } from "@/composable/fireStore";
import { Users } from "@/models/users";

const usersRepo = useRepo(Users);
export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: <User>{},
      users: <any>[],
      authToken: <string>"",
      followers: <any>[],
      following: <any>[],
    };
  },
  actions: {
    // add user
    addUser(payload: any) {
      addStore(payload, "users");
    },
    // get one user
    getSingleUser(key: string, type: string) {
      const data = usersRepo.query().get();
      data.forEach((item) => {
        switch (type) {
          case "id":
            if (item.id === key) {
              this.user = item;
            }
            break;
          case "userId":
            if (item.userId === key) {
              this.user = item;
            }
            break;
          default:
            return item;
        }
      });
    },
    // get all users
    async getUsers() {
      const { newArr } = await getStore("users");
      usersRepo.save(newArr.value);
      const data = usersRepo.query().get();
      this.users = data;
    },
    // log out
    async logOut() {
      localStorage.removeItem("token");
      await signOut(auth).then(() => console.log("Log Out"));
    },
    // get followers
    getFollowers(key: any) {
      const users: any = usersRepo.query().get();
      let followers: any;
      users?.forEach((user: any) => {
        if (user.id === key) {
          followers = user.followers;
        }
      });

      followers?.forEach((follow: any) => {
        users.forEach((user: any) => {
          if (user.userId === follow) {
            this.followers.push(user);
          }
        });
      });
    },
    //  get following users
    getFollowings(key: any) {
       this.users?.forEach((user: any) => {
          user.followers?.forEach((follow: any) => {
           if (follow === key) {
            this.following.push(user)
          }
        } )
     })
    },
    // add remove followers
   async addRemoveFollowers(key: string, type: boolean) {
     let followers: any = []
     const users = usersRepo.query().get()
      users?.forEach((user: any) => {
        if (user.id === key) {
          return (followers = user.followers);
          // console.log(user)
        }
      });
      if (type) {
        followers?.push(this.authToken)
      } else {
        followers = followers.filter((follower: any) => {
          return follower !== this.authToken
        })
        this.following = this.following.filter((follower: any) => {
          return follower.id !== this.authToken
        })
      }
     const updateArr = { followers: followers }
    //  console.log(followers)
     await updateStore(key, "users", updateArr)
    },
  },
});
