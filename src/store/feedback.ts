import { defineStore } from "pinia";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { getStore } from "@/composable/fireStore";
import { usableArr } from "@/composable/usable";
import { Feedback } from "@/types/feedback";
import { useAuthStore } from "./auth";
import { useRepo } from "pinia-orm";
import { Feedbacks } from "@/models/feedbacks";
import { Users } from "@/models/users";

const feedbackRepo = useRepo(Feedbacks);
const userRepo = useRepo(Users)
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
    async addSaveFeedbacks(key:string) {
      const save = this.store.user.saveFeedbacks
      save.push(key)
      const docRef = doc(db, 'users', this.store.user.id)
      await updateDoc(docRef, {
        saveFeedbacks: save
      }).then(() => {
        console.log('Done')
      }).catch((error) => {
        console.log(error)
      })
    },
    async removeSaveFeedbacks(key:string) {
       let save = this.store.user.saveFeedbacks
       save = save.filter((item) =>  item !== key)
      console.log(save)
      const docRef = doc(db, "users", this.store.user.id)
      await updateDoc(docRef, {
        saveFeedbacks: save
      }).then(async() => {
        await this.store.getUsers()
        await this.store.getSingleUser()
        console.log('done')
      }).catch((error) => {
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
  },
});
