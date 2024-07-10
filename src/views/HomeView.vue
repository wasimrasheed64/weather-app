<script setup>
import axios from 'axios'
import { ref } from 'vue'

const mapboxAPIKey = import.meta.env.VITE_MAP_BOX_API;
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        )
        mapboxSearchResults.value = result.data.features
      } catch (error) {
        console.error(error)
        mapboxSearchResults.value = []
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}
</script>
<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state..."
        type="text"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <transition name="search-list-outer">
        <ul
          class="absolute bg-weather-secondary text-white w-full shadow-md py-4 px-1 top-[66px]"
          v-if="mapboxSearchResults"
        >
          <p class="py-2" v-if="mapboxSearchResults.length === 0">
            No results match your query, try a different term.
          </p>
          <template v-else>
            <li
              v-for="searchResult in mapboxSearchResults"
              :key="searchResult.id"
              class="py-2 px-2 cursor-pointer"
              @click="previewCity(searchResult)"
            >
              {{ searchResult.place_name }}
            </li>
          </template>
        </ul>
      </transition>
    </div>
  </main>
</template>
<style scoped>
.search-list-outer-enter-active,
.search-list-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.search-list-outer-enter-from,
.search-list-outer-leave-to {
  opacity: 0;
}
</style>
