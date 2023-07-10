<script setup lang="ts">
import BellIcon from "../components/icons/BellIcon.vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import dateFormat, { masks } from "dateformat";

import { computed } from "vue";

const userStore = useUserStore();
const surveyStore = useSurveyStore();

let time: String;
let date: String;

const annoucement = computed(() => {
  if (userStore.data.answeredSurvey === null) {
    return "Surveys are closing next week on 03/12/2023.";
  } else if (userStore.data.answeredSurvey.status === "COMPLETE") {
    return "You have submitted your survey. Changes can be made before 00/00/0000.";
  } else {
    return "Your survey is in progress. Surveys are closing next week on 00/00/0000.";
  }
});

if (
  userStore.data.student.meeting != undefined ||
  userStore.data.student.meeting != null
) {
  const datetime = new Date(userStore.data.student.meeting);
  date = dateFormat(datetime, "shortDate");
  time = dateFormat(datetime, "shortTime");
}
</script>

<template>
  <div class="h-[75vh] w-full flex flex-row justify-center items-center">
    <div
      id="left"
      class="w-5/6 flex flex-col justify-center items-center text-center space-y-4 lg:items-start lg:text-left md:w-3/4 lg:max-w-2xl xl:max-w-3xl lg:space-y-6 lg:ml-12"
    >
      <h1 id="name" class="text-5xl font-bold">
        Welcome back,
        <span>{{ userStore.first_name }} {{ userStore.last_name }}</span>
      </h1>
      <div
        id="announcements"
        class="flex justify-center items-center ml-4 lg:ml-0 lg:justify-start"
      >
        <BellIcon />
        <h2 class="text-xl text-left flex ml-2">{{ annoucement }}</h2>
      </div>
      <div
        class="flex flex-col justify-start items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
      >
        <RouterLink to="/schedule">
          <button
            class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s"
          >
            Schedule
          </button>
        </RouterLink>
        <!-- check if survey exists, if not create new and set current -->
        <RouterLink to="/survey">
          <button
            class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s"
          >
            Course Survey
          </button>
        </RouterLink>
      </div>
      <div>
        <p
          v-if="
            userStore.data.student.meeting != undefined ||
            userStore.data.student.meeting != null
          "
        >
          You have a scheduled meeting with your guidance councelor on
          {{ date }} at {{ time }}
        </p>
        <p v-else>Your guidance councelor has not yet set a meeting time.</p>
      </div>
    </div>
    <div
      id="circles"
      class="-z-10 absolute h-96 w-112 sm:h-128 sm:w-128 lg:h-96 lg:w-112 xl:h-128 xl:w-128 hidden lg:flex justify-center items-center lg:relative lg:mx-8"
    >
      <div
        id="big"
        class="h-80 w-80 sm:h-96 sm:w-96 lg:h-80 lg:w-80 xl:h-96 xl:w-96 bg-tertiary-s rounded-full right-32"
      ></div>
      <div
        id="small"
        class="h-32 w-32 sm:h-40 sm:w-40 lg:h-32 lg:w-32 xl:h-40 xl:w-40 absolute bottom-4 left-12 bg-other-s rounded-full"
      ></div>
    </div>
  </div>
</template>
