<template>
  <GMapMap
    :center="center"
    :zoom="8"
    map-type-id="satellite"
    style="width: 100%; height: 600px"
    :options="mapOptions"
  >
    <GMapMarker :position="center" :title="'Vientiane'" />
  </GMapMap>
</template>

<script setup lang="ts">
import { ref } from "vue";

const center = ref({ lat: 17.9757, lng: 102.4955 }); // Laos center

const mapOptions = {
  tilt: 45,          // 3D perspective
  heading: 0,        // rotation
  mapId: "YOUR_3D_MAP_ID", // optional: custom map ID for 3D style
  mapTypeControl: false,
  fullscreenControl: false,
};
</script>
