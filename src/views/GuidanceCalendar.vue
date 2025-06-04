<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container w-screen">
      <div class="flex flex-row mb-5 text-5xl font-bold w-[90%] items-center">
        <span
          class="arrow cursor-pointer text-2xl"
          id="prev"
          ref="prev"
          @click="changeWeek(false)"
          >&#x276E;</span
        >
        <div
          class="flex flex-row text-2xl mx-4 cursor-pointer hover:opacity-80"
          @click="toggleWeekSelector"
          title="Select Week"
        >
          {{ displayedWeekRange }}
        </div>
        <span
          class="arrow cursor-pointer text-2xl"
          id="next"
          ref="next"
          @click="changeWeek(true)"
        >
          &#x276F;
        </span>
      </div>
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8 mb-12">
        <div class="calendar w-full lg:w-3/4">
          <ul class="weeks bg-primary-g">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul class="days">
            <li
              class="hover:visible group min-h-[10rem] relative pb-7"
              v-for="(day, dayIndex) in calendarData"
              :key="day.todaysDate.toISOString()"
            >
              <p class="mt-2 text-end mr-2 mb-1">
                {{ day.todaysDate.getUTCMonth() + 1 }} /
                {{ day.todaysDate.getUTCDate() }}
              </p>
              <div
                v-for="(group, groupIndex) in day.periodGroups"
                :key="group.period"
                class="w-full"
              >
                <div v-if="group.meetings.length > 0">
                  <p
                    @click="togglePeriodDropdown(dayIndex, groupIndex)"
                    class="cursor-pointer text-center font-semibold p-1 bg-gray-200 hover:bg-gray-300 mb-1"
                  >
                    Period {{ group.period }} ({{ group.meetings.length }})
                    <span v-if="group.isOpen">&#9207;</span>
                    <span v-else>&#9205;</span>
                  </p>
                  <div v-if="group.isOpen">
                    <div
                      v-for="meeting in group.meetings"
                      :key="meeting.id"
                      @click="toggleDetails(meeting)"
                    >
                      <p
                        :class="`w-full text-center p-1.5 mb-1 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md ${
                          classColor[meeting.grade]
                        }`"
                      >
                        {{ meeting.student }}
                        {{ formatDisplayTime(meeting.date) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                @click="toggleEvent(day)"
                class="h-10 opacity-0 group-hover:opacity-100 cursor-pointer text-3xl leading-[0] transition-all duration-300 absolute bottom-0 right-0 mr-2"
              >
                +
              </button>
            </li>
          </ul>
        </div>
        <div class="w-full lg:w-1/4 mt-8 lg:mt-0 hidden lg:block">
          <UpcomingMeetings />
        </div>
      </div>
    </div>
    <CreateEvent v-if="showEvent" :todaysDate="createEventDate" />
    <MeetingDetails v-if="showDetails" :meeting="selectedMeeting" />
    <WeekSelector
      v-if="showWeekSelector"
      :current-first-day="firstDay"
      @week-selected="handleWeekSelected"
      @close="toggleWeekSelector"
    />
  </div>
</template>

<script setup lang="ts">
import UpcomingMeetings from "../components/Guidance/UpcomingMeetings.vue";
import MeetingDetails from "../components/Guidance/MeetingDetails.vue";
import WeekSelector from "../components/Guidance/WeekSelector.vue";
import CreateEvent from "../components/Guidance/CreateEvent.vue";
import { ref, onMounted, watchEffect, computed } from "vue";
import { useUserStore } from "../stores/user";
import { Meeting } from "../types/interface";

interface PeriodGroup {
  period: number | string;
  meetings: Meeting[];
  isOpen: boolean;
}

interface DateInfoWithPeriods {
  todaysDate: Date;
  periodGroups: PeriodGroup[];
}

document.title = "Calendar & Events | SITHS Course Selection";

const selectedMeeting = ref<Meeting>({} as Meeting);
const calendarData = ref<DateInfoWithPeriods[]>([]);
const showWeekSelector = ref(false);
const createEventDate = ref("");
const showDetails = ref(false);
const showEvent = ref(false);

const userStore = useUserStore();

const classColor: Record<number, string> = {
  9: "bg-[#F5CDCD] text-[#590000]",
  10: "bg-[#D2F6D2] text-[#003400]",
  11: "bg-[#EED7FD] text-[#2D004B]",
  12: "bg-[#CCDDF5] text-[#002254]",
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const periodsMap = [
  { startTime: "08:00", endTime: "08:41", period: 1 },
  { startTime: "08:42", endTime: "09:26", period: 2 },
  { startTime: "09:27", endTime: "10:17", period: 3 },
  { startTime: "10:18", endTime: "11:02", period: 4 },
  { startTime: "11:03", endTime: "11:47", period: 5 },
  { startTime: "11:48", endTime: "12:32", period: 6 },
  { startTime: "12:33", endTime: "13:17", period: 7 },
  { startTime: "13:18", endTime: "14:02", period: 8 },
  { startTime: "14:03", endTime: "14:47", period: 9 },
];

const currentDate = new Date();
const initialStartOfWeekLocal = new Date(currentDate);
initialStartOfWeekLocal.setDate(currentDate.getDate() - currentDate.getDay());
initialStartOfWeekLocal.setHours(0, 0, 0, 0);

const firstDay = ref(
  new Date(
    Date.UTC(
      initialStartOfWeekLocal.getFullYear(),
      initialStartOfWeekLocal.getMonth(),
      initialStartOfWeekLocal.getDate()
    )
  )
);

const displayedWeekRange = computed(() => {
  const start = firstDay.value;
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);

  const startMonthStr = months[start.getUTCMonth()];
  const startDateNum = start.getUTCDate();
  const endMonthStr = months[end.getUTCMonth()];
  const endDateNum = end.getUTCDate();
  const year = start.getUTCFullYear();

  if (start.getUTCMonth() === end.getUTCMonth()) {
    return `${startMonthStr} ${startDateNum} - ${endDateNum}, ${year}`;
  } else {
    return `${startMonthStr} ${startDateNum} - ${endMonthStr} ${endDateNum}, ${year}`;
  }
});

onMounted(() => renderCalendar());

const toggleWeekSelector = () => {
  showWeekSelector.value = !showWeekSelector.value;
};

const toggleDetails = (meeting: Meeting) => {
  selectedMeeting.value = meeting;
  showDetails.value = !showDetails.value;
};

const toggleEvent = (dateInfo: DateInfoWithPeriods) => {
  const eventDate = dateInfo.todaysDate;
  createEventDate.value = `${eventDate.getUTCFullYear()}-${(
    eventDate.getUTCMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${eventDate.getUTCDate().toString().padStart(2, "0")}`;
  showEvent.value = !showEvent.value;
};

const period = (time: Date): number | string => {
  const checkTotalMinutes = time.getHours() * 60 + time.getMinutes();
  for (const p of periodsMap) {
    const [startHours, startMinutes] = p.startTime.split(":").map(Number);
    const [endHours, endMinutes] = p.endTime.split(":").map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    if (
      checkTotalMinutes >= startTotalMinutes &&
      checkTotalMinutes <= endTotalMinutes
    ) {
      return p.period;
    }
  }
  return "N/A";
};

const renderCalendar = () => {
  const days: DateInfoWithPeriods[] = [];
  const startOffsetDateUtc = new Date(firstDay.value); // Create a copy to avoid modifying firstDay.value directly

  for (let i = 0; i < 7; i++) {
    const todaysDate = new Date(startOffsetDateUtc);
    todaysDate.setUTCDate(startOffsetDateUtc.getUTCDate() + i);
    todaysDate.setUTCHours(0, 0, 0, 0);

    const dayMeetings = userStore.meetings
      .filter((meeting) => {
        const meetingDate = new Date(meeting.date);
        meetingDate.setUTCHours(0, 0, 0, 0);
        return (
          meetingDate.getUTCFullYear() === todaysDate.getUTCFullYear() &&
          meetingDate.getUTCMonth() === todaysDate.getUTCMonth() &&
          meetingDate.getUTCDate() === todaysDate.getUTCDate()
        );
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const groupedByPeriod: Record<string, Meeting[]> = {};
    dayMeetings.forEach((meeting) => {
      const meetingDateObj = new Date(meeting.date);
      const p = period(meetingDateObj);
      if (!groupedByPeriod[p]) {
        groupedByPeriod[p] = [];
      }
      groupedByPeriod[p].push(meeting);
    });

    const periodGroups: PeriodGroup[] = [];
    for (const pMap of periodsMap) {
      const pNum = pMap.period;
      if (groupedByPeriod[pNum]) {
        periodGroups.push({
          period: pNum,
          meetings: groupedByPeriod[pNum].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          ),
          isOpen: false,
        });
      } else {
        periodGroups.push({
          period: pNum,
          meetings: [],
          isOpen: false,
        });
      }
    }
    if (groupedByPeriod["N/A"]) {
      periodGroups.push({
        period: "N/A",
        meetings: groupedByPeriod["N/A"].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
        isOpen: false,
      });
    }

    const finalPeriodGroups = periodGroups.filter(
      (pg) => pg.meetings.length > 0 || pg.period !== "N/A"
    );

    days.push({
      todaysDate: new Date(todaysDate),
      periodGroups:
        finalPeriodGroups.length > 0
          ? finalPeriodGroups
          : Object.entries(groupedByPeriod)
              .map(([p, meetingsInPeriod]) => ({
                period: isNaN(Number(p)) ? p : Number(p),
                meetings: meetingsInPeriod.sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                ),
                isOpen: false,
              }))
              .sort((a, b) => {
                if (a.period === "N/A") return 1;
                if (b.period === "N/A") return -1;
                return (a.period as number) - (b.period as number);
              }),
    });
  }
  calendarData.value = days;
};

const togglePeriodDropdown = (dayIndex: number, groupIndex: number) => {
  const group = calendarData.value[dayIndex]?.periodGroups[groupIndex];
  if (group) {
    group.isOpen = !group.isOpen;
  }
};

const formatDisplayTime = (isoString: Date | string) => {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${formattedMinutes} ${ampm}`;
};

watchEffect(() => {
  renderCalendar();
});

const handleWeekSelected = (selectedStartOfWeekUtc: Date) => {
  if (
    selectedStartOfWeekUtc instanceof Date &&
    !isNaN(selectedStartOfWeekUtc.getTime())
  ) {
    firstDay.value = selectedStartOfWeekUtc;
  } else {
    console.error(
      "Invalid date received from WeekSelector:",
      selectedStartOfWeekUtc
    );
  }
  showWeekSelector.value = false;
};

const changeWeek = (next: boolean) => {
  const newFirstDay = new Date(firstDay.value);
  newFirstDay.setUTCDate(newFirstDay.getUTCDate() + (next ? 7 : -7));
  firstDay.value = newFirstDay;
};
</script>

<style scoped>
@media (max-width: 767px) {
  .calendar .weeks,
  .calendar .days {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .calendar .weeks li,
  .calendar .days li {
    min-width: 90px;
  }
}

@media (min-width: 768px) {
  .calendar li {
    width: calc(100% / 5);
    flex: 1 1 0%;
    min-width: 0;
    font-size: 1.07rem;
  }

  .weeks li {
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-weight: 800;
    font-size: 1.2rem;
  }

  .calendar .days li {
    min-height: 10rem;
  }

  .days li {
    font-size: 0.9rem;
  }
}

.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.calendar li {
  font-size: 1.07rem;
}

.calendar .weeks li {
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 1px solid grey;
  font-weight: 800;
  font-size: 1.2rem;
  cursor: default;
  box-sizing: border-box;
}

.calendar .days li {
  border: 1px solid grey;
  font-size: 0.9rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.period-header {
  background-color: #f0f0f0;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  text-align: left;
}

.period-header:hover {
  background-color: #e0e0e0;
}

.meeting-item {
  padding: 0.25rem;
  margin-left: 0.5rem;
}
</style>
