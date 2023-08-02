<script setup lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { useGuidanceStore } from '../stores/guidance';
import { studentGuidance } from '../types/interface'
import { ref, Ref, computed, watch } from 'vue'

document.title = 'Student List | SITHS Course Selection'

const guidanceStore = useGuidanceStore()
let students = ref()
students = guidanceStore.guidance.students // students sorted from here, masterlis
let allStudents: studentGuidance[] = [];

guidanceStore.allStudents.edges.forEach((el) => {
    allStudents.push(el.node)
});

const input:Ref<string> = ref('')
const viewAll = ref(false)

//sorting students to view
const newStudents = computed(() => {
  viewAll.value
  return students.filter((student: studentGuidance) =>
          (student.user.firstName + ' ' + student.user.lastName).toLowerCase().indexOf(input.value.toLowerCase()) != -1 || student.user.email.indexOf(input.value) != -1
  );

})

watch(() => viewAll.value, (newResponse) => {
  if(viewAll.value === true){
    students = allStudents
    console.log('hi')
  }
  if(viewAll.value === false){
    students = guidanceStore.guidance.students
    console.log('hi')
  }
})

</script>

<template>
    <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
        <div class="flex flex-row items-center justify-center">
          <div class="h-10 w-80 mx-10 flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">
            <input class="font-semibold mt-2.5 ml-0 flex" type="checkbox" v-model="viewAll"/>
            <label class="font-semibold mt-2.5 ml-0 flex">View all students</label>
          </div>
          <Sort :students="students"/>
          <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable :newstudents="newStudents"/>
    </div>
</template>