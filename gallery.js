function toggleGallery(id) {
  const section = document.getElementById(id);
  const isVisible = section.style.display === 'block';

  // Tümünü kapat
  document.querySelectorAll('.gallery-section').forEach(s => s.style.display = 'none');

  // Tıklananı aç veya kapat
  if (!isVisible) {
    section.style.display = 'block';
  }
}
  
// İlk açıldığında hiçbir galeri görünmesin (ya da birini otomatik açabilirsin)
// showGallery('section-you'); // Bunu açarsan "You" bölümü varsayılan açık olur


// Fotoğrafa tıklayınca lightbox aç
document.querySelectorAll(".photo-card img").forEach(img => {
  img.addEventListener("click", function (e) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = this.src;
    lightbox.style.display = "flex";
  });
});

// Lightbox kapatma
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

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
