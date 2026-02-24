<template>
  <div class="main-container">
    <HeaderCP />

    <section class="about">
      <AboutMeCP />
    </section>

    <section class="skills">
      <SkillsCP/>
    </section>
    
    <div class="content">
      </div>

    <FooterCP />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderCP from '@/components/HeaderCP.vue'
import FooterCP from '@/components/FooterCP.vue'
import AboutMeCP from '@/components/AboutMeCP.vue'
import SkillsCP from '@/components/SkillsCP.vue'

const musicas = ref([])
</script>

<style>
.main-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  padding-top: 80px; 
}

.about {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-bottom: 50px; 
}

.skills {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 50px;
}

.content {
  flex: 1;
  padding: 20px;
  display: flex;
  justify-content: center;
}

html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 35px;
}
</style>