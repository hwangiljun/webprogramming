import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import store from './store'; // Vuex store를 사용할 경우 주석 해제

const app = createApp(App);

app.use(router);
// app.use(store); // Vuex store를 사용할 경우 주석 해제

app.mount('#app');