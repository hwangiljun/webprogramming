<template>
  <div class="trip-random">
    <h1>🎲 랜덤 여행지 추천</h1>
    <button @click="recommend">추천 받기</button>
    <p v-if="result">추천된 장소: <strong>{{ result }}</strong></p>
  </div>
</template>

<script>
export default {
  name: 'TripRandom',
  data() {
    return {
      places: ['제주도', '부산', '강릉', '경주', '속초'],
      result: null,
    };
  },
  methods: {
    recommend() {
      const index = Math.floor(Math.random() * this.places.length);
      this.result = this.places[index];
    },
  },
};
</script>

<style scoped>
.trip-random {
  text-align: center;
  margin-top: 40px;
}
button {
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
