const items = document.querySelectorAll(".gallery .item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const head = document.querySelector(".site-header");

// NEW (buttons)
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// NEW (current images logic)
let currentIndex = 0;
let visibleImages = [];

// GET ONLY CURRENT PAGE IMAGES
function getVisibleImages() {
  return Array.from(document.querySelectorAll(".gallery .col-lg-4"))
    .filter(col => col.style.display !== "none")
    .map(col => col.querySelector("img"));
}

// OPEN LIGHTBOX
items.forEach((img) => {
  img.addEventListener("click", () => {

    visibleImages = getVisibleImages();
    currentIndex = visibleImages.indexOf(img);

    showImage();
    lightbox.style.display = "flex";
    head.style.display = "none";
  });
});

// SHOW IMAGE
function showImage() {
  lightboxImg.src = visibleImages[currentIndex].src;
}

// NEXT
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % visibleImages.length;
  showImage();
});

// PREV
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  showImage();
});

// CLOSE BUTTON
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  head.style.display = "";
});

// CLICK OUTSIDE CLOSE
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    head.style.display = "";
  }
});

// KEYBOARD SUPPORT 🔥
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % visibleImages.length;
      showImage();
    }
    if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
      showImage();
    }
    if (e.key === "Escape") {
      lightbox.style.display = "none";
      head.style.display = "";
    }
  }
});


// ================= PAGINATION (UNCHANGED) =================

const galleryCols = document.querySelectorAll(".gallery .col-lg-4");
const pagination = document.getElementById("pagination");

const itemsPerPage = 6;
let currentPage = 1;

const totalPages = Math.ceil(galleryCols.length / itemsPerPage);

function showPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  galleryCols.forEach((col, index) => {
    col.style.display =
      index >= start && index < end ? "block" : "none";
  });

  renderPagination();
}

function renderPagination() {
  pagination.innerHTML = "";

  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a href="#" class="page-link" data-page="prev">Previous</a>
    </li>
  `;

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a href="#" class="page-link" data-page="${i}">${i}</a>
      </li>
    `;
  }

  pagination.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a href="#" class="page-link" data-page="next">Next</a>
    </li>
  `;
}

pagination.addEventListener("click", (e) => {
  e.preventDefault();

  const page = e.target.dataset.page;
  if (!page) return;

  if (page === "prev") showPage(currentPage - 1);
  else if (page === "next") showPage(currentPage + 1);
  else showPage(parseInt(page));

  window.scrollTo({ top: 0, behavior: "smooth" });
});

showPage(1);

// footer
document.querySelectorAll(".year").forEach(el => {
  el.textContent = new Date().getFullYear();
});