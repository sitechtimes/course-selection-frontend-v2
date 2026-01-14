<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6 max-w-8xl mx-auto" id="table">
    <div class="w-full overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
      <table class="w-full table-auto text-left border-collapse">
        <thead class="bg-primary-g border-b border-gray-300">
          <tr>
            <th class="p-4 font-semibold">Name</th>
            <th class="p-4 font-semibold">Grade</th>
            <th class="p-4 font-semibold">Email</th>
            <th class="p-4 font-semibold pl-6">Status</th>
            <th class="p-4 font-semibold">Details</th>
            <th class="p-4 font-semibold relative">
              <div class="flex items-center gap-2">
                <span>Flags</span>
                <span class="text-gray-600 cursor-pointer" @mouseover="tooltip = true" @mouseleave="tooltip = false">
                  ⓘ
                </span>

                <div v-show="tooltip" class="absolute top-10 left-0 z-10
                         bg-white border border-gray-300
                         rounded-lg shadow-md p-3">
                  <div v-for="flag in flags" :key="flag.flag" class="flex items-center gap-2 mb-1 last:mb-0">
                    <div class="h-4 w-4 rounded-full" :class="flag.color" />
                    <span class="text-sm text-gray-700">{{ flag.title }}</span>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody v-for="student in newStudents" :key="student.id" class="border-b border-gray-200">
          <tr v-if="Math.abs(flagModal) === student.id">
            <td colspan="6" class="p-4 bg-gray-50">
              <ChangeFlag @exit="flagModal = 0" :student="student" :viewAll="viewAll" :flags="flags"
                :add="flagModal > 0" />
            </td>
          </tr>
          <tr class="hover:bg-gray-50 transition">
            <td class="p-4">{{ student.name }}</td>
            <td class="p-4">{{ student.grade ?? "—" }}</td>
            <td class="p-4 text-gray-700">{{ student.email ?? "—" }}</td>

            <td class="p-4">
              <span
                :class="`${statuses[student.status]} inline-block min-w-[8rem] text-center text-sm font-semibold px-3 py-1 rounded-full`">
                {{ student.status }}
              </span>
            </td>

            <td class="p-4" :class="student.status === 'Not Started'
              ? 'text-gray-400'
              : 'text-gray-600 hover:text-gray-800 cursor-pointer'" @click="goToSurvey(student)">
              View Survey
            </td>

            <td class="p-4">
              <div class="flex items-center gap-2">
                <div v-for="flag in flags" :key="flag.flag" v-show="student[flag.flag as keyof GuidanceStudent]"
                  :title="flag.title" class="h-4 w-4 rounded-full" :class="flag.color" />
                <button @click="flagModal = student.id"
                  class="ml-1 text-lg text-gray-500 hover:text-gray-800 transition">
                  +
                </button>
                <button @click="flagModal = -student.id"
                  class="ml-1 text-lg text-gray-500 hover:text-gray-800 transition">
                  −
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GuidanceStudent } from "../../types/interface";
import ChangeFlag from "../Guidance/ChangeFlag.vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

defineProps<{ newStudents: GuidanceStudent[]; viewAll: boolean }>();

const statuses = {
  "Not Started": "text-[#461616] bg-[#EA9F9F]",
  "In Progress": "text-[#322911] bg-[#F9D477]",
  Completed: "text-[#174616] bg-[#A8D480]",
  Finalized: "text-[#311638] bg-[#D1A4DE]",
};

const userStore = useUserStore();
const router = useRouter();

const tooltip = ref(false);
const flagModal = ref(0);

const flags = [
  { flag: "transfer", title: "Transfer student", color: "bg-red-400" },
  { flag: "regents", title: "Missing regents", color: "bg-green-400" },
  { flag: "team", title: "Three season athlete", color: "bg-blue-400" },
  { flag: "enl", title: "ENL", color: "bg-purple-400" },
];

const goToSurvey = (student: GuidanceStudent) => {
  if (student.status === "Not Started") return;
  router.push(`/guidance/survey/${student.id}`);
};
</script>

<style scoped>
.parent:hover .child {
  display: block;
  transition: 0.3s;
}
</style>
