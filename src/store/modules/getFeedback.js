import axios from "axios";

const state = {
  feedbacks: [],
  feedback: {},
  filteredFeedbacks: []
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
  setFilteredFeedbacks (state, payload) {
    state.filteredFeedbacks = payload
  }
};
const actions = {
  async fetchFeedbacks({ commit }, contex) {
    const { data } = await axios.get(
      "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json"
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
      "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json",
      feedback
    );
    commit("addFeedback", feedback);
  },
  async editFeedback({ commit }, feedback) {
    console.log(feedback);
    const res = await axios.put(
      `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback.feedbackId}.json`,
      feedback
    );
    commit("setFeedback", res.data);
  },
  async fetchFeedback({ commit }, feedback) {
    const res = await axios.get(
      `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback}.json`
    );
    commit("setFeedback", {
      ...res.data,
      feedbackId: feedback,
    });
  },
  filterFeedbacks({ commit, state }, payload) {
    const feedbacks = payload === 'All' ? state.feedbacks : state.feedbacks.filter(item => item.type === payload)
    console.log(feedbacks)
    commit('setFilteredFeedbacks', feedbacks)
  }
};

const getters = {
  getFeedbacks(state) {
    return state.filteredFeedbacks;
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
