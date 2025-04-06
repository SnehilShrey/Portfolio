const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.onclick = () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
};

window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
};

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert("Please fill all fields!");
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Enter a valid email!");
  } else {
    alert("Message sent successfully!");
  }
});

const canvas = document.getElementById('gradient-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Balanced vibrant colors with transparency
let colorSets = [
  ['#9b59b6', '#3498db', '#2ecc71'],   // violet-blue-green
  ['#ff6f61', '#ffa500', '#f39c12'],   // orange-saffron blend
  ['#16a085', '#8e44ad', '#00ffff']    // teal-violet-neon blue
];

let currentSet = 0;

function drawGradient() {
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  const colors = colorSets[currentSet];

  grad.addColorStop(0, colors[0] + 'cc'); // 'cc' = ~80% opacity
  grad.addColorStop(0.5, colors[1] + 'cc');
  grad.addColorStop(1, colors[2] + 'cc');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  currentSet = (currentSet + 1) % colorSets.length;
}

drawGradient();
setInterval(drawGradient, 5000);

// Scroll Reveal One by One
const reveals = document.querySelectorAll('.reveal');

let delay = 0;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      delay += 600; // delay each section reveal by 600ms
      setTimeout(() => {
        entry.target.classList.add('active');
      }, delay);
      observer.unobserve(entry.target); // prevent re-trigger
    }
  });
}, {
  threshold: 0.1
});

reveals.forEach((section) => {
  observer.observe(section);
});

// Optional: Smooth Scroll Polyfill for older browsers
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });