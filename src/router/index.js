import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home";
import NewFeedback from "@/views/newFeedback";
import EditFeedback from "@/views/editFeedback";
import Register from "@/views/pageRegister"
import SignIn from "@/views/pageSignIn"
import Feedback from "@/views/feedback";
import Pdf from "@/views/Pdf.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/create",
      name: "create",
      component: NewFeedback,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditFeedback,
    },
    {
      path: "/feedback/:id",
      name: "feedback",
      component: Feedback,
    },
    {
      path: "/register",
      name: 'register',
      component: Register
    },
    {
      path: "/signin",
      name: 'signin',
      component: SignIn
    },
    {
      path: "/pdf",
      name: 'pdf',
      component: Pdf
    }
  ],
});
