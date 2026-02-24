<template>
  <div class="app-wrapper">
    <div class="background-global-blur" :style="{ backgroundImage: `url(${bg})` }"></div>
    
    <nav v-if="false">
      <RouterLink to="/"></RouterLink> 
    </nav>

    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import bg from './assets/fundo.png'
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background: transparent;
  font-family: 'Ubuntu', sans-serif;
}

#app {
  min-height: 100vh;
  background: transparent;
}

*, *::before, *::after {
  box-sizing: border-box;
  font-family: 'Ubuntu', sans-serif;
}

input, button, textarea, select {
  font-family: inherit;
}

.app-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  background: transparent;
}

.background-global-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  filter: blur(8px) brightness(0.7);
  z-index: 0;
  background-repeat: no-repeat;
  transform: scale(1.1);
}

.app-content {
  position: relative;
  z-index: 1;
  min-height: 100vh;
}

</style>