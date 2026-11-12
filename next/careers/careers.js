/* TAP SHOP BAR Careers (미리보기 c1)
   #/            채용 홈 (회사 소개 · 철학 · 사진 · 복지 · SNS · 공고)
   #/job/<id>    직무 설명(JD)
   #/apply/<id>  3분 지원 (7단계, 철학 질문 5개 포함)
   #/done        접수 완료 · 자동 안내
   #/status/<no> 내 지원 상태
   #/welcome     합격자: 개인 이메일 → 회사 ID 만들기 → 메일 미리보기 → 온보딩(첫걸음)
   서버 연결 전 미리보기: 제출·발송·계정 생성 없음. */
(function () {
  const PV = true;
  const $ = s => document.querySelector(s);
  const e = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const IMG = 'careers/';
  const SNS = { ig: 'https://www.instagram.com/tap.shop.bar/', yt: 'https://www.youtube.com/@tappingseoul', web: 'https://tsb.wine/' };
  const BR = [{ k: '청계', d: '종각 · 삼일빌딩' }, { k: '상암', d: 'DMC' }, { k: '마곡', d: '마곡나루' }, { k: '동대문', d: '두타' }];
  const JOBS = [
    { id: 'hall-pt', own: [['한 잔을 쉽게 소개해요', '처음 온 손님께 "상큼해요, 부드러워요"처럼 한 단어로 먼저 추천해요.'], ['탭을 능숙하게', '탭에서 와인을 정확한 양으로 따르고, 탭 상태를 매일 확인해요.'], ['매장의 흐름을 지켜요', '맞이, 주문, 서빙, 계산까지. 바쁠 때도 침착하게 순서대로.'], ['디테일을 챙겨요', '글라스, 테이블, 위생, 오픈·마감 체크리스트를 앱으로.']], t: '홀 · 바 크루', type: '파트타임', tag: '상시', br: '4개 매장', when: '저녁 16시~마감 중심 · 주 2일부터', pay: '시급 10,320원 이상 (2026 최저임금 기준, 면접 때 확정)',
      sum: '손님을 맞이하고, 탭에서 와인을 따르고, 한 잔을 쉬운 말로 소개해요.',
      do: ['손님 맞이 · 자리 안내 · 주문 받기', '탭 와인 따르기와 간단한 음료 준비', '와인을 처음 마시는 손님께 쉬운 말로 추천하기', '오픈 · 마감 체크리스트 (앱으로)', '테이블 · 글라스 정리, 매장 청결'],
      who: ['사람 만나는 걸 좋아하는 분', '와인을 몰라도 괜찮아요. 배우고 싶은 마음이면 돼요', '정해진 근무 시간을 지킬 수 있는 분', '주말 저녁 근무가 가능하면 더 좋아요'],
      plus: ['카페 · 바 · 레스토랑 홀 경험', '와인 자격증(WSET 등)이나 관심', '외국어로 간단한 응대 가능'] },
    { id: 'hall-ft', own: [['매장의 하루를 끌어요', '오픈부터 마감까지 시간대 책임을 나눠 맡아요.'], ['신입의 버디가 돼요', '첫 2주 동안 새 크루 옆에서 같이 일해요.'], ['와인을 더 깊게', '탭 라인업과 재고를 챙기고 손님께 다음 한 잔을 제안해요.'], ['팀과 같이', '근무표·대타·공지를 앱으로 맞추고, 문제는 빨리 공유해요.']], t: '홀 · 바 크루', type: '풀타임', tag: '오픈 멤버 우대', br: '4개 매장', when: '주 5일 · 근무표 기준 교대', pay: '월급 (근로계약서 기준, 면접 때 확정)',
      sum: '매장의 하루를 함께 끌고 가는 크루예요. 시니어 · 부점장으로 성장하는 길이 열려 있어요.',
      do: ['홀 · 바 운영 전반 (응대, 탭, 계산)', '신입 크루 버디 역할', '와인 재고 · 탭 상태 체크', '오픈 · 마감 책임 근무'],
      who: ['손님 응대 경험이 있는 분', '팀과 같이 일하는 걸 즐기는 분', '와인을 더 깊게 배우고 싶은 분'],
      plus: ['와인바 · 레스토랑 경험 1년 이상', 'WSET Level 1 이상', '근무표 · 재고 관리 경험'] },
    { id: 'kitchen', own: [['와인과 어울리는 한 접시', '레시피대로, 매번 같은 맛과 모양으로.'], ['프렙을 깔끔하게', '재료 손질과 준비를 시간 안에.'], ['위생과 안전이 먼저', '체크리스트대로, 뜨겁고 날카로운 것은 안전하게.'], ['주방 팀워크', '홀과 주문 흐름을 맞추고 재고를 함께 챙겨요.']], t: '주방 크루', type: '풀타임 · 파트타임', tag: '상시', br: '4개 매장', when: '근무표 기준 · 파트는 주 2일부터', pay: '면접 때 확정 (근로계약서 기준)',
      sum: '와인과 어울리는 플레이트를 만들어요. 깔끔한 준비와 위생이 제일 중요해요.',
      do: ['메뉴 준비 · 조리 · 플레이팅', '재료 손질과 프렙', '주방 위생 · 안전 체크리스트', '발주 · 재고 보조'],
      who: ['위생 습관이 좋은 분', '빠르기보다 꾸준한 분', '보건증이 있거나 발급할 수 있는 분'],
      plus: ['양식 · 그릴 · 파스타 경험', '조리기능사 자격'] },
    { id: 'pool', own: [['원하는 조건을 남겨요', '지점, 시간, 직무를 남기면 자리가 생길 때 먼저 연락해요.']], t: '먼저 지원해 두기', type: '인재풀', tag: '6개월 보관', br: '원하는 지점', when: '원하는 시간', pay: '자리가 생기면 먼저 연락드려요',
      sum: '지금 맞는 공고가 없어도 괜찮아요. 원하는 지점 · 시간을 남겨 두면 자리가 생길 때 먼저 연락드려요.',
      do: ['원하는 지점 · 시간 · 직무를 남겨 주세요'], who: ['탭샵바와 언젠가 함께하고 싶은 분'], plus: [] }
  ];
  const VALS = [
    { n: '01', t: 'wine is second americano', d: '와인은 어렵지 않아요. 아메리카노처럼 편하게 고르는 일상의 한 잔. 우리가 하는 모든 일은 여기서 시작해요.' },
    { n: '02', t: '한 잔부터, 쉬운 말로', d: '탭으로 한 잔씩 맛볼 수 있게 했어요. 설명도 어려운 말 대신 "상큼해요", "부드러워요"처럼 한 단어부터.' },
    { n: '03', t: '처음이어도 괜찮아요', d: '손님에게도, 동료에게도. 첫날엔 버디가 옆에 있고, 모르는 건 몇 번이고 물어봐도 돼요.' },
    { n: '04', t: '배운 만큼 배지가 돼요', d: '앱 러닝으로 와인을 배우고, 할 줄 아는 것이 늘면 유니폼에 다는 진짜 배지가 생겨요.' }
  ];
  const QS = [
    { q: '탭샵바는 "wine is second americano"라고 말해요. 이 말이 손님에게 어떤 뜻으로 전해지면 좋을까요?', h: '2~3문장이면 충분해요.' },
    { q: '와인을 처음 마셔 보는 손님이 "뭐가 맛있어요?"라고 물어요. 첫마디를 적고, 왜 그렇게 말하는지 한 줄 덧붙여 주세요.', h: '정답은 없어요. 평소 말투 그대로요.' },
    { q: '주문이 몰리는 금요일 밤, 옆 동료가 계속 밀리고 있어요. 내 일도 바빠요. 어떻게 할까요?', h: '실제로 할 행동을 순서대로 적어도 좋아요.' },
    { q: '손님께 다른 와인을 드린 걸 5분 뒤에 알았어요. 제일 먼저 무엇을 할까요?', h: '실수는 누구나 해요. 그다음이 궁금해요.' },
    { q: '최근에 받은 기분 좋은 환대(가게든 사람이든) 하나를 들려주세요. 무엇이 좋았나요?', h: '작은 경험이어도 좋아요.' }
  ];
  const STEPS = ['직무 · 지점', '기본 정보', '근무 가능', '경력', '탭샵바 질문', '사진', '동의'];
  const A = JSON.parse(sessionStorage.getItem('tsb_apply') || '{}');
  const saveA = () => sessionStorage.setItem('tsb_apply', JSON.stringify(A));
  const app = $('#app');
  const pvBar = PV ? '<div class="pv">미리보기 · 실제로 제출 · 발송되지 않아요</div>' : '';
  const nav = back => `<div class="nav">${back ? `<a class="bk" href="${back}">‹ 뒤로</a>` : '<span></span>'}<a class="wm" href="#/">TAP SHOP BAR<small>CAREERS</small></a><span style="width:40px"></span></div>`;
  const ICON = {
    ig: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    yt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
    web: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg>'
  };
  const snsBlock = () => `<div class="sns"><a class="ig" href="${SNS.ig}" target="_blank" rel="noopener">${ICON.ig}<span>Instagram<small>@tap.shop.bar</small></span></a><a href="${SNS.yt}" target="_blank" rel="noopener">${ICON.yt}<span>YouTube<small>tapping; · 매장 음악</small></span></a><a href="${SNS.web}" target="_blank" rel="noopener" style="grid-column:1/-1;background:var(--ink)">${ICON.web}<span>tsb.wine<small>매장 · 앱 · 대관</small></span></a></div>`;

  function home() {
    app.innerHTML = `<div class="wrap">${pvBar}${nav()}
      <div class="hero"><img src="${IMG}pour.jpg" alt="탭에서 와인을 따르는 모습"><div class="ov"><div class="k">JOIN THE CREW</div><h1>와인을<br>쉽고 즐겁게.<br>같이 일해요.</h1><p><span class="slog">wine is second americano.</span><br>아메리카노처럼 편한 한 잔을 만드는 사람들이에요.</p></div></div>
      <div class="sec"><div class="k">WHO WE ARE</div><h2>서울 4곳의 와인 탭 바,<br>탭샵바예요.</h2><p class="d">벽 가득한 와인 탭에서 한 잔씩 골라 마시고, 마음에 들면 병으로 사 가는 곳. 낮에는 커피, 저녁엔 와인. 와인을 처음 마시는 사람도 편하게 들어올 수 있는 매장을 만들어요.</p>
        <div class="nums"><div><b>4</b><span>서울 직영 매장</span></div><div><b>1잔</b><span>부터 탭으로<br>골라 마셔요</span></div><div><b>11</b><span>앱으로 배우는<br>와인·업무 수업</span></div></div></div>
      <div class="strip"><figure><img src="${IMG}tapwall.jpg" alt=""><figcaption>와인 탭 월</figcaption></figure><figure><img src="${IMG}lounge.jpg" alt=""><figcaption>원형 탭 바</figcaption></figure><figure><img src="${IMG}tap.jpg" alt=""><figcaption>터치로 고르는 한 잔</figcaption></figure><figure><img src="${IMG}shop.jpg" alt=""><figcaption>보틀 샵</figcaption></figure><figure><img src="${IMG}poster.jpg" alt=""><figcaption>TAP · SHOP · BAR</figcaption></figure></div>
      <div class="sec"><div class="k">WHAT WE BELIEVE</div><h2>우리가 일하는 방식</h2><div class="vals">${VALS.map(v => `<div><b><i>${v.n}</i>${e(v.t)}</b><p>${e(v.d)}</p></div>`).join('')}</div></div>
      <div class="sec" id="jobs"><div class="k">OPEN ROLES</div><h2>지금 함께할 자리</h2><div class="jobs">${JOBS.map(j => `<a class="job" href="#/job/${j.id}"><div class="t"><span><i class="chip ${j.id === 'pool' ? '' : 'w'}">${e(j.type)}</i><i class="chip y">${e(j.tag)}</i></span><b style="margin-top:8px">${e(j.t)}</b><span>${e(j.br)} · ${e(j.when)}</span></div><span class="ar">›</span></a>`).join('')}</div><p class="note" style="padding:10px 0 0">예시 공고예요. 실제 모집 직무 · 조건은 확정 후 바뀌어요.</p></div>
      <div class="sec"><div class="k">PERKS</div><h2>같이 일하면</h2><div class="perks"><div><b>직원식</b>근무하는 날 1식</div><div><b>아메리카노 무제한</b>근무 중 음료 1잔 + 아메리카노는 무제한</div><div><b>마감 후 택시비</b>대중교통 끊긴 마감 근무 귀가</div><div><b>근무복 · 장비</b>유니폼 · 앞치마 · 명찰</div><div><b>와인 러닝 · 배지</b>앱으로 배우고 유니폼 배지로</div><div><b>성장 경로</b>스탭 → 시니어 → 부점장 · 수쉐프 → 점장</div></div><p class="note" style="padding:10px 0 0">세부 기준은 HR 가이드와 근로계약서를 따라요.</p></div>
      <div class="sec"><div class="k">HOW TO JOIN</div><h2>지원은 3분이면 끝나요</h2><ol class="steps"><li><span><b>앱에서 바로 지원</b> · 회원가입 · 로그인 없이</span></li><li><span><b>접수 문자</b> · 접수번호와 다음 일정이 바로 와요</span></li><li><span><b>매장 면접</b> · 링크에서 편한 시간을 골라요 (30분 안팎)</span></li><li><span><b>결과 안내</b> · 면접 후 일주일 안에 문자로</span></li><li><span><b>첫걸음</b> · 합격하면 회사 계정과 온보딩 링크를 보내 드려요</span></li></ol></div>
      <div class="sec"><div class="k">FOLLOW</div><h2>탭샵바를 더 보고 싶다면</h2>${snsBlock()}</div>
      <div class="foot"><span class="slog">wine is second americano</span>주식회사 탭샵바 · 채용 문의는 지원서의 질문 칸이나 매장 방문으로<br>지원자 정보는 채용 목적으로만 쓰고, 결과 확정 후 30일 뒤 지워요.</div>
      <div class="cta"><div class="in"><a class="btn" href="#/jobs-pick">지원하기</a></div></div></div>`;
  }
  function job(id) {
    const j = JOBS.find(x => x.id === id); if (!j) return go('#/');
    app.innerHTML = `<div class="wrap">${pvBar}${nav('#/')}
      <div class="jd-h"><span class="chip w">${e(j.type)}</span><span class="chip y">${e(j.tag)}</span><h1>${e(j.t)}</h1><p>${e(j.sum)}</p></div>
      <dl class="kv"><div><dt>근무지</dt><dd>${j.id === 'pool' ? '원하는 지점' : BR.map(b => b.k).join(' · ')}<br><span style="color:var(--mute);font-size:13px">지원할 때 원하는 지점을 고를 수 있어요</span></dd></div><div><dt>근무 시간</dt><dd>${e(j.when)}</dd></div><div><dt>급여</dt><dd>${e(j.pay)}</dd></div><div><dt>꼭 필요한 것</dt><dd>금 · 토 중 하루 이상 저녁 근무 가능 · 첫 근무 전 보건증</dd></div><div><dt>시작</dt><dd>합격 후 협의 · 근로계약서 먼저 받고 시작해요</dd></div></dl>
      <div class="box grey"><h3>ABOUT TAP SHOP BAR</h3><p style="font-size:14px;line-height:1.65;margin-top:6px;color:#3d3838">서울 4곳의 와인 탭 바예요. 벽 가득한 탭에서 한 잔씩 골라 마시는 곳. <b>wine is second americano</b>, 와인을 아메리카노처럼 편한 일상의 한 잔으로 만드는 게 우리 일이에요. 그 한 잔은 결국 크루가 건네요.</p></div>
      <div class="sec" style="padding-top:22px"><div class="k">WHAT YOU'LL OWN</div><h2 style="font-size:22px">맡게 될 일</h2><div class="vals">${(j.own || []).map((o, i) => `<div><b><i>0${i + 1}</i>${e(o[0])}</b><p>${e(o[1])}</p></div>`).join('')}</div></div>
      <div class="box"><h3>하루에 하는 일</h3><ul>${j.do.map(x => `<li>${e(x)}</li>`).join('')}</ul></div>
      <div class="box"><h3>이런 분이면 좋아요</h3><ul>${j.who.map(x => `<li>${e(x)}</li>`).join('')}</ul></div>
      ${j.plus.length ? `<div class="box grey"><h3>있으면 더 좋아요</h3><ul>${j.plus.map(x => `<li>${e(x)}</li>`).join('')}</ul></div>` : ''}
      <div class="box navy"><h3 style="color:#fff">첫 2주는 이렇게</h3><ul><li>첫날은 버디와 같이 오픈(또는 마감)을 돌아요</li><li>앱 러닝으로 하루 3분, 와인 기초부터</li><li>1주 · 30일에 점장님과 짧은 1:1</li></ul></div>
      <div class="box grey"><h3>지원 전에 알아 두세요</h3><ul><li>술을 다루는 매장이라 성인만 지원할 수 있어요</li><li>이력서가 없어도 지원할 수 있어요</li><li>키 · 몸무게 · 출신지 · 결혼 여부 · 가족 정보는 묻지 않아요</li></ul></div>
      <div class="cta"><div class="in"><a class="btn" href="#/apply/${j.id}">이 자리에 지원하기</a></div></div></div>`;
  }
  function jobsPick() {
    app.innerHTML = `<div class="wrap">${pvBar}${nav('#/')}<div class="ap-h"><div class="st">APPLY</div><h1>어떤 자리에<br>지원할까요?</h1></div><div class="fm"><div class="pick">${JOBS.map(j => `<button data-j="${j.id}"><i></i><div><b>${e(j.t)} · ${e(j.type)}</b><span>${e(j.when)}</span></div></button>`).join('')}</div></div></div>`;
    app.querySelectorAll('[data-j]').forEach(b => b.onclick = () => go('#/apply/' + b.dataset.j));
  }

  /* ── 3분 지원 ── */
  function apply(id, n) {
    const j = JOBS.find(x => x.id === id); if (!j) return go('#/');
    if (A.job !== id) { Object.keys(A).forEach(k => delete A[k]); A.job = id; A.br = []; A.days = []; A.q = ['', '', '', '', '']; saveA(); }
    n = Math.max(1, Math.min(7, parseInt(n, 10) || 1));
    const head = `<div class="ap-top"><a href="#/job/${id}">‹ 공고 보기</a><span class="chip">${e(j.t)} · ${e(j.type)}</span><span class="n">${n}/7</span></div><div class="bar">${STEPS.map((s, i) => `<i class="${i + 1 < n ? 'on' : i + 1 === n ? 'now' : ''}"></i>`).join('')}</div>`;
    let body = '', can = () => true;
    if (n === 1) {
      body = `<div class="ap-h"><div class="st">STEP 1 · ${STEPS[0]}</div><h1>일하고 싶은 지점을<br>골라 주세요</h1><p>여러 곳 골라도 돼요. 가까운 곳부터 연락드려요.</p></div><div class="fm"><div class="pick">${BR.map(b => `<button data-br="${b.k}" class="${A.br.includes(b.k) ? 'on' : ''}"><i></i><div><b>${b.k}점</b><span>${b.d}</span></div></button>`).join('')}<button data-br="어디든" class="${A.br.includes('어디든') ? 'on' : ''}"><i></i><div><b>어디든 괜찮아요</b><span>가장 사람이 필요한 곳으로</span></div></button></div></div>`;
      can = () => A.br.length > 0;
    } else if (n === 2) {
      body = `<div class="ap-h"><div class="st">STEP 2 · ${STEPS[1]}</div><h1>연락받을 정보를<br>알려 주세요</h1><p>접수 문자와 면접 일정이 이 번호로 가요.</p></div><div class="fm">
        <label>이름</label><input type="text" id="f_nm" value="${e(A.nm || '')}" placeholder="홍길동" autocomplete="name">
        <label>휴대폰</label><input type="tel" id="f_ph" value="${e(A.ph || '')}" placeholder="010-0000-0000" inputmode="tel" autocomplete="tel">
        <label>이메일 <small>· 선택</small></label><input type="email" id="f_em" value="${e(A.em || '')}" placeholder="name@example.com" autocomplete="email">
        <label>나이 확인 <small>· 술을 다루는 매장이라 필요해요. 생년월일은 받지 않아요</small></label><div class="chips" id="ag">${[(new Date().getFullYear() - 19) + '년생 이전 출생이에요', '아니에요'].map(t => `<button data-a="${t}" class="${A.ag === t ? 'on' : ''}">${t}</button>`).join('')}</div>${A.ag === '아니에요' ? '<p class="note" style="padding:8px 0 0">지금은 성인만 지원할 수 있어요. 관심 가져 줘서 고마워요!</p>' : ''}</div>`;
      can = () => { const nm = $('#f_nm').value.trim(), ph = $('#f_ph').value.replace(/\D/g, ''); return nm.length >= 2 && ph.length >= 10 && !!A.ag && A.ag !== '아니에요'; };
    } else if (n === 3) {
      body = `<div class="ap-h"><div class="st">STEP 3 · ${STEPS[2]}</div><h1>언제 일할 수 있어요?</h1><p>나중에 근무표에서 바꿀 수 있어요.</p></div><div class="fm">
        <label>요일</label><div class="chips" id="days">${['월', '화', '수', '목', '금', '토', '일'].map(d => `<button data-d="${d}" class="${A.days.includes(d) ? 'on' : ''}">${d}</button>`).join('')}</div>
        <label>시간대</label><div class="chips" id="tm">${['낮 (11~17시)', '저녁 (16시~마감)', '상관없어요'].map(t => `<button data-t="${t}" class="${A.tm === t ? 'on' : ''}">${t}</button>`).join('')}</div>
        <label>시작할 수 있는 날</label><input type="date" id="f_sd" value="${e(A.sd || '')}">
        <label>보건증 <small>· 없어도 지원할 수 있어요</small></label><div class="chips" id="hc">${['있어요', '발급할게요'].map(t => `<button data-h="${t}" class="${A.hc === t ? 'on' : ''}">${t}</button>`).join('')}</div></div>`;
      can = () => A.days.length > 0 && !!A.tm;
    } else if (n === 4) {
      body = `<div class="ap-h"><div class="st">STEP 4 · ${STEPS[3]}</div><h1>어떤 일을 해 봤어요?</h1><p>이력서 파일이 있으면 올리고, 없으면 짧게 적어 주세요. 처음이어도 괜찮아요.</p></div><div class="fm">
        <div class="up ${A.cv ? 'ok' : ''}" id="cvUp"><div class="ph">${A.cv ? '✓' : '+'}</div><div><b>${A.cv ? e(A.cv) : '이력서 파일 올리기'}</b><span>PDF · 사진 · 한글 · 워드 (10MB까지)</span></div></div><input type="file" id="cvF" accept=".pdf,.hwp,.hwpx,.doc,.docx,image/*" hidden>
        <label>경력 짧게 <small>· 파일이 없으면</small></label><textarea id="f_cv" placeholder="예) 카페 바리스타 8개월, 레스토랑 홀 1년">${e(A.cvt || '')}</textarea>
        <label>와인은 얼마나 알아요?</label><div class="chips" id="wl">${['처음이에요', '조금 마셔 봤어요', '자주 마셔요', '일해 봤어요 · 자격증 있어요'].map(t => `<button data-w="${t}" class="${A.wl === t ? 'on' : ''}">${t}</button>`).join('')}</div></div>`;
      can = () => !!(A.cv || ($('#f_cv') && $('#f_cv').value.trim().length >= 4)) && !!A.wl;
    } else if (n === 5) {
      body = `<div class="ap-h"><div class="st">STEP 5 · ${STEPS[4]}</div><h1>탭샵바 질문 5개</h1><p>정답은 없어요. 짧게, 평소 말투 그대로 적어 주세요. 한 칸에 200자까지.</p></div><div class="fm">${QS.map((q, i) => `<div class="q"><div class="qn">Q${i + 1}</div><b>${e(q.q)}</b><div class="hint">${e(q.h)}</div><textarea data-q="${i}" maxlength="200" placeholder="여기에 적어 주세요">${e(A.q[i] || '')}</textarea><div class="cnt"><span data-c="${i}">${(A.q[i] || '').length}</span>/200</div></div>`).join('')}</div>`;
      can = () => A.q.filter(x => (x || '').trim().length >= 2).length >= 5;
    } else if (n === 6) {
      body = `<div class="ap-h"><div class="st">STEP 6 · ${STEPS[5]}</div><h1>사진 <span style="color:var(--mute);font-size:20px">· 선택</span></h1><p>안 올려도 불이익은 없어요. 면접 때 본인 확인, 합격하면 직원 프로필에 써요. 외모는 평가하지 않아요.</p></div><div class="fm">
        <div class="up ${A.ph64 ? 'ok' : ''}" id="phUp"><div class="ph">${A.ph64 ? `<img src="${A.ph64}" alt="">` : '☺'}</div><div><b>${A.ph64 ? '사진을 올렸어요' : '얼굴 사진 올리기'}</b><span>정면, 밝은 곳이면 충분해요</span></div></div><input type="file" id="phF" accept="image/*" hidden>
        ${A.ph64 ? '<button class="btn line sm" id="phX" style="margin-top:10px">사진 빼기</button>' : ''}</div>`;
    } else if (n === 7) {
      body = `<div class="ap-h"><div class="st">STEP 7 · ${STEPS[6]}</div><h1>마지막으로<br>확인해 주세요</h1></div><div class="fm">
        <div class="box" style="margin:0"><h3>${e(A.nm || '')} · ${e(j.t)} ${e(j.type)}</h3><ul><li>지점: ${e(A.br.join(', '))}</li><li>가능: ${e(A.days.join(' '))} · ${e(A.tm || '')}</li><li>경력: ${e(A.cv || A.cvt || '')}</li><li>탭샵바 질문 5개 작성 완료</li></ul></div>
        <div class="agree"><input type="checkbox" id="a1" ${A.a1 ? 'checked' : ''}><span><b>[필수]</b> 채용 진행을 위한 개인정보 수집 · 이용에 동의해요</span></div>
        <details class="more"><summary>자세히 보기</summary><table><tr><td>항목</td><td>이름, 휴대폰, 이메일(선택), 성인 여부, 근무 가능 시간, 경력 · 이력서, 질문 답변, 사진(선택)</td></tr><tr><td>목적</td><td>서류 검토, 면접 연락, 채용 결과 안내</td></tr><tr><td>보관</td><td>채용 결과 확정 후 30일. 그 뒤 5일 안에 지워요. 합격하면 인사 기록으로 옮겨요.</td></tr><tr><td>거부</td><td>동의하지 않을 수 있지만, 그러면 지원 접수가 어려워요.</td></tr></table></details>
        <details class="more"><summary>채용서류 반환 안내</summary><p>온라인으로 낸 서류는 법상 반환 대상이 아니에요. 대신 결과가 나온 뒤 30일이 지나면 모두 지워요. 그 전에 지워 달라고 하면 바로 지워 드려요.</p></details>
        <div class="agree"><input type="checkbox" id="a2" ${A.a2 ? 'checked' : ''}><span>[선택] 이번에 함께하지 못하면, 다음 채용 때 연락받을게요 (6개월 보관)</span></div>
        <div class="agree"><input type="checkbox" id="a3" ${A.a3 ? 'checked' : ''}><span>[선택] 접수 · 면접 · 결과 안내를 문자로 받을게요</span></div></div>`;
      can = () => $('#a1').checked;
    }
    app.innerHTML = `<div class="wrap">${pvBar}${head}${body}<div class="cta"><div class="in">${n > 1 ? `<a class="btn line" style="flex:0 0 96px" href="#/apply/${id}/${n - 1}">이전</a>` : ''}<button class="btn" id="nx">${n === 7 ? '지원서 보내기' : '다음'}</button></div></div></div>`;
    const nx = $('#nx'), upd = () => { nx.disabled = !can(); };
    const keep2 = () => { if (n === 2) { A.nm = $('#f_nm').value.trim(); A.ph = $('#f_ph').value.trim(); A.em = $('#f_em').value.trim(); } if (n === 3) A.sd = $('#f_sd').value; if (n === 4) A.cvt = $('#f_cv').value.trim(); if (n === 7) { A.a1 = $('#a1').checked; A.a2 = $('#a2').checked; A.a3 = $('#a3').checked; } saveA(); };
    app.querySelectorAll('input,textarea').forEach(x => x.addEventListener('input', () => { if (x.dataset.q != null) { A.q[+x.dataset.q] = x.value; app.querySelector(`[data-c="${x.dataset.q}"]`).textContent = x.value.length; saveA(); } upd(); }));
    app.querySelectorAll('input[type=checkbox]').forEach(x => x.onchange = upd);
    app.querySelectorAll('[data-br]').forEach(b => b.onclick = () => { const k = b.dataset.br; if (k === '어디든') A.br = A.br.includes(k) ? [] : [k]; else { A.br = A.br.filter(x => x !== '어디든'); A.br = A.br.includes(k) ? A.br.filter(x => x !== k) : [...A.br, k]; } saveA(); app.querySelectorAll('[data-br]').forEach(x => x.classList.toggle('on', A.br.includes(x.dataset.br))); upd(); });
    const tog = (sel, key, multi) => app.querySelectorAll(sel).forEach(b => b.onclick = () => { const v = b.dataset[Object.keys(b.dataset)[0]]; if (multi) A[key] = A[key].includes(v) ? A[key].filter(x => x !== v) : [...A[key], v]; else A[key] = v; saveA(); app.querySelectorAll(sel).forEach(x => x.classList.toggle('on', multi ? A[key].includes(x.dataset[Object.keys(x.dataset)[0]]) : x.dataset[Object.keys(x.dataset)[0]] === A[key])); upd(); });
    tog('[data-d]', 'days', true); app.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { if (n === 2) { A.nm = $('#f_nm').value.trim(); A.ph = $('#f_ph').value.trim(); A.em = $('#f_em').value.trim(); } A.ag = b.dataset.a; saveA(); apply(id, n); }); tog('[data-t]', 'tm'); tog('[data-h]', 'hc'); tog('[data-w]', 'wl');
    const cvF = $('#cvF'); if (cvF) { $('#cvUp').onclick = () => cvF.click(); cvF.onchange = () => { if (cvF.files[0]) { keep2(); A.cv = cvF.files[0].name; saveA(); apply(id, n); } }; }
    const phF = $('#phF'); if (phF) { $('#phUp').onclick = () => phF.click(); phF.onchange = () => { const f = phF.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'), s = Math.min(1, 480 / Math.max(im.width, im.height)); c.width = im.width * s; c.height = im.height * s; c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); A.ph64 = c.toDataURL('image/jpeg', .8); saveA(); apply(id, n); }; im.src = r.result; }; r.readAsDataURL(f); }; const x = $('#phX'); if (x) x.onclick = () => { delete A.ph64; saveA(); apply(id, n); }; }
    nx.onclick = () => { if (!can()) return; keep2(); if (n < 7) go(`#/apply/${id}/${n + 1}`); else submit(j); };
    upd(); window.scrollTo(0, 0);
  }
  function submit(j) {
    const d = new Date(), no = 'T' + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0') + '-' + String(Math.floor(Math.random() * 90) + 10);
    A.no = no; A.at = d.toISOString(); saveA();
    sessionStorage.setItem('tsb_apply_last', JSON.stringify({ no, nm: A.nm, job: j.t + ' · ' + j.type, br: A.br }));
    go('#/done');
  }
  function done() {
    const L = JSON.parse(sessionStorage.getItem('tsb_apply_last') || 'null'); if (!L) return go('#/');
    app.innerHTML = `<div class="wrap">${pvBar}${nav()}<div class="done"><div class="ic">✓</div><h1>지원서를 받았어요,<br>${e(L.nm)}님</h1><p>${e(L.br.join(', '))} · ${e(L.job)}<br>접수 문자를 보냈어요. 3일 안에 연락드릴게요.</p></div>
      <div class="rcpt"><span>접수번호</span><b>${e(L.no)}</b></div>
      <div class="sec" style="padding-top:22px"><div class="k">WHAT'S NEXT</div><h2 style="font-size:22px">다음은 이렇게 가요</h2></div>${timeline(1)}
      <div class="box grey"><h3>기다리는 동안</h3><p style="font-size:14px;line-height:1.6;margin-top:6px;color:#3d3838">인스타그램에서 매장 분위기를 미리 볼 수 있어요. 면접 때 마음에 드는 와인 한 잔 이야기해 주시면 좋아요.</p></div>
      <div class="sec" style="padding-top:18px">${snsBlock()}</div>
      <div class="cta"><div class="in"><a class="btn line" href="#/status/${e(L.no)}">내 지원 상태 보기</a></div></div></div>`;
  }
  function timeline(at) {
    const T = [['접수', '접수 문자 · 메일 자동 발송'], ['서류 확인', '지점 점장님이 확인해요 (3일 안)'], ['면접 시간 고르기', '문자 링크에서 편한 시간 선택'], ['매장 면접', '30분 안팎 · 와인 몰라도 괜찮아요'], ['최종 확인', '본사에서 마지막으로 확인해요'], ['결과 안내', '합격하면 회사 계정 · 첫걸음 링크']];
    return `<ul class="tl">${T.map((t, i) => `<li class="${i < at ? 'on' : i === at ? 'now' : ''}"><i></i><div><b>${t[0]}</b><span>${t[1]}</span></div></li>`).join('')}</ul>`;
  }
  function status(no) {
    app.innerHTML = `<div class="wrap">${pvBar}${nav('#/')}<div class="ap-h"><div class="st">MY APPLICATION</div><h1>내 지원 상태</h1><p>접수번호 ${e(no)} · 이 링크는 문자로도 보내 드려요 (로그인 필요 없음)</p></div>${timeline(2)}
      <div class="box"><h3>면접 시간을 골라 주세요 <span class="chip y">예시</span></h3><p style="font-size:13.5px;color:var(--mute);margin-top:4px">점장님이 열어 둔 시간이에요</p><div class="chips" style="margin-top:12px" id="iv">${['11/17(월) 15:00', '11/18(화) 14:30', '11/19(수) 16:00'].map(t => `<button data-t="${t}">${t}</button>`).join('')}</div><div class="err" id="ivm" style="color:var(--ok)"></div></div>
      <p class="note">일정이 안 맞으면 [다른 시간 요청]으로 남겨 주세요. 지원 취소와 내 정보 삭제도 여기서 할 수 있어요.</p></div>`;
    app.querySelectorAll('#iv [data-t]').forEach(b => b.onclick = () => { app.querySelectorAll('#iv button').forEach(x => x.classList.toggle('on', x === b)); $('#ivm').textContent = b.dataset.t + ' 으로 잡았어요. 하루 전에 문자로 알려 드려요 (미리보기)'; });
  }

  /* ── 합격자: 회사 계정 만들기 ── */
  const W = JSON.parse(sessionStorage.getItem('tsb_welcome') || '{}'); const saveW = () => sessionStorage.setItem('tsb_welcome', JSON.stringify(W));
  const OFFER = { nm: '김예시', br: '상암', job: '홀 · 바 크루 (파트타임)', start: '11월 24일(월) 예정' };
  const TAKEN = ['ys.kim', 'hw.park', 'kh.yang', 'jy.an', 'hl.hong', 'hello', 'hr', 'info'];
  const idOf = (first, last) => { const f = first.toLowerCase().replace(/[^a-z\s-]/g, '').trim().split(/[\s-]+/).filter(Boolean); const l = last.toLowerCase().replace(/[^a-z]/g, ''); if (!f.length || !l) return []; const ini = f.length > 1 ? f.map(x => x[0]).join('') : f[0].slice(0, 2); return [...new Set([ini + '.' + l, f.join('') + '.' + l, l + '.' + f.join(''), ini + '.' + l + '2'])].filter(x => /^[a-z][a-z0-9.]{2,29}$/.test(x)); };
  const pw = () => { const a = 'ABCDEFGHJKMNPQRSTUVWXYZ', b = 'abcdefghjkmnpqrstuvwxyz', c = '23456789', s = '!@#'; const r = t => t[Math.floor(Math.random() * t.length)]; return 'Tsb' + r(s) + r(b) + r(b) + r(a) + r(c) + r(c) + r(b) + r(a) + r(c); };
  function welcome(n) {
    n = parseInt(n, 10) || 1;
    const top = `<div class="ap-top"><span class="chip w">WELCOME</span><span class="n">${Math.min(n, 4)}/4</span></div><div class="bar">${[1, 2, 3, 4].map(i => `<i class="${i < n ? 'on' : i === n ? 'now' : ''}"></i>`).join('')}</div>`;
    let body = '', btn = '다음', can = () => true;
    if (n === 1) {
      body = `<div class="done" style="padding-top:26px"><div class="ic">🍷</div><h1>${e(OFFER.nm)}님,<br>함께하게 됐어요!</h1><p>${e(OFFER.br)}점 · ${e(OFFER.job)}<br>첫 근무 ${e(OFFER.start)}</p></div>
        <div class="box grey"><h3>지금 할 일은 하나예요</h3><ul><li>회사 계정(○○@tsb.wine)을 만들어요. 2분이면 돼요</li><li>계정이 생기면 직원 앱 People에서 "첫걸음"이 열려요</li><li>근로계약서도 앱에서 먼저 받아요</li></ul></div>
        <p class="note">회생 절차 중이라 첫 근무 날짜는 법원 허가가 난 뒤 확정돼요. 확정되면 문자로 알려 드려요.</p>`;
      btn = '계정 만들기 시작';
    } else if (n === 2) {
      body = `<div class="ap-h"><div class="st">STEP 1 · 개인 이메일</div><h1>계정 안내를 받을<br>개인 이메일</h1><p>회사 ID와 첫 비밀번호를 이 메일로 보내 드려요. 지금 쓰는 메일이면 돼요.</p></div><div class="fm">
        <label>개인 이메일</label><input type="email" id="w_em" value="${e(W.em || '')}" placeholder="name@gmail.com" autocomplete="email"><div class="err" id="w_er"></div>
        <label>인증 코드 <small>· 위 메일로 6자리 코드가 가요</small></label><div style="display:flex;gap:8px"><input type="text" id="w_cd" inputmode="numeric" maxlength="6" placeholder="000000" value="${e(W.cd || '')}"><button class="btn ink sm" id="w_send" style="height:52px">코드 받기</button></div><div class="err" id="w_cm" style="color:var(--ok)"></div></div>`;
      can = () => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(($('#w_em') || {}).value || '') && !/@tsb\.wine$/i.test($('#w_em').value) && /^\d{6}$/.test($('#w_cd').value);
    } else if (n === 3) {
      body = `<div class="ap-h"><div class="st">STEP 2 · 회사 ID</div><h1>회사 이메일 ID를<br>골라 주세요</h1><p>여권 영문 이름을 넣으면 탭샵바 규칙(이름 이니셜.성)에 맞춰 추천해요.</p></div><div class="fm">
        <div style="display:flex;gap:8px"><div style="flex:1"><label>영문 이름</label><input type="text" id="w_fn" value="${e(W.fn || '')}" placeholder="Ye Si" autocapitalize="words"></div><div style="flex:0 0 38%"><label>영문 성</label><input type="text" id="w_ln" value="${e(W.ln || '')}" placeholder="Kim" autocapitalize="words"></div></div>
        <label>추천 ID</label><div class="pick" id="w_ids"></div>
        <label>직접 정하기 <small>· 영문 소문자 · 숫자 · 점</small></label><div class="idbox"><input type="text" id="w_id" value="${e(W.id || '')}" placeholder="ys.kim" autocapitalize="off"><span>@tsb.wine</span></div><div class="err" id="w_ie"></div></div>`;
      can = () => { const v = (W.id || '').trim(); return /^[a-z][a-z0-9.]{2,29}$/.test(v) && !TAKEN.includes(v) && !/\.\.|\.$/.test(v); };
    } else if (n === 4) {
      body = `<div class="ap-h"><div class="st">STEP 3 · 확인</div><h1>이대로 만들까요?</h1></div>
        <dl class="kv"><div><dt>회사 이메일</dt><dd><b>${e(W.id)}@tsb.wine</b></dd></div><div><dt>안내 받을 메일</dt><dd>${e(W.em)}</dd></div><div><dt>이름</dt><dd>${e(OFFER.nm)} (${e(W.fn)} ${e(W.ln)})</dd></div><div><dt>지점</dt><dd>${e(OFFER.br)}점 · ${e(OFFER.job)}</dd></div></dl>
        <p class="note">만들면 ID는 바꾸기 어려워요. 첫 로그인 때 비밀번호를 꼭 바꾸고, 2단계 인증을 켜요.</p>`;
      btn = '계정 만들기';
    } else if (n === 5) {
      body = `<div class="done"><div class="spin"></div><h1 style="font-size:24px">계정을 만들고 있어요</h1><p>회사 계정 만들기 → People 직원 등록(입사예정) → 안내 메일 보내기</p></div>`;
    } else {
      if (!W.pw) { W.pw = pw(); saveW(); }
      body = `<div class="done" style="padding-top:24px"><div class="ic">✓</div><h1>계정이 생겼어요!</h1><p>${e(W.em)} 으로<br>ID와 첫 비밀번호를 보냈어요.</p></div>
        <div class="mail"><div class="mh">보낸 사람 <b>탭샵바 인사팀</b><br>받는 사람 ${e(W.em)}<br>제목 <b>[탭샵바] ${e(OFFER.nm)}님의 회사 계정이 준비됐어요</b> <span class="chip y">미리보기</span></div>
          <div class="mb">${e(OFFER.nm)}님, 탭샵바에 오신 걸 환영해요.<br>아래 계정으로 직원 앱 People에 들어오면 온보딩 "첫걸음"이 시작돼요.
            <div class="cred"><div><span>회사 이메일(ID)</span><b>${e(W.id)}@tsb.wine</b></div><div><span>첫 비밀번호</span><b id="pwv">${W.seen ? e(W.pw) : '<button class="btn ink sm" id="pwb" style="height:34px;font-size:13px">한 번만 보기</button>'}</b></div></div><p style="font-size:12px;color:var(--mute);margin-top:-4px">첫 비밀번호는 이 버튼으로 한 번만 볼 수 있어요. 한 번 열면 사라지고, 6시간이 지나도 사라져요.</p>
            <ol style="padding-left:18px;font-size:13.5px;color:#3d3838"><li>아래 버튼 → "Google로 로그인" → 위 ID · 비밀번호</li><li>새 비밀번호로 바꾸기 (처음 한 번)</li><li>2단계 인증 켜기 → People 홈의 "첫걸음" 시작</li></ol>
            <a class="go" href="./#/first">People 들어가서 첫걸음 시작하기</a>
            <p style="font-size:12px;color:var(--mute);margin-top:12px">이 메일은 본인만 보세요. 비밀번호를 다른 사람에게 알려 주지 마세요. 첫 로그인 때 새 비밀번호로 바꿔요.</p></div></div>
        <p class="note">wine is second americano · 첫날 버디가 기다리고 있어요.</p>`;
      btn = 'People 들어가기';
    }
    app.innerHTML = `<div class="wrap">${pvBar}${n <= 4 ? top : ''}${body}${n === 5 ? '' : `<div class="cta"><div class="in"><button class="btn" id="nx">${btn}</button></div></div>`}</div>`;
    const nx = $('#nx'), upd = () => { if (nx) nx.disabled = !can(); };
    if (n === 2) {
      $('#w_send').onclick = () => { const v = $('#w_em').value.trim(); if (/@tsb\.wine$/i.test(v)) return $('#w_er').textContent = '회사 메일 말고 개인 메일을 넣어 주세요'; if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(v)) return $('#w_er').textContent = '이메일 주소를 확인해 주세요'; $('#w_er').textContent = ''; $('#w_cm').textContent = '코드를 보냈어요 (미리보기: 아무 6자리나 넣어 보세요)'; };
      app.querySelectorAll('input').forEach(x => x.oninput = () => { W.em = $('#w_em').value.trim(); W.cd = $('#w_cd').value.trim(); saveW(); upd(); });
    }
    if (n === 3) {
      const draw = () => { const ids = idOf(W.fn || '', W.ln || ''); $('#w_ids').innerHTML = ids.length ? ids.map(x => { const t = TAKEN.includes(x); return `<button data-id="${x}" class="${W.id === x ? 'on' : ''}" ${t ? 'disabled style="opacity:.45"' : ''}><i></i><div><b>${x}@tsb.wine</b><span>${t ? '이미 있어요' : '쓸 수 있어요'}</span></div></button>`; }).join('') : '<p class="note" style="padding:0">영문 이름 · 성을 넣으면 추천이 떠요</p>'; $('#w_ids').querySelectorAll('[data-id]').forEach(b => b.onclick = () => { W.id = b.dataset.id; $('#w_id').value = W.id; saveW(); draw(); chk(); }); };
      const chk = () => { const v = (W.id || '').trim(); $('#w_ie').textContent = !v ? '' : TAKEN.includes(v) ? '이미 있는 ID예요. 다른 걸 골라 주세요' : !/^[a-z][a-z0-9.]{2,29}$/.test(v) || /\.\.|\.$/.test(v) ? '영문 소문자로 시작, 3~30자, 소문자 · 숫자 · 점만 돼요' : ''; upd(); };
      $('#w_fn').oninput = $('#w_ln').oninput = () => { W.fn = $('#w_fn').value; W.ln = $('#w_ln').value; saveW(); draw(); };
      $('#w_id').oninput = () => { W.id = $('#w_id').value.trim().toLowerCase(); saveW(); draw(); chk(); };
      draw(); chk();
    }
    if (n === 5) setTimeout(() => go('#/welcome/6'), 1600);
    const pwb = $('#pwb'); if (pwb) pwb.onclick = () => { W.seen = 1; saveW(); $('#pwv').textContent = W.pw; };
    if (nx) nx.onclick = () => { if (!can()) return; if (n === 6) { location.href = './#/first'; return; } go('#/welcome/' + (n + 1)); };
    upd(); window.scrollTo(0, 0);
  }

  function go(h) { location.hash = h; }
  function route() {
    const h = location.hash.replace(/^#\/?/, '').split('?')[0], [p, a, b] = h.split('/');
    if (p === 'job') job(a); else if (p === 'jobs-pick') jobsPick(); else if (p === 'apply') apply(a, b); else if (p === 'done') done(); else if (p === 'status') status(a || '');
    else if (p === 'welcome') welcome(a); else if (p === 'pw') app.innerHTML = `<div class="wrap">${pvBar}${nav()}<div class="done"><div class="ic">🔑</div><h1>첫 비밀번호</h1><p>이 화면은 한 번만 열려요. 지금 로그인해서 바로 바꿔 주세요.</p></div><div class="rcpt"><span>첫 비밀번호</span><b>${e(pw())}</b></div><div class="cta"><div class="in"><a class="btn" href="./#/first">People 로그인하기</a></div></div></div>`; else home();
    if (!p) window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route); route();
})();
