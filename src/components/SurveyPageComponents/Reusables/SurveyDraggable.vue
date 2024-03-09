<template>
  <div class="h-auto select-none flex items-center justify-center w-full">
    <div v-if="props.courses.length > 0" class="flex flex-col mt-2 text-center text-base md:text-lg xl:text-xl">
      <div v-for="course in props.courses" :key="course.rank" :id="course.rank.toString()">
        <div
          class="h-12 mx-2 mb-2.5 xl:h-16 w-full placeholder flex items-center justify-center p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold course"
          :class="`bg-[#${color}]`" :course-rank="course.rank">
          <div class="w-full h-full flex items-center justify-center" :class="`bg-[#${color}]`" draggable="true"
            @dragover.prevent="(e) => hoverBoxOver(e)" @dragstart="(e) => (dragElement = e.target)"
            @drop.prevent="(e) => hoverBox(e, course.rank)"
            @touchstart.prevent="(e) => handleTouchStart(e, course.rank)" @touchmove.prevent="(e) => handleTouchMove(e)"
            @touchend.prevent="(e) => handleTouchEnd(e, course.rank)">
            {{ course.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from "vue";
import { useSurveyStore } from "../../../stores/survey";
import { preferences } from "../../../types/interface";

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

const props = defineProps({
  courses: {
    type: Array as PropType<Array<preferences>>,
    required: true
  },
  numbered: Boolean,
  index: Number,
  color: String
});

const surveyStore = useSurveyStore()
let dragElement: HTMLElement;

const computedHeight = computed(() => {
  return props.courses.length;
});

const ref_courses = ref(props.courses);

const hoverBoxOver = function (e) {
  let dragParent = dragElement.parentElement;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
};

const hoverBox = function (e, rank: number) {
  let dragParent = dragElement.parentElement;
  let dragIndex = dragParent?.parentElement.id;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
  updateRank(rank, dragIndex)
};

function updateRank(rank: number, dragIndex: string | number) {
  const startObject = ref_courses.value.findIndex(x => x.rank === +rank)

  if (+rank > +dragIndex) {
    ref_courses.value.forEach((x, index) => {
      if (x.rank < +rank && x.rank >= +dragIndex) {
        ref_courses.value[index].rank = ref_courses.value[index].rank + 1
      }
    });
    ref_courses.value[startObject].rank = +dragIndex

  } else if (+rank < +dragIndex) {
    ref_courses.value.forEach((x, index) => {
      if (x.rank > +rank && x.rank <= +dragIndex) {
        ref_courses.value[index].rank = ref_courses.value[index].rank - 1
      }
    })
    ref_courses.value[startObject].rank = +dragIndex
  }

  ref_courses.value.sort((a, b) => a.rank - b.rank);

  if (props.index === surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses')) {
    surveyStore.currentResponse[props.index].answer.preference = ref_courses.value
  } else {
    surveyStore.currentResponse[props.index].answer.preference = ref_courses.value
  }
}

let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (e, rank) => {
  if (isTouchDevice) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    dragElement = e.target;
    dragElement.setAttribute('data-rank', rank);
  }
};

const handleTouchMove = (e) => {
  if (isTouchDevice && dragElement) {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX; //finds out much the dragelement will move according to touchevent
    const deltaY = touchY - touchStartY;
    dragElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`; //moves the dragelement according to the deltas
  }
};

const handleTouchEnd = (e) => {
  dragElement.style.transform = '';

  //finds the targeted DOM the dragElement wants to take over via the x and y positioning of the touch event
  const target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  if (target) {
    //finds DOM matching the target
    const targetedCourse = target.closest(".course");
    //takes the current rank of the course and updates accordingly
    const dragIndex = parseInt(targetedCourse.getAttribute('course-rank'));
    const rank = parseInt(dragElement.getAttribute('data-rank'));
    updateRank(rank, dragIndex);
  }
  dragElement = '';
};
</script>
