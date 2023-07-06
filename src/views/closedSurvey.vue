<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useSurveyStore } from '../stores/survey';
import closedBoolean from '../components/SurveyPageComponents/Reusables/ClosedSurvey/closedBoolean.vue'
import closedGeneral from '../components/SurveyPageComponents/Reusables/ClosedSurvey/closedGeneral.vue'
import closedCheckbox from '../components/SurveyPageComponents/Reusables/ClosedSurvey/closedCheckbox.vue'
import closedDrag from '../components/SurveyPageComponents/Reusables/ClosedSurvey/closedDraggable.vue';
import { surveyQuestion, surveyAnswer } from '../types/interface';
import { useRouter } from 'vue-router'
import { ref, Ref, watch } from 'vue';

const userStore = useUserStore();
const surveyStore = useSurveyStore();
console.log(surveyStore.currentSurvey.answers)    
console.log(userStore.data.survey.questions)

</script>

<template>
    <div class=" h-[75vh] w-full flex justify-center overflow-x-hidden">
        <h1 id="name" class=" text-5xl font-bold overflow-y-visible">
            The survey is currently closed. You will not be able to change your choices.
        </h1>
        <div v-for="question in userStore.data.survey.questions">
            <closedBoolean></closedBoolean>
            <closedGeneral></closedGeneral>
            <closedCheckbox></closedCheckbox>
            <closedDrag></closedDrag>
        </div>
    </div>
    
</template>
