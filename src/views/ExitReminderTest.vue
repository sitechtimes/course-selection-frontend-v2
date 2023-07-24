<template>
  <div id="app" v-cloak>
  <form>
    <p>
    <label for="name">stuff</label>
    <input type="text" id="name" v-model="stuff1">
    </p>
    <p>
      <input type="submit" @click="removeHandler()">
    </p>
    <p>{{ stuff1 }}</p>
  </form>
</div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
let stuff1 = ref('')
let handler = null

function test() {
  console.log(stuff1)
}

watch(() => stuff1.value, (newResponse, oldResponse) => {
  console.log('ok')
  handler =  function (e) {
    // Cancel the event
    e.preventDefault(); 
    // Chrome requires returnValue to be set
    e.returnValue = '';
  };
  window.addEventListener('beforeunload', handler);
  console.log('add watcher'); 
})

function removeHandler() {
      if(handler) window.removeEventListener('beforeunload',handler);
      return true;
  }
</script>

<style>

</style>