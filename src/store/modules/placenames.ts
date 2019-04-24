import { api } from '@/utils/http-common'


const state = {
  items: {}

}

const mutations = {

  setItem(state, payload) {
    state.items[payload.id] = payload
  }

}

const actions = {
  fetchPlacename ({ commit }) {
    api
      .get('/placenames/DT02-02878')
      .then(response => response.data)
      .then(console.log)
  }
}

const getters = {}

const placenameModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default placenameModule
