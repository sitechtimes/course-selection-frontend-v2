<template>
  <div class="flex flex-row justify-center">
    <div class="flex flex-col">
      <div
        id="printPage"
        class="flex w-[40vw] m-4 p-2 border border-gray-500 rounded-md"
      >
        <div class="p-4">
          <div class="overflow-y-auto max-h-100">
            <ul class="my-4" v-if="meeting">
              <p>Dear {{ meeting.student }},</p>
              <br />
              <p>
                Your guidance counselor has scheduled a meeting with you for
                {{ meeting.date.toLocaleTimeString() }} on
                {{ meeting.date.toLocaleDateString() }}. Please meet with
                them during the specified time.
              </p>
              <br />
              <p>
                Your guidance counselor has made the following notes:
                <br />
                {{ meeting.memo }}
              </p>
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
  </div>
</template>

<script setup lang="ts">
import PrinterIcon from "../components/icons/PrinterIcon.vue";
import { useUserStore } from "../stores/user";
import { Meeting } from "../types/interface";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const userStore = useUserStore();

const meeting = ref<Meeting | null>(null);

onMounted(async () => {
  meeting.value =
    userStore.meetings.find(
      (student: Meeting) => student.id === Number(route.params.id)
    ) || null;
  if (!meeting) return;
});

const printMeetingTicket = () => {
  const printElement = document.getElementById("printPage");
  if (!printElement)
    return console.error("Elemented with ID printPage not found.");

  const partPrint = printElement.innerHTML;

  const printPage = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Scheduled Meeting with Guidance Counselor</title>
      </head>
      <body>
        <div>${partPrint}</div>
      </body>
    </html>
  `;

  const newWindow = window.open("", "", "width=800,height=900");
  if (!newWindow)
    return userStore.setPopup(
      "Failed to open window. Popup blocker might be enabled.",
      true
    );

  newWindow.document.write(printPage);
  newWindow.print();
  newWindow.close();
};
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
