import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../../src/stores/user";
import { useSurveyStore } from "../stores/survey";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LandingPage.vue"),
      beforeEnter: (to) => {
        const userStore = useUserStore();

        if (userStore.isLoggedIn && userStore.userType === 'student') {
          return { name: "studentDash" }
        } else if(userStore.isLoggedIn && userStore.userType === 'guidance') {
          return { name: "guidanceDash" }
        } 
      }
    },
    {
      path: "/guidance/dashboard",
      name: "guidanceDash",
      component: () => import("../views/GuidanceHome.vue"),
      beforeEnter: (to) => {
        const userStore = useUserStore();

        if (userStore.userType === 'student') {
          return { name: "studentDash" };
        }
      }
    },
    {
      path: '/guidance/studentlist',
      name: 'guidanceStudentlist',
      component: () => import('../views/GuidanceStudentList.vue'),
      beforeEnter: (to) => {
        const userStore = useUserStore();

        if (userStore.userType === 'student') {
          return { name: "studentDash" };
        }
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/index.vue"),
    },
    {
      path: "/student/survey",
      name: "studentSurvey",
      component: () => import("../views/SurveyPage.vue"),
      beforeEnter: (to) => {
        const userStore = useUserStore();
        const surveyStore = useSurveyStore()

        if (userStore.userType === 'guidance') {
          return { name: "guidanceStudentlist" };
        }

        if (userStore.data.answeredSurvey[0] != undefined && userStore.userType === 'student' && userStore.data.answeredSurvey[0].status === "COMPLETE") {
          return { name: "reviewSurvey" };
        }

        if(!surveyStore.open) {
          return { name: "closedSurvey" }
        }
      }
    },
    {
      path: '/student/survey/closed',
      name: 'closedSurvey',
      component: () => import('../views/ClosedSurvey.vue'),
      beforeEnter: (to) => {
        const userStore = useUserStore();
        const surveyStore = useSurveyStore()

        if (userStore.userType === 'guidance') {
          return { name: "guidanceStudentlist" };
        }

        if (surveyStore.open === true) {
          return { name: "studentSurvey" };
        }
      }
    },
    {
      path: '/student/survey/review',
      name: 'reviewSurvey',
      component: () => import('../views/ReviewSurvey.vue'),
      beforeEnter: (to) => {
        const userStore = useUserStore();
        const surveyStore = useSurveyStore()

        if (userStore.userType === 'guidance') {
          return { name: "guidanceStudentlist" };
        }

        if(!surveyStore.open) {
          return { name: "closedSurvey" }
        }
      }
    },
    {
      path: '/student/dashboard',
      name: 'studentDash',
      component: () => import('../views/StudentDashboard.vue'),
      beforeEnter: (to) => {
        const userStore = useUserStore();

        if (userStore.userType === 'guidance') {
          return { name: "guidanceDash" };
        }
      }
    },
    {
      path: '/guidance/survey/:email',
      name: 'guidanceSurvey',
      component: () => import('../views/GuidanceSurvey.vue'),
      beforeEnter: (to) => {
        const userStore = useUserStore();

        if (userStore.userType === 'student') {
          return { name: "studentDash" };
        }
      }
    },
    {
      path: '/guidance/calendar',
      name: 'calendar',
      component: () => import('../views/GuidanceCalendar.vue'),
      beforeEnter: (to) => {
        const userStore = useUserStore();

        if (userStore.userType === 'student') {
          return { name: "studentDash" };
        }
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/CalTest.vue')
      
    }
  ]
})

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  const loggedIn = userStore.isLoggedIn;

  const publicPages = ["/", "/login", '/test'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !loggedIn) {
    return { name: "login" };
  }
});

export default router;
