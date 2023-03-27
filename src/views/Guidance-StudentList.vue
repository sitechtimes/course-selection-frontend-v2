<script setup lang="ts">
import SearchBar from '../components/GeneralComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';

const students = [
    {
        lastname: "Lin",
        firstname: "Wendy",
        grade: 10,
        osis: 93453927859,
        email: "wendyl26@nycstudents.net",
        progress: "Not Started",
    },
    {
        lastname: "Chen",
        firstname: "Jason",
        grade: 12,
        osis: 828471831,
        email: "jasonc2801@nycstudents.net",
        progress: "In Progress",
    },
    {
        lastname: "Yang",
        firstname: "Jessie",
        grade: 11,
        osis: 93453927859,
        email: "jessiey2@nycstudents.net",
        progress: "Completed",
    },
    {
        lastname: "Whalen",
        firstname: "Michael",
        grade: 9,
        osis: 828471831,
        email: "mwhalen21@nycdoe.gov",
        progress: "Not Started",
    },
]
</script>

<template>
    <div class="h-screen w-full flex flex-col justify-center items-center">
        <div class="ml-20 flex flex-row items-center">
        <button class="w-44 h-10 mr-4 bg-primary-g text-black rounded cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">
            <div class="font-semibold ml-4 flex justify-evenly">
                Sort By
                <DownArrow/>
            </div>
        </button>
        <SearchBar class="" type="text" placeholder="Search Students..." />
        </div>
    <div class="flex flex-col mt-10 justify-center items-center" id="table">
<!--         <table class="w-[100rem] border-2 border-black table-auto text-left">
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
            <tbody class="border-2 border-black" v-for="student for students">
                <tr>
                    <td>{{ osis }}</td>
                </tr>
            </tbody>
        </table> -->
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
            <tbody class="border-2 border-black">
                <tr>
                    <td class="p-4">Lin, Wendy</td>
                    <td class="p-4">10</td>
                    <td class="p-4">93453927859</td>
                    <td class="p-4">wendyl26@nycstudents.net</td>
                    <td class="p-4">
                        <p class="text-[#461616] bg-[#EA9F9F] w-[8rem] font-semibold text-center p-1 rounded-2xl">Not Started</p>
                    </td>
                    <td class="p-4">View</td>
                </tr>
                <tr class="border-2 border-black">
                    <td class="p-4">Chen, Jason</td>
                    <td class="p-4">12</td>
                    <td class="p-4">828471831</td>
                    <td class="p-4">jasonc2801@nycstudents.net</td>
                    <td class="p-4">
                        <p class="text-[#461616] bg-[#F9D477] w-[8rem] font-semibold text-center p-1 rounded-2xl">In Progress</p>
                    </td>
                    <td class="p-4">View</td>
                </tr>
                <tr class="border-2 border-black">
                    <td class="p-4">Yang, Jessie</td>
                    <td class="p-4">11</td>
                    <td class="p-4">93453927859</td>
                    <td class="p-4">jessiey2@nycstudents.net</td>
                    <td class="p-4">
                        <p class="text-[#174616] bg-[#A8D480] w-[8rem] font-semibold text-center p-1 rounded-2xl">Complete</p></td>
                    <td class="p-4">View</td>
                </tr>
                <tr class="border-2 border-black">
                    <td class="p-4">Whalen, Michael</td>
                    <td class="p-4">9</td>
                    <td class="p-4">828471831</td>
                    <td class="p-4">mwhalen21@nycdoe.gov</td>
                    <td class="p-4">
                        <p class="text-[#461616] bg-[#EA9F9F] w-[8rem] font-semibold text-center p-1 rounded-2xl">Not Started</p>
                    </td>
                    <td class="p-4">View</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>