<template>
  <div class="arrows flex flex-col h-50 bottom-2 right-5 fixed">
    <div @click="scrollTop" v-if="ShowScrollTop" :class="{ 'pop-in': ShowScrollTop, 'pop-out': !ShowScrollTop }"
      class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-50 p-4 mb-2.5 text-center flex flex-col align-center">
      <p>go to top</p>
    </div>
    <div @click="scrollBottom" v-if="ShowScrollBottom"
      :class="{ 'pop-in': ShowScrollBottom, 'pop-out': !ShowScrollBottom }"
      class="bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-fit p-4 mb-2.5 flex flex-col align-center">
      <p>go to bottom</p>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const ShowScrollTop = ref(false);
const ShowScrollBottom = ref(true);

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function scrolledEnough() {
  const windowHeight = window.innerHeight;
  const oneThirdHeight = windowHeight;
  const twoThirdsHeight = windowHeight * 2;

  if (window.scrollY <= oneThirdHeight) {
    ShowScrollTop.value = false;
    ShowScrollBottom.value = true;
  } else if (window.scrollY >= twoThirdsHeight) {
    ShowScrollTop.value = true;
    ShowScrollBottom.value = false;
  } else {
    ShowScrollTop.value = true;
    ShowScrollBottom.value = true;
  }
}

onMounted(() => {
  window.addEventListener("scroll", scrolledEnough);
});
</script>
  
<style scoped>
.pop-in {
  animation: pop-in 1s;
}

.pop-out {
  animation: pop-out 1s;
}

@keyframes pop-in {
  from {
    opacity: 0;
    transform: translatey(150px);
  }

  to {
    opacity: 1;
    transform: translatey(0);
  }
}

@keyframes pop-out {
  from {
    opacity: 1;
    transform: translatey(0);
  }

  to {
    opacity: 0;
    transform: translatey(150px);
  }
}
</style>