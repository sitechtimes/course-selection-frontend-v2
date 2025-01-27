<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="mt-8 mx-16">
      <div class="flex flex-row mb-8 text-4xl font-bold">
        <span
          class="arrow cursor-pointer"
          id="prev"
          ref="prev"
          @click="changeMonth(false)"
          >&#10094;</span
        >
        <div class="mx-2 flex flex-row">{{ months[month] }} {{ year }}</div>
        <span
          class="arrow cursor-pointer"
          id="next"
          ref="next"
          @click="changeMonth(true)"
          >&#10095;</span
        >
      </div>
      <div class="flex flex-row gap-[7rem] mb-12">
        <div class="w-full">
          <ul class="text-center flex flex-wrap list-none overflow-hidden bg-primary-g">
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Sun</li>
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Mon</li>
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Tue</li>
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Wed</li>
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Thu</li>
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Fri</li>
            <li class="text-xl grow text-center py-1 border border-neutral-500 font-extrabold">Sat</li>
          </ul>
          <ul class="w-full grid grid-cols-7">
            <li class="group text-base grow text-end pb-3 border border-neutral-500" v-for="h in calendarData">
              <p class="mt-2 text-end mr-2 mb-16">{{ h.todaysDate }}</p>
              <div
                v-for="meeting in h.meetings"
                :key="meeting.id"
                @click="toggleDetails(meeting)"
              >
                <p
                  class="w-full text-center truncate rounded-md p-1.5 mb-1 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md"
                  :class="classColor[meeting.grade]"
                >
                  {{ meeting.name }}
                </p>
              </div>
              <button
                @click="toggleEvent(h)"
                class="w-3 m-1 hidden group-hover:block hover:opacity-50 cursor-pointer mb-8 transition duration-300 text-2xl leading-[0]"
              >
                +
              </button>
            </li>
          </ul>
        </div>
        <UpcomingMeetings />
      </div>
    </div>
    <CreateEvent v-if="showEvent" :todaysDate="createEventDate" />
    <MeetingDetails v-if="showDetails" :meeting="selectedMeeting" />
  </div>
</template>

<script setup lang="ts">
import UpcomingMeetings from "../components/Guidance/UpcomingMeetings.vue";
import MeetingDetails from "../components/Guidance/MeetingDetails.vue";
import CreateEvent from "../components/Guidance/CreateEvent.vue";
import { ref, onMounted, watchEffect } from "vue";
import { Meeting } from "../types/interface";
import { useUserStore } from "../stores/user";
import { DateInfo } from "../types/interface";

document.title = "Calendar & Events | SITHS Course Selection";

const calendarData = ref<DateInfo[]>([]);

const selectedMeeting = ref<Meeting>({} as Meeting);

const showEvent = ref(false);
const showDetails = ref(false);
const createEventDate = ref("");

const userStore = useUserStore();

const classColor: Record<number, string> = {
  9: "bg-[#F5CDCD] text-[#590000]",
  10: "bg-[#D2F6D2] text-[#003400]",
  11: "bg-[#EED7FD] text-[#2D004B]",
  12: "bg-[#CCDDF5] text-[#002254]",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();

onMounted(async () => await renderCalendar());

const toggleDetails = (meeting: Meeting) => {
  selectedMeeting.value = meeting;
  showDetails.value = !showDetails.value;
};

const toggleEvent = (date: any) => {
  let eventYear = year;
  let eventMonth = month + date.type;

  if (eventMonth < 0) {
    eventMonth = 11;
    eventYear--;
  } else if (eventMonth > 11) {
    eventMonth = 0;
    eventYear++;
  }
  createEventDate.value = `${eventYear}-${(eventMonth + 1)
    .toString()
    .padStart(2, "0")}-${date.todaysDate.toString().padStart(2, "0")}`;
  showEvent.value = !showEvent.value;
};

async function renderCalendar() {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  const createDays = (count: number, offset: number, type: number) =>
    Array.from({ length: count }, (_, i) => ({
      type,
      todaysDate: offset + i + 1,
      meetings:
        type === 0
          ? userStore.meetings
              .filter(
                ({ meetingDate }) =>
                  meetingDate.toDateString() ===
                  new Date(year, month, offset + i + 1).toDateString()
              )
              .sort((a, b) => a.meetingDate.getTime() - b.meetingDate.getTime())
          : [],
    }));

  calendarData.value = [
    ...createDays(firstDay, prevMonthLastDate - firstDay, -1),
    ...createDays(lastDate, 0, 0),
    ...createDays(6 - lastDay, 0, 1),
  ];
}

watchEffect(async () => await renderCalendar());

const changeMonth = (next: boolean) => {
  next ? month++ : month--;

  if (month < 0 || month > 11) {
    currentDate = new Date(year, month);
    year = currentDate.getFullYear();
    month = currentDate.getMonth();
  }

  renderCalendar();
};
</script>

<style scoped></style>
