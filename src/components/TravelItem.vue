<template>
  <div 
    class="relative rounded-xl overflow-hidden shadow-md group h-96 cursor-pointer"
    @click="goToDetail"
  >
    <img :src="item.imageUrl" 
         :alt="item.title" 
         class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
         :onerror="`this.onerror=null;this.src='${item.fallbackUrl}';`">
    <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
      <h4 class="text-white text-2xl font-bold">{{ item.title }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  // 추가된 부분: methods 추가
  methods: {
    goToDetail() {
      // item.id를 가지고 상세 페이지로 라우팅
      this.$router.push({ name: 'TravelDetailPage', params: { id: this.item.id } });
    }
  }
}
</script>