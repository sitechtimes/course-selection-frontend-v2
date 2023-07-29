<script setup lang="ts">
import cornerArrow from '../icons/CornerArrow.vue'
import { ref, computed, PropType, Ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useSurveyStore } from '../../stores/survey';
import { useGuidanceStore } from '../../stores/guidance';
import SearchBar from "./SearchBar.vue"
import { useRouter } from 'vue-router'
import { studentData } from '../../types/interface';

const props = defineProps({
    newstudents: Array
})
const userStore = useUserStore()
const surveyStore = useSurveyStore()
const guidanceStore = useGuidanceStore()
const router = useRouter()

let tooltip: Ref<boolean> = ref(false)

async function userClick(student: studentData) {
    await surveyStore.setSurvey(student.user.email, guidanceStore.allSurveys.edges.find(x => x.node.grade === student.grade).node.question, student.grade)
    await router.push(`/guidance/survey/${student.user.email.replace('@nycstudents.net', ' ')}`)
    location.reload()

}

console.log(props.newstudents)
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
                    <th class="p-4 flex flex-row justify-center items-center">
                        <p class="p-2 font-bold">Flags</p>
                        <div>
                            <img src="../icons/InfoCircle.png" alt="information button for flags" class="h-5" @mouseover="tooltip = true" @mouseout="tooltip = false"/>
                            <div v-show="tooltip" class="absolute h-auto w-auto bg-white border-primary-g border p-2">
                                <div class="flex flex-row">
                                    <div class="m-1 bg-red-400 rounded-full h-5 w-5"></div>
                                    <p class="m-1">= Transfer Student</p>
                                </div>
                                <div class="flex flex-row"> 
                                    <div class="m-1 bg-green-400 rounded-full h-5 w-5"></div>
                                    <p class="m-1">= Missing Regents</p>
                                </div>
                                <div class="flex flex-row">
                                    <div class="m-1 bg-blue-400 rounded-full h-5 w-5"></div>
                                    <p class="m-1">= Sports Team</p>
                                </div>
                                <div class="flex flex-row">
                                    <div class="m-1 bg-purple-400 rounded-full h-5 w-5"></div>
                                    <p class="m-1">= ENL</p>
                                </div>
                            </div>
                        </div>
                    </th>
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
                    <td class="p-4 flex flex-row">
                        <div v-show="student.flag.includes('Transfer')" title="Transfer student" class="m-1 bg-red-400 rounded-full h-5 w-5"></div>
                        <div v-show="student.flag.includes('Regents')"  title="Missing regents" class="m-1 bg-green-400 rounded-full h-5 w-5"></div>
                        <div v-show="student.flag.includes('Team')"  title="On a sports team" class="m-1 bg-blue-400 rounded-full h-5 w-5"></div>
                        <div v-show="student.flag.includes('ENL')" title="ENL" class="m-1 bg-purple-400 rounded-full h-5 w-5"></div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
</template>