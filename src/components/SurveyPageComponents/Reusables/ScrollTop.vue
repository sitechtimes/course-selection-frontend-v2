<template>
  <div @click="scroll" class="scrollTop none-topArrow bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-fit flex flex-col p-4">
    <img src="public/arrow.svg" alt="scroll to top button"/>
    <p>back to top</p>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted } from 'vue';

function scroll() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrolledEnough() {
  const scrollTop = document.querySelector(".scrollTop");
  if (window.scrollY > 300) {
    scrollTop.style.display = "flex";
    scrollTop.classList.remove('pop-out')
    scrollTop.classList.add('pop-in')
  } else {
    scrollTop.style.display = "none";
    scrollTop.classList.add('pop-out')
    scrollTop.classList.remove('pop-in')
  }
}
onMounted(() => {
  window.addEventListener("scroll", scrolledEnough);
})
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

.show-topArrow {
  opacity: 1;
}

.none-topArrow {
  opacity: 0;
}

.scrollTop {
  z-index: 3;
  display: none;
  height: 3rem;
  opacity: 1;
  position: fixed;
  bottom: 1.25rem;
  right: 1.8rem;
  scroll-behavior: smooth;
  cursor: pointer;
}
</style>