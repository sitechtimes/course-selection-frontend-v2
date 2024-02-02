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
            <li v-for="(meeting, index) in meetings" :key="index" class="ml-6 mt-2 list-disc">
              {{ meeting.meetingTime }} - {{ titleCaseName(meeting.name) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch, onMounted } from "vue";
import { useUserStore } from "../../stores/user";
import { studentGuidance, studentMeetings } from "../../types/interface";
//@ts-ignore
import dateformat from "dateformat";

const userStore = useUserStore();
console.log(userStore.guidanceMeetings);

const meetingsData: Ref<studentMeetings[]> = ref([]);

//this function is not needed
function titleCaseName(name: string): string {
  const titleCaseWord = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); 
  };
  const [lastName, firstName] = name.split(",", 2);
  const titleCasedLastName = lastName.split(" ").map(titleCaseWord).join(" ");
  const titleCasedFirstName = firstName.split(" ").map(titleCaseWord).join(" ");
  return `${titleCasedLastName}, ${titleCasedFirstName}`;
}

async function updateStudentMeetings() {
  meetingsData.value = userStore.guidanceMeetings.map((student: studentMeetings) => ({
    name: `${student.name}`,
    meetingDate: new Date(student.meetingDate),
    meetingTime: dateformat(new Date(student.meetingDate), "shortTime"),
    memo: student.memo,
  }))
  .sort((a, b) => a.meetingDate.getTime() - b.meetingDate.getTime());
}

// update upcoming meetings on load
onMounted(() => {
  updateStudentMeetings();
});

// update upcoming meetings whenever a meeting is added
watch(userStore.guidanceMeetings, () => {
  updateStudentMeetings();
});

const todaysDate = new Date();
const groupedStudentMeetings = computed(() => {
  const groupedMeetings: Record<string, studentMeetings[]> = {};
  meetingsData.value
    .filter((meeting) => meeting.meetingDate > todaysDate)
    .forEach((meeting) => {
      const formattedDate = dateformat(meeting.meetingDate, "longDate");
      if (!groupedMeetings[formattedDate]) {
        groupedMeetings[formattedDate] = [];
      }
      groupedMeetings[formattedDate].push(meeting);
    });
  return groupedMeetings;
});
</script>