<template>
  <div class="changeMonth">
    <ul>
      <span id="prev">&#10094;</span>
      <div class="month"></div>
      <span id="next">&#10095;</span>
    </ul>
  </div>
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
    <ul class="days"></ul>
  </div>
</template>
<style scoped>
.calendar {
  display: flex;
  flex-direction: row;
  list-style: none;
}
</style>
