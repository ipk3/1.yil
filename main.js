const heart = document.getElementById("heart");
const particles = document.getElementById("particles");
let growInterval;
let currentScale = 1;

// Kalp büyümeye başlar
function startGrowing(x, y) {
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.opacity = 1;
  heart.style.transform = "translate(-50%, -50%) scale(1)";

  currentScale = 1;
  growInterval = setInterval(() => {
    currentScale += 0.05;
    if (currentScale > 5) currentScale = 5;
    heart.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
  }, 50);
}

// Kalp patlar ve parçacıklar uçar
function releaseHeart() {
  clearInterval(growInterval);
  heart.style.opacity = 0;

  const originX = heart.offsetLeft + 40;
  const originY = heart.offsetTop + 40;

  const particleCount = Math.round(currentScale * 3);
  const particleSize = 12 + currentScale * 5;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "heart-particle";

    const offsetX = (Math.random() - 0.5) * 150;
    const offsetY = -Math.random() * 150 - 50;

    particle.style.left = `${originX}px`;
    particle.style.top = `${originY}px`;
    particle.style.width = `${particleSize}px`;
    particle.style.height = `${particleSize}px`;
    particle.style.transition = "transform 1s ease, opacity 1s ease";

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.5)`;
      particle.style.opacity = 0;
    });

    particles.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// Masaüstü destek
document.body.addEventListener("mousedown", (e) => startGrowing(e.clientX, e.clientY));
document.body.addEventListener("mouseup", releaseHeart);

// Mobil destek
document.body.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startGrowing(touch.clientX, touch.clientY);
});
document.body.addEventListener("touchend", releaseHeart);


let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop) {
    // Aşağı kayıyor
    navbar.classList.add("hidden");
  } else {
    // Yukarı kayıyor
    navbar.classList.remove("hidden");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Negatif scroll'u engelle
});




// şarkı
function openMusicPlayer() {
  window.open('music-player.html', 'musicplayer', 'width=350,height=120');
}
