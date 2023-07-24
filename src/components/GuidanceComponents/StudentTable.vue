<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '../../stores/user';
import { useSurveyStore } from '../../stores/survey';
import { useGuidanceStore } from '../../stores/guidance';
import SearchBar from "./SearchBar.vue"
import { useRouter } from 'vue-router'
import { studentData } from '../../types/interface';

const props = defineProps(['newstudents'])
const userStore = useUserStore()
const surveyStore = useSurveyStore()
const guidanceStore = useGuidanceStore()
const router = useRouter()

async function userClick(student: studentData) {
    await surveyStore.setSurvey(student.user.email, guidanceStore.allSurveys.edges.find(x => x.node.grade === student.grade).node.questions, student.grade)
    router.push(`/guidance/survey/${student.user.email}`)
}

</script>

<template>
    <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
        <table class="w-full border-2 border-black table-auto text-left">
            <thead class="fill-primary-g border-2 border-black">
                <tr class="bg-primary-g">
                    <th class="p-4">Name</th>
                    <th class="p-4">Grade</th>
                    <!-- <th class="p-4">OSIS</th> -->
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
                    <!-- <td class="p-4">{{ student.osis }}</td> -->
                    <td class="p-4">{{ student.user.email }}</td>
                    <td class="p-4" v-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade) === undefined">
                        <p class="text-[#461616] bg-[#EA9F9F] w-[8rem] font-semibold text-center p-1 rounded-2xl">Not Started</p>
                    </td>
                    <td class="p-4" v-else-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade)?.node.status === 'INCOMPLETE'">
                        <p class="text-[#461616] bg-[#F9D477] w-[8rem] font-semibold text-center p-1 rounded-2xl">In Progress</p>
                    </td>
                    <td class="p-4" v-else-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade)?.node.status === 'COMPLETE'">
                        <p class="text-[#174616] bg-[#A8D480] w-[8rem] font-semibold text-center p-1 rounded-2xl">Completed</p>
                    </td>
                    <td>View Survey</td>
                </tr>
            </tbody>
        </table>
        </div>
</template>