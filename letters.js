// Zarfa tıklanınca aç/kapat
function openMiniEnvelope(el) {
    el.classList.toggle("open");
  }

function openMediumEnvelope(el) {
    el.classList.toggle("open");
  }

  function openBigEnvelope(el) {
    el.classList.toggle("open");
  }

  // Kağıdı büyüt
  function expandPaper(paper) {
    if (!paper.classList.contains('expanded')) {
      paper.classList.add('expanded');
    }
  }
  
  // Kağıdı kapat
  function closePaper(btn) {
    const paper = btn.closest('.big-paper');
    paper.classList.remove('expanded');
  }
  
  // UUUUUUU sonsuz scroll
  let maxUCount = 20;
  
  window.addEventListener("DOMContentLoaded", () => {
    const infiniteMessage = document.getElementById("infiniteMessage");
    const baseText = "IIIIII LOOOVEEE YOO";
    infiniteMessage.textContent = baseText + "UUUUU".repeat(maxUCount);
  
    window.addEventListener("scroll", () => {
      const scrollU = Math.floor(window.scrollY / 5);
      if (scrollU > maxUCount) {
        maxUCount = scrollU;
        const uText = "UUUUUUUUU".repeat(maxUCount);
        infiniteMessage.textContent = baseText + uText;
      }
    });
  
    // Yukarı çık butonu
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });
  
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  