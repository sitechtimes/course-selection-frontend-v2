import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/landing.vue')
    }, {
      path: '/survey',
      name: 'survey',
      component: () => import('../views/SurveyPage.vue')
    }
  ]
})

export default router