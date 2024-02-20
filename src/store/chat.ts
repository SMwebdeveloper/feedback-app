import { defineStore } from "pinia";
import { set, get, getDatabase, child, ref, update, onValue, onChildAdded } from "firebase/database";
import { database } from "@/firebase/config";
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
    // get all chats
    async getAllChats() {
      const db = ref(getDatabase());
      await get(child(db, "allChats")).then((snapshot: any) => {
        if (!snapshot.exists()) {
          console.log("Not found chats");
        } else {
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
        }

        const data = chatRepo.query().get();
        this.allChats = data;
      });
    },
    // get single chat
    async getSingleChat(key: any) {
      const data = chatRepo.query().get();
      let result: any = null;

      data.forEach((element) => {
        if (element.user.id === key) {
          result = element;
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
    // add message and create new chat
    async setMessage(id: any, message: string) {
      const data = chatRepo.query().get();
      const key = Math.floor(Math.random() * 1000);
      let existsUser = false;
      let userItem: any;
      data?.map((user: any) => {
        return user.user.id === id
          ? ((existsUser = true), (userItem = user))
          : (existsUser = false);
      });
      
      console.log(existsUser)
      if (existsUser) {
        const messageRef = ref(database, "allChats/" + userItem.id);
        userItem.messages.push({
          id: key,
          message: message,
          userId: this.store.authToken,
          visible: false,
        });
        await update(messageRef, userItem)
          .then(async () => {
            console.log("update");
            // await this.store.getUsers();
            // await this.getAllChats();
            // await this.getSingleChat(id);
          })
          .catch((e) => console.log(e.message));
      } else {
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
          .then(async () => {
            await this.store.getUsers();
            await this.getAllChats();
            await this.getSingleChat(id);
            console.log("done");
          })
          .catch((error): any => {
            console.log(error);
          });
      }
    },
  },
});
