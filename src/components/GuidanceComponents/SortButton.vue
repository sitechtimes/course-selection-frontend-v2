<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch } from "vue";
import { useUserStore } from '../../stores/user';
import { useGuidanceStore } from "../../stores/guidance";
import DownArrow from '../icons/DownArrow.vue';
import { userData } from "../../types/interface";

const userStore = useUserStore()
const guidanceStore = useGuidanceStore()
const selected: Ref<string> = ref("Sort By");
const isOpen: Ref<boolean> = ref(false);

watch(() => guidanceStore.currentlyViewing, (newValue) => {
    // do something based on the new value
  selected.value = "Sort By"
})

const menuArray = [
  {
    sortBy: "lastnameaz",
    text: "Last Name (A-Z)"
  },
  {
    sortBy: "lastnameza",
    text: "Last Name (Z-A)"
  },
  {
    sortBy: "ns",
    text: "Not Started"
  },
  {
    sortBy: "ip",
    text: "In Progress"
  },
  {
    sortBy: "com",
    text: "Completed"
  },
  {
    sortBy: "final",
    text: "Finalized"
  },
  {
    sortBy: "nine",
    text: "Grade 9"
  },
  {
    sortBy: "ten",
    text: "Grade 10"
  },
  {
    sortBy: "eleven",
    text: "Grade 11"
  },
  {
    sortBy: "transfer",
    text: "Transfer"
  },
  {
    sortBy: "regents",
    text: "Missing Regents"
  },
  {
    sortBy: "sports",
    text: "Sports Team"
  },
  {
    sortBy: "enl",
    text: "ENL"
  },
]

const sortBy = (sort: {sortBy:string, text:string}) => {
  selected.value = sort.text
  isOpen.value = false
  if(sort.sortBy === 'lastnameaz') {
    function lastnameaz(a: { user: { lastName: string; }; }, b: { user: { lastName: string; }; }) {
    if (a.user.lastName < b.user.lastName) return -1;
    if (a.user.lastName > b.user.lastName) return 1;
    return 0;
  }
    return (guidanceStore.currentlyViewing.sort(lastnameaz))
  }

  if(sort.sortBy === 'lastnameza') {
    function lastnameza(a: { user: { lastName: string; }; }, b: { user: { lastName: string; }; }) {
      if (a.user.lastName > b.user.lastName) return -1;
      if (a.user.lastName < b.user.lastName) return 1;
      return 0;
    }
    return (guidanceStore.currentlyViewing.sort(lastnameza))
  }

  if(sort.sortBy === 'ns') {
    function ns(a: { grade: string, user: userData }) {
        if (guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email) === undefined) return -1;
        else
        return 1;
    }
    return (guidanceStore.currentlyViewing.sort(ns))
  }

  if(sort.sortBy === 'ip') {
    function ip(a: { grade: string, user: userData }) {
      if (guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email) === undefined){
        return 1;
      } else if(guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email)?.node.status === 'INCOMPLETE'){
        return -1;
      } else {
        return 1
      }
    }
    return (guidanceStore.currentlyViewing.sort(ip))
  }

  if(sort.sortBy === 'com') {
    function com(a: { grade: string, user: userData }) {
      if (guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email) === undefined){
        return 1;
      } else if(guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email)?.node.status === 'COMPLETE'){
        return -1;
      } else {
        return 1
      }
    }
    return (guidanceStore.currentlyViewing.sort(com))
  }

  if(sort.sortBy === 'final') {
    function final(a: { grade: string, user: userData }) {
      if (guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email) === undefined){
        return 1;
      } else if(guidanceStore.allAnsweredSurveys.edges.find(x => x.node.email === a.user.email)?.node.status === 'FINALIZED'){
        return -1;
      } else {
        return 1
      }
    }
    return (guidanceStore.currentlyViewing.sort(final))
  }
  
  if(sort.sortBy === 'nine') {
    function nine(a: { grade: string; }) {
      if (a.grade === "SOPHOMORE") return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(nine))
  }

  if(sort.sortBy === 'ten') {
    function ten(a: { grade: string; }) {
      if (a.grade === "JUNIOR") return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(ten))
  }
  
  if(sort.sortBy === 'eleven') {
    function eleven(a: { grade: string; }) {
      if (a.grade === "SENIOR") return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(eleven))
  }
  
  if(sort.sortBy === 'transfer') {
    function transfer(a: { flag: string; }) {
      if (a.flag.includes('Transfer')) return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(transfer))
  }

  if(sort.sortBy === 'regents') {
    function regents(a: { flag: string; }) {
      if (a.flag.includes('Regents')) return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(regents))
  }
  
  if(sort.sortBy === 'sports') {
    function sports(a: { flag: string; }) {
      if (a.flag.includes('Team')) return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(sports))
  }
  
  if(sort.sortBy === 'enl') {
    const enl = (a: { flag: string; }) => {
      if (a.flag.includes('ENL')) return -1;
      else
      return 1;
    }
    return (guidanceStore.currentlyViewing.sort(enl))
  }

}
</script>

<template>
     <div class="w-44">
     <div
      class="h-10 w-full flex flex-row bg-primary-g text-black justify-evenly cursor-pointer shadow-[4px_3px_3px_rgba(0,0,0,0.25)]"
      id="sort"
      @click="isOpen = !isOpen"
    >
      <div>
        <a class="mt-2.5 ml-4 flex">
          <p class="font-semibold" id="sortshow">{{ selected }}</p>
        </a>
      </div>
      <DownArrow class="mt-2.5"/>
      </div>
      <div class="sub-menu absolute shadow-[4px_3px_3px_rgba(0,0,0,0.25)] " v-if="isOpen" >
        <div v-for="x in menuArray" :key="x.sortBy" class="flex justify-left h-10 w-44 p-1 border border-t-transparent border-primary-g bg-tertiary-g">
          <button @click="sortBy(x)" class="ml-2">{{ x.text }}</button>
        </div>
      </div>
    </div>
</template>