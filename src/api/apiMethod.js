   // 회원가입

   export const registerUser = async (userData) => {
    const response = await fetch('http://localhost:8081/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
  
    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }
    return await response.json();
  };

   // 로그인

 export const loginUser = async (loginData) => {
  const response = await fetch('http://localhost:8081/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
  }
  return await response.json();
};