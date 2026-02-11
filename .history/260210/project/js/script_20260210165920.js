/* ../js/script.js
   NOL Mock interactions (vanilla JS)
*/
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // -----------------------------
  // 1) HERO slider (2-up rail)
  // -----------------------------
  function initHeroSlider() {
    const rail = $(".nol-hero__rail");
    if (!rail) return;

    const slidesWrap = $(".nol-hero__slides", rail);
    const slides = $$("img", slidesWrap);
    const btnPrev = $(".nol-arrow--left", rail);
    const btnNext = $(".nol-arrow--right", rail);

    const metaRoot = rail.closest(".nol-hero") || document;
    const pauseBtn = $(".nol-hero__pause", metaRoot);
    const dotsWrap = $(".nol-dots", metaRoot);
    const dots = dotsWrap ? $$(":scope > .nol-dot", dotsWrap) : [];
    const countEl = $(".nol-hero__count", metaRoot);

    if (!slidesWrap || slides.length === 0) return;

    let idx = 0;
    let isPaused = false;
    let timer = null;
    const INTERVAL = 4500;

    // Build basic slider styles if not present
    slidesWrap.style.display = "flex";
    slidesWrap.style.transition = "transform 360ms ease";
    slidesWrap.style.willChange = "transform";

    slides.forEach((img) => {
      img.style.flex = "0 0 100%";
      img.style.maxWidth = "100%";
      img.style.display = "block";
    });

    const setDots = (i) => {
      if (!dots.length) return;
      dots.forEach((d, di) => d.classList.toggle("nol-dot--active", di === i));
    };

    const setCount = (i) => {
      if (!countEl) return;
      const current = String(i + 1).padStart(2, "0");
      const total = String(slides.length).padStart(2, "0");
      countEl.textContent = `${current} / ${total}+`;
    };

    const go = (nextIdx) => {
      idx = (nextIdx + slides.length) % slides.length;
      const x = -idx * 100;
      slidesWrap.style.transform = `translateX(${x}%)`;
      setDots(idx);
      setCount(idx);
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => {
        if (!isPaused) go(idx + 1);
      }, INTERVAL);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    btnPrev?.addEventListener("click", () => go(idx - 1));
    btnNext?.addEventListener("click", () => go(idx + 1));

    // Pause button
    pauseBtn?.addEventListener("click", () => {
      isPaused = !isPaused;
      pauseBtn.setAttribute("aria-label", isPaused ? "재생" : "일시정지");
      pauseBtn.textContent = isPaused ? "▶" : "Ⅱ";
    });

    // Dot click (if dots exist)
    dots.forEach((d, di) => {
      d.style.cursor = "pointer";
      d.addEventListener("click", () => go(di));
    });

    // Pause on hover (desktop)
    rail.addEventListener("mouseenter", () => (isPaused = true));
    rail.addEventListener("mouseleave", () => (isPaused = false));

    // Init
    go(0);
    start();

    // Responsive: ensure transform stays correct on resize
    window.addEventListener("resize", () => go(idx));
  }

  // -----------------------------
  // 2) Generic horizontal carousel
  //    (applies to every .nol-carousel)
  // -----------------------------
  function initCarousels() {
    const carousels = $$(".nol-carousel");
    if (!carousels.length) return;

    carousels.forEach((root) => {
      const track = $(".nol-track", root);
      const prev = $(".nol-arrow--left", root);
      const next = $(".nol-arrow--right", root);
      if (!track) return;

      // Make sure track scrolls nicely
      track.style.scrollBehavior = "smooth";

      const getStep = () => {
        // Step = one card width + gap (best effort)
        const firstChild = track.firstElementChild;
        if (!firstChild) return 320;

        const childRect = firstChild.getBoundingClientRect();
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || "0") || 0;
        return Math.max(240, Math.round(childRect.width + gap));
      };

      const updateDisabled = () => {
        const maxScrollLeft = track.scrollWidth - track.clientWidth - 1;
        if (prev) prev.disabled = track.scrollLeft <= 0;
        if (next) next.disabled = track.scrollLeft >= maxScrollLeft;
      };

      const scrollByStep = (dir) => {
        const step = getStep();
        track.scrollBy({ left: dir * step, behavior: "smooth" });
        // update after scroll settles
        window.setTimeout(updateDisabled, 250);
      };

      prev?.addEventListener("click", () => scrollByStep(-1));
      next?.addEventListener("click", () => scrollByStep(1));

      track.addEventListener("scroll", () => updateDisabled());
      window.addEventListener("resize", () => updateDisabled());

      // Keyboard support when focused
      track.setAttribute("tabindex", "0");
      track.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") scrollByStep(-1);
        if (e.key === "ArrowRight") scrollByStep(1);
      });

      updateDisabled();
    });
  }

  // -----------------------------
  // 3) Ticket section tabs (with content swap)
  // -----------------------------
  const TICKET_DATA = {
    "뮤지컬": [
      {
        img: "../assets/P0004523_p.gif",
        alt: "로미오와 줄리엣",
        title: "뮤지컬 <로미오와 줄리엣>",
        place: "한전아트센터",
      },
      {
        img: "../assets/26000541_p.gif",
        alt: "빌리 엘리어트",
        title: "뮤지컬 <빌리 엘리어트>",
        place: "블루스퀘어 우리은행홀",
      },
      {
        img: "../assets/26001001_p.gif",
        alt: "튜링머신",
        title: "튜링머신",
        place: "세종문화회관 S씨어터",
      },
    ],
    "콘서트": [
      {
        img: "../assets/26001001_p.gif",
        alt: "콘서트 A",
        title: "콘서트 <NOL LIVE STAGE>",
        place: "올림픽홀",
      },
      {
        img: "../assets/26000541_p.gif",
        alt: "콘서트 B",
        title: "콘서트 <THE NIGHT>",
        place: "블루스퀘어 마스터카드홀",
      },
      {
        img: "../assets/P0004523_p.gif",
        alt: "콘서트 C",
        title: "콘서트 <CITY POP>",
        place: "코엑스",
      },
    ],
    "전시/행사": [
      {
        img: "../assets/26000541_p.gif",
        alt: "전시 A",
        title: "전시 <ART WEEK>",
        place: "DDP",
      },
      {
        img: "../assets/P0004523_p.gif",
        alt: "행사 B",
        title: "행사 <FESTA>",
        place: "한강공원",
      },
      {
        img: "../assets/26001001_p.gif",
        alt: "전시 C",
        title: "전시 <MUSEUM NIGHT>",
        place: "국립중앙박물관",
      },
    ],
  };

  function initTicketTabs() {
    const section = $(".nol-ticket-section");
    if (!section) return;

    const tabsWrap = $(".nol-ticket-tabs", section);
    const tabs = tabsWrap ? $$("button", tabsWrap) : [];
    const list = $(".nol-ticket-list", section);
    if (!tabs.length || !list) return;

    const render = (key) => {
      const items = TICKET_DATA[key] || [];
      list.innerHTML = items
        .map(
          (it) => `
          <li class="ticket-card">
            <img class="nol-poster" src="${it.img}" alt="${it.alt}">
            <p class="ticket-name">${escapeHTML(it.title)}</p>
            <span class="ticket-place">${escapeHTML(it.place)}</span>
          </li>
        `
        )
        .join("");
    };

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const key = btn.textContent.trim();
        render(key);
      });
    });

    // initial render based on current active
    const active = tabs.find((b) => b.classList.contains("active")) || tabs[0];
    render(active.textContent.trim());
  }

  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // -----------------------------
  // 4) Generic tab UI (ranking/hotel etc.)
  //    Only toggles active class
  // -----------------------------
  function initGenericTabs() {
    // ranking section tabs: .nol-tabs .nol-tab
    $$(".nol-tabs").forEach((wrap) => {
      const btns = $$("button.nol-tab", wrap);
      if (!btns.length) return;

      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          btns.forEach((b) => b.classList.remove("nol-tab--active"));
          btn.classList.add("nol-tab--active");
          // demo: could filter content by category here
        });
      });
    });
  }

  // -----------------------------
  // 5) Small demo interactions
  // -----------------------------
  function initMisc() {
    // Search enter (demo)
    const searchInput = $(".search input");
    searchInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = searchInput.value.trim();
        if (!q) return;
        alert(`검색(데모): ${q}`);
      }
    });

    // Hamburger toggle (demo)
    const hamb = $(".hamburger");
    hamb?.addEventListener("click", () => {
      document.body.classList.toggle("is-menu-open");
      // 필요하면 여기서 실제 메뉴 패널 열기 구현
    });

    // Prevent "#" jump (optional)
    $$('a[href="#"]').forEach((a) => {
      a.addEventListener("click", (e) => e.preventDefault());
    });
  }

  // -----------------------------
  // Boot
  // -----------------------------
  document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initCarousels();
    initTicketTabs();
    initGenericTabs();
    initMisc();
  });
})();
