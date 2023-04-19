<script lang="ts">
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
import Sort from '../components/GuidanceComponents/Sort.vue';
import { students } from '../mockdata';
import { ref } from 'vue';

export default {
  components: {
    SearchBar,
    Sort,
  },
  data() {
    return {
        students: students,
      input: ref(""),
    };
  },
  computed: {
    filteredList() {
      return this.students.filter((student) => {
        return (
          student.lastname.toLowerCase().indexOf(this.input.toLowerCase()) != -1
        );
      });
    },
  },
  mounted() {
    this.filteredList;
  },
};
</script>

<template>
    <div class="h-screen w-full flex flex-col justify-center items-center">
        <div class="ml-20 flex flex-row items-center">
        <Sort :students="students"/>
        <SearchBar class="" type="text" v-model="input" placeholder="Search Students..." />
        </div>
    <div class="flex flex-col mt-10 justify-center items-center" id="table">
        <table class="w-[100rem] border-2 border-black table-auto text-left">
            <thead class="fill-primary-g border-2 border-black">
                <tr class="bg-primary-g">
                    <th class="p-4">Name</th>
                    <th class="p-4">Grade</th>
                    <th class="p-4">OSIS</th>
                    <th class="p-4">Email</th>
                    <th class="p-4">Progress</th>
                    <th class="p-4">Details</th>
                </tr>
            </thead>
            <tbody v-for="student in filteredList" class="border-2 border-black">
                <tr>
                    <td class="p-4">{{ student.lastname }}, {{ student.firstname }}</td>
                    <td class="p-4">{{ student.grade }}</td>
                    <td class="p-4">{{ student.osis }}</td>
                    <td class="p-4">{{ student.email }}</td>
                    <td class="p-4" v-if="student.progress === 'Not Started'">
                        <p class="text-[#461616] bg-[#EA9F9F] w-[8rem] font-semibold text-center p-1 rounded-2xl">{{ student.progress }}</p>
                    </td>
                    <td class="p-4" v-else-if="student.progress === 'In Progress'">
                        <p class="text-[#461616] bg-[#F9D477] w-[8rem] font-semibold text-center p-1 rounded-2xl">{{ student.progress }}</p>
                    </td>
                    <td class="p-4" v-else-if="student.progress === 'Complete'">
                        <p class="text-[#174616] bg-[#A8D480] w-[8rem] font-semibold text-center p-1 rounded-2xl">{{ student.progress }}</p>
                    </td>
                    <td class="p-4">View</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>