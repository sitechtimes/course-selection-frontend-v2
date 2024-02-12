<template>
  <div class="flex items-center justify-center w-full">
    <fieldset class="flex items-center justify-start space-y-6">
      <legend
        class="text-lg xl:leading-10 md:text-xl xl:text-3xl overflow-visible"
      >
        {{ question.question }}
      </legend>
      <input
        class="block py-2 px-3 mt-3 w-full md:w-3/5 text-base md:text-lg xl:text-2xl bg-transparent rounded-md border border-solid border-zinc-400 focus:outline-none focus:ring-0 focus:border-blue-400 disabled:bg-gray-100"
        type="text"
        :disabled="isDisabled"
        v-model="field"
      />
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { useSurveyStore } from "../../stores/survey";
import { watch, PropType, ref, Ref } from "vue";
import { surveyQuestion } from "../../types/interface";

const props = defineProps({
  question: {
    type: Object as PropType<surveyQuestion>,
    required: true,
  },
  index: {
    type: Number as PropType<number>,
    required: true,
  },
  isDisabled: Boolean,
});
const surveyStore = useSurveyStore();

//@ts-expect-error
let field: Ref<string> = ref(surveyStore.currentResponse[props.index].answer);
let detectChange: Boolean = false;

if (props.index < 0) {
  const questionAnswer = {
    id: props.question.id,
    question: props.question.question,
    answer: "",
  };
  //@ts-ignore
  surveyStore.currentResponse.push(questionAnswer);
}

watch(
  () => props.index,
  (newResponse) => {
    detectChange = true;
    //@ts-expect-error
    field.value = surveyStore.currentResponse[props.index].answer;
  }
);

watch(
  () => field.value,
  (newResponse, oldResponse) => {
    if (!detectChange) {
      surveyStore.currentResponse[props.index].answer = newResponse;
    } else {
      detectChange = false;
    }
  }
);
</script>
