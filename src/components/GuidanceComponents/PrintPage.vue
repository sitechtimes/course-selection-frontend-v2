<template>
  <div class="flex flex-col">
    <div
      id="printPage"
      class="flex w-[40vw] m-4 p-2 border border-gray-500 rounded-md"
    >
      <div class="p-4">
        <div class="overflow-y-auto max-h-100">
          <ul class="my-4">
            <p class="">Dear {{ studentName }},</p>
            <p class="indent-8">
              Your guidance counselor has scheduled a meeting with you for
              {{ meetingTime }} on {{ meetingDate }}. Please meet with them
              during the specified time. Your guidance counselor has made the
              following notes:
            </p>
            <br />
            <p>{{ meetingDescription }}</p>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="item submit ml-4 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer w-fit"
    >
      <button
        class="flex flex-row items-center font-bold text-[1.2rem] bg-[#e5e7be] px-4 py-2 rounded-lg w-fit h-fit"
        type="submit"
        @click="printMeetingTicket"
      >
        <PrinterIcon class="mr-3" /> Print
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, onMounted } from "vue";
import { useGuidanceStore } from "../../stores/guidance";
import { studentMeetings } from "../../types/interface";
import PrinterIcon from "../icons/PrinterIcon.vue";
import { useRoute, useRouter } from "vue-router";
//@ts-ignore
import dateformat from "dateformat";

const route = useRoute();
const router = useRouter();
const email = route.params.email;

const guidanceStore = useGuidanceStore();

const studentIndexAll = guidanceStore.allStudents.edges.findIndex(
  (student) => student.node.user.email === email
);

const studentIndex = guidanceStore.guidance.students.findIndex(
  (student) => student.user.email === email
);

console.log(guidanceStore.allStudents.edges[studentIndex]);
console.log(guidanceStore.guidance.students[studentIndex]);

const studentName =
  guidanceStore.allStudents.edges[studentIndex].node.user.firstName;

const DateAndTime = guidanceStore.allStudents.edges[studentIndex].node.meeting;

const meetingTime = dateformat(DateAndTime, "shortTime");

const meetingDate = dateformat(DateAndTime, "shortDate");

const meetingDescription =
  guidanceStore.allStudents.edges[studentIndex].node.description;

const printMeetingTicket = () => {
  const allBody = document.body.innerHTML;
  const partPrint = document.getElementById("printPage").innerHTML;
  document.body.innerHTML = partPrint;
  window.print();
  document.body.innerHTML = allBody;
};
/*
defineProps({
  meetingDetails: {
    type: Object,
    required: true,
  },
});


const studentInfo: Ref<studentMeetings[]> = ref([]);

const validMeetings = guidanceStore.allStudents.edges.filter(
  (student) =>
    student.node.meeting !== null && student.node.meeting !== undefined
);

const currentDate = new Date();
for (const student of validMeetings) {
  const meetingDate = new Date(student.node.meeting as string);
  const meetingDescription = student.node.description;
  const meetingTime = dateformat(meetingDate, "shortTime");
  console.log(new Date(student.node.meeting as string));
  if (meetingDate > currentDate) {
    const studentMeetingsData: studentMeetings = {
      name: `${student.node.user.firstName} ${student.node.user.lastName}`
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
      meetingDate: meetingDate,
      meetingTime: meetingTime,
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
}

const printMeetingTicket = () => {
  const allBody = document.body.innerHTML;
  const partPrint = document.getElementById("printPage").innerHTML;
  document.body.innerHTML = partPrint;
  window.print();
  document.body.innerHTML = allBody;
};*/
</script>

<style scoped>
button:hover {
  opacity: 0.5;
}

svg {
  width: 1.2rem;
  margin-right: 10px;
  fill: #37394f;
}
</style>
