<template>
  <div id="printPage" class="flex w-[40vw] border border-gray-500 rounded-md">
    <div class="p-4">
      <div class="overflow-y-auto max-h-100">
        <ul class="my-4" v-for="(meeting, index) in studentInfo" :key="index">
          <h2 class="ml-6 ">Dear {{ meeting.name }},</h2>
          <h2>Your guidance counselor has scheduled a meeting with you for INPUT TIME on {{ formatDate(meeting.meetingDate) }}. 
            Please meet with them during the specified time.Your guidance counselor has made the following notes:
            {{ meeting.memo }}
          </h2>        
        </ul>
      </div>
    </div>
  </div>
  <div class="item submit ml-6 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer w-fit">
    <button class="flex flex-row items-center font-bold bg-[#e5e7be] px-4 py-2 rounded-2xl w-fit h-fit" type="submit" @click="printMeetingTicket">
      <Printer class="mr-3"/> Print
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import { studentMeetings } from "../../types/interface";
import { sharedState } from "../../stores/function";
import Printer from "../icons/Printer.vue";

const guidanceStore = useGuidanceStore();
const studentInfo: Ref<studentMeetings[]> = ref([]);

const validMeetings = guidanceStore.allStudents.edges.filter(
  (student) =>
    student.node.meeting !== null && student.node.meeting !== undefined
);

const currentDate = new Date();
for (const student of validMeetings) {
  const meetingDate = new Date(student.node.meeting as string);
  // const meetingTime = 
  const meetingDescription = student.node.description
  if (meetingDate > currentDate) {
    const studentMeetingsData: studentMeetings = {
      name:
        `${student.node.user.firstName} ${student.node.user.lastName}`
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' '),
      meetingDate: meetingDate,
      memo: meetingDescription, 
      // time: meetingTime
    };
    studentInfo.value.push(studentMeetingsData);
  }
}

// const studentInfo = guidanceStore.allStudents.edges
//   .filter((student) => student.node.meeting)
//   .map((student) => ({
//     name: `${student.node.user.firstName} ${student.node.user.lastName}`
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" "),
//     meetingDate: student.node.meeting,
//     description: student.node.description,
//     grade: student.node.grade,
// }));

function formatDate(meetingDate: Date): string {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  //@ts-ignore
  return meetingDate.toLocaleDateString("en-US", options);
};

const printMeetingTicket = () =>{
  const allBody = document.body.innerHTML;  
  const partPrint = document.getElementById("printPage").innerHTML;
  document.body.innerHTML = partPrint;
  window.print();
  document.body.innerHTML = allBody;
};

</script>