<template>
  <div class="h-auto select-none">
    <div v-for="x in xx" :id="x.omg" :key="x.name">{{ x.name }}, {{ x.omg }}</div>
    <button @click="xx[1].name = 'ooooo'">oiahdiushadawui</button>
    <div class="p-4 flex justify-center text-center text-3xl h-screen">
     <div class="flex flex-col mt-2">
        <div class="mt-5 mb-4 flex flex-row" v-for="n in ref_courses" :key="n.rank" :id="n.rank">
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
            {{ surveyStore.currentResponse[props.index].answer[1].classPreference.find(x => x.rank == n).name }}1
          </div>
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from "vue";
import { useSurveyStore } from "../../../stores/survey";

const props = defineProps({
  courses: Array,
  numbered: Boolean,
  index: Number,
});

// let sort = props.courses.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
// console.log(sort, 'ui')


const surveyStore = useSurveyStore()
let dragElement: HTMLElement;
// let dragI 

const computedHeight = computed(() => {
  return props.courses.length;
});

const ref_courses: Ref<Array<object>> = ref(props.courses);
const xx: Ref<Array<object>> = ref([{name: 'o', omg: 'op'}, {name:'p', omg: 'ooo'}]);

const hoverBoxOver = function (e) {
  let dragParent = dragElement.parentElement;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
};

const hoverBox = function (e, n) {
  let dragParent = dragElement.parentElement;
  let dragIndex = dragParent?.parentElement.id;
  e.target.parentElement.appendChild(dragElement);
  // dragParent.appendChild(e.target);
  // console.log(dragI, n)
  // console.log(dragIndex)
  updateRank(n, dragIndex)
  // console.log('called')
  // console.log(dragParent?.parentElement)
};
// console.log(surveyStore.currentResponse[props.index].answer[1].classPreference, 'omg')
// console.log(ref_courses)
function updateRank(n, dragIndex) {
  const startObject = ref_courses.value.findIndex(x => x.rank === +n)
  const endIndex = ref_courses.value.findIndex(x => x.rank === +dragIndex)
  console.log(n,'start', dragIndex, 'end')
  // console.log(surveyStore.currentResponse[props.index].answer[1].classPreference.findIndex(x => x.rank === +n), n ,'n')
  // console.log(surveyStore.currentResponse[props.index].answer[1].classPreference.findIndex(x => x.rank === +dragIndex), classDragIndex, 'c')
  if(+n > +dragIndex) {
    console.log('up')
    // const selectedClass = ref_course
    ref_courses.value.forEach((x, index) => {
      if(x.rank < +n && x.rank >= +dragIndex){
        ref_courses.value[index].rank = ref_courses.value[index].rank + 1
      }
    });
    console.log(ref_courses.value[startObject].rank, 'for the love of god')
    ref_courses.value[startObject].rank = +dragIndex
    console.log(ref_courses.value[startObject].rank, 'for the love of god')
    console.log(ref_courses.value, 'qwerty')
    // find startindex object, find index of all numbers between start (not inclusive) and end (inclusive) and add 1 to each rank, then set start object rank as end index plus one
  } else if(+n < +dragIndex) {
    console.log('down')
    // find startindex object, find index of all numbers between start (not inclusive) and end (inclusive) and add 1 to each rank, then set start object rank as end index plus one
  } else {
    console.log('no change')
  }
  
  // ref_courses.value[classN].rank = surveyStore.currentResponse[props.index].answer[1].classPreference[classDragIndex].rank
  // ref_courses.value[classDragIndex].rank = surveyStore.currentResponse[props.index].answer[1].classPreference[classDragIndex].rank
  // console.log(classDragIndex, classN, surveyStore.currentResponse[props.index].answer[1].classPreference, 'o')
  // console.log(n, 'start')
  // console.log(dragIndex, 'end')
  // console.log(props.index)
  // console.log(surveyStore.currentResponse[props.index].answer[1].classPreference, 'ojiodsuisiud')
  ref_courses.value.sort(function(a, b) {
    return parseFloat(a.rank) - parseFloat(b.rank);
    });
}
</script>
