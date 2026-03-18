<template>
  <div class="arrows flex flex-col h-50 bottom-2 right-5 fixed">
    <button @click="scrollTop" v-if="ShowScrollTop" :class="`${ShowScrollTop ? 'pop-in' : 'pop-out'} ${guidance ? 'bg-[#DEE9C8]' : 'bg-[#D6EEFF]'
      } shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-fit p-4 pt-2 pb-6 mb-2.5 text-center flex flex-col align-center`">
      <p class="h-4 text-[1.5em]">⏶</p>
    </button>
    <button @click="scrollBottom" v-if="ShowScrollBottom" :class="`${ShowScrollBottom ? 'pop-in' : 'pop-out'} ${guidance ? 'bg-[#DEE9C8]' : 'bg-[#D6EEFF]'
      } shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-fit p-4 pt-2 pb-6 mb-2.5 flex flex-col align-center`">
      <p class="h-4 text-[1.5em]">⏷</p>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

defineProps<{ guidance: boolean }>();

const ShowScrollTop = ref(false);
const ShowScrollBottom = ref(true);

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollBottom = () => window.scrollTo(0, document.body.scrollHeight);

function scrolledEnough() {
  const windowHeight = window.innerHeight;
  const oneThirdHeight = windowHeight / 5;

  if (window.scrollY <= oneThirdHeight) {
    ShowScrollTop.value = false;
    ShowScrollBottom.value = true;
  } else if (
    windowHeight + Math.round(window.scrollY) >=
    document.body.offsetHeight - 20
  ) {
    ShowScrollTop.value = true;
    ShowScrollBottom.value = false;
  } else {
    ShowScrollTop.value = true;
    ShowScrollBottom.value = true;
  }
}
onMounted(() => window.addEventListener("scroll", scrolledEnough));
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
