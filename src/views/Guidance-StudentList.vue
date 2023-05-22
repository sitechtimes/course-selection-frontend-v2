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
  methods: {
    handleCreate(event: any, input: any) {
      // Our event handler gets the event, as well as any
      // arguments the child passes to the event
      console.log('From the child:', input);
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
        <Sort :students="students"/>
        <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable @created="handleCreate"/>
    </div>
</template>