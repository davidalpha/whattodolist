import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyAPvzYUUvVb1ApzHacv3OVAEJnXBUwfEIg",
  authDomain: "babysteps-18fdc.firebaseapp.com",
  databaseURL: "https://babysteps-18fdc.firebaseio.com",
  projectId: "babysteps-18fdc",
  storageBucket: "",
  messagingSenderId: "675398074360",
  appId: "1:675398074360:web:a7e5ec55b470c09e"
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
