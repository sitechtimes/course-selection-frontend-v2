<template>
  <Suspense>
    <template #fallback>
      <div
        class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl font-bold"
      >
        Loading...
      </div>
    </template>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10"
    >
      <RouterLink
        v-for="survey in surveys"
        :key="survey.grade"
        :to="'/guidance/editsurvey/' + survey.grade"
        class="bg-primary-g border-black border-2 drop-shadow-lg rounded-lg p-6 hover:drop-shadow-xl hover:bg-other-g transition-all duration-300"
      >
        <h1 class="text-2xl font-bold">{{ survey.grade }}th Grade</h1>
      </RouterLink>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { Survey } from "../types/interface";
import { useUserStore } from "../stores/user";

document.title = "Course List | SITHS Course Selection";

const userStore = useUserStore();

const surveys = ref<Survey[]>([]);

onMounted(async () => {
  try {
    surveys.value = await userStore.getSurveys();
  } catch (error) {
    console.error(error);
  }
});
</script>
