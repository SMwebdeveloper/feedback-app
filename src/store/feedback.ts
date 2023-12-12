import { defineStore } from "pinia";
import { doc, onSnapshot} from 'firebase/firestore'
import {db} from '@/firebase/config'
import { getStore } from '@/composable/fireStore'
import {usableArr} from '@/composable/usable'
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
      const {result} =  usableArr(newArr.value)
      this.feedbacks = result 
    },
    async getSingleFeedback(payload: any) {
      await store.getUsers()
      const docRef = doc(db, "feedbacks", payload)
      await onSnapshot(docRef, (doc) => {
        const data = {...doc.data(), id:doc.id}
        const { myObj } = usableArr(data.userId)
        this.feedback = {...data, ...myObj}
      })
    }
  },
});

