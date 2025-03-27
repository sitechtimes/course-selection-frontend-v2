<template>
  <div class="h-[75vh] w-full flex flex-row justify-center items-center">
    <div
      v-if="!userStore.student.grade"
      id="left"
      class="w-5/6 flex flex-col justify-center items-center text-center space-y-4 lg:items-start lg:text-left md:w-3/4 lg:max-w-2xl xl:max-w-3xl lg:space-y-6 lg:ml-12"
    >
      <h2 id="name" class="text-5xl font-bold">
        Welcome,
        {{ `${userStore.firstName} ${userStore.lastName}` }}
      </h2>
      <div
        id="announcements"
        class="text-xl text-center flex ml-2 md:text-left"
      >
        Thank you for signing up. Your account information is in the process of
        being updated. Please come back later.
      </div>
    </div>
    <div
      v-else
      id="left"
      class="w-5/6 flex flex-col justify-center items-center text-center space-y-4 lg:items-start lg:text-left md:w-3/4 lg:max-w-2xl xl:max-w-3xl lg:space-y-6 lg:ml-12"
    >
      <h1 id="name" class="text-3xl sm:text-4xl md:text-5xl font-bold">
        Welcome back,
        <span class="text-3xl sm:text-4xl md:text-5xl font-bold">{{
          `${userStore.firstName} ${userStore.lastName}`
        }}</span>
      </h1>
      <div
        id="announcements"
        class="text-lg md:text-xl text-left flex justify-center items-center ml-4 lg:ml-0 lg:justify-start flex-col"
      >
        🔔
        <h2 v-if="surveyStore.open">Surveys are closing on {{ closeDate }}.</h2>
        <h2 v-else-if="userStore.student.status === 'Finalized'">
          Your guidance counselor has finalized your survey. If you wish to make
          changes, please contact them.
        </h2>
        <h2 v-else>
          The due date for completion has passed. Please contact your guidance
          counselor to request changes.
        </h2>
        <h2>
          Please note the hours of operation: Mon-Fri 6:00AM-8:00PM EST
        </h2>
      </div>

      <!-- survey status -->
      <div
        v-if="userStore.student.status"
        :class="statusStyles[userStore.student.status]"
        class="font-semibold text-center p-3 lg:px-6 lg:text-base text-sm rounded-md"
      >
        Survey Status:
        <span class="font-medium">{{ userStore.student.status }}</span>
      </div>

      <div>
        <div
          class="flex flex-col justify-start items-center mb-2 lg:flex-row lg:space-y-0 lg:space-x-4"
        >
          <a
            href="https://siths-catalog.netlify.app/"
            target="_blank"
            rel="noopener"
            class="font-semibold"
            ><button
              class="mb-2 lg:m-0 bg-primary-s w-48 h-14 rounded-md text-xl hover:bg-other-s"
            >
              Course Info
            </button></a
          >
          <!-- check if survey exists, if not create new and set current -->
          <RouterLink v-if="surveyStore.open" to="/student/survey">
            <button
              class="mb-2 lg:m-0 bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s"
            >
              Course Survey
            </button>
          </RouterLink>
          <RouterLink v-else to="/student/survey/closed">
            <button
              class="mb-2 lg:m-0 bg-primary-s w-48 h-14 rounded-md text-xl font-semibold hover:bg-other-s"
            >
              View Survey
            </button>
          </RouterLink>
        </div>
        <p>
          For bug reports:
          <a href="https://forms.gle/ah6hrVh1ffMUtc9u7" class="text-blue-500"
            >Click Here</a
          >
        </p>
        <p
          v-if="
            userStore.student.meetingDate != null &&
            new Date(userStore.student.meetingDate).getTime() >
              new Date().getTime()
          "
        >
          You have a scheduled meeting with your guidance counselor on
          {{ date }} at {{ time }}.
        </p>
        <p v-else>
          Your guidance counselor has not scheduled a meeting with you yet.
        </p>
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

<script setup lang="ts">
import { useSurveyStore } from "../stores/survey";
import { useUserStore } from "../stores/user";
import { computed, ref } from "vue";

document.title = "Dashboard | SITHS Course Selection";

const statusStyles = ref({
  Completed: "text-[#174616] bg-[#A8D480]",
  "In Progress": "text-[#461616] bg-[#F9D477]",
  Finalized: "text-[#461616] bg-[#D1A4DE]",
});

const userStore = useUserStore();
const surveyStore = useSurveyStore();

let time: String;
let date: String;

const closeDate = computed(() =>
  new Date(userStore.student.dueDate).toDateString().slice(4)
);

if (userStore.student.meetingDate) {
  date = new Date(userStore.student.meetingDate).toDateString().slice(4);
  time = new Date(userStore.student.meetingDate).toTimeString().slice(0, 5);
}
</script>
