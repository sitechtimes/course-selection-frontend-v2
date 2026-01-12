<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6 max-w-8xl mx-auto" id="table">
    <div class="w-full overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
      <table class="w-full table-auto text-left border-collapse">
        <thead class="bg-primary-g border-b border-gray-300">
          <tr>
            <th class="p-4 font-semibold"></th>
            <th class="p-4 font-semibold">Name</th>
            <th class="p-4 font-semibold">Subject</th>
            <th class="p-4 font-semibold">Grades</th>
            <th class="p-4 font-semibold">AP</th>
            <th class="p-4 font-semibold">Honors</th>
            <th class="p-4 font-semibold">Code(s)</th>
          </tr>
        </thead>

        <tbody v-for="course in courses" :key="course.id" class="border-b border-gray-200">
          <tr class="hover:bg-gray-50 transition">
            <td class="p-4 cursor-pointer text-gray-500 hover:text-red-600">
              <RouterLink :to="`/guidance/editcourse/${course.id}`">✎</RouterLink>
            </td>

            <td class="p-4 text-gray-800">{{ course.name }}</td>
            <td class="p-4 text-gray-700">{{ course.subject }}</td>
            <td class="p-4 text-gray-700">{{ displayGrades(course) }}</td>
            <td class="p-4">
              <span :class="course.ap ? 'text-green-600 font-semibold' : 'text-gray-400 font-semibold'">
                {{ course.ap ? "✔" : "✖" }}
              </span>
            </td>
            <td class="p-4">
              <span :class="course.honors ? 'text-green-600 font-semibold' : 'text-gray-400 font-semibold'">
                {{ course.honors ? "✔" : "✖" }}
              </span>
            </td>
            <td class="p-4 text-gray-700">
              <p v-for="code in course.codes" :key="code">{{ code }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course } from "../../types/interface";

const props = defineProps<{ courses: Course[] }>();
function displayGrades(course: Course) {
  if (course.freshman || course.sophomore || course.junior || course.senior) {
    return [
      course.freshman ? "9" : null,
      course.sophomore ? "10" : null,
      course.junior ? "11" : null,
      course.senior ? "12" : null,
    ]
      .filter(Boolean)
      .join(", ");
  } else {
    return "n/a";
  }
}
</script>
