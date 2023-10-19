import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/pages/home/Home.vue"),
      meta: {
        authUser: true,
      },
      redirect: { name: "dashboard" },
      children: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("@/pages/home/index.vue")
        },
        {
            path: "/add-publication",
            name: "add-publication",
            component: () => import("@/pages/create/index.vue"),
            meta: {
              authUser: true,
            },
          },
          {
            path: "/save",
            name: "save",
            component: () => import("@/pages/save/index.vue"),
            meta: {
              authUser: true,
            },
          },
          {
            path: "/profile",
            name: "profile",
            component: () => import("@/pages/profile/index.vue"),
            meta: {
              authUser: true,
            },
          },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login/index.vue"),
    },
    {
      path: "/sign-up",
      name: "sign-up",
      component: () => import("@/pages/signup/index.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const store = useAuthStore();
  if (to.meta.authUser && store.$state.authToken === '') {
    return { name: "login" };
  }

  if (store.authToken) {
    return { name: '/'}
  }
});
export default router;
