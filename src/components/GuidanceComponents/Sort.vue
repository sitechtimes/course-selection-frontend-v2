<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useUserStore } from '../../stores/user';
import DownArrow from '../icons/DownArrow.vue';
const students = useUserStore().data.guidance.students;
const input = ref("");
const props = ["title"];
const selected = ref("Sort By");
const isOpen = ref(false);
// const lastnameaz = ref("Last Name (A-Z)")
// const lastnameza = ref("Last Name (Z-A)")
// const ns = ref("Not Started")
// const ip = ref("In Progress")
// const com = ref("Complete")
// const nine = ref("Grade 9")
// const ten = ref("Grade 10")
// const eleven = ref("Grade 11")
const menuArray = [
  {
    sortBy: "lastnameaz",
    text: "Last Name (A-Z)"
  },
  {
    sortBy: "lastnameza",
    text: "Last Name (Z-A)"
  },
  {
    sortBy: "ns",
    text: "Not Started"
  },
  {
    sortBy: "ip",
    text: "In Progress"
  },
  {
    sortBy: "com",
    text: "Completed"
  },
  {
    sortBy: "nine",
    text: "Grade 9"
  },
  {
    sortBy: "ten",
    text: "Grade 10"
  },
  {
    sortBy: "eleven",
    text: "Grade 11"
  },
]
/* const menuarray = ref([
  "Last Name (A-Z)",
  "Last Name (Z-A)",
  "Not Started",
  "In Progress",
  "Complete",
  "Grade 9",
  "Grade 10",
  "Grade 11",
]) */

const sortBy = (sort: string) => {
  function lastnameaz(a: { user: { lastName: any; }; }, b: { user: { lastName: any; }; }) {
    if (a.user.lastName < b.user.lastName) return -1;
    if (a.user.lastName > b.user.lastName) return 1;
    return 0;
  }

  return (students.sort(sortBy))
}

// const LastNameInc = computed(() => {
//   function compare(a: { user: { lastName: any; }; }, b: { user: { lastName: any; }; }) {
//     if (a.user.lastName < b.user.lastName) return -1;
//     if (a.user.lastName > b.user.lastName) return 1;
//     return 0;
//   }
//   return (students.sort(compare));
// });
// const LastNameDec = computed(() => {
//   function compare(a: { user: { lastName: any; }; }, b: { user: { lastName: any; }; }) {
//     if (a.user.lastName > b.user.lastName) return -1;
//     if (a.user.lastName < b.user.lastName) return 1;
//     return 0;
//   }
//   return (students.sort(compare));
// });
// const notstarted = computed(() => {
//   function compare(a: { grade: any; }) {
//     if (a.userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis) === undefined) return -1;
//     else
//     return null;
//   }
//   return (students.sort(compare));
// });
// const inprogress = computed(() => {
//   function compare(a: { grade: any; }) {
//     if (a.userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis).node.status === 'INCOMPLETE') return -1;
//     else
//     return null;
//   }
//   return (students.sort(compare));
// });
// const completed = computed(() => {
//   function compare(a: { grade: any; }) {
//     if (a.userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis).node.status === 'COMPLETE') return -1;
//     else
//     return null;
//   }
//   return (students.sort(compare));
// });
// const grade9 = computed(() => {
//   function compare(a: { grade: any; }) {
//     if (a.grade === "SOPHOMORE") return -1;
//     else
//     return null;
//   }
//   return (students.sort(compare));
// });
// const grade10 = computed(() => {
//   function compare(a: { grade: any; }) {
//     if (a.grade === "JUNIOR") return -1;
//     else
//     return null;
//   }
//   return (students.sort(compare));
// });
// const grade11 = computed(() => {
//   function compare(a: { grade: any; }) {
//     if (a.grade === "SENIOR") return -1;
//     else
//     return null;
//   }
//   return (students.sort(compare));
// });

function show() {
  onMounted(() => {
    return {
      input,
      props,
      isOpen,
    };
  });
}
</script>

<template>
     <div class="w-[16rem]">
     <div
      class="h-10 flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <div>
        <a class="mt-2.5 ml-4 flex">
          <p class="font-semibold" id="sortshow">{{ selected }}</p>
        </a>
      </div>
      <DownArrow class="mt-2.5"/>
      </div>
      <div class="sub-menu absolute shadow-[4px_3px_3px_rgba(0,0,0,0.25)]" v-if="isOpen" >
        <div v-for="x in menuArray" :key="x.sortBy" class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="sortBy(x.sortBy)" class="ml-2">{{ x.text }}</button>
        </div>
        <!-- <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="LastNameInc()" class="ml-2">{{ lastnameaz }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="LastNameDec()" class="ml-2">{{ lastnameza }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="notstarted()" class="ml-2">{{ ns }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="inprogress()" class="ml-2">{{ ip }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="completed()" class="ml-2">{{ com }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="grade9()" class="ml-2">{{ nine }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="grade10()" class="ml-2">{{ ten }}</button>
        </div>
        <div class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="grade11()" class="ml-2">{{ eleven }}</button>
        </div> -->
      </div>
    </div>
</template>