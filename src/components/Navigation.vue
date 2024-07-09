<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex  flex-col sm:flex-row items-center gap-4  text-white py-6">
      <RouterLink :to="{name:'home'}">
      <div class="flex items-center gap-3 ">
        <i class="fas fa-cloud-sun fa-2x"></i>
        <h1 class="text-2xl font-bold">Weather App</h1>
      </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i class="fa-solid fa-circle-info fa-2x hover:text-weather-secondary duration-150  cursor-pointer"></i>
        <i class="fa-solid fa-plus fa-2x hover:text-weather-secondary duration-150  cursor-pointer"></i>
      </div>
    </nav>
  </header>
</template>
