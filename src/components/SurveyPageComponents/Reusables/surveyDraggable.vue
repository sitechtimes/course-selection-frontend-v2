<template>
  <div class="h-auto select-none">
    <div class="p-4 flex justify-center text-center text-3xl h-screen">
      <div class="flex flex-col mt-2">
        <div class="mt-5 mb-4 flex flex-row" v-for="n in props.courses" :key="n.name" :id="n.rank.toString()">
        <p>{{ n.rank }}.</p>
        <div
          id="a"
          @dragleave.prevent="(e) => e.target.classList.remove('bg-gray-100')"
          class="m-2 rounded-lg h-14 shadow-deepinner placeholder">
          <div
            class="bg-[#D6EEFF] p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14 course"
            draggable="true"
            @dragover.prevent="(e) => hoverBoxOver(e)"
            @dragstart="(e) => (dragElement = e.target)"
            @drop.prevent="(e) => hoverBox(e, n.rank)"
          >
            {{ n.name }}
          </div>
        </div>
      </div>
        <!-- <div class="mt-5 mb-4 flex flex-row" v-for="n in computedHeight" :key="n" :id="n.toString()">
        <p>{{ n }}.</p>
        <div
          id="a"
          @dragleave.prevent="(e) => e.target.classList.remove('bg-gray-100')"
          class="m-2 rounded-lg h-14 shadow-deepinner placeholder">
          <div
            class="bg-[#D6EEFF] p-2 rounded-lg shadow-lg text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14 course"
            draggable="true"
            @dragover.prevent="(e) => hoverBoxOver(e)"
            @dragstart="(e) => (dragElement = e.target)"
            @drop.prevent="(e) => hoverBox(e, n)"
          >
            {{ surveyStore.currentResponse[props.index].answer[1].classPreference.find(x => x.rank == n).name }}
          </div>
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useSurveyStore } from "../../../stores/survey";

const props = defineProps({
  courses: Array,
  numbered: Boolean,
  index: Number,
});

let sort = props.courses.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
console.log(sort, 'ui')


const surveyStore = useSurveyStore()
let dragElement: HTMLElement;

const computedHeight = computed(() => {
  return props.courses.length;
});

// const ref_courses = ref(props.courses);

const hoverBoxOver = function (e) {
  let dragParent = dragElement.parentElement;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
};

const hoverBox = function (e, n) {
  let dragParent = dragElement.parentElement;
  let dragIndex = dragParent?.parentElement.id;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
  console.log(n, dragIndex)
  updateRank(n, dragIndex)
  console.log('called')
  // console.log(dragParent?.parentElement)
};
// console.log(surveyStore.currentResponse[props.index].answer[1].classPreference, 'omg')
function updateRank(n, dragIndex) {
  const classN = surveyStore.currentResponse[props.index].answer[1].classPreference.findIndex(x => x.rank === +n)
  const classDragIndex = surveyStore.currentResponse[props.index].answer[1].classPreference.findIndex(x => x.rank === +dragIndex)
  console.log(surveyStore.currentResponse[props.index].answer[1].classPreference.findIndex(x => x.rank === +n), n ,'n')
  console.log(surveyStore.currentResponse[props.index].answer[1].classPreference.findIndex(x => x.rank === +dragIndex), classDragIndex, 'c')
  
  surveyStore.currentResponse[props.index].answer[1].classPreference[classN].rank = classDragIndex + 1
  surveyStore.currentResponse[props.index].answer[1].classPreference[classDragIndex].rank = classN + 1
  console.log(classDragIndex, classN, surveyStore.currentResponse[props.index].answer[1].classPreference, 'o')
  // console.log(n, 'start')
  // console.log(dragIndex, 'end')
  // console.log(props.index)
  // console.log(surveyStore.currentResponse[props.index].answer[1].classPreference, 'ojiodsuisiud')
}
</script>
