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
                    class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
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
                  class="w-4 h-4 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
                  value="Not Interested"
                  v-model="courses"
                />
                Not Interested
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        class="mt-4 border border-solid rounded-xl lg:w-[45%] w-[90%] lg:ml-14 lg:h-[50vh] md:mt-[1%] relative self-center lg:self-auto lg:overflow-y-auto transition-colors duration-200 ease-linear flex flex-col justify-between"
        :class="warn ? 'border-red-400 bg-[#FEE2E2]' : 'border-black'"
      >
        <div>
          <div class="flex justify-center mt-[1%]">
            <p
              class="ml-6 mt-2 text-lg xl:leading-10 md:text-xl xl:text-2xl text-black"
            >
              Drag course(s) into order of preference:
            </p>
          </div>
          <surveyDraggable
            class="p-6"
            :courses="(surveyStore.answers[index].answer as Rank[])"
            :index="index"
            :numbered="true"
            :color="color"
            :final="false"
            @save="emit('save')"
            :key="x"
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
import surveyDraggable from "./SurveyDraggable.vue";
import { useSurveyStore } from "../../stores/survey";
import { watch, ref, computed, PropType } from "vue";
import { Question, preferences, Course, Rank } from "../../types/interface";

const emit = defineEmits(["save"]);

const props = defineProps({
  choices: {
    type: Array as PropType<Course[]>,
    required: true,
  },
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  color: String,
  warn: Boolean,
});

const surveyStore = useSurveyStore();
const courses = ref<Course[]>([]);
const x = ref(0);
const index = ref(0);
const getQuestionIndex = (): number => {
  return surveyStore.answers.findIndex(
    (entry) => entry.question === props.question.id
  );
};

//initialise current question
function startQuestion() {
  index.value = getQuestionIndex();
}

startQuestion();

//'Not Interested' is selected
const notInterested = computed(() => {
  const answer = surveyStore.answers[index.value].answer as Rank[];
  return answer.find((c) => c.course === -1);
});

const indexAllCourses: number = surveyStore.survey.questions.findIndex(
  (question) => question.questionType === "FINAL"
);
watch(
  () => notInterested.value,
  (isNotInterested) => {
    if (isNotInterested) {
      const bads = (surveyStore.answers[index.value].answer as Rank[]).map(
        (course) => {
          if (typeof course === "string") return course;
          return course.course;
        }
      );
      surveyStore.answers[index.value].answer = [];
      const final = surveyStore.answers[surveyStore.answers.length - 1].answer;
      bads.forEach((bad) => {
        const index = final.findIndex((course) => {
          if (typeof course === "string") {
            return bad === course;
          }
          return bad === course.name;
        });
        if (index !== -1) {
          final.courses.splice(index, 1);
        }
      });
      bads.forEach((bad) => {
        const index = final.preference.findIndex((course) => {
          if (typeof course === "string") {
            return bad === course;
          }
          return bad === course.name;
        });
        if (index !== -1) {
          final.preference.splice(index, 1);
        }
      });
      // (surveyStore.answers[indexAllCourses]).answer = final;
    }
  }
);

function toggleInterest(interested: boolean, course: course) {
  const allCoursesIndex = surveyStore.answers.findIndex(
    (x) => x.id === "allChosenCourses"
  );

  const allCourses = surveyStore.answers[allCoursesIndex] as allCoursesAnswer;
  const currentQuestionAnswer = surveyStore.answers[index.value]
    .answer as checkboxAnswer;

  const referencedClass = course.name;

  if (!interested) {
    const filteredCourses = allCourses.answer.courses.filter(
      (course) => typeof course !== "string" && course.name !== referencedClass
    );
    const filteredPreferences = allCourses.answer.preference.filter(
      (course) => course.name !== referencedClass
    );

    allCourses.answer.courses = filteredCourses;
    allCourses.answer.preference = filteredPreferences;

    allCourses.answer.preference.sort((a, b) => a.rank - b.rank);

    const classIndex = currentQuestionAnswer.preference.findIndex(
      (x: preferences) => x.name === referencedClass
    );
    currentQuestionAnswer.preference.splice(classIndex, 1);

    allCourses.answer.preference.forEach(
      (rankObject: preferences, index: number) => {
        rankObject.rank = index + 1;
      }
    );
  } else {
    //add the course to allCourses
    const overallRank = allCourses.answer.courses.length + 1;
    const courseObject = {
      name: course.name,
      courseCode: course.courseCode,
      subject: course.subject,
    };
    const rankedCourseObject = {
      ...courseObject,
      rank: overallRank,
    };

    currentQuestionAnswer.preference.push(rankedCourseObject);

    allCourses.answer.courses.push(courseObject);
    allCourses.answer.preference.push(rankedCourseObject);
  }
}

function getChangedCourse(oldCourses, newCourses: course[]) {
  const addedCourse = newCourses.find((course) => !oldCourses.includes(course));
  const removedCourse = oldCourses.find(
    (course) => !newCourses.includes(course)
  );

  return addedCourse || removedCourse;
}

watch(
  () => props.question.question,
  (newResponse) => {
    courses.value = surveyStore.coursesAvailable.filter(
      (x) => x.subject === props.question.questionType
    );
    courses.value.push({ name: "Not Interested", subject: "PE" });
    startQuestion();
  }
);

//watching for changes on selected courses
watch(
  () => surveyStore.answers[index.value].answer.courses,
  (newResponse, oldResponse) => {
    const interested = newResponse.length > oldResponse.length;
    const changedCourse = getChangedCourse(newResponse, oldResponse);
    if (changedCourse) {
      toggleInterest(interested, changedCourse);
    }
  }
);

//watch for changes in courses array; rerender draggable
watch(
  () => surveyStore.answers[index.value].answer,
  () => {
    x.value++;
  }
);
</script>
