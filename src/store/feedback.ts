import { defineStore } from "pinia";
// import { collection } from "firebase/firestore";
// import { db } from "@/firebase/config";
import {getStore} from '@/composable/fireStore'
// const colRef = collection(db, "feedbacks");
export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      feedbacks: <any>[],
    };
  },
  actions: {
    async getFeedbacks() {
      const {newArr}:any = await getStore('feedbacks')
      this.feedbacks = await newArr.value
    },
    
  },
});
