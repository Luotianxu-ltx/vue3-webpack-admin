import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store,{ Key } from '@/store'
import I18n from '@/lang/index'
import '@/static/scss/main.scss'
import 'element-plus/dist/index.css'
import '@/router/permission'

const app = createApp(App)
app.use(store,Key)
app.use(I18n)
app.config.globalProperties.$I18n = I18n
app.use(router)
app.mount('#app')
