<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
    <table class="w-full border-2 border-black table-auto text-left">
      <thead class="fill-primary-g border-2 border-black">
        <tr class="bg-primary-g">
          <th class="p-4">Name</th>
          <th class="p-4">Subject</th>
          <th class="p-4">Grades</th>
          <th class="p-4">AP</th>
          <th class="p-4">Honors</th>
          <th class="p-4 flex flex-row items-center">Code(s)</th>
        </tr>
      </thead>

      <tbody
        v-for="course in courses"
        :key="course.id"
        class="border-2 border-black"
      >
        <tr class="hover:bg-other-g transition-all">
          <td class="p-4 hover:cursor-pointer">
            <RouterLink :to="`/guidance/editcourse/${course.id}`">
              ✎
            </RouterLink>
            {{ course.name }}
          </td>
          <td class="p-4">{{ course.subject }}</td>
          <td class="p-4">{{ displayGrades(course) }}</td>
          <td class="p-4">{{ course.ap ? "✔" : "✖" }}</td>
          <td class="p-4">{{ course.honors ? "✔" : "✖" }}</td>
          <td class="p-4">
            <p v-for="code in course.codes" :key="code">{{ code }}</p>
          </td>
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
function displayGrades(course: Course): string {
  return [
    course.freshman ? "9" : null,
    course.sophomore ? "10" : null,
    course.junior ? "11" : null,
    course.senior ? "12" : null,
  ]
    .filter(Boolean)
    .join(", ");
}

const router = useRouter();
</script>
