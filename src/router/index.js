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
      path:'/addFeedback',
      name:'addFeedback',
      component:NewFeedback
    },
    {
      path:'/editFeedback/:id',
      name:'editFeedback',
      component:EditFeedback
    },
    {
      path:'/feedback/:id',
      name:'feedback',
      component:Feedback
    }
  ]
})