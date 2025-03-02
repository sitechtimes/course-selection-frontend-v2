<template>
  <div class="w-full h-[80vh] flex justify-center items-center bg-[#fdfdfd]">
    <div
      v-if="userStore.loading"
      class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-center items-center lg:max-w-[60rem] flex-col"
    >
      <p>Loading...</p>
      <img id="loginpic" class="h-60" src="/seagull.gif" alt="Seagull" />
    </div>
    <div
      v-else
      id="book"
      class="w-11/12 max-w-[32rem] max-h-[40rem] h-full border-primary-s border-[10px] rounded-xl flex justify-between items-center lg:max-w-[60rem]"
    >
      <div
        id="left"
        class="hidden w-1/2 h-full border-zinc-400 lg:border-r justify-center items-center lg:flex"
      >
        <img
          id="loginPic"
          class="h-60"
          src="/erlenwein.png"
          alt="SITHS' principal, Mr. Erlenwein"
        />
      </div>
      <div
        id="right"
        class="w-full h-full flex flex-col justify-center items-center space-y-6 lg:w-1/2"
      >
        <div
          id="studentLogin"
          class="w-full h-full flex flex-col justify-center relative items-center"
        >
          <button
            @click="$router.go(-1)"
            class="absolute top-5 right-8 flex justify-center items-center space-x-1 lg:hidden"
          >
            <p class="text-xl">❮</p>
            <p class="text-base text-zinc-600 font-semibold">Back</p>
          </button>
          <h1 class="text-4xl mb-4 font-bold">
            {{
              $route.query.reset || $route.query.token
                ? "Reset Password"
                : "Login"
            }}
          </h1>
          <div class="flex flex-col w-11/12 max-w-[21rem] space-y-5 rounded-md">
            <Input
              label="email"
              :type="route.query.token ? 'password' : 'email'"
              required
              :value="input1"
              @update="(newValue) => (input1 = newValue)"
              @keyup.enter="sendRequest"
            >
              {{ inputOne() }}
            </Input>
            <Input
              v-if="!$route.query.reset"
              label="password"
              type="password"
              required
              :value="input2"
              @update="(newValue) => (input2 = newValue)"
              @keyup.enter="sendRequest"
            >
              {{ $route.query.token ? "Confirm Password" : "Password" }}
            </Input>
          </div>
          <button
            id="button"
            class="bg-zinc-300 px-5 min-w-32 h-12 mt-4 rounded-md text-lg font-semibold hover:bg-zinc-200"
            @click="sendRequest"
          >
            {{ $route.query.reset ? "Send Reset Email" : "Login" }}
          </button>
          <div class="pt-4">
            <button
              @click="
                $router.replace({
                  query:
                    route.query.reset || route.query.token
                      ? undefined
                      : { reset: 'true' },
                })
              "
              class="w-full px-4 py-2 text-sm font-medium text-primary-s hover:text-secondary-s transition"
            >
              {{
                $route.query.reset || $route.query.token
                  ? "Remembered your password? Login here"
                  : "Forgot your password? Reset Password"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "../components/Basic/Input.vue";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const userStore = useUserStore();
const input1 = ref("");
const input2 = ref("");

document.title = "Login | SITHS Course Selection";

function inputOne() {
  if (route.query.reset) return "Email Address";
  if (route.query.token) return "New Password";
  return "Username";
}

function sendRequest() {
  if (route.query.reset) userStore.resetPassword(input1.value);
  else if (route.query.token)
    userStore.resetPasswordConfirm(
      input1.value,
      input2.value,
      route.query.token as string,
      route.query.uid as string
    );
  else userStore.login(input1.value, input2.value);
}
</script>

<style scoped>
#loginPic {
  animation-name: spin;
  animation-duration: 5000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
