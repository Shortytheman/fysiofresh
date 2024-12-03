
import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import App from './App.vue';
import { createVuetify } from 'vuetify';  // Use Vuetify with Vue 3
import 'vuetify/styles';
import './style.css'

const vuetify = createVuetify();  // Create Vuetify instance

const app = createApp(App);
app.use(vuetify);

app.mount('#app');
