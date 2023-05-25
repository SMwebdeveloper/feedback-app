import axios from "axios";

const state = {
  feedbacks: [],
  feedback: {},
  feedbacksFilter: []
};

const mutations = {
  setFeedbacks(state, feedbacks) {
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
  setFeedback(state, payload) {
    state.feedback = payload;
  },
};
const actions = {
  async fetchFeedbacks({ commit }, contex) {
    const { data } = await axios.get(
      "http://localhost:3000/feedback"
    );
    const feedbacks = Object.entries(data).map((item) => {
      const [key, value] = item
      return {
        ...value,
        feedbackId: key
      }
    })

    commit("setFeedbacks", feedbacks);
  },
  async addFeedback({ commit }, feedback) {
    const res = await axios.post(
      "http://localhost:3000/feedback",
      feedback
    );
    commit("addFeedback", feedback);
  },
  async editFeedback({ commit }, feedback) {
    console.log(feedback);
    const res = await axios.put(
      `http://localhost:3000/feedback/${feedback.feedbackId}`,
      feedback
    );
    commit("setFeedback", res.data);
  },
  async fetchFeedback({ commit }, feedback) {
    const res = await axios.get(
      `http://localhost:3000/feedback/${feedback}`
    );
    commit("setFeedback", {
      ...res.data,
      feedbackId: feedback,
    });
  },
};

const getters = {
  getFeedbacks(state) {
    return state.feedbacks;
  },
  getFeedbacksLength(state) {
    return state.feedbacks.length;
  },
  getFeedback(state) {
    return state.feedback;
  },
  getFeedbacksFilter(state) {
    return state.feedbacksFilter
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
