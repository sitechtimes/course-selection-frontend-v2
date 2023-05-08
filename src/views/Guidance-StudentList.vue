<script lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import StudentSurvey from '../components/GuidanceComponents/StudentSurvey.vue'
import { useUserStore } from '../stores/user';
import { students } from '../mockdata';
import { ref } from 'vue'

export default {
  components: {
    SearchBar,
    Sort,
    StudentTable,
    StudentSurvey
  },
  data() {
    return {
      students: students,
      input: ref(""),
      viewingUser: true
    };
  },
};
</script>

<template>
    <div class="h-screen w-full flex flex-col justify-center items-center">
        <div class="ml-20 flex flex-row items-center">
        <Sort :students="students"/>
        <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
        <StudentTable :viewingUser="viewingUser"/>
        <StudentSurvey v-if="viewingUser"></StudentSurvey>
    </div>
</template>