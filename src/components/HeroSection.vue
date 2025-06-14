<template>
  <section class="mb-12">
    <div class="relative rounded-xl overflow-hidden shadow-sm">
      <img src="https://images.unsplash.com/photo-1578994323288-82c9b418d1a1?q=80&w=2070&auto=format&fit=crop" 
           alt="서울 남산타워" 
           class="w-full h-80 object-cover"
           onerror="this.onerror=null;this.src='https://placehold.co/1200x320/a0aec0/ffffff?text=N+Seoul+Tower';">
      <div class="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start p-8 md:p-12">
        <h2 class="text-white text-3xl md:text-5xl font-bold mb-3">AI 한국 여행 추천</h2>
        <p class="text-white text-lg md:text-xl mb-6">AI가 추천하는 특별한 여행지</p>
        <!-- (수정) 클릭 시 'open-recommend-modal' 이벤트를 발생시킵니다. -->
        <button @click="$emit('open-recommend-modal')" class="bg-orange-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-orange-600 transition-colors">
          AI 추천받기
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  // (수정) 부모 컴포넌트로 이벤트를 보내기 위해 emits 옵션 추가
  emits: ['open-recommend-modal']
}
</script>
