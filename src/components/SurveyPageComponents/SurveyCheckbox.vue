<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row items-center w-full">
      <div class="lg:w-1/2 w-full h-full">
        <div
          class="flex items-center justify-center max-w-[40rem] overflow-hidden"
        >
          <fieldset class="flex items-center justify-start w-full h-full">
            <legend
              class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible text-left mb-4"
            >
              {{ props.question.question }}
            </legend>
            <div class="flex flex-col flex-wrap justify-center items-start">
              <div
                v-for="choice in choices"
                :key="choice.courseCode"
                class="flex flex-wrap flex-column justify-center items-center m-2 w-max"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  :id="choice.courseCode"
                  :value="choice"
                  v-model="surveyStore.currentResponse[index].answer.courses"
                  :disabled="notInterested"
                />
                <label
                  :for="choice.courseCode"
                  class="text-base sm:text-lg xl:text-xl ml-4"
                  >{{ choice.name }}</label
                >
              </div>
              <div
                v-if="props.question.status === 'OPTIONAL'"
                class="flex flex-wrap flex-column justify-center items-center m-2 w-max"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  :id="'notInterested' + index"
                  value="Not Interested"
                  v-model="surveyStore.currentResponse[index].answer.courses"
                />
                <label
                  :for="'notInterested' + index"
                  class="text-lg xl:text-xl ml-4"
                  >Not Interested</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        class="mt-4 border-black border border-solid rounded-xl lg:w-[45%] w-[90%] lg:ml-14 lg:h-[50vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-scroll"
      >
        <div class="flex justify-center mt-[1%]">
          <p
            class="ml-6 mt-2 text-lg xl:leading-10 md:text-xl xl:text-2xl text-black"
          >
            Drag course(s) into order of preference:
          </p>
        </div>
        <surveyDraggable
          class="p-6"
          :courses="surveyStore.currentResponse[props.index].answer.preference"
          :index="index"
          :numbered="true"
          :color="color"
          :key="x"
        ></surveyDraggable>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
//@ts-nocheck
import surveyDraggable from "./SurveyDraggable.vue";
import { useSurveyStore } from "../../stores/survey";
import { watch, ref, Ref, computed, PropType } from "vue";
import { surveyQuestion, course } from "../../types/interface";

const props = defineProps({
  choices: {
    type: Array as PropType<Array<course>>,
    required: true,
  },
  question: {
    type: Object as PropType<surveyQuestion>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  color: String,
});

const surveyStore = useSurveyStore();

const x: Ref<number> = ref(0);

const notInterested = computed(() => {
  return surveyStore.currentResponse[props.index].answer.courses.includes(
    "Not Interested"
  );
});

function toggleInterest(totalIndex: number) {
  const response = surveyStore.currentResponse[props.index].answer;
  const totalResponse = surveyStore.currentResponse[totalIndex].answer;

  response.courses.forEach((course: string) => {
    if (course === "Not Interested") return;

    response.preference = response.preference.filter(
      (pref) => pref.name !== course
    );

    totalResponse.courses = totalResponse.courses.filter((c) => c !== course);
    totalResponse.preference = totalResponse.preference.filter(
      (pref) => pref.name !== course
    );

    totalResponse.preference.sort((a, b) => a.rank - b.rank);
  });

  response.courses = ["Not Interested"];
  response.preference = [];
}

watch(
  () => surveyStore.currentResponse[props.index].answer.courses,
  (newResponse, oldResponse) => {
    const totalIndex = surveyStore.currentResponse.findIndex(
      (x) => x.id === "allChosenCourses"
    );
    const response = surveyStore.currentResponse[props.index].answer;
    const totalResponse = surveyStore.currentResponse[totalIndex].answer;

    if (newResponse.length > oldResponse.length) {
      const newClass = newResponse.find((x) => !oldResponse.includes(x));

      if (newClass === "Not Interested") toggleInterest(totalIndex);
      else {
        response.preference.push({
          rank: response.preference.length + 1,
          name: newClass.name,
          courseCode: newClass.courseCode,
          subject: newClass.subject,
        });

        totalResponse.courses.push(newClass);
        totalResponse.preference.push({
          rank: totalResponse.courses.length + 1,
          name: newClass.name,
          courseCode: newClass.courseCode,
          subject: newClass.subject,
        });
      }
    } else if (newResponse.length < oldResponse.length) {
      const removeClass = oldResponse.find((x) => !newResponse.includes(x));

      if (!response.courses.includes("Not Interested")) {
        const classIndex = response.preference.findIndex(
          (x: preferences) => x.name === removeClass.name
        );
        totalResponse.courses = totalResponse.courses.filter(
          (x: string) => x.name !== removeClass.name
        );
        const allPreferenceIndex = totalResponse.preference.findIndex(
          (x: preferences) => x.name === removeClass.name
        );

        response.preference.forEach((x: preferences, index) => {
          if (index > classIndex) {
            response.preference[index].rank--;
          }
        });
        response.preference.sort(
          (a: preferences, b: preferences) => a.rank - b.rank
        );

        totalResponse.preference.forEach((x: preferences, index) => {
          if (index > allPreferenceIndex) {
            totalResponse.preference[index].rank--;
          }
        });
        totalResponse.preference.sort(
          (a: preferences, b: preferences) => a.rank - b.rank
        );

        response.preference.splice(classIndex, 1);
        totalResponse.preference.splice(allPreferenceIndex, 1);
      }
    }
  }
);

watch(
  () => surveyStore.currentResponse[props.index].answer.preference,
  (newResponse) => {
    x.value = x.value + 1;
  },
  { deep: true }
);
</script>
