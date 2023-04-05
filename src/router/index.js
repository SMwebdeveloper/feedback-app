import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import NewFeedback from '@/views/newFeedback'
import EditFeedback from '@/views/editFeedback'

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
      path:'/addFeedback',
      name:'addFeedback',
      component:NewFeedback
    },
    {
      path:'/editFeedback',
      name:'eidtFeedback',
      component:EditFeedback
    },
  ]
})