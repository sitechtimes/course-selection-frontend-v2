<script lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { students } from '../mockdata';
import { ref } from 'vue'

export default {
  components: {
    SearchBar,
    Sort,
    StudentTable,
  },
  data() {
    return {
      haha: ref("")
    }
  },
  methods: {
    handleCreate(input: any) {
      let userInput = input;
      console.log('From the child:', userInput);
    }
  }
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
        <SearchBar class="" type="text" v-model="haha" placeholder="Search Students..." />
        </div>
        <StudentTable @created="handleCreate"/>
    </div>
</template>