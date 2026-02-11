// ==========================================
// NOL 티켓 탭 전환 기능
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
