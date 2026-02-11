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
    }
  ]
};

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
  
  // NOL 티켓 탭 기능
  const ticketTabs = document.querySelectorAll('.nol-ticket-tabs button');
  const ticketList = document.querySelector('.nol-ticket-list');
  
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
      }, 50);
    }, 300);
  }
  
});
