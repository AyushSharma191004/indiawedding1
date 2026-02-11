const items = document.querySelectorAll(".gallery .item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close");
  // const head=document.getElementsByClassName("header");
  const head = document.querySelector(".site-header");


  items.forEach(img => {
    img.addEventListener("click", () => {
      // console.log(head);
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
      // head.style.display="none !important"
      head.style.display = "none";
      // head.setAttribute("style", "display:none !important");


    });
  });

  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
    

    head.style.display = "";
  });

  // Close when clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });




// pagination
const galleryCols = document.querySelectorAll(".gallery .col-lg-4");
const pagination = document.getElementById("pagination");

const itemsPerPage = 6;
let currentPage = 1;

const totalPages = Math.ceil(galleryCols.length / itemsPerPage);

// SHOW PAGE
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

// RENDER PAGINATION (Bootstrap markup)
function renderPagination() {
  pagination.innerHTML = "";

  // PREVIOUS
  pagination.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a href="#" class="page-link" data-page="prev">Previous</a>
    </li>
  `;

  // PAGE NUMBERS
  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a href="#" class="page-link" data-page="${i}">${i}</a>
      </li>
    `;
  }

  // NEXT
  pagination.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a href="#" class="page-link" data-page="next">Next</a>
    </li>
  `;
}

// CLICK HANDLER
pagination.addEventListener("click", (e) => {
  e.preventDefault();

  const page = e.target.dataset.page;
  if (!page) return;

  if (page === "prev") showPage(currentPage - 1);
  else if (page === "next") showPage(currentPage + 1);
  else showPage(parseInt(page));

  window.scrollTo({ top: 0, behavior: "smooth" });
});

// INIT
showPage(1);

// footer
  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });