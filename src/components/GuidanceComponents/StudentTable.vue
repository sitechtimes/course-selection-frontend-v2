<script lang="ts">
import { ref, computed } from 'vue';
/* import { students } from '../../mockdata'; */
import { useUserStore } from '../../stores/user';
import SearchBar from "./SearchBar.vue"

export default {
  props: {   
  
  },
  data() {
    return {
    students: useUserStore().data.guidance.students,
    input: ref(""),
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
  mounted() {
    this.newstudents;

    // Instead of calling the method we emit an event
    this.$emit('created', this.input);
  }
}

/*   components: {
    SearchBar,
  },
  data() {
    return {
      students: useUserStore().data.guidance.students,
      input: ref(""),
    };
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
  mounted() {
    this.newstudents;
  }, */

/* const userStore = useUserStore()
let newstudents = userStore.data.guidance.students;
const input = ref("")

function students() {
      return newstudents.value.filter((student) => {
        return (
          student.firstName.toLowerCase().indexOf(input.value.toLowerCase()) != -1
        );
      });
} */

</script>

<template>
    <div class="flex flex-col mt-10 justify-center items-center w-5/6" id="table">
        <div id="help">
        </div>
        <table class="w-full border-2 border-black table-auto text-left">
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
            <tbody v-for="student in students" :student="student" class="border-2 border-black">
                <tr>
                    <td class="p-4">{{ student.user.lastName }}, {{ student.user.firstName }}</td>
                    <td class="p-4">{{ student.grade }}</td>
                    <td class="p-4">{{ student.osis }}</td>
                    <td class="p-4">{{ student.user.email }}</td>
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
</template>