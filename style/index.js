//Intersection Observer (Scroll animation)
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".anim-up")
    .forEach((el) => io.observe(el));


// Initial Hero Load Animation (OLD DOMContentLoaded logic)
  document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero-inner");
    if (hero) {
      setTimeout(() => {
        hero.classList.add("visible");
      }, 200);
    }
  });

  const lightbox = document.getElementById("lightbox");
      const frame = document.getElementById("lb-frame");
      const closeBtn = document.getElementById("lb-close");

      document.querySelectorAll(".video-thumb").forEach((card) => {
        card.addEventListener("click", () => {
          const url = card.getAttribute("data-video");
          frame.src = url + "?autoplay=1&rel=0&mute=0";
          lightbox.style.display = "flex";
        });
      });

      closeBtn.addEventListener("click", () => {
        frame.src = "";
        lightbox.style.display = "none";
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          frame.src = "";
          lightbox.style.display = "none";
        }
      });

document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });


  const megaToggle = document.querySelector('.dropdown-mega > .nav-link');
const body = document.body;
megaToggle.addEventListener('click', () => {
  body.classList.toggle('menu-open');
});
