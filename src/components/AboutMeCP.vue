<template>
  <section 
    ref="sectionRef"
    class="gallery-wrapper"
    :class="{ 'is-visible': isVisible }"
    id="sobre"
  >
    <div class="profile-container anim-fade-left">
      <img :src="avatar" alt="João Victor" class="profile-photo" />
    </div>

    <div class="info-content">
      <h2 class="title-gradient">
        <span 
          v-for="(char, index) in titleText" 
          :key="index"
          class="char"
          :style="{ transitionDelay: `${index * 0.03}s` }"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </h2>
      
      <div class="description-container">
        <i18n-t keypath="about.p1" tag="p" class="description anim-fade-up-delayed">
          <template #name><strong>{{ t('about.p1_name') }}</strong></template>
          <template #dev><strong>{{ t('about.p1_dev') }}</strong></template>
          <template #prog><strong>{{ t('about.p1_prog') }}</strong></template>
        </i18n-t>

        <i18n-t keypath="about.p2" tag="p" class="description anim-fade-up-list">
          <template #java><strong>{{ t('about.p2_java') }}</strong></template>
          <template #backend><strong>{{ t('about.p2_backend') }}</strong></template>
          <template #js><strong>{{ t('about.p2_js') }}</strong></template>
          <template #front><strong>{{ t('about.p2_front') }}</strong></template>
          <template #robust><strong>{{ t('about.p2_robust') }}</strong></template>
        </i18n-t>
      </div>

      <div class="actions-container anim-fade-up-buttons">
        <a :href="resume" target="_blank" class="btn-primary">
          {{ t('about.btnResume') }}
        </a>
        <a href="https://www.linkedin.com/in/jovalmeida/" target="_blank" class="btn-secondary">
          {{ t('about.btnLinkedin') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useI18n } from "vue-i18n";
import avatar from "@/assets/red-avatar.png";
import resume from "@/assets/curriculo.pdf";

const { t } = useI18n();

// titleText agora é uma computed para reagir à troca de idioma (Olá Mundo -> Hello World)
const titleText = computed(() => t('about.title').split(""));

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true;
    }
  }, { threshold: 0.15 });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
/* O CSS permanece exatamente o mesmo que você já tem */
.gallery-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
}

.title-gradient {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
}

.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) rotateX(-90deg);
  transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  background: linear-gradient(135deg, #ffffff 40%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.is-visible .char {
  opacity: 1;
  transform: translateY(0) rotateX(0);
}

.profile-container {
  width: 450px;
  height: 450px;
  flex-shrink: 0;
  position: relative;
  filter: drop-shadow(0 0 15px rgba(174, 9, 9, 0.1));
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 32px;
  border: 2px solid rgba(174, 9, 9, 0.751);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 50px rgba(147, 22, 22, 0.4);
}

.profile-container:hover .profile-photo {
  border-radius: 50%;
  border-color: #911212;
  transform: scale(1.02);
  box-shadow: 0 25px 60px rgba(255, 0, 0, 0.6), 0 0 25px rgba(174, 9, 9, 0.5);
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.description-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.15rem;
  line-height: 1.7;
  margin: 0;
}

.description :deep(strong) {
  color: #c91a1a;
  font-weight: 600;
}

.actions-container {
  display: flex;
  gap: 15px;
  margin-top: 35px;
}

.btn-primary, .btn-secondary {
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #ae0909;
  color: #fff;
  box-shadow: 0 4px 15px rgba(174, 9, 9, 0.3);
}

.btn-primary:hover {
  background: #d40c0c;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(174, 9, 9, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(174, 9, 9, 0.5);
  transform: translateY(-3px);
}

.anim-fade-up-delayed, .anim-fade-up-list, .anim-fade-left, .anim-fade-up-buttons {
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.anim-fade-up-delayed, .anim-fade-up-list, .anim-fade-up-buttons {
  transform: translateY(30px);
}

.anim-fade-left {
  transform: translateX(-50px);
}

.is-visible .anim-fade-up-delayed { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }
.is-visible .anim-fade-up-list { opacity: 1; transform: translateY(0); transition-delay: 0.6s; }
.is-visible .anim-fade-left { opacity: 1; transform: translateX(0); transition-delay: 0.2s; }
.is-visible .anim-fade-up-buttons { opacity: 1; transform: translateY(0); transition-delay: 0.8s; }


@media (max-width: 1024px) {
  .gallery-wrapper { gap: 40px; }
  .profile-container { width: 380px; height: 380px; }
}

@media (max-width: 968px) {
  .gallery-wrapper {
    flex-direction: column;
    text-align: center;
    padding: 60px 20px;
    gap: 40px;
  }
  .profile-container {
    width: 320px;
    height: 320px;
  }
  .title-gradient { 
    justify-content: center; 
  }
  .actions-container { justify-content: center; }
  
  .anim-fade-left {
    transform: translateY(-30px); 
  }
}

@media (max-width: 480px) {
  .gallery-wrapper {
    padding: 40px 15px;
  }
  .profile-container {
    width: 260px;
    height: 260px;
  }
  .description {
    font-size: 1.05rem;
  }
  .actions-container {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
  .btn-primary, .btn-secondary {
    width: 100%;
    padding: 14px; 
  }
}

@media (max-width: 350px) {
  .profile-container {
    width: 220px;
    height: 220px;
  }
  .title-gradient {
    font-size: 2.2rem;
  }
}
</style>