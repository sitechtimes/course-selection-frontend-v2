<template>
  <div class="w-[25vw] border border-gray-500 rounded-md">
    <div class="border-b border-gray-500">
      <h1 class="py-2 px-4 text-center font-extrabold text-2xl">
        Upcoming Meetings
      </h1>
    </div>
    <div class="p-4">
      <div class="overflow-y-auto max-h-100">
        <ul class="my-4" v-for="(meeting, index) in studentInfo" :key="index">
          <h2 class="font-bold text-lg">
            {{ formatDate(meeting.meetingDate) }}
          </h2>
          <li class="ml-6 list-disc">{{ meeting.name }}</li>
        </ul>
      </div>
    </div>
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
  if (meetingDate > currentDate) {
    const studentMeetingsData: studentMeetings = {
      name: `${student.node.user.firstName} ${student.node.user.lastName}`,
      meetingDate: meetingDate,
    };
    studentInfo.value.push(studentMeetingsData);
  }
}

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

sharedState.sharedFunction.value = () => {
  const validMeetings = guidanceStore.allStudents.edges.filter(
    (student) =>
      student.node.meeting !== null && student.node.meeting !== undefined
  );

  const currentDate = new Date();
  for (const student of validMeetings) {
    const meetingDate = new Date(student.node.meeting as string);
    if (meetingDate > currentDate) {
      const studentMeetingsData: studentMeetings = {
        name: `${student.node.user.firstName} ${student.node.user.lastName}`,
        meetingDate: meetingDate,
      };
      studentInfo.value.push(studentMeetingsData);
      studentInfo.value = [];
      studentInfo.value.push(studentMeetingsData);
    }
  }
};
</script>
