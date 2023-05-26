<script lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { ref } from 'vue'

export default {
  components: {
    SearchBar,
    Sort,
    StudentTable,
  },
  data() {
    return {
      students: useUserStore().data.guidance.students,
      input: ref("")
    }
  },
  computed: {
    newstudents() {
      return this.students.filter((student: { user: { firstName: string; lastName: string; }; osis: string|string[]; }) => {
        return (
          student.user.firstName.toLowerCase().indexOf(this.input.toLowerCase()) != -1 || student.user.lastName.toLowerCase().indexOf(this.input.toLowerCase()) != -1 || student.osis.indexOf(this.input) != -1
        );
      });
    },
  },
}

/* export default {
    components: {
    SearchBar,
    Sort,
    StudentTable,
    newstudents
  },
  data() {
    return {
      students: useUserStore().data.guidance.students,
      input: ref(""),
    };
  },
} */
</script>

<template>
    <div class="h-screen w-full flex flex-col justify-center items-center">
        <div class="ml-20 flex flex-row items-center">
        <Sort/>
        <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable :newstudents="newstudents"/>
    </div>
</template>