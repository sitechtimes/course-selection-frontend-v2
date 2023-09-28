<template>
  <div class="w-[25vw] border border-gray-500 rounded-md">
    <div class="border-b border-gray-500">
      <h1 class="py-2 px-4 text-center font-extrabold text-2xl">Upcoming Events</h1>
    </div>
    <div class="p-4">
      <div class="overflow-y-auto max-h-100">
        <ul class="my-4" v-for="(meeting, index) in studentInfo" :key="index">
          <h2 class="font-bold text-lg">{{ formatDate(meeting.meetingDate) }}</h2>
          <li class="ml-6 list-disc">{{ meeting.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import { StudentMeeting } from "../../types/interface";

const guidanceStore = useGuidanceStore();

const studentInfo: Ref<StudentMeeting[]> = ref([]); //initalise array as an array


//filter out valid meetings within the guidance store
const validMeetings = guidanceStore.allStudents.edges.filter(
  (student) =>
    student.node.meeting !== null && student.node.meeting !== undefined
);

const currentDate = new Date();
for (const student of validMeetings) { //for each student with a valid meeting...
  const meetingDate = new Date(student.node.meeting);
  //if the meeting is before the current date, dont show it
  if (meetingDate > currentDate) {
    const studentMeetings = {
      name: `${student.node.user.firstName} ${student.node.user.lastName}`,//extract first and last name
      meetingDate: student.node.meeting,
    };
    studentInfo.value.push(studentMeetings); //push the meetings into the array
  }
}

//sort the meetings
studentInfo.value.sort((a, b) => {
  return new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime();
});

//convert the date to weekday, mm/dd/yy
function formatDate(meetingDate: string): string {
  const event = new Date(meetingDate);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return event.toLocaleDateString("en-US", options);
}
</script>
