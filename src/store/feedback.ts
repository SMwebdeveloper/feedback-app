import { defineStore } from "pinia";
import { doc, onSnapshot, deleteDoc} from 'firebase/firestore'
import {db} from '@/firebase/config'
import { getStore } from '@/composable/fireStore'
import {usableArr} from '@/composable/usable'
import { Feedback } from "@/types/feedback";
import { useAuthStore } from "./auth";
import {useRepo} from 'pinia-orm'
import { Feedbacks } from "@/models/feedbacks";
const feedbackRepo = useRepo(Feedbacks)

const store = useAuthStore()
export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      feedbacks: <any>[],
      myFeedbacks: <any>[],
      feedback: <Feedback>{}
    };
  },
  actions: {
    async getFeedbacks() {
      const { newArr }: any = await getStore('feedbacks')
      const { result } = usableArr(newArr.value)
      feedbackRepo.save(result)
      const data = feedbackRepo.query().get()
      this.feedbacks = data
    },
    async getSingleFeedback(payload: any) {
      await store.getUsers()
      const docRef = doc(db, "feedbacks", payload)
      await onSnapshot(docRef, (doc) => {
        const data = {...doc.data(), id:doc.id}
        const { myObj } = usableArr(data.userId)
        this.feedback = {...data, ...myObj}
      })
    },
    getMyFeedbacks() {
     const data = feedbackRepo.query().get()
      const feedbacks = data.filter((item) => {
       return item.userId === store.authToken
     })
      this.myFeedbacks = feedbacks
    },
    async deleteFeedback(payload: string) {
      const docRef = doc(db, 'feedbacks', payload)
      await deleteDoc(docRef).then(() => {
        console.log('Feedback deleted')
      }).catch(err =>  console.log(err))
    }
  },
});

