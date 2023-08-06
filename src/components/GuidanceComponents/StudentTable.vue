<script setup lang="ts">
import cornerArrow from '../icons/CornerArrow.vue'
import PlusSign from '../icons/PlusSign.vue';
import AddFlag from '../GuidanceComponents/AddFlag.vue'
import { ref, computed, PropType, Ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useSurveyStore } from '../../stores/survey';
import { useGuidanceStore } from '../../stores/guidance';
import { useRouter } from 'vue-router'
import { studentGuidance } from '../../types/interface';

const props = defineProps({
    newstudents: Array as PropType<Array<studentGuidance>>
})
const userStore = useUserStore()
const surveyStore = useSurveyStore()
const guidanceStore = useGuidanceStore()
const router = useRouter()

let tooltip: Ref<boolean> = ref(false)
let showFlagModal: Ref<string> = ref('')

const flags = [
    {
        flag: 'Transfer',
        title: 'Transfer student',
        color: 'bg-red-400'
    },
    {
        flag: 'Regents',
        title: 'Missing regents',
        color: 'bg-green-400'
    },
    {
        flag: 'Team',
        title: 'Three season athlete',
        color: 'bg-blue-400'
    },
    {
        flag: 'ENL',
        title: 'ENL',
        color: 'bg-purple-400'
    },
]

const toggleFlagModal = (student: string) => {
    showFlagModal.value = student
}

async function userClick(student: studentGuidance) {
    await surveyStore.setSurvey(student.user.email, student.grade)
    await router.push(`/guidance/survey/${student.user.email.replace('@nycstudents.net', ' ')}`)
    location.reload()
}
</script>

<template>
    <div class="flex flex-col mt-6 justify-center items-center w-5/6" id="table">
        <table class="w-full border-2 border-black table-auto text-left">
            <thead class="fill-primary-g border-2 border-black">
                <tr class="bg-primary-g">
                    <th class="p-4">Name</th>
                    <th class="p-4">Grade</th>
                    <th class="p-4">Email</th>
                    <th class="p-4">Status</th>
                    <th class="p-4">Details</th>
                    <th class="p-4 flex flex-row justify-center items-center">
                        <p class="p-2 font-bold">Flags</p>
                        <div>
                            <img src="../icons/InfoCircle.png" alt="information button for flags" class="h-5" @mouseover="tooltip = true" @mouseout="tooltip = false"/>
                            <div v-show="tooltip" class="absolute h-auto w-auto bg-white border-primary-g border p-2">
                                <div v-for="flag in flags" class="flex flex-row">
                                    <div class="m-1 rounded-full h-5 w-5" :class="`${flag.color}`"></div>
                                    <p class="m-1">= {{ flag.title}}</p>
                                </div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody v-for="student in newstudents" :key="student.user.firstName" class="border-2 border-black">
                <AddFlag v-if="showFlagModal === student.user.email" @exit="toggleFlagModal('')" :student="student" :flags="flags"></AddFlag>
                <tr>
                    <td class="p-4">{{ student.user.lastName }}, {{ student.user.firstName }}</td>
                    <td class="p-4" v-if="student.grade === 'SOPHOMORE'">9</td>
                    <td class="p-4" v-if="student.grade === 'JUNIOR'">10</td>
                    <td class="p-4" v-if="student.grade === 'SENIOR'">11</td>
                    <td class="p-4">{{ student.user.email }}</td>
                    <td class="p-4" v-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade) === undefined">
                        <p class="text-[#461616] bg-[#EA9F9F] w-[8rem] font-semibold text-center p-1 rounded-2xl">Not Started</p>
                    </td>
                    <td class="p-4" v-else-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade)?.node.status === 'INCOMPLETE'">
                        <p class="text-[#322911] bg-[#F9D477] w-[8rem] font-semibold text-center p-1 rounded-2xl">In Progress</p>
                    </td>
                    <td class="p-4" v-else-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade)?.node.status === 'COMPLETE'">
                        <p class="text-[#174616] bg-[#A8D480] w-[8rem] font-semibold text-center p-1 rounded-2xl">Completed</p>
                    </td>
                    <td class="p-4" v-else-if="guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === student.user.email && x.node.grade === student.grade)?.node.status === 'FINALIZED'">
                        <p class="text-[#311638] bg-[#D1A4DE] w-[8rem] font-semibold text-center p-1 rounded-2xl">Finalized</p>
                    </td>
                    <td @click="userClick(student)" class="p-4 hover:cursor-pointer">View Survey</td>
                    <td class="p-4 flex flex-row parent items-center justify-center">
                        <div v-for="flag in flags" :key="flag.flag">
                            <div>
                                <div v-show="student.flag.includes(flag.flag)" :title=flag.title :class="`${flag.color}`" class="m-1 rounded-full h-5 w-5"></div>
                            </div>
                        </div>
                        <PlusSign @click="toggleFlagModal(student.user.email)" class="m-1 hidden child"></PlusSign>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
</template>

<style scoped>
.parent:hover .child {
    display: block;
    transition: 0.3s;
}
</style>