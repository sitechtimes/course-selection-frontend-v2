<template>
  <div>hello</div>
</template>

<script lang="ts" setup>
// var isDirty = function() { return false; }
import { onUnmounted, onBeforeMount } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
const formSubmitting = false

onBeforeRouteLeave(() => {
//     if (confirmStayInDirtyForm()){
//     // next(false)
//     console.log('stay')
//   } else {
//     // Navigate to next view
//     // next() 
//     console.log('go')
//   }
confirmLeave()
})


 function  confirmStayInDirtyForm() {
    return !confirmLeave()
  }

  function beforeWindowUnload() {
    if (confirmStayInDirtyForm()) {
      // Cancel the event
    //   e.preventDefault()
      // Chrome requires returnValue to be set
    //   e.returnValue = ''
    }  
}

// console.log(window)
// window.onbeforeunload = confirmLeave();
// window.onbeforeunload = function () {
//     return window.confirm('yoohoo')
// }
function confirmLeave() {
     window.confirm('Do you really want to leave? you have unsaved changes!')
  }
    window.addEventListener("beforeunload", confirmLeave());
    // window.addEventListener("beforeunload", beforeWindowUnload());
    // window.addEventListener("beforeunload", function (e) {
    //     // if (formSubmitting || !isDirty()) {
    //     // if (formSubmitting) {
    //     //     return undefined;
    //     // }
        
    //     // var confirmationMessage = 'It looks like you have been editing something. '
    //     //                         + 'If you leave before saving, your changes will be lost.';

    //     // (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    //     // return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    //     if (confirmStayInDirtyForm()) {
    //   // Cancel the event
    //   e.preventDefault()
    //   // Chrome requires returnValue to be set
    //   e.returnValue = ''
    // } 
    // });

    

</script>

<style>

</style>