import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import videojs from 'video.js'
import Components from '@/components'
import mitt from 'mitt'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

app.config.globalProperties.$axios = axios
app.config.globalProperties.$video = videojs
app.config.globalProperties.$bus = mitt()
// 注册自定义组件
app.use(ElementPlus)
   .use(Components)
   .use(router)
   .use(store)
   .use(VueLazyload)
   .mount('#app')
