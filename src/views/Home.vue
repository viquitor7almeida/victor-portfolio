<template>
  <div class="main-container">
    <HeaderCP />

    <section class="about">
      <AboutMeCP />
    </section>

    <section class="skills">
      <SkillsCP />
    </section>
    
    <section class="portfolio">
      <PortfolioCP />
    </section>

    <section class="contact">
      <ContactCP />
    </section>

    <FooterCP />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderCP from '@/components/HeaderCP.vue'
import FooterCP from '@/components/FooterCP.vue'
import AboutMeCP from '@/components/AboutMeCP.vue'
import SkillsCP from '@/components/SkillsCP.vue'
import PortfolioCP from '@/components/PortfolioCP.vue'
import ContactCP from '@/components/ContactCP.vue'

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
  padding-bottom: 20px; 
}

.skills {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 50px;
}

.portfolio {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}

.contact {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 80px;
  flex: 1;
}

html {
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 15px;
}
</style>