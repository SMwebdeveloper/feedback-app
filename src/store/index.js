import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import {auth} from "@/firebase/config"
import {createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    feedbacks: [],
    feedback: {},
    filteredFeedbacks: [],
    comments: [],
    user:null
  },
  mutations: {
    setFeedbacks(state, feedbacks) {
      state.feedbacks = feedbacks;
      console.log(state.feedbacks)
    },
    // addFeedback(state, feedback) {
    //   state.feedbacks.push(feedback);
    // },
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
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchFeedbacks({ commit }) {
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
      // commit("addFeedback", feedback);
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

      const email = user.email
      const password = user.password
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res.user)
      const newUser = {...user, uid:res.user.uid}

      const {data} = await axios.post('https://feedback-8e94b-default-rtdb.firebaseio.com/users.json', newUser)
      commit('addUser',{...data, uid:res.user.uid})
    },

    async fetchUsers({commit}){
      const {data} = await axios.get('https://feedback-8e94b-default-rtdb.firebaseio.com/users.json')

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
    getUser(state){
      return state.user
    }
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  console.log("this user",user)
  store.commit('setUser', user)
  unsub()
})