// 회원가입
export const registerUser = async (userData) => {
  const response = await fetch('http://127.0.0.1:5000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다.');
  }
  return await response.json();
};

// 로그인
export const loginUser = async (loginData) => {
  const response = await fetch('http://127.0.0.1:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
  }
  return await response.json();
};

// 로그인 복원
export const fetchCurrentUser = async () => {
  const res = await fetch('http://127.0.0.1:5000/api/me', {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('로그인 정보 없음');
  return await res.json();
};

// 회원 정보 수정
export const updateUserInfo = async (data) => {
  const res = await fetch('http://127.0.0.1:5000/api/user/update', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('회원정보 수정 실패');
  return await res.json();
};

// 내가 쓴 리뷰 조회
export const fetchMyReviews = async () => {
  const res = await fetch('http://127.0.0.1:5000/api/reviews/user/<string:user_id>', { method: 'GET', credentials: 'include' });
  if (!res.ok) throw new Error('내 리뷰 조회 실패');
  return await res.json();
};

// 추천받은 여행지 조회
export const fetchMyRecommends = async () => {
  const res = await fetch('http://127.0.0.1:5000', { method: 'GET', credentials: 'include' });
  if (!res.ok) throw new Error('추천 여행지 조회 실패');
  return await res.json();
};

// 회원 탈퇴
export const deleteUser = async ({ password }) => {
  const res = await fetch('http://127.0.0.1:5000/api/user/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password })
  });
  if (!res.ok) throw new Error('회원 탈퇴 실패');
  return await res.json();
};

// 여행지 목록 불러오기
export const fetchPlaces = async () => {
  const res = await fetch('http://127.0.0.1:5000/api/destinations/list', {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('여행지 목록 조회 실패');
  return await res.json();
};

// 여행지 추가
export const addPlace = async (data) => {
  const res = await fetch('http://127.0.0.1:5000/api/destinations/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('여행지 추가 실패');
  return await res.json();
};

// 여행지 삭제
export const deletePlace = async () => {
  const res = await fetch(`http://127.0.0.1:5000/api/destinations/delete/<string:dest_id>`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('여행지 삭제 실패');
  // 성공 시 별도의 반환값 없음
};

// 리뷰 목록 불러오기
export const fetchReviews = async () => {
  const res = await fetch('http://127.0.0.1:5000', {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('리뷰 목록 조회 실패');
  return await res.json();
};
// 여행지별 리뷰 목록 불러오기
export const getReviews = async (dest_id) => {
  const res = await fetch(`http://127.0.0.1:5000/api/reviews?dest_id=${dest_id}`, {
    credentials: 'include'
  });
  if (!res.ok) throw new Error('리뷰 목록 조회 실패');
  return await res.json();
};

// 리뷰 등록
export const createReview = async ({ user_id, dest_id, content }) => {
  const res = await fetch('http://127.0.0.1:5000/api/reviews/create', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, dest_id, content })
  });
  if (!res.ok) throw new Error('리뷰 등록 실패');
  return await res.json();
};
// 리뷰 삭제
export const deleteReview = async (review_id) => {
  const res = await fetch(`http://127.0.0.1:5000/api/reviews/${review_id}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('리뷰 삭제 실패');
};
// 리뷰 수정
export const updateReview = async (review_id, content) => {
  const res = await fetch(`http://127.0.0.1:5000/api/reviews/${review_id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content })
  });
  if (!res.ok) throw new Error('리뷰 수정 실패');
  return await res.json();
};


// 회원 목록 불러오기
export const fetchUsers = async () => {
  const res = await fetch('http://127.0.0.1:5000', {
    method: 'GET',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('회원 목록 조회 실패');
  return await res.json();
};

// 관리자 회원 삭제
export const deleteUserByAdmin = async () => {
  const res = await fetch(`http://127.0.0.1:5000`, {
    method: 'DELETE',
    credentials: 'include'
  });
  if (!res.ok) throw new Error('회원 삭제 실패');
  // 성공 시 별도의 반환값 없음
};

