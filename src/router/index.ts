import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Landing.vue')
    },
    // {
    //   path: '/courses',
    //   name: 'course',
    //   component: () => import('../views/CourseCatalog.vue')
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    // {
    //   path: '/survey',
    //   name: 'survey',
    //   component: () => import('../views/SurveyPage.vue')
    // },
  ]
})

export default router