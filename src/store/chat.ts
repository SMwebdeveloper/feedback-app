import { defineStore } from "pinia";
import { set, get, getDatabase, child, ref } from "firebase/database";
import { Chat } from "@/types/chat";
import { useRepo } from "pinia-orm";
import { Chats } from "@/models/chats";
import { useAuthStore } from "./auth";
import { usableArr } from "@/composable/usable";
import { generateRandomId } from "@/composable/generateId";

// const db = getDatabase();
const chatRepo = useRepo(Chats);
export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      allChats: <Chat[]>[],
      chat: <Chat>{},
      store: useAuthStore(),
    };
  },
  actions: {
    async getAllChats() {
      const db = ref(getDatabase());
      await get(child(db, "allChats")).then((snapshot: any) => {
        if (!snapshot.exists()) {
          console.log("Not found chats");
        }
        console.log(snapshot.val())
        const newResult  = Object.entries(snapshot.val()).map((item: any) => {
          const [id, value] = item
          if (value.users.includes(this.store.authToken)) {
            const { result } = usableArr(value.users)
            return { id:id, users:result, messages:value.messages }
          }
        })
        console.log(newResult)
      });
    },
    async setChat(id: any, message: string) {
      const key = Math.floor(Math.random() * 1000);
      await set(ref(getDatabase(), "allChats/" + generateRandomId()), {
        users: [id, this.store.authToken],
        messages: [{ id: key, message: message, visible: false }],
      })
        .then(() => {
          console.log("done");
        })
        .catch((error): any => {
          console.log(error);
        });
    },
    async addMessage() {},
  },
});
