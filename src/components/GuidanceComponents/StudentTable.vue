<script setup lang="ts">
import { ref, computed } from 'vue';
/* import { students } from '../../mockdata'; */
import { useUserStore } from '../../stores/user';
import SearchBar from "./SearchBar.vue"
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const newstudents = userStore.data.guidance.students;
const input = ref("")
const router = useRouter()

async function userClick(student: object) {
    await userStore.setSurvey(student.osis, userStore.data.allSurveys.edges.find(x => x.node.grade === student.grade).node.questions)
    router.push(`/guidance/survey/${student.osis}`)
}

</script>

<template>
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
            <tbody v-for="student in newstudents" :key="student" class="border-2 border-black">
                <tr @click="userClick(student)"> 
                    <td class="p-4">{{ student.user.lastName }}, {{ student.user.firstName }}</td>

                    <td class="p-4" v-if="student.grade === 'SOPHOMORE'">9</td>
                    <td class="p-4" v-if="student.grade === 'JUNIOR'">10</td>
                    <td class="p-4" v-if="student.grade === 'SENIOR'">11</td>

                    <td class="p-4">{{ student.osis }}</td>
                    <td class="p-4">{{ student.user.email }}</td>
                    <td class="p-4" v-if="userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis === student.osis) === undefined">
                        <p class="text-[#461616] bg-[#EA9F9F] w-[8rem] font-semibold text-center p-1 rounded-2xl">Not Started</p>
                    </td>
                    <td class="p-4" v-else-if="userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis === student.osis).node.status === 'INCOMPLETE'">
                        <p class="text-[#461616] bg-[#F9D477] w-[8rem] font-semibold text-center p-1 rounded-2xl">In Progress</p>
                    </td>
                    <td class="p-4" v-else-if="userStore.data.allAnsweredSurveys.edges.find(x => x.node.osis === student.osis).node.status === 'COMPLETE'">
                        <p class="text-[#174616] bg-[#A8D480] w-[8rem] font-semibold text-center p-1 rounded-2xl">Completed</p>
                    </td>
                    <td>View Survey</td>
                </tr>
            </tbody>
        </table>
        </div>
</template>