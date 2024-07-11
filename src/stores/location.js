import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

export const useLocationStore = defineStore('location', () => {
  const locations = ref([]);

  onMounted(() => {
    const storedLocations = localStorage.getItem('locations');
    if (storedLocations) {
      locations.value = JSON.parse(storedLocations);
    }
  });
  const setLocations = (newLocations) => {
    locations.value = newLocations;
    localStorage.setItem('locations', JSON.stringify(locations.value));
  };

  const addLocation = (newLocation) => {
    const exists = locations.value.some(
      (location) =>
        location.state === newLocation.state && location.city === newLocation.city
    );

    if (!exists) {
      locations.value.push(newLocation);
      localStorage.setItem('locations', JSON.stringify(locations.value));
    } else {
      console.warn('Location with the same state and city already exists.');
    }
  };

  const getLocations = async () => {
    const requests = [];
    locations.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    weatherData.forEach((value, index) => {
      locations.value[index].weather = value.data;
    });
    return locations.value;
  };

  const getLocationByIndex = (index) => {
    return locations.value[index];
  };

  const getLocationByName = (name) => {
    return locations.value.find((location) => location.name === name);
  };
  watch(locations, (newLocations) => {
    localStorage.setItem('locations', JSON.stringify(newLocations));
  }, { deep: true });

  return { locations, setLocations, addLocation, getLocations, getLocationByIndex, getLocationByName };
});
