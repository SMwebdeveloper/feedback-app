import { defineStore } from "pinia";
import {
  set,
  get,
  getDatabase,
  child,
  ref,
  onChildAdded,
} from "firebase/database";
import { Chat } from "@/types/chat";
import { useRepo } from "pinia-orm";
import { Chats } from "@/models/chats";
import { useAuthStore } from "./auth";
import { usableArr } from "@/composable/usable";
import { generateRandomId } from "@/composable/generateId";

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
          const [id, value] = item;

          if (value.users.includes(this.store.authToken)) {
            value.users = value.users.filter((item: any) => {
              return this.store.authToken !== item;
            });

            const { result } = usableArr(value.users);
            const newResult = [];
            let newUser: any = {};
            let messagesCount: number = 0;

            result.map((user: any) => (newUser = user));

            result.forEach((user: any) => {
              if (value.users.includes(user.id)) {
                value.messages.map((message: any) => {
                  if (!message.visible) {
                    messagesCount++;
                  }
                });
              }
            });

            newResult.push({
              id: id,
              user: newUser,
              messages: value.messages,
              unreadMessage: messagesCount,
            });

            return chatRepo.save(newResult);
          }
        });
        const data = chatRepo.query().get();
        this.allChats = data;
      });
    },
    getSingleChat(key: any) {
      const data = chatRepo.query().get();
      let result: any = null

      data.forEach(element => {
        if (element.user.id === key) {
          result = element
        }
      });
      if (!result) {
        this.store.users.map((user: any) => {
          if (user.userId === key) {
            result = {
              id: user.userId,
              user: { id: user.userId, name: user.name, img: user.img },
              messages: [],
            };
          }
        });
      }
      return (this.chat = result);
    },
    setMessage(id: any, message: string) {
      this.allChats.forEach(async (user: any) => {
        if (user.user.id !== id) {
          const key = Math.floor(Math.random() * 1000);
          await set(ref(getDatabase(), "allChats/" + generateRandomId()), {
            users: [id, this.store.authToken],
            messages: [
              {
                id: key,
                message: message,
                userId: this.store.authToken,
                visible: false,
              },
            ],
          })
            .then(() => {
              console.log("done");
            })
            .catch((error): any => {
              console.log(error);
            });
        } else {
          const messageRef = ref(getDatabase(), "allChats/" + user.id);
          onChildAdded(messageRef, (data) => {
            console.log(data);
          });
        }
      });
    },
  },
});
