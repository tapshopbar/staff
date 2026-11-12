/* TSB People · 신규 직원 "첫걸음" 7단계 (#/first) + 채용 최종 승인 (#/hire) · 미리보기 v1
   - 서버(API)는 건드리지 않는다. 진행 상태는 이 기기 localStorage에만 저장(미리보기).
   - 실제 발송·업로드·승인 없음. 화면 흐름 확인용. */
(function () {
  const PV = true; // 미리보기 표시
  const e = s => (typeof esc === 'function' ? esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));
  const IMG = (typeof LIMG !== 'undefined' ? LIMG : 'https://tapshopbar.github.io/staff/assets/learn/');
  const me = () => (typeof S !== 'undefined' && S.data && S.data.me) || { name: '신규', branch: '청계', email: 'demo' };
  const KEY = () => 'tsbp_first_' + (me().email || 'demo');
  const st = () => { try { return Object.assign({ step: 1, done: {}, docs: {}, reads: {}, quiz: {}, hi: '' }, JSON.parse(localStorage.getItem(KEY()) || '{}')); } catch (x) { return { step: 1, done: {}, docs: {}, reads: {}, quiz: {}, hi: '' }; } };
  const save = o => localStorage.setItem(KEY(), JSON.stringify(o));
  const nDone = o => Object.keys(o.done).filter(k => o.done[k]).length;
  const br = b => { const l = String((typeof brLabel === 'function' ? brLabel(b) : b) || ''); return (!l || /전 ?지점|본사|전체/.test(l)) ? 'OO점' : /점$/.test(l) ? l : l + '점'; };
  const T = (typeof toast === 'function' ? toast : alert);
  const pvTag = '<span class="fs-pv">미리보기</span>';

  const STEPS = [
    { n: 1, t: '환영해요', m: 1 }, { n: 2, t: '내 첫 근무', m: 2 }, { n: 3, t: '서류 챙기기', m: 3 }, { n: 4, t: '꼭 읽기 3가지', m: 3 },
    { n: 5, t: '탭과 첫 수업', m: 3 }, { n: 6, t: '내 버디', m: 1 }, { n: 7, t: '첫날 미리보기', m: 2 }
  ];
  const DOCS = [
    { k: 'contract', t: '근로계약서 확인', d: '근무 시작 전에 꼭 받아야 해요 (법으로 정해져 있어요)', a: '보기', must: true },
    { k: 'health', t: '보건증 (건강진단결과서)', d: '음식·음료를 다루기 전에 필요해요. 사진으로 올려 주세요', a: '사진 올리기', must: true, file: true },
    { k: 'bank', t: '급여 받을 계좌', d: '본인 명의 통장 사본 사진. 시트에 번호를 적지 않고 비공개 폴더에 보관해요', a: '사진 올리기', file: true },
    { k: 'sos', t: '비상연락처', d: '갑자기 연락이 안 될 때만 써요 (이름 · 관계 · 번호)', a: '적기' }
  ];
  const yr = new Date().getFullYear();
  const READS = [
    { k: 'r1', t: '위생 · 안전 기본', items: ['매장 들어오면 손부터 씻어요. 화장실 다녀온 뒤, 쓰레기 만진 뒤에도요.', '칼은 쓰고 바로 제자리. 칼을 들고 걸을 땐 칼끝을 아래로.', '뜨거운 팬·그릇은 맨손으로 잡지 않아요. 행주나 장갑을 써요.', '바닥이 젖었으면 바로 닦고, 미끄러질 것 같으면 주변에 먼저 알려요.', '다치면 작아도 바로 점장님께 말하고, 앱 [사고·클레임]에 남겨요.'] },
    { k: 'r2', t: '술은 성인에게만 · 신분증 확인', items: ['청소년에게는 술을 팔거나 따라 줄 수 없어요. 와인 한 잔, 시음도 마찬가지예요.', `${yr}년 기준 ${yr - 19}년생까지 성인이에요. ${yr - 18}년생부터는 안 돼요.`, '조금이라도 어려 보이면 신분증을 꼭 봐요. 사진·생년월일을 직접 확인해요.', '확인이 어려우면 혼자 판단하지 말고 점장님을 불러요. 정중하게 거절해도 괜찮아요.'] },
    { k: 'r3', t: '근태 · 늦을 때 · 대타', items: ['출근·퇴근은 앱 홈의 [출근하기] [퇴근하기]로 매장 안에서 눌러요.', '늦을 것 같으면 근무 시작 전에 점장님께 바로 연락해요.', '근무를 못 하게 되면 앱 [대타 게시판]에 올리고, 점장님 확인을 받아요.', '다음 주 근무 신청은 매주 앱에서 내요. 홈에 알림이 떠요.'] }
  ];
  const DAY1 = ['앱에서 출근 찍기', '손 씻고 유니폼·앞치마 갖추기', '버디와 매장 한 바퀴 (탭 · 홀 · 주방 · 계산대 위치)', '탭 라인 상태와 와인 온도 같이 보기', '글라스·테이블 세팅 같이 하기', '오늘 공지 확인하고 점장님께 인사', '퇴근 전 "첫날 어땠어요?" 한 줄 남기기'];

  function head(o, n) {
    return `<div class="fs-top"><a class="x" href="#/">${typeof I === 'function' ? I('back', 14) : ''} 나중에 할게요</a>${pvTag}<span class="n">${n}/7</span></div>
    <div class="fs-bar">${STEPS.map(s => `<i class="${o.done[s.n] ? 'on' : s.n === n ? 'now' : ''}"></i>`).join('')}</div>`;
  }
  const tap = t => `<div class="fs-tap"><img src="${IMG}mascot.jpg" alt=""><div>${t}</div></div>`;
  const H = (s, t, p) => `<div class="fs-h"><div class="st">STEP ${s.n} · 약 ${s.m}분</div><h1>${t}</h1>${p ? `<p>${p}</p>` : ''}</div>`;
  const foot = (label, dis, extra) => `<div class="fs-foot"><button class="pill wine full" id="fsGo" ${dis ? 'disabled' : ''}>${label}</button>${extra || ''}</div>`;
  const cheer = n => ['', '좋아요, 출발!', '벌써 2개 끝!', '서류 끝, 잘했어요', '벌써 절반 넘었어요', '1과 끝! 잘했어요', '이제 혼자가 아니에요', ''][n];

  function go(n) { location.hash = '#/first/' + n; }
  function finish(o, n) { o.done[n] = true; o.step = Math.min(8, n + 1); save(o); if (cheer(n)) T(cheer(n)); go(n + 1); }
  function sheet(html) {
    const m = document.createElement('div'); m.className = 'fs-sheet'; m.innerHTML = `<div>${html}<button class="pill ink full" style="margin-top:16px" data-x>닫기</button></div>`;
    m.onclick = ev => { if (ev.target === m || ev.target.hasAttribute('data-x')) m.remove(); }; document.body.appendChild(m); return m;
  }

  ROUTES.first = async function (v, arg) {
    const o = st(); let n = parseInt(arg, 10);
    if (!n) n = nDone(o) >= 7 ? 8 : Math.min(o.step || 1, 7);
    if (arg === 'reset') { localStorage.removeItem(KEY()); go(1); return; }
    const M = me(), first = String(M.name || '').slice(-2), s = STEPS[n - 1];
    const ns = (typeof S !== 'undefined' && S.data && S.data.x && (S.data.x.shifts || [])[0]) || null;
    document.body.classList.add('fs-on');
    let html = '';
    if (n === 1) {
      html = head(o, 1) + H(s, `${e(M.name)}님,<br>탭샵바에 오신 걸<br>환영해요.`) +
        tap('저는 마스코트 <b>탭</b>이에요. 앞으로 2주 동안 옆에서 하나씩 알려 드릴게요. <b>처음이어도 괜찮아요.</b> 오늘은 15분이면 끝나요.') +
        `<div class="fs-card navy"><div class="k">${e(br(M.branch))} 점장님 한마디</div><p style="font-size:16px;line-height:1.6;margin-top:8px;color:#fff">"${e(first)}님, 첫날은 아무것도 몰라도 돼요. 모르는 건 몇 번이고 물어봐요. 같이 하면 금방 익숙해져요. 만나서 반가워요!"</p><div class="fs-sign" style="color:rgba(255,255,255,.6)">실제로는 점장님이 직접 써요 · 사진 1장 첨부 가능</div></div>
        <div class="fs-card grey"><h3>오늘 할 일 7가지</h3><ul>${STEPS.map(x => `<li>${x.t} <span class="k">· ${x.m}분</span></li>`).join('')}</ul></div>` +
        foot('좋아요, 시작할게요');
    } else if (n === 2) {
      const when = ns ? `${typeof shiftK === 'function' ? shiftK(ns.date) : e(ns.date)} ${e(ns.start)}~${e(ns.end)}` : '11월 20일 (금) 16:00~23:00';
      html = head(o, 2) + H(s, '첫 근무는<br>이렇게 오시면 돼요', '근무표에 잡힌 첫 근무가 자동으로 떠요.') +
        `<div class="fs-card navy"><div class="k">내 첫 근무${ns ? '' : ' (예시)'}</div><div class="fs-big" style="color:#fff">${when}</div><p style="margin-top:6px">${e(br(ns && ns.branch || M.branch))} · 버디와 같이 근무해요</p></div>
        <div class="fs-card"><h3>찾아오는 길</h3><p style="margin-top:6px">매장 입구 사진과 들어오는 길이 여기 떠요. 직원 출입구가 따로 있으면 사진으로 알려 드려요.</p><p class="k" style="margin-top:6px">지점별 사진 · 길 안내는 점장님이 한 번 올려 두면 계속 써요</p></div>
        <div class="fs-card"><h3>준비물</h3><ul><li><b>검은색 미끄럼 방지 신발</b> (첫날부터 필요해요)</li><li>신분증</li><li>긴 머리면 머리끈</li><li>보건증 (아직 없으면 발급 신청한 영수증이라도)</li></ul><p class="k" style="margin-top:6px">유니폼 · 앞치마는 매장에서 드려요</p></div>
        <div class="fs-card"><h3>출근은 앱으로 찍어요</h3><p style="margin-top:6px">매장 안(약 200m 안)에서 홈의 [출근하기]를 누르면 돼요. 위치 권한을 미리 켜 두면 첫날 헤매지 않아요.</p><button class="pill sm line" style="margin-top:10px" id="fsGeo">위치 권한 켜기</button></div>` +
        foot('확인했어요');
    } else if (n === 3) {
      const ok = DOCS.filter(d => d.must).every(d => o.docs[d.k]);
      html = head(o, 3) + H(s, '근무 전에<br>필요한 서류예요', '사진으로 올리면 끝나요. 지금 없으면 "나중에"를 누르고 점장님께 드려도 돼요.') +
        `<div class="fs-card">${DOCS.map(d => { const v = o.docs[d.k]; return `<div class="fs-row ${v === 'ok' ? 'ok' : v === 'later' ? 'later' : ''}"><span class="ic">${v === 'ok' ? '✓' : v === 'later' ? '!' : ''}</span><div class="t"><b>${d.t}${d.must ? ' <span class="k" style="color:var(--bad)">필수</span>' : ''}</b><span>${v === 'ok' ? '완료' : v === 'later' ? '점장님께 직접 드리기로 했어요' : d.d}</span></div><div class="a">${v === 'ok' ? '' : `<button class="fs-mini" data-doc="${d.k}">${d.a}</button>${d.must ? `<button class="fs-mini l" data-later="${d.k}">나중에</button>` : ''}`}</div></div>`; }).join('')}</div>
        <input type="file" accept="image/*,application/pdf" class="fs-file" id="fsFile">
        <p class="fs-note">올린 사진은 회사 비공개 보관함에만 저장되고, 점장님 · 인사팀만 볼 수 있어요. 생년월일로 만 18세 미만이 확인되면 밤 10시 이후 · 휴일 근무에 넣지 않아요.</p>` +
        foot('다음', !ok, ok ? '' : '<p class="fs-note" style="padding:0;text-align:center">필수 2개는 올리거나 "나중에"를 눌러 주세요</p>');
    } else if (n === 4) {
      const ok = READS.every(r => o.reads[r.k]);
      html = head(o, 4) + H(s, '이 3가지만<br>먼저 읽어 주세요', '각 1분이에요. 펼쳐서 읽고 [읽었어요]를 눌러 주세요.') +
        READS.map((r, i) => `<details class="fs-read ${o.reads[r.k] ? 'ok' : ''}" ${!o.reads[r.k] && READS.findIndex(x => !o.reads[x.k]) === i ? 'open' : ''}><summary><span class="ic">${o.reads[r.k] ? '✓' : i + 1}</span><b>${r.t}</b><small>${o.reads[r.k] ? '읽음' : '1분'}</small></summary><div class="bd"><ul>${r.items.map(x => `<li>${x}</li>`).join('')}</ul>${o.reads[r.k] ? '' : `<button class="pill sm ink" style="margin-top:10px" data-read="${r.k}">읽었어요</button>`}</div></details>`).join('') +
        foot('다음', !ok);
    } else if (n === 5) {
      html = head(o, 5) + H(s, '와인 기초 1과,<br>3분이면 끝나요', '마지막에 2문제만 맞히면 다음으로 가요.') + '<div id="fsL"><div class="fs-note">불러오는 중…</div></div>' + foot('다음', !o.quiz.pass);
    } else if (n === 6) {
      html = head(o, 6) + H(s, `${e(first)}님의 버디를<br>소개할게요`, '버디는 같은 지점 선배예요. 첫 2주 동안 사소한 것도 편하게 물어보세요.') +
        `<div class="fs-card"><div class="fs-buddy"><div class="fs-av">버디</div><div><div class="k">${e(br(M.branch))} · 2년차 · 홀 (예시)</div><div class="fs-big" style="font-size:22px">OOO 님</div><p class="k" style="margin-top:2px">실제로는 점장님이 지정한 버디 사진·이름이 떠요</p></div></div>
          <div class="k" style="margin-top:14px">첫 2주 같이 근무하는 날</div><div class="fs-days"><span class="on">첫날</span><span class="on">2일차</span><span>3일차</span><span class="on">5일차</span><span class="on">7일차</span></div></div>
        <div class="fs-card"><h3>먼저 인사 보내기</h3><textarea class="fs-ta" id="fsHi">${e(o.hi || `안녕하세요! 이번에 ${br(M.branch)}에 들어온 ${M.name}이에요. 첫날 잘 부탁드려요 :)`)}</textarea><p class="k" style="margin-top:6px">앱 알림으로 버디에게 가요</p></div>
        <div class="fs-card grey"><h3>버디에게도 물어보기 어려운 건</h3><p style="margin-top:4px">앱 <a class="u" href="#/ask" style="font-size:14px">질문하기</a>에 남기면 인사팀이 답해요. 이름 숨기기도 돼요.</p></div>` +
        foot('인사 보내기', false, '<button class="pill line full" id="fsSkip" style="color:var(--mute)">나중에 직접 인사할게요</button>');
    } else if (n === 7) {
      html = head(o, 7) + H(s, '첫날은 버디와<br>이렇게 보내요', '오픈(또는 마감) 체크리스트를 같이 돌아요. 오늘은 보기만 해도 돼요.') +
        `<div class="fs-card"><h3>첫날 체크리스트 <span class="k">· 버디와 같이</span></h3><ul class="fs-chk" style="margin-top:8px;padding:0">${DAY1.map((x, i) => `<li><i></i><span>${x}${i === 0 || i === 6 ? '<em>앱</em>' : ''}</span></li>`).join('')}</ul><p class="k" style="margin-top:8px">실제 첫날엔 지점 오픈 · 마감 체크리스트가 "같이 함" 모드로 열려요</p></div>
        <div class="fs-card grey"><h3>첫 달은 이렇게 가요</h3><ul class="fs-next" style="margin:6px 0 0;padding:0"><li><b>첫날</b>버디와 동행, 와인 한 잔 따르기 같이 해 보기</li><li><b>1주</b>하루 1과 러닝 · 오픈이나 마감 혼자 1번(버디 확인) · 점장님과 15분 이야기</li><li><b>2주</b>업무 5과 끝 · 와인 퀴즈 10문제 · 버디 기간 마무리</li><li><b>30일</b>러닝 11과 수료 · 점장님 1:1 · "탭샵바 크루" 배지</li></ul></div>` +
        foot('완료');
    } else {
      html = `<div class="fs-top"><span class="x"></span>${pvTag}</div><div class="fs-done"><div class="bdg"><b>FIRST STEP</b><span>첫걸음</span></div><h1>첫걸음 완료!<br>${e(first)}님, 반가워요</h1><p>"첫걸음" 배지를 받았어요. 다음 근무 때 버디와 만나요.<br>모르는 건 언제든 물어봐요.</p></div>
        ${tap('wine is second americano. 이제 진짜 크루예요!')}
        <div class="fs-foot"><a class="pill wine full" href="#/">홈으로</a><a class="pill line full" href="#/learn" style="color:var(--ink)">러닝 2과 미리 보기</a><button class="fs-mini l" id="fsReset" style="align-self:center">미리보기 처음부터 다시</button></div>`;
    }
    v.innerHTML = `<div class="fs-wrap">${html}</div>`;
    const btn = v.querySelector('#fsGo');
    if (n === 1 || n === 2 || n === 7) btn.onclick = () => finish(o, n);
    if (n === 2) v.querySelector('#fsGeo').onclick = () => { if (!navigator.geolocation) return T('이 기기는 위치를 지원하지 않아요'); navigator.geolocation.getCurrentPosition(() => T('위치 권한이 켜졌어요'), () => T('설정에서 위치 권한을 허용해 주세요'), { timeout: 8000 }); };
    if (n === 3) {
      const f = v.querySelector('#fsFile'); let cur = null;
      f.onchange = () => { if (f.files && f.files[0]) { o.docs[cur] = 'ok'; save(o); T('올렸어요 (미리보기라 실제 저장은 안 돼요)'); ROUTES.first(v, '3'); } };
      v.querySelectorAll('[data-doc]').forEach(b => b.onclick = () => {
        const d = DOCS.find(x => x.k === b.dataset.doc); cur = d.k;
        if (d.file) { f.value = ''; f.click(); return; }
        if (d.k === 'contract') {
          const m = sheet(`<h3>근로계약서 (예시)</h3><p style="margin-top:8px">실제로는 인사팀이 만든 계약서 PDF가 여기 열려요.</p><ol><li>근무 장소 · 하는 일</li><li>근무 요일 · 시간 · 휴게시간</li><li>시급(월급) · 지급일 · 계좌</li><li>주휴 · 연차 · 수습 여부</li></ol><p style="margin-top:10px">내용을 읽고 [받았어요]를 누르면, 받은 시각이 기록되고 사본은 언제든 앱에서 다시 볼 수 있어요.</p><button class="pill wine full" style="margin-top:14px" id="fsGot">읽었고, 받았어요</button>`);
          m.querySelector('#fsGot').onclick = () => { o.docs.contract = 'ok'; save(o); m.remove(); T('근로계약서 받은 것으로 기록했어요'); ROUTES.first(v, '3'); };
          return;
        }
        if (d.k === 'sos') {
          const m = sheet(`<h3>비상연락처</h3><input class="fs-ta" style="min-height:0" placeholder="이름 · 관계 (예: 홍길동 · 어머니)"><input class="fs-ta" style="min-height:0" placeholder="휴대폰 번호" inputmode="tel"><button class="pill wine full" style="margin-top:14px" id="fsSv">저장</button>`);
          m.querySelector('#fsSv').onclick = () => { o.docs.sos = 'ok'; save(o); m.remove(); T('저장했어요 (미리보기)'); ROUTES.first(v, '3'); };
        }
      });
      v.querySelectorAll('[data-later]').forEach(b => b.onclick = () => { o.docs[b.dataset.later] = 'later'; save(o); T('점장님 할 일로 넘겼어요'); ROUTES.first(v, '3'); });
      btn.onclick = () => finish(o, 3);
    }
    if (n === 4) {
      v.querySelectorAll('[data-read]').forEach(b => b.onclick = () => { o.reads[b.dataset.read] = 1; save(o); ROUTES.first(v, '4'); });
      btn.onclick = () => finish(o, 4);
    }
    if (n === 5) {
      btn.onclick = () => finish(o, 5);
      let L = null; try { L = typeof learnData === 'function' ? await learnData() : null; } catch (x) { }
      const l = L && L.tracks && L.tracks[0] && L.tracks[0].lessons[0];
      const box = v.querySelector('#fsL'); if (!box) return;
      if (!l) { box.innerHTML = '<div class="fs-note">러닝을 불러오지 못했어요. 다음으로 넘어가도 돼요.</div>'; btn.disabled = false; return; }
      const qs = (l.q || []).slice(0, 2);
      box.innerHTML = `${l.img ? `<div class="fs-comic"><img src="${IMG}${e(l.img)}" alt="${e(l.t)} 만화" loading="lazy"></div>` : ''}
        ${tap(`<b>${e(l.t)}</b> · 탭이가 정리해 줄게요!`)}
        ${(l.cards || []).slice(0, 3).map(c => `<div class="fs-card">${c}</div>`).join('')}
        ${qs.map((q, i) => `<div class="fs-q" data-q="${i}"><b>Q${i + 1}. ${e(q.q)}</b>${q.o.map((x, j) => `<button data-o="${j}" class="${o.quiz['q' + i] && j === q.a ? 'right' : ''}">${e(x)}</button>`).join('')}<div class="msg">${o.quiz['q' + i] ? '정답이에요!' : ''}</div></div>`).join('')}`;
      box.querySelectorAll('.fs-q').forEach(qe => {
        const i = +qe.dataset.q, q = qs[i];
        qe.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
          qe.querySelectorAll('[data-o]').forEach(x => x.classList.remove('right', 'wrong'));
          const r = +b.dataset.o === q.a; b.classList.add(r ? 'right' : 'wrong');
          qe.querySelector('.msg').textContent = r ? '정답이에요!' : '아까워요. 다시 골라 볼까요?';
          o.quiz['q' + i] = r ? 1 : 0; o.quiz.pass = qs.every((_, k) => o.quiz['q' + k]); save(o); btn.disabled = !o.quiz.pass;
        });
      });
    }
    if (n === 6) {
      btn.onclick = () => { o.hi = v.querySelector('#fsHi').value; save(o); T('미리보기라 실제로 보내지 않았어요'); finish(o, 6); };
      v.querySelector('#fsSkip').onclick = () => finish(o, 6);
    }
    if (n === 8) v.querySelector('#fsReset').onclick = () => { localStorage.removeItem(KEY()); go(1); };
    window.scrollTo(0, 0);
  };

  /* ── 채용 최종 승인 (#/hire) · 예시 데이터 ── */
  const CANDS = [
    { id: 'C1', name: '김예시', ini: '예시', br: '상암', job: '홀 · 파트타임', days: '목 · 금 · 토 · 일 저녁', start: '11월 24일(월)', pay: '시급 10,320원 · 주 20시간', st: '최종 승인 대기',
      cv: { 경력: ['와인바 홀 1년 2개월 (2024.09~2025.11)', '카페 바리스타 8개월'], 자격: ['보건증 보유 (2026.03 발급)', 'WSET Level 1'], 한마디: '손님에게 와인을 쉽게 설명하는 게 좋아요. 마감까지 오래 일할 수 있어요.' },
      mgr: { by: '상암 점장', note: '응대 톤이 밝고, 마감 체크리스트를 바로 이해함. 주말 마감 공백을 채울 수 있음.', s: ['응대 4/5', '와인 이해 3/5', '근무 가능 시간 5/5'] }, hw: '근무 시간 · 시급 확인. 상암 주말 마감 인원 1명 부족분.' },
    { id: 'C2', name: '이샘플', ini: '샘플', br: '청계', job: '주방 · 풀타임', days: '월~금 (주 5일)', start: '12월 1일(월)', pay: '월급 (근로계약서 기준)', st: '점장 면접 끝 · 매니저 검토 중',
      cv: { 경력: ['양식 레스토랑 라인쿡 2년'], 자격: ['한식조리기능사'], 한마디: '파스타 · 그릴 파트 경험이 있어요.' },
      mgr: { by: '청계 점장', note: '실기 테스트 통과. 위생 습관 좋음.', s: ['실기 4/5', '위생 5/5', '근무 가능 시간 4/5'] }, hw: '' }
  ];
  const isBoss = () => ['이사', '대표', '임원'].includes(me().role);
  const HKEY = 'tsbp_hire_pv';
  const hs = () => { try { return JSON.parse(localStorage.getItem(HKEY) || '{}'); } catch (x) { return {}; } };
  const flow = cur => `<div class="hr-flow">${['지원서 접수', '점장 면접', '매니저 검토', '최종 승인 · 장분도 이사', '법원 허가', '계약 · 입사 준비'].map((x, i) => `<div class="${i === 3 ? 'me' : i === 4 ? 'ct' : ''}" ${i === cur ? 'style="outline:2px solid var(--yellow)"' : ''}>${x}</div>`).join('')}</div>`;
  const SIL = '<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="38" r="18" fill="rgba(255,255,255,.85)"/><path d="M16 100c2-22 16-34 34-34s32 12 34 34z" fill="rgba(255,255,255,.85)"/></svg>';
  const av = c => `<div class="fs-av" style="align-items:flex-end">${c.photo ? `<img src="${c.photo}" alt="">` : SIL}</div>`;

  ROUTES.hire = function (v, id) {
    const H2 = hs();
    if (!id) {
      v.innerHTML = `${back('#/', '홈')}<div class="title"><span class="tag"><i class="new">HR</i> 채용 ${pvTag}</span><h1 style="font-size:34px;margin-top:10px">누가 들어오는지<br>마지막에 봐요</h1><p>점장 면접과 매니저 검토가 끝난 사람만 여기 올라와요. 사진 · 이력서 · 면접 메모를 보고 승인해요.</p></div>
        ${flow(-1)}
        <div class="hr-list">${CANDS.map(c => { const d = H2[c.id]; return `<a href="#/hire/${c.id}">${av(c)}<div class="t"><b>${e(c.name)} <span style="font-size:11px;font-weight:700;color:var(--mute)">· 예시</span></b><span>${e(c.br)}점 · ${e(c.job)}</span><span>시작 희망 ${e(c.start)}</span></div><span class="hr-st ${d === '승인' ? 'ok' : d ? 'no' : ''}">${d || (c.id === 'C1' ? '내 차례' : '검토 중')}</span></a>`; }).join('')}</div>
        <div class="hr-warn"><b>회생 기간 (~12/31)</b> 새 채용은 재판부 허가 대상이에요. 여기서 승인해도 바로 입사가 아니라, 법무팀이 허가 신청 → 허가 난 뒤 근로계약 · 첫 근무예요.</div>
        <p class="fs-note">지원자는 로그인 없이 링크 하나로 이력서 · 사진을 올려요. <a class="u" style="font-size:12.5px" href="join.html?t=DEMO" target="_blank">지원자 화면 미리보기</a></p>`;
      return;
    }
    const c = CANDS.find(x => x.id === id); if (!c) { location.hash = '#/hire'; return; }
    const d = H2[c.id], mine = c.id === 'C1';
    v.innerHTML = `${back('#/hire', '채용 승인')}
      <div class="hr-hero">${av(c)}<div><span class="hr-st ${d === '승인' ? 'ok' : d ? 'no' : ''}">${d || e(c.st)}</span><h1 style="margin-top:8px">${e(c.name)}</h1><p>${e(c.br)}점 · ${e(c.job)}<br>사진은 지원자가 직접 올린 것 (선택 항목)</p></div></div>
      ${flow(d === '승인' ? 4 : mine ? 3 : 2)}
      <div class="fs-card"><h3>근무 조건 (안)</h3><dl class="hr-kv"><dt>지점 · 직무</dt><dd>${e(c.br)}점 · ${e(c.job)}</dd><dt>근무 가능</dt><dd>${e(c.days)}</dd><dt>시작 희망</dt><dd>${e(c.start)}</dd><dt>급여</dt><dd>${e(c.pay)}</dd></dl></div>
      <div class="fs-card"><h3>이력서</h3><div class="hr-cv">${Object.entries(c.cv).map(([k, x]) => `<h4>${k}</h4>${Array.isArray(x) ? x.map(y => `<div>· ${e(y)}</div>`).join('') : `<div>${e(x)}</div>`}`).join('')}</div><button class="pill sm line" style="margin-top:10px" id="hrPdf">원본 PDF 보기</button></div>
      <div class="fs-card"><h3>면접 메모 <span class="k">· ${e(c.mgr.by)}</span></h3><p style="margin-top:6px">${e(c.mgr.note)}</p><div class="hr-score">${c.mgr.s.map(x => `<span>${e(x)}</span>`).join('')}</div>${c.hw ? `<div class="k" style="margin-top:12px">박한울 매니저 검토</div><p>${e(c.hw)}</p>` : ''}</div>
      ${d === '승인' ? `<div class="hr-done"><h3 style="font-size:16px;font-weight:800">승인했어요. 다음은 자동으로 진행돼요</h3><ul style="margin-top:6px"><li>법무팀: 채용 허가 신청서 초안 (관리위원 사전검토 → 전자소송)</li><li>허가 나면: 인사팀이 근로계약서 준비 · 4대보험 일정</li><li>People에 "입사예정"으로 초대 → 첫걸음 1~4단계 열림</li><li>지원자에게 합격 안내 (발송 전 확인)</li></ul></div>` :
        mine ? `<div class="fs-foot" style="position:static;background:none"><div class="hr-act"><button class="pill wine wide" data-hd="승인">최종 승인</button><button class="pill line" data-hd="보류" style="color:var(--ink)">보류 · 질문</button><button class="pill line" data-hd="반려" style="color:var(--bad)">반려</button></div><p class="fs-note" style="padding:0;text-align:center">미리보기라 실제로 기록 · 발송되지 않아요</p></div>` :
          `<div class="hr-warn">아직 매니저 검토 중이에요. 검토가 끝나면 알림이 와요.</div>`}`;
    v.querySelector('#hrPdf').onclick = () => sheet(`<h3>원본 이력서</h3><p style="margin-top:8px">실제로는 지원자가 올린 PDF · 사진이 여기서 바로 열려요. 파일은 회사 비공개 Drive 폴더에만 있고, 링크는 로그인한 승인자에게만 보여요.</p>`);
    v.querySelectorAll('[data-hd]').forEach(b => b.onclick = () => {
      const k = b.dataset.hd;
      if (k === '승인') { if (!confirm(`${c.name}님 채용을 최종 승인할까요? (미리보기)`)) return; }
      else { const m = prompt(k === '보류' ? '매니저 · 점장에게 물어볼 내용' : '반려 사유 (지원자에게는 안 보여요)'); if (m === null) return; }
      const h = hs(); h[c.id] = k; localStorage.setItem(HKEY, JSON.stringify(h)); T(k === '승인' ? '승인했어요 (미리보기)' : k + ' 처리했어요 (미리보기)'); ROUTES.hire(v, c.id);
    });
  };
  const fsMark = () => document.body.classList.toggle('fs-on', /^#\/first/.test(location.hash));
  window.addEventListener('hashchange', fsMark); fsMark();
  window.TSB_HIRE_RESET = () => localStorage.removeItem(HKEY);

  /* ── 홈: 첫걸음 카드 + 채용 승인 배너 ── */
  const _home = ROUTES[''];
  ROUTES[''] = function (v) {
    const r = _home.apply(this, arguments);
    try {
      document.body.classList.remove('fs-on');
      if (!v.querySelector('.fs-home')) {
        const o = st(), k = nDone(o), dn = k >= 7;
        const card = dn ? `<a class="fs-home done" href="#/first/8"><span class="fs-pv">미리보기</span><b>첫걸음 완료</b><span class="s">"첫걸음" 배지를 받았어요</span></a>`
          : `<a class="fs-home" href="#/first"><img src="${IMG}mascot.jpg" alt=""><span class="fs-pv">미리보기 · 신규 직원 화면</span><b>탭샵바 첫걸음 ${k}/7</b><span class="s">${k ? '이어서 하기 · 다음: ' + STEPS[Math.min(k, 6)].t : '15분이면 끝나요 · 처음이어도 괜찮아요'}</span><div class="bar"><i style="width:${k / 7 * 100}%"></i></div><span class="go">${k ? '이어서' : '시작하기'}</span></a>`;
        const hc = v.querySelector('.hcards'); if (hc) hc.insertAdjacentHTML('beforebegin', card);
        if (isBoss() || PV) {
          const H2 = hs(), wait = CANDS.filter(c => c.id === 'C1' && !H2[c.id]).length;
          const bn = `<a class="bn ${wait ? 'r' : 'w'}" href="#/hire"><div><b>채용 최종 승인${wait ? ' ' + wait + '명' : ''}</b><span>${wait ? '사진 · 이력서 보고 승인해 주세요 (미리보기)' : '대기 중인 사람이 없어요 (미리보기)'}</span></div><span class="go">보기</span></a>`;
          const sec = v.querySelector('.sec'); if (sec && !v.querySelector('a.bn[href="#/hire"]')) sec.insertAdjacentHTML('beforebegin', bn);
        }
      }
    } catch (x) { }
    return r;
  };
})();
