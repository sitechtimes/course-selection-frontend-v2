<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
    <table class="w-full border-2 border-black table-auto text-left">
      <thead class="fill-primary-g border-2 border-black">
        <tr class="bg-primary-g">
          <th class="p-4">Name</th>
          <th class="p-4">Grade</th>
          <th class="p-4">Email</th>
          <th class="p-4 pl-10">Status</th>
          <th class="p-4">Details</th>
          <th class="p-4 flex flex-row items-center">
            <p class="p-2 font-bold">Flags</p>
            <div>
              <img
                src="../icons/InfoCircle.png"
                alt="hover for more information on student flags"
                class="h-5"
                @mouseover="tooltip = true"
                @mouseout="tooltip = false"
              />
              <div
                v-show="tooltip"
                class="absolute h-auto w-auto bg-white border-primary-g border p-2"
              >
                <div v-for="flag in flags" class="flex flex-row">
                  <div
                    class="m-1 rounded-full h-5 w-5"
                    :class="flag.color"
                  ></div>
                  <p class="m-1">= {{ flag.title }}</p>
                </div>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <tbody
        v-for="student in newStudents"
        :key="student.id"
        class="border-2 border-black"
      >
        <ChangeFlag
          v-if="Math.abs(flagModal) === student.id"
          @exit="flagModal = 0"
          :student="student"
          :viewAll="viewAll"
          :flags="flags"
          :add="flagModal > 0"
        />
        <tr>
          <td class="p-4">
            {{ titleCase(student.name) }}
          </td>
          <td class="p-4">{{ student.grade ?? "&nbsp;" }}</td>
          <td class="p-4">
            {{ student.email ? student.email + "@nycstudents.net" : "&nbsp;" }}
          </td>
          <td class="p-4">
            <p
              :class="`${
                statuses[student.status]
              } w-[8rem] font-semibold text-center p-1 rounded-2xl`"
            >
              {{ student.status }}
            </p>
          </td>
          <td @click="viewSurvey(student)" class="p-4 hover:cursor-pointer">
            View Survey
          </td>
          <td class="p-4 flex flex-row parent">
            <div
              id="flagbox"
              v-for="flag in flags"
              :key="flag.flag"
              v-show="student[flag.flag as keyof GuidanceStudent]"
              :title="flag.title"
              :class="flag.color + 'm-1 rounded-full h-5 w-5'"
            ></div>
            <button
              @click="flagModal = student.id"
              class="w-3 m-1 hidden child hover:cursor-pointer text-2xl leading-[0]"
            >
              +
            </button>
            <button
              @click="flagModal = -student.id"
              class="w-3 m-1 hidden child hover:cursor-pointer text-2xl leading-[0]"
            >
              -
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { GuidanceStudent } from "../../types/interface";
import { useSurveyStore } from "../../stores/survey";
import ChangeFlag from "../Guidance/ChangeFlag.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

defineProps<{ newStudents: GuidanceStudent[]; viewAll: boolean }>();

const statuses = {
  "Not Started": "text-[#461616] bg-[#EA9F9F]",
  "In Progress": "text-[#322911] bg-[#F9D477]",
  Completed: "text-[#174616] bg-[#A8D480]",
  Finalized: "text-[#311638] bg-[#D1A4DE]",
};

const surveyStore = useSurveyStore();
const router = useRouter();

const tooltip = ref(false);
const flagModal = ref(0);

const flags = [
  { flag: "transfer", title: "Transfer student", color: "bg-red-400" },
  { flag: "regents", title: "Missing regents", color: "bg-green-400" },
  { flag: "team", title: "Three season athlete", color: "bg-blue-400" },
  { flag: "enl", title: "ENL", color: "bg-purple-400" },
];

const titleCase = (name: string) =>
  name
    .split(",")
    .map((chunk) =>
      chunk
        .split(" ")
        .map((part) => part.trim().toLowerCase())
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    )
    .join(", ");

async function viewSurvey(student: GuidanceStudent) {
  await surveyStore.getSurvey(student.id);
  await router.push(`/guidance/survey/${student.id}`);
}
</script>

<style scoped>
.parent:hover .child {
  display: block;
  transition: 0.3s;
}
</style>
