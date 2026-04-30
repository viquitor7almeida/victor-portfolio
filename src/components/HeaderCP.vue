<template>
  <header class="main-header">
    <div class="header-container">
      <div class="icon-group">
        <a href="#" class="home-link">
          <img :src="opcoesIcon" alt="Logo" class="menu-icon"/>
        </a>
      </div>

      <nav class="nav-wrapper">
        <ul class="nav-menu">
          <li v-for="item in translatedMenu" :key="item.id">
            <a :href="item.id" class="nav-link">
              <img :src="item.icon" :alt="item.label" class="nav-item-icon" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>

        <div class="lang-container">
          <button 
            @click="toggleLanguage" 
            class="lang-switch"
            :title="locale === 'pt' ? 'Switch to English' : 'Mudar para Português'"
          >
            <img 
              v-if="locale === 'pt'" 
              src="https://flagcdn.com/w40/br.png" 
              alt="Português" 
              class="flag-icon"
            />
            <img 
              v-else 
              src="https://flagcdn.com/w40/us.png" 
              alt="English" 
              class="flag-icon"
            />
            <span class="lang-text">{{ locale.toUpperCase() }}</span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import opcoesIcon from '../assets/java.png';
import sobreIcon from '../assets/sobre.png';
import skillsIcon from '../assets/skills.png'; 
import portfolioIcon from '../assets/portfolio.png'; 
import contatoIcon from '../assets/contato.png'; 

const { t, locale } = useI18n();

const toggleLanguage = () => {
  locale.value = locale.value === 'pt' ? 'en' : 'pt';
};

const translatedMenu = computed(() => [
  { label: t('nav.about'), id: '#sobre', icon: sobreIcon },
  { label: t('nav.skills'), id: '#skills', icon: skillsIcon },
  { label: t('nav.portfolio'), id: '#portfolio', icon: portfolioIcon },
  { label: t('nav.contact'), id: '#contact', icon: contatoIcon },
]);
</script>

<style>
  .main-header {
    height: 80px;
    width: 100%;
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: -1px 8px 7px -6px rgb(255, 68, 68);
    display: flex;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.816);
    backdrop-filter: blur(10px); 
  }

  .header-container {
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-wrapper {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .nav-menu {
    display: flex;
    gap: 30px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-menu li {
    position: relative;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px; 
    color: #a62121; 
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    padding: 5px 0;
  }

  .nav-item-icon {
    height: 20px; 
    width: auto;
  }

  .nav-link:hover {
    color: #d52c2c; 
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 3px;
    border-radius: 50px;
    background: linear-gradient(89.34deg, #d52c2c 6.18%, #911414ce 89.94%);
    transition: width 0.3s ease-in-out;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .lang-container {
    display: flex;
    align-items: center;
    border-left: 1px solid rgba(255, 68, 68, 0.3);
    padding-left: 20px;
  }

  .lang-switch {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(166, 33, 33, 0.5);
    color: #fff;
    padding: 6px 14px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.75rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .flag-icon {
    width: 18px;
    height: 18px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .lang-switch:hover {
    background: rgba(166, 33, 33, 0.2);
    border-color: #ae0909;
    box-shadow: 0 0 15px rgba(174, 9, 9, 0.4);
    transform: translateY(-2px);
  }

  .lang-text {
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.9);
  }

  @media (max-width: 768px) {
    .nav-link span { display: none; }
    .nav-menu { gap: 20px; }
    .nav-wrapper { gap: 15px; }
    .lang-container { padding-left: 10px; }
    .lang-text { display: none; }
  }
</style>