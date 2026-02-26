<template>
  <section 
    ref="sectionRef" 
    class="skills-section" 
    :class="{ 'is-visible': isVisible }"
    id="skills"
  >
    <div class="skills-container">
      <div class="skills-layout">
        
        <div class="grid-column anim-fade-up">
          <div class="skills-header">
            <h2 class="title-gradient">Skills</h2>
            <p class="subtitle">Tecnologias e ferramentas que domino.</p>
          </div>

          <div class="tabs-wrapper">
            <div class="tabs-nav">
              <button 
                v-for="tab in ['backend', 'frontend', 'outros']" 
                :key="tab"
                class="tab-btn" 
                :class="{ active: activeTab === tab }"
                @click="changeTab(tab)"
              >
                <span class="btn-text">{{ tab.charAt(0).toUpperCase() + tab.slice(1) }}</span>
                <div v-if="activeTab === tab" class="tab-indicator"></div>
              </button>
            </div>
          </div>

          <Transition name="tab-change" mode="out-in">
            <div :key="activeTab" class="skills-grid">
              <div 
                v-for="skill in skillsData[activeTab]" 
                :key="skill.name"
                class="skill-card"
                @mouseenter="updateHover(skill)"
                @mouseleave="resetHover"
                @click="updateHover(skill)"
              >
                <div class="icon-box">
                  <Icon :icon="skill.icon" class="skill-icon" />
                </div>
                <span class="skill-name">{{ skill.name }}</span>
              </div>
            </div>
          </Transition>
        </div>

        <div class="description-column anim-fade-up-delayed">
          <div class="description-panel">
            <div class="panel-glow"></div>
            <Transition name="fade-text" mode="out-in">
              <div :key="hoveredSkill.name" class="panel-inner">
                <div v-if="hoveredSkill.name === 'default'" class="skill-detail">
                  <div class="info-badge">
                    <Icon icon="fluent:info-24-filled" class="info-icon" />
                    <span>Dica</span>
                  </div>
                  <p class="desc-text-default">{{ hoveredSkill.desc }}</p>
                </div>
                <div v-else class="skill-detail">
                  <span class="detail-category">{{ activeTab }}</span>
                  <h4 class="detail-title">{{ hoveredSkill.name }}</h4>
                  <div class="divider"></div>
                  <p class="desc-text">{{ hoveredSkill.desc }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from '@iconify/vue';

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

const activeTab = ref('backend');
const defaultState = { name: 'default', desc: 'Passe o mouse (ou toque) sobre uma tecnologia para explorar minha experiência técnica.' };
const hoveredSkill = ref(defaultState);

const changeTab = (tab) => {
  activeTab.value = tab;
  resetHover();
};

const updateHover = (skill) => { hoveredSkill.value = skill; };
const resetHover = () => { hoveredSkill.value = defaultState; };

const skillsData = {
  backend: [
    { name: 'Java', icon: 'logos:java', desc: 'Sólida experiência em arquitetura MVC, Spring Boot e desenvolvimento de microserviços robustos.' },
    { name: 'Node.js', icon: 'logos:nodejs-icon', desc: 'Criação de APIs rápidas e escaláveis utilizando Express e ecossistema JavaScript assíncrono.' },
    { name: '.NET', icon: 'logos:dotnet', desc: 'Desenvolvimento de aplicações seguras com C#, focando em performance e integração com ecossistema Microsoft.' },
    { name: 'MySQL', icon: 'logos:mysql-icon', desc: 'Gerenciamento de base de dados relacionais com foco em performance, consistência e alta disponibilidade.' }, 
    { name: 'PostgreSQL', icon: 'logos:postgresql', desc: 'Domínio em modelagem de dados, otimização de queries e manutenção de integridade.' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon', desc: 'Implementação de soluções NoSQL flexíveis, focando em alta disponibilidade.' }
  ],
  frontend: [
    { name: 'TypeScript', icon: 'logos:typescript-icon', desc: 'Aplicação de tipagem estática para garantir escalabilidade em grandes bases de código.' },
    { name: 'CSS3', icon: 'logos:css-3', desc: 'Criação de layouts modernos e responsivos com domínio de Flexbox, Grid e animações puras.' },
    { name: 'HTML5', icon: 'logos:html-5', desc: 'Estruturação semântica de alta qualidade para acessibilidade e performance em SEO.' },
    { name: 'React', icon: 'logos:react', desc: 'Construção de SPAs dinâmicas com Hooks, Context API e gerenciamento de estado.' },
    { name: 'Vue.js', icon: 'logos:vue', desc: 'Desenvolvimento reativo e modular com Composition API e alta performance.' },
    { name: 'Next.js', icon: 'logos:nextjs-icon', desc: 'Otimização de Web Vitals com Server Side Rendering para máxima velocidade.' }
  ],
  outros: [
    { name: 'Git', icon: 'logos:git-icon', desc: 'Gestão de fluxo de trabalho (GitFlow) e versionamento colaborativo.' },
    { name: 'Azure', icon: 'logos:microsoft-azure', desc: 'Configuração de serviços cloud e deploy em ambiente Microsoft.' },
    { name: 'Docker', icon: 'logos:docker-icon', desc: 'Containerização de aplicações para garantir paridade entre ambientes.' },
    { name: 'Linux', icon: 'logos:linux-tux', desc: 'Operação em servidores e automação via Bash Script.' },
    { name: 'Jenkins', icon: 'logos:jenkins', desc: 'Configuração de pipelines automatizados para CI/CD.' },
    { name: 'AWS', icon: 'logos:aws', desc: 'Utilização de infraestrutura como serviço (S3, EC2, Lambda) na nuvem Amazon.' }
  ]
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
.skills-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 20px;
  background: transparent;
  overflow: hidden;
}

.skills-container {
  max-width: 1300px;
  width: 100%;
}

.skills-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 80px;
  align-items: center;
}

.grid-column {
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center;
}

.skills-header {
  margin-bottom: 30px;
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

.tabs-wrapper {
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.tabs-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.02);
  padding: 6px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: fit-content;
}

.tab-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  padding: 12px 25px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tab-btn.active { color: #fff; }

.tab-indicator {
  position: absolute;
  inset: 0; 
  background: #ae0909;
  border-radius: 12px;
  z-index: -1;
  box-shadow: 0 4px 20px rgba(174, 9, 9, 0.4);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 600px;
}

.skill-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  aspect-ratio: 1 / 1;
  width: 100%;
}

.skill-card:hover {
  background: rgba(174, 9, 9, 0.07);
  border-color: rgba(174, 9, 9, 0.4);
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

.skill-icon {
  font-size: clamp(24px, 4vw, 38px);
  filter: grayscale(0.4);
  transition: all 0.3s ease;
}

.skill-card:hover .skill-icon {
  filter: grayscale(0) drop-shadow(0 0 10px rgba(255,255,255,0.2));
}

.skill-name {
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(0.7rem, 2vw, 0.85rem);
  font-weight: 600;
  text-align: center;
}

.description-column {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.description-panel {
  background: radial-gradient(circle at top left, rgba(20, 20, 20, 0.8), rgba(5, 5, 5, 1));
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 30px;
  padding: 50px 40px;
  width: 100%;
  max-width: 420px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.panel-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 100% 0%, rgba(174, 9, 9, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.info-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: #ae0909;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 25px;
  border: 1px solid rgba(174, 9, 9, 0.2);
}

.detail-category {
  color: #ae0909;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 15px;
  opacity: 0.8;
}

.detail-title {
  color: #fff;
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 20px;
}

.divider {
  width: 50px;
  height: 4px;
  background: #ae0909;
  border-radius: 10px;
  margin-bottom: 25px;
}

.desc-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.15rem;
  line-height: 1.8;
}

.desc-text-default {
  color: rgba(255, 255, 255, 0.3);
  font-size: 1.1rem;
  font-style: italic;
}

.tab-change-enter-from { opacity: 0; transform: translateY(10px); }
.tab-change-leave-to { opacity: 0; transform: translateY(-10px); }
.tab-change-enter-active, .tab-change-leave-active { transition: all 0.4s ease; }

.fade-text-enter-active, .fade-text-leave-active { transition: all 0.3s ease; }
.fade-text-enter-from { opacity: 0; transform: scale(0.95); }
.fade-text-leave-to { opacity: 0; transform: scale(1.05); }

.anim-fade-up, .anim-fade-up-delayed {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.is-visible .anim-fade-up { opacity: 1; transform: translateY(0); }
.is-visible .anim-fade-up-delayed { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }

@media (max-width: 950px) {
  .skills-layout { grid-template-columns: 1fr; gap: 50px; }
  .description-panel { max-width: 100%; min-height: 320px; padding: 40px 30px; }
  .skills-grid { max-width: 100%; justify-items: center; }
}

@media (max-width: 600px) {
  .skills-section { padding: 60px 15px; }
  .tab-btn { padding: 10px 15px; font-size: 0.75rem; }
  .skills-grid { 
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px; 
    max-width: 450px;
  }
  .skill-card { border-radius: 15px; }
  .detail-title { font-size: 1.8rem; }
  .desc-text { font-size: 1rem; line-height: 1.6; }
}

@media (max-width: 400px) {
  .skills-grid { 
    grid-template-columns: repeat(2, 1fr);
    max-width: 300px;
  }
  .tabs-nav { width: 100%; }
  .tab-btn { flex: 1; padding: 10px 5px; font-size: 0.7rem; }
}
</style>