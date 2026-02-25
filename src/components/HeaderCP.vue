<template>
  <header class="main-header">
    <div class="header-container">
      <div class="icon-group">
        <a href="#" class="home-link">
          <img :src="opcoesIcon" alt="Logo" class="menu-icon"/>
        </a>
      </div>

      <nav>
        <ul class="nav-menu">
          <li v-for="item in menuItems" :key="item.id">
            <a :href="item.id" class="nav-link">
              <img :src="item.icon" :alt="item.label" class="nav-item-icon" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import opcoesIcon from '../assets/java.png';
import sobreIcon from '../assets/sobre.png';
import skillsIcon from '../assets/skills.png'; 
import portfolioIcon from '../assets/portfolio.png'; 
import contatoIcon from '../assets/contato.png'; 

const menuItems = [
  { label: 'Sobre', id: '#sobre', icon: sobreIcon },
  { label: 'Skills', id: '#skills', icon: skillsIcon },
  { label: 'Portfolio', id: '#portfolio', icon: portfolioIcon },
  { label: 'Contato', id: '#contact', icon: contatoIcon },
];
</script>

<style scoped>
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

.menu-icon {
  height: 55px;
  width: auto;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.menu-icon:hover {
  transform: scale(1.1);
}

.nav-menu {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
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
  color: #911414ce; 
}

.nav-menu li {
  position: relative;
}

.nav-menu li::after {
  display: block;
  content: '';
  height: 3px;
  width: 100%;
  position: absolute;
  bottom: -5px;
  left: 0;
  border-radius: 50px;
  background: linear-gradient(89.34deg, #d52c2c 6.18%, #911414ce 89.94%);
  transition: transform .3s ease-in-out;
  transform-origin: right;
  transform: scaleX(0);
}

.nav-menu li:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .nav-link span {
    display: none; 
  }
  .nav-menu {
    gap: 20px;
  }
}
</style>