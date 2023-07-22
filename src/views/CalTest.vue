<template>
   <div class="wrapper">
      <header>
        <p ref="currentDate"></p>
        <div class="icons">
            <div id="prev" ref="prev" @click="test"> back </div>
            <div id="next" ref="next" @click="test"> next </div>
          <!-- <span id="prev" ref="prev" class="material-symbols-rounded">chevron_left</span>
          <span id="next" ref="next" class="material-symbols-rounded">chevron_right</span> -->
        </div>
      </header>
      <div class="calendar">
        <ul class="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <!-- <ul ref="daysTag"></ul> -->
        <ul class="days" v-for="h in hmm.wow" :key="h.id">
            <p>{{ h.date }}</p>
        </ul>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, Ref, ref } from 'vue';
const currentDate = ref(null)
// const prev = ref(null)
// const next = ref(null)
// const prev = document.querySelector('#prev')
// const next = document.querySelector('#next')
const daysTag = ref(null)

// const daysTag = document.querySelector(".days")
// currentDate = document.querySelector(".current-date"),
// prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date()
let currYear = date.getFullYear()
let currMonth = date.getMonth()
let hmm = reactive([])
let wo = ref(0)

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];



const renderCalendar = () => {
    console.log('!')
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay() // getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate()// getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay() // getting last day of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    let wow = []
    console.log(firstDayofMonth)
    console.log(lastDateofMonth)
    console.log(lastDayofMonth)
    console.log(lastDateofLastMonth)
  

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        const ehe = {
            type: 'inactive',
            date: lastDateofLastMonth - i + 1
        }
        wow.push(ehe)
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
        const ehe = {
            type: 'active',
            date: i,
            id: i + 'p'
        }
        wow.push(ehe)
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        const ehe = {
            type: 'inactive',
            date: i - lastDayofMonth + 1,
            id: i + 'o'
        }
        wow.push(ehe)
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    // console.log(wow)
    hmm.wow = wow
    hmm.wo = wo.value +1
    console.log(wo.value, 'o')
    wo.value = hmm.wo
    console.log(hmm)
    // daysTag.innerHTML = liTag;
    // console.log(liTag)
}
renderCalendar();

// prevNextIcon.forEach(icon => { // getting prev and next icons
//     prev.addEventListener("click", () => { // adding click event on both icons
//         // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
//         currMonth = currMonth - 1 

//         if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
//             // creating a new date of current year & month and pass it as date value
//             date = new Date(currYear, currMonth, new Date().getDate());
//             currYear = date.getFullYear(); // updating current year with new date year
//             currMonth = date.getMonth(); // updating current month with new date month
//         } else {
//             date = new Date(); // pass the current date as date value
//         }
//         renderCalendar(); // calling renderCalendar function
//     // });
// }

// next.addEventListener("click", () => {
//         currMonth = currMonth + 1 

//         if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
//             // creating a new date of current year & month and pass it as date value
//             date = new Date(currYear, currMonth, new Date().getDate());
//             currYear = date.getFullYear(); // updating current year with new date year
//             currMonth = date.getMonth(); // updating current month with new date month
//         } else {
//             date = new Date(); // pass the current date as date value
//         }
//         renderCalendar(); // calling renderCalendar function
//     // });
// }

const test = () => {
    currMonth = currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar();
}

</script>

<style>
/* Import Google font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: center;
  min-height: 100vh;
  background: #9B59B6;
}
.wrapper{
  width: 450px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.12);
}
.wrapper header{
  display: flex;
  align-items: center;
  padding: 25px 30px 10px;
  justify-content: space-between;
}
header .icons{
  display: flex;
}
header .icons span{
  height: 38px;
  width: 38px;
  margin: 0 1px;
  cursor: pointer;
  color: #878787;
  text-align: center;
  line-height: 38px;
  font-size: 1.9rem;
  user-select: none;
  border-radius: 50%;
}
.icons span:last-child{
  margin-right: -10px;
}
header .icons span:hover{
  background: #f2f2f2;
}
header .current-date{
  font-size: 1.45rem;
  font-weight: 500;
}
.calendar{
  padding: 20px;
}
.calendar ul{
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
}
.calendar .days{
  margin-bottom: 20px;
}
.calendar li{
  color: #333;
  width: calc(100% / 7);
  font-size: 1.07rem;
}
.calendar .weeks li{
  font-weight: 500;
  cursor: default;
}
.calendar .days li{
  z-index: 1;
  cursor: pointer;
  position: relative;
  margin-top: 30px;
}
.days li.inactive{
  color: #aaa;
}
.days li.active{
  color: #fff;
}
.days li::before{
  position: absolute;
  content: "";
  left: 50%;
  top: 50%;
  height: 40px;
  width: 40px;
  z-index: -1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
.days li.active::before{
  background: #9B59B6;
}
.days li:not(.active):hover::before{
  background: #f2f2f2;
}
</style>