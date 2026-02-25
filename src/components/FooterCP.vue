<template>
  <footer class="footer">
    <div class="footer-bottom">
      <p>
        <a href="https://www.youtube.com/watch?v=rB11hfPdtWk" target="_blank" rel="noopener" class="egg-link">
          &copy; 2026 <strong>João Victor</strong> — Todos os direitos reservados.
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4); 
  backdrop-filter: blur(10px);
  padding: 20px; 
  margin-top: auto; 
  box-sizing: border-box;
  border-top: 1px solid rgba(174, 9, 9, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem; 
  margin: 0;
  letter-spacing: 1px;
}

.egg-link {
  text-decoration: none;
  color: inherit;
  cursor: default; 
}

.footer-bottom strong {
  color: #ae0909;
  font-weight: 600;
  transition: color 0.3s ease;
}

@media (max-width: 600px) {
  .footer {
    padding: 15px;
  }
}
</style>