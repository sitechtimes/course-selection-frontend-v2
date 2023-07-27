<template>
  <div class="arrows flex flex-col w-f50 h-50 bottom-2 right-5 fixed">
    <div @click="scrollTop"
      class="scrollTop none-topArrow bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-50 p-4 mb-2.5 text-center flex flex-col align-center">
      <p>back to top</p>
    </div>
    <div @click="scrollBottom"
      class="scrollBottom none-bottomArrow bg-[#DEE9C8] shadow-[2px_3px_2px_rgba(0,0,0,0.25)] w-fit p-4 mb-2.5 flex flex-col align-center">
      <p>back to bottom</p>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import { onMounted } from 'vue';

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function scrolledEnough() {
  const scrollTop = document.querySelector(".scrollTop");
  const scrollBottom = document.querySelector(".scrollBottom");

  /*   //scroll top
    if (window.scrollY > 2000) { //more than 2000 scrolled, scroll to top
      scrollTop.style.display = "flex";
      scrollTop.classList.remove('pop-out')
      scrollTop.classList.add('pop-in')
    } else {
      scrollTop.style.display = "none";
      scrollTop.classList.add('pop-out')
      scrollTop.classList.remove('pop-in')
    }
  
    //scroll bottom 
    if (window.scrollY < 2000) { //less than 2000 scrolled, scroll to bottom 
      scrollBottom.style.display = "flex";
      scrollBottom.classList.remove('pop-out')
      scrollBottom.classList.add('pop-in')
    } else {
      scrollBottom.style.display = "none";
      scrollBottom.classList.add('pop-out')
      scrollBottom.classList.remove('pop-in')
    } */

  //both buttons
  if (window.scrollY > 0) { //more or equal to 2001 scrolled, but less than or equal to 1999, display both scroll buttons 
    scrollTop.style.display = "flex";
    scrollTop.classList.remove('pop-out')
    scrollTop.classList.add('pop-in')
    scrollBottom.style.display = "flex";
    scrollBottom.classList.remove('pop-out')
    scrollBottom.classList.add('pop-in')
  } else {
    scrollTop.style.display = "none";
    scrollTop.classList.add('pop-out')
    scrollTop.classList.remove('pop-in')
    scrollBottom.style.display = "none";
    scrollBottom.classList.add('pop-out')
    scrollBottom.classList.remove('pop-in')
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

.scrollTop,
.scrollBottom {
  z-index: 3;
  display: none;
  height: 3rem;
  opacity: 1;
  scroll-behavior: smooth;
  cursor: pointer;
}
</style>