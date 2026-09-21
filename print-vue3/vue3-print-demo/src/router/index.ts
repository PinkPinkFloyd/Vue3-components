import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/systemSet/printTemplate/index'
  },
  {
    path: '/systemSet/printTemplate/index',
    name: 'PrintIndex',
    component: () => import('@/views/PrintIndex.vue')
  },
  {
    path: '/systemSet/printTemplate/edit',
    name: 'PrintEdit',
    component: () => import('@/views/PrintEdit.vue')
  },
  {
    path: '/systemSet/printTemplate/editPayment',
    name: 'PrintEditPayment',
    component: () => import('@/views/PrintEditPayment.vue')
  },
  {
    path: '/systemSet/hiprintTemplate/design',
    name: 'HiprintDesign',
    component: () => import('@/views/PrintEdit.vue') // Reuse for demo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
