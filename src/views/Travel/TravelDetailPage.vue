<template>
  <main class="bg-gray-50 py-8 md:py-12">
    <!-- 로딩 중일 때 -->
    <div v-if="loading" class="text-center py-24">
      <p class="text-xl text-gray-500">여행지 상세 정보를 불러오는 중입니다...</p>
    </div>

    <!-- 로딩 완료 후 데이터가 있을 때 -->
    <article v-else-if="travelDetail && travelDetail.id" class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div>
        <img 
          :src="travelDetail.imageUrl" 
          :alt="travelDetail.title" 
          class="w-full h-64 md:h-96 object-cover" 
          :onerror="`this.onerror=null;this.src='${travelDetail.fallbackUrl}';`"
        >
      </div>
      <div class="p-6 md:p-10">
        <h1 class="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{{ travelDetail.title }}</h1>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">{{ travelDetail.description }}</p>
        
        <div class="border-t pt-6">
          <p class="text-gray-700">
            <span class="font-semibold">테마:</span>
            <span v-for="(type, index) in travelDetail.type.split(', ')" :key="index" class="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-3 py-1 rounded-full">
              {{ type }}
            </span>
          </p>
        </div>

        <div class="mt-12 text-center">
          <button @click="goBack" class="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-700 transition-colors">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </article>

    <!-- 데이터가 없을 때 -->
    <div v-else class="text-center py-24">
      <p class="text-xl text-gray-500">여행지 정보를 찾을 수 없습니다.</p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TravelDetailPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('travel', ['travelDetail', 'loading'])
  },
  methods: {
    ...mapActions('travel', ['fetchTravelDetail']),
    goBack() {
      this.$router.push('/list');
    }
  },
  created() {
    this.fetchTravelDetail(this.id);
  },
  // 컴포넌트가 사라질 때 store의 상세 정보를 비워줍니다.
  unmounted() {
    this.$store.commit('travel/resetTravels');
  }
};
</script>
