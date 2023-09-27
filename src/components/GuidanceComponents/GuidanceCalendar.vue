<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container">
      <div class="select text-4xl font-bold">
        <span class="arrow cursor-pointer" id="prev" ref="prev" @click="changeMonth(false)">&#10094;</span>
        <div class="mY">{{ months[currMonth] }} {{ currYear }}</div>
        <span class="arrow cursor-pointer" id="next" ref="next" @click="changeMonth(true)">&#10095;</span>
      </div>
      <div class="flex flex-row justify-between space-x-28">
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
            <li class="dayCon" v-for="h in hmm.wow" :key="h.id">
              <p class="mt-2 text-end mr-2 mb-16">{{ h.calDate }}</p>
              <PlusIcon class="plusIcon w-3 ml-2 cursor-pointer invisible" @click="toggleEvent" />
            </li>
          </ul>
        </div>
        <Upcoming />
      </div>
    </div>
    <div class="event h-screen w-full flex flex-col mt-20">
      <PlusIcon class="plusIcon w-3 ml-2 cursor-pointer invisible" @click="toggleEvent" />
      <div v-if="show" class="createevent flex flex-row m-auto mt-5 w-fit h-fit rounded-[1rem] border border-black">
        <CreateEvent></CreateEvent>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Upcoming from "../GuidanceComponents/Upcoming.vue";
import PlusIcon from "../icons/PlusIcon.vue";
import { ref, Ref, reactive, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { useGuidanceStore } from "../../stores/guidance";
import CreateEvent from "./CreateEvent.vue";

const guidanceStore = useGuidanceStore();
const userStore = useUserStore();

const show: Ref<boolean> = ref(false);

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
  const name = `${student.node.user.firstName} ${student.node.user.lastName}`; //extract first and last name
  const meetingDate = student.node.meeting; //extract meeting date
  const studentMeetings = {
    //create an OBJECT with the name and meeting date
    name,
    meetingDate,
  };
  studentInfo.push(studentMeetings);
}
console.log("Student Info:", studentInfo);

// for (const index of indexList) {
// var hasMeeting = student.user.meeting.filter(checkMeeting)
// return hasMeeting
// }
// console.log(allMeeting[index].grade);
// }
// get rid of title field?

// function checkMeeting(meeting) {
// return (meeting != null || undefined)
//}
// for (const student of studentList) {
// var hasMeeting = student.user.meeting.filter(checkMeeting)
// return hasMeeting
// }
// if meeting is not null take each student's meeting info
// const student of student w/ meeting (each student w/ meeting)
// match year, month, date with calendar
// after match how to display?
// take the title of their meeting for display
// on click show all details (student name, grade?, email, date, time, note)
// optional take grade and set color for event tab
// print function someday?
// function allMeetings {
// for (const student of studentList) {
// const studentMeeting = student.user.meeting
// if (allStudents.user.meeting != null || undefined) {
//     const studentFullName =
//       student.user.lastName +
//       ", " +
//       student.user.firstName +
//       " | " +
//       student.user.email;
//   }}
// };


const toggleEvent = () => {
  show.value = !show.value;
};
const currentDate = ref(null);
const daysTag = ref(null);

// getting new date, current year and month
let calDate = new Date();
let currYear = calDate.getFullYear();
let currMonth = calDate.getMonth();
let hmm = reactive([]);
let wo = ref(0);

// storing full name of all months in array
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
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  let wow = [];

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    const ehe = {
      type: "inactive",
      calDate: lastDateofLastMonth - i + 1,
    };
    wow.push(ehe);
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === calDate.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
    const ehe = {
      type: "active",
      calDate: i,
      id: i + "p",
    };
    wow.push(ehe);
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    const ehe = {
      type: "inactive",
      calDate: i - lastDayofMonth + 1,
      id: i + "o",
    };
    wow.push(ehe);
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  // console.log(wow)
  hmm.wow = wow;
  hmm.wo = wo.value + 1;
  console.log(wo.value, "o");
  wo.value = hmm.wo;
  console.log(hmm);
  // daysTag.innerHTML = liTag;
  // console.log(liTag)
};
renderCalendar();
const changeMonth = (next: boolean) => {
  if (next) {
    currMonth = currMonth + 1;
  } else {
    currMonth = currMonth - 1;
  }
  if (currMonth < 0 || currMonth > 11) {
    // if current month is less than 0 or greater than 11
    // creating a new date of current year & month and pass it as date value
    calDate = new Date(currYear, currMonth, new Date().getDate());
    currYear = calDate.getFullYear(); // updating current year with new date year
    currMonth = calDate.getMonth(); // updating current month with new date month
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

/* .plusIcon {
  width: 0.5rem;
  padding-top: 4rem;
  cursor: pointer;
  display: none;
} */
.days li:hover+.plusIcon {
  display: block;
}

.days li.inactive {
  color: #aaa;
}

.days li.active {
  color: #fff;
}

/* .days li::before {
  position: absolute;
  content: "";
  left: 94.5%;
  top: 50%;
  height: 40px;
  width: 40px;
  z-index: -1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
} circle highlight for days */
.days li.active::before {
  background: #9b59b6;
}

.days li:not(.active):hover::before {
  background: #f2f2f2;
}

.createevent {
  height: 35rem;
  border-radius: 1rem;
  position: absolute;
  left: 20%;
  right: 20%;
  top: 30%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border: 1px black solid;
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
