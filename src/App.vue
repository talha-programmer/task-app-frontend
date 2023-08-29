<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { useStore } from './stores/appStore';


const store = useStore();
const router = useRouter();

function logout() {
  store.logout();
  router.push('/login');
}

</script>

<template>
  <header>
    <div class="flex justify-end">

    <button @click="logout" class="px-3 py-1 -mr-1 bg-gray-600 focus:outline-none rounded-md hover:bg-gray-500 text-white">
      Logout
    </button>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
