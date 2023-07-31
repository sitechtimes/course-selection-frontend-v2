<script setup lang="ts">
import { computed, onMounted, ref, Ref } from "vue";
import { useUserStore } from '../../stores/user';
import { useGuidanceStore } from "../../stores/guidance";

const userStore = useUserStore()
const guidanceStore = useGuidanceStore()
let checked = ref(false)
function useless(){
    if(checked.value === false){
        checked.value = true 
    }
    else{
        checked.value = false
    }
    console.log(checked)
}
</script>

<template>
    <div class="h-10 w-44 mx-10 flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]">
        <!-- <button>All Students</button> -->
        <label @click="useless" class="container">{{checked}}
  <input type="checkbox">
  <span class="checkmark"></span>
</label>
    </div>
</template>