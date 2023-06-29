import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged, signOut
} from "firebase/auth";
import {getDatabase, ref, get, child, set, push} from 'firebase/database'
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    feedbacks: [],
    feedback: {},
    filteredFeedbacks: [],
    comments: [],
    user: null,
  },
  mutations: {
    setFeedbacks(state, feedbacks) {
      console.log(feedbacks)
      state.feedbacks = feedbacks;
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
      state.user = user;
    },
  },
  actions: {
    async fetchFeedbacks({ commit }) {
      // const { data } = await axios.get(
      //   "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json"
      // );
      // const feedbacks = Object.entries(data).map((item) => {
      //   const [key, value] = item;
      //   return {
      //     ...value,
      //     feedbackId: key,
      //   };
      // });
      const db = ref(getDatabase())
      get(child(db, 'feedbacks')).then((snapshot) => {
        if(snapshot.exists()) {
          const feedbacks = Object.entries(snapshot.val()).map(item => {
            // console.log(item)
            const [key, value] = item
            return {
              ...value, feedbackId: key
            }
          })
          // console.log(feedbacks)
          commit("setFeedbacks", feedbacks);
        } else {
          console.log("No data available")
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    async addFeedback({ commit }, feedback) {
      // const res = await axios.post(
      //   "https://feedback-8e94b-default-rtdb.firebaseio.com/feedback.json",
      //   feedback
      // );
      const db = getDatabase()

      const feedbacksList = ref(db, 'feedbacks')
      const newFeedback = push(feedbacksList)

      set(newFeedback, {...feedback})
      console.log(feedback)
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
    async addUser({ commit }, user) {
      const email = user.email;
      const password = user.password;
      const currentUser = auth.currentUser;
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(() => {
        this.dispatch("unsebes");
        console.log(currentUser)
      });
    },
    async logOut({ commit }) {
      await signOut(auth)
        .then(() => commit("setUser", null))
    },
    unsubes() {
      unsub()
    },
  },
  getters: {
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
      return state.feedbacksFilter;
    },
    getUser(state) {
      return state.user;
    },
    getAuthIsReady(state) {
      return state.authIsReady;
    },
  },
});

function unsub() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.commit("setUser", user);
    }
  });
}
unsub();
