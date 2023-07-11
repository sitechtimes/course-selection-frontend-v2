<script setup lang="ts">
import BellIcon from "../components/icons/BellIcon.vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import { computed, ref, Ref } from "vue";

const userStore = useUserStore();
const surveyStore = useSurveyStore();

let time: String;
let date: String;

const currentDate = new Date()

const closeTime = userStore.data.survey.dueDate.substring(0,10).split("-")

let openMeeting: Ref<boolean> = ref(false)

if (Number(closeTime[0]) > currentDate.getFullYear()) {
  openMeeting.value = true
} else if (Number(closeTime[0]) === currentDate.getFullYear()) {
  if (Number(closeTime[1]) > currentDate.getMonth() + 1) { // Get month starts at 0, not 1
    openMeeting.value = true
  } else if (Number(closeTime[1]) === currentDate.getMonth() + 1) {
    if (Number(closeTime[2]) > currentDate.getDate()) {
      openMeeting.value = true
    }
  }
}

console.log(openMeeting)
// const annoucement = computed(() => {
//   if(userStore.data.answeredSurvey === null) {
//   return "Surveys are closing next week on 03/12/2023."
// } else if(userStore.data.answeredSurvey.status === 'COMPLETE') {
//   return "You have submitted your survey. Changes can be made before 00/00/0000."
// } else {
//   return "Your survey is in progress. Surveys are closing next week on 00/00/0000."
// }
// })

if (
  userStore.data.student.meeting != undefined ||
  userStore.data.student.meeting != null
) {
  const SplitTime = userStore.data.student.meeting.substring(11, 16).split(":"); // Substring is there to get only the time part (2023-05-01T16:09:54+00:00 was the value for meeting)
  if (SplitTime[0] > 12) {
    SplitTime[0] -= 12;
    time = SplitTime.join(":") + " PM";
  } else {
    time = SplitTime.join(":") + " AM";
  }
  const SplitDate = userStore.data.student.meeting.substring(0, 10).split("-");
  SplitDate.splice(0, 3, SplitDate[1], SplitDate[2], SplitDate[0]);
  date = SplitDate.join("/");
}
</script>

<template>
  <div class="h-[75vh] w-full flex flex-row justify-center items-center">
    <div id="left" class="w-5/6 flex flex-col justify-center items-center text-center space-y-4 lg:items-start lg:text-left md:w-3/4 lg:max-w-2xl xl:max-w-3xl lg:space-y-6 lg:ml-12">
      <h1 id="name" class="text-5xl font-bold">
        Welcome back,
        <span>{{ userStore.first_name }} {{ userStore.last_name }}</span>
      </h1>
      <div id="announcements" class="flex justify-center items-center ml-4 lg:ml-0 lg:justify-start">
        <BellIcon />
        <h2 v-if="openMeeting" class="text-xl text-left flex ml-2">Surveys are closing on {{ closeTime[1] }}/{{ closeTime[2] }}/{{ closeTime[0] }}.</h2>
        <h2 v-else class="text-xl text-left flex ml-2">Surveys are closed. Please contact your guidance counselor to request changes.</h2>
      </div>
      <div class="flex flex-col justify-start items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <RouterLink to="/schedule">
          <button class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
            Schedule
          </button>
        </RouterLink>
        <!-- check if survey exists, if not create new and set current -->
        <RouterLink v-if="openMeeting" to="/student/survey">
          <button class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
            Course Survey
          </button>
        </RouterLink>
        <RouterLink v-else to="/survey/closed">
          <button class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
            Course Survey
          </button>
        </RouterLink>
      </div>
      <div>
        <p v-if="userStore.data.student.meeting != undefined || userStore.data.student.meeting != null">You have a scheduled meeting with your guidance councelor on {{ date }} at {{ time }}.</p>
        <p v-else>Your guidance councelor has not scheduled a meeting with you yet.</p>
      </div>
    </div>
    <div id="circles" class="-z-10 absolute h-96 w-112 sm:h-128 sm:w-128 lg:h-96 lg:w-112 xl:h-128 xl:w-128 hidden lg:flex justify-center items-center lg:relative lg:mx-8">
      <div id="big" class="h-80 w-80 sm:h-96 sm:w-96 lg:h-80 lg:w-80 xl:h-96 xl:w-96 bg-tertiary-s rounded-full right-32"></div>
      <div id="small" class="h-32 w-32 sm:h-40 sm:w-40 lg:h-32 lg:w-32 xl:h-40 xl:w-40 absolute bottom-4 left-12 bg-other-s rounded-full"></div>
    </div>
  </div>
</template>
