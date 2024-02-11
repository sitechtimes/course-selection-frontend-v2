<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
    <div class="flex flex-row items-center justify-center w-5/6">
      <div class="w-1/3 flex flex-row justify-evenly">
        <div v-if="loading">Loading students...</div>
        <div @click="viewAll = !viewAll"
          class="h-10 px-4 w-60 mx-10 flex flex-row bg-primary-g text-black justify-evenly font-semibold items-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">
          <label class="cursor-pointer">View all students</label>
          <input class="ml-2" type="checkbox" v-model="viewAll" />
        </div>
        <Sort class="mr-0" @filter-selected="filterType" />
      </div>
      <SearchBar class="w-2/3" type="text" v-model="input" placeholder="Search Students..." />
    </div>
    <StudentTable :newstudents="sortAndFilterStudents.slice(x, y)" />
    <div class="max-w-[80%] overflow-x-auto mt-4 flex flex-row justify-between">
      <button class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" @click="subtract" :disabled="currentPage === 1">
        ❮
      </button>
      <button v-for="n in pages" @click="updatePage(n)" :class="{
        'bg-[#cdeeb4] focus:bg-[#cdeeb4]': currentPage === n,
        'bg-[#ebebeb]': currentPage !== n,
      }" class="h-8 w-8 rounded-lg hover:opacity-75 ease-in-out duration-300 font-bold mx-2">
        {{ n }}
      </button>
      <button class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" :disabled="currentPage === pages" @click="add">
        ❯
      </button>
    </div>
    <h5 class="mt-4">
      Page
      <span class="font-bold m-1"> {{ currentPage }}</span>
      of
      <span class="font-bold m-1">{{ pages }}</span>
    </h5>
  </div>
</template>

<script setup lang="ts">
import SearchBar from "../components/GuidanceComponents/SearchBar.vue";
import Sort from "../components/GuidanceComponents/SortButton.vue";
import StudentTable from "../components/GuidanceComponents/StudentTable.vue";
import { useUserStore } from "../stores/user";
import { studentGuidance, studentPreview } from "../types/interface";
import { ref, Ref, computed, watch, onMounted } from "vue";

document.title = "Student List | SITHS Course Selection";

const userStore = useUserStore();
const allStudents: Ref<studentPreview[]> = ref([]);
const loading = ref(false);
const sortBy: Ref<string> = ref("lastnameaz");
const guidanceStudents = userStore.guidanceStudents;
const input: Ref<string> = ref("");
const viewAll = ref(false);
let x = ref(0);
let y = ref(10);
const pageCapacity = 10;
const currentPage = ref(1);
const pages = ref(1);

onMounted(async () => {
  //@ts-ignore
  userStore.currentlyViewingStudents = userStore.guidanceStudents;
});

async function fetchStudents() {
  const { access_token } = useUserStore();
  loading.value = true;
  try {
    // GET request for all students
    const profilesResponse = await fetch(
      `${import.meta.env.VITE_URL}/guidance/profiles`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    loading.value = false;
    const data = await profilesResponse.json();
    allStudents.value = data;
  } catch (error) {
    console.error("Error:", error);
  }
}

const filterType = (selected: string) => {
  sortBy.value = selected;
};

const sortAndFilterStudents = computed(() => {
  let sortedStudents = [...guidanceStudents]; //create a copy to avoid modifying the original array

  if (sortBy.value === 'lastnameaz') {
    sortedStudents = sortedStudents.sort((a: studentGuidance, b: studentGuidance) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'lastnameza') {
    sortedStudents = sortedStudents.sort((a: studentGuidance, b: studentGuidance) => b.name.localeCompare(a.name));
  } else if (sortBy.value === 'ns') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.status === 'NOT STARTED');
  } else if (sortBy.value === 'ip') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.status === 'INCOMPLETE');
  } else if (sortBy.value === 'com') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.status === 'COMPLETE');
  } else if (sortBy.value === 'final') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.status === 'FINALIZED');
  } else if (sortBy.value === 'nine') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.grade === 'FRESHMAN');
  } else if (sortBy.value === 'ten') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.grade === 'SOPHOMORE');
  } else if (sortBy.value === 'eleven') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.grade === 'JUNIOR');
  } else if (sortBy.value === 'transfer') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.flag === 'Transfer');
  } else if (sortBy.value === 'regents') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.flag === 'Regents');
  } else if (sortBy.value === 'sports') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.flag === 'Team');
  } else if (sortBy.value === 'enl') {
    sortedStudents = sortedStudents.filter((student: studentGuidance) => student.flag === 'ENL');
  }

  return sortedStudents.filter((student: studentGuidance) =>
    student.name.toLowerCase().includes(input.value.toLowerCase()) ||
    student.email.toLowerCase().includes(input.value.toLowerCase())
  );
});

//sorting students to view
const newStudents = computed(() => {
  return userStore.currentlyViewingStudents.filter(
    (student: studentPreview) =>

      student.name.toLowerCase().indexOf(input.value.toLowerCase()) !== -1 ||
      student.email.indexOf(input.value) !== -1
  );
});

watch(
  () => viewAll.value,
  async (newResponse) => {
    if (viewAll.value === true) {
      await fetchStudents();
      userStore.currentlyViewingStudents = allStudents.value;
    }
    if (viewAll.value === false) {
      //@ts-ignore
      userStore.currentlyViewingStudents = userStore.guidanceStudents;
    }
    updatePage(1);
  }
);

watch(newStudents, () => {
  const studentList = JSON.parse(JSON.stringify(newStudents.value));
  if (studentList.length < 1) {
    pages.value = 1;
  } else {
    pages.value = Math.ceil(studentList.length / pageCapacity);
  }
  updatePage(1);
});

const add = () => {
  currentPage.value++;
  x.value = x.value + pageCapacity;
  y.value = y.value + pageCapacity;
};

const subtract = () => {
  currentPage.value--;
  x.value = x.value - pageCapacity;
  y.value = y.value - pageCapacity;
};

const updatePage = (pageNumber: number) => {
  x.value = pageNumber * pageCapacity - pageCapacity;
  y.value = pageNumber * pageCapacity;
  currentPage.value = pageNumber;
};
</script>

