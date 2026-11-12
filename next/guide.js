/* TSB People · 가이드 (#/guide) v2 — HR + 대관 응대 FAQ(카드·복사) + 디자인 (원본: 구글 시트, API guide.list gx=1)
   내용은 로그인 후 API guide.list 로만 받는다 (공개 repo에 본문을 두지 않음).
   검색: 제목·키워드·요약·본문을 섹션 단위로 찾고, 동의어를 같이 본다. */
(function () {
  const G = { items: null, at: 0, p: null };
  const SYN = [
    ['육아휴직', '육휴', '아기', '육아', '자녀 휴직'], ['출산휴가', '출산', '산휴', '산전후', '출산전후'], ['배우자 출산휴가', '아빠 휴가', '남편 출산', '배우자출산'],
    ['연차', '휴가', '월차', '반차', '쉬는 날'], ['병가', '아파', '아플', '질병', '아픔'], ['경조', '결혼', '장례', '조의', '부고', '경조금'],
    ['급여', '월급', '임금', '돈', '급여일', '월급날'], ['급여명세서', '명세서', '월급 명세'], ['퇴직금', '퇴직', '퇴사 돈'],
    ['퇴사', '그만', '사직', '사표', '퇴직'], ['괴롭힘', '갑질', '폭언', '따돌림', '직장 내 괴롭힘'], ['성희롱', '성추행', '성적'],
    ['진상', '취객', '손님 폭언', '블랙컨슈머', '고객 폭언'], ['야간수당', '야간', '밤 근무', '마감 수당'], ['연장근무', '연장', '초과근무', '오버타임', '야근'],
    ['휴게', '휴게시간', '쉬는 시간', '밥 시간'], ['주휴수당', '주휴'], ['보건증', '건강진단', '위생교육'], ['건강검진', '검진'],
    ['증명서', '재직증명서', '경력증명서'], ['택시', '교통비', '택시비'], ['할인', '직원 할인', '직원가'], ['생일', '생일 선물'], ['명절', '설날', '추석', '상여'],
    ['WSET', '자격증', '와인 자격증'], ['추천', '지인 추천', '사내추천'], ['수습', '수습기간'], ['계약서', '근로계약'], ['취업규칙', '사규', '규정', '징계'],
    ['단축근무', '단축', '근로시간 단축'], ['휴직', '쉬고 싶', '장기 휴가'], ['미성년자', '신분증', '청소년'], ['음주', '시음', '술'], ['위치', 'GPS', '출퇴근 기록'],
    ['대관', '파티', '단체', '행사', '통대관', '전체 대관', '렌탈'], ['예약금', '계약금', '선금', '보증금', '입금'], ['환불', '취소', '위약금', '노쇼'],
    ['최소 이용 금액', '최소 금액', '미니멈', '최소이용'], ['패키지', '가격', '얼마', '견적', '1인'], ['콜키지', '외부 와인', '와인 반입'], ['세금계산서', '계산서', '현금영수증', '증빙'],
    ['데코', '꽃', '포토존', '장식', '풍선'], ['마이크', '빔', '프로젝터', '음향', '미디어월'], ['폰트', '글꼴', '서체'], ['사이즈', '해상도', '규격', '크기'], ['색', '컬러', '색상']
  ];
  const POP = ['연차', '육아휴직', '급여일', '증명서', '야간수당', '퇴사', '대관 가격', '예약금', '폰트'];
  const RV = '대관 응대';
  const CATS = [];
  const norm = s => String(s || '').toLowerCase().replace(/\s+/g, '');
  const e = s => (typeof esc === 'function' ? esc(s) : String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])));

  function expand(q) {
    const n = norm(q); if (!n) return [];
    const out = new Set([n]);
    SYN.forEach(g => { if (g.some(w => { const x = norm(w); return x && (n.includes(x) || x.includes(n)); })) g.forEach(w => out.add(norm(w))); });
    return [...out].filter(x => x.length >= 1);
  }
  function sections(it) {
    if (it._secs) return it._secs;
    const lines = String(it.body || '').replace(/^\s*#\s+[^\n]*\n/, '').split('\n'), secs = []; let cur = { h: it.title, lv: 1, lines: [] };
    lines.forEach(l => { const m = l.match(/^(#{2,3})\s+(.*)$/); if (m) { secs.push(cur); cur = { h: m[2].replace(/[*_`]/g, ''), lv: m[1].length, lines: [] }; } else cur.lines.push(l); });
    secs.push(cur);
    it._secs = secs.filter((s, i) => i === 0 || s.lines.join('').trim() || s.h).map((s, i) => ({ i, h: s.h, lv: s.lv, text: s.lines.join('\n') }));
    return it._secs;
  }
  function search(q) {
    const terms = expand(q), raw = norm(q); if (!terms.length || !G.items) return [];
    const res = [];
    G.items.forEach(it => {
      const kw = norm((it.keywords || []).join(' ')), tt = norm(it.title), sm = norm(it.summary);
      let base = 0; terms.forEach(t => { if (tt.includes(t)) base += t === raw ? 14 : 8; if (kw.includes(t)) base += t === raw ? 9 : 5; if (sm.includes(t)) base += 2; });
      sections(it).forEach(s => {
        const h = norm(s.h), b = norm(s.text); let sc = 0;
        terms.forEach(t => { if (h.includes(t)) sc += t === raw ? 12 : 7; let k = 0, p = b.indexOf(t); while (p >= 0 && k < 6) { k++; p = b.indexOf(t, p + t.length); } sc += k * (t === raw ? 2 : 1); });
        if (sc > 0 || (s.i === 0 && base > 0)) res.push({ it, s, score: sc + base * (s.i === 0 ? 1 : 0.35) });
      });
    });
    res.sort((a, b) => b.score - a.score);
    const seen = new Set(); return res.filter(r => { const k = r.it.id + ':' + r.s.i; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 20);
  }
  function snippet(text, q) {
    const plain = String(text || '').replace(/\[결정 필요[^\]]*\]/g, '').replace(/[#*_`>|]/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim();
    const terms = expand(q); let pos = -1, len = 0;
    for (const t of terms) { const re = new RegExp(t.split('').map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s*'), 'i'); const m = plain.match(re); if (m && (pos < 0 || m.index < pos)) { pos = m.index; len = m[0].length; } }
    if (pos < 0) return e(plain.slice(0, 90)) + (plain.length > 90 ? '…' : '');
    const st = Math.max(0, pos - 34), en = Math.min(plain.length, pos + len + 60);
    return (st ? '…' : '') + e(plain.slice(st, pos)) + '<mark>' + e(plain.slice(pos, pos + len)) + '</mark>' + e(plain.slice(pos + len, en)) + (en < plain.length ? '…' : '');
  }
  /* 작은 마크다운: 제목, 목록, 표, 인용, 굵게, 링크, 체크 */
  function inline(s) {
    s = e(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => { const ok = /^(#\/|https:\/\/)/.test(u.replace(/&amp;/g, '&')); return ok ? `<a class="u" href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${t}</a>` : t; });
    s = s.replace(/\[결정 필요[^\]]*\]/g, '<i class="gd-todo">확인 중</i>');
    return s;
  }
  const autolink = t => e(t).replace(/https:\/\/[^\s<]+/g, u => `<a class="u" href="${u}" target="_blank" rel="noopener">${u.replace(/^https:\/\//, '')}</a>`).replace(/\n/g, '<br>');
  function md(src) {
    const L = String(src || '').replace(/\r/g, '').split('\n'); let h = '', i = 0, sec = 0;
    const listBlock = () => { let out = '', stack = []; while (i < L.length && /^\s*([-*]|\d+\.)\s+/.test(L[i])) { const m = L[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/), d = Math.floor(m[1].length / 2), tag = /\d/.test(m[2]) ? 'ol' : 'ul';
        while (stack.length > d + 1) out += '</li></' + stack.pop() + '>'; if (stack.length < d + 1) { out += '<' + tag + '>'; stack.push(tag); } else out += '</li>';
        let txt = m[3]; const ck = txt.match(/^\[( |x)\]\s+(.*)$/i); out += '<li' + (ck ? ' class="ck' + (ck[1].trim() ? ' on' : '') + '"' : '') + '>' + inline(ck ? ck[2] : txt); i++; }
      while (stack.length) out += '</li></' + stack.pop() + '>'; return out; };
    while (i < L.length) {
      const l = L[i];
      if (!l.trim()) { i++; continue; }
      let m;
      if ((m = l.match(/^(#{1,4})\s+(.*)$/))) { const n = m[1].length, lv = n <= 2 ? 2 : n; const counted = n === 2 || n === 3; if (counted) sec++; h += `<h${lv}${counted ? ` id="gs${sec}"` : ''}>${inline(m[2])}</h${lv}>`; i++; continue; }
      if (/^\s*\|/.test(l)) { const rows = []; while (i < L.length && /^\s*\|/.test(L[i])) { rows.push(L[i]); i++; } const cells = r => r.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()); const body = rows.filter(r => !/^\s*\|[\s:\-|]+\|\s*$/.test(r));
        h += '<div class="gd-tw"><table>' + body.map((r, k) => '<tr>' + cells(r).map(c => k ? `<td>${inline(c)}</td>` : `<th>${inline(c)}</th>`).join('') + '</tr>').join('') + '</table></div>'; continue; }
      if (/^>\s?/.test(l)) { let q = []; while (i < L.length && /^>\s?/.test(L[i])) { q.push(L[i].replace(/^>\s?/, '')); i++; } h += '<div class="gd-box">' + q.map(inline).join('<br>') + '</div>'; continue; }
      if (/^\s*([-*]|\d+\.)\s+/.test(l)) { h += listBlock(); continue; }
      if (/^---+$/.test(l.trim())) { h += '<hr>'; i++; continue; }
      if ((m = l.match(/^!\[([^\]]*)\]\((https:\/\/[^)\s]+)\)\s*$/))) { h += `<figure class="gd-fig"><img src="${e(m[2])}" alt="${e(m[1])}" loading="lazy">${m[1] ? `<figcaption>${e(m[1])}</figcaption>` : ''}</figure>`; i++; continue; }
      let p = []; while (i < L.length && L[i].trim() && !/^(#{1,4}\s|\s*\||>|\s*([-*]|\d+\.)\s|---+$)/.test(L[i])) { p.push(L[i]); i++; } h += '<p>' + p.map(inline).join('<br>') + '</p>';
    }
    return h;
  }
  function load(force) {
    if (G.items && !force) return Promise.resolve(G.items);
    if (G.p) return G.p;
    G.p = api('guide.list', { gx: 1 }).then(j => { G.items = (j.items || []).filter(x => x && x.id); CATS.length = 0; G.items.forEach(x => { if (x.cat && !CATS.includes(x.cat)) CATS.push(x.cat); }); G.updated = j.updated || ''; G.p = null; return G.items; }).catch(x => { G.p = null; throw x; });
    return G.p;
  }
  const applyBtns = it => (it.apply || []).length ? `<div class="gd-apply">${it.apply.map(a => `<a class="pill wine" href="${e(a.hash)}">${e(a.label)}</a>`).join('')}</div>` : '';
  const foot = () => `<div class="gd-foot"><b>그래도 궁금하면</b><p>HARPER(인사팀 AI 담당)에게 물어보세요. 사람 확인이 필요한 건은 인사팀이 이어받아요.</p><a class="pill line" href="#/ask" data-gq="1">질문하기</a></div>`;

  ROUTES.guide = function (v, a) {
    const parts = String(a || '').split('/'), mode = parts[0] || '';
    v.innerHTML = `${back(mode && mode !== 's' && mode !== 'c' ? '#/guide' : '#/more', mode && mode !== 's' && mode !== 'c' ? '가이드' : '더보기')}<div id="gdv">${loading()}</div>`;
    load().then(() => { const el = $('#gdv'); if (!el) return; if (!mode || mode === 's' || mode === 'c') list(el, mode === 's' ? parts.slice(1).join('/') : '', mode === 'c' ? parts.slice(1).join('/') : ''); else doc(el, mode, parts[1]); })
      .catch(x => { const el = $('#gdv'); if (el) el.innerHTML = `<div class="blk"><div class="empty">가이드를 불러오지 못했어요. ${e(x.message || '')}</div></div>`; });
  };
  function list(el, q, cat) {
    const its = G.items;
    el.innerHTML = `<div class="title"><h1>가이드 <span class="gd-beta">BETA</span></h1><p>HR · 대관 응대 · 디자인을 한곳에서 찾아요. 빠진 내용은 질문하기로 물어봐 주세요.</p></div>
      <div class="gd-sbox"><input class="in" id="gq" type="search" placeholder="예) 육아휴직, 대관 예약금, 폰트" value="${e(q)}" autocomplete="off"></div>
      <div class="gd-pop" id="gpop">${POP.map(w => `<button data-w="${e(w)}">${e(w)}</button>`).join('')}</div>
      <div id="gres"></div>`;
    const inp = $('#gq'), res = $('#gres');
    const draw = () => {
      const qq = inp.value.trim();
      if (!qq) {
        const c = cat && CATS.includes(cat) ? cat : '';
        const rv1 = its.find(it => it.cat === RV);
        const banner = !c && rv1 ? `<a class="gd-rvb" href="#/guide/c/${encodeURIComponent(RV)}"><span class="k">손님 대관 질문</span><b>대관 문의, 답을 찾아 복사해서 보내요</b><span class="s">가격 · 예약금 · 환불 · 반입 · 링크 ${its.filter(it => it.cat === RV).reduce((n, it) => n + (it.qa || []).length, 0)}개</span><span class="ar">${I('next', 20)}</span></a>` : '';
        res.innerHTML = banner + `<div class="gd-cats">${CATS.map(k => `<a href="#/guide/c/${encodeURIComponent(k)}" class="${k === c ? 'on' : ''}">${k}</a>`).join('')}</div>` +
          CATS.filter(k => !c || k === c).map(k => { const xs = its.filter(it => (it.cat || '') === k); if (!xs.length) return ''; return `<div class="sec"><h2>${e(k)}</h2></div><div class="list">${xs.map(it => `<a class="li" href="#/guide/${e(it.id)}"><div class="m"><div class="t1">${e(it.title)}</div><div class="t2">${e(it.summary || '')}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>`; }).join('') +
          `<p class="note" style="padding:18px var(--pad) 0">HR 인사팀 HARPER · 대관 본사 영업 · 디자인 마케팅팀${G.updated ? ' · 최종수정 ' + e(G.updated) : ''}</p>` + foot();
        return;
      }
      const r = search(qq);
      res.innerHTML = r.length ? `<div class="sec"><h2>찾은 내용 ${r.length}</h2></div><div class="list">${r.map(x => `<a class="li gd-hit" href="#/guide/${e(x.it.id)}/${x.s.i}" data-q="${e(qq)}"><div class="m"><div class="t1">${x.it.cat === RV ? '대관 · ' : ''}${e(x.it.title)}${x.s.i ? ` <span class="gd-path">› ${e(x.s.h)}</span>` : ''}</div><div class="t2 w">${snippet(x.s.text || x.it.summary, qq)}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>` + foot()
        : `<div class="blk"><div class="empty">'${e(qq)}'에 맞는 내용을 못 찾았어요.</div></div>` + foot();
    };
    let t; inp.oninput = () => { clearTimeout(t); t = setTimeout(() => { draw(); try { history.replaceState(null, '', '#/guide' + (inp.value.trim() ? '/s/' + encodeURIComponent(inp.value.trim()) : '')); } catch (x) {} }, 140); };
    $('#gpop').onclick = ev => { const b = ev.target.closest('button'); if (!b) return; inp.value = b.dataset.w; inp.oninput(); };
    res.onclick = ev => { const a = ev.target.closest('a.gd-hit'); if (a) sessionStorage.setItem('gd_q', a.dataset.q || ''); const g = ev.target.closest('[data-gq]'); if (g && inp.value.trim()) sessionStorage.setItem('ask_prefill', inp.value.trim() + ' 관련해서 궁금해요: '); };
    draw();
    if (!q && !cat) setTimeout(() => { try { inp.focus({ preventScroll: true }); } catch (x) {} }, 50);
  }
  function doc(el, id, si) {
    const it = G.items.find(x => x.id === id);
    if (!it) { el.innerHTML = `<div class="blk"><div class="empty">없는 문서예요. <a class="u" href="#/guide">목록으로</a></div></div>`; return; }
    if (it.qa) return qaDoc(el, it, si);
    const secs = sections(it).filter(s => s.i > 0 && s.lv === 2);
    el.innerHTML = `<div class="title"><span class="gd-cat">${e(it.cat || '')}</span><h1>${e(it.title)}</h1>${it.summary ? `<p>${e(it.summary)}</p>` : ''}</div>
      ${applyBtns(it)}
      ${secs.length > 3 ? `<details class="gd-toc"><summary>목차 ${secs.length}</summary>${secs.map(s => `<a href="javascript:void 0" data-si="${s.i}">${e(s.h)}</a>`).join('')}</details>` : ''}
      <article class="gd-doc">${md(String(it.body || '').replace(/^\s*#\s+[^\n]*\n/, ''))}</article>
      <p class="note" style="padding:14px var(--pad) 0">담당 ${e(it.owner || '인사팀 HARPER')} · 최종수정 ${e(it.updated || G.updated || '')}</p>${foot()}`;
    const go = n => { const h = el.querySelector('#gs' + n); if (h) { h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); h.classList.add('gd-flash'); setTimeout(() => h.classList.remove('gd-flash'), 1800); } };
    el.querySelectorAll('[data-si]').forEach(a => a.onclick = () => go(a.dataset.si));
    el.querySelector('[data-gq]').onclick = () => sessionStorage.setItem('ask_prefill', '[' + it.title + '] ');
    if (si) setTimeout(() => go(si), 60);
    const q = sessionStorage.getItem('gd_q'); sessionStorage.removeItem('gd_q');
    if (q) { const terms = expand(q).filter(t => t.length > 1); const art = el.querySelector('.gd-doc'); if (art && terms.length) { const walk = document.createTreeWalker(art, NodeFilter.SHOW_TEXT); const hits = []; let n; while ((n = walk.nextNode())) { const s = norm(n.nodeValue); if (terms.some(t => s.includes(t))) hits.push(n); } hits.slice(0, 12).forEach(tn => { const sp = document.createElement('span'); sp.className = 'gd-hl'; tn.parentNode.replaceChild(sp, tn); sp.appendChild(tn); }); } }
  }
  /* 대관 응대: 질문 카드 + 손님에게 보낼 답(복사·보내기) + 직원만 보는 메모 */
  function copyText(t) {
    const done = () => (typeof toast === 'function' ? toast('복사했어요. 카톡·문자에 붙여 넣으세요') : 0);
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).then(done).catch(() => legacy());
    legacy();
    function legacy() { const ta = document.createElement('textarea'); ta.value = t; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-1000px;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (x) {} ta.remove(); }
  }
  function qaDoc(el, it, si) {
    const sibs = G.items.filter(x => x.cat === it.cat);
    el.innerHTML = `<div class="title"><span class="gd-cat">${e(it.cat)}</span><h1>${e(it.title)}</h1><p>손님에게 보낼 답은 <b>복사</b>해서 카톡·문자로 그대로 보내면 돼요. 회색 칸은 직원만 보는 메모예요.</p></div>
      <div class="gd-cats gdq-sib">${sibs.map(x => `<a href="#/guide/${e(x.id)}" class="${x.id === it.id ? 'on' : ''}">${e(x.title)}</a>`).join('')}</div>
      <article class="gd-doc gdq-doc">${it.qa.map((x, k) => `<section class="gdq" id="gs${k + 1}">
        <h3 class="gdq-q"><span class="gdq-n">Q</span><span>${e(x.q)}</span></h3>
        <div class="gdq-a"><div class="gdq-lab">손님에게 보낼 답${x.br ? ` · ${e(x.br)}` : ''}</div><div class="gdq-txt">${autolink(x.a)}</div>
          <div class="gdq-act"><button class="pill wine" data-cp="${k}">복사</button>${navigator.share ? `<button class="pill line" data-sh="${k}">보내기</button>` : ''}</div></div>
        ${x.note ? `<div class="gdq-note"><span class="gdq-lab2">직원만</span>${autolink(x.note)}</div>` : ''}
      </section>`).join('')}</article>
      <p class="note" style="padding:14px var(--pad) 0">담당 ${e(it.owner || '본사')} · 최종수정 ${e(it.updated || G.updated || '')} · 새 질문은 계속 추가해요</p>
      <div class="gd-foot"><b>여기 없는 질문이 오면</b><p>손님께는 "확인하고 바로 알려 드릴게요"라고 하고, 본사에 물어봐 주세요. 받은 질문은 이 목록에 추가해요.</p><a class="pill line" href="#/ask" data-gq="1">본사에 질문하기</a></div>`;
    el.querySelector('.gdq-doc').onclick = ev => {
      const c = ev.target.closest('[data-cp]'), s2 = ev.target.closest('[data-sh]');
      if (c) { copyText(it.qa[+c.dataset.cp].a); c.textContent = '복사됨'; setTimeout(() => { c.textContent = '복사'; }, 1600); }
      if (s2 && navigator.share) navigator.share({ text: it.qa[+s2.dataset.sh].a }).catch(() => {});
    };
    el.querySelector('[data-gq]').onclick = () => sessionStorage.setItem('ask_prefill', '[대관 질문] ');
    const go = n => { const h = el.querySelector('#gs' + n); if (h) { h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); h.classList.add('gd-flash'); setTimeout(() => h.classList.remove('gd-flash'), 1800); } };
    if (si) setTimeout(() => go(si), 60);
    const q = sessionStorage.getItem('gd_q'); sessionStorage.removeItem('gd_q');
    if (q) { const terms = expand(q).filter(t => t.length > 1); const art = el.querySelector('.gdq-doc'); if (art && terms.length) { const walk = document.createTreeWalker(art, NodeFilter.SHOW_TEXT); const hits = []; let n; while ((n = walk.nextNode())) { if (n.parentNode.closest('button')) continue; const s = norm(n.nodeValue); if (terms.some(t => s.includes(t))) hits.push(n); } hits.slice(0, 12).forEach(tn => { const sp = document.createElement('span'); sp.className = 'gd-hl'; tn.parentNode.replaceChild(sp, tn); sp.appendChild(tn); }); } }
  }
  /* 기존 화면의 Notion 링크를 HR 가이드로 바꾼다 (core.js는 건드리지 않음) */
  function relink(root) {
    root.querySelectorAll('a[href*="notion.so"], a[href*="notion.com"]').forEach(a => {
      if (a.dataset.gd) return; a.dataset.gd = '1';
      const leave = /휴가|휴직|규정 전문/.test(a.textContent) || /2decdbb0aa92805198ffe1b733f68b6e/.test(a.href);
      a.setAttribute('href', leave ? '#/guide/01' : '#/guide'); a.removeAttribute('target'); a.removeAttribute('rel');
      a.querySelectorAll('.u, .t2').forEach(x => { if (/Notion/i.test(x.textContent)) x.textContent = x.classList.contains('t2') ? '휴가 · 급여 · 복지 · 규칙 검색' : 'HR 가이드에서 읽기'; });
      if (/Notion/i.test(a.textContent) && !a.children.length) a.textContent = 'HR 가이드에서 보기';
      const t1 = a.querySelector('.t1'); if (t1 && /휴가 및 휴직 가이드/.test(t1.textContent) && a.closest('.list')) { t1.textContent = 'HR 가이드'; a.setAttribute('href', '#/guide'); }
    });
    const qb = root.querySelector('#qb'); const pre = sessionStorage.getItem('ask_prefill');
    if (qb && pre && !qb.value) { qb.value = pre; sessionStorage.removeItem('ask_prefill'); }
  }
  const mo = new MutationObserver(() => { const v = document.getElementById('view'); if (v) relink(v); });
  const start = () => { const v = document.getElementById('view'); if (v) { mo.observe(v, { childList: true, subtree: true }); relink(v); } else setTimeout(start, 300); };
  start();
  window.TSB_GUIDE = { search, md, load, G };
})();
