<template>
  <div class="flex flex-col items-center justify-center"></div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const studentId = ref<number>();
const year = ref<number>();

onBeforeMount(() => {
  studentId.value = Number(route.query.id);
  year.value = Number(route.query.year);
});

onMounted(() => {});
</script>

<style scoped></style>
