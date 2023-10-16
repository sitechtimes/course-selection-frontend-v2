<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container">
      <div class="select text-4xl font-bold">
        <span class="arrow cursor-pointer" id="prev" ref="prev" @click="changeMonth(false)">&#10094;</span>
        <div class="mY">{{ months[todaysMonth] }} {{ todaysYear }}</div>
        <span class="arrow cursor-pointer" id="next" ref="next" @click="changeMonth(true)">&#10095;</span>
      </div>
      <div class="flex flex-row justify-between space-x-28 mb-12">
        <div class="calendar">
          <ul class="weeks bg-primary-g">
            <li class="">Sun</li>
            <li class="">Mon</li>
            <li class="">Tue</li>
            <li class="">Wed</li>
            <li class="">Thu</li>
            <li class="">Fri</li>
            <li class="">Sat</li>
          </ul>
          <ul class="days">
            <li class="dayCon" v-for="h in calendarData.dateInfo" :key="h.id">
              <p class="mt-2 text-end mr-2 mb-16">{{ h.calDate }}</p>
              <div class="">
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
    <div v-if="showEvent">
      <CreateEvent />
    </div>
    <div v-if="showDetails">
      <MeetingDetails />
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import UpcomingMeetings from "../GuidanceComponents/UpcomingMeetings.vue";
import PlusIcon from "../icons/PlusIcon.vue";
import { ref, Ref, reactive, onMounted } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import CreateEvent from "./CreateEvent.vue";
import MeetingDetails from "./MeetingDetails.vue"

const guidanceStore = useGuidanceStore()

const showEvent: Ref<boolean> = ref(false);
const showDetails: Ref<boolean> = ref(false);

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
const toggleEvent = () => {
  showEvent.value = !showEvent.value;
};

//filter out valid meetings within the guidance store
const validMeetings = guidanceStore.allStudents.edges.filter(
  (student) =>
    student.node.meeting !== null && student.node.meeting !== undefined
);
//filter out valid meetings within the guidance store (valid as long as they are not null and undefined), and turn this into an array
const allMeetings = validMeetings.map((student) => student.node.meeting).flat();
console.log("All Meetings:", allMeetings);

const studentInfo = []; //this array contains the name AND meeting date of the students

for (const student of validMeetings) {
  const name = `${student.node.user.firstName} ${student.node.user.lastName}`;
  const meetingDate = student.node.meeting;
  const studentMeetings = {
    name,
    meetingDate,
  };
  studentInfo.push(studentMeetings);
}
console.log("Student Info:", studentInfo);

const currentDate = ref(null);

let calDate = new Date();
let todaysYear = calDate.getFullYear();
let todaysMonth = calDate.getMonth();
let calendarData = reactive([]);
let monthChanges = ref(0);

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
      type: "inactive",
      calDate: lastDateofLastMonth - i + 1,
    };
    dateInfo.push(dateBoxInfo);
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === calDate.getDate() &&
        todaysMonth === new Date().getMonth() &&
        todaysYear === new Date().getFullYear()
        ? "active"
        : "";

    const activeDate = new Date(todaysYear, todaysMonth, i);

    const studentsWithMeetings = [];

    for (const student of studentInfo) {
      const studentMeetingDate = new Date(student.meetingDate);
      const isMeetingDate =
        studentMeetingDate.getDate() === activeDate.getDate() &&
        studentMeetingDate.getMonth() === activeDate.getMonth() &&
        studentMeetingDate.getFullYear() === activeDate.getFullYear();

      if (isMeetingDate) {
        studentsWithMeetings.push(student);
      }
    }

    const dateBoxInfo = {
      type: "active",
      calDate: i,
      id: i + "a",
      meetings: studentsWithMeetings,
    };
    dateInfo.push(dateBoxInfo);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    const dateBoxInfo = {
      type: "inactive",
      calDate: i - lastDayofMonth + 1,
      id: i + "i",
    };
    dateInfo.push(dateBoxInfo);
  }

  currentDate.innerText = `${months[todaysMonth]} ${todaysYear}`;
  calendarData.dateInfo = dateInfo;
  calendarData.monthChanges = monthChanges.value + 1;
  monthChanges.value = calendarData.monthChanges;
};

renderCalendar();

const changeMonth = (next: boolean) => {
  if (next) {
    todaysMonth = todaysMonth + 1;
  } else {
    todaysMonth = todaysMonth - 1;
  }
  if (todaysMonth < 0 || todaysMonth > 11) {
    // if current month is less than 0 or greater than 11
    // creating a new date of current year & month and pass it as date value
    calDate = new Date(todaysYear, todaysMonth, new Date().getDate());
    todaysYear = calDate.getFullYear(); // updating current year with new date year
    todaysMonth = calDate.getMonth(); // updating current month with new date month
  } else {
    calDate = new Date(); // pass the current date as date value
  }
  renderCalendar();
};
</script>

<style scoped>
.container {
  margin: 2rem 4rem 0 4rem;
}

.select {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
}

.mY {
  margin: 0 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: row;
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
