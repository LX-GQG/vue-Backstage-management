import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login.vue'
import Register from '@/views/register.vue'
import Loginup from '@/views/loginup.vue'
import Terms from '@/views/terms.vue'
import Home from '@/views/home.vue'
import Index from '@/views/user/index.vue'
import Good from '@/views/user/good.vue'
import Cust from '@/views/user/cust.vue'
import Provider from '@/views/user/provider.vue'
import ECharts from '@/views/user/Echarts.vue'
import Profit from '@/views/user/profit.vue'
import Report from '@/views/user/report.vue'
import IndexMain from '@/views/web/IndexMain.vue'
import IndexHome from '@/views/web/IndexHome.vue'
import IndexPhone from '@/views/web/IndexPhone.vue'
import IndexFooter from '@/views/web/IndexFooter.vue'
import AppTop from '@/views/web/AppTop.vue'
import IndexXingq from '@/views/web/IndexXingq.vue'
import { time } from 'echarts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login,
      name: 'Login',
      meta: {
        title: '首页',
        keepAlive: true
      },
      children: [
        {
          path: '/',
          component: Loginup,
          name: 'Loginup'
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '首页',
        keepAlive: true
      },
      children: [
        {
          path: '/',
          component: Loginup,
          name: 'Loginup',
          meta: {
            title: '登录',
            keepAlive: true
          }
        },
        {
          path: 'register',
          component: Register,
          name: 'Register',
          meta: {
            title: '注册',
            keepAlive: true
          }
        },
        {
          path: 'loginup',
          component: Loginup,
          name: 'Loginup'
        }
      ]
    },
    {
      path: '/Terms',
      component: Terms,
      name: 'terms',
      meta: {
        title: '关于我们',
        keepAlive: true
      }
    },
    {
      path: '/Home',
      component: Home,
      name: 'home',
      meta: {
        title: '农产品进销存管理',
        requireAuth: true
      },
      redirect: '/Index',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: () => import('@/views/user/index'),
          meta: {
            title: '首页',
            requireAuth: true
          }
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/user/home'),
          meta: {
            title: '用户管理',
            requireAuth: true
          }
        },
        {
          path: '/good',
          name: 'Good',
          component: () => import('@/views/user/good'),
          meta: {
            title: '商品管理',
            requireAuth: true
          }
        },
        {
          path: '/cust',
          name: 'Cust',
          component: () => import('@/views/user/cust'),
          meta: {
            title: '客户管理',
            requireAuth: true
          }
        },
        {
          path: '/provider',
          name: 'Provider',
          component: () => import('@/views/user/provider'),
          meta: {
            title: '供应商管理',
            requireAuth: true
          }
        },
        {
          path: '/stock',
          name: 'Stock',
          component: () => import('@/views/user/stock'),
          meta: {
            title: '进货管理',
            requireAuth: true
          }
        },
        {
          path: '/refund',
          name: 'Refund',
          component: () => import('@/views/user/refund'),
          meta: {
            title: '进货退货管理',
            requireAuth: true
          }
        },
        {
          path: '/sale',
          name: 'Sale',
          component: () => import('@/views/user/sale'),
          meta: {
            title: '销售管理',
            requireAuth: true
          }
        },
        {
          path: '/rtsale',
          name: 'Rtsale',
          component: () => import('@/views/user/rtsale'),
          meta: {
            title: '商品退货管理',
            requireAuth: true
          }
        },
        {
          path: '/report',
          name: 'Report',
          component: () => import('@/views/user/report'),
          meta: {
            title: '统计报表',
            requireAuth: true
          }
        },
        {
          path: '/profit',
          name: 'Profit',
          component: () => import('@/views/user/profit'),
          meta: {
            title: '报表',
            requireAuth: true
          }
        },
        {
          path: '/sildeshow',
          name: 'Sildeshow',
          component: () => import('@/views/user/sildeshow'),
          meta: {
            title: '轮播图',
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/indexMain',
      name: 'IndexMain',
      component: () => import('@/views/web/IndexMain'),
      meta: {
        title: '农产品商城首页'
      }
    },
    {
      path: '/indexHome',
      name: 'IndexHome',
      component: () => import('@/views/web/IndexHome')
    },
    {
      path: '/indexPhone',
      name: 'IndexPhone',
      component: () => import('@/views/web/IndexPhone')
    },
    {
      path: '/indexFooter',
      name: 'IndexFooter',
      component: () => import('@/views/web/IndexFooter')
    },
    {
      path: '/appTop',
      name: 'AppTop',
      component: () => import('@/views/web/AppTop')
    },
    {
      path: '/indexXingq/:commid',
      name: 'IndexXingq',
      component: () => import('@/views/web/IndexXingq')
    },
    {
      path: '/indexSearch',
      name: 'IndexSearch',
      component: () => import('@/views/web/IndexSearch')
    },
    {
      path: '/ball',
      name: 'Ball',
      component: () => import('@/views/web/ball')
    }
  ]
})
