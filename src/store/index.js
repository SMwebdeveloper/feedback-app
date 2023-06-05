import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    feedbacks: [],
    feedback: {},
    filteredFeedbacks: [],
    comments: [],
    users: []
  },
  mutations: {
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
    deleteFeedback(state, feedback) {
      state.feedbacks.pop(feedback);
    },
    setFeedback(state, payload) {
      state.feedback = payload;
    },
    setFilteredFeedbacks(state, payload) {
      state.filteredFeedbacks = payload;
    },
    addUser(state, user) {
    state.users.push(user)
    }
  },
  actions: {
    async fetchFeedbacks({ commit }, contex) {
      const { data } = await axios.get(
        "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json"
      );
      const feedbacks = Object.entries(data).map((item) => {
        const [key, value] = item;
        return {
          ...value,
          feedbackId: key,
        };
      });

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
      const res = await axios.put(
        `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback.feedbackId}.json`,
        feedback
      );
      commit("setFeedback", res.data);
    },
    async deleteFeedback({ commit }, feedback) {
      const res = await axios.delete(
        `https://feedback-8e94b-default-rtdb.firebaseio.com/feedback/${feedback}.json`
      );
      console.log(res);
      commit("deleteFeedback", feedback);
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
      const feedbacks =
        payload === "All"
          ? state.feedbacks
          : state.feedbacks.filter((item) => item.type === payload);
      commit("setFilteredFeedbacks", feedbacks);
    },
    async addUser({commit}, user) {
      const {data} = await axios.post('https://feedback-8e94b-default-rtdb.firebaseio.com/users.json', user)
      console.log(data)
      commit('addUser', {...user, id:data.name} )
    }
  },
  getters: {
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
      return state.feedbacksFilter;
    },
  },
});
