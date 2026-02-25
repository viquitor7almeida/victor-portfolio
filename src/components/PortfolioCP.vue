<template>
  <section class="portfolio-section" id="portfolio">
    <div class="portfolio-container">
      <div class="portfolio-header anim-fade-up">
        <h2 class="title-gradient">Portfólio</h2>
        <p class="subtitle">Projetos reais, soluções robustas e código limpo.</p>
      </div>

      <div class="carousel-wrapper anim-fade-up-delayed">
        <button class="nav-btn prev-btn" @click="prevProject">
          <Icon icon="fluent:chevron-left-24-filled" />
        </button>

        <div class="carousel-viewport">
          <Transition :name="transitionName" mode="out-in">
            <div :key="currentIndex" class="project-layout">
              <div class="image-column">
                <div class="image-wrapper">
                  <div class="image-glow"></div>
                  <img :src="currentProject.image" :alt="currentProject.title" class="project-img" />
                </div>
              </div>

              <div class="info-column">
                <div class="tech-tags">
                  <span v-for="tech in currentProject.techs" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
                
                <h3 class="project-title">{{ currentProject.title }}</h3>
                <div class="divider"></div>
                
                <p class="project-desc">{{ currentProject.desc }}</p>

                <div class="action-buttons">
                  <a :href="currentProject.links.app" target="_blank" class="btn-primary">
                    <Icon icon="fluent:open-16-filled" class="btn-icon" />
                    <span>Acessar App</span>
                  </a>
                  <a :href="currentProject.links.front" target="_blank" class="btn-secondary">
                    <Icon icon="mdi:github" class="btn-icon" />
                    <span>Repositório Front</span>
                  </a>
                  <a :href="currentProject.links.back" target="_blank" class="btn-secondary">
                    <Icon icon="mdi:github" class="btn-icon" />
                    <span>Repositório Back</span>
                  </a>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <button class="nav-btn next-btn" @click="nextProject">
          <Icon icon="fluent:chevron-right-24-filled" />
        </button>
      </div>

      <div class="carousel-indicators anim-fade-up-list">
        <button 
          v-for="(_, index) in projects" 
          :key="index"
          class="indicator-dot"
          :class="{ active: index === currentIndex }"
          @click="goToProject(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { Icon } from '@iconify/vue';
import imgMusicLib from '@/assets/music-lib.png';
import imgProject2 from '@/assets/music-lib.png';

const currentIndex = ref(0);
const transitionName = ref('slide-right');

const projects = [
  {
    title: 'Music Library',
    techs: ['Java 17', 'Spring Boot', 'Spring Security', 'Maven', 'MySql', 'Vue.js', 'JPA', 'Sqlite', 'Docker'],
    desc: 'Plataforma completa para gestão de composições, envolvendo cifras, áudios, versos e afins. O backend foi desenvolvido com rigoroso padrão de qualidade, implementando autenticação e autorização robustas via Spring Security, JWT, Gestão de usuários, DTOs, Geração de bancos de teste via JPA e etc. A arquitetura em camadas e o gerenciamento de dependências via Maven garantem um sistema altamente escalável, seguro e de fácil manutenção, preparado para alta concorrência.',
    image: imgMusicLib,
    links: {
      app: '#',
      front:'https://github.com/viquitor7almeida/LibMusical-Front',
      back: 'https://github.com/viquitor7almeida/LibMusical-Api'
    }
  },
//   {
//     title: 'Nexus E-Commerce',
//     techs: ['Node.js', 'React', 'MongoDB', 'Docker', 'AWS'],
//     desc: 'Sistema de comércio eletrônico fictício construído para demonstrar fluxos complexos de pagamento e gestão de estoque em tempo real. Utiliza microsserviços para separar o processamento de pedidos da vitrine de produtos, assegurando resiliência. O frontend dinâmico otimiza a conversão e a experiência do usuário em todas as telas.',
//     image: imgProject2,
//     links: {
//       app: '#',
//       front:'#',
//       back: '#'
//     }
//   }
];

const currentProject = computed(() => projects[currentIndex.value]);

const nextProject = () => {
  transitionName.value = 'slide-left';
  currentIndex.value = (currentIndex.value + 1) % projects.length;
};

const prevProject = () => {
  transitionName.value = 'slide-right';
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length;
};

const goToProject = (index) => {
  transitionName.value = index > currentIndex.value ? 'slide-left' : 'slide-right';
  currentIndex.value = index;
};
</script>

<style scoped>
.portfolio-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 20px;
  background: #050505;
  overflow: hidden;
}

.portfolio-container {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 60px;
}

.title-gradient {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  background: linear-gradient(to bottom, #fff 40%, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.subtitle {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.1rem;
  margin-top: 10px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20px;
  position: relative;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  flex-shrink: 0;
}

.nav-btn:hover {
  background: rgba(174, 9, 9, 0.2);
  border-color: #ae0909;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(174, 9, 9, 0.4);
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
  border-radius: 30px;
  background: radial-gradient(circle at center, rgba(15, 15, 15, 0.8), rgba(5, 5, 5, 1));
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.project-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 450px;
}

.image-column {
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  transform: perspective(1000px) rotateY(5deg);
  transition: transform 0.5s ease;
}

.image-wrapper:hover {
  transform: perspective(1000px) rotateY(0deg) scale(1.02);
}

.image-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle at center, rgba(174, 9, 9, 0.3) 0%, transparent 60%);
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
}

.project-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 20px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.info-column {
  padding: 50px 50px 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.project-title {
  color: #fff;
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.2;
}

.divider {
  width: 60px;
  height: 4px;
  background: #ae0909;
  border-radius: 2px;
  margin-bottom: 25px;
}

.project-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 40px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #ae0909;
  color: #fff;
  box-shadow: 0 4px 15px rgba(174, 9, 9, 0.4);
}

.btn-primary:hover {
  background: #c90e0e;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(174, 9, 9, 0.6);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.3);
}

.btn-icon {
  font-size: 20px;
}

.carousel-indicators {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicator-dot.active {
  width: 30px;
  border-radius: 10px;
  background: #ae0909;
  box-shadow: 0 0 10px rgba(174, 9, 9, 0.5);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from { opacity: 0; transform: translateX(50px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-50px); }

.slide-right-enter-from { opacity: 0; transform: translateX(-50px); }
.slide-right-leave-to { opacity: 0; transform: translateX(50px); }

.anim-fade-up, .anim-fade-up-delayed, .anim-fade-up-list {
  animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

.anim-fade-up-delayed { animation-delay: 0.2s; }
.anim-fade-up-list { animation-delay: 0.4s; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 1024px) {
  .project-layout { grid-template-columns: 1fr; }
  .image-column { padding: 30px 30px 0 30px; }
  .info-column { padding: 30px; align-items: center; text-align: center; }
  .tech-tags, .action-buttons { justify-content: center; }
  .divider { margin-left: auto; margin-right: auto; }
}

@media (max-width: 768px) {
  .carousel-wrapper { flex-direction: column; }
  .nav-btn { position: absolute; top: 30%; transform: translateY(-50%); z-index: 20; background: rgba(0,0,0,0.5); }
  .prev-btn { left: 10px; }
  .next-btn { right: 10px; }
  .nav-btn:hover { transform: translateY(-50%) scale(1.1); }
  .action-buttons { flex-direction: column; width: 100%; }
  .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
}
</style>