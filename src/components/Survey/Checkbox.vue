<template>
  <section class="lg:text-left text-center h-full w-full">
    <div class="flex flex-col lg:flex-row items-center lg:items-start w-full">
      <div class="lg:w-1/2 w-full h-full">
        <div
          class="flex items-center justify-center max-w-[40rem] overflow-hidden"
        >
          <fieldset
            class="flex flex-col justify-start w-full h-full"
            :aria-invalid="warn"
            :aria-describedby="warn ? question.id + 'required' : ''"
          >
            <legend
              class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible text-left mb-4"
            >
              {{ question.question }}
            </legend>
            <div class="flex flex-col flex-wrap justify-center items-start">
              <div v-for="choice in choices" :key="choice.name">
                <label
                  class="text-base sm:text-lg xl:text-xl ml-4 flex flex-wrap flex-column justify-center items-center m-2 w-max gap-2"
                >
                  <input
                    type="checkbox"
                    class="w-4 h-4 text-blue-400 border-gray-300 focus:ring-transparent"
                    :value="choice"
                    v-model="courses"
                    :disabled="notInterested"
                  />
                  {{ choice.name }}
                </label>
              </div>
              <label
                v-if="props.question.status === 'OPTIONAL'"
                class="text-base sm:text-lg xl:text-xl ml-4 flex flex-wrap flex-column justify-center items-center m-2 w-max gap-2"
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 text-blue-400 accent-black border-gray-300 focus:ring-transparent"
                  value="Not Interested"
                  v-model="notInterested"
                />
                Not Interested
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        class="mt-4 border border-solid rounded-xl lg:w-[45%] w-[90%] lg:ml-14 lg:h-[50vh] md:mt-[1%] relative self-center lg:self-auto transition-colors duration-200 ease-linear flex flex-col justify-between"
        :class="warn ? 'border-red-400 bg-[#FEE2E2]' : 'border-black'"
      >
        <div class="">
          <div class="flex justify-center mt-[1%]">
            <p
              class="ml-6 mt-2 text-lg xl:leading-10 md:text-xl xl:text-2xl text-black"
            >
              Drag course(s) into order of preference:
            </p>
          </div>
          <SurveyDraggable
            class="p-6"
            :courses="draggableCourses"
            :answer="answer"
            :numbered="true"
            :color="color"
            :final="false"
            @save="emit('save')"
          />
        </div>
        <Transition
          enter-from-class="opacity-0"
          enter-active-class="transition-opacity duration-200 ease-linear"
        >
          <div
            class="flex items-center justify-center text-red-500 gap-2 pb-2 xl:ml-10 md:ml-8 xs:ml-4 ml-2"
            v-if="warn"
          >
            <exclamationMark />
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import exclamationMark from "../../components/icons/ExclamationMark.vue";
import { Question, Course, Rank, Answer } from "../../types/interface";
import { useSurveyStore } from "../../stores/survey";
import SurveyDraggable from "./Draggable.vue";
import { watch, ref, onMounted } from "vue";

const emit = defineEmits(["save", "update"]);
const props = defineProps<{
  finalID: number;
  choices: Course[];
  question: Question;
  color: string;
  warn?: boolean;
}>();

const surveyStore = useSurveyStore();
const finalAnswer = surveyStore.answers[props.finalID] as Answer<Rank[]>;
const courses = ref<Course[]>([]);
const draggableCourses = ref<Course[]>([]);
let answer = surveyStore.answers.find(
  (e) => e.question === props.question.id,
) as Answer<Rank[]>;
const notInterested = ref(false);
let disable = false;

function init() {
  draggableCourses.value = answer.answer.map(
    (a) => courses.value.find(({ id }) => id === a.course) as Course,
  );
  answer.answer.forEach((ans, i) => (ans.rank = i + 1));
}

onMounted(() => {
  answer = surveyStore.answers.find(
    (ans) => ans.question === props.question.id,
  ) as Answer<Rank[]>;
  const map = answer.answer.map(({ course }) => course);
  courses.value = surveyStore.coursesAvailable.filter(({ id }) =>
    map.includes(id),
  );
  disable = true;
  init();
});

watch(() => answer.answer, init, { deep: true });

watch(
  () => notInterested.value,
  (isNotInterested) => {
    if (!isNotInterested) return;
    const bads = answer.answer.map((ans) => ans.course);
    finalAnswer.answer = finalAnswer.answer
      .filter(({ course }) => !bads.includes(course))
      .map(({ course }, i) => ({ course, rank: i + 1 }));
    surveyStore.selectedCourses = surveyStore.selectedCourses.filter(
      ({ id }) => !bads.includes(id),
    );
    [courses.value, answer.answer] = [[], []];
  },
);

function toggleInterest(interested: boolean, course: Course) {
  surveyStore.selectedCourses = surveyStore.selectedCourses.filter(
    (x) => x !== course,
  );
  finalAnswer.answer = finalAnswer.answer
    .filter((rank) => rank.course !== course.id)
    .map((rank, index) => ({ ...rank, rank: index + 1 }));

  if (!interested) return;

  finalAnswer.answer = finalAnswer.answer.filter((x) => x.course !== course.id);
  finalAnswer.answer.push({
    rank: finalAnswer.answer.length + 1,
    course: course.id,
  });
  return surveyStore.selectedCourses.push(course);
}

function getChangedCourse(newCourses: Course[], oldCourses: Course[]) {
  const added = newCourses.find((c) => !oldCourses.includes(c)) as Course;
  const removed = oldCourses.find((c) => !newCourses.includes(c)) as Course;
  answer.answer = answer.answer.filter(
    (rank) => rank.course !== (removed ?? added).id,
  );
  if (!added) return removed;
  answer.answer.push({
    rank: answer.answer.length + 1,
    course: added.id,
  });
  return added;
}

watch(
  () => courses.value,
  (newResponse, oldResponse) => {
    if (disable) return (disable = false);
    const interested = newResponse.length > oldResponse.length;
    const changedCourse = getChangedCourse(newResponse, oldResponse);
    if (changedCourse) toggleInterest(interested, changedCourse);
  },
  { deep: true },
);
</script>
