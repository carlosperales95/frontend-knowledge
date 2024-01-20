// import { BootstrapVue } from 'bootstrap-vue';
import { createPinia } from "pinia";
// import Vue, { createApp } from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './router.js';

// import BootstrapVue from 'bootstrap-vue';

// import 'bootstrap-vue/dist/bootstrap-vue.css';
// import 'bootstrap/dist/css/bootstrap.css';

// Vue.use(BootstrapVue);

const app = createApp(App);

app.use(router);

app.use(createPinia());


app.mount('#app')