<template>
  <div class="map-wrap">
    <img
      src="/assets/images/laos.png"
      alt="Map"
      :class="[
        'transition-transform duration-500',
        zoomed ? 'scale-150' : 'scale-100',
      ]"
    />

    <!-- Marker 1 -->
    <div
      class="marker"
      style="left: 40%; top: 35%"
      tabindex="0"
      @click="click()"
    >
      <div class="pin"><span class="num">1</span></div>
      <div class="tooltip">Marker 1</div>
    </div>

    <!-- Marker 2 -->
    <div class="marker" style="left: 30%; top: 20%" tabindex="0">
      <div class="pin"><span class="num">2</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>
    <!-- Marker 3 -->
    <div class="marker" style="left: 20%; top: 25%" tabindex="0">
      <div class="pin"><span class="num">3</span></div>
      <div class="tooltip">
        Marker 3 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 4 -->
    <div class="marker" style="left: 10%; top: 30%" tabindex="0">
      <div class="pin"><span class="num">4</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 5 -->
    <div class="marker" style="left: 25%; top: 35%" tabindex="0">
      <div class="pin"><span class="num">5</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 6 -->
    <div class="marker" style="left: 35%; top: 28%" tabindex="0">
      <div class="pin"><span class="num">6</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 7 -->
    <div class="marker" style="left: 50%; top: 30%" tabindex="0">
      <div class="pin"><span class="num">7</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 8 -->
    <div class="marker" style="left: 25%; top: 45%" tabindex="0">
      <div class="pin"><span class="num">8</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 9 -->
    <div class="marker" style="left: 40%; top: 45%" tabindex="0">
      <div class="pin"><span class="num">9</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 10 -->
    <div class="marker" style="left: 60%; top: 45%" tabindex="0">
      <div class="pin"><span class="num">10</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 11 -->
    <div class="marker" style="left: 63%; top: 53%" tabindex="0">
      <div class="pin"><span class="num">11</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 12 -->
    <div class="marker" style="left: 79%; top: 58%" tabindex="0">
      <div class="pin"><span class="num">12</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 13 -->
    <div class="marker" style="left: 73%; top: 68%" tabindex="0">
      <div class="pin"><span class="num">13</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>
    <!-- Marker 14 -->
    <div class="marker" style="left: 88%; top: 67%" tabindex="0">
      <div class="pin"><span class="num">14</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 15 -->
    <div class="marker" style="left: 88%; top: 75%" tabindex="0">
      <div class="pin"><span class="num">15</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>

    <!-- Marker 16 -->
    <div class="marker" style="left: 75%; top: 80%" tabindex="0">
      <div class="pin"><span class="num">16</span></div>
      <div class="tooltip">
        Marker 2 virtual:nuxt:D%3A%2FLDBBORDER%2FLDB-BORDER%2F.nuxt%2Froutes.mjs
      </div>
    </div>
  </div>
</template>

<script setup>
const click = () => {
  console.log("============huaphan");
};
import { ref } from "vue";

const zoomed = ref(false);

const toggleZoom = () => {
  zoomed.value = !zoomed.value;
};
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: auto;
}
.map-wrap img {
  width: 100%;
  height: auto;
}
.marker {
  position: absolute;
  transform: translate(-50%, -100%);
  cursor: pointer;
  z-index: 20;
}
.marker .pin {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url("/assets/images/ldb-logo.png") no-repeat center center; /* logo */
  background-size: cover; /* make logo fit */
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

.marker .tooltip {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(245, 241, 241, 0.8);
  color: rgb(20, 19, 19);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s;
}
.marker:hover .tooltip {
  opacity: 1;
}
</style>
