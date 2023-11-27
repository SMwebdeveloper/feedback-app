import { defineStore } from "pinia";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

const colRef = collection(db, "feedbacks");
export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      feedbacks: <any>[],
    };
  },
  actions: {
    async getFeedbacks() {
      await onSnapshot(colRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.feedbacks.push({ ...doc.data(), id: doc.id });
        });
      });
    },
  },
});
