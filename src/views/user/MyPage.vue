<template>
  <div class="mypage-container">
    <!-- 헤더 -->
    <header class="mypage-header">
      <h1>마이페이지</h1>
    </header>

    <div class="mypage-content">
      <!-- 사이드바 -->
      <aside class="sidebar">
        <ul>
          <li @click="selectMenu('edit-info')" :class="{ active: selectedMenu === 'edit-info' }">
            개인정보 수정
          </li>
          <li @click="selectMenu('myreviews')" :class="{ active: selectedMenu === 'myreviews' }">
            내가 쓴 리뷰
          </li>
          <li @click="selectMenu('withdraw')" :class="{ active: selectedMenu === 'withdraw' }">
            회원 탈퇴
          </li>
        </ul>
      </aside>

      <!-- 개인정보 수정 폼 -->
      <section class="info-edit-form" v-if="selectedMenu === 'edit-info'">
        <div class="form-container">
          <form @submit.prevent="updateInfo">
            <div class="form-group">
              <label for="name">이름</label>
              <input id="name" type="text" v-model="userInfo.name" placeholder="이름을 입력하세요" />
            </div>
            <div class="form-group">
              <label for="phone">전화번호</label>
              <input id="phone" type="tel" v-model="userInfo.phone" placeholder="'-' 없이 입력하세요" />
            </div>
            <button type="submit" class="update-button">수정하기</button>
          </form>
        </div>
      </section>

      <!-- 내가 쓴 리뷰 -->
       <section v-if="selectedMenu === 'myreviews'" class="mypost-list">
    <div class="form-container">
      <h2>내가 쓴 리뷰</h2>
      <ul class="item-list">
        <li 
          v-for="review in pagedReviews" 
          :key="review.id" 
          class="item-row"
          @click="goToTravelDetail(review.dest_id)" 
        >
          <span class="item-title">{{ review.content }}</span>
        </li>
      </ul>
          <div class="pagination" v-if="totalReviewPages > 0" style="margin-top:20px; display:flex; justify-content:center; gap:8px;">
            <button @click="changeReviewPage(currentReviewPage - 1)" :disabled="currentReviewPage === 1">이전</button>
            <button v-for="page in totalReviewPages" :key="page" @click="changeReviewPage(page)" :class="{active: currentReviewPage === page}">
              {{ page }}
            </button>
            <button @click="changeReviewPage(currentReviewPage + 1)" :disabled="currentReviewPage === totalReviewPages">다음</button>
          </div>
          <p v-if="myReviews.length === 0">작성한 리뷰가 없습니다.</p>
        </div>
      </section>

      <!-- 회원 탈퇴 폼 -->
      <section class="withdraw-form" v-if="selectedMenu === 'withdraw'">
        <div class="form-container">
          <h2>회원 탈퇴</h2>
          <input type="password" v-model="withdrawPw" style="margin-top: 20px;" placeholder="현재 비밀번호 입력" />
          
          <button class="withdraw-button" :disabled="!withdrawPw" @click="showWithdrawModal = true">
            탈퇴하기
          </button>
        </div>
        <!-- 모달 -->
        <div v-if="showWithdrawModal" class="modal-backdrop">
          <div class="modal-container">
            <p>정말로 탈퇴하시겠습니까?</p>
            <div class="modal-buttons">
              <button @click="withdraw">확인</button>
              <button @click="showWithdrawModal = false">취소</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import {
  updateUserInfo,
  deleteUser,
  fetchMyReviews,
} from "@/api/apiMethod";

export default {
  data() {
    return {
      selectedMenu: "edit-info",
      userInfo: {
        name: "",
        phone: "",
      },
      myReviews: [],
      showWithdrawModal: false,
      withdrawPw: "",
      agreeWithdraw: false,
      // 페이지네이션 관련
      currentReviewPage: 1,
      reviewsPerPage: 5,
      currentRecommendPage: 1,
      recommendsPerPage: 5,
    };
  },
  computed: {
    totalReviewPages() {
      return Math.ceil(this.myReviews.length / this.reviewsPerPage);
    },
    pagedReviews() {
      const start = (this.currentReviewPage - 1) * this.reviewsPerPage;
      return this.myReviews.slice(start, start + this.reviewsPerPage);
    },
    pagedRecommends() {
      const start = (this.currentRecommendPage - 1) * this.recommendsPerPage;
      return this.myRecommends.slice(start, start + this.recommendsPerPage);
    },
  },
  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu;
      if (menu === "myreviews") this.loadMyReviews();
      if (menu === "myrecommend") this.loadMyRecommends();
    },
    async loadMyReviews() {
      try {
        const data = await fetchMyReviews();
        this.myReviews = data.content || data;
      } catch (e) {
        alert(e.message);
      }
    },
     goToTravelDetail(destId) {
      this.$router.push({
        name: 'TravelDetailPage',  // 라우터에 등록된 이름
        params: { id: destId }     // 여행지 ID 파라미터 전달
      });
    },
    changeReviewPage(page) {
      if (page < 1 || page > this.totalReviewPages) return;
      this.currentReviewPage = page;
    },
    changeRecommendPage(page) {
      if (page < 1 || page > this.totalRecommendPages) return;
      this.currentRecommendPage = page;
    },
   async updateInfo() {
  try {
    // 현재 로그인한 사용자 ID 가져오기
    const userId = this.$store.getters.userInfo.id;
    
    // 이름과 전화번호만 서버에 전송
    await updateUserInfo({
      user_id: userId,
      name: this.userInfo.name,
      phone: this.userInfo.phone
    });
    
    alert("정보가 성공적으로 수정되었습니다!");
    // 필요한 경우 사용자 정보 갱신
    this.$store.dispatch('fetchUser');
  } catch (error) {
    alert(error.message || "회원정보 수정 중 문제가 발생했습니다.");
  }
},

    async withdraw() {
      try {
        // 실제로는 비밀번호 검증 및 약관 동의 체크 필요
        await deleteUser({ password: this.withdrawPw });
        alert("회원 탈퇴가 완료되었습니다.");
        this.$store.commit("logout");
        this.$router.push("/");
      } catch (error) {
        alert(error.message || "회원 탈퇴 중 문제가 발생했습니다.");
      }
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      return dateStr.split('T')[0];
    },
  },
};
</script>

<style scoped>
.mypage-container {
  max-width: 900px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(161, 32, 60, 0.09);
  overflow: hidden;
}

.mypage-header {
  background: linear-gradient(90deg, #a1203c 0%, #c53c5f 100%);
  color: #fff;
  padding: 32px 0 28px 36px;
  border-bottom: 1.5px solid #f1d5db;
}

.mypage-header h1 {
  font-size: 2.1rem;
  font-weight: 700;
  letter-spacing: -1px;
  margin: 0;
}

.mypage-content {
  display: flex;
  min-height: 520px;
}

.sidebar {
  width: 200px;
  background: #fbe9ed;
  border-right: 1.5px solid #f1d5db;
  padding: 32px 0 0 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 16px 28px;
  font-size: 1.07rem;
  color: #a1203c;
  cursor: pointer;
  border-radius: 0 20px 20px 0;
  margin-bottom: 6px;
  transition: background 0.18s, color 0.18s;
}

.sidebar li.active,
.sidebar li:hover {
  background: #f6c3cf;
  color: #fff;
  font-weight: 600;
}

.form-container {
  width: 700px;   /* 원하는 최대 너비로 조정 */
  margin: 0 auto;     /* 중앙 정렬 */
  padding: 48px 56px; /* 패딩도 조금 더 키우기 */
 
}


.info-edit-form .form-group {
  margin-bottom: 28px;
}

.info-edit-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #a1203c;
}

.info-edit-form input[type="text"],
.info-edit-form input[type="tel"] {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e9b7c4;
  border-radius: 8px;
  font-size: 1.05rem;
  background: #fdf6f8;
  transition: border 0.18s;
}

.info-edit-form input:focus {
  outline: none;
  border-color: #a1203c;
}

.update-button {
  background: linear-gradient(90deg, #a1203c 0%, #c53c5f 100%);
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 7px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(161, 32, 60, 0.09);
}

.update-button:hover,
.withdraw-button:hover {
  background: linear-gradient(90deg, #7e1530 0%, #a1203c 100%);
}

.item-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1px solid #f1d5db;
  font-size: 1.02rem;
  color: #a1203c;
  cursor: pointer; /* 클릭 가능 표시 */
  transition: background-color 0.2s;
}
.item-row:hover {
  background-color: #f5f5f5; /* 호버 효과 */
}
.item-title {
  font-weight: 500;
}

.item-date {
  color: #c53c5f;
  font-size: 0.97rem;
}

.pagination button {
  border: none;
  background: #fbe9ed;
  color: #a1203c;
  padding: 7px 15px;
  border-radius: 6px;
  margin: 0 2px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.17s, color 0.17s;
}

.pagination button.active,
.pagination button:hover {
  background: #a1203c;
  color: #fff;
}

.pagination button:disabled {
  background: #f1d5db;
  color: #e9b7c4;
  cursor: not-allowed;
}

.withdraw-form input[type="password"] {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #e9b7c4;
  border-radius: 8px;
  font-size: 1.05rem;
  background: #fdf6f8;
  margin-bottom: 16px;
  transition: border 0.18s;
}

.withdraw-form input:focus {
  outline: none;
  border-color: #a1203c;
}

.withdraw-button {
  background: linear-gradient(90deg, #a1203c 0%, #c53c5f 100%);
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 7px;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 18px;
  transition: background 0.18s;
}

.withdraw-button:disabled {
  background: #f1d5db;
  color: #fff;
  cursor: not-allowed;
}

.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(161, 32, 60, 0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(161, 32, 60, 0.16);
  padding: 36px 48px 28px 48px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.modal-buttons button {
  background: #a1203c;
  color: #fff;
  border: none;
  padding: 10px 28px;
  border-radius: 7px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
}

.modal-buttons button:last-child {
  background: #e9b7c4;
  color: #a1203c;
}

@media (max-width: 800px) {
  .mypage-container {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
  }
  .mypage-content {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1.5px solid #f1d5db;
    display: flex;
    justify-content: center;
    padding: 12px 0;
  }
  .sidebar ul {
    display: flex;
    gap: 10px;
  }
  .sidebar li {
    border-radius: 12px;
    margin-bottom: 0;
    padding: 10px 18px;
  }

}

</style>
