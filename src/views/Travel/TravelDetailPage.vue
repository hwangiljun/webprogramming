<template>
  <main class="bg-gray-50 py-8 md:py-12">
    <!-- 로딩 중 -->
    <div v-if="loading" class="text-center py-24">
      <p class="text-xl text-gray-500">여행지 상세 정보를 불러오는 중입니다...</p>
    </div>

    <!-- 여행지 상세 정보 -->
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
            <span 
              v-for="(type, index) in Array.isArray(travelDetail.type) ? travelDetail.type : travelDetail.type.split(', ')" 
              :key="index" 
              class="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-3 py-1 rounded-full"
            >
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

    <!-- 리뷰 영역 -->
    <section v-if="travelDetail && travelDetail.id" class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl mt-10 p-8">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">리뷰</h2>

      <!-- 리뷰 작성/수정 폼 -->
      <form @submit.prevent="onSubmitReview" class="mb-8 flex flex-col md:flex-row items-start md:items-end gap-4">
        <textarea
          v-model="reviewText"
          placeholder="리뷰를 입력하세요."
          class="w-full border border-gray-300 rounded-lg p-3 text-gray-700 resize-none"
          rows="3"
        ></textarea>
        <button
  type="submit"
  class="min-w-[80px] h-11 px-5 flex items-center justify-center font-bold text-base rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
>
  {{ editingReviewId ? "수정" : "등록" }}
</button>
<button
  v-if="editingReviewId"
  type="button"
  @click="cancelEdit"
  class="min-w-[80px] h-11 px-5 flex items-center justify-center font-bold text-base rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
>
  취소
</button>

      </form>

      <!-- 리뷰 리스트 -->
      <div v-if="reviews.length">
        <div
          v-for="review in reviews"
          :key="review.id" 
          class="border-t py-4 flex justify-between items-center"
        >
          <div>
            <p class="text-gray-800">{{ review.content }}</p>
            <span class="text-xs text-gray-400">
              {{ review.user_name || '익명' }} · {{ formatDate(review.created_at) }}
            </span>
          </div>
          <div>
            <button
              v-if="isMyReview(review)"
              @click="startEdit(review)"
              class="text-blue-500 hover:underline mr-2"
            >수정</button>
            <button
              v-if="isMyReview(review)"
              @click="deleteReviewHandler(review.id)"  
              class="text-red-500 hover:underline"
            >삭제</button>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-400 text-center py-6">아직 등록된 리뷰가 없습니다.</div>
    </section>

    <!-- 데이터 없음 -->
    <div v-else class="text-center py-24">
      <p class="text-xl text-gray-500">여행지 정보를 찾을 수 없습니다.</p>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  createReview,
  updateReview,
  getReviews,
  deleteReview
} from '@/api/apiMethod';

export default {
  name: 'TravelDetailPage',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      reviews: [],
      reviewText: '',
      editingReviewId: null
    };
  },
  computed: {
    ...mapState('travel', ['travelDetail', 'loading']),
    currentUserId() {
      return this.$store.getters.userInfo?.id || null; 
    },
    currentUserName() {
      return this.$store.getters.userInfo?.name || '';
    }
  },
  methods: {
    ...mapActions('travel', ['fetchTravelDetail']),
    goBack() {
      this.$router.push('/list');
    },
    async fetchReviews() {
      try {
        const res = await getReviews(this.id);
     
        this.reviews = res.map(review => ({
          ...review,
          id: review._id || review.id,
          user_id: review.user_id?._id || review.user_id
        }));
      } catch (e) {
        this.reviews = [];
      }
    },
    async onSubmitReview() {
      if (!this.reviewText.trim()) return;
      try {
        if (this.editingReviewId) {
          await updateReview(this.editingReviewId, this.reviewText);
        } else {
          await createReview({
            user_id: this.currentUserId,
            dest_id: this.id,
            content: this.reviewText
          });
        }
        this.reviewText = '';
        this.editingReviewId = null;
        await this.fetchReviews();
      } catch (e) {
        alert('리뷰 저장에 실패했습니다.');
      }
    },
    async deleteReviewHandler(reviewId) {
      if (!confirm('리뷰를 삭제하시겠습니까?')) return;
      try {
        await deleteReview(reviewId);
        await this.fetchReviews();
      } catch (e) {
        alert('리뷰 삭제에 실패했습니다.');
      }
    },
    startEdit(review) {
      this.reviewText = review.content;
      this.editingReviewId = review.id;  
    },
    cancelEdit() {
      this.reviewText = '';
      this.editingReviewId = null;
    },
    isMyReview(review) {
      return review.user_id === this.currentUserId;
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleString();
    }
  },
  created() {
    this.fetchTravelDetail(this.id);
    this.fetchReviews();
  },
  unmounted() {
    this.$store.commit('travel/resetTravels');
  }
};
</script>

