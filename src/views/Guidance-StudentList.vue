<script setup lang="ts">
import SearchBar from '../components/GeneralComponents/SearchBar.vue';
import DownArrow from '../components/icons/DownArrow.vue';
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
    <div class="w-full flex flex-col mt-10 justify-center items-center" id="table">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>OSIS</th>
                    <th>Email</th>
                    <th>Progress</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Lin, Wendy</td>
                    <td>10</td>
                    <td>93453927859</td>
                    <td>wendyl26@nycstudents.net</td>
                    <td>Not Started</td>
                    <td>View</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>