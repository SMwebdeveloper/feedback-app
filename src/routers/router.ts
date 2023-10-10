import {createRouter, createWebHistory} from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes:  [
        {
          path: '/',
          name: "home",
          component: () => import('@/pages/home/index.vue')
        },
        {
            path: '/add-publication',
            name: "add-publication",
            component: () => import('@/pages/create/index.vue')
          },
          {
            path: '/save',
            name: "save",
            component: () => import('@/pages/save/index.vue')
          },
          {
            path: '/profile',
            name: "profile",
            component: () => import('@/pages/profile/index.vue')
          },
          {
            path: '/login',
            name: "login",
            component: () => import('@/pages/login/index.vue')
          },
          {
            path: '/sign-up',
            name: "sign-up",
            component: () => import('@/pages/signup/index.vue')
          },
      ]
})

export default router