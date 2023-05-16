<template>
  <div class="h-screen select-none">
    <div class="mt-48 p-4 flex justify-center text-center text-3xl h-screen">
      <div
        class="p-4 mx-4 w-1/3 h-fit grid grid-cols-2"
        @dragover.prevent=""
        @drop.prevent="(en) => bringBack(en)"
      >
        <div
          v-for="course in courses"
          :key="course.name"
          class="bg-[#D6EEFF] m-2 p-2 rounded-lg shadow-xl text-[#37394F] cursor-grab active:cursor-grabbing font-semibold h-14 course"
          draggable="true"
          @dragover.prevent="(e) => hoverBox(e)"
          @dragstart="(e) => setElements(e)"
          @drop.prevent="(e) => hoverBox(e)"
        >
          {{ course.name }}
        </div>
      </div>
      <div class="flex flex-col mt-2">
        <div class="my-4" v-for="n in computedHeight" :key="n">{{ n }}.</div>
      </div>
      <div class="flex flex-col w-1/4">
        <div
          id="a"
          @dragover.prevent="(e) => e.target.classList.add('bg-gray-100')"
          @dragleave.prevent="(e) => dragPlaceholders(e)"
          @drop.prevent="(even) => test(even)"
          class="m-2 rounded-lg h-14 shadow-deepinner placeholder"
          v-for="course in courses"
          :key="course.name"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import Draggable from "vuedraggable";
import { ref, computed } from "vue";

const ncourses = [
  {
    name: "A",
    id: 10,
  },
  {
    name: "B",
    id: 1,
  },
  {
    name: "C",
    id: 2,
  },
  {
    name: "D",
    id: 3,
  },
  {
    name: "E",
    id: 4,
  },
  {
    name: "F",
    id: 5,
  },
  {
    name: "G",
    id: 6,
  },
];
let dragElement: HTMLElement;
const courses = ref(ncourses);
let dragging: Boolean = false;
let placeholders: NodeList;
let placeholderChildren: any;
let childrenCopy: Array<Element>;
const computedHeight = computed(() => {
  return ncourses.length;
});

const dragPlaceholders = function(e){
  e.target.classList.remove('bg-gray-100')
  placeholderChildren.sort(sorter)
  // display(placeholderChildren)
  // if(e.target.childNodes.length === 0){
  //   placeholderChildren.sort(sorter)
  // display(placeholderChildren)
  // console.log(placeholderChildren)
  // }
  
}
const setElements = function (e) {
  placeholders = document.querySelectorAll(".placeholder");
  let a = [...placeholders];
  placeholderChildren = a.map(function (element, index) {
    return [index, element.childNodes[0]];
  });
  dragElement = e.target;
};
const bringBack = function (e) {
  if (dragElement.classList.contains("sorted-course")) {
    dragElement.classList.add("m-2", "shadow-xl");
    dragElement.classList.remove("shadow-deepinner", "sorted-course");
    if (e.target.classList.contains("course")) {
      e.target.parentElement.appendChild(dragElement);
    } else {
      e.target.appendChild(dragElement);
    }
  }
};
const test = function (e) {
  dragElement.classList.remove("m-2", "shadow-xl");
  // if (!dragElement.classList.contains("sorted-course")) {
  dragElement.classList.add("shadow-deepinner", "sorted-course");
  // }
  e.target.classList.remove("bg-gray-100");
  if (e.target.id == "a") {
    e.target.appendChild(dragElement);
  }
};
``;

function emptyBelow(e) {
  let currentElement = e.target.parentElement.nextElementSibling;
  while (currentElement) {
    if (currentElement.childNodes.length == 0) {
      return true;
    }
    currentElement = currentElement.nextElementSibling;
  }
  return false;
}

function fillBelow(index: number) {
  let u: number;
  childrenCopy.sort(sorter)
  placeholderChildren.sort(sorter)
  placeholderChildren.every(function (element, i) {
    if (i > index) {
      if (element[1] === undefined) {
        u = i;
        console.log(u);
        return false;
      }
    }
    return true;
  });
  for (let j = u; j >= index; j--) {
    [childrenCopy[j], childrenCopy[j + 1]] = [
      childrenCopy[j + 1],
      childrenCopy[j],
    ];
  }
}

function fillAbove(index: number) {
  let u: number;
  placeholderChildren.every(function (element, i) {
    if (i < index) {
      if (element[1] === undefined) {
        u = i;
        console.log(u);
        return false;
      }
    }
    return true;
  });
  console.log(index)
  for (let j = index; j < u; j++) {
    [childrenCopy[j], childrenCopy[j + 1]] = [
      childrenCopy[j + 1],
      childrenCopy[j],
    ];
    console.log(j);
  }
}

function fillAboveBelow(index: number) {
  let undefinedBelow: Boolean = false;
  let undefinedAbove: Boolean = false;
  placeholderChildren.forEach(function (element, i) {
    if (element[1] === undefined) {
      if (i < index) {
        undefinedAbove = true;
      } else if (i > index) {
        undefinedBelow = true;
      }
    }
  });
  console.log("o");
  //if on bottom, shift everyting up
  if (index + 1 === placeholders.length) {
    console.log("ok");
    fillAbove(index);
  }
  //if on top, shift everything down
  else if (index === 0) {
    fillBelow(index);
  } else if (undefinedBelow) {
    fillBelow(index);
  } else if (undefinedAbove) {
    fillAbove(index);
  }
  display(childrenCopy);
  //if there is space on bottom, shift under it down
  //if there is space on top, shift above up
}

function display(arr) {
  arr.forEach(function (element, index) {
    if (element[1]) {
      placeholders[index].appendChild(element[1]);
    }
  });
}
const sorter = (a, b) => {
  return a[0] - b[0];
};
const hoverBox = function (e) {
  if (
    e.target.classList.contains("sorted-course") &&
    dragElement.classList.contains("sorted-course")
  ) {
    let dragParent = dragElement.parentElement;
    e.target.parentElement.appendChild(dragElement);
    dragParent.appendChild(e.target);
    dragElement.classList.remove("bg-gray-100");
    // e.target.parentElement.nextElementSibling.appendChild(dragElement);
  } else if (e.target.classList.contains("sorted-course")) {
    placeholderChildren.sort(sorter);
    childrenCopy = placeholderChildren;
    for(let i = 0; i < placeholderChildren.length; i++){
      if (placeholderChildren[i][1] === e.target) {
        console.log("ok")
        console.log("OKOK");
        fillAboveBelow(i);
        break;
      }
    }
    // placeholderChildren.every(function (element, index) {
    //   console.log(index)
    //   if (element[1] === e.target) {
    //     console.log("ok")
    //     console.log("OKOK");
    //     fillAboveBelow(index);
    //     return false;
    //   }
    // });
    // return true;
  }
};
const swap = function (e) {};
const log = function (e) {
  console.log("o");
};
const sortedList = ref([]);
</script>
