
// Particles
const particles = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 4 + 1;
  p.style.cssText = `
    width:${size}px; height:${size}px;
    left:${Math.random()*100}%;
    animation-duration:${Math.random()*15+10}s;
    animation-delay:${Math.random()*10}s;
  `;
  particles.appendChild(p);
}

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-num').forEach(el => counterObserver.observe(el));

// Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  const btn = document.getElementById('backTop');
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
    btn.classList.add('show');
  } else {
    nav.classList.remove('scrolled');
    btn.classList.remove('show');
  }
});

// Charts
const pieCtx = document.getElementById('pieChart').getContext('2d');
new Chart(pieCtx, {
  type: 'doughnut',
  data: {
    labels: ['الدوري الممتاز', 'كأس مصر', 'أبطال أفريقيا', 'السوبر المصري', 'دوري القاهرة', 'أخرى'],
    datasets: [{
      data: [45, 39, 12, 16, 16, 32],
      backgroundColor: ['#CC0000','#FF4444','#D4AF37','#8B0000','#FF8888','#666666'],
      borderColor: '#1A1A1A',
      borderWidth: 3,
      hoverOffset: 8
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#888', font: { family: 'Tajawal', size: 11 }, padding: 10 }
      }
    }
  }
});

const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['٤٠ات','٥٠ات','٦٠ات','٧٠ات','٨٠ات','٩٠ات','٢٠٠٠','٢٠١٠','٢٠٢٠'],
    datasets: [{
      label: 'ألقاب الدوري',
      data: [2, 5, 4, 5, 6, 6, 7, 6, 4],
      backgroundColor: 'rgba(204,0,0,0.7)',
      borderColor: '#CC0000',
      borderWidth: 2,
      borderRadius: 6,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#888', font: { family: 'Tajawal' } } }
    },
    scales: {
      x: { ticks: { color: '#666', font: { family: 'Tajawal' } }, grid: { color: 'rgba(255,255,255,0.03)' } },
      y: { ticks: { color: '#666', font: { family: 'Tajawal' } }, grid: { color: 'rgba(255,255,255,0.05)' } }
    }
  }
});

// Fan messages
function addFanMsg() {
  const name = document.getElementById('fanName').value.trim();
  const msg = document.getElementById('fanMsg').value.trim();
  if (!name || !msg) { alert('برجاء ملء جميع الحقول'); return; }
  const div = document.createElement('div');
  div.className = 'fan-msg';
  div.style.animation = 'heroIn 0.5s ease forwards';
  div.innerHTML = `<p class="fan-msg-text">«${msg}»</p><div class="fan-msg-author">— ${name}</div>`;
  document.getElementById('fansMessages').prepend(div);
  document.getElementById('fanName').value = '';
  document.getElementById('fanMsg').value = '';
}
