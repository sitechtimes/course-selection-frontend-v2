<template>
  <div class="h-auto w-full flex flex-col justify-center items-center mb-10">
    <div class="flex flex-row items-center justify-center w-5/6">
      <div class="w-1/3 flex flex-row justify-evenly">
        <div v-if="loading">
          Loading students...
        </div>
        <div @click="viewAll = !viewAll"
          class="h-10 px-4 w-60 mx-10 flex flex-row bg-primary-g text-black justify-evenly  font-semibold items-center cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)] ">
          <label class="cursor-pointer">View all students</label>
          <input class="ml-2" type="checkbox" v-model="viewAll" />
        </div>
        <Sort class="mr-0" @filter-selected="sortBy"/>
      </div>
      <SearchBar class="w-2/3" type="text" v-model="input" placeholder="Search Students..." />
    </div>
    <StudentTable :newstudents="sortView"  />
    <div class="max-w-[80%] overflow-x-auto mt-4 flex flex-row justify-between ">
      <button
        class="mx-2 bg-[#ebebeb] h-8 w-8 rounded-lg font-bold"
        @click="subtract"
        :disabled="currentPage === 1"
      >
        ❮
      </button>
      <button v-for="n in pages" @click="updatePage(n)"
        :class="{ 'bg-[#cdeeb4] focus:bg-[#cdeeb4]': currentPage === n, 'bg-[#ebebeb]': currentPage !== n }"
        class=" h-8 w-8 rounded-lg hover:opacity-75 ease-in-out duration-300 font-bold mx-2"> {{ n }} </button>
      <button class=" mx-2  bg-[#ebebeb] h-8 w-8 rounded-lg font-bold" :disabled="currentPage === pages"
        @click="add">❯</button>
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
import SearchBar from '../components/GuidanceComponents/SearchBar.vue';
import Sort from '../components/GuidanceComponents/SortButton.vue';
import StudentTable from '../components/GuidanceComponents/StudentTable.vue'
import { useUserStore } from '../stores/user';
import { studentGuidance } from '../types/interface'
import { ref, Ref, computed, watch, onMounted } from 'vue'

document.title = "Student List | SITHS Course Selection";

const userStore = useUserStore();
const allStudents: Ref<studentGuidance[]> = ref([]);
const loading = ref(false);
const sortBy = (selected: string)=>{
  if(selected === 'ns') return 'ns'
  if(selected === 'ip') return 'ip'
};
const guidanceStudents = userStore.currentlyViewingStudents;
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
    loading.value=false
    const data = await profilesResponse.json();
    allStudents.value = data;
  } catch (error) {
    console.error("Error:", error);
  }
}

//handles the sorting view
const sortView = computed(() => {
  if (sortBy === 'lastnameaz') { // if user selects this
    console.log('selectedaz')
    function lastnameaz(a: { name: string; }, b: { name: string; }) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    return (guidanceStudents.sort(lastnameaz))
  } else if (sortBy === 'lastnameza') {
    function lastnameza(a: { name: string; }, b: { name: string; }) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    }
    return (guidanceStudents.sort(lastnameza))
  } else if (sortBy === "ns") {
    return guidanceStudents.filter(
      (student) => student.status === "NOT STARTED"
    );
  } else if(sortBy === "ip"){
    return guidanceStudents.filter(
      (student) => student.status === "INCOMPLETE"
    );
  } else if(sortBy === "com"){
    return guidanceStudents.filter(
      (student)=> student.status === "COMPLETE"
    );
  } else if(sortBy === 'final'){
    return guidanceStudents.filter(
      (student)=> student.status === "FINALIZED"
    );
  } else if(sortBy === "nine"){
    return guidanceStudents.filter(
      (student)=> student.grade === "FRESHMAN"
    )
  } else if(sortBy === "ten"){
    return guidanceStudents.filter(
      (student)=> student.grade === "SOPHOMORE"
    )
  } else if(sortBy === "eleven"){
    return guidanceStudents.filter(
      (student)=> student.grade === "JUNIOR"
    )
  } else if(sortBy === "transfer"){
    return guidanceStudents.filter(
      (student)=> student.flag.includes === "Transfer"
    )
  } else if(sortBy === "regents"){
    return guidanceStudents.filter(
      (student)=> student.flag.includes === "Regents"
    )
  } else if(sortBy === "sports"){
    return guidanceStudents.filter(
      (student)=> student.flag.includes === "Team"
    )
  } else if(sortBy === "enl"){
    return guidanceStudents.filter(
      (student)=> student.flag.includes === "ENL"
    )
  }
});

const input: Ref<string> = ref("");
const viewAll = ref(false);
let x = ref(0);
let y = ref(10);
const pageCapacity = 10;
const currentPage = ref(1);

//sorting students to view
const newStudents = computed(() => {
  viewAll.value;
  return userStore.currentlyViewingStudents.filter(
    (student: studentGuidance) =>
      (student.name)
        .toLowerCase()
        .indexOf(input.value.toLowerCase()) != -1 ||
      student.email.indexOf(input.value) != -1
  );
});

const pages = computed(() => {
  return Math.ceil(userStore.currentlyViewingStudents.length / pageCapacity);
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

onMounted(async () => {
  userStore.currentlyViewingStudents = userStore.guidanceStudents;
})

watch(
  () => viewAll.value,
  async (newResponse) => {
    if (viewAll.value === true) {
      await fetchStudents();
      userStore.currentlyViewingStudents = allStudents.value;
    }
    if (viewAll.value === false) {
      userStore.currentlyViewingStudents = userStore.guidanceStudents;
    }
    updatePage(1);
  }
);

</script>