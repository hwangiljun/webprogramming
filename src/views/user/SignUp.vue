<template>
  <div class="signup-container">
    <div class="signup-box">
      <h2>회원가입</h2>
      <form @submit.prevent="onRegister">
        <input 
          type="email" 
          v-model="email" 
          placeholder="이메일" 
          class="input-field"
        />
        <input 
          type="password" 
          v-model="password" 
          placeholder="비밀번호" 
          class="input-field"
        />
        <input 
          type="password" 
          v-model="confirmPassword" 
          placeholder="비밀번호 확인" 
          class="input-field"
        />
        <input 
          type="text" 
          v-model="name" 
          placeholder="이름" 
          class="input-field"
        />
        <input 
          type="tel" 
          v-model="phone" 
          placeholder="전화번호" 
          class="input-field"
        />
        <button type="submit" class="signup-button">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/apiMethod';

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
    };
  },
  methods: {
    async onRegister() {
      if (this.password !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        await registerUser({
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
        });

        alert('회원가입이 완료되었습니다!');
        this.$router.push('/login');
      } catch (error) {
        alert(error.message || '회원가입 중 문제가 발생했습니다.');
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px ;
  background-color: #f5f5f5;
}

.signup-box {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

.signup-box h2 {
  margin-bottom: 20px;
}

.input-field {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.signup-button {
  width: calc(100% - 20px);
  padding: 10px;
  background-color: #b22222;
  color: white;
  border-radius: 4px;
}
</style>
