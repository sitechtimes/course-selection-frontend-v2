<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
    <table class="w-full border-2 border-black table-auto text-left">
      <thead class="fill-primary-g border-2 border-black">
        <tr class="bg-primary-g">
          <th class="p-4">Name</th>
          <th class="p-4">Subject</th>
          <th class="p-4">AP</th>
          <th class="p-4 pl-10">Honors</th>
          <th class="p-4 flex flex-row items-center">Codes</th>
        </tr>
      </thead>

      <tbody
        v-for="course in courses"
        :key="course.id"
        class="border-2 border-black"
      >
        <tr>
          <td class="p-4 hover:cursor-pointer" @click="router.push(`/guidance/editcourse/${course.id}`)">
            {{ course.name }}
          </td>
          <td class="p-4">{{ course.subject }}</td>
          <td class="p-4">{{ course.ap }}</td>
          <td class="p-4"> {{ course.honors }}</td>
          <td class="p-4"> {{ course.codes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Course } from "../../types/interface";
import ChangeFlag from "../Guidance/ChangeFlag.vue";
import { useUserStore } from "../../stores/user";
import { useRouter } from "vue-router";
import { ref } from "vue";

defineProps<{ courses: Course[] }>();

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
</script>

<style scoped>
.parent:hover .child {
  display: block;
  transition: 0.3s;
}
</style>
