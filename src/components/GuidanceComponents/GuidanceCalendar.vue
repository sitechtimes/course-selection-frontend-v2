<template>
  <div class="grid content-center justify-center flex-wrap">
    <div class="container">
      <div class="flex flex-row mb-8 text-4xl font-bold">
        <span
          class="arrow cursor-pointer"
          id="prev"
          ref="prev"
          @click="changeMonth(false)"
          >&#10094;</span
        >
        <div class="mx-2 flex flex-row">
          {{ months[todaysMonth] }} {{ todaysYear }}
        </div>
        <span
          class="arrow cursor-pointer"
          id="next"
          ref="next"
          @click="changeMonth(true)"
          >&#10095;</span
        >
      </div>
      <div class="flex flex-row justify-between space-x-28 mb-12">
        <div class="calendar">
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
            <li class="dayCon" v-for="h in calendarData.dateInfo" :key="h.id">
              <p class="mt-2 text-end mr-2 mb-16">{{ h.todaysDate }}</p>
              <div
                v-for="meeting in h.meetings"
                :key="meeting.id"
                @click="toggleDetails(meeting)"
              >
                <p
                  :class="`w-[100%] text-center truncate ${
                    classColor[meeting.grade]
                  } rounded-md p-1.5 mb-1 font-bold transition duration-500 hover:opacity-80 cursor-pointer hover:shadow-md`"
                >
                  {{ meeting.name }}
                </p>
              </div>
              <PlusIcon
                class="plusIcon w-3 ml-2 cursor-pointer invisible"
                @click="toggleEvent"
              />
            </li>
          </ul>
        </div>
        <UpcomingMeetings />
      </div>
    </div>
    <CreateEvent v-if="showEvent" />
    <MeetingDetails v-if="showDetails" :meetingDetails="meetingDetails" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, onMounted, watchEffect } from "vue";
import { useUserStore } from "../../stores/user";
import { calendarData } from "../../types/interface";
import UpcomingMeetings from "../GuidanceComponents/UpcomingMeetings.vue";
import CreateEvent from "./CreateEvent.vue";
import MeetingDetails from "./MeetingDetails.vue";
import PlusIcon from "../icons/PlusIcon.vue";
//@ts-ignore
import dateformat from "dateformat";

const meetingDetails = {
  name: "",
  date: "",
  time: "",
  memo: "",
  grade: "",
  email: "",
};

onMounted(async () => {
  await renderCalendar();
});

const showEvent: Ref<boolean> = ref(false);
const showDetails: Ref<boolean> = ref(false);

const toggleDetails = (meeting) => {
  //populating meetingDetails
  meetingDetails.name = meeting.meetingDetails.name;
  meetingDetails.date = meeting.meetingDetails.date;
  meetingDetails.time = meeting.meetingDetails.time;
  meetingDetails.memo = meeting.meetingDetails.memo;
  meetingDetails.email = meeting.meetingDetails.email;
  showDetails.value = !showDetails.value;
};

const toggleEvent = () => {
  showEvent.value = !showEvent.value;
};

//index signature for grades
type ClassColor = {
  [grade: string]: string;
};

const classColor: ClassColor = {
  FRESHMAN: "bg-[#F5CDCD] text-[#590000]",
  SOPHOMORE: "bg-[#D2F6D2] text-[#003400]",
  JUNIOR: "bg-[#EED7FD] text-[#2D004B]",
  SENIOR: "bg-[#CCDDF5] text-[#002254]",
};

//get students and their meeting info
async function fetchStudentInfo() {
  const { access_token } = useUserStore();
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    //GET request for meetings
    const meetingsResponse = await fetch(
      `${import.meta.env.VITE_URL}/guidance/meetings`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const meetingsData = (await meetingsResponse.json()).map((student) => ({
      //titlecase name
      name: student.name
        .split(",") //split name at comma (for first & last name)
        .map((part) => part.trim().toLowerCase()) //change all letters to lowercase
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) //capitalise first letter of each name part
        .join(", "), //join the first and last name back together in one string
      meetingDate: student.meeting,
      description: student.meeting_description,
      grade: student.grade,
      email: student.email,
    }));
    return meetingsData;
  } catch (error) {
    console.error("Error:", error);
  }
}

//obtaining information about today's date
let todaysDate = new Date();
let todaysYear = todaysDate.getFullYear();
let todaysMonth = todaysDate.getMonth();
const calendarData: calendarData = reactive({
  dateInfo: [],
});

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

//generates calendar data
const renderCalendar = async () => {
  let firstDayofMonth = new Date(todaysYear, todaysMonth, 1).getDay();
  let lastDateofMonth = new Date(todaysYear, todaysMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(
    todaysYear,
    todaysMonth,
    lastDateofMonth
  ).getDay();
  let lastDateofLastMonth = new Date(todaysYear, todaysMonth, 0).getDate();
  let dateInfo = [];
  const studentInfo = await fetchStudentInfo(); //student info is meetingsData taken from fetchStudentInfo()

  for (let i = firstDayofMonth; i > 0; i--) {
    const dateBoxInfo = {
      type: "previous", //previous to today's date
      todaysDate: lastDateofLastMonth - i + 1, //date for the date box
      id: i + "p", //'p' indicates the type is previous
      meetings: [], //array of meetings for the data
    };
    dateInfo.push(dateBoxInfo);
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    //each day of the month is given an active date object
    const activeDate = new Date(todaysYear, todaysMonth, i);
    //all students with meetngs for the active date
    const studentsWithMeetings = [];
    //for each student in studentInfo, a studentMeetingDate contains date&time information about the student's meeting
    //if the student has a meeting on the active date, push the date to studentsWithMeetings
    for (const student of studentInfo) {
      const studentMeetingDate = new Date(student.meetingDate as string);
      const isMeetingDate =
        studentMeetingDate.getDate() === activeDate.getDate() &&
        studentMeetingDate.getMonth() === activeDate.getMonth() &&
        studentMeetingDate.getFullYear() === activeDate.getFullYear();
      if (isMeetingDate) {
        const meetingDetails = {
          name: student.name,
          date: dateformat(studentMeetingDate, "shortDate"),
          time: dateformat(studentMeetingDate, "shortTime"),
          memo: student.description,
          grade: student.grade,
          email: student.email,
        };
        //create a new object that includes all the properties from the student and meetingDetails object
        studentsWithMeetings.push({ ...student, meetingDetails });
      }
    }
    studentsWithMeetings.sort((a, b) => {
      return (
        new Date(a.meetingDetails.time).getTime() -
        new Date(b.meetingDetails.time).getTime()
      );
    });

    const dateBoxInfo = {
      type: "current",
      todaysDate: i,
      id: i + "c",
      meetings: studentsWithMeetings,
    };
    dateInfo.push(dateBoxInfo);
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    const dateBoxInfo = {
      type: "future",
      todaysDate: i - lastDayofMonth + 1,
      id: i + "f",
      meetings: [],
    };
    dateInfo.push(dateBoxInfo);
  }

  //@ts-ignore
  calendarData.dateInfo = dateInfo;
};

watchEffect(async () => {
  await renderCalendar();
});

const changeMonth = (next: boolean) => {
  if (next) {
    todaysMonth = todaysMonth + 1;
  } else {
    todaysMonth = todaysMonth - 1;
  }
  if (todaysMonth < 0 || todaysMonth > 11) {
    // if current month is less than 0 or greater than 11
    // creating a new date of current year & month and pass it as date value
    todaysDate = new Date(todaysYear, todaysMonth, new Date().getDate());
    todaysYear = todaysDate.getFullYear(); // updating current year with new date year
    todaysMonth = todaysDate.getMonth(); // updating current month with new date month
  } else {
    todaysDate = new Date(); // pass the current date as date value
  }
  renderCalendar();
};
</script>

<style scoped>
.container {
  margin: 2rem 4rem 0 4rem;
}

.calendar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  overflow: hidden;
}

.calendar li {
  width: calc(100% / 7);
  font-size: 1.07rem;
}

.weeks {
  text-align: center;
}

.weeks li {
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 1px solid grey;
}

.calendar .weeks li {
  font-weight: 800;
  font-size: 1.2rem;
  cursor: default;
}

.calendar .days li {
  text-align: end;
  padding-bottom: 0.8rem;
}

.days li {
  border: grey 1px solid;
  font-size: 0.9rem;
}

.dayCon:hover .plusIcon {
  visibility: visible;
}

.days li:hover + .plusIcon {
  display: block;
}

.days li.inactive {
  color: #aaa;
}

.days li.active {
  color: #fff;
}

.days li.active::before {
  background: #9b59b6;
}

.days li:not(.active):hover::before {
  background: #f2f2f2;
}

button {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

button:hover {
  opacity: 0.5;
}

svg {
  width: 1.2rem;
  margin-right: 10px;
  fill: #717494;
}

input:invalid {
  border-color: red;
}
</style>
