import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { QuailUI } from './index'

const app = createApp(App)
app.use(QuailUI, {
  debug: true,
})
app.mount('#app')
