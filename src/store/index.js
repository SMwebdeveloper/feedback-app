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
    image: null,
    user: null,
  },
  mutations: {
    setFeedbacks(state, feedbacks) {
      console.log(feedbacks)
      state.feedbacks = feedbacks;
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
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchFeedbacks({ commit }) {
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
          commit("setFeedbacks", feedbacks);
        } else {
          console.log("No data available")
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    async addFeedback({ commit, state }, feedback) {
      const db = getDatabase()

      const feedbacksList = ref(db, 'feedbacks')
      const newFeedback = push(feedbacksList)

      console.log(state.image)

      set(newFeedback, {...feedback, img:state.image })
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
      console.log(currentUser)
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then(() => {
        this.dispatch("unsebes");
      });
      console.log(res)
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
    getImage(state) {
      return state.image
    }
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
