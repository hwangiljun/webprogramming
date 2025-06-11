<template>
  <section class="mb-12">
    <h3 class="text-2xl font-bold text-gray-800 mb-6">꼭 가봐야 할 곳</h3>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- 좌측 추천 카드 -->
      <div class="w-full md:w-1/4">
        <div class="border border-gray-200 bg-gray-50 rounded-lg p-6 shadow-sm h-full">
          <h4 class="text-gray-500 font-semibold mb-2">추천 여행지</h4>
          <p class="text-2xl font-bold text-gray-900">서울 남산타워</p>
        </div>
      </div>
      <!-- 우측 카테고리 -->
      <div class="w-full md:w-3/4 flex items-center">
        <div class="flex flex-wrap gap-3">
          <button class="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm">인기</button>
          <button class="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100">도시</button>
          <button class="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100">해변</button>
          <button class="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100">섬</button>
          <button class="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100">자연</button>
          <button class="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100">문화</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RecommendedPlaces'
}
</script>
