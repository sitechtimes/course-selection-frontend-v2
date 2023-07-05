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
      students: students,
      input: ref(""),
    };
  },
};
</script>

<template>
    <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
        <div class="flex flex-row items-center justify-center">
          <Sort :students="students"/>
          <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable/>
    </div>
</template>