import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './store'
import Vuelidate from 'vuelidate'
import './assets/scss/main.scss'
import { initializeApp } from "firebase/app";

Vue.config.productionTip = false
Vue.use(Vuelidate)

const firebaseConfig = {
  apiKey: "AIzaSyC60n8EfUjire9DbeoPUOD7RRZafL2TykQ",
  authDomain: "feedback-8e94b.firebaseapp.com",
  databaseURL: "https://feedback-8e94b-default-rtdb.firebaseio.com",
  projectId: "feedback-8e94b",
  storageBucket: "feedback-8e94b.appspot.com",
  messagingSenderId: "610695347689",
  appId: "1:610695347689:web:d9ceee562f8420100c9f78"
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
