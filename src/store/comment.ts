import { defineStore } from "pinia";
import { getStore } from "@/composable/fireStore";
import {usableArr} from '@/composable/usable'

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: <any>[],
    };
  },
  actions: {
    async getComments(payload: any, type:string) {
      const { newArr } = await getStore("comments");
      const {result} = usableArr(newArr.value)
      this.comments = result.filter((comment: object) => {
        if (type === 'userId') {
          return comment.userId === payload
        } else {
          return comment.feedbackId === payload
        }
      });
    },
  },
});
