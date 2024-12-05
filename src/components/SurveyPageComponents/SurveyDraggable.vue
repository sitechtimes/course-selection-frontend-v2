<template>
  <div class="h-auto select-none flex items-center justify-center w-full">
    <div
      v-if="ranked.length > 0"
      class="flex flex-col mt-2 text-center text-base md:text-lg xl:text-xl"
    >
      <draggable v-model="ranked" item-key="rank" @end="onDragEnd">
        <template #item="{ element, index }">
          <div
            v-if="element.name !== undefined"
            class="h-12 mx-2 mb-2.5 xl:h-16 w-full placeholder flex items-center justify-center p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold course"
            :class="`bg-[#${color}]`"
            :course-rank="index"
          >
            <div
              class="w-full h-full flex items-center justify-center"
              :class="`bg-[#${color}]`"
            >
              {{ numbered ? index + 1 + ". " : "" }}{{ element.name }}
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import draggable from "vuedraggable";
import { useSurveyStore } from "../../stores/survey";
import { Course, Answer, Rank } from "../../types/interface";

const props = defineProps({
  courses: {
    type: Array as PropType<Course[]>,
    required: true,
  },
  numbered: Boolean,
  answer: {
    type: Object as PropType<Answer>,
    required: true,
  },
  color: String,
});

const surveyStore = useSurveyStore();
const ranked = ref<Course[]>([...props.courses]);
//watch for changes in the courses prop and update items accordingly
watch(
  () => props.courses,
  (newCourses) => {
    ranked.value = [...newCourses];
  }
);

//@ts-ignore
const onDragEnd = (event) => {
  props.answer.answer = ranked.value.map((course, index) => ({
    course: course.id,
    rank: index + 1,
  }));
};
</script>
