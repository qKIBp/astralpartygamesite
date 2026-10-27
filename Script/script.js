/**
 * Astral Party - Official Promotion Page
 * Pure Vanilla JS + GSAP + ScrollTrigger + Lenis.js + Swiper.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Lenis.js Smooth Scroll & GSAP ScrollTrigger Integration
  // ==========================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Sync Lenis scroll with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // ==========================================
  // 2. Swiper.js Banner Carousel
  // ==========================================
  const bannerSwiper = new Swiper('.banner-swiper', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    effect: 'slide',
    grabCursor: true,
    pagination: {
      el: '.swiper-custom-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    },
    spaceBetween: 24,
    slidesPerView: 1,
  });

  // ==========================================
  // 3. Notice Tab System (Vanilla JS)
  // ==========================================
  const noticeData = [
    {
      id: 1,
      title: '캐릭터 선택 상자 (시즌 1&2) 리셋 및 보상 안내',
      date: '2026.10.27',
      category: '이벤트',
      thumb: './Images/notice_thumb.png',
      desc: '신규 시즌 개막을 기념하여 캐릭터 선택 상자 및 다양한 접속 보상 아이템 지급 이벤트가 시작됩니다. 매일 접속하여 풍성한 보상과 특별 주사위 스킨을 획득하세요!'
    },
    {
      id: 2,
      title: 'v2.4.0 신규 캐릭터 업데이트 패치노트',
      date: '2026.10.20',
      category: '패치노트',
      thumb: './Images/notice_thumb.png',
      desc: '신규 플레이어블 캐릭터 및 전용 카드가 파티에 합류했습니다! 신규 스킬 메커니즘과 밸런스 조정 상세 내역을 지금 바로 확인해 보세요.'
    },
    {
      id: 3,
      title: '스팀(Steam) 글로벌 가을 파티 페스티벌 진행',
      date: '2026.10.15',
      category: '이벤트',
      thumb: './Images/notice_thumb.png',
      desc: '친구와 함께 주사위를 굴리고 한정판 아바타 프레임을 차지하세요. 페스티벌 기간 동안 주사위 획득 확률 2배 부스트가 상시 적용됩니다.'
    },
    {
      id: 4,
      title: '안정적인 멀티플레이 매칭 서버 점검 완료',
      date: '2026.10.10',
      category: '공지사항',
      thumb: './Images/notice_thumb.png',
      desc: '글로벌 룸 매칭 레이턴시 개선 및 일부 네트워크 연결 지연 현상이 모두 해결되었습니다. 더욱 쾌적해진 환경에서 즐거운 파티를 즐기세요.'
    },
    {
      id: 5,
      title: '커뮤니티 팬아트 공모전 수상작 발표',
      date: '2026.10.05',
      category: '커뮤니티',
      thumb: './Images/notice_thumb.png',
      desc: '많은 유저분들께서 보내주신 정성 어린 출품작 중 당선작이 선정되었습니다. 공식 디스코드 채널에서 멋진 작품들을 감상하고 투표에 참여해 보세요!'
    }
  ];

  const noticeTabs = document.querySelectorAll('.notice-tab-btn');
  const noticeViewThumb = document.getElementById('notice-view-thumb');
  const noticeViewCategory = document.getElementById('notice-view-category');
  const noticeViewDate = document.getElementById('notice-view-date');
  const noticeViewTitle = document.getElementById('notice-view-title');
  const noticeViewDesc = document.getElementById('notice-view-desc');
  const noticeViewer = document.getElementById('notice-viewer-content');

  noticeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = parseInt(tab.dataset.id, 10);
      const data = noticeData.find(item => item.id === targetId);
      if (!data) return;

      // Update Active Tab Styles
      noticeTabs.forEach(t => {
        t.classList.remove('bg-[#4E5162]', 'text-white', 'border-l-4', 'border-[#EF25CB]');
        t.classList.add('bg-[#333642]', 'text-gray-300');
      });
      tab.classList.remove('bg-[#333642]', 'text-gray-300');
      tab.classList.add('bg-[#4E5162]', 'text-white', 'border-l-4', 'border-[#EF25CB]');

      // Animate View Transition with GSAP
      gsap.to(noticeViewer, {
        opacity: 0,
        y: 6,
        duration: 0.18,
        onComplete: () => {
          if (noticeViewCategory) noticeViewCategory.textContent = data.category;
          if (noticeViewDate) noticeViewDate.textContent = data.date;
          if (noticeViewTitle) noticeViewTitle.textContent = data.title;
          if (noticeViewDesc) noticeViewDesc.textContent = data.desc;
          if (noticeViewThumb) noticeViewThumb.src = data.thumb;

          gsap.to(noticeViewer, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: 'power2.out'
          });
        }
      });
    });
  });

  // ==========================================
  // 4. GSAP & ScrollTrigger Animations
  // ==========================================
  gsap.registerPlugin(ScrollTrigger);

  // Fade-in-up animation for main sections
  const revealElements = [
    { target: '.hero-video-section', y: 30, delay: 0.1 },
    { target: '.carousel-section', y: 40, delay: 0.15 },
    { target: '.content-grid-section', y: 40, delay: 0.2 },
    { target: '.bottom-links-section', y: 20, delay: 0.1 },
    { target: '.footer-section', y: 30, delay: 0.1 }
  ];

  revealElements.forEach(item => {
    const el = document.querySelector(item.target);
    if (!el) return;

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: item.y,
      duration: 0.9,
      ease: 'power3.out',
      delay: item.delay || 0
    });
  });

  // ==========================================
  // 5. Floating Button (Mirage Knight) Scroll-to-top & Footer Collision
  // ==========================================
  const floatingBtn = document.querySelector('.floating-action-btn');
  const footer = document.querySelector('.footer-section');

  if (floatingBtn) {
    // 클릭 시 최상단으로 부드러운 스크롤
    floatingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    });

    // 푸터 영역 침범 방지: 푸터가 올라오면 푸터 상단으로부터 2rem(32px) 위에 멈추도록 동적 제어
    const updateFloatingBtnPosition = () => {
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const defaultBottom = 32; // 2rem (32px)

      // 푸터 상단이 뷰포트 하단(화면 바닥) 안으로 들어왔을 때
      if (footerRect.top < windowHeight) {
        const pushUp = windowHeight - footerRect.top;
        floatingBtn.style.bottom = `${defaultBottom + pushUp}px`;
      } else {
        floatingBtn.style.bottom = `${defaultBottom}px`;
      }
    };

    // Lenis 스무스 스크롤 및 창 크기 변경 이벤트에 바인딩
    lenis.on('scroll', updateFloatingBtnPosition);
    window.addEventListener('scroll', updateFloatingBtnPosition, { passive: true });
    window.addEventListener('resize', updateFloatingBtnPosition);
    updateFloatingBtnPosition();
  }

  // ==========================================
  // 6. Navigation Dropdown Animations
  // ==========================================
  const navItems = document.querySelectorAll('.nav-menu-item');
  navItems.forEach(item => {
    const submenu = item.querySelector('.nav-submenu');
    if (!submenu) return;

    item.addEventListener('mouseenter', () => {
      gsap.killTweensOf(submenu);
      submenu.style.display = 'block';
      gsap.fromTo(submenu, 
        { opacity: 0, y: -6, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
      );
    });

    item.addEventListener('mouseleave', () => {
      gsap.killTweensOf(submenu);
      gsap.to(submenu, {
        opacity: 0,
        y: -6,
        scale: 0.98,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          submenu.style.display = 'none';
        }
      });
    });
  });
});
