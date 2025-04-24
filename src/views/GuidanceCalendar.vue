<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container">
      <div class="flex flex-row mb-8 text-5xl font-bold w-[70%]">
        <span
          class="arrow cursor-pointer text-2xl"
          id="prev"
          ref="prev"
          @click="changeWeek(false)"
          >&#10094;</span
        >
        <div class="flex flex-row text-2xl mx-4">
          {{ months[month] }} {{ year }}
        </div>
        <span
          class="arrow cursor-pointer text-2xl"
          id="next"
          ref="next"
          @click="changeWeek(true)"
        >
          &#10095;
        </span>
      </div>
      <div class="flex flex-row gap-[7rem] mb-12">
        <div class="calendar w-full">
          <ul class="weeks bg-primary-g">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul class="days">
            <li
              class="hover:visible group min-h-[10rem] relative pb-7"
              v-for="h in calendarData"
            >
              <p class="mt-2 text-end mr-2 mb-1">{{ h.todaysDate.getMonth() }} / {{ h.todaysDate.getUTCDate() }}</p>
              <div
                v-for="meeting in h.meetings"
                :key="meeting.id"
                @click="toggleDetails(meeting)"
              >
                <p
                  :class="`w-[100%] text-center truncate rounded-md p-1.5 mb-1 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md ${
                    classColor[meeting.grade]
                  }`"
                >
                  {{ meeting.name }}
                </p>
              </div>
              <button
                @click="toggleEvent(h)"
                class="h-10 opacity-0 group-hover:opacity-100 cursor-pointer text-3xl leading-[0] transition-all duration-300 absolute bottom-0 right-0 mr-2"
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
import { useUserStore } from "../stores/user";
import { DateInfo } from "../types/interface";
import { Meeting } from "../types/interface";

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
const firstDay = (() => {
  const d = new Date(currentDate);
  d.setDate(d.getDate() - (d.getDay() || 7) + 1);
  return d.setHours(0, 0, 0, 0), d;
})();

onMounted(async () => await renderCalendar());

const toggleDetails = (meeting: Meeting) => {
  selectedMeeting.value = meeting;
  showDetails.value = !showDetails.value;
};

const toggleEvent = (date: any) => {
  let eventYear = year;
  let eventMonth = month

  if (eventMonth < 0) {
    eventMonth = 11;
    eventYear--;
  } else if (eventMonth > 11) {
    eventMonth = 0;
    eventYear++;
  }
  createEventDate.value = `${eventYear}-${(eventMonth + 1)
    .toString()
    .padStart(2, "0")}-${date.todaysDate.getUTCDate().toString().padStart(2, "0")}`;
  showEvent.value = !showEvent.value;
};

async function renderCalendar() {
  const createDays = (count: number, offset: Date) => {
    const day = offset.getUTCDate() + 1;
    console.log(offset)
    return Array.from({ length: count }, (_, i) => ({
      todaysDate: new Date(year, month + 1, day + i),
      meetings: userStore.meetings
        .filter(
          ({ meetingDate }) =>
            meetingDate.toDateString() ===
            new Date(year, month + 1, day + i).toDateString()
        )
        .sort((a, b) => a.meetingDate.getTime() - b.meetingDate.getTime()),
    }));
  };

  calendarData.value = [...createDays(7, firstDay)];
}

watchEffect(async () => await renderCalendar());

const changeWeek = (next: boolean) => {
  firstDay.setDate(firstDay.getDate() + (next ? 7 : -7));
  month = firstDay.getMonth();
  year = firstDay.getFullYear();
  renderCalendar();
};


</script>
<style scoped>
.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  overflow: hidden;
}

.calendar li {
  width: calc(100% / 7);
  font-size: 1.07rem;
}

.weeks li {
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 1px solid grey;
}

.calendar .weeks li {
  font-weight: 800;
  font-size: 1.2rem;
  cursor: default;
}

.calendar .days li {
  text-align: end;
}

.days li {
  border: grey 1px solid;
  font-size: 0.9rem;
}

.days li:hover {
  display: block;
}

.days li.inactive {
  color: #aaa;
}

.days li.active {
  color: #fff;
}

.days li.active::before {
  background: #9b59b6;
}

.days li:not(.active):hover::before {
  background: #f2f2f2;
}
</style>
