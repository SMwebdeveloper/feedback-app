import { defineStore } from "pinia";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getStore, deleteStore } from "@/composable/fireStore";
import { usableArr } from "@/composable/usable";
import { Feedback } from "@/types/feedback";
import { useAuthStore } from "./auth";
import { useRepo } from "pinia-orm";
import { Feedbacks } from "@/models/feedbacks";
import { Users } from "@/models/users";

const feedbackRepo = useRepo(Feedbacks);
const userRepo = useRepo(Users);
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
      const docRef = doc(db, "feedbacks", payload);
      await onSnapshot(docRef, (doc) => {
        const data = { ...doc.data(), id: doc.id };
        const { myObj } = usableArr(data.userId);
        this.feedback = { ...data, ...myObj };
      });
    },
    async getSaveFeedback() {
      const result: any = [];
      const data = feedbackRepo.query().get();
      const saved = this.store.user.saveFeedbacks;
      data.forEach((feedback: any) => {
        saved.forEach((save: any) => {
          if (feedback.id === save) {
            return result.push(feedback);
          }
        });
      });
      this.saveFeedbacks = result;
    },
    async addSaveFeedbacks(key: string) {
      const save = this.store.user.saveFeedbacks;
      save.push(key);
      const docRef = doc(db, "users", this.store.user.id);
      await updateDoc(docRef, {
        saveFeedbacks: save,
      })
        .then(() => {
          console.log("Done");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async removeSaveFeedbacks(key: string) {
      let save = this.store.user.saveFeedbacks;
      save = save.filter((item: any) => item !== key);
      this.saveFeedbacks = this.saveFeedbacks.filter((item: any) => {
        return item.id !== key
      })
      const docRef = doc(db, "users", this.store.user.id);
      await updateDoc(docRef, {
        saveFeedbacks: save,
      })
        .then(async () => {
          console.log("done");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async toggleLikesFeedbacks(key: string, type: boolean) {
      const docRef = doc(db, "feedbacks", key);
      let likes: any;
      this.feedbacks.forEach((item) => {
        if (item.id === key) {
          likes = item.likes;
        }
      });
      if (type) {
        likes.push(this.store.authToken);
      } else {
        likes = likes.filter((like: any) => like !== this.store.authToken);
      }
      await updateDoc(docRef, {
        likes: likes,
      }).then(async () => {
        await this.getFeedbacks()
        await this.getMyFeedbacks()
      }).catch((error:any) => {
        console.log(error)
      })
    },
    
    getMyFeedbacks() {
      const data = feedbackRepo.query().get();
      const feedbacks = data.filter((item) => {
        return item.userId === this.store.authToken;
      });
      this.myFeedbacks = feedbacks;
    },
    async deleteFeedbacks(key: string) {
      await deleteStore(key, 'feedbacks')
      this.myFeedbacks = this.myFeedbacks.filter((item) => item.id !== key)
     },
  },
});
