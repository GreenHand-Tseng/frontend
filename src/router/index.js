import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from "../components/login";
import AdminIndex from "../components/admin/AdminIndex";
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/manage',
      name: 'default',
      component: AdminIndex,
      meta:{
        requireAuth: true
      },
      redirect: '/manageDashboard',
      children: [
        {
          path: '/manageDashboard',
          name: 'ManageDashboard',
          component: () => import('../components/admin/index'),
          meta: {
            requireAuth: true
          }
        }
      ]

    }
  ]
})
export const createRouter = routes => new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/manage',
      name: 'default',
      component: AdminIndex,
      meta: {
        requireAuth: true
      },
      redirect: '/manageDashboard',
      children: [
        {
          path: '/manageDashboard',
          name: 'ManageDashboard',
          component: () => import('../components/admin/index'),
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
