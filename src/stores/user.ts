import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        name: '',
        data: null,
        isLoggedIn: false,
    }),
    actions: {

    },
})