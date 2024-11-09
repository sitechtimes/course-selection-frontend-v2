export const useUserStore = defineStore("userStore", () => {
  const router = useRouter();

  const isAuth = ref(false);
  const name = ref<string>("");
  const userType = ref<"student" | "teacher">("student");
  const initComplete = ref(false);

  async function init() {
    initComplete.value = true;
  }

  async function login(email: string, password: string) {
    isAuth.value = true;
    router.push("/student/dashboard");
  }

  return { isAuth, name, userType, initComplete, init, login };
});
