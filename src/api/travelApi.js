const BASE_URL = 'http://localhost:5000/api/travel'  // 백엔드 주소는 필요 시 수정

export async function getRandomTravel() {
  const res = await fetch(`${BASE_URL}/random`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export async function getTravelList(params) {
  const queryString = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}/list?${queryString}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export async function getTravelDetail(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}
