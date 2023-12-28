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
import { useUserStore } from "../../stores/user";
import { useGuidanceStore } from "../../stores/guidance";
import { studentMeetings } from "../../types/interface";
//@ts-ignore
import dateformat from "dateformat";

const guidanceStore = useGuidanceStore();

const meetingsData: Ref<studentMeetings[]> = ref([]);

async function fetchStudentInfo() {
  const { access_token } = useUserStore();
  try {
    // GET request for meetings
    const meetingsResponse = await fetch(
      `${import.meta.env.VITE_URL}/guidance/meetings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const data = (await meetingsResponse.json()).map((student) => ({
      name: student.name
        .split(",")
        .map((part) => part.trim().toLowerCase())
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(", "),
      meetingDate: student.meeting,
      description: student.meeting_description,
      grade: student.grade,
      email: student.email,
    }));
    console.log(data);
    meetingsData.value = data;
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function updateStudentMeetings() {
  meetingsData.value = (await fetchStudentInfo()).map((student) => ({
    name: `${student.name}`,
    meetingDate: new Date(student.meetingDate as string),
    meetingTime: dateformat(new Date(student.meetingDate as string), "shortTime"),
  })).sort((a, b) => a.meetingDate.getTime() - b.meetingDate.getTime());
}

// update upcoming meetings on load
onMounted(() => {
  updateStudentMeetings();
});
// update upcoming meetings whenever a meeting is added
watch(meetingsData.value, () => {
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