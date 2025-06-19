<template>
  <div>
    <main class="p-4 md:p-8">
      <!-- 'open-recommend-modal' 이벤트를 받아서 openModal 메소드를 실행합니다. -->
      <HeroSection @open-recommend-modal="openModal" />
      <RecommenedPlaces @select-category="handleCategorySelect" />
      
      <section>
        <div v-if="!loading && travels.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TravelItem v-for="travel in travels" :key="travel.id" :item="travel" />
        </div>
        <div v-else-if="loading" class="text-center py-10">
          <p class="text-gray-500">여행지 목록을 불러오는 중입니다...</p>
        </div>
        <div v-else class="text-center py-10">
          <p class="text-gray-500">표시할 여행지가 없습니다.</p>
        </div>
      </section>
    </main>

    <!-- AI 추천 모달 컴포넌트 -->
    <AiRecommendModal 
      v-if="isModalVisible" 
      @close="closeModal" 
      @get-recommendation="getAiRecommendation"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HeroSection from '@/components/HeroSection.vue';
import RecommenedPlaces from '@/components/RecommenedPlaces.vue';
import TravelItem from '@/components/TravelItem.vue';
// 새로 만든 모달 컴포넌트를 import 합니다.
import AiRecommendModal from '@/components/AiRecommendModal.vue';

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    RecommenedPlaces,
    TravelItem,
    AiRecommendModal // 모달 컴포넌트를 등록합니다.
  },
  data() {
    return {
      // 모달의 표시 여부를 관리하는 상태값입니다.
      isModalVisible: false,
    };
  },
  computed: {
    ...mapState('travel', ['travels', 'loading'])
  },
  methods: {
    ...mapActions('travel', ['searchTravels', 'fetchAllTravels']),
    handleCategorySelect(category) {
      this.searchTravels({ theme: category });
    },
    // 모달을 여닫는 메소드들입니다.
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
     //ai api사용
    async getAiRecommendation(preferences) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/ai_recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ preferences })
    });
    if (!response.ok) throw new Error('AI 추천 요청 실패');
    const data = await response.json();
    const { id } = data;
    if (id) {
      this.$router.push({ name: 'TravelDetailPage', params: { id } });
    } else {
      alert('추천 결과가 없습니다.');
    }
  } catch (error) {
    alert('AI 추천에 실패했습니다.');
    console.error(error);
  }
},

  },
  created() {
    this.handleCategorySelect('인기');
  }
}
</script>
```
