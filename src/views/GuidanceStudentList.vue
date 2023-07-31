<script setup lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import AllStudents from '../components/GuidanceComponents/AllStudents.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { useGuidanceStore } from '../stores/guidance';
import { studentData } from '../types/interface'
import { ref, Ref, computed } from 'vue'

document.title = 'Student List | SITHS Course Selection'

// const students:Array<studentData> = useUserStore().data.guidance.students
const guidanceStore = useGuidanceStore()
let students = ref('') // students sorted from here, masterlis
students = guidanceStore.guidance.students
//change students to ref
const input:Ref<string> = ref('')
const omg = ref(false)

//sorting students to view
const newStudents = computed(() => {
  return students.filter((student: { user: { firstName: string; lastName: string; };  }) => {
        const studentName = student.user.firstName + ' ' + student.user.lastName
        return (
          studentName.toLowerCase().indexOf(input.value.toLowerCase()) != -1 || student.user.email.indexOf(input.value) != -1
        );
      })
})
let allStudents = [];
function tester(){
  const oldAllStudents = guidanceStore.allStudents.edges  
  oldAllStudents.forEach((el) => {
    allStudents.push(el.node)
  });
  console.log(allStudents)
  students = allStudents
}
function a(){
  console.log(students)
}

let componentKey = 0
</script>

<template>
    <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
        <div class="flex flex-row items-center justify-center">
          <AllStudents @click="tester()"/>
          <Sort @click="a()" :students="students"/>
          <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable :newstudents="newStudents" :key="componentKey"/>
    </div>
</template>