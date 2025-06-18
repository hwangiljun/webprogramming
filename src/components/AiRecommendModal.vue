<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" @click.self="closeModal">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8 transform transition-all" :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'">
      <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800">AI 여행지 추천</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </header>

      <div class="space-y-6">
        <!-- 동반자 -->
        <div class="question-group">
          <h3 class="font-semibold text-gray-700 mb-3">누구와 함께 가시나요?</h3>
          <div class="flex flex-wrap gap-2">
            <button v-for="option in options.companion" :key="option" @click="select('companion', option)" :class="getButtonClass('companion', option)">{{ option }}</button>
          </div>
        </div>
        <!-- 기간 -->
        <div class="question-group">
          <h3 class="font-semibold text-gray-700 mb-3">얼마나 머무실 건가요?</h3>
          <div class="flex flex-wrap gap-2">
            <button v-for="option in options.duration" :key="option" @click="select('duration', option)" :class="getButtonClass('duration', option)">{{ option }}</button>
          </div>
        </div>
        <!-- 관심사 -->
        <div class="question-group">
          <h3 class="font-semibold text-gray-700 mb-3">어떤 여행을 선호하세요?</h3>
          <div class="flex flex-wrap gap-2">
            <button v-for="option in options.interest" :key="option" @click="select('interest', option)" :class="getButtonClass('interest', option)">{{ option }}</button>
          </div>
        </div>
      </div>

      <footer class="mt-8">
        <button 
          @click="submitRecommendation" 
          :disabled="!isAllSelected"
          class="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
          추천 받기
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AiRecommendModal',
  emits: ['close', 'get-recommendation'],
  data() {
    return {
      isVisible: false,
      selections: {
        companion: null,
        duration: null,
        interest: null,
      },
      options: {
        companion: ['혼자', '친구와', '연인과', '가족과'],
        duration: ['당일치기', '1박 2일', '2박 이상'],
        interest: ['활동적인', '여유로운', '맛집탐방', '자연풍경'],
      },
    };
  },
  computed: {
    isAllSelected() {
      return Object.values(this.selections).every(value => value !== null);
    }
  },
  mounted() {
    // 모달이 나타날 때 애니메이션 효과를 주기 위한 트릭
    this.$nextTick(() => {
      this.isVisible = true;
    });
  },
  methods: {
    select(category, option) {
      this.selections[category] = option;
    },
    getButtonClass(category, option) {
      const baseClass = 'px-4 py-2 rounded-full font-semibold text-sm border transition-colors';
      if (this.selections[category] === option) {
        return `${baseClass} bg-blue-500 text-white border-blue-500`;
      }
      return `${baseClass} bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;
    },
    closeModal() {
      this.isVisible = false;
      setTimeout(() => this.$emit('close'), 300); // 애니메이션 시간을 기다린 후 이벤트를 발생시킵니다.
    },
    submitRecommendation() {
      if (this.isAllSelected) {
        this.$emit('get-recommendation', this.selections);
        this.closeModal();
      }
    },
  },
};
</script>
