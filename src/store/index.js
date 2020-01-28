import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
      state: {
        events: []
      },
      getters: {
        events: state => state.events,
        event: (state) => (id) => {
          return state.events.find(event => event.id == id)
        }
      },
      mutations: {
        ADD_EVENT: (state,event) => {
          state.events.push(event)
        },
        DELETE_EVENT: (state, id) => {
          let index = state.events.findIndex(item => item.id == id)
          state.events.splice(index, 1)
        },
        UPDATE_EVENT: (state,{id,title}) => {
          let index = state.events.findIndex(item => item.id == id)
          state.events[index].title = title
        }
      },
      actions: {

      }
  })

  return Store
}
