<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useSurveyStore } from '../stores/survey';
import booleanComponent from '../components/SurveyPageComponents/Reusables/surveyBoolean.vue'
import generalComponent from '../components/SurveyPageComponents/Reusables/surveyGeneral.vue'
import checkboxComponent from '../components/SurveyPageComponents/Reusables/surveyCheckbox.vue'
import surveyDraggable from '../components/SurveyPageComponents/Reusables/surveyDraggable.vue';
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { useRouter } from 'vue-router'
import { ref, Ref, watch } from 'vue';

const userStore = useUserStore();
const surveyStore = useSurveyStore();
console.log(surveyStore)
console.log(userStore.data)

</script>

<template>
    <div class="h-[75vh] w-full flex flex-row justify-center items-center">
        <h1 id="name" class="text-5xl font-bold">
            The survey is currently closed. You will not be able to change your choices.
        </h1>
    </div>
</template>
