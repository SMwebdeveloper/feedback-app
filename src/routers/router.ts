import { createRouter, createWebHistory } from "vue-router";

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
        {
          path: "/users",
          name: "users",
          component: () => import("@/pages/Users.vue"),
          meta: {
            authUser: true,
          },
        },
        ,
        {
          path: "/chats",
          name: "chats",
          component: () => import("@/pages/Chats.vue"),
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
      path: "/feedback/:id",
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
    {
      path: "/user/:id",
      name: "user",
      component: () => import("@/pages/User.vue")
    }
  ],
});


export default router;
