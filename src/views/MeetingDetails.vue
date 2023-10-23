<template>
  <div class="">
    <MeetingDetails :meetingDetails="meetingDetails"/>
  </div>
</template>

<script setup lang="ts">
import MeetingDetails from "../components/GuidanceComponents/MeetingDetails.vue";

const meetingDetails = {
  student: "John Doe",
  date: "10/04/23",
  time: "10:56",
  memo: "hi"
};

</script>

