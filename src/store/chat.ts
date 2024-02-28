import { defineStore } from "pinia";
import { set, getDatabase, ref, onChildAdded } from "firebase/database";
import { Chat } from "@/types/chat";
import { useRepo } from "pinia-orm";
import { Chats } from "@/models/chats";
import { useAuthStore } from "./auth";
import { usableArr } from "@/composable/usable";
import { addStore, getStore } from "@/composable/fireStore";
import { generateRandomId } from "@/composable/generateId";
import { formatDate, formatTime } from "@/composable/getDate";

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

      const db = ref(getDatabase(), "messages");
      const allMessages: any = [];
      await onChildAdded(db, (snapshot) => {
        allMessages.push({ id: snapshot.key, ...snapshot.val() });
      });

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
                if (!message.visible) {
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
        const startTime = new Date("2024-02-23T10:00:00");
        const endTime = new Date("2024-02-23T11:00:00");
        await onChildAdded(db, (snapshot) => {
          const data = snapshot.val();
          if (data.chat === result.id) {
            this.messages.push({ ...data, id: snapshot.key });
          }
        
        });
      }
      return (this.chat = result), this.messages;
    },
    // add message and create new chat
    async setMessage(id: any, message: string) {
      const data = chatRepo.query().get();
      const currentDate = new Date("2024-02-23T10:00:00");
      let existsUser = false;
      let userItem: any;

      data?.map((user: any) => {
        return user.user.id === id
          ? ((existsUser = true), (userItem = user))
          : (existsUser = false);
      });

      if (existsUser) {
        const newObj = {
          chat: userItem.id,
          userId: this.store.authToken,
          time: new Date().toJSON(),
          message: message,
          visible: false,
        };
        // console.log(newObj)
        await set(ref(getDatabase(), "messages/" + generateRandomId()), newObj);
      } else {
        const obj = {
          users: [id, this.store.authToken],
        };
        const { itemId }: any = await addStore(obj, "chats");
        await set(ref(getDatabase(), "messages/" + generateRandomId()), {
          chat: itemId.value,
          userId: this.store.authToken,
          time: new Date(),
          message: message,
          visible: false,
        }).then(async () => {
          await this.store.getUsers();
          await this.getAllChats();
          await this.getSingleChat(id);
        });
      }
    },
  },
});
