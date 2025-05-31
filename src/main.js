// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ 이 줄 추가

createApp(App).use(router).mount('#app')
