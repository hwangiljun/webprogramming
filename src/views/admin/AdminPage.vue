<template>
  <div class="admin-container">
    <header class="admin-header">
      <h1>관리자 페이지</h1>
    </header>

    <div class="admin-content">
      <aside class="sidebar">
        <ul>
          <li @click="selectMenu('place-manager')" :class="{ active: selectedMenu === 'place-manager' }">여행지 관리</li>
          <li @click="selectMenu('review-manager')" :class="{ active: selectedMenu === 'review-manager' }">리뷰 관리</li>
          <li @click="selectMenu('user-manager')" :class="{ active: selectedMenu === 'user-manager' }">회원 관리</li>
        </ul>
      </aside>

      <!-- 여행지 관리 -->
      <section v-if="selectedMenu === 'place-manager'" class="section-container">
        <h2>여행지 추가/삭제</h2>
        <form @submit.prevent="addPlace" class="add-form">
          <input v-model="newPlace" placeholder="여행지 이름 입력" />
          <button type="submit" :disabled="isPlaceAdding">추가</button>
        </form>
        <ul class="item-list">
          <li v-for="place in places" :key="place.id" class="item-row">
            <span>{{ place.name }}</span>
            <button @click="deletePlace(place.id)" :disabled="isPlaceDeleting === place.id">삭제</button>
          </li>
        </ul>
      </section>

      <!-- 리뷰 관리 -->
      <section v-if="selectedMenu === 'review-manager'" class="section-container">
        <h2>리뷰 삭제</h2>
        <ul class="item-list">
          <li v-for="review in reviews" :key="review.id" class="item-row">
            <span>{{ review.title }} - {{ review.user }}</span>
            <button @click="deleteReview(review.id)" :disabled="isReviewDeleting === review.id">삭제</button>
          </li>
        </ul>
      </section>

      <!-- 회원 관리 -->
      <section v-if="selectedMenu === 'user-manager'" class="section-container">
        <h2>회원 관리</h2>
        <ul class="item-list">
          <li v-for="user in users" :key="user.id" class="item-row">
            <span>{{ user.name }} ({{ user.email }})</span>
            <button @click="deleteUser(user.id)" :disabled="isUserDeleting === user.id">삭제</button>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import {
  fetchPlaces, addPlace as apiAddPlace, deletePlace as apiDeletePlace,
  fetchReviews, deleteReview as apiDeleteReview,
  fetchUsers, deleteUserByAdmin
} from "@/api/apiMethod";

export default {
  data() {
    return {
      selectedMenu: "place-manager",
      newPlace: "",
      places: [],
      reviews: [],
      users: [],
      isPlaceAdding: false,
      isPlaceDeleting: null,
      isReviewDeleting: null,
      isUserDeleting: null,
    };
  },
  created() {
    this.loadCurrent();
  },
  watch: {
    selectedMenu() {
      this.loadCurrent();
    }
  },
  methods: {
    selectMenu(menu) {
      this.selectedMenu = menu;
    },
    // 데이터 로딩
   
    loadCurrent() {
      if (this.selectedMenu === "place-manager") this.loadPlaces();
      if (this.selectedMenu === "review-manager") this.loadReviews();
      if (this.selectedMenu === "user-manager") this.loadUsers();
    },
    async loadPlaces() {
      try {
        const res = await fetchPlaces();
        this.places = res.content || res;
      } catch (e) {
        alert("여행지 목록을 불러오지 못했습니다.");
      }
    },
    async loadReviews() {
      try {
        const res = await fetchReviews();
        this.reviews = res.content || res;
      } catch (e) {
        alert("리뷰 목록을 불러오지 못했습니다.");
      }
    },
    async loadUsers() {
      try {
        const res = await fetchUsers();
        this.users = res.content || res;
      } catch (e) {
        alert("회원 목록을 불러오지 못했습니다.");
      }
    },
    // 여행지 추가
    async addPlace() {
      if (!this.newPlace.trim()) return;
      this.isPlaceAdding = true;
      try {
        await apiAddPlace({ name: this.newPlace });
        this.newPlace = "";
        await this.loadPlaces();
      } catch (e) {
        alert("여행지 추가에 실패했습니다.");
      } finally {
        this.isPlaceAdding = false;
      }
    },
    // 여행지 삭제
    async deletePlace(id) {
      if (!confirm("정말로 삭제하시겠습니까?")) return;
      this.isPlaceDeleting = id;
      try {
        await apiDeletePlace(id);
        await this.loadPlaces();
      } catch (e) {
        alert("여행지 삭제에 실패했습니다.");
      } finally {
        this.isPlaceDeleting = null;
      }
    },
    // 리뷰 삭제
    async deleteReview(id) {
      if (!confirm("정말로 삭제하시겠습니까?")) return;
      this.isReviewDeleting = id;
      try {
        await apiDeleteReview(id);
        await this.loadReviews();
      } catch (e) {
        alert("리뷰 삭제에 실패했습니다.");
      } finally {
        this.isReviewDeleting = null;
      }
    },
    // 회원 삭제
    async deleteUser(id) {
      if (!confirm("정말로 삭제하시겠습니까?")) return;
      this.isUserDeleting = id;
      try {
        await deleteUserByAdmin(id);
        await this.loadUsers();
      } catch (e) {
        alert("회원 삭제에 실패했습니다.");
      } finally {
        this.isUserDeleting = null;
      }
    },
  },
};
</script>

<style scoped>
.admin-container {
  max-width: 1000px;
  margin: 40px auto 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(161, 32, 60, 0.09);
  overflow: hidden;
  font-family: 'Pretendard', 'Noto Sans KR', Arial, sans-serif;
}

.admin-header {
  background: linear-gradient(90deg, #a1203c 0%, #c53c5f 100%);
  color: #fff;
  padding: 28px 0 24px 32px;
  border-bottom: 1.5px solid #f1d5db;
}

.admin-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.admin-content {
  display: flex;
  min-height: 500px;
}

.sidebar {
  width: 200px;
  background: #fbe9ed;
  border-right: 1.5px solid #f1d5db;
  padding: 28px 0 0 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 14px 24px;
  font-size: 1.07rem;
  color: #a1203c;
  cursor: pointer;
  border-radius: 0 18px 18px 0;
  margin-bottom: 6px;
  transition: background 0.18s, color 0.18s;
}

.sidebar li.active,
.sidebar li:hover {
  background: #f6c3cf;
  color: #fff;
  font-weight: 600;
}

.section-container {
  padding: 36px 48px;
  width: 100%;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.add-form input {
  flex: 1;
  padding: 10px 12px;
  border: 1.5px solid #e9b7c4;
  border-radius: 7px;
  font-size: 1.05rem;
  background: #fdf6f8;
  transition: border 0.18s;
}

.add-form input:focus {
  outline: none;
  border-color: #a1203c;
}

.add-form button {
  background: #a1203c;
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
}

.add-form button:disabled {
  background: #e9b7c4;
  color: #fff;
  cursor: not-allowed;
}

.add-form button:hover:enabled {
  background: #7e1530;
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
}

.item-row button {
  background: #c53c5f;
  color: #fff;
  border: none;
  padding: 6px 18px;
  border-radius: 6px;
  font-size: 0.97rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.18s;
}

.item-row button:disabled {
  background: #e9b7c4;
  color: #fff;
  cursor: not-allowed;
}

.item-row button:hover:enabled {
  background: #a1203c;
}

@media (max-width: 800px) {
  .admin-container {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
  }
  .admin-content {
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
  .section-container {
    padding: 24px 10px;
  }
}
</style>
