<template>
  <div class="h-auto select-none">
    <div v-if="props.courses.length > 0" class="flex flex-col mt-2 text-center text-base md:text-lg xl:text-xl">
      <div class="my-1.5 flex flex-row items-center justify-center" v-for="n in computedHeight" :key="n"
        :id="n.toString()">
        <p>{{ n }}.</p>
        <div
          class="h-12 mx-2 xl:h-16 w-2/3 placeholder flex items-center justify-center p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold course"
          :class="`bg-[#${color}]`" :course-rank="n">
          <div class="w-full h-full flex items-center justify-center" :class="`bg-[#${color}]`" draggable="true"
            @dragover.prevent="(e) => hoverBoxOver(e)" @dragstart="(e) => (dragElement = e.target)"
            @drop.prevent="(e) => hoverBox(e, n)" @touchstart.prevent="(e) => handleTouchStart(e, n)"
            @touchmove.prevent="(e) => handleTouchMove(e)" @touchend.prevent="(e) => handleTouchEnd(e, n)">
            {{ props.courses.find(x => x.rank == n).name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref, onBeforeMount, onMounted, PropType } from "vue";
import { useSurveyStore } from "../../../stores/survey";
import { preference } from "../../../types/interface";

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

const props = defineProps({
  courses: Array,
  numbered: Boolean,
  index: Number,
  color: String
});

const surveyStore = useSurveyStore()
let dragElement: HTMLElement;

const computedHeight = computed(() => {
  return props.courses.length;
});

const ref_courses: Ref<Array<object>> = ref(props.courses);

const hoverBoxOver = function (e) {
  let dragParent = dragElement.parentElement;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
};

const hoverBox = function (e, n: number) {
  let dragParent = dragElement.parentElement;
  let dragIndex = dragParent?.parentElement.id;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
  updateRank(n, dragIndex)
};

function updateRank(n: number, dragIndex: string | undefined) {
  const startObject = ref_courses.value.findIndex(x => x.rank === +n)

  if (+n > +dragIndex) {
    ref_courses.value.forEach((x, index) => {
      if (x.rank < +n && x.rank >= +dragIndex) {
        ref_courses.value[index].rank = ref_courses.value[index].rank + 1
      }
    });
    ref_courses.value[startObject].rank = +dragIndex

  } else if (+n < +dragIndex) {
    ref_courses.value.forEach((x, index) => {
      if (x.rank > +n && x.rank <= +dragIndex) {
        ref_courses.value[index].rank = ref_courses.value[index].rank - 1
      }
    })
    ref_courses.value[startObject].rank = +dragIndex

  }
  ref_courses.value.sort(function (a, b) {
    return parseFloat(a.rank) - parseFloat(b.rank);
  })
  if (props.index === surveyStore.currentResponse.findIndex((x) => x.id === 'allChosenCourses')) {
    surveyStore.currentResponse[props.index].answer.preference = ref_courses.value
  } else {
    surveyStore.currentResponse[props.index].answer.preference = ref_courses.value
  }
}

let touchStartX = 0;
let touchStartY = 0;

const handleTouchStart = (e, n) => {
  if (isTouchDevice) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    dragElement = e.target;
  }
};

const handleTouchMove = (e, n) => {
  if (isTouchDevice && dragElement) {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX; //finds out much the dragelement will move according to touchevent
    const deltaY = touchY - touchStartY;
    dragElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`; //moves the dragelement according to the deltas
  }
};

const handleTouchEnd = (e, n) => {
  dragElement.style.transform = '';
  //finds the targeted DOM the dragElement wants to take over via the x and y positioning of the touch event
  const target = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  if (target) {
    //finds DOM matching the target
    const targetedCourse = target.closest(".course");
    //takes the current rank of the course and updates accordingly
    const dragIndex = parseInt(targetedCourse.getAttribute('course-rank'));
    const n = dragElement.parentElement?.parentElement.id;
    updateRank(n, dragIndex);
  }
  dragElement = '';
};
</script>
