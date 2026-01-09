<template>
  <Suspense>
    <div class="px-10">
      <h1 class="p-6 text-3xl text-center font-semibold">
        Editing the {{ survey.grade }}th Grade Survey
      </h1>

      <form class="m-10 p-10 rounded-2xl shadow-lg bg-primary-g border border-gray-300" @submit.prevent="submitSurvey">
        <section class="mb-12">
          <h2 class="text-2xl font-semibold mb-6 text-center">
            Survey Settings
          </h2>

          <div class="flex flex-col items-center gap-6">
            <div>
              <label class="text-lg font-medium block mb-2">Due Date</label>
              <input type="date" v-model="dueDateDate"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>

            <div>
              <label class="text-lg font-medium block mb-2">Due Time</label>
              <input type="time" v-model="dueDateTime"
                class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-8 text-center">
            Survey Questions
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4 text-center text-gray-700">
                Available Questions
              </h3>

              <draggable v-model="availableQuestions" group="questions" item-key="id"
                class="min-h-[300px] rounded-xl p-4 bg-gray-50 border border-gray-300">
                <template #item="{ element }">
                  <div class="p-4 mb-3 rounded-md bg-white text-gray-800
                 shadow-sm cursor-move
                 hover:bg-gray-100 hover:shadow
                 transition-all duration-150">
                    <p class="text-sm leading-relaxed">
                      {{ element.question }}
                    </p>
                  </div>
                </template>
              </draggable>

              <p v-if="availableQuestions.length === 0" class="text-sm text-gray-400 text-center italic mt-4">
                No available questions
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4 text-center text-gray-700">
                Questions in Survey
              </h3>

              <draggable v-model="surveyQuestions" group="questions" item-key="id"
                class="min-h-[300px] rounded-xl p-4 bg-gray-50 border border-gray-300">
                <template #item="{ element }">
                  <div class="p-4 mb-3 rounded-md bg-white text-gray-800
                 shadow-sm cursor-move
                 hover:bg-gray-100 hover:shadow
                 transition-all duration-150">
                    <p class="text-sm leading-relaxed font-medium">
                      {{ element.question }}
                    </p>
                  </div>
                </template>
              </draggable>

              <p v-if="surveyQuestions.length === 0" class="text-sm text-gray-400 text-center italic mt-4">
                Drag questions here
              </p>
            </div>
          </div>

        </section>

        <button type="submit" class="mt-12 p-5 w-full rounded-xl shadow-md border border-gray-300
                 bg-white hover:bg-gray-100 transition font-semibold">
          Save Survey
        </button>
      </form>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import draggable from "vuedraggable";
import { Question, Survey } from "../types/interface";
import { useUserStore } from "../stores/user";

document.title = "Edit Survey | SITHS Course Selection";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const surveyGrade = route.params.grade;

const dueDateDate = ref("");
const dueDateTime = ref("");

const survey = ref<Survey>({} as Survey);
const alteredSurvey = ref<Survey>({} as Survey);

const availableQuestions = ref<Question[]>([]);
const surveyQuestions = ref<Question[]>([]);

async function findSurvey(): Promise<Survey | undefined> {
  const surveys: Survey[] = await userStore.getSurveys();
  return surveys.find(
    (survey: Survey) => survey.grade === Number(surveyGrade)
  );
}

onMounted(async () => {
  survey.value = (await findSurvey()) as Survey;
  alteredSurvey.value = (await findSurvey()) as Survey;

  const allQuestions: Question[] = await userStore.getQuestions();

  surveyQuestions.value = [...alteredSurvey.value.questions];

  availableQuestions.value = allQuestions.filter(
    (q: Question) =>
      !surveyQuestions.value.some(
        (sq: Question) => sq.id === q.id
      )
  );

  const originalDate = alteredSurvey.value.dueDate;
  dueDateDate.value = originalDate.split("T")[0];
  dueDateTime.value = originalDate.split("T")[1].substring(0, 5);
});

function submitSurvey(): void {
  alteredSurvey.value.dueDate = `${dueDateDate.value}T${dueDateTime.value}`;
  alteredSurvey.value.questions = surveyQuestions.value;

  userStore.fetchData(
    "guidance/editsurvey/",
    "PUT",
    alteredSurvey.value
  );

  router.push("/guidance/surveylist");
}
</script>
