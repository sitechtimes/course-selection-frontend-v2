import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    // {
    //   path: '/courses',
    //   name: 'course',
    //   component: () => import('../views/CourseCatalog.vue')
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/LoginPage.vue')
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../views/LoginBaseView.vue')
    // },
  ]
})

export default router