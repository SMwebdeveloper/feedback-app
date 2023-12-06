import { defineStore } from 'pinia'
import {addStore, getStore} from '@/composable/fireStore'

export const useCommentStore = defineStore('comment', {
    state: () => {
        return {
            comment: <object>[]
        }
    },
    actions: {
        addComments() {
 
        },
        getComments() {

        }
    }
})