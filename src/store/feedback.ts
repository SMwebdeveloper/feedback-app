import { defineStore } from "pinia";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getStore } from "@/composable/fireStore";
import { usableArr } from "@/composable/usable";
import { Feedback } from "@/types/feedback";
import { useAuthStore } from "./auth";
import { useRepo } from "pinia-orm";
import { Feedbacks } from "@/models/feedbacks";
const feedbackRepo = useRepo(Feedbacks);

export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      store: useAuthStore(),
      feedbacks: <Feedback[]>[],
      myFeedbacks: <Feedback[]>[],
      feedback: <Feedback>{},
      saveFeedbacks: <Feedback[]>[],
    };
  },
  actions: {
    async getFeedbacks() {
      const { newArr }: any = await getStore("feedbacks");
      const { result } = usableArr(newArr.value);
      feedbackRepo.save(result);
      const data = feedbackRepo.query().get();
      this.feedbacks = data;
    },
    async getSingleFeedback(payload: any) {
      await this.store.getUsers();
      const docRef = doc(db, "feedbacks", payload);
      await onSnapshot(docRef, (doc) => {
        const data = { ...doc.data(), id: doc.id };
        const { myObj } = usableArr(data.userId);
        this.feedback = { ...data, ...myObj };
      });
    },
    async getSaveFeedback() {
      this.saveFeedbacks = this.store.user.saveFeedbacks
    },
    async toggleSaveFeedback(key:string, type: boolean) {
      let saved = this.store.user.saveFeedbacks
      const feedbackRef = doc(db, 'users', this.store.user.id)
      if (type) {
        saved.push(key)
        console.log(saved)
      } else {
        saved = saved.filter((item) => {
          return item !== key
        })
              }
      await updateDoc(feedbackRef, {
        saveFeedbacks: saved
     })
    },
    getMyFeedbacks() {
      const data = feedbackRepo.query().get();
      const feedbacks = data.filter((item) => {
        return item.userId === this.store.authToken;
      });
      this.myFeedbacks = feedbacks;
    },
  },
});
