import { defineStore } from "pinia";
import {
  set,
  getDatabase,
  ref,
  onChildAdded,
} from "firebase/database";
import { Chat } from "@/types/chat";
import { useRepo } from "pinia-orm";
import { Chats } from "@/models/chats";
import { useAuthStore } from "./auth";
import { usableArr } from "@/composable/usable";
import { addStore, getStore } from "@/composable/fireStore";
import { generateRandomId } from "@/composable/generateId";
import { formattedDate } from "@/composable/getDate";
import * as moment from "moment";

const chatRepo = useRepo(Chats);
export const useChatStore = defineStore("chat", {
  state: () => {
    return {
      allChats: <object[]>[],
      chat: <Chat>{},
      messages: <object[]>[],
      store: useAuthStore(),
    };
  },
  actions: {
    // get all chats
    async getAllChats() {
      const { newArr }: any = await getStore("chats");
      let newResult: any = [];

      const db = ref(getDatabase(), 'messages') 
      const allMessages:any = []
      await onChildAdded(db, (snapshot) => {
        allMessages.push({id:snapshot.key, ...snapshot.val()})
      })

      newArr.value.forEach((item: any) => {
        if (item.users.includes(this.store.authToken)) {
          item.users = item.users.filter((user: string) => {
            return user !== this.store.authToken;
          });
          const { result } = usableArr(item.users);
          let newUser: object = {};
          let countMessage: number = 0;
          allMessages.forEach((message: any) => {
            if (message.chat === item.id) {
              if (message.userId !== this.store.authToken) {
                if (message.visible === false) {
                  countMessage++;
                }
              }
            }
          });
          result.map((user: object) => (newUser = user));
          newResult.push({
            id: item.id,
            user: newUser,
            unreadMessage: countMessage,
          });
        }
      });
      chatRepo.save(newResult);
      const data = chatRepo.query().get();
      this.allChats = data;
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
            };
          }
        });
      } else {
        const db = ref(getDatabase(), "messages/");
        const messages:any = []
        await onChildAdded(db, (snapshot) => {
          if (snapshot.val().chat === result.id) {
            messages.push({...snapshot.val(), id:snapshot.key})
          }
          this.messages = messages
        })
      }
      return (this.chat = result), this.messages;
    },
    // add message and create new chat
    async setMessage(id: any, message: string) {
      const data = chatRepo.query().get();
      let existsUser = false;
      let userItem: any;

      data?.map((user: any) => {
        return user.user.id === id
          ? ((existsUser = true), (userItem = user))
          : (existsUser = false);
      });

      if (existsUser) {
        await set(ref(getDatabase(), "messages/" + generateRandomId()), {
          chat: userItem.id,
          userId: this.store.authToken,
          message: message,
          visible: false,
          time: moment().hour(),
          date: moment().dayOfYear()
        });
      } else {
        const obj = {
          users: [id, this.store.authToken],
        };
        const { itemId }: any = await addStore(obj, "chats");
        await set(ref(getDatabase(), "messages/" + generateRandomId()), {
          chat: itemId.value,
          userId: this.store.authToken,
          message: message,
          visible: false,
        });
      }
    },
  },
});
