<script setup lang="ts">
import { students } from '../../mockdata';
import { useUserStore } from '../../stores/user';

const userStore = useUserStore()
const newstudents = userStore.data.guidance.students;
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
            <tbody v-for="student in newstudents" class="border-2 border-black">
                <tr>
                    <td class="p-4">{{ student.lastname }}, {{ student.user.firstName }}</td>
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
</template>