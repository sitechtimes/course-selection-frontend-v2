<template>
  <div class="upcoming">
    <div class="title border-gray-500">
      <h1 class="py-2 px-4 text-center font-extrabold">Upcoming Events</h1>
    </div>
    <div class="events">
      <ul class="eventContainer">
        <h2 class="date">Nov 8, 2023</h2>
        <li class="event">Jessie's Birthday</li>
      </ul>
      <ul class="eventContainer">
        <h2 class="date">Nov 8, 2023</h2>
        <li class="event">Jessie's Birthday</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.upcoming {
  width: 25%;
  border: solid grey 2px;
  border-radius: 0.5rem;
}
.title {
  font-size: 1.5rem;
  border-bottom: grey solid 2px;
}
.events {
  margin: 1rem 1.5rem 0rem 1.5rem;
}
.eventContainer {
  margin-top: 1rem;
}
.date {
  font-weight: bold;
  font-size: 1.2rem;
}
.event {
  margin-left: 1rem;
  list-style-type: disc;
  list-style-position: inside;
}
</style>
