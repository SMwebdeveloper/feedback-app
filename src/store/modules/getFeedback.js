import axios from "axios";

const state = {
  feedbacks: [],
  feedback : {}
};

const mutations = {
  setFeedbacks(state, feedbacks) {
    state.feedbacks = feedbacks;
  },
  addFeedback(state, feedback) {
    state.feedbacks.push(feedback);
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
      feedbacks.unshift({ ...data[key], id: key });
    }
    commit("setFeedbacks", feedbacks);
  },
  async addFeedback({ commit }, feedback) {
    const res = await axios.post(
      "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json",
      feedback
    );
    commit("addFeedback", { ...feedback, id: res.data.name });
  },
  async editFeedback({ commit }, feedback) {
    const res = await axios.put(
      `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback.id}.json`,
      feedback
    );
    commit("editFeedback", res);
  },
  async fetchFeedback({ commit }, feedback) {
    const res = await axios.get(
      `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback}.json`
    );
    console.log(res.data);
    commit('setFeedback', res.data);
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
