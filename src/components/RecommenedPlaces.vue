<template>
  <section class="mb-12">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">꼭 가봐야 할 곳</h3>
    <div class="flex flex-col md:flex-row gap-8">
      <div class="w-full md:w-1/4">
        <div class="border border-gray-200 bg-gray-50 rounded-lg p-6 shadow-sm h-full">
          <h4 class="text-gray-500 font-semibold mb-2">추천 여행지</h4>
          <p class="text-2xl font-bold text-gray-900">서울 남산타워</p>
        </div>
      </div>
      <div class="w-full md:w-3/4 flex items-center">
        <div class="flex flex-wrap gap-3">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectCategory(category)"
            :class="[
              'px-5 py-2 rounded-full font-semibold text-sm transition-colors',
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecommendedPlaces',
  // 추가된 부분: data 속성 추가
  data() {
    return {
      categories: ['인기', '도시', '해변', '섬', '자연', '문화'],
      activeCategory: '인기', // 기본 활성 카테고리
    };
  },
  // 추가된 부분: methods 추가
  methods: {
    selectCategory(category) {
      this.activeCategory = category;
      // 부모 컴포넌트로 'select-category' 이벤트를 발생시켜 선택된 카테고리 전달
      this.$emit('select-category', category);
    },
  },
};
</script>