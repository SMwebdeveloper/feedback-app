import { defineStore } from "pinia";
import { getStore } from "@/composable/fireStore";
import {usableArr} from '@/composable/usable'

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: <object>[],
    };
  },
  actions: {
    async getComments(payload: any) {
      const { newArr } = await getStore("comments");
      const {result} = usableArr(newArr.value)
      this.comments = result.filter((comment: object) => {
        return comment.feedbackId === payload;
      });
    },
  },
});
