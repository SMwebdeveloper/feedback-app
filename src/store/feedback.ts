import { defineStore } from "pinia";
import { doc, onSnapshot} from 'firebase/firestore'
import {db} from '@/firebase/config'
import { getStore } from '@/composable/fireStore'
import { Feedback } from "@/types/feedback";
import { useAuthStore } from "./auth";


const store = useAuthStore()
export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      feedbacks: <any>[],
      feedback: <Feedback>{}
    };
  },
  actions: {
    async getFeedbacks() {
      const { newArr }: any = await getStore('feedbacks')
      const data:any = []
      newArr.value.forEach((item: any) => {
        store.users.forEach((user:any) => {
          if (item.userId === user.userId) {
            data.push({...item, author: {name: user.name, img:user.img}})
          } else {
            console.log()
          }
        })
      })
     console.log(data)

      this.feedbacks =  data
    },
    async getSingleFeedback(payload: any) {
      await store.getUsers()
      const docRef = doc(db, "feedbacks", payload)
      await onSnapshot(docRef, (doc) => {
        const data = {...doc.data(), id:doc.id}

        store.users.forEach((user:any) => {
          if (data.userId === user.userId) {
            this.feedback = {...data, author: {name: user.name, img: user.img}}
          } else {
            console.log(2)
          }
        })
      })
    }
  },
});


// function feedbacks(payload: string | object[]) {
//   const data: any = []
  

//   return data
// }