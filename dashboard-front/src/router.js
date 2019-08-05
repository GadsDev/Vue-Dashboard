import Vue from 'vue'
import Router from 'vue-router'

// O @ busca na pasta src
import authRoutes from '@/modules/auth/router/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    // eslint-disable-next-line standard/object-curly-even-spacing
    { path: '', redirect: '/login' }
  ]
})
