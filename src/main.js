// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/messaging'

Vue.use(
  Vuelidate,
  Uimini
)

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: 'AIzaSyD6F-3QiGFLg7ezgkrqv7m9NOwxjmP0iFw',
      authDomain: 'industry-locator.firebaseapp.com',
      databaseURL: 'https://industry-locator.firebaseio.com',
      projectId: 'industry-locator',
      storageBucket: 'industry-locator.appspot.com',
      messagingSenderId: '241567984575',
      measurementId: 'G-BEBGK5WPEG'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    // При обновлении экрана проверка авторизации текущего пользователя
    // (чтобы его не выкидывало)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
        this.$store.dispatch('loadActivities')
      }
    })
    // var check = 0

    // слушатель на измененния в БД OneC/machine_comment_new
    firebase.database().ref('OneC/machine_comment_new').on('value', (childSnapshot, prevChildKey) => {
      // console.log('OneC child has chabged')
      // let checkFun = () => {
      //   const ch = this.$store.getters.checkUpdate
      //   console.log(ch)
      // }
      // checkFun()
      // console.log('1 -> ' + this.$store.getters.checkUpdate)
      if (this.$store.getters.checkUpdate) {
        this.$store.dispatch('loadActivities')
        this.$store.commit('checkUpdate', false)
        // console.log('2 -> ' + this.$store.getters.checkUpdate)
      }
    })

    // window.onload = function () {
    //   document.getElementsByClassName('.user-logo').value = null
    // }
  }
})
