<template>
  <div class="w-[25vw] border border-gray-500 rounded-md">
    <div class="border-b border-gray-500">
      <h1 class="py-2 px-4 text-center font-extrabold text-2xl">Upcoming Meetings</h1>
    </div>
    <div class="p-4">
      <div class="overflow-y-auto max-h-100">
        <div v-for="(meetings, date) in groupedStudentMeetings" :key="date">
          <h2 class="font-bold text-lg">{{ date }}</h2>
          <ul class="my-2">
            <li v-for="(meeting, index) in meetings" :key="index" class="ml-6 mt-2 list-disc">
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
//@ts-ignore
import dateformat from "dateformat";

const guidanceStore = useGuidanceStore();
const studentInfo: Ref<studentMeetings[]> = ref([]);

//all students with a scheduled meeting 
const validMeetings = guidanceStore.allStudents.edges.filter(
  (student) =>
    student.node.meeting !== null && student.node.meeting !== undefined
);

//update upcoming meetings whenever a meeting is added
watch(validMeetings, () => {
  updateStudentMeetings();
});

//update upcoming meetings on load
onMounted(() => {
  updateStudentMeetings();
});

function updateStudentMeetings() {
  studentInfo.value = [];
  for (const student of validMeetings) {
    const meetingDate = new Date(student.node.meeting as string);
    if (meetingDate > new Date()) {
      const studentMeetingsData: studentMeetings = {
        name: `${student.node.user.firstName} ${student.node.user.lastName}`,
        meetingDate: meetingDate,
        meetingTime: dateformat(new Date(meetingDate as Date), "shortTime"),
      };
      studentInfo.value.push(studentMeetingsData);
    }
  }
}

//sort meetings by time
studentInfo.value.sort((a, b) => {
  return a.meetingDate.getTime() - b.meetingDate.getTime();
});

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

const groupedStudentMeetings = computed(() => {
  const groupedMeetings: Record<string, studentMeetings[]> = {};
  studentInfo.value.forEach((meeting) => {
    const formattedDate = formatDate(meeting.meetingDate);
    if (!groupedMeetings[formattedDate]) {
      groupedMeetings[formattedDate] = [];
    }
    groupedMeetings[formattedDate].push(meeting);
  });
  return groupedMeetings;
});
</script>