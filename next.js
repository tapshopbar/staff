/* People next (2026-11 개편 미리보기): 스플래시, 홈 개인경비 카드, 교육·질문함·정책·슬랙 */
const EXP_URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbwxfxCgJu7EyfX-9eO4AT2IJQtuavQFa5iyYJwiB4G1YOCbDFNKw6aWBZq1AxTdZwmO/exec';
const SLACK_APP='slack://open?team=T0A61G7CADT', SLACK_WEB='https://tapshopbar.slack.com';
function todayK(){const n=new Date();return `${n.getMonth()+1}월 ${n.getDate()}일 ${WD[n.getDay()]}요일`}
function splash(ms){return new Promise(res=>{const d=document.createElement('div');d.className='splash';
  d.innerHTML=`<img src="${LOGO}" alt="TAP SHOP BAR"><div class="crew"><i style="background:#F43131"></i><i style="background:#156DFF"></i><i style="background:#FFC100"></i><span style="margin-left:8px">CREW</span></div>`;
  document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('on'));
  setTimeout(()=>{res();d.classList.remove('on');setTimeout(()=>d.remove(),380)},ms)})}
ROUTES.edu=function(v){v.innerHTML=`${back('#/')}<div class="title"><span class="new">준비중</span><h1 style="margin-top:10px">교육</h1><p>와인 기초, 서비스, 오픈·마감 교육을 여기서 볼 수 있게 준비하고 있어요.</p></div>
  <div class="blk"><p class="note">지금은 홈의 와인 퀴즈로 먼저 연습해 보세요.</p><a class="pill ink" href="#/quiz" style="margin-top:12px">와인 퀴즈 하기</a></div>`};
ROUTES.slack=function(v){v.innerHTML=`${back('#/')}<div class="title"><h1>슬랙</h1><p>업무 소통은 슬랙 TAP SHOP BAR에서 해요.</p></div>
  <div class="blk"><a class="pill ink full" href="${SLACK_APP}">슬랙 앱으로 열기</a><a class="pill line full" style="margin-top:10px" href="${SLACK_WEB}" target="_blank" rel="noopener">웹에서 열기</a>
  <p class="note" style="margin-top:14px">앱이 안 열리면 웹에서 열기를 눌러 주세요. 회사 계정(@tsb.wine)으로 들어가요.</p></div>`;
  setTimeout(()=>{location.href=SLACK_APP},150)};
ROUTES.policy=function(v){v.innerHTML=`${back('#/')}<div class="title"><h1>회사 정책</h1><p>탭샵바인이 꼭 알아둘 것만 모았어요.</p></div>
 <div class="blk pol">
  <h3>회사 계정 사용 원칙</h3><ul>
   <li>회사 계정(@tsb.wine)은 본인만 씁니다. 비밀번호는 누구와도 공유하지 않습니다.</li>
   <li>퇴사하는 날 회사 계정과 앱 접속이 닫힙니다. 필요한 파일은 퇴사 1주 전까지 공유 폴더로 옮겨 주세요.</li>
   <li>외부 협력사에는 회사 계정을 만들지 않습니다. 필요한 파일만 공유합니다.</li></ul>
  <h3>개인경비 회사 지출 기준</h3><ul>
   <li>11/1 결제분부터 개인경비 청구로 받아요. 10월까지 쓴 비용은 기존 개인지출 시트로 한울 매니저에게 내 주세요.</li>
   <li>개인카드로 결제해도 되는 곳: 쿠팡 · 네이버 · 소금집. 결제 전에 수쉐프방에 거래처 · 금액을 먼저 올려 주세요.</li>
   <li>한 번에 10만원 미만으로 나눠 결제해 주세요.</li>
   <li>마감 · 업무 이동 택시비는 1회 3만원까지예요 (카카오T 이용내역 캡처 첨부).</li>
   <li>CJ프레시웨이 · 커피 리브레 · 미트프렌즈 · 닭리닭매 · 에디션덴마크는 본사가 계좌이체로 결제해요. 개인카드로 결제하지 말고 본사에 발주 요청해 주세요.</li></ul>
  <h3>휴가</h3><ul><li>연차 · 휴가는 점장 승인 후 매니저 승인으로 확정돼요.</li></ul>
  <a class="pill line full" style="margin-top:24px" href="https://www.notion.so/34ccdbb0aa9280b99452f801728669c6" target="_blank" rel="noopener">Notion에서 전체 보기</a>
 </div>`};
const ASK_KINDS=['질문','제안','불편','칭찬'];
ROUTES.ask=async function(v){
  const hq=S.data&&S.data.x&&S.data.x.isHQ;
  v.innerHTML=`${back('#/')}<div class="title"><h1>질문 · 피드백</h1><p>궁금한 것, 제안, 불편한 점, 칭찬까지 본사에 바로 전해요.</p></div>
  <div class="blk"><div class="askk" id="kk">${ASK_KINDS.map((k,i)=>`<button data-k="${k}" class="${i?'':'on'}">${k}</button>`).join('')}</div>
   <textarea class="in" id="qb" rows="5" placeholder="내용을 적어 주세요"></textarea>
   <label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:14px;font-weight:600"><input type="checkbox" id="qa"> 익명으로 보내기</label>
   <p class="note" style="margin-top:6px">익명이면 답변하는 사람에게 이름이 보이지 않아요.</p>
   <button class="pill wine full" id="qs" style="margin-top:12px">보내기</button></div>
  <div class="sec"><h2>${hq?'전체 질문함':'내 질문'}</h2></div><div class="blk" id="ql" style="padding-top:0"><div class="sk" style="height:80px"></div></div>`;
  let kind='질문';v.querySelectorAll('#kk button').forEach(b=>b.onclick=()=>{kind=b.dataset.k;v.querySelectorAll('#kk button').forEach(x=>x.classList.toggle('on',x===b))});
  $('#qs').onclick=async e=>{const body=$('#qb').value.trim();if(body.length<2)return toast('내용을 적어 주세요');busy(e.currentTarget,true);
    try{await api('ask.create',{kind,body,anon:$('#qa').checked?'1':''});toast('보냈어요. 답변이 오면 알려 드릴게요');ROUTES.ask(v)}catch(x){toast(x.message);busy(e.currentTarget,false)}};
  try{const j=await api('ask.list');const el=$('#ql');if(!el)return;
    el.innerHTML=j.items.length?j.items.map(q=>`<div class="qa"><div class="m">${esc(q.kind)} · ${esc(String(q.at).slice(5,16))}${hq?' · '+esc(q.name)+(q.branch?' ('+esc(q.branch)+')':''):''} · ${esc(q.status)}</div><div class="q">${esc(q.body)}</div>
      ${q.answer?`<div class="a"><b>본사 답변</b><br>${esc(q.answer)}</div>`:''}
      ${hq&&!q.answer?`<textarea class="in" data-ans="${esc(q.id)}" rows="2" placeholder="답변 쓰기" style="margin-top:8px"></textarea><button class="pill sm ink" data-send="${esc(q.id)}" style="margin-top:6px">답변 보내기</button>`:''}
      ${q.mine&&q.status==='접수'?`<button class="pill sm line" data-del="${esc(q.id)}" style="margin-top:6px">취소</button>`:''}</div>`).join(''):'<div class="empty">아직 보낸 질문이 없어요</div>';
    el.querySelectorAll('[data-send]').forEach(b=>b.onclick=async()=>{const id=b.dataset.send;const t=el.querySelector(`[data-ans="${id}"]`).value.trim();if(!t)return toast('답변을 적어 주세요');busy(b,true);try{await api('ask.answer',{id,answer:t});toast('답변했어요');ROUTES.ask(v)}catch(x){toast(x.message);busy(b,false)}});
    el.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!confirm('이 질문을 취소할까요?'))return;try{await api('ask.delete',{id:b.dataset.del});toast('취소했어요');ROUTES.ask(v)}catch(x){toast(x.message)}});
  }catch(e){const el=$('#ql');if(el)el.innerHTML=`<div class="empty">${esc(e.message)}</div>`}
};

/* 뒤로 버튼: 앱 안 이동 기록이 있으면 history.back, 없으면 홈 */
/* crew.tsb.wine 이 붙이는 #/sso=… 토큰은 주소창·기록에 남기지 않고 홈으로 */
const SSO_T=(location.hash.match(/^#\/?sso=([\w-]+\.[\w-]+)$/)||[])[1]||'';
if(/^#\/?(sso=|home$|$)/.test(location.hash)&&location.hash){history.replaceState(null,'',location.pathname+location.search+'#/')}
/* crew SSO: 로그인 안 된 상태면 티켓으로 세션 받기 (실패하면 조용히 로그인 화면). 이미 로그인돼 있으면 티켓 무시 */
const _bootOrig=boot;
boot=async function(){
  if(SSO_T&&!S.ssoTried){S.ssoTried=1;
    if(!S.token){try{const j=await apiRaw('auth.sso',{ticket:SSO_T});if(j&&j.token){S.token=j.token;localStorage.setItem('tsbp_token',j.token);if(j.me&&j.me.email)localStorage.setItem('tsbp_email',j.me.email);S.fresh=1}}catch(e){}}}
  return _bootOrig();
};
S.hist=[location.hash||'#/'];
window.addEventListener('hashchange',()=>{const h=location.hash||'#/';const H=S.hist;if(H.length>1&&H[H.length-2]===h)H.pop();else if(H[H.length-1]!==h)H.push(h)});
function goBack(){if(S.hist&&S.hist.length>1)history.back();else location.hash='#/'}
function askLogout(){if(confirm('로그아웃할까요? 다음에 다시 로그인해야 해요.')){S.hist=['#/'];if(location.hash&&location.hash!=='#/')history.replaceState(null,'',location.pathname);logout()}}
function shiftK(s){if(!s)return'';const d=pd(s);return `${d.getMonth()+1}/${d.getDate()}(${WD[d.getDay()]})`}

/* ── 2026-11-07: crew와 같은 로그인 화면 + 로그인 직후 환영 화면 ── */
const CREW_DOTS='<i style="background:#F43131"></i><i style="background:#156DFF"></i><i style="background:#FFC100"></i>';
function renderLogin(step='email',email=''){
  document.body.classList.remove('wide');
  const gsvg='<svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>';
  const open=step==='code'||S.emailOpen;
  $('#root').innerHTML=`<div class="clogin"><div class="xlbox">
    <img class="cwm" src="${LOGO}" alt="TAP SHOP BAR"><div class="crew">${CREW_DOTS}<span>CREW</span></div>
    ${step==='code'?`<p class="cmsg">${esc(email)} 으로 보낸<br>6자리 코드를 넣어 주세요.</p>
      <input class="cin otp" id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="······">
      <button class="cpill" id="go">시작하기</button><button class="clink" id="re" type="button">다른 이메일로</button>`
    :`<p class="cmsg">탭샵바 계정(@tsb.wine)으로 로그인해 주세요.</p>
      <button class="cpill" id="gbtn" type="button">${gsvg}<span>Google 계정으로 로그인</span></button>
      <div id="lerr" class="cerr" style="display:none"></div>
      <p class="chint">카톡 등 앱 안에서 열었다면 Chrome/Safari 같은 외부 브라우저로 열어 주세요.</p>
      <button class="clink" id="emt" type="button">이메일 코드로 로그인</button>
      <div class="cmail" id="cmail" style="${open?'':'display:none'}">
        <input class="cin" id="em" name="email" type="email" inputmode="email" autocomplete="username email" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" placeholder="name@tsb.wine" value="${esc(email||localStorage.getItem('tsbp_email')||'')}">
        <button class="cpill line" id="go" type="button">코드 받기</button></div>`}
  </div></div>`;
  if(step==='email'){
    initGoogle();
    $('#emt').onclick=()=>{S.emailOpen=!S.emailOpen;$('#cmail').style.display=S.emailOpen?'':'none';if(S.emailOpen)$('#em').focus()};
    const go=$('#go');
    const f=async()=>{const em=$('#em').value.trim().toLowerCase();const er=$('#lerr');er.style.display='none';if(!em)return;busy(go,true,'확인 중…');
      try{await api('auth.request',{email:em});localStorage.setItem('tsbp_email',em);renderLogin('code',em)}
      catch(e){busy(go,false);er.innerHTML=/직원 이메일이 아니/.test(e.message)?'<b>탭샵바 직원 이메일이 아니에요.</b><br>등록된 회사 이메일로 다시 확인해 주시고, 처음이라면 점장님께 등록을 요청해 주세요.':esc(e.message);er.style.display='block'}};
    go.onclick=f;$('#em').onkeydown=e=>e.key==='Enter'&&f();
  }else{
    $('#re').onclick=()=>{S.emailOpen=true;renderLogin('email',email)};
    const c=$('#code'),go=$('#go');c.focus();
    const f=async()=>{if(c.value.length<6)return;busy(go,true,'확인 중…');
      try{const j=await api('auth.verify',{email,code:c.value});S.token=j.token;localStorage.setItem('tsbp_token',j.token);S.fresh=1;S.emailOpen=false;boot()}catch(e){toast(e.message);busy(go,false)}};
    go.onclick=f;c.oninput=()=>{c.value=c.value.replace(/\D/g,'');if(c.value.length===6)f()};
  }
}
function splash(ms){return new Promise(res=>{const d=document.createElement('div');d.className='welcome';
  d.innerHTML=`<div class="wbg"></div><div class="wshade"></div>
   <div class="wtop"><img src="${LOGO}" alt="TAP SHOP BAR"><span class="new">PEOPLE</span></div>
   <div class="wbot"><span class="tag"><i class="new">NEW</i> 직원 전용 앱</span><h1>함께 일하는<br>탭샵바인의 공간.</h1><p>출퇴근, 스케줄, 휴가, 경비까지. 폰 하나로 끝내요.</p></div>`;
  d.style.setProperty('--wdur',ms+'ms');
  document.body.appendChild(d);requestAnimationFrame(()=>requestAnimationFrame(()=>d.classList.add('on')));
  setTimeout(()=>{res();d.classList.remove('on');d.classList.add('off');setTimeout(()=>d.remove(),360)},ms)})}

/* ── 직급 · 연차 · 배지 (2026-11-09 미리보기) ── */
const TITLE_EN={'수습':'Probation','사원':'Crew','트레이너':'Trainer','부점장':'Assistant Manager','수쉐프':'Sous Chef','쉐프':'Chef','점장':'Store Manager','매니저':'Manager','샵매니저':'Shop Manager','CTO':'Chief Technology Officer','IT 팀장':'IT Lead','팀장':'Team Lead','팀원':'Staff','대표':'CEO','이사':'Director','사내이사':'Director','파트타임':'Part-time'};
function tenure(hire){if(!hire)return null;const h=new Date(String(hire).replace(/\./g,'-').trim());if(isNaN(h))return null;const m=(new Date()-h)/2629800000;if(m<0)return null;return {y:Math.floor(m/12)+1,months:Math.floor(m),probation:m<3}}
const TEN_TONE=['#E7CDD3','#B5707E','#8E1B32','#156DFF','#FFC100'];const TEN_INK=[1,0,0,0,1];
function idChips(me){
  const t=me.title||me.role||'';const en=TITLE_EN[t]||'';const tn=tenure(me.hire);
  const ten=tn?(tn.probation?`<span class="idc ten" style="--tc:#8C8C88">수습 ${tn.months+1}개월</span>`:`<span class="idc ten" style="--tc:${TEN_TONE[Math.min(tn.y,5)-1]};${TEN_INK[Math.min(tn.y,5)-1]?'--ti:#0E0E0E':''}"><i></i>${tn.y}년 차</span>`):'';
  return t?`<div class="idrow"><span class="idc rank"><b>${esc(t)}</b>${en?`<em>${esc(en)}</em>`:''}</span>${ten}</div>`:'';
}
const BADGES=[
 {k:'hybrid',n:'Hybrid',ko:'하이브리드',d:'홀과 주방을 혼자서도 운영해요',c:'linear-gradient(90deg,#6E1426 50%,#141B33 50%)',i:'M7 4v7a2 2 0 0 0 4 0V4M9 11v9M16 4c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v7'},
 {k:'som1',n:'Sommelier I',ko:'소믈리에 1',d:'와인 기초 · WSET 1 인정',c:'#6E1426',s:1,i:'M8 3h8l-.5 5a3.5 3.5 0 0 1-7 0L8 3zM12 11.5V19M8.5 20h7'},
 {k:'som2',n:'Sommelier II',ko:'소믈리에 2',d:'한 단계 더 · WSET 2 인정',c:'#6E1426',s:2,i:'M8 3h8l-.5 5a3.5 3.5 0 0 1-7 0L8 3zM12 11.5V19M8.5 20h7'},
 {k:'som3',n:'Sommelier III',ko:'소믈리에 3',d:'전문가 · WSET 3 인정',c:'#4A0B18',s:3,i:'M8 3h8l-.5 5a3.5 3.5 0 0 1-7 0L8 3zM12 11.5V19M8.5 20h7'},
 {k:'barista',n:'Barista',ko:'바리스타',d:'매일 커피 품질을 지켜요',c:'#6B4A35',i:'M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1.5 1.5 1.5 3M12 3c0 1.5 1.5 1.5 1.5 3'},
 {k:'tap',n:'Tap Master',ko:'탭 마스터',d:'64탭 세척·관리·재고',c:'#141B33',i:'M6 7h9v4H6zM15 9h3v6M10 11v3M8 14h4M10 17v2'},
 {k:'lang',n:'Language',ko:'랭귀지',d:'영어·일어·중국어 응대',c:'#B5707E',i:'M4 5h16v10H9l-4 4v-4H4zM8 9h8M8 12h5'},
 {k:'key',n:'Keyholder',ko:'키홀더',d:'오픈·마감 책임자 인증',c:'#8A6A2E',i:'M8 14a4 4 0 1 1 3.5-6L20 8v3h-2v2h-2v-2h-4.5A4 4 0 0 1 8 14z'},
 {k:'kind',n:'Kindness',ko:'카인드니스',d:'지점별 매달 1명, 매달 바뀌어요',c:'#FFC100',dark:1,i:'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'}
];
function badgeIcon(b,sz){const st=b.s?`<span class="bstars">${'★'.repeat(b.s)}</span>`:'';return `<span class="bdg" style="--bg:${b.c};--sz:${sz}px;${b.dark?'--fg:#0E0E0E':''}"><svg viewBox="0 0 24 24" width="${Math.round(sz*.52)}" height="${Math.round(sz*.52)}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${b.i}"/></svg>${st}</span>`}
const STRIP_KEYS=['hybrid','som1','tap','kind'];
function badgeStrip(){return `<a class="bstrip" href="#/badges" aria-label="배지 준비 중, 눌러서 보기">${BADGES.filter(b=>STRIP_KEYS.includes(b.k)).map(b=>badgeIcon(b,26)).join('')}<span class="soon">COMING SOON</span></a>`}
ROUTES.badges=function(v){
  v.innerHTML=`${back()}<section class="hero nhero bhero"><span class="tag"><i class="new">BADGE</i> COMING SOON</span><h1 style="margin:12px 0 8px">할 줄 아는 것이<br>배지가 돼요.</h1><p class="bsub">유니폼 왼쪽 가슴에 다는 진짜 배지. 지금 함께 만들고 있어요.</p></section>
  <div class="bgrid">${BADGES.map(b=>`<div class="bcard">${badgeIcon(b,64)}<b>${esc(b.n)}</b><span class="ko">${esc(b.ko)}</span><span class="bd">${esc(b.d)}</span><i class="lock">준비 중</i></div>`).join('')}
  <div class="bcard more"><span class="bdg" style="--bg:transparent;--sz:64px;border:1.5px dashed #C9C4BE;color:#9A948D"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span><b>New</b><span class="ko">새 배지</span><span class="bd">함께 정해서 더 만들 수 있어요</span></div></div>
  <p class="bnote">배지 기준과 시작 시기는 정해지면 공지로 알려 드릴게요.</p>`;
};
const GROUP_ORDER=['대표','이사','매니저','IT Team','청계','상암','마곡','동대문','서여의도'];
function peopleGroup(p){if(p.role==='대표')return '대표';if(p.role==='이사')return '이사';if(p.role==='매니저')return '매니저';if(/^(CTO|IT)/.test(p.title||''))return 'IT Team';return p.branch||'기타'}
function sortGroups(ks){return ks.sort((a,b)=>{const ia=GROUP_ORDER.indexOf(a),ib=GROUP_ORDER.indexOf(b);return (ia<0?99:ia)-(ib<0?99:ib)})}
