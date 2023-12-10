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
      const {newArr}:any = await getStore('feedbacks')
      this.feedbacks =  newArr.value
    },
    async getSingleFeedback(payload: any) {
      const docRef = doc(db, "feedbacks", payload)
      await onSnapshot(docRef, (doc) => {
        this.feedback = {...doc.data(), id:doc.id}
      })
    }
  },
});
