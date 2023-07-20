<script setup lang="ts"></script>
<template>
  <div class="container">
    <div class="select text-4xl font-bold">
      <span class="arrow cursor-pointer" id="prev">&#10094;</span>
      <div class="mY">
        <h2 class="month mr-1 font-extrabold">April</h2>

        <h2 class="year ml-1 font-extrabold">2023</h2>
      </div>
      <span class="arrow cursor-pointer" id="next">&#10095;</span>
    </div>

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
        <li class="">26<PlusIcon class="plusIcon" /></li>
        <li class="">27<PlusIcon class="plusIcon" /></li>
        <li class="">28<PlusIcon class="plusIcon" /></li>
        <li class=" ">29<PlusIcon class="plusIcon" /></li>
        <li class=" ">30<PlusIcon class="plusIcon" /></li>
        <li class=" ">31<PlusIcon class="plusIcon" /></li>
        <li class=" ">1<PlusIcon class="plusIcon" /></li>
        <li class=" ">2<PlusIcon class="plusIcon" /></li>
        <li class=" ">3<PlusIcon class="plusIcon" /></li>
        <li class=" ">4<PlusIcon class="plusIcon" /></li>
        <li class=" ">5<PlusIcon class="plusIcon" /></li>
        <li class=" ">6<PlusIcon class="plusIcon" /></li>
        <li class=" ">7<PlusIcon class="plusIcon" /></li>
        <li class=" ">8<PlusIcon class="plusIcon" /></li>
        <li class=" ">9<PlusIcon class="plusIcon" /></li>
        <li class=" ">10<PlusIcon class="plusIcon" /></li>
        <li class=" ">11<PlusIcon class="plusIcon" /></li>
        <li class=" ">12<PlusIcon class="plusIcon" /></li>
        <li class=" ">13<PlusIcon class="plusIcon" /></li>
        <li class=" ">14<PlusIcon class="plusIcon" /></li>
        <li class=" ">15<PlusIcon class="plusIcon" /></li>
        <li class=" ">16<PlusIcon class="plusIcon" /></li>
        <li class=" ">17<PlusIcon class="plusIcon" /></li>
        <li class=" ">18<PlusIcon class="plusIcon" /></li>
        <li class=" ">19<PlusIcon class="plusIcon" /></li>
        <li class=" ">20<PlusIcon class="plusIcon" /></li>
        <li class=" ">21<PlusIcon class="plusIcon" /></li>
        <li class=" ">22<PlusIcon class="plusIcon" /></li>
        <li class=" ">23<PlusIcon class="plusIcon" /></li>
        <li class=" ">24<PlusIcon class="plusIcon" /></li>
        <li class=" ">25<PlusIcon class="plusIcon" /></li>
        <li class=" ">26<PlusIcon class="plusIcon" /></li>
        <li class=" ">27<PlusIcon class="plusIcon" /></li>
        <li class=" ">28<PlusIcon class="plusIcon" /></li>
        <li class=" ">29<PlusIcon class="plusIcon" /></li>
        <li class=" ">30<PlusIcon class="plusIcon" /></li>
        <li class=" ">1<PlusIcon class="plusIcon" /></li>
        <li class=" ">2<PlusIcon class="plusIcon" /></li>
        <li class=" ">3<PlusIcon class="plusIcon" /></li>
        <li class=" ">4<PlusIcon class="plusIcon" /></li>
        <li class=" ">5<PlusIcon class="plusIcon" /></li>
        <li class=" ">6<PlusIcon class="plusIcon" /></li>
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
/* .wrapper header {
  display: flex;
  align-items: center;
  padding: 25px 30px 10px;
  justify-content: space-between;
} */
.calendar {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.05);
  border: grey 1px solid;
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
  z-index: 1;
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 5.8rem;
  padding-right: 0.8rem;
  text-align: end;
}
.days li {
  border: grey 1px solid;
  font-size: 0.7rem;
}
.plusIcon {
  width: 0.5rem;
  padding-top: 4rem;
  cursor: pointer;
  display: none;
}
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
</style>
