<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container w-screen">
      <div class="flex flex-row mb-5 text-5xl font-bold w-[90%]">
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
      <button
        @click="toggleWeekSelector"
        class="ml-8 mb-5 text-sm px-3 py-1.5 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        title="Select Week"
      >
        Select Week
      </button>
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-12">
        <div class="calendar w-full lg:w-2/3 xl:w-3/4">
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
                  :class="`w-full text-center p-1.5 mb-1 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md ${
                    classColor[meeting.grade]
                  }`"
                >
                  {{ meeting.student }}
                  {{ formatDisplayTime(meeting.date) }} <span v-if="meeting.period">Period
                  {{ meeting.period }}</span>
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
        </div class="w-full mt-8 lg:mt-0">
        <UpcomingMeetings />
      </div>
    </div>
    <CreateEvent v-if="showEvent" :todaysDate="createEventDate" />
    <MeetingDetails v-if="showDetails" :meeting="selectedMeeting" />
    <WeekSelector
      v-if="showWeekSelector"
      :current-first-day="firstDay"
      @week-selected="handleWeekSelected"
      @close="toggleWeekSelector"
    />
  </div>
</template>

<script setup lang="ts">
import UpcomingMeetings from "../components/Guidance/UpcomingMeetings.vue";
import MeetingDetails from "../components/Guidance/MeetingDetails.vue";
import WeekSelector from "../components/Guidance/WeekSelector.vue";
import CreateEvent from "../components/Guidance/CreateEvent.vue";
import { ref, onMounted, watchEffect, computed } from "vue";
import { useUserStore } from "../stores/user";
import { DateInfo } from "../types/interface";
import { Meeting } from "../types/interface";

document.title = "Calendar & Events | SITHS Course Selection";

const selectedMeeting = ref<Meeting>({} as Meeting);
const calendarData = ref<DateInfo[]>([]);
const showWeekSelector = ref(false);
const createEventDate = ref("");
const showDetails = ref(false);
const showEvent = ref(false);

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

const periodsMap = [
  { startTime: "08:00", endTime: "08:41", period: 1 },
  { startTime: "08:42", endTime: "09:26", period: 2 },
  { startTime: "09:27", endTime: "10:17", period: 3 },
  { startTime: "10:18", endTime: "11:02", period: 4 },
  { startTime: "11:03", endTime: "11:47", period: 5 },
  { startTime: "11:48", endTime: "12:32", period: 6 },
  { startTime: "12:33", endTime: "13:17", period: 7 },
  { startTime: "13:18", endTime: "14:02", period: 8 },
  { startTime: "14:03", endTime: "14:47", period: 9 },
];

const currentDate = new Date();

const initialStartOfWeekLocal = new Date(currentDate);
initialStartOfWeekLocal.setDate(
  currentDate.getDate() - ((currentDate.getDay() + 6) % 7)
);
initialStartOfWeekLocal.setHours(0, 0, 0, 0);

const firstDay = ref(
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

const toggleWeekSelector = () => {
  showWeekSelector.value = !showWeekSelector.value;
};

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
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${formattedMinutes} ${ampm}`;
};

watchEffect(() => {
  renderCalendar();
});

const period = (time: Date) => {
  const checkTotalMinutes = time.getHours() * 60 + time.getMinutes();
  for (const period of periodsMap) {
    const [startHours, startMinutes] = period.startTime.split(":").map(Number);
    const [endHours, endMinutes] = period.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (
      checkTotalMinutes >= startTotalMinutes &&
      checkTotalMinutes <= endTotalMinutes
    ) {
      return period.period;
    }
  }
  return "N/A";
};

const handleWeekSelected = (selectedStartOfWeekUtc: Date) => {
  if (
    selectedStartOfWeekUtc instanceof Date &&
    !isNaN(selectedStartOfWeekUtc.getTime())
  ) {
    firstDay.value = selectedStartOfWeekUtc;
  } else {
    console.error(
      "Invalid date received from WeekSelector:",
      selectedStartOfWeekUtc
    );
  }
  showWeekSelector.value = false;
};

const changeWeek = (next: boolean) => {
  const newFirstDay = new Date(firstDay.value);
  newFirstDay.setUTCDate(newFirstDay.getUTCDate() + (next ? 7 : -7));
  firstDay.value = newFirstDay;
};
</script>


<style scoped>
@media (max-width: 767px) {
  .calendar .weeks,
  .calendar .days {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .calendar .weeks li,
  .calendar .days li {
    min-width: 90px;
  }
}

@media (min-width: 768px) {
  .calendar li {
    width: calc(100% / 5);
    flex: 1 1 0%;
    min-width: 0;
    font-size: 1.07rem;
  }

  .weeks li {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-weight: 800;
    font-size: 1.2rem;
  }

  .calendar .days li {
    min-height: 10rem;
  }

  .days li {
    font-size: 0.9rem;
  }
}

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

.calendar .weeks li {
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 1px solid grey;
  font-weight: 800;
  font-size: 1.2rem;
  cursor: default;
}

.calendar .days li {
  text-align: end;
  border: 1px solid grey;
  font-size: 0.9rem;
}
</style>
