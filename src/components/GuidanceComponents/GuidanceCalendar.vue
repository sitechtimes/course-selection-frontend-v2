<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container">
      <div class="flex flex-row mb-8 text-4xl font-bold">
        <span class="arrow cursor-pointer" id="prev" ref="prev" @click="changeMonth(false)">&#10094;</span>
        <div class="mx-2 flex flex-row">{{ months[todaysMonth] }} {{ todaysYear }}</div>
        <span class="arrow cursor-pointer" id="next" ref="next" @click="changeMonth(true)">&#10095;</span>
      </div>
      <div class="flex flex-row justify-between space-x-28 mb-12">
        <div class="calendar">
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
            <li class="dayCon" v-for="h in calendarData.dateInfo" :key="h.id">
              <p class="mt-2 text-end mr-2 mb-16">{{ h.todaysDate }}</p>
              <div>
                <p class="mt-2 text-center truncate w-fit bg-[#EED7FD] text-[#2D004B] rounded-md p-1.5 my-2.5 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md"
                  v-for="meeting in h.meetings" :key="meeting.id" @click="toggleDetails">
                  {{ meeting.name }}
                </p>
              </div>
              <PlusIcon class="plusIcon w-3 ml-2 cursor-pointer invisible" @click="toggleEvent" />
            </li>
          </ul>
        </div>
        <UpcomingMeetings />
      </div>
    </div>
    <CreateEvent v-if="showEvent" />
    <MeetingDetails v-if="showDetails" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, onMounted } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import { calendarData } from "../../types/interface";
import UpcomingMeetings from "../GuidanceComponents/UpcomingMeetings.vue";
import CreateEvent from "./CreateEvent.vue";
import MeetingDetails from "./MeetingDetails.vue";
import PlusIcon from "../icons/PlusIcon.vue";

const guidanceStore = useGuidanceStore()

const showEvent: Ref<boolean> = ref(false);
const showDetails: Ref<boolean> = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
const toggleEvent = () => {
  showEvent.value = !showEvent.value;
};

const studentInfo = guidanceStore.allStudents.edges
  .filter((student) => student.node.meeting)
  .map((student) => ({
    name: `${student.node.user.firstName} ${student.node.user.lastName}`,
    meetingDate: student.node.meeting,
  }));

let todaysDate = new Date();
let todaysYear = todaysDate.getFullYear();
let todaysMonth = todaysDate.getMonth();
const calendarData: calendarData = reactive({
  dateInfo: [],
  monthChanges: 0,
});
const monthChanges: Ref<number> = ref(0)

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

const renderCalendar = () => {
  let firstDayofMonth = new Date(todaysYear, todaysMonth, 1).getDay();
  let lastDateofMonth = new Date(todaysYear, todaysMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(todaysYear, todaysMonth, lastDateofMonth).getDay();
  let lastDateofLastMonth = new Date(todaysYear, todaysMonth, 0).getDate();
  let dateInfo = [];

  for (let i = firstDayofMonth; i > 0; i--) {
    const dateBoxInfo = {
      type: "previous",
      todaysDate: lastDateofLastMonth - i + 1,
      id: i + "p",
      meetings: [],
    };
    dateInfo.push(dateBoxInfo);
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const activeDate = new Date(todaysYear, todaysMonth, i);

    const studentsWithMeetings = [];

    for (const student of studentInfo) {
      const studentMeetingDate = new Date(student.meetingDate as string);
      const isMeetingDate =
        studentMeetingDate.getDate() === activeDate.getDate() &&
        studentMeetingDate.getMonth() === activeDate.getMonth() &&
        studentMeetingDate.getFullYear() === activeDate.getFullYear();
      if (isMeetingDate) {
        studentsWithMeetings.push(student);
      }
    }

    const dateBoxInfo = {
      type: "current",
      todaysDate: i,
      id: i + "c",
      meetings: studentsWithMeetings,
    };
    dateInfo.push(dateBoxInfo);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    const dateBoxInfo = {
      type: "future",
      todaysDate: i - lastDayofMonth + 1,
      id: i + "f",
      meetings: [],
    };
    dateInfo.push(dateBoxInfo);
  }
  //@ts-ignore
  calendarData.dateInfo = dateInfo;
  calendarData.monthChanges = monthChanges.value + 1;
  monthChanges.value = calendarData.monthChanges;
};

const changeMonth = (next: boolean) => {
  if (next) {
    todaysMonth = todaysMonth + 1;
  } else {
    todaysMonth = todaysMonth - 1;
  }
  if (todaysMonth < 0 || todaysMonth > 11) {
    // if current month is less than 0 or greater than 11
    // creating a new date of current year & month and pass it as date value
    todaysDate = new Date(todaysYear, todaysMonth, new Date().getDate());
    todaysYear = todaysDate.getFullYear(); // updating current year with new date year
    todaysMonth = todaysDate.getMonth(); // updating current month with new date month
  } else {
    todaysDate = new Date(); // pass the current date as date value
  }
  renderCalendar();
};

onMounted(() => {
  renderCalendar();
  console.log("Student Info:", studentInfo);
});
</script>

<style scoped>
.container {
  margin: 2rem 4rem 0 4rem;
}

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

.weeks {
  text-align: center;
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
  padding-bottom: 0.8rem;
}

.days li {
  border: grey 1px solid;
  font-size: 0.9rem;
}

.dayCon:hover .plusIcon {
  visibility: visible;
}

.days li:hover+.plusIcon {
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

button {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

button:hover {
  opacity: 0.5;
}

svg {
  width: 1.2rem;
  margin-right: 10px;
  fill: #717494;
}

input:invalid {
  border-color: red;
}
</style>
