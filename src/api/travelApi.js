// src/api/travelApi.js

// 백엔드 Flask 서버의 기본 주소입니다.
const BASE_URL = 'http://localhost:5000/api';

/**
 * (새로 추가된 함수)
 * 백엔드 서버에서 모든 여행지 목록을 가져옵니다.
 * @returns {Promise<Array>} 전체 여행지 목록
 */
export async function fetchAllTravels() {
  // 백엔드의 '/api/destinations/list' 엔드포인트를 호출합니다.
  const res = await fetch(`${BASE_URL}/destinations/list`);

  if (!res.ok) {
    throw new Error(`서버로부터 응답을 받지 못했습니다: ${res.statusText}`);
  }
  return res.json();
}

/**
 * 백엔드 서버에서 카테고리별 여행지 목록을 가져옵니다.
 * @param {object} params - { theme: '카테고리명' } 형식의 객체
 * @returns {Promise<Array>} 여행지 목록
 */
export async function getTravelList(params) {
  const queryString = new URLSearchParams({ type: params.theme }).toString();
  const res = await fetch(`${BASE_URL}/destinations?${queryString}`);
  
  if (!res.ok) {
    throw new Error(`서버로부터 응답을 받지 못했습니다: ${res.statusText}`);
  }
  return res.json();
}

/**
 * 백엔드 서버에서 특정 여행지의 상세 정보를 가져옵니다.
 * @param {string} id - 여행지의 고유 ID (_id)
 * @returns {Promise<object>} 여행지 상세 정보
 */
export async function getTravelDetail(id) {
  const res = await fetch(`${BASE_URL}/destinations/${id}`);

  if (!res.ok) {
    throw new Error(`서버로부터 응답을 받지 못했습니다: ${res.statusText}`);
  }
  return res.json();
}

/**
 * 백엔드 서버에서 랜덤 여행지 정보를 가져옵니다.
 * @returns {Promise<object>} 랜덤 여행지 정보
 */
export async function getRandomTravel() {
  const res = await fetch(`${BASE_URL}/destinations/list`);
  if (!res.ok) {
    throw new Error(`서버로부터 응답을 받지 못했습니다: ${res.statusText}`);
  }
  const allDestinations = await res.json();
  const randomItem = allDestinations[Math.floor(Math.random() * allDestinations.length)];
  return randomItem;
}
