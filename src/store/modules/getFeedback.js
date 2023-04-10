import axios from "axios";

const state = {
  feedbacks: [],
  feedback : {}
};

const mutations = {
  setFeedbacks(state, feedbacks) {
    console.log(feedbacks);
    state.feedbacks = feedbacks;
  },
  addFeedback(state, feedback) {
    state.feedbacks.unshift(feedback);
  },
  editFeedback(state, feedbackEdit) {
    const feedbackIndex = state.feedbacks.findIndex((feedback) => {
      feedback.id = feedbackEdit.id;
    });
    state.feedbacks[feedbackIndex] = feedbackEdit;
  },
  setFeedback(state, payload){
    state.feedback = payload
  }
};
const actions = {
  async fetchFeedbacks({ commit }, contex) {
    const { data } = await axios.get(
      "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json"
    );
    let feedbacks = [];
    for (let key in data) {
      feedbacks.unshift({ ...data[key]});
    }
    commit("setFeedbacks", feedbacks);
  },
  async addFeedback({ commit }, feedback) {
    const res = await axios.post(
      "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json",
      feedback
    );
    commit("addFeedback", feedback );
  },
  async editFeedback({ commit }, feedback) {
    const res = await axios.put(
      `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback.id}.json`, 
      feedback
    );
    commit("editFeedback", res);
  },
  async fetchFeedback({ commit, state },id) {
    state.feedbacks.forEach(item => {
      if( item.id === id) {
        commit('setFeedback', item);
      }
    })
  },
};

const getters = {
  getFeedbacks(state) {
    return state.feedbacks;
  },
  getFeedbacksLength(state) {
    return state.feedbacks.length;
  },
  getFeedback(state){
    return state.feedback
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
