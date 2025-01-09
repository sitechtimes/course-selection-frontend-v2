<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row h-full w-full">
      <div class="flex items-center justify-center overflow-hidden w-full">
        <fieldset class="flex items-center justify-start w-full">
          <legend
            class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible mb-4"
          >
            {{ question.question }}
          </legend>
          <div
            class="text-left block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400"
          >
            <div
              v-if="index && (surveyStore.answers[index].answer as Rank[]).length !== 0"
            >
              <p
                v-for="choice in (surveyStore.answers[index].answer as Rank[])"
                :key="choice.rank"
                class="mt-2 mb-2 text-base md:text-lg xl:text-2xl"
              >
                {{
                  surveyStore.coursesAvailable.find(
                    (x: Course) => x.id === choice.course
                  )?.name
                }}
              </p>
            </div>
            <p v-else class="mt-2 mb-2 text-base md:text-lg xl:text-2xl">
              You have no classes chosen.
            </p>
          </div>
        </fieldset>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Question, Course, Rank } from "../../types/interface";
import { useSurveyStore } from "../../stores/survey";

const props = defineProps<{ choices: Course[]; question: Question }>();
const surveyStore = useSurveyStore();
const index = surveyStore.answers.findIndex(
  (x) => x.question == props.question.id
) as number;
</script>
