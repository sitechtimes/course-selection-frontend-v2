<template>
  <div class="flex flex-col mt-6 justify-center items-center w-5/6 max-w-8xl mx-auto" id="table">
    <div class="w-full overflow-x-auto rounded-xl border border-gray-300 bg-white shadow-sm">
      <table class="w-full table-auto text-left border-collapse">
        <thead class="bg-primary-g border-b border-gray-300">
          <tr>
            <th class="p-4 font-semibold"></th>
            <th class="p-4 font-semibold">ID</th>
            <th class="p-4 font-semibold">Question</th>
            <th class="p-4 font-semibold">Type</th>
            <th class="p-4 font-semibold">Status</th>
            <th class="p-4 font-semibold">Free Response</th>
            <th class="p-4 font-semibold">Class Referenced</th>
          </tr>
        </thead>

        <tbody v-for="question in questions" :key="question.id" class="border-b border-gray-200">
          <tr class="hover:bg-gray-50 transition">
            <td class="p-4 cursor-pointer text-gray-500 hover:text-red-600" @click="deleteQuestionWrapper(question.id)">
              🗑️
            </td>

            <td class="p-4 text-gray-700">
              {{ question.id }}
            </td>

            <td class="p-4 text-gray-800">
              <RouterLink :to="`/guidance/editquestion/${question.id}`" class="mr-2 text-gray-500 hover:text-gray-800">
                ✎
              </RouterLink>
              {{ question.question }}
            </td>

            <td class="p-4 text-gray-700">
              {{ question.questionType }}
            </td>

            <td class="p-4 text-gray-700">
              {{ question.status }}
            </td>

            <td class="p-4">
              <span :class="!question.options
                ? 'text-green-600 font-semibold'
                : 'text-gray-400 font-semibold'">
                {{ !question.options ? "✔" : "✖" }}
              </span>
            </td>

            <td class="p-4 text-gray-700">
              {{ question.classReferenced?.name ?? "—" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Question } from "../../types/interface";
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();
const props = defineProps<{ questions: Question[] }>();
async function deleteQuestionWrapper(id: number) {
  if (confirm("Do you really want to delete?")) {
    try {
      await userStore.deleteQuestion(id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
