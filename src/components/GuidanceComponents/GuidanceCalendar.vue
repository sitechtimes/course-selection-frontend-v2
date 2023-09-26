<template>
  <div class="grid content-center justify-between">
    <div class="container">
      <div class="select text-4xl font-bold">
        <span
          class="arrow cursor-pointer"
          id="prev"
          ref="prev"
          @click="changeMonth(false)"
          >&#10094;</span
        >
        <div class="mY">{{ months[currMonth] }} {{ currYear }}</div>
        <span
          class="arrow cursor-pointer"
          id="next"
          ref="next"
          @click="changeMonth(true)"
          >&#10095;</span
        >
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
              <PlusIcon
                class="plusIcon w-3 ml-2 cursor-pointer invisible"
                @click="toggleEvent"
              />
            </li>
          </ul>
        </div>
        <Upcoming />
      </div>
    </div>
    <div class="event h-screen w-full flex flex-col mt-20">
      <PlusIcon
        class="plusIcon w-3 ml-2 cursor-pointer invisible"
        @click="toggleEvent"
      />
      <div
        v-if="show"
        class="createevent flex flex-row m-auto mt-5 w-fit h-fit rounded-[1rem] border border-black"
      >
        <div class="event flex flex-col">
          <div class="top flex-row flex items-center justify-between">
            <h2 class="h2 font-bold text-[2rem] m-8 mb-4">Create Event</h2>
            <button class="mt-5 mr-12" @click="toggleEvent">
              <svg
                class="x fill-current text-37394f transition duration-300 mt-4 hover:opacity-80 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                />
              </svg>
            </button>
          </div>
          <form id="form" ref="form" @submit.prevent="empty()">
            <div class="item mb-6">
              <label
                class="formt mt-2 flex flex-row text-[#717494] ml-8 xl:text-2xl font-bold"
                for="title"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                  />
                </svg>
                Title
              </label>
              <input
                class="space rounded-md border border-solid border-zinc-400 h-10 p-2 ml-6 mt-1 w-80"
                type="text"
                v-model="title"
                placeholder="Title"
              />
            </div>
            <div class="times flex flex-col lg:flex-row">
              <div class="item mb-6">
                <label
                  class="formt flex flex-row text-[#717494] ml-8 xl:text-2xl font-bold"
                  for="date"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                    />
                  </svg>
                  Date</label
                >
                <input
                  class="space d rounded-md border border-solid border-zinc-400 h-10 p-2 ml-6 mt-1 w-80"
                  type="date"
                  v-model="date"
                  placeholder="Date"
                  ref="date"
                />
                <p v-if="dateError" class="error text-red-600 ml-6 mt-1">
                  Field empty/invalid
                </p>
              </div>
              <div class="item mb-6">
                <label
                  class="formt flex flex-row text-[#717494] ml-8 xl:text-2xl font-bold"
                  for="time"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                    />
                  </svg>
                  Time</label
                >
                <input
                  class="space d mr-8 rounded-md border border-solid border-zinc-400 w-80 h-10 p-2 ml-6 mt-1"
                  type="time"
                  v-model="time"
                  placeholder="Time"
                  ref="time"
                />
                <p v-if="timeError" class="error text-red-600 ml-6 mt-1">
                  Field empty/invalid
                </p>
              </div>
            </div>
            <div class="item mb-6">
              <label
                class="formt flex flex-row text-[#717494] ml-8 xl:text-2xl font-bold"
                for="emails"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  />
                </svg>
                Student
              </label>
              <datalist id="suggestions">
                <div v-for="student in studentList" :key="student.user.email">
                  <option>
                    {{ student.user.lastName }}, {{ student.user.firstName }} |
                    {{ student.user.email }}
                  </option>
                </div>
              </datalist>
              <input
                class="space rounded-md border border-solid border-zinc-400 h-10 p-2 ml-6 mt-1 w-80"
                placeholder="Select Student From List"
                autoComplete="on"
                list="suggestions"
                v-model="name"
                id="student"
              />
              <p v-if="nameError" class="error text-red-600 ml-6 mt-1">
                Field empty/invalid
              </p>
            </div>
            <div class="item mb-6">
              <label
                class="formt flex flex-row text-[#717494] ml-8 xl:text-2xl font-bold"
                for="description"
                ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  />
                </svg>
                Memo
              </label>
              <input
                class="space rounded-md border border-solid border-zinc-4a00 w-80 h-10 p-2 ml-6 mt-1"
                type="text"
                v-model="description"
                placeholder="Memo"
              />
            </div>
            <div class="flex flex-row items-center ml-6 mb-6">
              <input type="checkbox" class="ml-2" id="notify" name="notify" />
              <label class="ml-2" for="notify">Notify Student via Email</label>
            </div>
            <div
              class="item submit ml-6 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer w-fit"
            >
              <button
                type="submit"
                class="font-bold bg-primary-g px-4 py-2 rounded-2xl w-fit h-fit"
                id="save"
                ref="save"
              >
                Save
              </button>
            </div>
          </form>
          <!-- <div class="events">
          <p>Title : {{ title }}</p>
          <p>Date : {{ date }}</p>
          <p>People : {{ people }}</p>
          <p>Description : {{ description }}</p>
        </div> -->
        </div>
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

const guidanceStore = useGuidanceStore();
const userStore = useUserStore();

let title: string;
let date: string;
let time: string;
let description: string;
let name: string;
let email: string;
const show: Ref<boolean> = ref(false);
const save = ref();
const form = ref();
const studentList = guidanceStore.guidance.students;
const dateError: Ref<boolean> = ref(false);
const timeError: Ref<boolean> = ref(false);
const nameError: Ref<boolean> = ref(false);

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

function empty() {
  //checks if require fields are empty; if so, error msg pops up on respective field
  if (date.value === "") {
    dateError.value = true;
  } else {
    dateError.value = false;
  }
  if (time.value === "") {
    timeError.value = true;
  } else {
    timeError.value = false;
  }
  if (!name) {
    nameError.value = true;
  } else {
    nameError.value = false;
  }

  //if all required fields are filled out, proceed with submission
  if (!dateError.value && !timeError.value && !nameError.value) {
    submit(date, name, time);
  }
}

function submit(meetingDate: string, studentName: string, meetingTime: string) {
  //date conversion
  const year = parseInt(meetingDate.slice(0, 4));
  const month = parseInt(meetingDate.slice(6, 8)) - 1;
  const day = parseInt(meetingDate.slice(9, 11));
  const hour = parseInt(meetingTime.slice(0, 2));
  const min = parseInt(meetingTime.slice(3, 5));
  const dateTime = new Date(year, month, day, hour, min);
  const newTime = dateTime.toISOString();
  //person locater
  if (studentName != null || undefined) {
    for (const student of studentList) {
      const studentFullName =
        student.user.lastName +
        ", " +
        student.user.firstName +
        " | " +
        student.user.email;
      if (studentFullName == studentName) {
        email = student.user.email;
      }
    }
  }

  save.value.innerHTML = "Saved";
  form.value.reset();
  name = "";
  date = "";
  email = "";
  time = "";
  userStore.changeMeeting(email, newTime);
  console.log(title);
  //console.log(newTime);
  //console.log(description);
  //console.log(studentName);
  //console.log(email)
}

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
.days li:hover + .plusIcon {
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
