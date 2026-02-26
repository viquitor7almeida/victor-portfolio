<template>
  <section 
    ref="sectionRef"
    class="portfolio-section" 
    :class="{ 'is-visible': isVisible }"
    id="portfolio"
  >
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { Icon } from '@iconify/vue';
import imgMusicLib from '@/assets/music-lib.png';

const sectionRef = ref(null);
const isVisible = ref(false);
const currentIndex = ref(0);
const transitionName = ref('slide-right');
let observer = null;

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
  }
];

const currentProject = computed(() => projects[currentIndex.value]);

const nextProject = () => {
  if (projects.length <= 1) return;
  transitionName.value = 'slide-left';
  currentIndex.value = (currentIndex.value + 1) % projects.length;
};

const prevProject = () => {
  if (projects.length <= 1) return;
  transitionName.value = 'slide-right';
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length;
};

const goToProject = (index) => {
  if (index === currentIndex.value) return;
  transitionName.value = index > currentIndex.value ? 'slide-left' : 'slide-right';
  currentIndex.value = index;
};

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) isVisible.value = true;
  }, { threshold: 0.1 });
  if (sectionRef.value) observer.observe(sectionRef.value);
});

onBeforeUnmount(() => { if (observer) observer.disconnect(); });
</script>

<style scoped>
.portfolio-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 20px;
  background: transparent;
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
  backdrop-filter: blur(10px);
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
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 20px;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  font-size: 0.75rem;
  font-weight: 600;
}

.project-title {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 15px;
}

.divider {
  width: 60px;
  height: 4px;
  background: #ae0909;
  border-radius: 2px;
  margin-bottom: 20px;
}

.project-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(174, 9, 9, 0.1);
  border-color: #ae0909;
  transform: translateY(-3px);
}

.btn-icon {
  font-size: 18px;
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
}

.indicator-dot.active {
  width: 30px;
  border-radius: 10px;
  background: #ae0909;
}

.anim-fade-up, .anim-fade-up-delayed, .anim-fade-up-list {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.is-visible .anim-fade-up { opacity: 1; transform: translateY(0); }
.is-visible .anim-fade-up-delayed { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
.is-visible .anim-fade-up-list { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }

.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-left-enter-from { opacity: 0; transform: translateX(30px); }
.slide-left-leave-to { opacity: 0; transform: translateX(-30px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-30px); }
.slide-right-leave-to { opacity: 0; transform: translateX(30px); }

@media (max-width: 1024px) {
  .project-layout { grid-template-columns: 1fr; }
  .image-column { padding: 30px; }
  .info-column { padding: 0 40px 40px 40px; text-align: center; align-items: center; }
  .tech-tags, .action-buttons { justify-content: center; }
  .divider { margin-left: auto; margin-right: auto; }
}

@media (max-width: 768px) {
  .portfolio-section { padding: 60px 15px; }
  .carousel-wrapper { gap: 10px; }
  .nav-btn { width: 40px; height: 40px; font-size: 20px; }
  .project-title { font-size: 1.8rem; }
  .image-wrapper { transform: none; }
  .image-wrapper:hover { transform: scale(1.02); }
  .action-buttons { flex-direction: column; width: 100%; }
  .btn-secondary { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .nav-btn { position: absolute; top: 180px; background: rgba(0,0,0,0.6); }
  .prev-btn { left: 10px; }
  .next-btn { right: 10px; }
  .info-column { padding: 0 20px 30px 20px; }
}
</style>```