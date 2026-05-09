const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const copyButtons = document.querySelectorAll('.copy-btn');
const reveals = document.querySelectorAll('.reveal');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(value);
      const status = document.querySelector('.copy-status');
      if (status) {
        status.textContent = 'Contract copied.';
        setTimeout(() => {
          status.textContent = '';
        }, 1800);
      }
      button.textContent = '✓';
      setTimeout(() => {
        button.textContent = '⧉';
      }, 1200);
    } catch (error) {
      const status = document.querySelector('.copy-status');
      if (status) status.textContent = 'Copy failed. Select and copy manually.';
    }
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

reveals.forEach((element) => observer.observe(element));
