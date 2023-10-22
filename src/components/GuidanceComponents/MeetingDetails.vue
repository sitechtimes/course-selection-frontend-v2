<template>
  <div v-if="show"
    class="absolute left-[20%] right-[20%] top-[30%] bg-white flex flex-row m-auto mt-5 w-fit h-fit rounded-[1rem] border border-black">
    <div class="event flex flex-col">
      <div class="top flex-row flex items-center justify-between">
        <h2 class="h2 font-bold text-[2rem] m-8 mb-4">Meeting Details</h2>
        <button class="mt-5 mr-12" @click="toggleShow">
          <svg class="x fill-current text-37394f transition duration-300 mt-4 hover:opacity-80 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
      </div>
      <!-- details -->
      <h3 class="formt text-2xl flex flex-row text-[#717494] ml-8 font-bold" for="date">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
        </svg>
        Date
      </h3>
      <!-- buttons -->
      <div class="item submit ml-6 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer w-fit">
        <button type="submit" @click="toggleDeleteModal" class="font-bold bg-[#f28e8e] px-4 py-2 rounded-2xl w-fit h-fit"
          id="save" ref="save">
          Delete
        </button>
      </div>
    </div>
  </div>
  <DeleteModal v-show="showDeleteModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import DeleteModal from "./DeleteModal.vue"

const show = ref(true);
const showDeleteModal = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};

const toggleDeleteModal = () => {
  showDeleteModal.value = !showDeleteModal.value;
  show.value = !show.value;
};
</script>

<style scoped>
button {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  transition: 0.3s;
}

button:hover {
  opacity: 0.5;
}

svg {
  width: 1.2rem;
  margin-right: 10px;
  fill: #717494;
}
</style>