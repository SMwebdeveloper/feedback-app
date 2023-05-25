import Vue from "vue";
import Vuex from "vuex";
import getFeedback from "@/store/modules/getFeedback.js";
import getFeedbackSecond from "@/store/modules/getFeedbackSecond.js"
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    getFeedback,
  },
});
