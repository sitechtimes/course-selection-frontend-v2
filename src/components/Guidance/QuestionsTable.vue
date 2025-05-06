<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
    <table class="w-full border-2 border-black table-auto text-left">
      <thead class="fill-primary-g border-2 border-black">
        <tr class="bg-primary-g">
          <th class="p-4">ID</th>
          <th class="p-4">Question</th>
          <th class="p-4">Type</th>
          <th class="p-4">Status</th>
          <th class="p-4">Free Response</th>
          <th class="p-4 flex flex-row items-center">Class Referenced</th>
        </tr>
      </thead>
      <tbody
        v-for="question in questions"
        :key="question.id"
        class="border-2 border-black"
      >
        <tr class="hover:bg-tertiary-g transition-all">
          <td class="p-4">{{ question.id }}</td>
          <td class="p-4 hover:cursor-pointer">
            <RouterLink :to="`/guidance/editquestion/${question.id}`">
              ✎
            </RouterLink>
            {{ question.question }}
          </td>
          <td class="p-4">{{ question.questionType }}</td>
          <td class="p-4">{{ question.status }}</td>
          <td class="p-4">
            {{ !question.options ? "✔" : "✖" }}
          </td>
          <td class="p-4" :key="question.classReferenced?.id">
            {{
              question.classReferenced ? question.classReferenced.name : "n/a"
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Question } from "../../types/interface";
import { ref } from "vue";
const props = defineProps<{ questions: Question[] }>();
</script>
