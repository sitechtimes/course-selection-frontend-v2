<template>
  <div class="fixed top-0 left-0 z-100 w-full h-full bg-black/40 flex justify-center items-center">
    <div class="h-1/3 w-1/4 bg-white rounded-sm px-10 py-2 flex justify-evenly flex-col">
      <div class="flex">
        <p><b>Student:</b> {{ userStore.titleCase(student.name) }}</p>
      </div>

      <div class="w-full flex flex-col items-center">
        <p class="my-2">{{ props.add ? "Add" : "Delete" }} flag:</p>

        <div class="w-full border rounded px-2 py-1">
          <div v-for="flag in flags" :key="flag.flag" class="flex items-center justify-between cursor-pointer px-2 py-1 rounded
                   hover:bg-gray-100 transition" :class="selected === flag.flag ? 'bg-[#DEE9C8]' : ''"
            @click="selected = flag.flag">
            <div class="flex items-center gap-2">
              <div class="h-3 w-3 rounded-full" :class="flag.color" />
              <span>{{ flag.title }}</span>
            </div>

            <span v-if="selected === flag.flag" class="text-[#37394F] font-semibold">
              ✓
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-row w-full justify-between">
        <button @click="$emit('exit')">Cancel</button>

        <button @click="confirm()" :disabled="!selected" class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)]
                 px-4 py-2 text-[#37394F]
                 disabled:opacity-50 disabled:cursor-not-allowed">
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
  if (!selected.value) return;
  await userStore.changeFlag(props.student, selected.value, !props.add);
  emit("exit");
};
</script>