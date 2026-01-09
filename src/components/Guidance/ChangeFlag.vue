<template>
  <div class="fixed top-0 left-0 z-100 w-full h-full bg-black/40 flex justify-center items-center">
    <div class="h-1/3 w-1/4 bg-white rounded-sm px-10 py-2 flex justify-evenly flex-col">
      <div class="flex">
        <p><b>Student:</b> {{ userStore.titleCase(student.name) }}</p>
      </div>
      <div class="w-full flex flex-col items-center">
        <p class="my-2">{{ props.add ? "Add" : "Delete" }} flag:</p>
        <select v-model="selected" class="w-full">
          <option v-for="flag in flags" :value="flag.flag">
            {{ flag.title }}
          </option>
        </select>
      </div>
      <div class="flex flex-row w-full justify-between">
        <button @click="$emit('exit')">Cancel</button>
        <button @click="confirm()" class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] px-4 py-2 text-[#37394F]">
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { GuidanceStudent, Flag } from "../../types/interface";
import { useUserStore } from "../../stores/user";

const emit = defineEmits(["exit"]);
const userStore = useUserStore();

const props = defineProps<{
  student: GuidanceStudent;
  flags: Flag[];
  viewAll: boolean;
  add: boolean;
}>();

const selected = ref("");

const flags = computed(() =>
  props.flags.filter(
    (flag) => props.add !== props.student[flag.flag as keyof GuidanceStudent]
  )
);

const confirm = async () => {
  await userStore.changeFlag(props.student, selected.value, props.add);
  emit("exit");
};
</script>
