// ==========================================
// Hero 이미지 슬라이더 기능
// ==========================================

// 티켓 데이터
const ticketData = {
  뮤지컬: [
    {
      img: '../assets/P0004523_p.gif',
      name: '뮤지컬 <로미오와 줄리엣>',
      place: '한전아트센터'
    },
    {
      img: '../assets/26000541_p.gif',
      name: '뮤지컬 <빌리 엘리어트>',
      place: '블루스퀘어 우리은행홀'
    },
    {
      img: '../assets/26001001_p.gif',
      name: '튜링머신',
      place: '세종문화회관 S씨어터'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '뮤지컬 <킹키부츠>',
      place: '샤롯데씨어터'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '뮤지컬 <비틀쥬스>',
      place: 'LG아트센터 서울'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '뮤지컬 <레베카>',
      place: '샤롯데씨어터'
    }
  ],
  콘서트: [
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: 'IU 콘서트 <더 골든 아워>',
      place: '서울 올림픽공원 KSPO DOME'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: 'DAY6 콘서트',
      place: '고척스카이돔'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '아이브 콘서트',
      place: 'KSPO DOME'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '세븐틴 월드투어',
      place: '잠실종합운동장'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '뉴진스 팬미팅',
      place: '고척스카이돔'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '임영웅 콘서트',
      place: '고척스카이돔'
    }
  ],
  '전시/행사': [
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '모네 빛의 경험',
      place: '서울 DDP'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '고흐 인사이드',
      place: '세텍 1층 전시장'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '팀랩 플래닛',
      place: '잠실 롯데월드타워'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '백남준 특별전',
      place: '국립현대미술관'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '제임스 진 개인전',
      place: '예술의전당'
    },
    {
      img: '../assets/632b17c3b0ecb2.60292758.png',
      name: '디즈니 100주년 특별전',
      place: 'DDP'
    }
  ]
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // Hero 슬라이더 기능
  // ==========================================
  
  const heroSlides = document.querySelector('.nol-hero__slides');
  const heroImages = heroSlides ? heroSlides.querySelectorAll('img') : [];
  const heroLeftArrow = document.querySelector('.nol-hero__rail .nol-arrow--left');
  const heroRightArrow = document.querySelector('.nol-hero__rail .nol-arrow--right');
  const heroDots = document.querySelectorAll('.nol-hero__meta .nol-dot');
  const heroPauseBtn = document.querySelector('.nol-hero__pause');
  const heroCount = document.querySelector('.nol-hero__count');
  
  let currentSlide = 0;
  let autoPlayInterval = null;
  let isPlaying = true;
  
  if (heroSlides && heroImages.length > 0) {
    // 초기 설정
    heroSlides.style.display = 'flex';
    heroSlides.style.transition = 'transform 360ms ease';
    
    heroImages.forEach((img, index) => {
      img.style.flex = '0 0 100%';
      img.style.maxWidth = '100%';
      img.style.display = 'block';
    });
    
    // 슬라이드 이동 함수
    function goToSlide(index) {
      if (index < 0) index = heroImages.length - 1;
      if (index >= heroImages.length) index = 0;
      
      currentSlide = index;
      
      // 슬라이드 이동
      heroSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Dot 업데이트
      heroDots.forEach((dot, i) => {
        if (i === currentSlide) {
          dot.classList.add('nol-dot--active');
        } else {
          dot.classList.remove('nol-dot--active');
        }
      });
      
      // 카운트 업데이트
      if (heroCount) {
        heroCount.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(heroImages.length).padStart(2, '0')}+`;
      }
    }
    
    // 좌우 화살표 클릭
    if (heroLeftArrow) {
      heroLeftArrow.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
      });
    }
    
    if (heroRightArrow) {
      heroRightArrow.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
      });
    }
    
    // Dot 클릭
    heroDots.forEach((dot, index) => {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
      });
    });
    
    // 자동 재생 시작
    function startAutoPlay() {
      if (autoPlayInterval) return;
      isPlaying = true;
      if (heroPauseBtn) heroPauseBtn.textContent = 'Ⅱ';
      
      autoPlayInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 4000); // 4초마다 자동 전환
    }
    
    // 자동 재생 중지
    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
      isPlaying = false;
      if (heroPauseBtn) heroPauseBtn.textContent = '▶';
    }
    
    // 자동 재생 재시작
    function resetAutoPlay() {
      if (isPlaying) {
        stopAutoPlay();
        startAutoPlay();
      }
    }
    
    // 일시정지/재생 버튼
    if (heroPauseBtn) {
      heroPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      });
    }
    
    // 터치/마우스 스와이프 기능
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    
    heroSlides.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    heroSlides.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    heroSlides.addEventListener('mousedown', (e) => {
      isDragging = true;
      touchStartX = e.screenX;
      heroSlides.style.cursor = 'grabbing';
    });
    
    heroSlides.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });
    
    heroSlides.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      touchEndX = e.screenX;
      heroSlides.style.cursor = 'grab';
      handleSwipe();
    });
    
    heroSlides.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        heroSlides.style.cursor = 'grab';
      }
    });
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // 왼쪽으로 스와이프 (다음)
          goToSlide(currentSlide + 1);
        } else {
          // 오른쪽으로 스와이프 (이전)
          goToSlide(currentSlide - 1);
        }
        resetAutoPlay();
      }
    }
    
    heroSlides.style.cursor = 'grab';
    
    // 초기 실행
    goToSlide(0);
    startAutoPlay();
  }
  
  // ==========================================
  // NOL 티켓 탭 기능
  // ==========================================
  
  // NOL 티켓 탭 기능
  const ticketTabs = document.querySelectorAll('.nol-ticket-tabs button');
  const ticketList = document.querySelector('.nol-ticket-list');
  const ticketLeftArrow = document.querySelector('.nol-ticket-carousel .nol-arrow--left');
  const ticketRightArrow = document.querySelector('.nol-ticket-carousel .nol-arrow--right');
  
  if (ticketTabs.length > 0 && ticketList) {
    ticketTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // 모든 탭의 active 클래스 제거
        ticketTabs.forEach(t => t.classList.remove('active'));
        
        // 클릭한 탭에 active 클래스 추가
        this.classList.add('active');
        
        // 선택된 카테고리
        const category = this.textContent.trim();
        
        // 티켓 리스트 업데이트
        updateTicketList(category);
      });
    });
  }
  
  // 티켓 리스트 업데이트 함수
  function updateTicketList(category) {
    const tickets = ticketData[category];
    
    if (!tickets) return;
    
    // 페이드 아웃 효과
    ticketList.style.opacity = '0';
    ticketList.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      // HTML 생성
      ticketList.innerHTML = tickets.map(ticket => `
        <li class="ticket-card">
          <img class="nol-poster" src="${ticket.img}" alt="${ticket.name}">
          <p class="ticket-name">${ticket.name}</p>
          <span class="ticket-place">${ticket.place}</span>
        </li>
      `).join('');
      
      // 페이드 인 효과
      setTimeout(() => {
        ticketList.style.opacity = '1';
        ticketList.style.transform = 'translateY(0)';
        
        // 스크롤 위치 초기화
        ticketList.scrollLeft = 0;
        updateArrowStates();
      }, 50);
    }, 300);
  }
  
  // ==========================================
  // 좌우 화살표 스크롤 기능
  // ==========================================
  
  if (ticketLeftArrow && ticketRightArrow && ticketList) {
    // 왼쪽 화살표 클릭
    ticketLeftArrow.addEventListener('click', function() {
      ticketList.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    });
    
    // 오른쪽 화살표 클릭
    ticketRightArrow.addEventListener('click', function() {
      ticketList.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    });
    
    // 스크롤 시 화살표 상태 업데이트
    ticketList.addEventListener('scroll', updateArrowStates);
    
    // 초기 화살표 상태 설정
    updateArrowStates();
  }
  
  // 화살표 버튼 활성화/비활성화 함수
  function updateArrowStates() {
    if (!ticketList || !ticketLeftArrow || !ticketRightArrow) return;
    
    const scrollLeft = ticketList.scrollLeft;
    const maxScroll = ticketList.scrollWidth - ticketList.clientWidth;
    
    // 왼쪽 화살표
    if (scrollLeft <= 0) {
      ticketLeftArrow.disabled = true;
      ticketLeftArrow.style.opacity = '0.3';
    } else {
      ticketLeftArrow.disabled = false;
      ticketLeftArrow.style.opacity = '1';
    }
    
    // 오른쪽 화살표
    if (scrollLeft >= maxScroll - 5) { // 5px 여유
      ticketRightArrow.disabled = true;
      ticketRightArrow.style.opacity = '0.3';
    } else {
      ticketRightArrow.disabled = false;
      ticketRightArrow.style.opacity = '1';
    }
  }
  
  // ==========================================
  // 마우스 드래그 스크롤 기능
  // ==========================================
  
  let isDragging = false;
  let startX;
  let scrollLeftStart;
  
  ticketList.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.pageX - ticketList.offsetLeft;
    scrollLeftStart = ticketList.scrollLeft;
    ticketList.style.cursor = 'grabbing';
    ticketList.style.userSelect = 'none';
  });
  
  ticketList.addEventListener('mouseleave', function() {
    isDragging = false;
    ticketList.style.cursor = 'default';
  });
  
  ticketList.addEventListener('mouseup', function() {
    isDragging = false;
    ticketList.style.cursor = 'default';
  });
  
  ticketList.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ticketList.offsetLeft;
    const walk = (x - startX) * 2; // 스크롤 속도 조절
    ticketList.scrollLeft = scrollLeftStart - walk;
  });
  
});
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
