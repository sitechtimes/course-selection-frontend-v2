<script setup lang="ts">
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const viewedUser = userStore.data.guidance.students.filter(student => student.osis === window.location.pathname.substring(17))[0]
console.log(userStore.data.allSurveys)
console.log(userStore.data)
console.log(viewedUser.homeroom[1])

if (viewedUser.homeroom[1] === 5) {
  const usedSurvey = userStore.data.allSurveys[1]
} else if (viewedUser.homeroom[1] === 4) {
  const usedSurvey = userStore.data.allSurveys[2]
} else if (viewedUser.homeroom[1] === 6) {
  const usedSurvey = userStore.data.allSurveys[0]
}

</script>

<template>
  <section>
    <h1>Yello!</h1>
  </section>
</template>
