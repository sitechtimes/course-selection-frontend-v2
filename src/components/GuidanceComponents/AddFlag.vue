<script setup lang="ts">
import { studentGuidance } from "../../types/interface";
import { useUserStore } from "../../stores/user";
import { PropType, ref, Ref } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["exit"]);
const userStore = useUserStore();

interface flag {
  flag: string;
  title: string;
  color: string;
}

const props = defineProps({
  student: {
    type: Object as PropType<studentGuidance>,
    required: true,
  },
  flags: {
    type: Array as PropType<Array<flag>>,
    required: true,
  },
});

const selected: Ref<string> = ref("");
const missing: Ref<boolean> = ref(false);
const alertuser: Ref<string> = ref("");

const confirm = async (flag: string) => {
  if (flag === "") {
    missing.value = true;
  } else if (props.student.flag.includes(`${flag}`)) {
      alertuser.value = "Flag is already added";
    } else {
      await userStore.addFlag(props.student.user.email, flag);
      emit("exit");
    }
  
};
</script>

<template>
  <div
    class="fixed top-0 left-0 z-100 w-full h-full bg-black/40 flex justify-center items-center"
  >
    <div
      class="h-1/3 w-1/4 bg-white rounded-sm px-10 py-2 flex justify-evenly flex-col"
    >
      <div class="flex flex-col">
        <p>
          <b>Student:</b> {{ student.user.firstName }}
          {{ student.user.lastName }}
        </p>
      </div>
      <div class="w-full flex flex-col items-center">
        <p
          class="my-2"
          :class="{ 'text-red-500': missing, 'animate-pulse': missing }"
        >
          Add a flag:
        </p>
        <!-- <p v-show="missing">hi</p> -->
        <select v-model="selected" class="w-full">
          <option v-for="flag in flags" :value="flag.flag">
            {{ flag.title }}
          </option>
        </select>
      </div>
      <div class="item-center">
        <h1 class="text-center text-red-600">{{ alertuser }}</h1>
      </div>
      <div class="flex flex-row w-full justify-between">
        <button @click="$emit('exit')">Cancel</button>
        <button
          @click="confirm(selected)"
          class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] px-4 py-2 text-[#37394F]"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
