<template>
  <div class="h-auto select-none">
    <!-- <div v-for="x in xx" :id="x.omg" :key="x.name">{{ x.name }}, {{ x.omg }}</div> -->
    <!-- <button @click="xx[1].name = 'ooooo'">oiahdiushadawui</button> -->
    <div class="p-4 flex justify-center text-center text-3xl h-screen">
     <div class="flex flex-col mt-2">
        <!-- <div class="mt-5 mb-4 flex flex-row" v-for="n in ref_courses" :key="n.name" :id="n.rank">
        <p>{{ n.rank }}.</p>
        <div
          id="a"
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
      </div> -->
        <div class="mt-5 mb-4 flex flex-row" v-for="n in computedHeight" :key="n" :id="n.toString()">
        <p>{{ n }}.</p>
        <div
       
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
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref, onBeforeMount } from "vue";
import { useSurveyStore } from "../../../stores/survey";

const props = defineProps({
  courses: Array,
  numbered: Boolean,
  index: Number,
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

const hoverBox = function (e, n) {
  let dragParent = dragElement.parentElement;
  let dragIndex = dragParent?.parentElement.id;
  e.target.parentElement.appendChild(dragElement);
  dragParent.appendChild(e.target);
  updateRank(n, dragIndex)
};

function updateRank(n, dragIndex) {
  const startObject = ref_courses.value.findIndex(x => x.rank === +n)

  if(+n > +dragIndex) {
    ref_courses.value.forEach((x, index) => {
      if(x.rank < +n && x.rank >= +dragIndex){
        ref_courses.value[index].rank = ref_courses.value[index].rank + 1
      }
    });
    ref_courses.value[startObject].rank = +dragIndex

  } else if(+n < +dragIndex) {
    ref_courses.value.forEach((x, index) => {
      if(x.rank > +n && x.rank <= +dragIndex){
        ref_courses.value[index].rank = ref_courses.value[index].rank - 1
      }
    });
    ref_courses.value[startObject].rank = +dragIndex

  } else {
    console.log('no change')
  }
  ref_courses.value.sort(function(a, b) {
    return parseFloat(a.rank) - parseFloat(b.rank);
  });
  surveyStore.currentResponse[props.index].answer[1].classPreference = ref_courses.value
  console.log(surveyStore.currentResponse[props.index].answer[1].classPreference)
}
</script>
