import './assets/main.scss'
import '@/request/axios'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(createPinia())

app.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
