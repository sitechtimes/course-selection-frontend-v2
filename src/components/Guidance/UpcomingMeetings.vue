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
              {{
                meeting.date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
              - Meeting with {{ meeting.student.firstName }}
              {{ meeting.student.lastName }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { Meeting } from "../../types/interface";
import { ref, computed, onMounted } from "vue";

const userStore = useUserStore();
const todaysDate = new Date();

const groupedStudentMeetings = computed(() =>
  userStore.meetings
    .filter((meeting) => meeting.date > todaysDate)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .reduce((acc: { [key: string]: Meeting[] }, meeting) => {
      (acc[meeting.date.toISOString().split("T")[0]] ||= []).push(meeting);
      return acc;
    }, {} as { [key: string]: Meeting[] })
);
</script>
