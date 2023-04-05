import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import NewFeedback from '@/views/newFeedback'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      name:'home',
      component:Home
    },
    {
      path:'/newFeedback',
      name:'newFeedback',
      component:NewFeedback
    },
  ]
})