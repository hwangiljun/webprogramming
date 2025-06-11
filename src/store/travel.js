import { getTravelList, getRandomTravel, getTravelDetail } from '../api/travelApi'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    travels: [],
    travelDetail: {},
    message: '',
    loading: false
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetTravels(state) {
      state.travels = []
      state.travelDetail = {}
      state.message = ''
      state.loading = false
    }
  },
  actions: {
    async searchTravels({ commit }, payload) {
      commit('updateState', {
        message: '',
        loading: true
      })
      try {
        const res = await getTravelList(payload)
        commit('updateState', {
          travels: _uniqBy(res, 'id')
        })
      } catch (error) {
        commit('updateState', {
          travels: [],
          message: error.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async fetchTravelDetail({ commit }, id) {
      commit('updateState', {
        loading: true
      })
      try {
        const res = await getTravelDetail(id)
        commit('updateState', {
          travelDetail: res
        })
      } catch (error) {
        commit('updateState', {
          travelDetail: {},
          message: error.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async fetchRandomTravel({ commit }) {
      commit('updateState', {
        loading: true
      })
      try {
        const res = await getRandomTravel()
        commit('updateState', {
          travels: res ? [res] : []
        })
      } catch (error) {
        commit('updateState', {
          travels: [],
          message: error.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}
