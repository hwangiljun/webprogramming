<template>
  <div class="travel-list-page">
    <h1 class="page-title">모든 여행지</h1>
    <p v-if="loading" class="loading-message">여행지 목록을 불러오는 중...</p>
    <p v-else-if="error" class="error-message">데이터를 불러오는데 실패했습니다: {{ error.message }}</p>
    <div v-else class="travel-grid">
      <TravelItem
        v-for="travel in travels"
        :key="travel.id"
        :title="travel.title"
        :image="travel.image"
        @click="goToTravelDetail(travel.id)"
      />
    </div>
  </div>
</template>

<script>
// src/views/Travel/TravelListPage.vue 에서 src/components/TravelItem.vue 로 가려면 두 단계 위로 올라간 다음 components 폴더로
import TravelItem from '../../components/TravelItem.vue';
// src/views/Travel/TravelListPage.vue 에서 src/api/travelApi.js 로 가려면 두 단계 위로 올라간 다음 api 폴더로
import { getTravelList } from '../../api/travelApi';

export default {
  name: 'TravelListPage', // <-- 이 부분을 'TravelListPage'로 변경
  components: {
    TravelItem,
  },
  data() {
    return {
      travels: [],
      loading: false,
      error: null,
    };
  },
  async created() {
    this.loading = true;
    this.error = null;
    try {
      const response = await getTravelList({});
      this.travels = response;
    } catch (err) {
      console.error('Error fetching travel list:', err);
      this.error = err;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goToTravelDetail(id) {
      this.$router.push(`/travel-detail/${id}`);
    },
  },
};
</script>

<style scoped>
/* (기존 스타일 유지) */
.travel-list-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  text-align: center;
}

.page-title {
  font-size: 38px;
  color: #2c3e50;
  margin-bottom: 40px;
}

.travel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.loading-message, .error-message {
  font-size: 20px;
  color: #888;
  margin-top: 50px;
}

.error-message {
  color: #d9534f;
}
</style>