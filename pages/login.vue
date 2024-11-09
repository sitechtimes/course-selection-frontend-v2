<template>
  <div class="w-full h-[80vh] flex justify-center items-center">
    <div v-if="loading" class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-center items-center lg:max-w-[60rem] flex-col">
      <p>Loading...</p>
      <img class="login-pic h-60" src="/seagull.gif" alt="fillerpic" />
    </div>
    <div v-if="!loading" id="book" class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]">
      <div id="left" class="hidden w-1/2 h-full border-zinc-400 lg:border-r justify-center items-center lg:flex">
        <img class="login-pic h-60" src="/seagull.gif" alt="filler img" />
      </div>
      <div id="right" class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2">
        <div id="studentLogin" class="w-full h-full flex flex-col justify-center relative items-center">
          <button @click="router.go(-1)" class="absolute top-5 right-8 flex justify-center items-center space-x-1 lg:hidden">
            <img class="w-5 h-5" src="/icons/backArrow.svg" aria-hidden="true" />
            <p class="text-base text-zinc-600 font-semibold">Back</p>
          </button>
          <h1 class="text-4xl mb-4 font-bold">Login</h1>
          <div class="flex flex-col w-11/12 max-w-[21rem] space-y-5 rounded-md">
            <div class="relative z-0 w-full group overflow-visible">
              <input
                v-model="email"
                class="block py-2.5 px-2 mt-2.5 w-full text-sm text-zinc-900 bg-transparent rounded-md border border-solid border-zinc-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                placeholder=" "
                id="email"
                type="email"
                required
                autocomplete="email"
              />
              <label
                for="email"
                class="peer-focus:font-medium absolute text-md px-1 mt-2.5 text-zinc-400 duration-200 transform -translate-y-8 translate-x-1 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:translate-x-1 peer-focus:z-20 peer-focus:px-1 overflow-visible"
              >
                Email
              </label>
            </div>
            <div class="relative z-0 w-full group overflow-visible">
              <input
                v-model="password"
                class="block py-2.5 px-2 mt-2.5 w-full text-sm text-zinc-900 bg-transparent rounded-md border border-solid border-zinc-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                placeholder=" "
                id="password"
                type="password"
                required
                autocomplete="current-password"
              />
              <label
                for="password"
                class="peer-focus:font-medium absolute text-md px-1 mt-2.5 text-zinc-400 duration-200 transform -translate-y-8 translate-x-1 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 peer-focus:translate-x-1 peer-focus:z-20 peer-focus:px-1 overflow-visible"
              >
                Password
              </label>
            </div>
          </div>

          <button id="button" class="bg-zinc-300 w-32 h-12 mt-4 rounded-md text-lg font-semibold hover:bg-zinc-200" @click="userStore.login(email, password)">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Login | SITHS Course Selection"
});

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);

const email = ref("");
const password = ref("");

onMounted(() => {});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.login-pic {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
</style>
