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
    // AI 추천 로직을 실행하는 메소드입니다.
    async getAiRecommendation(preferences) {
      console.log('선택된 취향:', preferences);
      // 1. 전체 여행지 목록을 가져옵니다.
      await this.fetchAllTravels();
      const allTravels = this.$store.state.travel.travels;

      // 2. 간단한 태그 기반 추천 로직
      const recommendationMap = {
        '혼자': ['도시', '문화'],
        '친구와': ['도시', '해변', '인기'],
        '연인과': ['해변', '문화', '자연'],
        '가족과': ['자연', '섬'],
        '활동적인': ['해변', '자연'],
        '여유로운': ['문화', '섬'],
        '맛집탐방': ['도시', '인기']
      };
      
      const desiredTags = [
        ...(recommendationMap[preferences.companion] || []),
        ...(recommendationMap[preferences.interest] || []),
      ];

      let bestMatch = null;
      let maxScore = -1;

      allTravels.forEach(travel => {
        let score = 0;
        const travelTags = travel.type ? travel.type.split(', ') : [];
        desiredTags.forEach(tag => {
          if (travelTags.includes(tag)) {
            score++;
          }
        });

        if (score > maxScore) {
          maxScore = score;
          bestMatch = travel;
        } else if (score === maxScore && Math.random() > 0.5) {
          bestMatch = travel;
        }
      });

      // 3. 가장 점수가 높은 여행지의 상세 페이지로 이동합니다.
      const targetTravel = bestMatch || allTravels[Math.floor(Math.random() * allTravels.length)];
      if (targetTravel) {
        this.$router.push({ name: 'TravelDetailPage', params: { id: targetTravel.id } });
      }
    }
  },
  created() {
    this.handleCategorySelect('인기');
  }
}
</script>
```
