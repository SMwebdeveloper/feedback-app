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
      allChats: <object[]>[],
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
        Object.entries(snapshot.val()).map((item: any) => {
          const [id, value] = item
          if (value.users.includes(this.store.authToken)) {
            value.users = value.users.filter((item: any) => {
              return this.store.authToken !== item
            })
            const { result } = usableArr(value.users)
            const newResult = []
            let messagesCount: number = 0
            console.log(result)
            result.forEach((user: any) => {
              if (value.users.includes(user.id)) {
                value.messages.map((message: any) => {
                  if (!message.visible) {
                    messagesCount++
                  }
                })
              }
            })
            newResult.push({id:id, users:result, messages:value.messages, unreadMessage: messagesCount})
            return chatRepo.save(newResult)
          }
        })
        const data = chatRepo.query().get()
        this.allChats = data
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
