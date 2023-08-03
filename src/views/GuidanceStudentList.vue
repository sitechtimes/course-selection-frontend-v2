<script setup lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/SortButton.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { useGuidanceStore } from '../stores/guidance';
import { studentGuidance } from '../types/interface'
import { ref, Ref, computed, watch } from 'vue'

document.title = 'Student List | SITHS Course Selection'

const guidanceStore = useGuidanceStore()
guidanceStore.currentlyViewing = guidanceStore.guidance.students
let allStudents: studentGuidance[] = [];

guidanceStore.allStudents.edges.forEach((el) => {
    allStudents.push(el.node)
});

const input:Ref<string> = ref('')
const viewAll = ref(false)

//sorting students to view
const newStudents = computed(() => {
  viewAll.value
  return guidanceStore.currentlyViewing.filter((student: studentGuidance) =>
          (student.user.firstName + ' ' + student.user.lastName).toLowerCase().indexOf(input.value.toLowerCase()) != -1 || student.user.email.indexOf(input.value) != -1
  );

})

watch(() => viewAll.value, (newResponse) => {
  if(viewAll.value === true){
    guidanceStore.currentlyViewing = allStudents
  }
  if(viewAll.value === false){
    guidanceStore.currentlyViewing = guidanceStore.guidance.students
  }
})
</script>

<template>
    <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
        <div class="flex flex-row items-center justify-center w-5/6">
          <div class="w-1/3 flex flex-row">
            <div class="h-10 w-80 mx-10 flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">
              <label class="font-semibold mt-2.5 ml-0 flex">View all students</label>
              <input class="font-semibold mt-2.5 ml-0 flex" type="checkbox" v-model="viewAll"/>
            </div>
            <Sort/>
          </div>
          <SearchBar class="w-2/3" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable :newstudents="newStudents"/>
    </div>
</template>