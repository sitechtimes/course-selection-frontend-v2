<template>
  <div class="w-full">
    <fieldset
      ref="form"
      :aria-invalid="warn"
      :aria-describedby="warn ? question.id + 'required' : ''"
    >
      <legend
        class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible mb-4"
      >
        {{ question.question }}
      </legend>
      <div
        class="flex flex-row text-lg md:text-xl xl:text-2xl gap-4 items-baseline"
      >
        <label class="flex justify-center items-center flex-wrap">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-5 h-5 mx-2 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :name="`question_${question.question}`"
            :value="true"
            v-model="surveyStore.answers[index].answer"
          />
          Yes
        </label>
        <label class="flex justify-center items-center flex-wrap">
          <input
            type="radio"
            :disabled="isDisabled"
            class="w-5 h-5 mx-2 text-blue-400 bg-zinc-100 border-gray-300 focus:ring-transparent"
            :name="`question_${question.question}`"
            :value="false"
            v-model="surveyStore.answers[index].answer"
          />
          No
        </label>
        <Transition
          leave-to-class="opacity-0"
          leave-active-class="transition-opacity duration-200 ease-linear"
        >
          <div
            class="flex items-center justify-center text-red-500 gap-2 xl:ml-10 md:ml-8 xs:ml-4 ml-2"
            v-if="warn"
          >
            <exclamationMark />
          </div>
        </Transition>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { preferences, Question, Rank, Answer } from "../../types/interface";
import exclamationMark from "../../components/icons/ExclamationMark.vue";
import { useSurveyStore } from "../../stores/survey";
import { watch, PropType, ref } from "vue";

const props = defineProps({
  finalAnswer: {
    type: Object as PropType<Answer>,
    required: true,
  },
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  isDisabled: Boolean,
  referencedClass: Object as PropType<preferences>,
  warn: Boolean,
});

const surveyStore = useSurveyStore();
const index = ref(0);
watch(
  () => props.question.question,
  () => {
    index.value = surveyStore.answers.findIndex(
      (ans) => ans.question === props.question.id
    );
  },
  { immediate: true }
);

watch(
  () => surveyStore.answers[index.value].answer,
  (newResponse, oldResponse) => {
    const referenced = props.question.classReferenced;
    if (!referenced) return;

    if (newResponse && !oldResponse) {
      surveyStore.selectedCourses.push(referenced);
      (props.finalAnswer.answer as Rank[]).push({
        course: referenced.id,
        rank: (props.finalAnswer.answer as Rank[]).length + 1,
      });
    } else if (!newResponse && oldResponse) {
      surveyStore.selectedCourses = surveyStore.selectedCourses.filter(
        (course) => course.id !== referenced.id
      );
      props.finalAnswer.answer = (props.finalAnswer.answer as Rank[]).filter(
        (ans) => ans.course !== referenced.id
      );
    }
  }
);
</script>

<style lang="css">
button[type="radio"] {
  transform: scale(3);
}
</style>
