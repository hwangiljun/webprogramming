<<<<<<< HEAD
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ 이 줄 추가

createApp(App).use(router).mount('#app')
=======
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; 
import router from "./router";

createApp(App).use(store).use(router).mount('#app')
>>>>>>> 815e73e191fb2a52dfe78b00c350f2aa590a956f
