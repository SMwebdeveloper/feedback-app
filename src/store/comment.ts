import { defineStore } from "pinia";
import { useRepo } from "pinia-orm";
import { Comments } from "@/models/comments";
import { Comment } from "@/types/comment";
import { getStore } from "@/composable/fireStore";
import {usableArr} from '@/composable/usable'

const commentsRepo = useRepo(Comments)
export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      comments: <Comment[]>[],
    };
  },
  actions: {
    async getComments(payload: any, type:string) {
      const { newArr } = await getStore("comments");
      const { result } = usableArr(newArr.value)
      commentsRepo.save(result)
      const data = commentsRepo.query().get()
      this.comments = data.filter((comment: object) => {
        if (type === 'userId') {
          return comment.userId === payload
        } else {
          return comment.feedbackId === payload
        }
      });
    },
  },
});
