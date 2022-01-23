import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store,{ Key } from '@/store'
import I18n from '@/lang/index'
import '@/mock/index'
import '@/assets/scss/main.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store,Key)
app.use(I18n)
app.config.globalProperties.$I18n = I18n
app.use(router)
app.mount('#app')
