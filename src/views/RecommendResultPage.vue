<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container my-4">
    <div class="row g-3 align-items-center mb-3">
      <div class="col-auto">
        <input v-model="keyword" type="text" class="form-control" placeholder="여행지 이름 또는 키워드" @keyup.enter="searchTravels" />
      </div>
      <div class="col-auto">
        <select v-model="region" class="form-select">
          <option value="">전체 지역</option>
          <option value="서울">서울</option>
          <option value="부산">부산</option>
          <option value="제주">제주</option>
        </select>
      </div>
      <div class="col-auto">
        <select v-model="theme" class="form-select">
          <option value="">전체 테마</option>
          <option value="자연">자연</option>
          <option value="도시">도시</option>
          <option value="해변">해변</option>
          <option value="문화">문화</option>
        </select>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="searchTravels">검색</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-warning" @click="getRandomTravel">랜덤 추천 받기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  setup() {
    const store = useStore()

    const keyword = ref('')
    const region = ref('')
    const theme = ref('')

    const searchTravels = () => {
      store.dispatch('travel/searchTravels', {
        keyword: keyword.value,
        region: region.value,
        theme: theme.value
      })
    }

    const getRandomTravel = async () => {
      try {
        await store.dispatch('travel/fetchRandomTravel')
      } catch (error) {
        console.error('랜덤 추천 오류:', error)
      }
    }

    return { keyword, region, theme, searchTravels, getRandomTravel }
  }
}
</script>
