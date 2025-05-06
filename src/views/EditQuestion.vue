<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">
          {{ question.question }}
        </h1>
      </div>
      <div class="flex justify-center">
        <form
          class="w-1/2 m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
          @submit.prevent="
            () => {
              userStore.fetchData(
                'guidance/editquestion/',
                'PUT',
                alteredQuestion
              );
              router.push('/guidance/surveylist');
            }
          "
        >
          <div
            class="flex flex-col items-center"
            v-for="key in questionKeys"
            :key="key"
          >
            <label :for="key" class="text-2xl pb-1 font-bold"
              >{{ key[0].toUpperCase() + key.slice(1) }}
            </label>
            <div
              class="max-w-4xl"
              v-if="
                key === 'questionType' ||
                key === 'status' ||
                key === 'classReferenced'
              "
            >
              <select
                type="text"
                v-model="alteredQuestion[key]"
                :placeholder="String(question[key])"
                :id="key"
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              >
                <option>Hi</option>
              </select>
            </div>
            <textarea
              type="text"
              rows="3"
              v-model="alteredQuestion[key]"
              :placeholder="question[key]"
              :id="key"
              class="border-2 border-black rounded-lg p-2 m-2 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              v-else-if="key === 'question'"
            />
          </div>

          <div>
            <button
              type="submit"
              class="p-5 border-2 border-black bg-white hover:bg-tertiary-g transition rounded-xl shadow-md mt-5 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Question } from "../types/interface";
import { useUserStore } from "../stores/user";

const router = useRouter();
const userStore = useUserStore();
const route = useRoute();
const questionId = route.params.id;

async function findQuestion() {
  const questions = await userStore.getQuestions();
  return questions.find(
    (question: Question) => question.id === Number(questionId)
  );
}

const question = ref({} as Question);
const questionKeys = ref([] as (keyof Question)[]);
const alteredQuestion = ref({} as Question);

onMounted(async () => {
  try {
    question.value = await findQuestion();
    alteredQuestion.value = await findQuestion();
    console.log(question.value);
    questionKeys.value = Object.keys(question.value).filter(
      (key) =>
        question.value &&
        key !== "id" &&
        key !== "createdAt" &&
        typeof question.value[key as keyof Question] !== "boolean" &&
        typeof question.value[key as keyof Question] !== "object"
    ) as (keyof Course)[];
  } catch (error) {
    console.error(error);
  }
});
</script>
