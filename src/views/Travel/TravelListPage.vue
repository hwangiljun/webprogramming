<template>
  <main class="p-4 md:p-8 bg-gray-50 min-h-screen">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">전체 여행지 목록</h1>
      <p class="text-gray-600 mt-2 text-lg">대한민국의 아름다운 여행지들을 모두 확인해보세요.</p>
    </header>

    <!-- 여행지 그리드 -->
    <section>
      <!-- 로딩 중일 때 표시할 내용 -->
      <div v-if="loading" class="text-center py-16">
        <p class="text-xl text-gray-500">여행지 목록을 불러오는 중입니다...</p>
      </div>
      
      <!-- 로딩이 끝났고, 데이터가 있을 때 표시할 내용 -->
      <div v-else-if="travels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <!-- TravelItem 컴포넌트에 전체 travel 객체를 'item' prop으로 전달합니다. -->
        <TravelItem v-for="travel in travels" :key="travel.id" :item="travel" />
      </div>

      <!-- 로딩이 끝났는데 데이터가 없을 때 표시할 내용 -->
      <div v-else class="text-center py-16">
        <p class="text-xl text-gray-500">표시할 여행지가 없습니다.</p>
        <p class="text-gray-400 mt-2">서버에서 데이터를 가져오지 못했거나 데이터가 비어있습니다.</p>
      </div>
    </section>
  </main>
</template>

<script>
// Vuex의 상태와 액션을 사용하기 위해 mapState, mapActions를 import 합니다.
import { mapState, mapActions } from 'vuex';
import TravelItem from '@/components/TravelItem.vue';

export default {
  name: 'TravelListPage',
  components: {
    TravelItem
  },
  computed: {
    // 'travel' 모듈의 state 중에서 travels와 loading을 가져옵니다.
    ...mapState('travel', ['travels', 'loading'])
  },
  methods: {
    // 'travel' 모듈의 actions 중에서 fetchAllTravels를 가져옵니다.
    ...mapActions('travel', ['fetchAllTravels'])
  },
  // created 훅: 컴포넌트가 생성될 때 최초 한 번 실행됩니다.
  created() {
    // 모든 여행지 목록을 가져오는 액션을 호출합니다.
    this.fetchAllTravels();
  },
  // unmounted 훅: 컴포넌트가 사라질 때 store의 travels 목록을 비워줍니다.
  // 이렇게 하면 홈페이지로 돌아갔을 때 이전에 로드된 목록이 잠시 보이는 현상을 방지합니다.
  unmounted() {
    this.$store.commit('travel/resetTravels');
  }
}
</script>
