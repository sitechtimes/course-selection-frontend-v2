<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
    <table class="w-full border-2 border-black table-auto text-left">
      <thead class="fill-primary-g border-2 border-black">
        <tr class="bg-primary-g">
          <th class="p-4">Name</th>
          <th class="p-4">Subject</th>
          <th class="p-4">Grades</th>
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
          <td class="p-4">{{ displayGrades(course) }}</td>
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
import { useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";

const props = defineProps<{ courses: Course[] }>();
function displayGrades(course: Course) {
 const grades: string[] = [];
 if (course.freshman) grades.push("Freshman");
  if (course.sophomore) grades.push("Sophomore");
  if (course.junior) grades.push("Junior");
  if (course.senior) grades.push("Senior");
  return grades.join(", ");
}
const router = useRouter();
</script>

<style scoped>
.parent:hover .child {
  display: block;
  transition: 0.3s;
}
</style>
