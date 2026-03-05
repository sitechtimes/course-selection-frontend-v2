<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
    @click.self="$emit('close')"
  >
    <div class="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-xs">
      <h3 class="text-lg font-semibold mb-4 text-center">Select a Date</h3>
      <p class="text-sm text-gray-600 mb-4 text-center">
        The calendar will jump to the week containing the selected date.
      </p>

      <div class="mb-4">
        <label
          for="week-select-date"
          class="block text-sm font-medium text-gray-700 mb-1"
          >Date:</label
        >
        <input
          type="date"
          id="week-select-date"
          v-model="selectedDate"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="flex justify-end gap-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
        >
          Cancel
        </button>
        <button
          @click="goToWeek"
          :disabled="!selectedDate"
          class="px-4 py-2 bg-primary-g text-gray-800 rounded-md hover:bg-primary-dark transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Go to Week
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  currentFirstDay: Date;
}>();

const emit = defineEmits(["week-selected", "close"]);

const selectedDate = ref("");

onMounted(() => {
  const year = props.currentFirstDay.getFullYear();
  const month = (props.currentFirstDay.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const day = props.currentFirstDay.getDate().toString().padStart(2, "0");
  selectedDate.value = `${year}-${month}-${day}`;
});

const goToWeek = () => {
  if (!selectedDate.value) return;

  const parts = selectedDate.value.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const chosenLocalDate = new Date(year, month, day);
  chosenLocalDate.setHours(0, 0, 0, 0);
  const dayOfWeek = (chosenLocalDate.getDay() + 6) % 7;
  const startOfWeekLocal = new Date(chosenLocalDate);
  startOfWeekLocal.setDate(chosenLocalDate.getDate() - dayOfWeek);
  startOfWeekLocal.setHours(0, 0, 0, 0);
  const startOfWeekUtc = new Date(
    Date.UTC(
      startOfWeekLocal.getFullYear(),
      startOfWeekLocal.getMonth(),
      startOfWeekLocal.getDate()
    )
  );

  emit("week-selected", startOfWeekUtc);
};
</script>
