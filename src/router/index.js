import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Home from '@/components/Home'
import Jobs from '@/components/Jobs'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Производство',
      component: Home,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/login',
      name: 'Вход',
      component: Login
    },
    {
      path: '/registration',
      name: 'Регистрация',
      component: Registration
    },
    {
      path: '/jobs',
      name: 'Выработка',
      component: Jobs,
      beforeEnter (to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    }
  ]
})
