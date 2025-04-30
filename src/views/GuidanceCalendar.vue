<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container">
      <div class="flex flex-row mb-8 text-5xl font-bold w-[90%]">
        <span
          class="arrow cursor-pointer text-2xl"
          id="prev"
          ref="prev"
          @click="changeWeek(false)"
          >&#10094;</span
        >
        <div class="flex flex-row text-2xl mx-4">
          {{ months[displayedMonth] }} {{ displayedYear }}
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
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
          </ul>
          <ul class="days">
            <li
              class="hover:visible group min-h-[10rem] relative pb-7"
              v-for="h in calendarData"
            >
              <p class="mt-2 text-end mr-2 mb-1">
                {{ h.todaysDate.getUTCMonth() + 1 }} /
                {{ h.todaysDate.getUTCDate() }}
              </p>
              <div
                v-for="meeting in h.meetings"
                :key="meeting.id"
                @click="toggleDetails(meeting)"
              >
                <p
                  :class="`w-[100%] text-center rounded-md p-1.5 mb-1 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md ${
                    classColor[meeting.grade]
                  }`"
                >
                {{ meeting.student.firstName }}
                {{ meeting.student.lastName }}  {{ formatDisplayTime(meeting.date) }}
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
import { ref, onMounted, watchEffect, computed } from "vue";
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

const initialStartOfWeekLocal = new Date(currentDate);
initialStartOfWeekLocal.setDate(
  currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
);
initialStartOfWeekLocal.setHours(0, 0, 0, 0);

let firstDay = ref(
  new Date(
    Date.UTC(
      initialStartOfWeekLocal.getFullYear(),
      initialStartOfWeekLocal.getMonth(),
      initialStartOfWeekLocal.getDate()
    )
  )
);

const displayedMonth = computed(() => firstDay.value.getUTCMonth());
const displayedYear = computed(() => firstDay.value.getUTCFullYear());

onMounted(() => renderCalendar());

const toggleDetails = (meeting: Meeting) => {
  selectedMeeting.value = meeting;
  showDetails.value = !showDetails.value;
};

const toggleEvent = (dateInfo: DateInfo) => {
  const eventDate = dateInfo.todaysDate;
  createEventDate.value = `${eventDate.getUTCFullYear()}-${(
    eventDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${eventDate.getUTCDate().toString().padStart(2, "0")}`;
  showEvent.value = !showEvent.value;
};

const renderCalendar = () => {
  const days = [];
  const startOffsetDateUtc = firstDay.value; 

  for (let i = 0; i < 5; i++) {
    const todaysDate = new Date(startOffsetDateUtc);
    todaysDate.setUTCDate(startOffsetDateUtc.getUTCDate() + i);
    todaysDate.setUTCHours(0, 0, 0, 0); 

    days.push({
      todaysDate: new Date(todaysDate),
      meetings: userStore.meetings
        .filter((meeting) => { 
          const meetingDate = new Date(meeting.date);
          meetingDate.setUTCHours(0, 0, 0, 0);
          return (
            meetingDate.getUTCFullYear() === todaysDate.getUTCFullYear() &&
            meetingDate.getUTCMonth() === todaysDate.getUTCMonth() &&
            meetingDate.getUTCDate() === todaysDate.getUTCDate()
          );
        })
        .sort((a, b) => {
             const dateA = new Date(a.date);
             const dateB = new Date(b.date);
             return dateA.getTime() - dateB.getTime();
        }),
    });
  }
  calendarData.value = days;
};

const formatDisplayTime = (isoString: Date) => {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${formattedMinutes} ${ampm}`;
};

watchEffect(() => {
  renderCalendar();
});

const changeWeek = (next: boolean) => {
  firstDay.value = new Date((firstDay.value).setUTCDate(firstDay.value.getUTCDate() + (next ? 7 : -7)));
  ;
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
  width: calc(100% / 5);
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
