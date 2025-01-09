import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../../src/stores/user";
import { useSurveyStore } from "../stores/survey";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomePage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/guidance",
      name: "guidance",
      meta: { user: "guidance" },
      children: [
        {
          path: "dashboard",
          name: "guidanceDash",
          component: () => import("../views/GuidanceDashboard.vue"),
        },
        {
          path: "studentlist",
          name: "guidanceStudentlist",
          component: () => import("../views/GuidanceStudentList.vue"),
        },
        {
          path: "survey/:id",
          name: "guidanceSurvey",
          component: () => import("../views/GuidanceSurvey.vue"),
          beforeEnter: async (to, from, next) => {
            await useSurveyStore().getSurvey(Number(to.params.id));
            return next();
          },
        },
        {
          path: "calendar",
          name: "calendar",
          component: () => import("../views/GuidanceCalendar.vue"),
        },
        {
          path: "statistics",
          name: "statistics",
          component: () => import("../views/GuidanceStats.vue"),
        },
        {
          path: "PrintPage/:email",
          name: "printPage",
          component: () => import("../views/PrintPage.vue"),
        },
      ],
    },
    {
      path: "/student",
      name: "student",
      meta: { user: "student" },
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
  const anonPaths = ["/", "/login"];
  if (!userStore.initComplete) await userStore.init();
  if (!anonPaths.includes(to.path) && !userStore.isAuth)
    return { name: "login" };
  if (anonPaths.includes(to.path) && userStore.isAuth)
    return { name: `${userStore.isGuidance ? "guidance" : "student"}Dash` };
  if (to.meta.user === "guidance" && !userStore.isGuidance)
    return { name: `studentDash` };
  if (to.meta.user === "student" && userStore.isGuidance)
    return { name: `guidanceDash` };
});

export default router;
