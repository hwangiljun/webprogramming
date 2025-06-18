<<<<<<< HEAD
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; 
=======
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// store/index.js 파일에서 우리가 만든 store를 가져옵니다.
import store from './store'
>>>>>>> travel

const app = createApp(App)

<<<<<<< HEAD
app.use(router);
app.use(store); 
app.mount('#app');
=======
// .use(store)를 사용하여 Vue 앱 전체에 Store를 등록합니다.
app.use(store)

// .use(router)를 사용하여 라우터도 등록합니다.
app.use(router)

app.mount('#app')
>>>>>>> travel
