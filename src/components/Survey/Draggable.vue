<template>
  <div class="h-auto select-none flex items-center justify-center w-full">
    <div
      v-if="ranked.length > 0"
      class="flex flex-col mt-2 text-center text-base md:text-lg xl:text-xl"
    >
      <vuedraggable v-model="ranked" item-key="rank" @end="onDragEnd">
        <template #item="{ element, index }">
          <div
            v-if="element"
            class="h-12 mx-2 mb-2.5 xl:h-16 w-full placeholder flex items-center justify-center p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold course"
            :class="`bg-[#${color}]`"
            :course-rank="index"
          >
            <div
              :class="`w-full h-full flex items-center justify-center bg-[#${color}]`"
            >
              {{ numbered ? index + 1 + ". " : "" }} {{ element.name }}
            </div>
          </div>
        </template>
      </vuedraggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Course, Answer } from "../../types/interface";
import vuedraggable from "vuedraggable";
import { ref, watch } from "vue";

const props = defineProps<{
  courses: Course[];
  answer: Answer;
  numbered?: boolean;
  color?: string;
}>();

const ranked = ref<Course[]>(props.courses);

watch(
  () => props.courses,
  (newCourses) => (ranked.value = newCourses)
);

const onDragEnd = () =>
  (props.answer.answer = ranked.value.map((course, index) => ({
    course: course.id,
    rank: index + 1,
  })));
</script>
