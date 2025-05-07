<template>
  <Suspense>
    <div>
      <div class="px-10 flex flex-col items-center justify-center gap-4">
        <h1 class="p-6 text-3xl">Question {{ question.id }}</h1>
      </div>
      <div class="flex justify-center">
        <form
          class="w-1/2 m-10 p-5 rounded-xl shadow-md bg-primary-g border-black border-2"
          @submit.prevent="
            () => {
              userStore.fetchData(
                'guidance/surveyquestions/',
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
                v-if="key !== 'classReferenced'"
                type="text"
                :id="key"
                v-model="alteredQuestion[key]"
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              >
                <option v-for="option in potentialOptions[key]" :key="option">
                  {{ option }}
                </option>
              </select>
              <select
                v-if="key === 'classReferenced'"
                type="text"
                :id="key"
                v-model="alteredQuestion['classReferenced']['name']"
                @click="
                  console.log(alteredQuestion),
                    console.log(alteredQuestion['classReferenced'])
                "
                class="border-2 border-black rounded-lg p-2 mb-4 w-full hover:shadow-xl transition placeholder-gray-500 placeholder-opacity-35"
              >
                <option v-for="option in potentialOptions[key]" :key="option">
                  {{ option }}
                </option>
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
import { Question, Course } from "../types/interface";
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
const courses = ref({} as Course);
const questionKeys = ref([] as (keyof Question)[]);
const alteredQuestion = ref({} as Question);
const potentialOptions = ref({
  questionType: [
    "BOOLEAN",
    "FINAL",
    "NOTE",
    "GENERAL",
    "DROPDOWN",
    "ENGLISH",
    "SS",
    "MATH",
    "SCIENCE",
    "LANG",
    "TECH",
    "ART",
    "PE",
  ] as Question["questionType"][],
  status: ["OPTIONAL", "STANDARD", "CLASS"] as Question["status"][],
});

onMounted(async () => {
  try {
    courses.value = await userStore.getCourses();
    console.log(courses.value);
    potentialOptions.value = {
      ...potentialOptions.value,
      classReferenced: courses.value.map(
        (course) => course.name
      ) as Course["name"][],
    };
    console.log(potentialOptions.value);
    question.value = await findQuestion();
    alteredQuestion.value = await findQuestion();
    questionKeys.value = Object.keys(question.value).filter(
      (key) =>
        question.value &&
        key !== "id" &&
        key !== "createdAt" &&
        typeof question.value[key as keyof Question] !== "boolean" &&
        key !== "options"
    ) as (keyof Question)[];
  } catch (error) {
    console.error(error);
  }
});
</script>
