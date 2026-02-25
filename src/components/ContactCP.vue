<template>
  <section 
    ref="sectionRef" 
    class="contact-section" 
    :class="{ 'is-visible': isVisible }"
    id="contact"
  >
    <div class="contact-container">
      <div class="contact-header anim-fade-up">
        <h2 class="title-gradient">Contato</h2>
        <p class="subtitle">Vamos construir algo incrível juntos? Entre em contato.</p>
      </div>

      <div class="contact-layout">
        <div class="info-column anim-fade-up-delayed">
          <div 
            v-for="item in contactItems" 
            :key="item.title" 
            class="contact-card"
          >
            <div class="card-main">
              <div class="icon-wrapper">
                <img :src="item.icon" :alt="item.title" class="contact-icon" />
              </div>
              <div class="card-content">
                <span class="card-title">{{ item.title }}</span>
                <span class="card-value">{{ item.value }}</span>
              </div>
            </div>
            
            <div class="card-actions">
              <button @click="copyToClipboard(item.value)" class="action-btn" title="Copiar">
                <Icon :icon="copiedText === item.value ? 'fluent:checkmark-24-filled' : 'fluent:copy-24-regular'" />
              </button>
              <a :href="item.link" target="_blank" class="action-btn" title="Abrir link">
                <Icon icon="fluent:open-24-regular" />
              </a>
            </div>
          </div>
        </div>

        <div class="form-column anim-fade-up-list">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="input-group">
              <label>Nome</label>
              <input type="text" v-model="form.name" placeholder="Seu nome completo" required />
            </div>
            
            <div class="input-group">
              <label>E-mail</label>
              <input type="email" v-model="form.email" placeholder="seu@email.com" required />
            </div>

            <div class="input-group">
              <label>Mensagem</label>
              <textarea v-model="form.message" rows="5" placeholder="Como posso ajudar?" required></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSending">
              <span>{{ isSending ? 'Abrindo E-mail...' : 'Enviar Mensagem' }}</span>
              <Icon icon="fluent:send-24-filled" class="send-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { Icon } from '@iconify/vue';

import iconGithub from '@/assets/github.png'
import iconLinkedin from '@/assets/linkedin.png'
import iconWhatsapp from '@/assets/whatsapp.png'
import iconEmail from '@/assets/email.png'

const sectionRef = ref(null);
const isVisible = ref(false);
const isSending = ref(false);
const copiedText = ref('');
let observer = null;

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const contactItems = [
  {
    title: 'Github',
    value: 'github.com/viquitor7almeida',
    link: 'https://github.com/viquitor7almeida',
    icon: iconGithub
  },
  {
    title: 'LinkedIn',
    value: 'www.linkedin.com/in/jovalmeida/',
    link: 'https://www.linkedin.com/in/jovalmeida/',
    icon: iconLinkedin
  },
  {
    title: 'WhatsApp',
    value: '+55 (21) 96958-0818',
    link: 'https://wa.me/5521969580818',
    icon: iconWhatsapp
  },
  {
    title: 'E-mail',
    value: 'joaoavictor2012@gmail.com',
    link: 'mailto:joaoavictor2012@gmail.com',
    icon: iconEmail
  }
];

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  copiedText.value = text;
  setTimeout(() => {
    if (copiedText.value === text) copiedText.value = '';
  }, 2000);
};

const handleSubmit = () => {
  isSending.value = true;
  
  const subject = encodeURIComponent(`Contato via Portfólio: ${form.name}`);
  const body = encodeURIComponent(
    `Nome: ${form.name}\n` +
    `Email para retorno: ${form.email}\n\n` +
    `Mensagem:\n${form.message}`
  );

  const mailtoLink = `mailto:joaoavictor2012@gmail.com?subject=${subject}&body=${body}`;
  
  setTimeout(() => {
    window.location.href = mailtoLink;
    isSending.value = false;
    form.name = '';
    form.email = '';
    form.message = '';
  }, 800);
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
.contact-section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 20px;
  background: transparent;
}

.contact-container {
  max-width: 1200px;
  width: 100%;
}

.contact-header {
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

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.contact-card:hover {
  background: rgba(174, 9, 9, 0.05);
  border-color: rgba(174, 9, 9, 0.2);
  transform: translateX(10px);
}

.card-main {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
}

.contact-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  color: #ae0909;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-value {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 2px;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #ae0909;
  color: #fff;
  border-color: #ae0909;
}

.form-column {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  padding: 40px;
  backdrop-filter: blur(10px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 5px;
}

.input-group input, 
.input-group textarea {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 15px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.input-group input:focus, 
.input-group textarea:focus {
  border-color: #ae0909;
  background: rgba(174, 9, 9, 0.02);
  box-shadow: 0 0 15px rgba(174, 9, 9, 0.1);
}

.submit-btn {
  background: #ae0909;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #c90e0e;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(174, 9, 9, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-icon {
  font-size: 18px;
}

.anim-fade-up, .anim-fade-up-delayed, .anim-fade-up-list {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.is-visible .anim-fade-up { opacity: 1; transform: translateY(0); }
.is-visible .anim-fade-up-delayed { opacity: 1; transform: translateY(0); transition-delay: 0.2s; }
.is-visible .anim-fade-up-list { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }

@media (max-width: 950px) {
  .contact-layout { grid-template-columns: 1fr; gap: 40px; }
  .info-column { order: 2; }
  .form-column { order: 1; }
  .contact-card:hover { transform: none; }
}
</style>