<template>
  <div v-if="show" class="meetingDetails flex flex-row m-auto mt-5 w-fit h-fit rounded-[1rem] border border-black">
    <div class="event flex flex-col">
      <div class="top flex-row flex items-center justify-between">
        <h2 class="h2 font-bold text-[2rem] m-8 mb-4">Meeting Details</h2>
        <button class="mt-5 mr-12" @click="toggleShow">
          <svg class="x fill-current text-37394f transition duration-300 mt-4 hover:opacity-80 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s-32.8 12.5-45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s-12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
      </div>


     


      <div class="item submit ml-6 mb-6 xl:text-2xl transition duration-300 hover:opacity-50 cursor-pointer w-fit">
          <button type="submit" @click="toggleDeleteModal" class="font-bold bg-[#f28e8e] px-4 py-2 rounded-2xl w-fit h-fit" id="save" ref="save">
            Delete
          </button>
        </div>
         <h3 class="formt text-2xl flex flex-row text-[#717494] ml-8 font-bold" for="date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
              </svg>
              Date</h3>
            
    </div>



    <div v-show="showDeleteModal">

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(true);

function toggleShow() {
  show.value = !show.value;
}
</script>

<style scoped>
.meetingDetails {
  height: 35rem;
  border-radius: 1rem;
  position: absolute;
  left: 20%;
  right: 20%;
  top: 30%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border: 1px black solid;
}

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

input:invalid {
  border-color: red;
}
</style>