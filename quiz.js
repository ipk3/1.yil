document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const answers = {
      q1: 'b',
      q2: 'a',
      q3: 'b',
      q4: 'c',
      q5: 'd',
      q6: 'a',
      q7: 'c',
      q8: 'c',
      q9: 'b',
      q10: 'd',
      q11: 'a',
      q12: 'b',
      q13: 'd',
      q14: 'e' // E şıkkı doğru olarak kabul ediliyor
    };
  
    let score = 0;
  
    for (let key in answers) {
      const userAnswer = document.querySelector(`input[name="${key}"]:checked`);
      if (userAnswer && userAnswer.value === answers[key]) {
        score++;
      }
    }
  
    const resultBox = document.getElementById('result');
    resultBox.style.display = 'block';
  
    let message = "";
  
    if (score === 0) {
      message = "Vay be... ayıp olmasın diye birini bilseydin bari 😒";
    } else if (score >= 1 && score <= 5) {
      message = "Olsun... hiç yoktan iyidir 😔";
    } else if (score >= 6 && score <= 9) {
      message = "Eeh fena değilsin biraz daha çalış 😊";
    } else if (score >= 10 && score <= 13) {
      message = "Harika gittin ama eksiklerin var 😍";
    } else if (score === 14) {
      message = "Aferin benim sevgilime tam puan aldın 🥳";
    }
  
    resultBox.innerHTML = `Puanın: ${score}/14<br>${message}`;
  });
  
  // 14. soru ❓ tıklanınca E şıkkını göster/gizle
  document.getElementById("toggle-e").addEventListener("click", function() {
    const eOption = document.getElementById("q14e");
    eOption.style.display = eOption.style.display === "none" ? "block" : "none";
  });
 
  
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
