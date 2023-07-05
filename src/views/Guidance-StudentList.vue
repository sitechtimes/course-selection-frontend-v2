<script setup lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { studentData } from '../types/interface'
import { ref, Ref, computed } from 'vue'

// const students:Array<studentData> = useUserStore().data.guidance.students
const students = useUserStore().data.guidance.students
const input:Ref<string> = ref('')

const newStudents = computed(() => {
  return students.filter((student: { user: { firstName: string; lastName: string; }; osis: string|string[]; }) => {
        return (
          student.user.firstName.toLowerCase().indexOf(input.value.toLowerCase()) != -1 || student.user.lastName.toLowerCase().indexOf(input.value.toLowerCase()) != -1 || student.osis.indexOf(input.value) != -1
        );
      })
})
</script>

<template>
    <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
        <div class="flex flex-row items-center justify-center">
          <Sort :students="students"/>
          <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable :newstudents="newStudents"/>
    </div>
</template>