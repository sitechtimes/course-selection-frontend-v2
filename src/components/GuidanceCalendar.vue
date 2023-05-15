<script setup lang="ts">
// const daysTag = document.querySelector(".days");
// const currentMonth = document.querySelector(".month");
// const currentYear = document.querySelector(".year");
// const prevNextIcon = document.querySelectorAll(".icons span");
// // getting new date, current year and month
// let date = new Date();
// let currYear = date.getFullYear();
// let currMonth = date.getMonth();
// // storing full name of all months in array
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// const renderCalendar = () => {
//   let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
//     lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
//     lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
//     lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
//   let liTag = "";
//   for (let i = firstDayofMonth; i > 0; i--) {
//     // creating li of previous month last days
//     liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
//   }
//   for (let i = 1; i <= lastDateofMonth; i++) {
//     // creating li of all days of current month
//     // adding active class to li if the current day, month, and year matched
//     let isToday =
//       i === date.getDate() &&
//       currMonth === new Date().getMonth() &&
//       currYear === new Date().getFullYear()
//         ? "active"
//         : "";
//     liTag += `<li class="${isToday}">${i}</li>`;
//   }
//   for (let i = lastDayofMonth; i < 6; i++) {
//     // creating li of next month first days
//     liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
//   }
//   //   currentMonth.innerText = `${months[currMonth]}`;
//   //   currentYear.innerText = `${currYear}`;
//   //   daysTag.innerHTML = liTag;
// };
// renderCalendar();
// prevNextIcon.forEach((icon) => {
//   // getting prev and next icons
//   icon.addEventListener("click", () => {
//     // adding click event on both icons
//     // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
//     currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
//     if (currMonth < 0 || currMonth > 11) {
//       // if current month is less than 0 or greater than 11
//       // creating a new date of current year & month and pass it as date value
//       date = new Date(currYear, currMonth, new Date().getDate());
//       currYear = date.getFullYear(); // updating current year with new date year
//       currMonth = date.getMonth(); // updating current month with new date month
//     } else {
//       date = new Date(); // pass the current date as date value
//     }
//     renderCalendar(); // calling renderCalendar function
//   });
// });
</script>
<template>
  <div class="container">
    <div class="select text-4xl font-bold">
      <span class="arrow cursor-pointer" id="prev">&#10094;</span>
      <div class="mY">
        <h2 class="month mr-1">April</h2>
        <h2 class="year ml-1">2023</h2>
      </div>
      <span class="arrow cursor-pointer" id="next">&#10095;</span>
    </div>
    <div class="calendar">
      <ul class="weeks text-2xl font-bold">
        <li class="border-x-2 px-11">Sun</li>
        <li class="border-s-2 px-11">Mon</li>
        <li class="border-x-2 px-11">Tue</li>
        <li class="border-s-2 px-11">Wed</li>
        <li class="border-x-2 px-11">Thu</li>
        <li class="border-s-2 px-11">Fri</li>
        <li class="border-x-2 px-11">Sat</li>
      </ul>
      <ul class="days">
        <li class="mr-4">26</li>
        <li class="mr-4">27</li>
        <li class="mr-4">28</li>
        <li class="mr-4">29</li>
        <li class="mr-4">30</li>
        <li class="mr-4">31</li>
        <li class="mr-4">1</li>
        <li class="mr-4">2</li>
        <li class="mr-4">3</li>
        <li class="mr-4">4</li>
        <li class="mr-4">5</li>
        <li class="mr-4">6</li>
        <li class="mr-4">7</li>
        <li class="mr-4">8</li>
        <li class="mr-4">9</li>
        <li class="mr-4">10</li>
        <li class="mr-4">11</li>
        <li class="mr-4">12</li>
        <li class="mr-4">13</li>
        <li class="mr-4">14</li>
        <li class="mr-4">15</li>
        <li class="mr-4">16</li>
        <li class="mr-4">17</li>
        <li class="mr-4">18</li>
        <li class="mr-4">19</li>
        <li class="mr-4">20</li>
        <li class="mr-4">21</li>
        <li class="mr-4">22</li>
        <li class="mr-4">23</li>
        <li class="mr-4">24</li>
        <li class="mr-4">25</li>
        <li class="mr-4">26</li>
        <li class="mr-4">27</li>
        <li class="mr-4">28</li>
        <li class="mr-4">29</li>
        <li class="mr-4">30</li>
        <li class="mr-4">1</li>
        <li class="mr-4">2</li>
        <li class="mr-4">3</li>
        <li class="mr-4">4</li>
        <li class="mr-4">5</li>
        <li class="mr-4">6</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.container {
  margin-top: 8rem;
  margin-left: 4rem;
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
/* .calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  text-align: center;
}
.weeks {
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-around;
  text-align: center;
  width: 65%;
  border-style: solid;
  border-width: 2px;
} */
body {
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: center;
  min-height: 100vh;
  background: #9b59b6;
}
.wrapper {
  width: 450px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}
.wrapper header {
  display: flex;
  align-items: center;
  padding: 25px 30px 10px;
  justify-content: space-between;
}
.calendar {
  padding: 20px;
}
.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  overflow: hidden;
}
.weeks {
  text-align: center;
}
.calendar .days {
  margin-bottom: 20px;
}
.days {
  text-align: right;
  margin-top: 1rem;
}
.calendar li {
  color: #333;
  width: calc(100% / 7);
  font-size: 1.07rem;
}
.calendar .weeks li {
  font-weight: 500;
  cursor: default;
  width: calc(100% / 7);
}
.calendar .days li {
  z-index: 1;
  cursor: pointer;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 4rem;
  padding-right: 1rem;
}
.days li {
  border: #e5e7eb 2px solid;
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
</style>
