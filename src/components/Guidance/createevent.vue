<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
const hidee = true;
let title: String;
let date: String;
let time: String;
let people: String;
let description: String;

function submit(date: String, people: String, time: String) {
  console.log(date);
  console.log(people);
  document.getElementById("form").reset();
  let json = JSON.stringify(date, time);
  userStore.changeMeeting("123", date);

  console.log(json);
}
//2007-12-03T10:15:30Z
// if (
//   userStore.data.student.meeting != undefined ||
//   userStore.data.student.meeting != null
// ) {
//   const SplitTime = userStore.data.student.meeting.substring(11, 16).split(":"); // Substring is there to get only the time part (2023-05-01T16:09:54+00:00 was the value for meeting)
//   if (SplitTime[0] > 12) {
//     SplitTime[0] -= 12;
//     time = SplitTime.join(":") + " PM";
//   } else {
//     time = SplitTime.join(":") + " AM";
//   }
//   const SplitDate = userStore.data.student.meeting.substring(0, 10).split("-");
//   SplitDate.splice(0, 3, SplitDate[1], SplitDate[2], SplitDate[0]);
//   date = SplitDate.join("/");
// }

// function hide() {
//   const createevent = document.querySelector(".createevent");
//   if (createevent.style.display === "block") {
//     createevent.style.display === "none";
//   } else {
//     createevent.style.display === "none";
//   }
// }
function show() {
  const createevent = document.querySelector(".createevent");
  if (createevent.style.display === "none") {
    createevent.style.display = "block";
  } else {
    createevent.style.display = "block";
  }
}
</script>

<template>
  <div class="event h-screen w-full flex flex-column mt-20">
    <button class="test" @click="show">create event</button>
    <div v-if="hidee" class="createevent h-screen flex flex-row m-auto mt-5">
      <div class="event">
        <div class="top">
          <h2 class="h2 font-bold">Create Event</h2>
          <button class="mt-5" @click="hide">
            <svg
              class="x"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
              />
            </svg>
          </button>
        </div>

        <form id="form" @submit.prevent="createevent">
          <div class="item">
            <label class="formt" for="title">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                /></svg
              >Title
            </label>
            <input
              class="space"
              type="text"
              v-model="title"
              placeholder="Title"
            />
          </div>
          <div class="times">
            <div class="item">
              <label class="formt" for="date">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
                  />
                </svg>
                Date</label
              >
              <input
                class="space d"
                type="date"
                v-model="date"
                placeholder="Date"
              />
            </div>
            <div class="item">
              <label class="formt" for="time">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                  <path
                    d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                  />
                </svg>
                Time</label
              >
              <input
                class="space d"
                type="time"
                v-model="time"
                placeholder="Time"
              />
            </div>
          </div>

          <div class="item">
            <label class="formt" for="emails">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                />
              </svg>
              Notify Student
            </label>
            <input
              class="space"
              type="email"
              v-model="people"
              placeholder="Notify People"
            />
          </div>
          <div class="item">
            <label class="formt" for="description"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                />
              </svg>
              Description
            </label>
            <input
              class="space"
              type="text"
              v-model="description"
              placeholder="Description"
            />
          </div>
          <div class="item submit">
            <button
              @click="submit(date, people)"
              type="submit"
              class="font-bold"
            >
              Save
            </button>
          </div>
        </form>
        <div class="events">
          <p>Title : {{ title }}</p>
          <p>Date : {{ date }}</p>
          <p>People : {{ people }}</p>
          <p>Description : {{ description }}</p>
        </div>
      </div>
    </div>
    <div class="tab freshman">Freshman meet</div>
    <div class="tab sophomore">Sophomore meet</div>
    <div class="tab junior">Junior meet</div>
    <div class="tab senior">Senior meet</div>
  </div>
</template>

<style scoped>
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
  margin-bottom: 0rem;
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
  display: none;
  width: 65%;
  height: 35rem;
  border-radius: 1rem;
  margin-top: 5rem;
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
    width: 70%;
    height: 35rem;
    border-radius: 0.8rem;
    margin-top: 3rem;
    border: 1px black solid;
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
    width: 65%;
    height: 22rem;
    border-radius: 0.8rem;
    margin-top: 2rem;
    border: 1px black solid;
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
    width: 65%;
    height: 17rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    padding-bottom: 0;
    border: 1px black solid;
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
