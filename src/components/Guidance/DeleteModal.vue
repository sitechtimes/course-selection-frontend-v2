<template>
  <div
    v-if="showDetails"
    class="absolute left-[20%] right-[20%] top-[40%] bg-white flex flex-col m-auto mt-5 p-8 w-fit h-fit rounded-[1rem] border border-black"
  >
    <h2 class="h2 font-bold text-[1.5rem] mb-2 text-left">Are you sure?</h2>
    <p class="my-4">
      Delete {{ details.student }}'s meeting on
      {{ details.date.toLocaleDateString() }}
    </p>
    <p class="mb-6">{{ details.student }} will be notified of this change</p>
    <div class="flex flex-row items-center justify-end">
      <button
        @click="showDetails = !showDetails"
        class="duration-300 font-bold px-4 py-2 rounded-2xl w-fit h-fit opacity-0.5:hover"
      >
        Cancel
      </button>
      <button
        @click="deleteMeeting(details.id)"
        class="duration-300 font-bold bg-[#f28e8e] px-4 py-2 rounded-lg w-fit h-fit opacity-0.5:hover"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { Meeting } from "../../types/interface";
import { ref } from "vue";

const userStore = useUserStore();

const showDetails = ref(true);
defineProps<{ details: Meeting }>();

function deleteMeeting(id: number) {
  userStore.changeMeeting(id, true);
  showDetails.value = !showDetails.value;
}
</script>
