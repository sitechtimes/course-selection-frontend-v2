<script setup lang="ts">
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../stores/user';

let userOpen = ref(false)

const toggleUser = () => {
    if (!userOpen.value) {
        userOpen.value = true
    } else {
        userOpen.value = false
    }
}

onMounted(() => {
    document.querySelector('#name')?.addEventListener('click', () => {
        const tl2 = gsap.timeline({
            defaults: {
                duration: 0.5,
                ease: 'power1.out'
            }
        })

        tl2.from('#overlay', {
            y: -20,
            opacity: 0,
        }, '-=0.1')

        tl2.from('#name-link', {
            y: -10, 
            opacity: 0,
            // stagger: 0.1,
        }, '-=0.2')
    })
})
</script>

<template>
    <div class="relative flex justify-center items-center w-auto">
        <p @click="toggleUser" id="name" class="text-base cursor-pointer z-10">Jessie Yang</p>
        <div v-if="userOpen" id="overlay" class="absolute min-w-[5rem] w-[120%] bg-zinc-100 flex flex-col justify-center items-center mt-[6rem] px-2 pt-10 pb-2 space-y-2 rounded-md">
            <RouterLink id="name-link" to="/profile"><p class="text-base">Profile</p></RouterLink>
            <RouterLink id="name-link" to="/settings"><p class="text-base">Settings</p></RouterLink>
            <p @click="useUserStore().isLoggedIn = false" id="name-link" class="text-base text-red-500 cursor-pointer">Logout</p>
        </div>
    </div>
</template>
