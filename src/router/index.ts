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
      path: '/guidance/dashboard',
      name: 'guidanceDash',
      component: () => import('../views/GuidanceHome.vue')
    },
    {
      path: '/guidance-studentlist',
      name: 'Guidance-Studentlist',
      component: () => import('../views/Guidance-StudentList.vue')
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
      path: '/guidanceCalendar',
      name: 'guidanceCalendar',
      component: () => import('../views/GuidanceCalendar.vue')
    },
    {
      path: '/student/dashboard',
      name: 'studentDash',
      component: () => import('../views/dashboard.vue')
    },
  ]
})

export default router