import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/login/student',
      name: 'studentLogin',
      component: () => import('../views/login/student.vue')
    },
    {
      path: '/login/guidance',
      name: 'guidanceLogin',
      component: () => import('../views/login/guidance.vue')
    },
  ]
})

export default router