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
   <li>CJ프레시웨이 · 커피 리브레 · 미트프렌즈 · 닭리닭매 · 에디션덴마크는 서포트센터가 계좌이체로 결제해요. 개인카드로 결제하지 말고 서포트센터에 발주 요청해 주세요.</li></ul>
  <h3>휴가</h3><ul><li>연차 · 휴가는 점장 승인 후 매니저 승인으로 확정돼요.</li></ul>
  <a class="pill line full" style="margin-top:24px" href="https://www.notion.so/34ccdbb0aa9280b99452f801728669c6" target="_blank" rel="noopener">Notion에서 전체 보기</a>
 </div>`};
const ASK_KINDS=['질문','제안','불편','칭찬'];
ROUTES.ask=async function(v){
  const hq=S.data&&S.data.x&&S.data.x.isHQ;
  v.innerHTML=`${back('#/')}<div class="title"><h1>질문 · 피드백</h1><p>궁금한 것, 제안, 불편한 점, 칭찬까지 서포트센터에 바로 전해요.</p></div>
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
    el.innerHTML=j.items.length?j.items.map(q=>`<div class="qa"><div class="m">${esc(q.kind)} · ${esc(String(q.at).slice(5,16))}${hq?' · '+esc(q.name)+(q.branch?' ('+esc(brLabel(q.branch))+')':''):''} · ${esc(q.status)}</div><div class="q">${esc(q.body)}</div>
      ${q.answer?`<div class="a"><b>서포트센터 답변</b><br>${esc(q.answer)}</div>`:''}
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
 {k:'pass',n:'Passport',ko:'패스포트',d:'다른 지점 지원을 갈 때마다 도장 한 칸. 5칸을 채우면 완성',c:'#2F4858',i:'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM12 7.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM9.2 10.5h5.6M9.5 17h5'},
 {k:'ssc',n:'Support Center',ko:'서포트센터',d:'전 지점을 돕는 팀. 매장이 잘 돌아가게 뒤에서 챙겨요',c:'#156DFF',i:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6'},
 {k:'kind',n:'Kindness',ko:'카인드니스',d:'지점별 매달 1명, 매달 바뀌어요',c:'#FFC100',dark:1,i:'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'}
];
function badgeIcon(b,sz){const st=b.s?`<span class="bstars">${'★'.repeat(b.s)}</span>`:'';return `<span class="bdg" style="--bg:${b.c};--sz:${sz}px;${b.dark?'--fg:#0E0E0E':''}"><svg viewBox="0 0 24 24" width="${Math.round(sz*.52)}" height="${Math.round(sz*.52)}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${b.i}"/></svg>${st}</span>`}
const STRIP_KEYS=['hybrid','som1','pass','kind'];
function myBadges(){return (S.data&&S.data.badges)||[]}
function badgeStrip(){const got=myBadges();
  if(!got.length)return `<a class="bstrip" href="#/badges" aria-label="배지 준비 중, 눌러서 보기">${BADGES.filter(b=>STRIP_KEYS.includes(b.k)).map(b=>badgeIcon(b,26)).join('')}<span class="soon">COMING SOON</span></a>`;
  const gb=BADGES.filter(b=>got.includes(b.k)), rest=BADGES.filter(b=>STRIP_KEYS.includes(b.k)&&!got.includes(b.k));
  return `<a class="bstrip got" href="#/badges" aria-label="내 배지 보기">${gb.map(b=>`<span class="gotb">${badgeIcon(b,30)}${gb.length===1?`<b>${esc(b.n)}</b>`:''}</span>`).join('')}<span class="dim">${rest.map(b=>badgeIcon(b,22)).join('')}</span><span class="soon">MY BADGE</span></a>`}
ROUTES.badges=function(v){
  const got=myBadges(), H=(S.data&&S.data.badgeHolders)||{};
  const live=k=>(H[k]||[]).length>0;
  v.innerHTML=`${back()}<section class="hero nhero bhero"><span class="tag"><i class="new">BADGE</i> ${got.length?'MY BADGE '+got.length:'COMING SOON'}</span>${got.length?`<div class="bmine">${BADGES.filter(b=>got.includes(b.k)).map(b=>`<div>${badgeIcon(b,84)}<b>${esc(b.n)}</b><span>${esc(b.d)}</span></div>`).join('')}</div>`:''}<h1 style="margin:12px 0 8px">할 줄 아는 것이<br>배지가 돼요.</h1><p class="bsub">유니폼 왼쪽 가슴에 다는 진짜 배지. ${got.length?'받은 배지는 근무표 이름 옆에도 보여요.':'지금 함께 만들고 있어요.'}</p></section>
  <div class="bgrid">${BADGES.map(b=>`<div class="bcard ${got.includes(b.k)?'got':''}">${badgeIcon(b,64)}<b>${esc(b.n)}</b><span class="ko">${esc(b.ko)}</span><span class="bd">${esc(b.d)}</span>${live(b.k)?`<span class="bwho">${H[b.k].length}명 · ${H[b.k].map(x=>esc(x.name)).join(', ')}</span>`:''}${got.includes(b.k)?'<i class="lock gotl">획득</i>':live(b.k)?'<i class="lock on">시작</i>':'<i class="lock">준비 중</i>'}</div>`).join('')}
  <div class="bcard more"><span class="bdg" style="--bg:transparent;--sz:64px;border:1.5px dashed #C9C4BE;color:#9A948D"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span><b>New</b><span class="ko">새 배지</span><span class="bd">함께 정해서 더 만들 수 있어요</span></div></div>
  <p class="bnote">배지 기준과 시작 시기는 정해지면 공지로 알려 드릴게요.</p>`;
};
const GROUP_ORDER=['대표','이사','매니저','IT Team','청계','상암','마곡','동대문','서여의도'];
function peopleGroup(p){if(p.role==='대표')return '대표';if(p.role==='이사')return '이사';if(p.role==='매니저')return '매니저';if(/^(CTO|IT)/.test(p.title||''))return 'IT Team';return p.branch||'기타'}
function sortGroups(ks){return ks.sort((a,b)=>{const ia=GROUP_ORDER.indexOf(a),ib=GROUP_ORDER.indexOf(b);return (ia<0?99:ia)-(ib<0?99:ib)})}

function brLabel(b){return b==='본사'?'전 지점':b}

/* ── BETA 표시 + TSB music (2026-11-10) ── */
const APP_V='BETA 0.12';
function betaInfo(){openSheet(`<h2>지금은 베타 버전이에요</h2><div style="font-size:15px;line-height:1.75;font-weight:500;margin-top:10px;word-break:keep-all">매장에서 쓰면서 매주 고치고 있어요. 지금이 <b>12번째 업데이트(BETA 0.12)</b>예요.<br><b>12월 25일까지</b> 의견을 받고 베타를 마쳐요. 그리고 <b>2027년 1월, 정식 버전 1.0</b>으로 시작해요.<br><br>아주 작은 것도 좋아요. 고칠 것, 있으면 좋겠는 것, 좋았던 것까지 알려 주세요. 서포트센터가 전부 읽어요.</div><a class="pill wine full" href="#/feedback" data-close style="margin-top:18px">의견 보내기</a><p class="note" style="margin-top:12px;text-align:center">TSB People ${APP_V}</p>`)}
const RADIO='https://tsb.wine/radio/';
const MU_STORES=[['청계','cg'],['상암','sa'],['마곡','mg'],['동대문','dd']];
ROUTES.music=function(v){const me=(S.data&&S.data.me)||{};
  v.innerHTML=`${back('#/')}<div class="title"><span class="new">NEW</span><h1 style="margin-top:10px">TSB music</h1><p>매장에서 트는 우리 음악이에요. 곡은 계속 늘어나요.<span id="muN"></span></p></div>
  <section class="blk mublk"><h3>매장 음악 틀기</h3><p class="note">매장 기기(아이패드·PC)에서 우리 지점을 눌러 주세요. 처음 한 번만 고르면 그다음부터는 시간대에 맞는 곡이 자동으로 나와요.</p>
   <div class="mugrid">${MU_STORES.map(([n,c])=>`<a class="pill ${me.branch===n?'ink':'line'}" href="${RADIO}?store=${c}" target="_blank" rel="noopener">${n}</a>`).join('')}</div></section>
  <section class="blk mublk"><h3>선곡 플레이어 <i class="new">BETA</i></h3><p class="note">채널 고르기, 곡 검색, 다음 곡 예약, 즐겨찾기가 돼요. 회사 계정으로 로그인하면 즐겨찾기가 저장돼요.</p>
   <a class="pill ink full" href="${RADIO}v2/index.html" target="_blank" rel="noopener" style="margin-top:12px">선곡 플레이어 열기</a></section>
  <section class="blk mublk"><h3>유튜브 tsb radio</h3><p class="note">매장 음악을 유튜브에서도 들을 수 있어요. 구독하고 친구에게도 알려 주세요.</p>
   <a class="pill line full" href="https://www.youtube.com/@tsbradiokorea" target="_blank" rel="noopener" style="margin-top:12px">유튜브에서 듣기</a></section>
  <div class="note" style="text-align:center;padding:24px 0;letter-spacing:.06em">wine is second americano</div>`;
  fetch(RADIO+'tracks.json',{cache:'no-store'}).then(r=>r.json()).then(j=>{const n=(j.tracks||j||[]).length;const el=$('#muN');if(el&&n)el.textContent=` 지금 ${n}곡.`}).catch(()=>{})};

/* ── 지원 신청: 명함 · 근무복 · 건강검진 완료 (2026-11-10) ── */
const SUP_NOTE='회사 비용이 나가는 신청이라 승인 후 발주까지 2~3주 걸릴 수 있어요.';
const SUP={
 '명함':{d:'영업·대관 미팅이 잦은 분께 먼저 만들어 드려요.',f:[['en','영문 이름','예) Minji Kim'],['ti','명함에 넣을 직함','예) 청계점 점장 / Store Manager'],['ph','명함에 넣을 연락처','회사 메일만 넣으려면 비워 두세요'],['qt','수량','기본 1통(100장)']]},
 '근무복':{d:'신규 입사, 교체(낡음·사이즈 변경), 분실 때 신청해요.',f:[['it','품목','예) 앞치마, 셔츠, 조리복'],['sz','사이즈','예) M / 95'],['qt','수량','예) 1'],['why','사유','신규 / 교체 / 분실']]},
 '건강검진':{d:'국가건강검진을 받았다면 완료 날짜만 알려 주세요. 회사는 검진 결과를 받지 않아요. 결과지는 올리지 마세요.',f:[['dt','검진 받은 날','예) 2026-11-08',1],['org','검진 기관 (선택)','예) OO병원'],['kind','종류','일반 / 특수 / 기타']]}
};
ROUTES.sup=function(v,type){
  const t=SUP[type]?type:'명함', c=SUP[t];
  v.innerHTML=`${back('#/apply','신청')}<div class="title"><span class="new">${t==='건강검진'?'기록':'NEW'}</span><h1 style="margin-top:10px">${t==='건강검진'?'건강검진 완료 등록':t+' 신청'}</h1><p>${esc(c.d)}</p>${t!=='건강검진'?`<div class="supnote">${SUP_NOTE}<br>점장님 → 박한울 매니저 순서로 승인돼요.</div>`:''}</div>
   <div class="form">${c.f.map(([k,l,ph,dt])=>`<label class="f">${esc(l)}</label><input class="in" id="sf_${k}" ${dt?'type="date"':''} placeholder="${esc(ph)}">`).join('')}
   <label class="f">메모 <em>(선택)</em></label><textarea class="in" id="sf_memo" placeholder="더 알려 줄 것이 있으면 적어 주세요"></textarea></div>
   <div class="btnrow"><button class="pill wine" id="sb">${t==='건강검진'?'완료 등록하기':'신청하기'}</button></div>`;
  $('#sb').onclick=async()=>{
    const vals=c.f.map(([k,l])=>[l,($('#sf_'+k).value||'').trim()]);
    if(t==='건강검진'&&!vals[0][1])return toast('검진 받은 날을 골라 주세요');
    if(t==='근무복'&&!vals[0][1])return toast('품목을 적어 주세요');
    const memo=($('#sf_memo').value||'').trim();
    const detail=vals.filter(x=>x[1]).map(x=>x[0]+': '+x[1]).join(' / ')+(memo?' / 메모: '+memo:'');
    const sb=$('#sb');sb.disabled=true;sb.textContent='보내는 중…';
    try{const j=await api('supply.create',{type:t,detail});toast(t==='건강검진'?'등록했어요. 고마워요!':'신청했어요! 점장님께 먼저 가요');await refresh();location.hash='#/req/'+j.id}
    catch(e){toast(e.message);sb.disabled=false;sb.textContent='다시 보내기'}};
};

/* ── 러닝 (LMS) v2: 탭이 만화 · 영상 · 도장 (2026-11-10) ── */
let LEARN=null;
const LIMG='https://tapshopbar.github.io/staff/assets/learn/';
async function learnData(){if(LEARN)return LEARN;const r=await fetch((location.pathname.includes('/next/')?'learn.json':'https://tapshopbar.github.io/staff/learn.json')+'?t='+Math.floor(Date.now()/36e5),{cache:'no-cache'});LEARN=await r.json();return LEARN}
function lkey(){return 'tsbp_learn_'+((S.data&&S.data.me&&S.data.me.email)||'me')}
function ldone(){try{return JSON.parse(localStorage.getItem(lkey())||'{}')}catch(e){return {}}}
function confetti(){const c=['#FFC100','#6E1426','#141B33','#B5707E','#1F8A70'];for(let i=0;i<46;i++){const s=document.createElement('i');s.className='cf';s.style.cssText=`left:${Math.random()*100}vw;background:${c[i%5]};animation-delay:${Math.random()*.4}s;transform:rotate(${Math.random()*360}deg)`;document.body.appendChild(s);setTimeout(()=>s.remove(),2600)}}
ROUTES.edu=function(){location.hash='#/learn'};
ROUTES.learn=async function(v,id){
  v.innerHTML=loading();
  let L;try{L=await learnData()}catch(e){v.innerHTML=`<div class="empty">불러오지 못했어요. 잠시 뒤 다시 열어 주세요.</div>`;return}
  const done=ldone();
  if(id){const all=L.tracks.flatMap(t=>t.lessons.map(l=>({...l,tr:t})));const i=all.findIndex(l=>l.id===id);const l=all[i];if(!l){location.hash='#/learn';return}
    const nx=all[i+1];let right=0;
    v.innerHTML=`${back('#/learn','러닝')}<div class="title"><span class="new" style="background:${l.tr.c};color:#fff">${esc(l.tr.en)}</span><h1 style="margin-top:10px">${esc(l.t)}</h1><p>${l.min}분 · 만화 · 카드 ${l.cards.length}장${l.vid?' · 영상':''} · 문제 ${l.q.length}개</p></div>
     ${l.img?`<div class="lrn-comic"><img src="${LIMG}${esc(l.img)}" alt="${esc(l.t)} 만화" loading="lazy"><ol>${(l.panels||[]).map(p=>`<li>${esc(p)}</li>`).join('')}</ol></div>`:''}
     <div class="lrn-say"><img src="${LIMG}mascot.jpg" alt=""><span>탭이가 정리해 줄게요!</span></div>
     ${l.cards.map(c=>`<div class="lrn-card">${c}</div>`).join('')}
     ${l.vid?`<div class="sec"><h2>영상으로 한 번 더</h2></div><div class="lrn-vid"><iframe src="https://www.youtube-nocookie.com/embed/${esc(l.vid)}?rel=0" title="영상" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p class="note" style="padding:6px var(--pad) 0">외부 유튜브 영상이에요. 안 나오면 <a class="u" href="https://youtu.be/${esc(l.vid)}" target="_blank" rel="noopener">유튜브에서 보기</a></p>`:''}
     <div class="sec"><h2>확인 문제</h2></div>
     ${l.q.map((q,qi)=>`<div class="lrn-q" data-q="${qi}"><div class="qq">${qi+1}. ${esc(q.q)}</div>${q.o.map((o,oi)=>`<button data-o="${oi}">${esc(o)}</button>`).join('')}</div>`).join('')}
     <div id="lend" style="display:none"><div class="lrn-done"><img src="${LIMG}mascot.jpg" alt=""><div><b id="ldt">완료!</b><span>도장 하나 찍었어요</span></div><i class="stamp">✓</i></div>
      <div class="btnrow">${nx?`<a class="pill wine" href="#/learn/${nx.id}">다음: ${esc(nx.t)}</a>`:`<a class="pill wine" href="#/quiz">와인 퀴즈로 실력 확인</a>`}</div></div>
     <div class="note" style="text-align:center;padding:24px 0">wine is second americano</div>`;
    const ans={};
    v.querySelectorAll('.lrn-q').forEach(box=>{const qi=+box.dataset.q,q=l.q[qi];box.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(ans[qi]!==undefined)return;const oi=+b.dataset.o;ans[qi]=oi;
      box.querySelectorAll('button')[q.a].classList.add('ok');if(oi!==q.a)b.classList.add('no');else right++;
      if(Object.keys(ans).length===l.q.length){const d=ldone();d[l.id]={at:Date.now(),score:right+'/'+l.q.length};localStorage.setItem(lkey(),JSON.stringify(d));
        $('#ldt').textContent=right===l.q.length?'다 맞혔어요!':right+' / '+l.q.length+' 맞혔어요';$('#lend').style.display='';if(right===l.q.length)confetti();setTimeout(()=>$('#lend').scrollIntoView({behavior:'smooth',block:'center'}),200)}})});
    return}
  const tot=L.tracks.reduce((a,t)=>a+t.lessons.length,0), dn=L.tracks.reduce((a,t)=>a+t.lessons.filter(l=>done[l.id]).length,0);
  const lvl=dn>=tot?'마스터':dn>=8?'시니어':dn>=4?'주니어':'루키';
  v.innerHTML=`${back('#/')}<div class="lrn-hero"><img src="${LIMG}mascot.jpg" alt="탭이"><div><span class="new">LEARNING</span><h1>러닝</h1><p>안녕, 나는 탭이! 와인이랑 탭샵바 일을 만화로 쉽게 알려 줄게. 한 과에 2~4분이야.</p></div></div>
   <div class="lrn-stat"><div><b>${dn}<small> / ${tot}</small></b><span>완료한 과</span></div><div><b>${lvl}</b><span>내 레벨</span></div><div class="stamps">${L.tracks.flatMap(t=>t.lessons).map(l=>`<i class="${done[l.id]?'on':''}">${done[l.id]?'✓':''}</i>`).join('')}</div></div>
   ${L.tracks.map(t=>{const n=t.lessons.filter(l=>done[l.id]).length;return `<div class="lrn-tr" style="background:${t.c}"><div class="en">${esc(t.en)}</div><h3>${esc(t.n)}</h3><div style="font-size:13.5px;opacity:.8">${n} / ${t.lessons.length}과${t.k==='wine'&&n===t.lessons.length?' · Sommelier I 배지 후보!':''}</div><div class="lrn-bar"><i style="width:${t.lessons.length?n/t.lessons.length*100:0}%"></i></div></div>
     <div class="lrn-grid">${t.lessons.map(l=>`<a class="lrn-tile${done[l.id]?' dn':''}" href="#/learn/${l.id}"><span class="th" style="background-image:url(${LIMG}${esc(l.img||'mascot.jpg')})"></span><b>${esc(l.t)}</b><small>${l.min}분${l.vid?' · 영상':''}${done[l.id]?' · ✓ '+esc(done[l.id].score):''}</small></a>`).join('')}</div>`}).join('')}
   <a class="qzlearn" href="#/quiz" style="margin-top:18px"><div><b>와인 퀴즈</b><br><span>배운 걸 퀴즈로 확인하고 랭킹에 올라가요</span></div><i class="arr">›</i></a>
   <div class="note" style="text-align:center;padding:24px 0">새 과는 계속 올라와요 · 업데이트 ${esc(L.updated)}</div>`;
};
/* 와인 퀴즈 화면 위에 러닝 바로가기 */
(function(){const _q=ROUTES.quiz;if(!_q)return;ROUTES.quiz=async function(v){const ob=new MutationObserver(()=>{if(!location.hash.startsWith('#/quiz')){ob.disconnect();return}const h=v.querySelector('.hero');if(h&&!v.querySelector('.qzlearn'))h.insertAdjacentHTML('afterend','<a class="qzlearn" href="#/learn"><div><b>러닝 · 와인 공부</b><br><span>퀴즈 전에 2분 공부하고 오기</span></div><i class="arr">›</i></a>')});ob.observe(v,{childList:true});setTimeout(()=>ob.disconnect(),600000);return _q(v)}})();

/* ── 의견 보내기 (타입폼처럼 한 장씩, 2026-11-11) ── */
const FB_KIND=[['불편','고쳐 주세요','불편하거나 안 되는 것'],['제안','이런 게 있으면 좋겠어요','새 기능, 더 쉬운 방법'],['칭찬','이거 좋아요','잘 쓰고 있는 것'],['질문','궁금해요','어떻게 쓰는지, 왜 그런지']];
const FB_AREA=['근무표 · 근무 신청','출퇴근','개인경비','공지','신청 · 결재','배지 · 러닝 · music','앱 전체 · 기타'];
const FB_HINT={불편:'예) 근무표에서 휴무 넣을 때 두 번 눌러야 해요',제안:'예) 대타 구하면 단톡에도 알림이 가면 좋겠어요',칭찬:'예) 연속 넣기 덕분에 근무표 10분 만에 끝냈어요',질문:'예) 다른 지점 지원 가면 출근은 어디로 찍어요?'};
ROUTES.feedback=function(v){
  const me=(S.data&&S.data.me)||{};const f={kind:'',area:'',body:'',anon:false};let step=0;
  const days=Math.max(0,Math.ceil((new Date('2026-12-25T23:59:59+09:00')-new Date())/864e5));
  const draw=(dir)=>{
    const prog=`<div class="fbp"><i style="width:${(step/4)*100}%"></i></div>`;
    let h='';
    if(step===0)h=`<span class="fbn">1 / 4</span><h1>어떤 이야기예요?</h1><div class="fbk">${FB_KIND.map(([k,t,d])=>`<button data-k="${k}" class="${f.kind===k?'on':''}"><b>${t}</b><span>${d}</span></button>`).join('')}</div>`;
    if(step===1)h=`<span class="fbn">2 / 4</span><h1>어느 화면 얘기예요?</h1><div class="fba">${FB_AREA.map(a=>`<button data-a="${a}" class="${f.area===a?'on':''}">${a}</button>`).join('')}</div>`;
    if(step===2)h=`<span class="fbn">3 / 4</span><h1>편하게 적어 주세요.</h1><p class="fbs">한 줄도 좋아요. 맞춤법 신경 안 써도 돼요.</p><textarea id="fbt" class="fbt" rows="5" placeholder="${esc(FB_HINT[f.kind]||'')}">${esc(f.body)}</textarea><button class="pill y fbgo" id="fbn2">다음</button>`;
    if(step===3)h=`<span class="fbn">4 / 4</span><h1>이름을 남길까요?</h1><div class="fbk two"><button data-n="0" class="${!f.anon?'on':''}"><b>${esc(me.name||'')}님으로</b><span>답이 필요하면 알려 드릴게요</span></button><button data-n="1" class="${f.anon?'on':''}"><b>익명으로</b><span>이름 없이 보내요</span></button></div><button class="pill y fbgo" id="fbs">보내기</button>`;
    if(step===4)h=`<div class="fbdone"><span class="fbcheck">✓</span><h1>고마워요${f.anon?'':', '+esc(me.name||'')+'님'}!</h1><p class="fbs">서포트센터가 전부 읽어요.<br>12월 25일까지 모아서 1월 정식 버전에 담을게요.</p><div class="fbend"><button class="pill y" id="fbm">하나 더 보내기</button><a class="pill line" href="#/ask">내가 보낸 의견 보기</a><a class="u" href="#/">홈으로</a></div></div>`;
    v.innerHTML=`<section class="fb ${dir||''}">${step<4?`<div class="fbtop">${step?`<button class="fbb" id="fbb">${I('back',18)} 이전</button>`:back('#/')}<span class="fbd">베타 의견 · D-${days}</span></div>${prog}`:''}<div class="fbc">${h}</div></section>`;
    const go=n=>{step=n;draw('fwd')};
    v.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{f.kind=b.dataset.k;setTimeout(()=>go(1),140);b.classList.add('on')});
    v.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{f.area=b.dataset.a;b.classList.add('on');setTimeout(()=>go(2),140)});
    v.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{f.anon=b.dataset.n==='1';v.querySelectorAll('[data-n]').forEach(x=>x.classList.toggle('on',x===b))});
    const t=$('#fbt');if(t){setTimeout(()=>t.focus(),250);t.oninput=()=>{f.body=t.value}}
    if($('#fbn2'))$('#fbn2').onclick=()=>{f.body=($('#fbt').value||'').trim();if(f.body.length<2)return toast('한 줄만 적어 주세요');go(3)};
    if($('#fbb'))$('#fbb').onclick=()=>{step=Math.max(0,step-1);draw('back')};
    if($('#fbs'))$('#fbs').onclick=async e=>{busy(e.currentTarget,true);try{await api('ask.create',{kind:f.kind||'제안',body:`[${f.area||'기타'}] ${f.body}`,anon:f.anon?'1':''});go(4)}catch(x){toast(x.message);busy(e.currentTarget,false)}};
    if($('#fbm'))$('#fbm').onclick=()=>{f.kind='';f.area='';f.body='';step=0;draw('fwd')};
  };
  draw('fwd');
};

/* ── 매장 이야기 (crew.js 합침: crew.tsb.wine 프록시가 새 파일명을 안 넘겨서, 2026-11-12) ── */
/* 매장 이야기 (구 크루 게시판, 2026-11-12 미리보기, cr7: 동료에게 보내기): 매장 이야기·손님 한마디·응원. API crew.list / crew.create / crew.cheer / crew.delete, 사진은 file.get */
(function(){
const PH=new Map();
const STORY={k:'story',n:'Storyteller',ko:'이야기꾼',d:'이번 달 응원을 가장 많이 받은 매장 이야기를 쓴 사람. 매달 바뀌어요',c:'#B04A63',i:'M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zM21 5h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z'};
if(typeof BADGES!=='undefined'&&!BADGES.some(b=>b.k==='story'))BADGES.splice(Math.max(0,BADGES.findIndex(b=>b.k==='kind')),0,STORY);
/* 퇴근 한 줄에 손님 칭찬이 있으면 매장 이야기로 이어 주기 */
window.storyOffer=function(line){openSheet(`<h2>매장 이야기에도 올릴까요?</h2><p class="note" style="padding:4px 0 0;line-height:1.6">손님 칭찬은 동료들이 같이 보면 힘이 돼요. 사진 한 장, 한 줄이면 충분해요.</p>
  <blockquote class="crq">${esc(line)}</blockquote><div class="btnrow" style="padding:16px 0 0"><button class="pill line" data-close>다음에</button><button class="pill wine" id="sgo">올리러 가기</button></div>`,m=>{m.querySelector('#sgo').onclick=()=>{localStorage.setItem('tsbp_story_draft',line);m.remove();location.hash='#/crew/new'}})};
if(typeof doPunch==='function'){const dp=doPunch;window.doPunch=async function(kind,extra){const r=await dp.apply(this,arguments);if(kind==='퇴근'&&extra&&/손님|칭찬/.test(extra.line||''))setTimeout(()=>storyOffer(extra.line),700);return r}}
const ago=s=>{const t=new Date(String(s).replace(' ','T'));const m=Math.floor((Date.now()-t)/60000);return m<1?'방금':m<60?m+'분 전':m<1440?Math.floor(m/60)+'시간 전':fmtDay(String(s).slice(0,10))};
async function photo(img){const id=img.dataset.fid;try{if(!PH.has(id)){const j=await apiRaw('file.get',{id});PH.set(id,`data:${j.mime};base64,${j.b64}`)}img.src=PH.get(id);img.classList.add('on')}catch(e){img.alt='사진을 못 불러왔어요'}}
function card(p){return `<article class="crp ${p.top?'top':''}" data-id="${esc(p.id)}">${p.top?'<span class="crtop">★ 이번 달 이야기꾼</span>':''}
  <div class="crh"><b>${esc(p.name)}</b><span>${p.tag?esc(p.tag)+' 이야기 · ':''}${ago(p.at)}</span></div>
  ${p.photos.length?`<div class="crph n${p.photos.length}">${p.photos.map(f=>`<img data-fid="${esc(f)}" alt="" loading="lazy">`).join('')}</div>`:''}
  <div class="crb">${esc(p.body)}</div>
  <div class="cra"><span class="crbtns"><button type="button" class="crc ${p.cheered?'on':''}" data-cheer>♥ 응원해요 <em>${p.cheers||''}</em></button><button type="button" class="crs" data-share>동료에게 보내기</button></span>${p.canDel?'<button type="button" class="crd" data-del>지우기</button>':''}</div></article>`}
/* 동료에게 보내기: 글 내용은 빼고 링크만 보낸다(로그인한 직원만 열림). 카톡 등 휴대폰 공유 창, 안 되면 링크 복사 */
async function shareStory(id){const url=location.origin+location.pathname+'#/crew/'+encodeURIComponent(id);
  const text='탭샵바 매장 이야기에 같이 보고 싶은 글이 있어요. People 앱에서 열어 보세요.';
  if(navigator.share){try{await navigator.share({title:'TSB 매장 이야기',text,url});return}catch(e){if(e&&e.name==='AbortError')return}}
  try{await navigator.clipboard.writeText(text+'\n'+url);toast('링크를 복사했어요. 카톡에 붙여 넣어 주세요')}
  catch(e){openSheet(`<h2>링크 복사</h2><p class="note" style="padding:4px 0 10px">아래 주소를 길게 눌러 복사해 주세요.</p><input class="in" readonly value="${esc(url)}" onfocus="this.select()">`)}}
ROUTES.crew=async function(v,arg){
  if(arg==='new')return crewNew(v);
  v.innerHTML=`${back('#/')}<div class="title"><h1>매장 이야기</h1><p>손님 한마디, 오늘의 좋은 순간, 고마운 동료. 남겨 두고 같이 봐요.</p></div>${loading()}`;
  let j;try{j=await api('crew.list')}catch(e){v.querySelector('.sk')?.parentElement.remove();v.insertAdjacentHTML('beforeend',`<div class="empty">${esc(e.message)}</div>`);return}
  const items=j.top?[...j.items.filter(p=>p.id===j.top).map(p=>Object.assign({top:1},p)),...j.items.filter(p=>p.id!==j.top)]:j.items;
  v.innerHTML=`${back('#/')}<div class="title"><h1>매장 이야기</h1><p>손님 한마디, 오늘의 좋은 순간, 고마운 동료. 남겨 두고 같이 봐요.</p></div>
   <a class="crrule" href="#/badges">${typeof badgeIcon==='function'?badgeIcon(STORY,30):''}<span><b>이번 달 이야기꾼</b>응원을 가장 많이 받은 이야기를 쓴 사람이 배지를 받아요. 매달 바뀌어요.</span></a>
   <div class="btnrow"><a class="pill wine" href="#/crew/new">글 쓰기</a></div>
   <div class="crl">${items.map(card).join('')||'<div class="empty">아직 글이 없어요. 첫 이야기를 올려 주세요.</div>'}</div>`;
  v.querySelectorAll('img[data-fid]').forEach(photo);
  v.querySelectorAll('.crph img').forEach(img=>img.onclick=()=>img.src&&openSheet(`<img src="${img.src}" style="width:100%;border-radius:12px">`));
  v.querySelectorAll('[data-cheer]').forEach(b=>b.onclick=async()=>{const id=b.closest('.crp').dataset.id;b.disabled=true;
    const em=b.querySelector('em'),was=b.classList.contains('on'),n=Number(em.textContent)||0;b.classList.toggle('on',!was);em.textContent=(n+(was?-1:1))||''; // 먼저 화면에 반영, 서버 응답으로 맞춤
    try{const r=await apiRaw('crew.cheer',{id});b.classList.toggle('on',r.cheered);em.textContent=r.cheers||'';S.mem={};memSave()}catch(e){b.classList.toggle('on',was);em.textContent=n||'';toast(e.message)}b.disabled=false});
  v.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!confirm('이 글을 지울까요?'))return;const id=b.closest('.crp').dataset.id;
    try{await api('crew.delete',{id});toast('지웠어요');ROUTES.crew(v)}catch(e){toast(e.message)}});
  v.querySelectorAll('[data-share]').forEach(b=>b.onclick=()=>shareStory(b.closest('.crp').dataset.id));
  if(arg){const c=[...v.querySelectorAll('.crp')].find(x=>x.dataset.id===arg);
    if(c){c.classList.add('hl');setTimeout(()=>c.scrollIntoView({behavior:'smooth',block:'center'}),150)}else toast('지워졌거나 찾을 수 없는 글이에요')}
};
function crewNew(v){
  const hq=S.data.x&&S.data.x.isHQ;let shots=[];
  v.innerHTML=`${back('#/crew','매장 이야기')}<div class="title"><h1>글 쓰기</h1><p>오늘 있었던 좋은 순간, 손님 한마디, 고마운 동료 이야기 무엇이든요.</p></div><div class="form">
   <label class="f">내용</label><textarea class="in" id="cb" style="min-height:180px" placeholder="예) 오늘 단골 손님이 직접 쓴 메모를 두고 가셨어요">${esc(localStorage.getItem('tsbp_story_draft')||'')}</textarea>
   <p class="crnote">모든 지점이 같이 봐요. 손님 얼굴이 나온 사진, 이름·연락처는 올리지 말아 주세요. 불만·사고는 '사고·클레임'으로 보고해 주세요.</p>
   <label class="f">사진 <em>(3장까지)</em></label><label class="pill sm crpick"><input type="file" id="cp" accept="image/*" multiple hidden>사진 고르기</label><div class="crph n0" id="cpv"></div>
   ${hq?`<label class="f">어느 매장 이야기?</label><select class="in" id="ct"><option value="">전체</option>${BR.map(b=>`<option>${b}</option>`).join('')}</select>
   <label class="check"><input type="checkbox" id="ca" checked> <span>서포트센터 이름으로 올리기</span></label>`:''}</div>
   <div class="btnrow"><button class="pill wine" id="cs">올리기</button></div>`;
  $('#cp').onchange=async e=>{const fs=[...e.target.files].slice(0,3);if(e.target.files.length>3)toast('사진은 3장까지예요');
    shots=await Promise.all(fs.map(f=>fileToDataUrl(f,1280,.78)));$('#cpv').className='crph n'+shots.length;$('#cpv').innerHTML=shots.map(s=>`<img class="on" src="${s}">`).join('')};
  $('#cs').onclick=async e=>{const body=$('#cb').value.trim();if(body.length<2){toast('내용을 적어 주세요');return}busy(e.currentTarget,true);
    try{await api('crew.create',{body,photos:shots,tag:$('#ct')?$('#ct').value:'',asTeam:$('#ca')?$('#ca').checked:false});localStorage.removeItem('tsbp_story_draft');toast('올렸어요');location.hash='#/crew'}catch(er){toast(er.message);busy(e.currentTarget,false)}};
}
/* 홈: 전체 메뉴 타일만 (메인 카드는 공지·개인경비·근무표 3개 유지) */
const home=ROUTES[''];
ROUTES['']=function(v){const r=home.apply(this,arguments);try{v.querySelector('.grid .tile[href="#/kudos"]')?.insertAdjacentHTML('beforebegin',`<a class="tile w" href="#/crew"><b>매장<br>이야기</b><small>손님·동료 한마디</small></a>`)}catch(e){}return r};
})();

/* ===== HR 가이드 BETA (2026-11-12) ===== */
/* TSB People · HR 가이드 (#/guide) v1
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
    ['단축근무', '단축', '근로시간 단축'], ['휴직', '쉬고 싶', '장기 휴가'], ['미성년자', '신분증', '청소년'], ['음주', '시음', '술'], ['위치', 'GPS', '출퇴근 기록']
  ];
  const POP = ['연차', '육아휴직', '급여일', '증명서', '야간수당', '퇴사', '괴롭힘 신고', '보건증'];
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
      let p = []; while (i < L.length && L[i].trim() && !/^(#{1,4}\s|\s*\||>|\s*([-*]|\d+\.)\s|---+$)/.test(L[i])) { p.push(L[i]); i++; } h += '<p>' + p.map(inline).join('<br>') + '</p>';
    }
    return h;
  }
  function load(force) {
    if (G.items && !force) return Promise.resolve(G.items);
    if (G.p) return G.p;
    G.p = api('guide.list').then(j => { G.items = (j.items || []).filter(x => x && x.id); CATS.length = 0; G.items.forEach(x => { if (x.cat && !CATS.includes(x.cat)) CATS.push(x.cat); }); G.updated = j.updated || ''; G.p = null; return G.items; }).catch(x => { G.p = null; throw x; });
    return G.p;
  }
  const applyBtns = it => (it.apply || []).length ? `<div class="gd-apply">${it.apply.map(a => `<a class="pill wine" href="${e(a.hash)}">${e(a.label)}</a>`).join('')}</div>` : '';
  const foot = () => `<div class="gd-foot"><b>그래도 궁금하면</b><p>HARPER(인사팀 AI 담당)에게 물어보세요. 사람 확인이 필요한 건은 인사팀이 이어받아요.</p><a class="pill line" href="#/ask" data-gq="1">질문하기</a></div>`;

  ROUTES.guide = function (v, a) {
    const parts = String(a || '').split('/'), mode = parts[0] || '';
    v.innerHTML = `${back(mode && mode !== 's' && mode !== 'c' ? '#/guide' : '#/more', mode && mode !== 's' && mode !== 'c' ? 'HR 가이드' : '더보기')}<div id="gdv">${loading()}</div>`;
    load().then(() => { const el = $('#gdv'); if (!el) return; if (!mode || mode === 's' || mode === 'c') list(el, mode === 's' ? parts.slice(1).join('/') : '', mode === 'c' ? parts.slice(1).join('/') : ''); else doc(el, mode, parts[1]); })
      .catch(x => { const el = $('#gdv'); if (el) el.innerHTML = `<div class="blk"><div class="empty">가이드를 불러오지 못했어요. ${e(x.message || '')}</div></div>`; });
  };
  function list(el, q, cat) {
    const its = G.items;
    el.innerHTML = `<div class="title"><h1>HR 가이드 <span class="gd-beta">BETA</span></h1><p>계속 채워 가는 중이에요. 빠진 내용은 질문하기로 물어봐 주세요.</p></div>
      <div class="gd-sbox"><input class="in" id="gq" type="search" placeholder="예) 육아휴직, 야간수당, 퇴사" value="${e(q)}" autocomplete="off"></div>
      <div class="gd-pop" id="gpop">${POP.map(w => `<button data-w="${e(w)}">${e(w)}</button>`).join('')}</div>
      <div id="gres"></div>`;
    const inp = $('#gq'), res = $('#gres');
    const draw = () => {
      const qq = inp.value.trim();
      if (!qq) {
        const c = cat && CATS.includes(cat) ? cat : '';
        res.innerHTML = `<div class="gd-cats">${CATS.map(k => `<a href="#/guide/c/${encodeURIComponent(k)}" class="${k === c ? 'on' : ''}">${k}</a>`).join('')}</div>` +
          CATS.filter(k => !c || k === c).map(k => { const xs = its.filter(it => (it.cat || '') === k); if (!xs.length) return ''; return `<div class="sec"><h2>${e(k)}</h2></div><div class="list">${xs.map(it => `<a class="li" href="#/guide/${e(it.id)}"><div class="m"><div class="t1">${e(it.title)}</div><div class="t2">${e(it.summary || '')}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>`; }).join('') +
          `<p class="note" style="padding:18px var(--pad) 0">담당 인사팀 HARPER${G.updated ? ' · 최종수정 ' + e(G.updated) : ''}</p>` + foot();
        return;
      }
      const r = search(qq);
      res.innerHTML = r.length ? `<div class="sec"><h2>찾은 내용 ${r.length}</h2></div><div class="list">${r.map(x => `<a class="li gd-hit" href="#/guide/${e(x.it.id)}/${x.s.i}" data-q="${e(qq)}"><div class="m"><div class="t1">${e(x.it.title)}${x.s.i ? ` <span class="gd-path">› ${e(x.s.h)}</span>` : ''}</div><div class="t2 w">${snippet(x.s.text || x.it.summary, qq)}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>` + foot()
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
    const secs = sections(it).filter(s => s.i > 0 && s.lv === 2);
    el.innerHTML = `<div class="title"><span class="gd-cat">${e(it.cat || '')}</span><h1>${e(it.title)}</h1>${it.summary ? `<p>${e(it.summary)}</p>` : ''}</div>
      ${applyBtns(it)}
      ${secs.length > 3 ? `<details class="gd-toc"><summary>목차 ${secs.length}</summary>${secs.map(s => `<a href="javascript:void 0" data-si="${s.i}">${e(s.h)}</a>`).join('')}</details>` : ''}
      <article class="gd-doc">${md(String(it.body || '').replace(/^\s*#\s+[^\n]*\n/, ''))}</article>
      <p class="note" style="padding:14px var(--pad) 0">담당 인사팀 HARPER · 최종수정 ${e(it.updated || G.updated || '')}</p>${foot()}`;
    const go = n => { const h = el.querySelector('#gs' + n); if (h) { h.scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); h.classList.add('gd-flash'); setTimeout(() => h.classList.remove('gd-flash'), 1800); } };
    el.querySelectorAll('[data-si]').forEach(a => a.onclick = () => go(a.dataset.si));
    el.querySelector('[data-gq]').onclick = () => sessionStorage.setItem('ask_prefill', '[' + it.title + '] ');
    if (si) setTimeout(() => go(si), 60);
    const q = sessionStorage.getItem('gd_q'); sessionStorage.removeItem('gd_q');
    if (q) { const terms = expand(q).filter(t => t.length > 1); const art = el.querySelector('.gd-doc'); if (art && terms.length) { const walk = document.createTreeWalker(art, NodeFilter.SHOW_TEXT); const hits = []; let n; while ((n = walk.nextNode())) { const s = norm(n.nodeValue); if (terms.some(t => s.includes(t))) hits.push(n); } hits.slice(0, 12).forEach(tn => { const sp = document.createElement('span'); sp.className = 'gd-hl'; tn.parentNode.replaceChild(sp, tn); sp.appendChild(tn); }); } }
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
