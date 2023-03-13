import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/css/base.css';
import App from './App.vue';
import vue3GoogleLogin from 'vue3-google-login'

import router from './router';
const app = createApp(App);
const pinia = createPinia();

app.use(vue3GoogleLogin, {
    clientId: '1064512805688-c7iv9ruoti9j37emoo638csn29objjcn.apps.googleusercontent.com'
  })

app.use(pinia).use(router).mount('#app');