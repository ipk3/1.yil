const headImg = new Image();
headImg.src = 'oyun/yilan.jpeg'; // yılanın kafası (senin foto)

const foodImg = new Image();
foodImg.src = 'oyun/yem.jpeg'; // yem (benim foto)

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

// Grid ayarları
const gridSize = 35;
const tileCount = 15;

// Canvas boyutunu tam oturt
canvas.width = gridSize * tileCount;
canvas.height = gridSize * tileCount;

let snake = [{ x: 10, y: 10 }];
let dx = 0;
let dy = 0;
let food = { x: 5, y: 5 };
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameStarted = false;

const updateScoreDisplay = () => {
  scoreElement.innerHTML = `En Yüksek: ${highScore}<br><br>Skor: ${score}`;
};

document.getElementById("startButton").addEventListener("click", () => {
  gameStarted = true;
  document.getElementById("startButton").style.display = "none";
  canvas.style.display = "block";
  scoreElement.style.display = "block";
  draw();
  updateScoreDisplay();
});

document.addEventListener("keydown", e => {
  if (!gameStarted) return;
  if (["ArrowUp", "w"].includes(e.key) && dy === 0) { dx = 0; dy = -1; }
  else if (["ArrowDown", "s"].includes(e.key) && dy === 0) { dx = 0; dy = 1; }
  else if (["ArrowLeft", "a"].includes(e.key) && dx === 0) { dx = -1; dy = 0; }
  else if (["ArrowRight", "d"].includes(e.key) && dx === 0) { dx = 1; dy = 0; }

  if (e.key === "Enter") {
    const startBtn = document.getElementById("startButton");
    if (startBtn && startBtn.style.display !== "none") {
      startBtn.click();
    }
  }
});

// Mobil swipe kontrolleri
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchmove", e => {
  const dxTouch = e.touches[0].clientX - touchStartX;
  const dyTouch = e.touches[0].clientY - touchStartY;

  if (Math.abs(dxTouch) > Math.abs(dyTouch)) {
    if (dxTouch > 30 && dx !== -1) { dx = 1; dy = 0; }
    else if (dxTouch < -30 && dx !== 1) { dx = -1; dy = 0; }
  } else {
    if (dyTouch > 30 && dy !== -1) { dx = 0; dy = 1; }
    else if (dyTouch < -30 && dy !== 1) { dx = 0; dy = -1; }
  }

  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

function gameLoop() {
  if (!gameStarted || (dx === 0 && dy === 0)) {
    draw();
    return;
  }

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      alert("Yeni Rekor :0 Afied olsuun! Skor: " + score);
    } else {
      alert("Afied olsuun! Skor: " + score);
    }

    snake = [{ x: 10, y: 10 }];
    dx = 0; dy = 0;
    score = 0;
    food = { x: 5, y: 5 };
    gameStarted = false;
    document.getElementById("startButton").style.display = "inline-block";
    canvas.style.display = "none";
    scoreElement.style.display = "none";
    updateScoreDisplay();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  updateScoreDisplay();
  draw();
}

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  snake.forEach((part, index) => {
    if (index === 0) {
      ctx.drawImage(headImg, part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    } else {
      ctx.fillStyle = "#c99a7d";
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize - 1);
    }
  });

  ctx.drawImage(foodImg, food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

setInterval(gameLoop, 100);


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
