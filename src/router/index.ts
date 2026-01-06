import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../../src/stores/user";
import { useSurveyStore } from "../stores/survey";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: () => import("../views/ErrorView.vue"),
    },
    {
      path: "/",
      name: "home",
      meta: { auth: false },
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: { auth: false },
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/guidance",
      name: "guidance",
      meta: { user: "guidance", auth: true },
      children: [
        {
          path: "dashboard",
          name: "guidanceDash",
          component: () => import("../views/GuidanceDashboard.vue"),
        },
        {
          path: "courselist",
          name: "courseList",
          component: () => import("../views/CourseList.vue"),
        },
        {
          path: "surveylist",
          name: "surveyList",
          component: () => import("../views/SurveyList.vue"),
        },
        {
          path: "editCourse/:id",
          name: "editCourse",
          component: () => import("../views/EditCourse.vue"),
        },
        {
          path: "editSurvey/:grade",
          name: "editSurvey",
          component: () => import("../views/EditSurvey.vue"),
        },
        {
          path: "editQuestion/:id",
          name: "editQuestion",
          component: () => import("../views/EditQuestion.vue"),
        },
        {
          path: "createQuestion",
          name: "createQuestion",
          component: () => import("../views/CreateQuestion.vue"),
        },
        {
          path: "studentlist",
          name: "guidanceStudentlist",
          component: () => import("../views/GuidanceStudentList.vue"),
        },
        {
          path: "survey/:id",
          name: "guidanceSurvey",
          component: () => import("../views/ReviewSurvey.vue"),
          beforeEnter: async (to, from, next) => {
            await useSurveyStore().getSurvey(Number(to.params.id));
            return next();
          },
        },
        {
          path: "calendar",
          name: "calendar",
          component: () => import("../views/GuidanceCalendar.vue"),
          beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();
            if (!userStore.meetingsFetched) await userStore.getMeetings();
            return next();
          },
        },
        {
          path: "statistics",
          name: "statistics",
          component: () => import("../views/GuidanceStats.vue"),
        },
        {
          path: "PrintPage/:id",
          name: "printPage",
          component: () => import("../views/PrintPage.vue"),
          beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();
            if (!userStore.meetingsFetched) await userStore.getMeetings();
            return next();
          },
        },
      ],
    },
    {
      path: "/student",
      name: "student",
      meta: { user: "student", auth: true },
      children: [
        {
          path: "dashboard",
          name: "studentDash",
          component: () => import("../views/StudentDashboard.vue"),
        },
        {
          path: "survey",
          name: "studentSurvey",
          beforeEnter: async (to, from, next) => {
            const surveyStore = useSurveyStore();
            if (!surveyStore.loaded) await surveyStore.getSurvey();
            return next();
          },
          children: [
            {
              path: "",
              name: "openSurvey",
              component: () => import("../views/SurveyPage.vue"),
              beforeEnter: async (to, from, next) =>
                useSurveyStore().open ? next() : next({ name: "closedSurvey" }),
            },
            {
              path: "closed",
              name: "closedSurvey",
              component: () => import("../views/ClosedSurvey.vue"),
              beforeEnter: () =>
                useSurveyStore().open ? { name: "studentSurvey" } : true,
            },
            {
              path: "review",
              name: "reviewSurvey",
              component: () => import("../views/ReviewSurvey.vue"),
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();
  if (!userStore.initComplete) await userStore.init();
  if (to.meta.auth && !userStore.isAuth) return { name: "login" };
  if (!to.meta.auth && userStore.isAuth)
    return { name: `${userStore.isGuidance ? "guidance" : "student"}Dash` };
  if (to.meta.user === "guidance" && !userStore.isGuidance)
    return { name: `error` };
  if (to.meta.user === "student" && userStore.isGuidance)
    return { name: `error` };
});

export default router;
