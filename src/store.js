import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null
  },
  getters: {
    getItems: state => {return state.items}
    //getActiveItems: state => {return state.items}
  },
  mutations: {
    setItems: state => {
      let items = []

      db.collection('items').orderBy('created').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, title: doc.data().title, status: doc.data().status })
        })

        state.items = items
      })
    }
  },
  actions: {
    setItems: context => {context.commit('setItems')}
  }
})
