import { createRouter, createWebHistory } from 'vue-router';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/landing.vue')
    },
    {
      path: '/guidance-home',
      name: 'GuidanceHome',
      component: () => import('../views/GuidanceHome.vue')
    },
    // {
    //   path: '/courses',
    //   name: 'course',
    //   component: () => import('../views/CourseCatalog.vue')
    // },

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
    {
      path: '/survey',
      name: 'survey',
      component: () => import('../views/SurveyPage.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/GuidanceCalendar.vue')
    },
  ]
})

export default router