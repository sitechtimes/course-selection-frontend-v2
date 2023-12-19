<template>
  <div class="w-[25vw] border border-gray-500 rounded-md">
    <div class="border-b border-gray-500">
      <h1 class="py-2 px-4 text-center font-extrabold text-2xl">
        Upcoming Meetings
      </h1>
    </div>
    <div class="p-4">
      <div class="overflow-y-auto max-h-100">
        <div v-for="(meetings, date) in groupedStudentMeetings" :key="date">
          <h2 class="font-bold text-lg">{{ date }}</h2>
          <ul class="my-2">
            <li
              v-for="(meeting, index) in meetings"
              :key="index"
              class="ml-6 mt-2 list-disc"
            >
              {{ meeting.meetingTime }} - {{ meeting.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch, onMounted } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import { studentMeetings } from "../../types/interface";
import { useUserStore } from "../../stores/user";
//@ts-ignore
import dateformat from "dateformat";

const guidanceStore = useGuidanceStore();
//i dont know if i need this bit
/* const studentInfo = await fetch(
  `${import.meta.env.VITE_URL}/guidance/students`
); */

//this is the code i have to fix i think
/* function updateStudentMeetings1() {
  //all students with a scheduled meeting
  const validMeetings = guidanceStore.allStudents.edges.filter(
    (student) =>
      student.node.meeting !== null && student.node.meeting !== undefined
  ); //dont need this
  studentInfo.value = validMeetings.map((student) => ({
    name: `${student.node.user.firstName} ${student.node.user.lastName}`,
    meetingDate: new Date(student.node.meeting as string),
    meetingTime: dateformat(
      new Date(student.node.meeting as string),
      "shortTime"
    ), //pull from restapi instead of guidance store, then pull out name, meeting date, and meeting time from the api.
  }));
  studentInfo.value.sort((a, b) => {
    return a.meetingDate.getTime() - b.meetingDate.getTime();
  }); //sort the meetings chronologically.
}
 */
let meetingsData = "";
async function updateStudentMeetings() {
  const { access_token } = useUserStore();
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    let meetingsResponse = await fetch(
      `${import.meta.env.VITE_URL}/guidance/meetings`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const meetingsData = (await meetingsResponse.json()).map((student) => ({
      //titlecase name
      name: student.name
        .split(",") //split name at comma (for first & last name)
        .map((part) => part.trim().toLowerCase()) //change all letters to lowercase
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) //capitalise first letter of each name part
        .join(", "), //join the first and last name back together in one string
      meetingDate: student.meeting,
      meetingTime: student.meeting.filter(),
    }));
    return meetingsData;
  } catch (error) {
    console.error("Error:", error);
  }
}
//update upcoming meetings on load
onMounted(() => {
  updateStudentMeetings();
  console.log(meetingsData);
});
//update upcoming meetings whenever a meeting is added
watch(meetingsData, () => {
  updateStudentMeetings();
}); //change this as well

const todaysDate = new Date();
const groupedStudentMeetings = computed(() => {
  const groupedMeetings: Record<string, studentMeetings[]> = {};
  meetingsData //used to be studentInfo.value, cant use student info because thats in a store and thats bad
    .filter((meeting) => meeting.meetingDate > todaysDate) //only show meetings after today,
    .forEach((meeting) => {
      const formattedDate = dateformat(meeting.meetingDate, "longDate");
      //if there are no other meetings with the same date, push into empty array
      if (!groupedMeetings[formattedDate]) {
        groupedMeetings[formattedDate] = [];
      }
      groupedMeetings[formattedDate].push(meeting);
    });
  console.log(groupedMeetings);
  return groupedMeetings;
});
</script>
