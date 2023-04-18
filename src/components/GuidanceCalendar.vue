<template>
  <div class="container">
    <div class="select">
      <ul class="changeMonth text-4xl font-bold">
        <span class="" id="prev">&#10094;</span>
        <div class="month">January</div>
        <span id="next">&#10095;</span>
      </ul>
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
      <ul class="days"></ul>
    </div>
  </div>
</template>
<style scoped>
.container {
  margin-top: 8rem;
  margin-left: 4rem;
}
.changeMonth {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
}
.month {
  margin: 0 1.5rem 0 1.5rem;
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
}
</style>
