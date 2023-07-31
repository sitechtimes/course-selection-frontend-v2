<script setup lang="ts">
import BellIcon from "../components/icons/BellIcon.vue";
import { useUserStore } from "../stores/user";
import { useSurveyStore } from "../stores/survey";
import { useStudentStore } from "../stores/student";
import dateFormat from "dateformat";
import { computed, ref, Ref, watch } from "vue";

document.title = 'Dashboard | SITHS Course Selection'

const userStore = useUserStore();
const surveyStore = useSurveyStore();
const studentStore = useStudentStore();

let time: String;
let date: String;
let closeTime: String 

if(studentStore.student.homeroom === '') {
  console.log('student profile not updated')
} else {
  closeTime = studentStore.survey.dueDate.substring(0,10).split("-")
}

if (
  studentStore.student.meeting != undefined ||
  studentStore.student.meeting != null
) {
  const datetime = new Date(studentStore.student.meeting);
  date = dateFormat(datetime, "shortDate");
  time = dateFormat(datetime, "shortTime");
}

</script>

<template>
  <div class="h-[75vh] w-full flex flex-row justify-center items-center">
    <div v-if="studentStore.student.homeroom === ''" id="left" class="w-5/6 flex flex-col justify-center items-center text-center space-y-4 lg:items-start lg:text-left md:w-3/4 lg:max-w-2xl xl:max-w-3xl lg:space-y-6 lg:ml-12">
      <h2 id="name" class="text-5xl font-bold">Welcome, {{ userStore.first_name }}.</h2>
      <div id="announcements" class="text-xl text-center flex ml-2 md:text-left">Thank you for signing up. Your account information is in the process of being updated. Please come back later.</div>
      <!-- <RouterLink to="/schedule">
          <button
            class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s"
          >
            Courses
          </button>
        </RouterLink> -->
    </div>
    <div v-else id="left" class="w-5/6 flex flex-col justify-center items-center text-center space-y-4 lg:items-start lg:text-left md:w-3/4 lg:max-w-2xl xl:max-w-3xl lg:space-y-6 lg:ml-12">
      <h1 id="name" class="text-5xl font-bold">
        Welcome back,
        <span>{{ userStore.first_name }} {{ userStore.last_name }}</span>
      </h1>
      <div id="announcements" class="flex justify-center items-center ml-4 lg:ml-0 lg:justify-start">
        <BellIcon />
        <h2 v-if="surveyStore.open" class="text-xl text-left flex ml-2">Surveys are closing on {{ closeTime[1] }}/{{ closeTime[2] }}/{{ closeTime[0] }}.</h2>
        <h2 v-else class="text-xl text-left flex ml-2">The due date for completion has passed. Please contact your guidance counselor to request changes.</h2>
      </div>

      <!-- survey status -->
      <div v-if="studentStore.answeredSurvey.length === 0" class="text-[#461616] bg-[#EA9F9F] font-semibold text-center p-3 lg:px-6 lg:text-base text-sm rounded-md">Survey Status:
        <span class="font-medium">Not Started</span>
      </div>
      <div v-else-if="studentStore.answeredSurvey[0].status === 'COMPLETE'" class="text-[#174616] bg-[#A8D480]  font-semibold text-center p-3 lg:px-6 lg:text-base text-sm rounded-md">Survey Status:
        <span class="font-medium">Submitted</span>
      </div>
      <div v-else="studentStore.answeredSurvey[0].status === 'INCOMPLETE'" class="text-[#461616] bg-[#F9D477] font-semibold text-center p-3 lg:px-6 lg:text-base text-sm rounded-md">Survey Status:
        <span class="font-medium">In Progress</span>
      </div>
      

      <div>
        <div class="flex flex-col justify-start items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
          <RouterLink to="/schedule">
            <button class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s">Courses</button>
          </RouterLink>
          <!-- check if survey exists, if not create new and set current -->
          <RouterLink v-if="surveyStore.open" to="/student/survey">
            <button class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
              Course Survey
            </button>
          </RouterLink>
          <RouterLink v-else to="/student/survey/closed">
            <button class="bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s">
              View Survey
            </button>
          </RouterLink>
        </div>
          <p v-if="studentStore.student.meeting != undefined || studentStore.student.meeting != null">You have a scheduled meeting with your guidance councelor on {{ date }} at {{ time }}.</p>
          <p v-else>Your guidance councelor has not scheduled a meeting with you yet.</p>
      </div>
    </div>
    <div id="circles" class="-z-10 absolute h-96 w-112 sm:h-128 sm:w-128 lg:h-96 lg:w-112 xl:h-128 xl:w-128 hidden lg:flex justify-center items-center lg:relative lg:mx-8">
      <div id="big" class="h-80 w-80 sm:h-96 sm:w-96 lg:h-80 lg:w-80 xl:h-96 xl:w-96 bg-tertiary-s rounded-full right-32"></div>
      <div id="small" class="h-32 w-32 sm:h-40 sm:w-40 lg:h-32 lg:w-32 xl:h-40 xl:w-40 absolute bottom-4 left-12 bg-other-s rounded-full"></div>
    </div>
  </div>
</template>
