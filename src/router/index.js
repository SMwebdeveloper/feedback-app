import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import NewFeedback from '@/views/newFeedback'
import EditFeedback from '@/views/editFeedback'
import Feedback from '@/views/feedback'

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
      path:'/create',
      name:'create',
      component:NewFeedback
    },
    {
      path:'/edit/:id',
      name:'edit',
      component:EditFeedback
    },
    {
      path:'/feedback/:id',
      name:'feedback',
      component:Feedback
    }
  ]
})