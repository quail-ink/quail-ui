import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { QuailUI } from './index'
import VueQrcode from '@chenfengyuan/vue-qrcode';

const app = createApp(App)
app.use(QuailUI, {
  debug: true,
  useLayout: true,
})
app.component('vue-qrcode', VueQrcode);
app.mount('#app')
