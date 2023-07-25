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
          <div class="top flex-row flex items-center">
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
          <form id="form" ref="form" @submit.prevent="submit(date, name, time)">
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
                />
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
                />
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
                <div v-for="student in students" :key="student.user.email">
                  <option>
                    {{ student.user.lastName }}, {{ student.user.firstName }} |
                    {{ student.user.email }}
                  </option>
                </div>
              </datalist>
              <input
                class="space rounded-md border border-solid border-zinc-400 h-10 p-2 ml-6 mt-1 w-80"
                placeholder="Select Student"
                autoComplete="on"
                list="suggestions"
                v-model="name"
              />
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
                class="space rounded-md border border-solid border-zinc-400 w-80 h-10 p-2 ml-6 mt-1"
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
              class="item submit ml-6 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer"
            >
              <button
                @click="submit(date, name, time)"
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
import createevent from "../GuidanceComponents/createevent.vue";
import { reactive, Ref, ref } from "vue";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
let title: String;
let date: String;
let time: String;
let description: String;
let name: String;
let email: String;
const show: Ref<boolean> = ref(false);
const save = ref(null);
const form = ref(null);
const students = userStore.data.guidance.students;

function submit(date: String, name: String, time: String) {
  //date conversion
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(6, 8)) - 1;
  const day = parseInt(date.slice(9, 11));
  const hour = parseInt(time.slice(0, 2));
  const min = parseInt(time.slice(3, 5));
  const dateTime = new Date(year, month, day, hour, min);
  const newTime = dateTime.toISOString();
  //person locater
  if (name != null || undefined) {
    for (const student of students) {
      const studentFullName =
        student.user.lastName +
        ", " +
        student.user.firstName +
        " | " +
        student.user.email;
      if (studentFullName == name) {
        email = student.user.email;
      }
    }
  }
  save.value.innerHTML = "Saved";
  form.value.reset();
  userStore.changeMeeting(email, newTime);
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
.calendar {
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
.h2 {
  margin: 2rem;
}
.times {
  display: flex;
  flex-direction: row;
}
.tab {
  border-radius: 5px;
  text-align: left;
  padding: 5px;
  width: 10rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-left: 10px;
  font-weight: bold;
  transition: 0.5s;
}
.tab:hover {
  opacity: 0.8;
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
.freshman {
  background-color: rgb(238, 215, 253);
  color: rgb(45, 0, 75);
}
.sophomore {
  background-color: rgb(245, 205, 205);
  color: rgb(89, 0, 0);
}
.junior {
  background-color: rgb(210, 246, 210);
  color: rgb(0, 52, 0);
}
.senior {
  background-color: rgb(204, 221, 245);
  color: rgb(0, 34, 84);
}
.test {
  margin-bottom: 5rem;
}
.event {
  display: flex;
  flex-direction: column;
}
button {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}
button:hover {
  opacity: 0.5;
}
.top {
  display: flex;
  flex-direction: row;
}
.x {
  margin-left: 40rem;
  fill: #37394f;
  transition: 0.3s;
  margin-top: 1rem;
}
.x:hover {
  opacity: 0.8;
  cursor: pointer;
}
svg {
  width: 1.2rem;
  margin-right: 10px;
  fill: #717494;
}
.submit:hover {
  opacity: 0.5;
  cursor: pointer;
}
.item {
  margin-bottom: 1.5rem;
}
.submit {
  margin-left: 2rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  transition: 0.3s;
}
.space {
  justify-content: center;
  padding: 1rem;
  margin-left: 2rem;
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
  margin-bottom: 0rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding-left: 0.7rem;
  height: 0rem;
}

.form {
  text-align: left;
}
.formt {
  display: flex;
  flex-direction: row;
  color: #717494;
  margin-left: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
}
.createevent {
  height: 35rem;
  border-radius: 1rem;
  position: absolute;
  left: auto;
  right: auto;
  top: 30%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border: 1px black solid;
}
h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
@media only screen and (max-width: 1380px) {
  .x {
    margin-left: 28rem;
  }
}

@media only screen and (max-width: 1180px) {
  .createevent {
    height: 35rem;
    border-radius: 0.8rem;
    border: 1px black solid;
  }
  .test {
    margin-bottom: 3rem;
  }
  .times {
    flex-direction: column;
  }
  .space {
    justify-content: center;
    padding: 1rem;
    margin-left: 2rem;
    display: block;
    width: 20rem;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    padding-left: 0.7rem;
    height: 0rem;
  }
  .x {
    margin-left: 25rem;
  }
  svg {
    width: 1rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  .formt {
    font-size: 1.3rem;
  }
  button {
    font-size: 1.3rem;
  }
  .item {
    margin-top: 0rem;
    margin-bottom: 0.7rem;
  }
}
@media only screen and (max-width: 900px) {
  .events {
    margin-top: 2rem;
  }
  .item {
    margin-bottom: 0.2rem;
  }
  .createevent {
    height: 32rem;
  }
  .top {
    margin: 0rem;
    padding: 0rem;
  }
  .h2 {
    margin: 2rem;
    padding-bottom: 0rem;
  }
  .x {
    margin-left: 20rem;
  }
  .times {
    flex-direction: column;
  }
  .top {
    padding-top: 0;
  }
  button {
    margin-top: 1rem;
    margin-bottom: 0;
  }
}
@media only screen and (max-width: 800px) {
  .createevent {
    height: 22rem;
    border-radius: 0.8rem;

    border: 1px black solid;
  }
  .test {
    margin-bottom: 2rem;
  }
  .space {
    justify-content: center;
    padding: 0.7rem;
    margin-left: 1rem;
    display: block;
    width: 20rem;
    border-radius: 0.4rem;
    font-size: 0.8rem;
    padding-left: 0.5rem;
    height: 0rem;
  }
  .x {
    margin-left: 20rem;
    width: 0.8rem;
  }
  svg {
    width: 1rem;
  }
  h2 {
    font-size: 1.2rem;
    padding: 0;
    margin: 1rem;
    margin-bottom: 0rem;
  }
  .formt {
    font-size: 1rem;
    margin-left: 1rem;
  }
  .space {
    margin-left: 1rem;
  }
  button {
    font-size: 1rem;
    margin: 0;
    margin-left: 1rem;
  }
  .item {
    margin-top: 0.5rem;
    margin-left: 0rem;
  }
  form {
    margin-top: 0.5rem;
    margin-left: 0rem;
  }
}
@media only screen and (max-width: 670px) {
  .createevent {
    height: 17rem;
    border-radius: 0.5rem;
    padding-bottom: 0;
    border: 1px black solid;
  }
  .test {
    margin-bottom: 2rem;
  }
  .space {
    justify-content: center;
    padding: 0.5rem;
    margin-left: 1rem;
    display: block;
    width: 10rem;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    padding-left: 0.5rem;
    margin-top: 2.5px;
    height: 0rem;
  }
  .x {
    margin-left: 4rem;
    width: 0.8rem;
  }
  svg {
    width: 0.6rem;
  }
  h2 {
    width: 80%;
    font-size: 1rem;
    padding: 0;
    margin: 1rem;
    margin-bottom: 0rem;
  }
  .formt {
    font-size: 0.8rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }
  .item {
    margin-top: 0.6rem;
    margin-left: 0rem;
  }
  button {
    font-size: 0.8rem;
    padding: 0rem;
    margin: 0rem;
    margin-top: 0.5rem;
    height: 0.5rem;
    margin-left: 1rem;
  }
  form {
    margin-top: 0.5rem;
    margin-left: 0rem;
  }
  .submit {
    margin-top: 0rem;
  }
}
@media only screen and (max-width: 604px) {
  .x {
    margin-left: 12rem;
    width: 1rem;
  }
  .space {
    font-size: 0.6rem;
  }
}
@media only screen and (max-width: 404px) {
  .h2 {
    margin-bottom: 0rem;
    padding: 0;
  }
  .createevent {
    height: 20rem;
  }
  #form {
    margin-top: 0;
  }
  svg {
    width: 0.5rem;
    margin-left: 0px;
  }
  .times {
    margin: 0rem;
  }
  .h2 {
    margin: 10px;
  }
  .x {
    margin-left: 0rem;
    width: 0.5rem;
    margin-top: 0.5rem;
  }
  .formt {
    font-size: 15px;
    margin-left: 10px;
  }
  .space {
    margin-left: 10px;
  }
  .item {
    margin: 0;
  }
  label {
    font-size: 5px;
  }
}
</style>
