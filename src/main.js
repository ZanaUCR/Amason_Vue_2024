import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'; // Importa el store en tu aplicación

const app = createApp(App)

app.use(router)
app.use(store); // Usa el store en tu aplicación
app.mount('#app')

