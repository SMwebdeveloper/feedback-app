import axios from 'axios'

const state ={
  feedbacks:[]
}

const mutations = {
    setFeedbacks(state, feedbacks){
      state.feedbacks = feedbacks
    },
    addFeedback(state, feedback){
      console.log(feedback);
      state.feedbacks.push(feedback)
    }
}

const actions ={
    async fetchFeedbacks({ commit }, contex) {
      const { data } = await axios.get(
          "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json"
        ) 
      let feedbacks = []
      for(let key in data){
        feedbacks.unshift({...data[key], id:key})
      }
      console.log(feedbacks);
      commit("setFeedbacks", feedbacks);

    },
    async addFeedback({commit}, feedback){
      const res = await axios.post('https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json', feedback)
      commit('addFeedback', {...feedback, id:res.data.name})
    }
}

const getters = {
    getFeedbacks(state){
        return state.feedbacks
    },
    getFeedbacksLength(state){
      return state.feedbacks.length
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}
