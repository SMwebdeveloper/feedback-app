import { createRouter, createWebHistory } from "vue-router";
// import { useAuthStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/index.vue"),
      meta: {
        authUser: true,
      },
      redirect: { name: "dashboard" },
      children: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("@/pages/Home.vue")
        },
        {
            path: "/add-publication",
            name: "add-publication",
            component: () => import("@/pages/Create.vue"),
            meta: {
              authUser: true,
            },
          },
          {
            path: "/save",
            name: "save",
            component: () => import("@/pages/Save.vue"),
            meta: {
              authUser: true,
            },
          },
          {
            path: "/profile",
            name: "profile",
            component: () => import("@/pages/Profile.vue"),
            meta: {
              authUser: true,
            },
          },
      ],
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      component: () => import("@/pages/EditProfile.vue")
    },
    {
      path: "/feedback",
      name: 'feedback',
      component: () => import("@/pages/Feedback.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/SignUp.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("@/pages/SignIn.vue"),
    },
  ],
});


export default router;
