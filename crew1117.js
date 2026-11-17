/* ═══ crew1117.js · 11/17 직원 의견 반영 (BETA 0.13) ═══
   1) 근무 신청 달력: 1일이 월요일 칸에 붙던 문제 (11/16 발주 탭 CSS .oth 충돌, 차현 님 Q261117-EEC1) → 지난달·다음달 날짜를 다시 보이고 'M/D'로 표시
   2) 아래 메뉴: 휴대폰에서 스크롤·키보드 때 떠오르던 문제, 글 쓸 때 입력창 가림 (윤홍민 님 CREW-020)
   3) 정산 메모 고치기·지우기 (이수용 님 Q261117-85D7) — 아래 정산 메모 블록
   4) 내 근무 · 연차: 남은 연차 + 이번 달 근무시간 (차현 님 CREW-022), 홈에 한 줄
   5) 화면의 실명 '장분도' → 서도민
   되돌리기: index.html 에서 crew1117.css / crew1117.js 두 줄 지우기 */

/* ── 1) 근무 신청 달력: 다른 달 날짜는 'M/D' ── */
(function(){
  const fix=()=>{if(typeof routeKey!=='function'||routeKey()!=='avail')return;
    document.querySelectorAll('#view .acd.oth[data-ds] .n:not([data-md])').forEach(n=>{const d=pd(n.parentElement.dataset.ds);n.dataset.md='1';n.textContent=(d.getMonth()+1)+'/'+d.getDate()});
    const lg=document.querySelector('#view .acl .lg');if(lg&&!lg.dataset.md){lg.dataset.md='1';lg.textContent='근무표처럼 월요일부터 · 요일을 누르면 그 요일 전부'}};
  new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
})();

/* ── 2) 키보드가 열리면 아래 메뉴 숨기기 + 입력칸이 가려지면 보이게 ── */
(function(){
  const isField=t=>t&&(t.tagName==='TEXTAREA'||(t.tagName==='INPUT'&&!/^(checkbox|radio|button|submit|file|range|color)$/i.test(t.type||''))||t.isContentEditable);
  let tm=null;
  document.addEventListener('focusin',e=>{if(!isField(e.target))return;clearTimeout(tm);document.body.classList.add('kb')});
  document.addEventListener('focusout',()=>{clearTimeout(tm);tm=setTimeout(()=>{if(!isField(document.activeElement))document.body.classList.remove('kb')},150)});
  const vv=window.visualViewport;
  if(vv){let last=0;vv.addEventListener('resize',()=>{const open=innerHeight-vv.height>140;document.body.classList.toggle('kbv',open);
    const a=document.activeElement;if(!open||!isField(a))return;const now=Date.now();if(now-last<250)return;last=now;
    const r=a.getBoundingClientRect();if(r.bottom>vv.height-12||r.top<0)a.scrollIntoView({block:'center'})})}
})();

/* ── 4) 내 근무 · 연차 (#/att) ── */
(function(){
  const C={};
  const getMonth=async ym=>{const k=ym||'';if(C[k]&&Date.now()-C[k].t<120000)return C[k].j;const j=await apiRaw('att.month',ym?{month:ym}:{});C[k]={t:Date.now(),j};return j};
  window.crewAttMonth=getMonth;
  const h1=n=>(Math.round((Number(n)||0)*10)/10).toString();
  const lvCard=b=>{if(!b)return '';
    if(!b.known)return `<div class="lvc"><div class="lvh"><span>남은 연차</span></div><p class="lvn">입사일이 등록되지 않아 계산할 수 없어요. 서포트센터에 알려 주세요.${b.used?` (지금까지 쓴 연차 ${h1(b.used)}일)`:''}</p></div>`;
    const ps=String(b.periodStart||'').replace(/-/g,'.'),pe=String(b.periodEnd||'').replace(/-/g,'.');
    return `<div class="lvc"><div class="lvh"><span>남은 연차</span><a class="lvgo" href="#/new/연차">연차 신청 ${I('next',14)}</a></div>
      <div class="lvb"><b>${h1(b.remain)}</b><em>일</em></div>
      <div class="lvs"><span>받은 연차 <b>${h1((b.granted||0)+(Number(b.adj)||0))}</b></span><span>쓴 연차 <b>${h1(b.used)}</b></span>${b.pending?`<span>결재 중 <b>${h1(b.pending)}</b></span>`:''}</div>
      <p class="lvn">${ps} ~ ${pe} 기준${b.firstYear?' · 입사 1년 안에는 한 달 일하면 1일씩 생겨요':''}</p></div>`};
  ROUTES.att=async function(v,arg){
    const today=ymd(new Date()),ym=/^\d{4}-\d{2}$/.test(arg||'')?arg:today.slice(0,7);
    const d0=pd(ym+'-01'),prev=ymd(new Date(d0.getFullYear(),d0.getMonth()-1,1)).slice(0,7),next=ymd(new Date(d0.getFullYear(),d0.getMonth()+1,1)).slice(0,7);
    const head=`${back('#/more','더보기')}<div class="title"><h1>내 근무 · 연차</h1><p>출퇴근 기록이 틀리면 점장님께 말씀해 주세요.</p></div>`;
    v.innerHTML=head+lvCard(S.data&&S.data.balance)+loading();
    let j;try{j=await getMonth(ym)}catch(e){v.innerHTML=head+lvCard(S.data&&S.data.balance)+`<div class="empty">${esc(e.message)}</div>`;return}
    if(!v.isConnected)return;
    const lv=(j.leaves||[]);
    v.innerHTML=head+lvCard(j.balance)+`
     <div class="wk"><a href="#/att/${prev}">${I('back',18)}</a><b>${d0.getFullYear()}년 ${d0.getMonth()+1}월</b>${ym<today.slice(0,7)?`<a href="#/att/${next}">${I('next',18)}</a>`:'<span style="width:18px"></span>'}</div>
     <div class="atsum"><div><span>근무한 날</span><b>${j.days}<em>일</em></b></div><div><span>근무 시간</span><b>${h1(j.total)}<em>시간</em></b></div></div>
     ${lv.length?`<div class="atlv">${lv.map(l=>`<span>${esc(l.type)} ${esc(fmtDay(l.start))}${l.end&&l.end!==l.start?' – '+esc(fmtDay(l.end)):''}${l.status==='진행중'?' · 결재 중':''}</span>`).join('')}</div>`:''}
     <div class="list" style="margin-top:6px">${j.items.length?j.items.map(r=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${fmtDay(r.date)}${r.branch&&S.data&&r.branch!==S.data.me.branch?` <small class="pchip">${esc(typeof brLabel==='function'?brLabel(r.branch):r.branch)}</small>`:''}</div><div class="t2">출근 ${esc(r.in||'-')} · 퇴근 ${esc(r.out||(r.date===today?'근무 중':'기록 없음'))}${/반경밖|확인/.test(r.v||'')?' · 위치 확인':''}</div></div><b style="font-size:18px">${r.hours?h1(r.hours)+'h':''}</b></div>`).join(''):'<div class="empty">이 달 출퇴근 기록이 없어요</div>'}</div>
     <p class="note">근무 시간은 출근~퇴근 기록 기준이에요. 휴게 시간 차감과 최종 근태는 월말 마감 때 확정돼요.</p>`;
  };
  /* 홈: 출근 카드 아래 한 줄 · 더보기 메뉴 이름 */
  const strip=()=>{if(typeof routeKey!=='function')return;const k=routeKey();
    if(k==='more'){const a=document.querySelector('#view a[href="#/att"]');if(a&&!a.dataset.lv){a.dataset.lv='1';const t1=a.querySelector('.t1'),t2=a.querySelector('.t2');if(t1)t1.textContent='내 근무 · 연차';if(t2)t2.textContent='남은 연차 · 이번 달 근무시간'}}
    if(k!==''||!S.data||!S.data.balance)return;const pb=document.getElementById('punchBlk');if(!pb||document.getElementById('lvstrip'))return;
    const b=S.data.balance,mo=new Date().getMonth()+1;
    const a=document.createElement('a');a.id='lvstrip';a.className='lvstrip';a.href='#/att';
    a.innerHTML=`<span><i>남은 연차</i><b>${b.known?h1(b.remain)+'일':'-'}</b></span><span><i>${mo}월 근무</i><b id="lvh">…</b></span>${I('next',16)}`;
    pb.insertAdjacentElement('afterend',a);
    getMonth('').then(j=>{const e=document.getElementById('lvh');if(e)e.textContent=h1(j.total)+'시간'}).catch(()=>{const e=document.getElementById('lvh');if(e)e.textContent='-'})};
  new MutationObserver(strip).observe(document.body,{childList:true,subtree:true});
})();


/* ── 5) 화면에 실명 '장분도' 대신 서도민 (11/17 코치님: 이름은 빼고 서포트센터, 꼭 필요하면 TOM 한글 이름) ──
   서버는 직원 화면을 표시이름으로 바꿔 보내고, 여기서는 본인 화면·남은 글자까지 화면에서만 바꾼다(입력값·저장값은 그대로) */
(function(){
  const RE=/장분도(\s?(이사|팀장))?/g,SKIP=/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION)$/;
  const fx=n=>{const v=n.nodeValue;if(!v||v.indexOf('장분도')<0||(n.parentNode&&SKIP.test(n.parentNode.nodeName)))return;n.nodeValue=v.replace(RE,'서도민')};
  const walk=n=>{if(n.nodeType===3)return fx(n);if(n.nodeType!==1||SKIP.test(n.nodeName))return;const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);let t;while((t=w.nextNode()))fx(t)};
  const go=()=>{walk(document.body);new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')fx(m.target);else m.addedNodes.forEach(walk)}}).observe(document.body,{childList:true,subtree:true,characterData:true})};
  if(document.body)go();else addEventListener('DOMContentLoaded',go);
})();
/* [11/17 crew1117.js 가 feat2.js 의 정산 메모를 대체: 고치기·지우기 추가] 정산 메모 (2026-11-12, v32: 모든 재직 직원 지점 선택 · 기본 = 내 매장): 일정산 시트 '일별메모'에 앱에서 바로 기록. API memo.get / memo.add */
(function(){
const bizDay=()=>ymd(new Date(Date.now()-6*3600e3)); /* 06시 전이면 어제 */
const numOk=s=>s===''||/^-?\d+(\.\d+)?$/.test(s);
const clean=s=>String(s||'').replace(/[,\s원]/g,'');
function lineHTML(items,i){
  const groups=[];items.forEach(it=>{let g=groups.find(x=>x.g===it.g);if(!g)groups.push(g={g:it.g,l:[]});g.l.push(it.item)});
  return `<div class="mline" data-i="${i}">
   <div class="mh"><b>${i+1}</b>${i?'<button class="mx" type="button" data-rm>삭제</button>':''}</div>
   <select class="in" data-k="item"><option value="">세부항목 고르기</option>${groups.map(g=>`<optgroup label="${esc(g.g||'기타')}">${g.l.map(n=>`<option>${esc(n)}</option>`).join('')}</optgroup>`).join('')}</select>
   <div class="mr2"><input class="in" data-k="qty" inputmode="decimal" placeholder="수량"><input class="in" data-k="amt" inputmode="numeric" placeholder="금액"></div>
   <input class="in" data-k="text" placeholder="누구에게 · 왜 (예: 단골 김OO님 트러플 프라이즈)">
  </div>`}
ROUTES.memo=async function(v,arg){
  const want=arg?decodeURIComponent(arg):'';
  v.innerHTML=`${back('#/')}<div class="title"><h1>정산 메모</h1><p>할인 · 서비스 · 기타매출을 일정산 시트 '일별메모'에 바로 적어요.</p></div><div id="mm">${loading()}</div>`;
  let j;try{j=await apiRaw('memo.get',want?{branch:want}:{})} /* apiRaw: 저장 직후 옛 캐시가 보이지 않게 항상 새로 읽음 */catch(e){$('#mm').innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  const el=$('#mm');if(!el)return;
  const items=j.items||[],pick=!j.branch;
  el.innerHTML=`${j.test?'<div class="mtest"><b>테스트 중</b> · 실제 지점 시트가 아닌 테스트 사본에 기록돼요</div>':''}
   ${(j.branches||[]).length?`<div class="presets mbr" style="padding:0 var(--pad)">${j.branches.map(b=>`<a href="#/memo/${encodeURIComponent(b)}"><button class="${b===j.branch?'on':''}">${esc(b)}${b===j.own?' <small>내 매장</small>':''}</button></a>`).join('')}</div>`:''}
   ${pick?'<div class="mpick">기록할 <b>지점을 먼저 골라 주세요</b>. 위 버튼 중 하나를 누르면 항목이 열려요.</div>':''}
   <div class="blk mform">
    <div class="mtop"><div><label class="f">일자</label><input class="in" type="date" id="md" value="${esc(j.today||bizDay())}" max="${ymd(new Date())}"></div>
     <div class="mwho"><label class="f">지점 · 작성자</label><div>${pick?'지점 선택 필요':esc(j.branch)} · ${esc(j.name)}</div></div></div>
    <p class="note" style="margin-top:8px;padding:0">새벽 6시 전에는 어제 날짜로 잡혀요. 한 번에 여러 줄 적을 수 있어요.</p>
    <div id="ml"${pick?' class="moff"':''}>${lineHTML(items,0)}</div>
    <button class="pill line full" id="madd" type="button" style="margin-top:10px"${pick?' disabled':''}>+ 줄 추가</button>
    <button class="pill wine full" id="msave" type="button" style="margin-top:10px"${pick?' disabled':''}>${pick?'지점을 골라 주세요':'시트에 저장'}</button>
   </div>
   <div class="sec"><h2>내 최근 메모 <small style="font-size:13px;color:var(--mute);font-weight:600">3일</small></h2></div>
   <div class="blk" id="mmine" style="padding-top:0">${mineHTML(j.mine||[])}</div>`;
  const ml=$('#ml');
  $('#mmine').querySelectorAll('[data-ed]').forEach(b=>b.onclick=()=>editSheet(j,(j.mine||[])[+b.dataset.ed],items,()=>ROUTES.memo(v,arg)));
  const wire=()=>{ml.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{b.closest('.mline').remove();ml.querySelectorAll('.mline .mh b').forEach((x,i)=>x.textContent=i+1)});
    ml.querySelectorAll('select[data-k=item]').forEach(s=>s.onchange=()=>{const a=s.closest('.mline').querySelector('[data-k=amt]');a.placeholder=/재고조정/.test(s.value)?'금액 (비워도 돼요)':'금액'})};
  wire();
  $('#madd').onclick=()=>{const d=document.createElement('div');d.innerHTML=lineHTML(items,ml.children.length);ml.appendChild(d.firstElementChild);wire();ml.lastElementChild.querySelector('select').focus()};
  $('#msave').onclick=async e=>{if(!j.branch)return toast('지점을 먼저 골라 주세요');
    const date=$('#md').value;if(!date)return toast('일자를 골라 주세요');
    const lines=[...ml.querySelectorAll('.mline')].map(m=>({item:m.querySelector('[data-k=item]').value,qty:clean(m.querySelector('[data-k=qty]').value),amt:clean(m.querySelector('[data-k=amt]').value),text:m.querySelector('[data-k=text]').value.trim(),date}))
      .filter(l=>l.item||l.qty||l.amt||l.text);
    if(!lines.length)return toast('세부항목과 내용을 적어 주세요');
    for(let i=0;i<lines.length;i++){const l=lines[i],k=(lines.length>1?(i+1)+'번째 줄: ':'');
      if(!l.item)return toast(k+'세부항목을 골라 주세요');
      if(!numOk(l.qty))return toast(k+'수량은 숫자로 적어 주세요');
      if(!numOk(l.amt))return toast(k+'금액은 숫자로 적어 주세요');
      if(!l.amt&&!/재고조정/.test(l.item))return toast(k+'금액을 적어 주세요');
      if(l.text.length<2)return toast(k+'내용(누구에게 · 왜)을 적어 주세요')}
    busy(e.currentTarget,true,'저장 중…');
    try{const r=await apiRaw('memo.add',{branch:j.branch,lines});toast(`${r.n}줄 저장했어요${r.test?' (테스트 사본)':''}`);ROUTES.memo(v,arg)}
    catch(x){toast(x.message,4000);busy(e.currentTarget,false)}
  };
};
function mineHTML(list){
  if(!list.length)return '<div class="empty">최근 3일 동안 쓴 메모가 없어요</div>';
  let last='';return list.map((m,i)=>{const h=m.date!==last?`<div class="mday">${fmtDay(m.date)}</div>`:'';last=m.date;
    return `${h}<div class="qa mrow"><div class="m">${esc(m.g||'')}${m.qty!==''&&m.qty!=null?' · '+esc(m.qty)+'개':''}</div><div class="q"><b>${esc(m.item)}</b>${m.amt!==''&&m.amt!=null?' · '+won(m.amt):''}</div><div class="mt">${esc(m.text)}</div><button type="button" class="medit" data-ed="${i}">고치기</button></div>`}).join('')}
/* 정산 메모 고치기·지우기 (이수용 님 의견 Q261117-85D7, 11/17): 내가 쓴 최근 3일 메모만. 서버 memo.edit */
function editSheet(j,m,items,done){
  const groups=[];items.forEach(it=>{let g=groups.find(x=>x.g===it.g);if(!g)groups.push(g={g:it.g,l:[]});g.l.push(it.item)});
  const min=addD(j.today||bizDay(),-2),max=ymd(new Date());
  openSheet(`<h2>메모 고치기</h2><p class="note" style="padding:2px 0 10px">${esc(j.branch)} · 시트 ${m.row}행 · 최근 3일 안에 내가 쓴 메모만 고칠 수 있어요.</p>
   <label class="f">일자</label><input class="in" type="date" id="ed_d" value="${esc(m.date)}" min="${min}" max="${max}">
   <label class="f">세부항목</label><select class="in" id="ed_i">${groups.map(g=>`<optgroup label="${esc(g.g||'기타')}">${g.l.map(n=>`<option ${n===m.item?'selected':''}>${esc(n)}</option>`).join('')}</optgroup>`).join('')}</select>
   <label class="f">수량 · 금액</label><div class="mr2"><input class="in" id="ed_q" inputmode="decimal" placeholder="수량" value="${m.qty!==''&&m.qty!=null?esc(m.qty):''}"><input class="in" id="ed_a" inputmode="numeric" placeholder="금액" value="${m.amt!==''&&m.amt!=null?esc(m.amt):''}"></div>
   <label class="f">내용</label><input class="in" id="ed_t" value="${esc(m.text)}" placeholder="누구에게 · 왜">
   <div class="btnrow" style="padding:18px 0 0"><button class="pill line" id="ed_x">이 줄 지우기</button><button class="pill wine" id="ed_s">고쳐서 저장</button></div>`,el=>{
    const orig={date:m.date,item:m.item,amt:m.amt,text:m.text};
    el.querySelector('#ed_s').onclick=async e=>{const line={date:el.querySelector('#ed_d').value,item:el.querySelector('#ed_i').value,qty:clean(el.querySelector('#ed_q').value),amt:clean(el.querySelector('#ed_a').value),text:el.querySelector('#ed_t').value.trim()};
      if(!numOk(line.qty))return toast('수량은 숫자로 적어 주세요');if(!numOk(line.amt))return toast('금액은 숫자로 적어 주세요');
      if(!line.amt&&!/재고조정/.test(line.item))return toast('금액을 적어 주세요');if(line.text.length<2)return toast('내용(누구에게 · 왜)을 적어 주세요');
      busy(e.currentTarget,true,'저장 중…');
      try{await apiRaw('memo.edit',{branch:j.branch,row:m.row,orig,line});toast('고쳤어요');el.remove();done()}catch(x){toast(x.message,4000);busy(e.currentTarget,false)}};
    el.querySelector('#ed_x').onclick=async e=>{if(!confirm('이 메모를 시트에서 지울까요?\n'+m.item+(m.amt!==''&&m.amt!=null?' · '+won(m.amt):'')+'\n'+m.text))return;
      busy(e.currentTarget,true,'지우는 중…');
      try{await apiRaw('memo.edit',{branch:j.branch,row:m.row,orig,del:true});toast('지웠어요');el.remove();done()}catch(x){toast(x.message,4000);busy(e.currentTarget,false)}};
  })}
})();
