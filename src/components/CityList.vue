<script setup>
import { useLocationStore } from '@/stores/location.js'
import router from '@/router/index.js'
import CityCard from '@/components/CityCard.vue'
const locationStore = useLocationStore();

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: { state: city.state, city: city.city },
    query: {
      lat: city.lat,
      lng: city.lng,
    },
  });
};

const savedCities = await locationStore.getLocations();

</script>

<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in
    the field above.
  </p>
</template>

<style scoped>

</style>