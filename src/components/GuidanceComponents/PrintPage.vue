<template>
  <div id="printPage" class="flex w-[25vw] border border-gray-500 rounded-md">
    <div class="p-4">
      <div class="overflow-y-auto max-h-100">
        <ul class="my-4" v-for="(meeting, index) in studentInfo" :key="index">
          <h2 class="ml-6 ">Dear {{ meeting.name }},</h2>
          <h2>Your guidance counselor would like to speak with you on
            {{ formatDate(meeting.meetingDate) }} for:
            {{ meeting.memo }}
          </h2>        
        </ul>
      </div>
    </div>
  </div>
  <div class="item submit ml-6 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer w-fit">
      <button class="font-bold bg-[#e5e7be] px-4 py-2 rounded-2xl w-fit h-fit" type="submit" @click="printMeetingTicket">Print</button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import { studentMeetings } from "../../types/interface";
import { sharedState } from "../../stores/function";

const guidanceStore = useGuidanceStore();
const studentInfo: Ref<studentMeetings[]> = ref([]);

const validMeetings = guidanceStore.allStudents.edges.filter(
  (student) =>
    student.node.meeting !== null && student.node.meeting !== undefined
);

const currentDate = new Date();
for (const student of validMeetings) {
  const meetingDate = new Date(student.node.meeting as string);
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