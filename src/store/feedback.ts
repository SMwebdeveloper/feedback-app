import { defineStore } from "pinia";
import { getStore } from '@/composable/fireStore'


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
