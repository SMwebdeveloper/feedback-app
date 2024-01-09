import { defineStore } from "pinia";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getStore, deleteStore, updateStore } from "@/composable/fireStore";
import { usableArr } from "@/composable/usable";
import { Feedback } from "@/types/feedback";
import { useAuthStore } from "./auth";
import { useCommentStore } from "./comment";
import { useRepo } from "pinia-orm";
import { Feedbacks } from "@/models/feedbacks";
import { Comments } from "@/models/comments"

const feedbackRepo = useRepo(Feedbacks);
const commentRepo = useRepo(Comments)
export const useFeedbackStore = defineStore("feedback", {
  state: () => {
    return {
      store: useAuthStore(),
      commentStore: useCommentStore(),
      feedbacks: <Feedback[]>[],
      userFeedbacks: <Feedback[]>[],
      feedback: <Feedback>{},
      saveFeedbacks: <Feedback[]>[],
    };
  },
  actions: {
    // get feedbacks
    async getFeedbacks() {
      const { newArr }: any = await getStore("feedbacks");
      const { result } = usableArr(newArr.value);
      // await this.commentStore.getComments('__', 'all')
      // // const commentData = commentRepo.query().get()
      // // const newData: any = []
      // // const commentLength:any = []
      // // result.forEach((item: any) => {
        
        
      // // })
      feedbackRepo.save(result);
      const data = feedbackRepo.query().get();
      // console.log(data)
      this.feedbacks = data;
    },
    // get single feedbacks
    async getSingleFeedback(payload: any) {
      const docRef = doc(db, "feedbacks", payload);
      await onSnapshot(docRef, (doc) => {
        const data = { ...doc.data(), id: doc.id };
        const { myObj } = usableArr(data.userId);
        this.feedback = { ...data, ...myObj };
      });
    },
    // get save feedbacks
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
    // add and remove feedbacks
    async toggleSaveFeedbacks(key: string, type: boolean) {
      const id:any = this.store.user.id
      if (type) {
       this.store.user.saveFeedbacks.push(key)
      } else {
        this.store.user.saveFeedbacks = this.store.user.saveFeedbacks.filter(
          (item: any) => item !== key
        );
        this.saveFeedbacks = this.saveFeedbacks.filter((item: any) => {
          return item.id !== key;
        });      }
      
      const updateArr = {saveFeedbacks: this.store.user.saveFeedbacks}
      await updateStore(id, "users", updateArr)
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // add and remove likes feedbacks
    async toggleLikesFeedbacks(key: string, type: boolean) {
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
      const updateArr = {
        likes: likes,
      };
      await updateStore(key, "feedbacks", updateArr)
        .then(async () => {
          await this.getFeedbacks();
          await this.getUserFeedbacks(this.store.authToken);
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    // get user feedbacks
    getUserFeedbacks(key: string) {
      const data = feedbackRepo.query().get();
      const feedbacks = data.filter((item) => {
        return item.userId === key;
      });
      this.userFeedbacks = feedbacks;
    },
    // delete feedbacks
    async deleteFeedbacks(key: string) {
      await deleteStore(key, "feedbacks");
      this.userFeedbacks = this.userFeedbacks.filter((item) => item.id !== key);
    },
  },
});
