   // Utility to parse numbers
      const toNum = (v) => parseInt(v, 10) || 0;

      // elements
      const cardsWrap = document.getElementById("cards");
      const cards = Array.from(cardsWrap.querySelectorAll(".card"));
      const countEl = document.getElementById("count");
      const searchInput = document.getElementById("search");
      const roomsRange = document.getElementById("rooms-range");
      const guestsRange = document.getElementById("guests-range");
      const roomsVal = document.getElementById("rooms-val");
      const guestsVal = document.getElementById("guests-val");

      // set initial values display
      roomsVal.textContent = `[0 - ${roomsRange.value}]`;
      guestsVal.textContent = `[0 - ${guestsRange.value}]`;

      // filter state getters
      function getCheckedValues(selector) {
        return Array.from(document.querySelectorAll(selector))
          .filter((i) => i.checked)
          .map((i) => i.value);
      }

      function applyFilters() {
        const q = (searchInput.value || "").trim().toLowerCase();
        const cities = getCheckedValues(".filter-city");
        const types = getCheckedValues(".filter-type");
        const stars = getCheckedValues(".filter-star").map((s) => s);
        const maxRooms = toNum(roomsRange.value);
        const maxGuests = toNum(guestsRange.value);

        let shown = 0;
        cards.forEach((card) => {
          const city = card.dataset.city;
          const type = card.dataset.type;
          const starsVal = toNum(card.dataset.stars);
          const rooms = toNum(card.dataset.rooms);
          const guests = toNum(card.dataset.guests);
          const title = card.querySelector("h3").textContent.toLowerCase();

          // city/type/star filters
          const okCity = cities.includes(city);
          const okType = types.includes(type);
          const okStar = stars.includes(String(starsVal));
          // range filters
          const okRooms = rooms <= maxRooms;
          const okGuests = guests <= maxGuests;
          // search
          const okSearch =
            q === "" || title.includes(q) || city.toLowerCase().includes(q);

          const visible =
            okCity && okType && okStar && okRooms && okGuests && okSearch;
          card.style.display = visible ? "flex" : "none";
          if (visible) shown++;
        });

        countEl.textContent = shown;
        document.getElementById("noResults").style.display = shown
          ? "none"
          : "block";
      }

      // events: checkboxes
      document
        .querySelectorAll(".filter-city, .filter-type, .filter-star")
        .forEach((el) => {
          el.addEventListener("change", applyFilters);
        });

      // search
      searchInput.addEventListener("input", () => {
        // small debounce
        if (window._searchTimer) clearTimeout(window._searchTimer);
        window._searchTimer = setTimeout(() => applyFilters(), 150);
      });

      // ranges
      roomsRange.addEventListener("input", () => {
        roomsVal.textContent = `[0 - ${roomsRange.value}]`;
        applyFilters();
      });
      guestsRange.addEventListener("input", () => {
        guestsVal.textContent = `[0 - ${guestsRange.value}]`;
        applyFilters();
      });

      // init
      applyFilters();

      // simple CTA
      function scrollToContact() {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }

  document.querySelectorAll(".year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });