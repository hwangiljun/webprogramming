<template>
  <div class="travel-detail-page" v-if="travel">
    <img :src="travel.image" :alt="travel.title" class="detail-image" />
    <div class="detail-content">
      <h1 class="detail-title">{{ travel.title }}</h1>
      <p class="detail-description">{{ travel.description }}</p>
      <div class="detail-info">
        <p><strong>위치:</strong> {{ travel.location }}</p>
        <p><strong>추천 계절:</strong> {{ travel.season }}</p>
        <p><strong>테마:</strong> {{ travel.theme }}</p>
      </div>
      <button class="back-button" @click="goBack">목록으로 돌아가기</button>
    </div>
  </div>
  <div v-else-if="loading" class="loading-message">
    <p>여행지 상세 정보를 불러오는 중...</p>
  </div>
  <div v-else class="not-found">
    <p>여행지 정보를 찾을 수 없습니다.</p>
  </div>
</template>

<script>
// src/views/Travel/TravelDetailPage.vue 에서 src/api/travelApi.js 로 가려면 두 단계 위로 올라간 다음 api 폴더로
import { getTravelDetail } from '../../api/travelApi';

export default {
  name: 'TravelDetailPage', // <-- 이 부분을 'TravelDetailPage'로 변경
  props: ['id'],
  data() {
    return {
      travel: null,
      loading: false,
      error: null,
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchTravelDetail(newId);
        }
      },
    },
  },
  methods: {
    async fetchTravelDetail(id) {
      this.loading = true;
      this.error = null;
      this.travel = null;

      try {
        const response = await getTravelDetail(id);
        this.travel = response;
      } catch (err) {
        console.error(`Error fetching travel detail for ID ${id}:`, err);
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      this.$router.push('/list');
    },
  },
};
</script>

<style scoped>
/* (기존 스타일 유지) */
.travel-detail-page {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-image {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 30px;
}

.detail-content {
  width: 100%;
  padding: 0 20px;
  text-align: left;
}

.detail-title {
  font-size: 38px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.detail-description {
  font-size: 18px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
}

.detail-info p {
  font-size: 16px;
  margin-bottom: 10px;
  color: #666;
}

.detail-info strong {
  color: #333;
}

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
  margin-top: 40px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}

.loading-message, .not-found {
  text-align: center;
  font-size: 20px;
  color: #888;
  margin-top: 50px;
}
</style>