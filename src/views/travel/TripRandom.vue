<template>
  <div class="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-start pt-12 px-4" style="background-image: url('/background.jpg')">
    
    <div class="absolute inset-0 bg-black opacity-40 z-0"></div>

    <div class="relative z-10 bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl w-full max-w-xl backdrop-blur-lg border border-white border-opacity-30">
      <h1 class="text-4xl font-extrabold mb-10 text-center text-indigo-800 drop-shadow">🎯 여행지 추천 받기</h1>

      <div class="grid grid-cols-1 gap-6">
        <div>
          <label class="block text-gray-700 font-semibold mb-2">예산 (₩)</label>
          <input v-model="form.budget" type="number" placeholder="예: 10000" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">일행 수</label>
          <select v-model="form.groupSize" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="1">남자 혼자</option>
            <option value="2">여자 혼자</option>
            <option value="3">커플</option>
            <option value="4">부모님과</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">지역</label>
          <select v-model="form.location" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="서울">서울</option>
            <option value="경기">경기</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700 font-semibold mb-2">여행 스타일</label>
          <select v-model="form.style" class="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="감성">감성</option>
            <option value="자연">자연</option>
            <option value="데이트">데이트</option>
            <option value="맛집">맛집</option>
          </select>
        </div>
      </div>

      <button
        @click="getRecommendation"
        class="mt-8 w-full py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-md hover:scale-105 transform transition duration-200"
      >
        ✨ 추천 받기
      </button>

      <div v-if="recommendation" class="mt-10 p-6 bg-white border-2 border-indigo-300 rounded-2xl shadow-lg transition-all">
        <h2 class="text-2xl font-bold text-indigo-700 mb-3">🎉 추천 여행지: {{ recommendation.name }}</h2>
        <p class="text-gray-800 mb-1">📍 <strong>위치:</strong> {{ recommendation.district }}</p>
        <p class="text-gray-800 mb-1">💰 <strong>예산 추천:</strong> 약 ₩{{ recommendation.avg_cost }}</p>
        <p class="text-gray-800 mb-2">🧭 <strong>여행 스타일:</strong></p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in recommendation.tags"
            :key="tag"
            class="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium"
          >
            #{{ tag }}
          </span>
        </div>
        <router-link
          :to="`/destination/${recommendation.id}`"
          class="inline-block mt-4 text-indigo-600 font-semibold hover:underline"
        >
          🔍 자세히 보기
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
  budget: '',
  groupSize: '',
  location: '',
  style: ''
})

const recommendation = ref(null)

const getRecommendation = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/recommend', form.value)
    recommendation.value = res.data
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
/* 추가 스타일이 필요하면 여기에 작성 */
</style>
