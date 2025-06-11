<template>
  <main class="p-4 md:p-8">
    <HeroSection />
    <!-- 'RecommenedPlaces'로 수정된 컴포넌트 -->
    <RecommenedPlaces />
    
    <!-- 여행지 그리드 -->
    <section>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TravelItem v-for="travel in travelItems" :key="travel.id" :item="travel" />
      </div>
    </section>
  </main>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue';
// 경로의 오타 수정: RecommendedPlaces -> RecommenedPlaces
import RecommenedPlaces from '@/components/RecommenedPlaces.vue';
import TravelItem from '@/components/TravelItem.vue';

export default {
  // 컴포넌트 이름을 두 단어 이상으로 수정
  name: 'HomePage',
  components: {
    HeroSection,
    // 컴포넌트 등록 이름 수정
    RecommenedPlaces,
    TravelItem
  },
  data() {
    return {
      travelItems: [
        { 
          id: 1, 
          title: '최고의 모험 여행지', 
          imageUrl: 'https://images.unsplash.com/photo-1525183995014-d876a40a8570?q=80&w=1974&auto=format&fit=crop',
          fallbackUrl: 'https://placehold.co/600x400/f6ad55/ffffff?text=Adventure'
        },
        { 
          id: 2, 
          title: '전통이 살아있는 도시', 
          imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=1964&auto=format&fit=crop',
          fallbackUrl: 'https://placehold.co/600x400/4a5568/ffffff?text=Tradition'
        },
        { 
          id: 3, 
          title: '고요한 휴식을 위한 사원', 
          imageUrl: 'https://images.unsplash.com/photo-1517154421773-65c926ee4135?q=80&w=1974&auto=format&fit=crop',
          fallbackUrl: 'https://placehold.co/600x400/a0aec0/ffffff?text=Serenity'
        }
      ]
    }
  }
}
</script>