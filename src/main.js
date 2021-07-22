// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts/theme/macarons.js'
Vue.config.productionTip = false

//设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8333/'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.withCredentials = true
const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/admin/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.displayName,
      // iconCls: route.iconCls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

const initAdminMenu = (router, store) => {
  if (store.state.adminMenus.length > 0) {
    return
  }
  // axios.get('user/findAll').then(resp =>{
  //   console.log(resp)
  // })
  axios.get('/menus/menusByUser').then(resp => {
    console.log('获取的到的menus：')
    console.log(resp)
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)

      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

router.beforeEach((to, from, next) => {
    if (store.state.user.username && to.path.startsWith('/manage')) {
      console.log('admin')
      initAdminMenu(router, store)
    }
    // 已登录状态下访问 login 页面直接跳转到后台首页
    if (store.state.username && to.path.startsWith('/login')) {
      console.log('login')
      next({
        path: 'admin/dashboard'
      })
    }
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        next()
      } else {
        next({
          path: '/login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  components: { App },
  template: '<App/>'
})
