// src/store/travel.js

import { getTravelList, getRandomTravel, getTravelDetail, fetchAllTravels } from '../api/travelApi'
import _uniqBy from 'lodash/uniqBy'

// 이미지를 불러오지 못할 경우를 대비한 대체 이미지 URL을 만드는 함수
const getFallbackUrl = (title) => `https://placehold.co/600x400/a0aec0/ffffff?text=${encodeURIComponent(title)}`;

// 백엔드 데이터를 프론트엔드 형식에 맞게 변환하는 공통 함수
const transformTravelData = (items) => {
  const itemsArray = Array.isArray(items) ? items : [items];
  return itemsArray.map(item => ({
    id: item._id,
    title: item.name,
    description: item.description,
    type: item.type,
    // (수정) 백엔드에서 보내주는 imageUrl을 직접 사용합니다.
    // 만약 imageUrl이 없다면, 대체 이미지를 보여줍니다.
    imageUrl: item.imageUrl || getFallbackUrl(item.name),
    fallbackUrl: getFallbackUrl(item.name)
  }));
};

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
    async fetchAllTravels({ commit }) {
      commit('updateState', { message: '', loading: true });
      try {
        const res = await fetchAllTravels();
        const transformedTravels = transformTravelData(res);
        commit('updateState', {
          travels: _uniqBy(transformedTravels, 'id')
        });
      } catch (error) {
        console.error("전체 여행지 목록 로딩에 실패했습니다:", error);
        commit('updateState', {
          travels: [],
          message: error.message
        });
      } finally {
        commit('updateState', { loading: false });
      }
    },
    async searchTravels({ commit }, payload) {
      commit('updateState', { message: '', loading: true })
      try {
        const res = await getTravelList(payload);
        const transformedTravels = transformTravelData(res);
        commit('updateState', {
          travels: _uniqBy(transformedTravels, 'id')
        })
      } catch (error) {
        console.error("여행지 검색에 실패했습니다:", error);
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
      commit('updateState', { loading: true });
      try {
        const res = await getTravelDetail(id);
        const [transformedDetail] = transformTravelData(res);
        commit('updateState', { travelDetail: transformedDetail });
      } catch (error) {
         console.error("여행지 상세 정보 로딩에 실패했습니다:", error);
        commit('updateState', {
          travelDetail: {},
          message: error.message
        });
      } finally {
        commit('updateState', { loading: false });
      }
    },
    async fetchRandomTravel({ commit }) {
      commit('updateState', { loading: true })
      try {
        const res = await getRandomTravel();
        const [transformedTravel] = transformTravelData(res);
        commit('updateState', {
          travels: res ? [transformedTravel] : []
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
