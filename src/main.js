import Vue from 'vue'
import App from './App'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import imgZoom from 'vue2.0-zoom'
// 引入Echarts
import * as echarts from 'echarts'

import VueParticles from 'vue-particles'

Vue.use(VueParticles)

Vue.prototype.$echarts = echarts

var axios = require('axios')
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
// 设置反向代理，前端请求默认发送到 http://localhost:8888/api
axios.defaults.baseURL = 'http://localhost:8088/api'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(ElementUI)

// 钩子函数
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title === undefined ? '农产品进销存管理' : to.meta.title
  // 路由需要认证
  if (to.meta.requireAuth) {
    // 判断store里是否有token
    if (store.state.token) {
      next()
    } else {
      next({
        path: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
