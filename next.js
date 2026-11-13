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
  <h3>휴가</h3><ul><li>연차 · 휴가는 점장 승인으로 확정돼요. 점장님이 없는 서포트센터와 점장님 본인은 매니저가 승인해요.</li><li>확정된 휴가 날짜를 바꾸려면 내 신청에서 [날짜 바꾸기]를 눌러 주세요. 새 날짜가 승인되면 원래 신청은 자동으로 취소돼요.</li></ul>
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
const TITLE_EN={'수습':'Probation','사원':'Crew','트레이너':'Trainer','부점장':'Assistant Manager','수쉐프':'Sous Chef','쉐프':'Chef','점장':'Store Manager','매니저':'Manager','샵매니저':'Shop Manager','CTO':'Chief Technology Officer','IT 팀장':'IT Lead','팀장':'Director','팀원':'Staff','대표':'CEO','이사':'Director','사내이사':'Director','파트타임':'Part-time'};
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
 {k:'hr',n:'HR',ko:'인사 담당',d:'인사와 결재를 맡아요. 결재선과 HR 가이드에 이름이 들어가요',c:'#141B33',i:'M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1M17 3.5l1 2 2 .3-1.5 1.4.4 2-1.9-1-1.9 1 .4-2L14 5.8l2-.3z'},
 {k:'edu',n:'Education',ko:'교육',d:'직원 교육과 아카데미를 맡아요',c:'#6E1426',i:'M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5'},
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
const GROUP_ORDER=['대표','팀장','매니저','IT Team','청계','상암','마곡','동대문','서여의도'];
function peopleGroup(p){if(p.role==='대표')return '대표';if(p.role==='이사'||p.role==='팀장')return '팀장';if(p.role==='매니저')return '매니저';if(/^(CTO|IT)/.test(p.title||''))return 'IT Team';return p.branch||'기타'}
function sortGroups(ks){return ks.sort((a,b)=>{const ia=GROUP_ORDER.indexOf(a),ib=GROUP_ORDER.indexOf(b);return (ia<0?99:ia)-(ib<0?99:ib)})}

function brLabel(b){return b==='본사'||b==='서포트센터'?'전 지점':b}

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
  const POP = ['연차', '육아휴직', '급여일', '증명서', '야간수당', '퇴사', '경조금', '건강검진'];
  const RV = '대관 응대', DZ = '브랜드·디자인';
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
    if (mode === 'c' && decodeURIComponent(parts.slice(1).join('/')) === RV) { try { history.replaceState(null, '', '#/rental'); } catch (x) {} return ROUTES.rental(v); }
    const isRv = /^rv/.test(mode), isDz = mode === 'design';
    v.innerHTML = `${back(isDz ? '#/more' : isRv ? '#/rental' : (mode && mode !== 's' && mode !== 'c' ? '#/guide' : '#/more'), isDz ? '더보기' : isRv ? '대관 응대' : (mode && mode !== 's' && mode !== 'c' ? '가이드' : '더보기'))}<div id="gdv">${loading()}</div>`;
    load().then(() => { const el = $('#gdv'); if (!el) return; if (!mode || mode === 's' || mode === 'c') list(el, mode === 's' ? parts.slice(1).join('/') : '', mode === 'c' ? parts.slice(1).join('/') : ''); else doc(el, mode, parts[1]); })
      .catch(x => { const el = $('#gdv'); if (el) el.innerHTML = `<div class="blk"><div class="empty">가이드를 불러오지 못했어요. ${e(x.message || '')}</div></div>`; });
  };
  function list(el, q, cat) {
    const its = G.items;
    el.innerHTML = `<div class="title"><h1>HR 가이드 <span class="gd-beta">BETA</span></h1><p>휴가 · 급여 · 복지 · 규칙을 한곳에서 찾아요. 빠진 내용은 질문하기로 물어봐 주세요.</p></div>
      <div class="gd-sbox"><input class="in" id="gq" type="search" placeholder="예) 육아휴직, 급여일, 경조금" value="${e(q)}" autocomplete="off"></div>
      <div class="gd-pop" id="gpop">${POP.map(w => `<button data-w="${e(w)}">${e(w)}</button>`).join('')}</div>
      <div id="gres"></div>`;
    const inp = $('#gq'), res = $('#gres');
    const draw = () => {
      const qq = inp.value.trim();
      if (!qq) {
        const c = cat && CATS.includes(cat) ? cat : '';
        const rv1 = its.find(it => it.cat === RV);
        const banner = '' && rv1 ? `<a class="gd-rvb" href="#/guide/c/${encodeURIComponent(RV)}"><span class="k">손님 대관 질문</span><b>대관 문의, 답을 찾아 복사해서 보내요</b><span class="s">가격 · 예약금 · 환불 · 반입 · 링크 ${its.filter(it => it.cat === RV).reduce((n, it) => n + (it.qa || []).length, 0)}개</span><span class="ar">${I('next', 20)}</span></a>` : '';
        res.innerHTML = banner + `<div class="gd-cats">${CATS.filter(k => k !== RV && k !== DZ).map(k => `<a href="#/guide/c/${encodeURIComponent(k)}" class="${k === c ? 'on' : ''}">${k}</a>`).join('')}</div>` +
          CATS.filter(k => k !== RV && k !== DZ && (!c || k === c)).map(k => { const xs = its.filter(it => (it.cat || '') === k); if (!xs.length) return ''; return `<div class="sec"><h2>${e(k)}</h2></div><div class="list">${xs.map(it => `<a class="li" href="#/guide/${e(it.id)}"><div class="m"><div class="t1">${e(it.title)}</div><div class="t2">${e(it.summary || '')}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>`; }).join('') +
          `<p class="note" style="padding:18px var(--pad) 0">HR 인사팀 HARPER · 대관 응대·디자인 가이드는 더보기에 따로 있어요${G.updated ? ' · 최종수정 ' + e(G.updated) : ''}</p>` + foot();
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
      <p class="note" style="padding:14px var(--pad) 0">담당 ${e(it.owner || '인사팀 HARPER')} · 최종수정 ${e(it.updated || G.updated || '')}</p>${it.cat === DZ ? `<div class="gd-foot"><b>그래도 궁금하면</b><p>마케팅팀에 물어보세요. 로고·사진 원본이 필요하면 질문하기로 요청해 주세요.</p><a class="pill line" href="#/ask" data-gq="1">질문하기</a></div>` : foot()}`;
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
      <p class="note" style="padding:14px var(--pad) 0">담당 ${e(it.owner || '서포트센터')} · 최종수정 ${e(it.updated || G.updated || '')} · 새 질문은 계속 추가해요</p>
      <div class="gd-foot"><b>여기 없는 질문이 오면</b><p>손님께는 "확인하고 바로 알려 드릴게요"라고 하고, 서포트센터에 물어봐 주세요. 받은 질문은 이 목록에 추가해요.</p><a class="pill line" href="#/ask" data-gq="1">서포트센터에 질문하기</a></div>`;
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
  const start = () => { const v = document.getElementById('view'); mo.observe(document.body, { childList: true, subtree: true }); if (v) relink(v); }; /* 11/13: 화면 틀이 다시 그려지면 #view가 새로 생겨 노션 링크가 안 바뀌던 문제 → body 관찰 */
  start();

  /* 11/13: 대관 응대를 HR 가이드에서 분리 → #/rental (홈 '대관 문의' 타일 · 더보기) */
  ROUTES.rental = function (v) {
    v.innerHTML = `${back('#/more', '더보기')}<div id="rvv">${loading()}</div>`;
    load().then(() => {
      const el = $('#rvv'); if (!el) return;
      const xs = G.items.filter(it => it.cat === RV), n = xs.reduce((k, it) => k + (it.qa || []).length, 0);
      el.innerHTML = `<div class="title"><h1>대관 응대 <span class="gd-beta">BETA</span></h1><p>손님이 대관을 물어보면 여기서 답을 찾아 <b>복사</b>해서 카톡·문자로 보내요. 질문 ${n}개.</p></div>
        <div class="gd-sbox"><input class="in" id="rq" type="search" placeholder="예) 예약금, 최소 금액, 와인 반입" autocomplete="off"></div>
        <div class="gd-pop" id="rpop">${['가격', '예약금', '환불', '콜키지', '인원', '주차'].map(w => `<button data-w="${e(w)}">${e(w)}</button>`).join('')}</div>
        <div id="rres"></div>`;
      const inp = $('#rq'), res = $('#rres');
      const draw = () => {
        const q = inp.value.trim();
        if (!q) { res.innerHTML = `<div class="list" style="margin-top:14px">${xs.map(it => `<a class="li" href="#/guide/${e(it.id)}"><div class="m"><div class="t1">${e(it.title)}</div><div class="t2">${e(it.summary || ((it.qa || []).length + '개 질문'))}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>
          <div class="gd-foot"><b>여기 없는 질문이 오면</b><p>손님께는 "확인하고 바로 알려 드릴게요"라고 하고, 서포트센터에 물어봐 주세요. 받은 질문은 이 목록에 추가해요.</p><a class="pill line" href="#/ask" data-gq="1">서포트센터에 질문하기</a></div>`;
          const g = res.querySelector('[data-gq]'); if (g) g.onclick = () => sessionStorage.setItem('ask_prefill', '[대관 질문] '); return; }
        const r = search(q).filter(x => x.it.cat === RV);
        res.innerHTML = r.length ? `<div class="sec"><h2>찾은 질문 ${r.length}</h2></div><div class="list">${r.map(x => `<a class="li gd-hit" href="#/guide/${e(x.it.id)}/${x.s.i}" data-q="${e(q)}"><div class="m"><div class="t1">${e(x.it.title)}${x.s.i ? ` <span class="gd-path">› ${e(x.s.h)}</span>` : ''}</div><div class="t2 w">${snippet(x.s.text || x.it.summary, q)}</div></div><span class="ar">${I('next', 18)}</span></a>`).join('')}</div>`
          : `<div class="blk"><div class="empty">'${e(q)}'에 맞는 답을 못 찾았어요. 손님께는 "확인하고 알려 드릴게요"라고 하고 <a class="u" href="#/ask">서포트센터에 질문하기</a>로 물어봐 주세요.</div></div>`;
      };
      let t; inp.oninput = () => { clearTimeout(t); t = setTimeout(draw, 140); };
      $('#rpop').onclick = ev => { const b = ev.target.closest('button'); if (!b) return; inp.value = b.dataset.w; draw(); };
      res.onclick = ev => { const a = ev.target.closest('a.gd-hit'); if (a) sessionStorage.setItem('gd_q', a.dataset.q || ''); };
      draw();
    }).catch(x => { const el = $('#rvv'); if (el) el.innerHTML = `<div class="blk"><div class="empty">불러오지 못했어요. ${e(x.message || '')}</div></div>`; });
  };
  window.TSB_GUIDE = { search, md, load, G };
})();

/* ── 지원 요청 (help.js, 2026-11-12 라이브) ── */
/* 지원 요청 (2026-11-12 미리보기, API v36): 다른 지점에 사람 보내기 · Passport 도장 · 근무 겹침 막기
   API help.list / create / check / apply / home / decide / withdraw / cancel. 근무표 저장·확정·대타 지원에 hv:1 → 서버가 겹침 검사 */
(function(){
const PASS=(typeof BADGES!=='undefined'&&BADGES.find(b=>b.k==='pass'))||{k:'pass',n:'Passport',c:'#2F4858',i:'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z'};
if(typeof BADGES!=='undefined'){const b=BADGES.find(x=>x.k==='pass');if(b)b.d='다른 지점 지원을 한 번 다녀오면 발급, 갈 때마다 도장 한 칸. 5칸이면 완성'}
/* 근무표 저장·확정·대타 지원: 새 화면 표시(hv) → 서버 겹침 검사 */
const _api=api;api=function(a,d,...r){if(/^(schedule\.(save|publish)|swap\.apply)$/.test(a))d=Object.assign({},d,{hv:1});return _api(a,d,...r)};
const BRS=b=>b==='본사'||b==='서포트센터'?'서포트센터':b;
const md=s=>{const d=pd(s);return `${d.getMonth()+1}.${d.getDate()}`};
const ST={수쉐프확인:['수쉐프 확인 중','진행중'],소속확인:['점장 결재 중','진행중'],요청확인:['요청 지점 확인 중','진행중'],확정:['확정','확정'],반려:['어려워요','반려'],철회:['철회','취소'],취소:['취소','취소'],마감:['마감','취소']};
const stc=s=>{const x=ST[s]||[s,s];return chip(x[1],x[0])};
const partC=p=>`<span class="hpp ${p==='주방'?'k':p==='상관없음'?'a':''}">${esc(p==='상관없음'?'홀·주방':p)}</span>`;
const toM=t=>{const m=String(t||'').match(/(\d{1,2}):(\d{2})/);return m?+m[1]*60+ +m[2]:null};
const fromM=m=>{m=((m%1440)+1440)%1440;return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')};
window.md2=md;
/* 근무표: 다른 지점 근무와 겹치는 칸 빨간 테두리 */
const ivx=(d,a,b)=>{const x=toM(a);let y=toM(b);if(x==null||y==null)return null;if(y<=x)y+=1440;const n=Math.round(Date.UTC(...String(d).split('-').map((v,i)=>i===1?v-1:+v))/864e5)*1440;return [n+x,n+y]};
window.hlpCf=(s,away)=>{const m=ivx(s.date,s.start,s.end);if(!m)return false;return (away||[]).some(a=>{if(a.email!==s.email)return false;const o=ivx(a.date,a.start,a.end);return o&&o[0]<m[1]&&m[0]<o[1]})};
function slots(r){const a=toM(r.start);let b=toM(r.end);if(b<=a)b+=1440;const o=[];for(let t=a;t<=b;t+=30)o.push(t);return o}
function stamps(p){p=p||{stamps:0,upcoming:0,full:5};const n=p.full||5,out=[];for(let i=0;i<n;i++)out.push(i<p.stamps?'<i class="on">✓</i>':i<p.stamps+p.upcoming?'<i class="up">예정</i>':'<i></i>');return out.join('')}
function busyHtml(b){if(!b)return '';return (b.hard||[]).map(x=>`<div class="hbz x">✕ ${esc(x)}</div>`).join('')+(b.warn||[]).map(x=>`<div class="hbz w">! ${esc(x)}</div>`).join('')+(!(b.hard||[]).length?`<div class="hbz ok">✓ 겹치는 근무 없어요 · 다녀오면 이 주 ${b.week}시간</div>`:'')}

ROUTES.help=async function(v,arg){
  if(arg==='new')return helpNew(v);
  v.innerHTML=`${back('#/')}<div class="title"><h1>지원 요청</h1></div>${loading()}`;
  let j;try{j=await api('help.list')}catch(e){v.innerHTML=`${back('#/')}<div class="title"><h1>지원 요청</h1><p>${esc(e.message)}</p></div>`;return}
  const today=ymd(new Date());
  const open=j.items.filter(r=>r.status==='모집중'&&r.date>=today), done=j.items.filter(r=>!(r.status==='모집중'&&r.date>=today));
  const pp=j.passport||{stamps:0,upcoming:0,full:5};
  v.innerHTML=`${back('#/')}<div class="title"><h1>지원 요청</h1><p>사람이 모자란 지점을 서로 도와요. 갈 수 있으면 <b>갈게요</b>. 홀은 점장님, 주방은 수쉐프님 → 점장님 결재가 끝나면 바로 근무표에 들어가요.</p></div>
   ${j.test?'<div class="htest">테스트 중 · 알림은 서포트센터에만 가요</div>':''}
   <a class="hpass" href="#/badges">${typeof badgeIcon==='function'?badgeIcon(PASS,46):''}<div><b>내 패스포트 ${pp.stamps}/${pp.full}</b><span>${pp.stamps?'지원 다녀올 때마다 도장 한 칸':'첫 지원을 다녀오면 패스포트가 발급돼요'}${pp.upcoming?' · 예정 '+pp.upcoming:''}</span><div class="hst">${stamps(pp)}</div></div></a>
   ${j.canCreate.length?`<div class="btnrow"><a class="pill wine" href="#/help/new">지원 요청 올리기</a></div>`:''}
   ${j.todo.length?`<div class="sec"><h2>확인할 것 <small class="hn">${j.todo.length}</small></h2></div><div class="hl">${j.todo.map(t=>todoCard(t)).join('')}</div>`:''}
   <div class="sec"><h2>모집 중</h2></div><div class="hl">${open.map(card).join('')||'<div class="empty">지금은 지원 요청이 없어요</div>'}</div>
   ${done.length?`<div class="sec"><h2>마감 · 지난 요청</h2></div><div class="hl dim">${done.map(card).join('')}</div>`:''}
   <p class="note" style="padding:18px var(--pad) 0">결재 순서: 홀 직원 → 점장 · 주방 직원(Hybrid는 소속 기준) → 수쉐프 → 점장 · 수쉐프 → 점장 · 점장 본인은 결재 없이 매니저에게 알림. 12시간 답이 없으면 다시 알리고, 24시간이면 다음 사람에게 넘어가요.</p><p class="note" style="padding:8px var(--pad) 40px">같은 사람이 같은 시간에 두 곳에 들어가지 않게 막아요. 다른 지점 근무·진행 중인 지원·휴가와 겹치거나 주 52시간을 넘으면 신청이 안 돼요.</p>`;
  const R=id=>j.items.find(x=>x.id===id)||(j.todo.find(t=>t.req.id===id)||{}).req;
  v.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>applySheet(R(b.dataset.go),null,v));
  v.querySelectorAll('[data-send]').forEach(b=>b.onclick=()=>sendSheet(R(b.dataset.send),j,v));
  v.querySelectorAll('[data-cx]').forEach(b=>b.onclick=async()=>{if(!confirm('이 지원 요청을 취소할까요?\n확정된 사람도 근무표에서 빠지고 알림이 가요.'))return;busy(b,true);try{await api('help.cancel',{id:b.dataset.cx});toast('취소했어요');ROUTES.help(v)}catch(e){toast(e.message);busy(b,false)}});
  v.querySelectorAll('[data-wd]').forEach(b=>b.onclick=async()=>{const und=b.dataset.u==='1';if(!confirm(und?'확정된 지원을 취소할까요? 근무표에서도 빠져요.':'지원 신청을 철회할까요?'))return;busy(b,true);try{await api('help.withdraw',{appId:b.dataset.wd});toast(und?'취소했어요':'철회했어요');ROUTES.help(v)}catch(e){toast(e.message);busy(b,false)}});
  v.querySelectorAll('[data-hm]').forEach(b=>b.onclick=()=>decide('help.home',b,v));
  v.querySelectorAll('[data-dc]').forEach(b=>b.onclick=()=>decide('help.decide',b,v));
};
async function decide(action,b,v){const ok=b.dataset.ok==='1';let memo='';if(!ok){memo=prompt('한 줄 사유 (선택)','')||'';}
  busy(b,true);try{const r=await api(action,{appId:b.dataset.hm||b.dataset.dc,ok:ok?1:'',memo});toast(!ok?'전했어요':r.status==='확정'?'확정! 근무표에 들어갔어요':r.status==='소속확인'?'OK! 점장님 최종 결재로 넘겼어요':'요청 지점 확인으로 넘겼어요');if(r.warn&&r.warn.length)setTimeout(()=>toast('참고: '+r.warn[0],3600),2500);ROUTES.help(v)}catch(e){toast(e.message);busy(b,false)}}
function head(r){return `<div class="hh"><span class="hbr">${esc(BRS(r.branch))}</span><b>${md(r.date)} <small>${WD[pd(r.date).getDay()]}</small></b><span class="ht">${esc(r.start)}–${esc(r.end)}</span>${partC(r.part)}<span class="hcnt ${r.filled>=r.count?'full':''}">${r.filled}/${r.count}명</span></div>`}
function card(r){
  const me=S.data.me.email;
  return `<article class="hc ${r.status!=='모집중'?'off':''}">${head(r)}
   ${r.reason||r.body?`<div class="hbd">${r.reason?`<b>${esc(r.reason)}</b>`:''}${r.body?`<p>${esc(r.body)}</p>`:''}</div>`:''}
   ${r.apps.length?`<div class="hap">${r.apps.map(a=>`<div class="ha"><span class="hnm">${esc(a.name)} <small>${esc(BRS(a.home))}${a.part&&r.part==='상관없음'?' · '+esc(a.part):''}${a.partial?' · '+esc(a.start)+'–'+esc(a.end):''}${a.by?' · '+esc(a.by)+' 지명':''}</small></span>${stc(a.status)}${a.mine&&['수쉐프확인','소속확인','요청확인'].includes(a.status)?`<button class="lk" data-wd="${esc(a.id)}">철회</button>`:''}${a.canUndo?`<button class="lk" data-wd="${esc(a.id)}" data-u="1">취소</button>`:''}</div>`).join('')}</div>`:''}
   <div class="hbtn">${r.canApply?`<button class="pill sm wine" data-go="${esc(r.id)}">갈게요</button>`:''}${r.canSend?`<button class="pill sm line" data-send="${esc(r.id)}">우리 직원 보내기</button>`:''}${r.mineSide&&r.status!=='취소'&&r.date>=ymd(new Date())?`<button class="lk" data-cx="${esc(r.id)}">요청 취소</button>`:''}</div>
   <div class="hby">${esc(r.by)} · ${esc(String(r.at).slice(5,16).replace('-','/'))}</div></article>`}
function todoCard(t){const a=t.app,r=t.req;
  return `<article class="hc todo">${head(r)}<div class="hq">${t.kind==='sous'?`<span class="hstep">주방 1차 · 수쉐프</span><b>${esc(a.name)}</b>님이 ${esc(BRS(r.branch))} 지원을 가고 싶대요. 주방 근무에 문제 없으면 OK 해 주세요. 그다음 점장님이 최종 결재해요.`:t.kind==='home'?`<span class="hstep">${a.sousOk?'최종 결재 · 점장 ('+esc(a.sousOk)+' OK)':'결재 · 점장'}</span><b>${esc(a.name)}</b>님${a.by?' ('+esc(a.by)+' 지명)':''}이 ${esc(BRS(r.branch))} 지원을 가요. 우리 매장 근무에 문제 없으면 OK 해 주세요.`:`<b>${esc(a.name)}</b> (${esc(BRS(a.home))})님이 ${a.partial?`<b>${esc(a.start)}–${esc(a.end)}</b>만 `:''}올 수 있어요. 확정할까요?`}${a.memo?`<br><small>“${esc(a.memo)}”</small>`:''}</div>
   <div class="hbtn">${t.kind!=='decide'?`<button class="pill sm line" data-hm="${esc(a.id)}" data-ok="0">이번엔 어려워요</button><button class="pill sm wine" data-hm="${esc(a.id)}" data-ok="1">OK, 보낼게요</button>`:`<button class="pill sm line" data-dc="${esc(a.id)}" data-ok="0">괜찮아요</button><button class="pill sm wine" data-dc="${esc(a.id)}" data-ok="1">확정</button>`}</div></article>`}

/* 갈게요 (본인) */
function applySheet(r,_,v){
  const sl=slots(r);let st=0,en=sl.length-1,part=false,lastB=null;
  const m=openSheet(`<h2>${esc(BRS(r.branch))} 지원 갈게요</h2>${head(r)}${r.body?`<p class="note" style="padding:6px 0 0">${esc(r.body)}</p>`:''}
    <div class="sseg pseg" style="margin-top:16px"><button data-t="0" class="on">요청 시간 그대로</button><button data-t="1">일부 시간만</button></div>
    <div id="pt" hidden><label class="f">시작 · 종료 <em>요청 시간 안에서</em></label><div class="htime"><select class="in" id="ts">${sl.slice(0,-2).map((t,i)=>`<option value="${i}">${fromM(t)}</option>`).join('')}</select><span>→</span><select class="in" id="te">${sl.map((t,i)=>`<option value="${i}" ${i===sl.length-1?'selected':''}>${fromM(t)}</option>`).join('')}</select></div><p class="note" style="padding:6px 0 0">일부 시간이면 요청 지점이 한 번 더 확인해요.</p></div>
    <div id="bz" class="hbzw"><div class="spin d"></div></div>
    <label class="f">한마디 <em>(선택)</em></label><input class="in" id="mm" placeholder="예) 16시부터 가능해요">
    <button class="pill wine full" id="ok" style="margin-top:18px" disabled>갈게요</button>
    <p class="note" style="padding:8px 0 0">홀은 점장님, 주방은 수쉐프님 → 점장님 결재가 끝나면 확정돼요. 확정되면 내 근무표에 들어가고 패스포트 도장이 찍혀요.</p>`,mm=>{
    const q=x=>mm.querySelector(x);
    const check=async()=>{q('#bz').innerHTML='<div class="spin d"></div>';q('#ok').disabled=true;
      try{const d={id:r.id};if(part){d.start=fromM(sl[st]);d.end=fromM(sl[en])}const res=await apiRaw('help.check',d);lastB=res.result[S.data.me.email];q('#bz').innerHTML=busyHtml(lastB);q('#ok').disabled=!!(lastB&&lastB.hard.length)}catch(e){q('#bz').innerHTML=`<div class="hbz x">${esc(e.message)}</div>`}};
    mm.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{part=b.dataset.t==='1';mm.querySelectorAll('[data-t]').forEach(x=>x.classList.toggle('on',x===b));q('#pt').hidden=!part;check()});
    q('#ts').onchange=e=>{st=+e.target.value;if(en<=st+1){en=Math.min(sl.length-1,st+2);q('#te').value=en}check()};
    q('#te').onchange=e=>{en=+e.target.value;if(en<=st+1){toast('1시간 이상 골라 주세요');en=Math.min(sl.length-1,st+2);q('#te').value=en}check()};
    q('#ok').onclick=async e=>{busy(e.currentTarget,true);const d={id:r.id,memo:q('#mm').value};if(part){d.start=fromM(sl[st]);d.end=fromM(sl[en])}
      try{const res=await api('help.apply',d);mm.remove();toast(res.status==='확정'?'확정! 내 근무표에 들어갔어요':res.status==='수쉐프확인'?'신청했어요. 수쉐프님 → 점장님 순서로 확인해요':res.status==='소속확인'?'신청했어요. 점장님 결재를 기다려요':'신청했어요. 요청 지점 확인을 기다려요',3200);ROUTES.help(v)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
    check();
  });
}
/* 우리 직원 보내기 (점장 · 매니저) */
function sendSheet(r,j,v){
  const ok=p=>r.part==='상관없음'||p.hybrid||p.part===r.part;
  const list=j.team.filter(p=>p.branch!==r.branch&&ok(p)&&!r.apps.some(a=>a.email===p.email&&['확정','수쉐프확인','소속확인','요청확인'].includes(a.status)));
  const groups=[...new Set(list.map(p=>p.branch))];
  const m=openSheet(`<h2>우리 직원 보내기</h2>${head(r)}<p class="note" style="padding:8px 0 0">${esc(r.part==='상관없음'?'홀·주방':r.part)} 직원${r.part!=='상관없음'?'과 Hybrid':''}만 보여요. 겹치는 근무가 있으면 고를 수 없어요.</p>
    <div id="tl" class="htl">${list.length?groups.map(g=>`<div class="htg">${esc(BRS(g))}</div>`+list.filter(p=>p.branch===g).map(p=>`<label class="htp" data-e="${esc(p.email)}"><input type="radio" name="tp" value="${esc(p.email)}" disabled><div><b>${esc(p.name)}</b> <small>${esc(p.part)}${p.hybrid?' · Hybrid':''}</small><div class="hbzs"><div class="spin d"></div></div></div></label>`).join('')).join(''):'<div class="empty">보낼 수 있는 직원이 없어요</div>'}</div>
    <label class="f">한마디 <em>(선택)</em></label><input class="in" id="mm" placeholder="예) 16시부터 가능해요">
    <button class="pill wine full" id="ok" style="margin-top:18px" disabled>보내기</button><p class="note" style="padding:8px 0 0">점장님이 보내면 결재가 끝난 거예요(요청 시간 그대로면 바로 확정). 수쉐프님이 보내면 점장님 최종 결재 후 확정돼요.</p>`,async mm=>{
    const q=x=>mm.querySelector(x);
    if(list.length){try{const res=await apiRaw('help.check',{id:r.id,emails:list.map(p=>p.email)});
      mm.querySelectorAll('.htp').forEach(l=>{const b=res.result[l.dataset.e];l.querySelector('.hbzs').innerHTML=b?busyHtml(b):'';const bad=!b||b.hard.length;l.classList.toggle('no',!!bad);l.querySelector('input').disabled=!!bad})}catch(e){toast(e.message)}}
    mm.querySelectorAll('input[name=tp]').forEach(i=>i.onchange=()=>{q('#ok').disabled=false});
    q('#ok').onclick=async e=>{const sel=mm.querySelector('input[name=tp]:checked');if(!sel)return;busy(e.currentTarget,true);
      try{const res=await api('help.apply',{id:r.id,email:sel.value,memo:q('#mm').value});mm.remove();toast(res.status==='확정'?'확정! 근무표에 들어갔어요':res.status==='소속확인'?'보냈어요. 점장님 최종 결재를 기다려요':'보냈어요. 요청 지점 확인을 기다려요',3200);ROUTES.help(v)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  });
}
/* 요청 올리기 */
async function helpNew(v){
  v.innerHTML=`${back('#/help','지원 요청')}<div class="title"><h1>지원 요청 올리기</h1></div>${loading()}`;
  let j;try{j=await api('help.list')}catch(e){return}
  if(!j.canCreate.length){v.innerHTML=`${back('#/help','지원 요청')}<div class="title"><h1>지원 요청 올리기</h1><p>요청은 점장님·매니저가 올려요. 점장님께 말씀해 주세요.</p></div>`;return}
  const tmr=addD(ymd(new Date()),1);
  let lines=[{date:tmr,start:'18:00',end:'23:00',part:'홀',count:1}];
  const T=[];for(let h=6;h<30;h++)for(const mm of [0,30])T.push(fromM(h*60+mm));
  const tsel=(id,val)=>`<select class="in" data-k="${id}">${T.map(t=>`<option ${t===val?'selected':''}>${t}</option>`).join('')}</select>`;
  const draw=()=>{const box=v.querySelector('#ln');box.innerHTML=lines.map((l,i)=>`<div class="hline" data-i="${i}">
      <div class="hlr"><input class="in" type="date" data-k="date" value="${esc(l.date)}" min="${ymd(new Date())}"><span class="hdw">${l.date?WD[pd(l.date).getDay()]:''}</span>${lines.length>1?`<button class="lk" data-rm>빼기</button>`:''}</div>
      <div class="htime">${tsel('start',l.start)}<span>→</span>${tsel('end',l.end)}</div>
      <div class="hlr2"><div class="sseg">${['홀','주방','상관없음'].map(p=>`<button data-p="${p}" class="${l.part===p?'on':''}">${p==='상관없음'?'홀·주방':p}</button>`).join('')}</div>
      <div class="hcntin"><button data-c="-1">−</button><b>${l.count}명</b><button data-c="1">+</button></div></div></div>`).join('');
    box.querySelectorAll('.hline').forEach(el=>{const i=+el.dataset.i;
      el.querySelectorAll('[data-k]').forEach(inp=>inp.onchange=e=>{lines[i][inp.dataset.k]=e.target.value;if(inp.dataset.k==='date')draw()});
      el.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{lines[i].part=b.dataset.p;draw()});
      el.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{lines[i].count=Math.max(1,Math.min(5,lines[i].count+ +b.dataset.c));draw()});
      const rm=el.querySelector('[data-rm]');if(rm)rm.onclick=()=>{lines.splice(i,1);draw()};
    })};
  v.innerHTML=`${back('#/help','지원 요청')}<div class="title"><h1>지원 요청 올리기</h1><p>다른 지점 직원 모두와 점장님께 알림이 가요. 홀 요청은 홀 직원과 Hybrid, 주방 요청은 주방 직원과 Hybrid가 받아요.</p></div>
   <div class="form">
    ${j.canCreate.length>1?`<label class="f">어느 지점?</label><select class="in" id="br">${j.canCreate.map(b=>`<option ${b===S.data.me.branch?'selected':''}>${esc(b)}</option>`).join('')}</select>`:`<label class="f">지점</label><div class="hfix">${esc(j.canCreate[0])}</div>`}
    <label class="f">언제 · 몇 시 · 홀/주방 · 몇 명</label><div id="ln"></div>
    <button class="pill sm line" id="add" style="margin-top:10px">+ 날짜·시간 더하기</button>
    <label class="f">왜 필요해요?</label><div class="hrs">${['대관','휴가 공백','행사','인원 부족'].map(x=>`<button data-r="${x}">${x}</button>`).join('')}</div><input class="in" id="rs" placeholder="예) 100명 대관 (19:30–22:30)">
    <label class="f">와서 할 일 · 안내 <em>(선택)</em></label><textarea class="in" id="bd" style="min-height:110px" placeholder="예) 서빙·잔 정리 위주, 15시 오픈이라 마감조로 오면 돼요. 검정 상의."></textarea>
   </div><div class="btnrow"><button class="pill wine" id="go">요청 올리기</button></div>`;
  draw();
  v.querySelector('#add').onclick=()=>{const l=lines[lines.length-1];lines.push({...l});draw()};
  v.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{const rs=v.querySelector('#rs');rs.value=b.dataset.r+(rs.value&&!rs.value.startsWith(b.dataset.r)?' · '+rs.value:'');v.querySelectorAll('[data-r]').forEach(x=>x.classList.toggle('on',x===b))});
  v.querySelector('#go').onclick=async e=>{
    if(lines.some(l=>!l.date))return toast('날짜를 넣어 주세요');
    const br=v.querySelector('#br')?v.querySelector('#br').value:j.canCreate[0];
    const sum=lines.map(l=>`${md(l.date)}(${WD[pd(l.date).getDay()]}) ${l.start}–${l.end} ${l.part==='상관없음'?'홀·주방':l.part} ${l.count}명`).join('\n');
    if(!confirm(`${BRS(br)} 지원 요청을 올릴까요?\n\n${sum}\n\n다른 지점 직원과 점장님께 알림이 가요.`))return;
    busy(e.currentTarget,true);
    try{const r=await api('help.create',{branch:br,lines,reason:v.querySelector('#rs').value.trim(),body:v.querySelector('#bd').value.trim()});toast(`올렸어요. ${r.notified}명에게 알림이 갔어요`,3200);location.hash='#/help'}catch(er){toast(er.message);busy(e.currentTarget,false)}};
}
/* 홈: 배너 + 전체 메뉴 타일 */
const _home=ROUTES[''];
ROUTES['']=function(v){const r=_home.apply(this,arguments);try{const x=(S.data&&S.data.x)||{};
  const sw=v.querySelector('.grid .tile[href="#/swap"]');if(sw&&!v.querySelector('.tile[href="#/help"]'))sw.insertAdjacentHTML('afterend',`<a class="tile ${x.helpOpen?'y':''}" href="#/help"><b>지원<br>요청</b><small>${x.helpOpen?x.helpOpen+'건 모집 중':'다른 지점 돕기'}</small></a>`);
  const anchor=v.querySelector('.sec');if(anchor&&!v.querySelector('.bn.hlp')){let h='';
    if(x.helpTodo)h+=`<a class="bn r hlp" href="#/help"><div><b>지원 확인 ${x.helpTodo}건</b><span>OK 하면 바로 근무표에 들어가요</span></div><span class="go">확인</span></a>`;
    if(x.helpOpen)h+=`<a class="bn hlp" href="#/help"><div><b>다른 지점이 도움을 기다려요 · ${x.helpOpen}건</b><span>갈 수 있으면 '갈게요'를 눌러 주세요</span></div><span class="go">보기</span></a>`;
    if(h)anchor.insertAdjacentHTML('beforebegin',h)}
}catch(e){}return r};
})();

/* 지원 요청: 더보기 목록에도 (대타 게시판 바로 아래) */
(function(){const _m=ROUTES.more;if(!_m)return;ROUTES.more=function(v,a){const r=_m.apply(this,arguments);const add=()=>{const sw=v.querySelector('a.li[href="#/swap"]');if(sw&&!v.querySelector('a.li[href="#/help"]')){const n=sw.cloneNode(true);n.setAttribute('href','#/help');n.querySelector('.t1').textContent='지원 요청';n.querySelector('.t2').textContent='다른 지점 돕기 · 사람 필요할 때';sw.insertAdjacentElement('afterend',n)}};add();setTimeout(add,300);return r}})();


/* ===== 더보기 통합 검색 (CREW-012, 차현 님 의견 Q261112-319E, 2026-11-13) =====
   더보기 맨 위 검색창: 메뉴 이름·설명·비슷한 말 + HR 가이드(TSB_GUIDE.search)를 한 번에 찾는다. */
(function(){
  const _m=ROUTES.more;if(!_m)return;
  const N=s=>String(s||'').toLowerCase().replace(/\s+/g,'');
  const E=s=>(typeof esc==='function'?esc(s):String(s==null?'':s));
  /* 더보기 목록에 없는 메뉴(홈 타일·신청 화면) + 비슷한 말 */
  const EXTRA=[
    ['#/new/연차','연차 · 반차 신청','휴가 쓰기 · 남은 연차','휴가 연차 반차 쉬는날 월차 오프'],
    ['#/new/휴가','특별 휴가 신청','경조 · 병가 · 공가','경조 결혼 장례 병가 아파 공가 예비군 출산'],
    ['#/apply','내 신청','신청한 것 · 결재 상태','결재 승인 상태 신청내역'],
    ['#/exp/new','경비 신청','영수증 · 택시 · 소모품','경비 영수증 택시 교통비 카드 구매 소모품 지출 청구'],
    ['#/sup/명함','명함 신청','점장 → 매니저 승인','명함'],
    ['#/sup/근무복','근무복 신청','점장 → 매니저 승인','근무복 유니폼 옷 앞치마'],
    ['#/sup/건강검진','건강검진 완료 등록','완료 날짜만 기록','건강검진 검진 보건증'],
    ['#/schedule','근무표','이번 주 · 다음 주 · 다른 지점','근무표 스케줄 시간표 시프트 출근시간'],
    ['#/help','지원 요청','다른 지점 돕기','지원 헬프 인력 도움 다른지점'],
    ['#/crew','매장 이야기','손님 · 동료 한마디','매장이야기 게시판 이야기꾼'],
    ['#/learn','러닝','교육 · 만화로 배우기','러닝 교육 공부 배우기 신입'],
    ['#/music','TSB music','매장 음악 · 선곡','음악 노래 플레이리스트 라디오 bgm'],
    ['#/badges','배지','Hybrid · Sommelier · Passport','배지 뱃지 badge'],
    ['#/ask','질문함','서포트센터에 묻기 · 답변 보기','질문 문의 건의 답변'],
    ['#/policy','회사 정책','규칙 · 정책','정책 규칙 규정'],
    ['#/memo','정산 메모','오늘 마감 메모','정산 마감 메모 현금 일정산'],
    ['#/contract','내 계약서','근로계약서 읽기 · 서명','계약서 근로계약 서명'],
    ['#/guide','HR 가이드','휴가 · 급여 · 복지 · 규칙','가이드 규정 복지 매뉴얼'],
    ['#/guide/design','디자인 가이드','로고 · 색 · 폰트 · 사이즈','디자인 폰트 글꼴 로고 색 컬러 사이즈 브랜드'],
    ['#/rental','대관 응대','손님 대관 질문 · 답 복사','대관 파티 단체 행사 예약금 렌탈 통대관'],
    ['#/slack','슬랙 열기','회사 슬랙','슬랙 slack 메신저']
  ];
  /* 더보기 목록 메뉴에 붙일 비슷한 말 (주소 기준) */
  const SYN={'#/guide/design':'디자인 폰트 글꼴 로고 색 컬러 사이즈 해상도 브랜드 포스터 메뉴판','#/rental':'대관 파티 단체 행사 예약금 렌탈 통대관 가격 환불 콜키지','#/guide':'가이드 규정 복지 매뉴얼 hr','#/payslip':'급여 월급 명세서 돈 임금 급여일','#/cert':'재직증명서 경력증명서 서류 증명','#/att':'출근 퇴근 출퇴근 gps 위치 지각','#/cal':'휴가 연차 누가 쉬어','#/swap':'대타 교대 근무바꾸기 바꿔','#/avail':'근무신청 휴무 희망 스케줄신청 쉬는날','#/exp':'경비 영수증 택시 지급','#/notice':'공지 매뉴얼 필독 안내','#/feedback':'의견 건의 불편 버그 제안 고쳐','#/incident':'사고 클레임 파손 다침 컴플레인','#/quiz':'와인 퀴즈 랭킹 레벨','#/kudos':'칭찬 감사 고마워','#/log':'업무일지 퇴근한줄 기록 일지','#/onb':'온보딩 입사 신입 체크','#/check/오픈':'오픈 마감 체크리스트 사진','#/schedule':'근무표 스케줄 시간표','#/console':'운영 콘솔 전지점','#/close':'근태 마감 월말','#/pay':'경비 지급 이체','#/notice/new':'공지 쓰기 작성','#/admin':'직원 관리 입사일 역할','#/help':'지원 헬프 인력'};
  const POP=['급여명세서','연차','증명서','경비','근무표','대타'];
  function menus(v){
    const out=[],seen=new Set();
    v.querySelectorAll('.list a.li[href^="#/"]').forEach(a=>{const h=a.getAttribute('href');if(seen.has(h))return;seen.add(h);out.push({h,t:(a.querySelector('.t1')||a).textContent.replace(/BETA|NEW|HQ/g,'').trim(),s:(a.querySelector('.t2')||{}).textContent||'',k:SYN[h]||''})});
    EXTRA.forEach(x=>{if(seen.has(x[0]))return;seen.add(x[0]);out.push({h:x[0],t:x[1],s:x[2],k:x[3]})});
    return out;
  }
  function find(list,q){
    const n=N(q);if(!n)return[];
    return list.map(m=>{const t=N(m.t),s=N(m.s),k=m.k.toLowerCase().split(/\s+/).filter(Boolean);let sc=0;
      if(t.includes(n))sc+=t.startsWith(n)?12:9;if(s.includes(n))sc+=4;
      k.forEach(w=>{if(w===n)sc+=8;else if(w.includes(n)||(n.length>=2&&n.includes(w)))sc+=4});
      return{m,sc}}).filter(x=>x.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,8).map(x=>x.m);
  }
  function snip(t,q){const p=String(t||'').replace(/[#*_`>|]/g,' ').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/\s+/g,' ').trim();const i=p.toLowerCase().indexOf(String(q).toLowerCase().trim());if(i<0)return E(p.slice(0,70))+(p.length>70?'…':'');const st=Math.max(0,i-24);return(st?'…':'')+E(p.slice(st,i))+'<mark>'+E(p.slice(i,i+q.trim().length))+'</mark>'+E(p.slice(i+q.trim().length,i+q.trim().length+50))+'…'}
  ROUTES.more=function(v,a){
    const r=_m.apply(this,arguments);
    const mount=()=>{
      if(v.querySelector('#msq'))return;const hero=v.querySelector('section.hero');if(!hero)return;
      hero.insertAdjacentHTML('afterend',`<div class="gd-sbox ms-box"><input class="in" id="msq" type="search" placeholder="메뉴·규정 검색  예) 급여명세서, 연차, 택시" autocomplete="off"></div>
        <div class="gd-pop ms-pop" id="mspop">${POP.map(w=>`<button data-w="${E(w)}">${E(w)}</button>`).join('')}</div><div id="msres"></div>`);
      const inp=v.querySelector('#msq'),res=v.querySelector('#msres'),pop=v.querySelector('#mspop');let MENU=null,tm,seq=0;
      const rest=()=>[...v.children].filter(el=>el!==hero&&!el.classList.contains('ms-box')&&el!==res&&el!==pop);
      const draw=()=>{
        const q=inp.value.trim(),my=++seq;MENU=MENU||menus(v);
        rest().forEach(el=>el.style.display=q?'none':'');pop.style.display=q?'none':'';
        if(!q){res.innerHTML='';return}
        const ms=find(MENU,q);
        const mh=ms.length?`<div class="sec"><h2>메뉴 ${ms.length}</h2></div><div class="list">${ms.map(m=>`<a class="li" href="${E(m.h)}"><div class="m"><div class="t1">${E(m.t)}</div><div class="t2">${E(m.s)}</div></div><span class="ar">${I('next',18)}</span></a>`).join('')}</div>`:'';
        const tail=`<a class="li" href="#/guide/s/${encodeURIComponent(q)}"><div class="m"><div class="t1">HR 가이드에서 '${E(q)}' 전부 보기</div><div class="t2">휴가 · 급여 · 복지 · 대관 응대 · 디자인</div></div><span class="ar">${I('next',18)}</span></a>`;
        res.innerHTML=mh+`<div class="sec"><h2>가이드</h2></div><div class="list" id="msg"><div class="sk" style="height:50px"></div></div>`;
        const G=window.TSB_GUIDE;
        if(!G){v.querySelector('#msg').innerHTML=tail;return}
        G.load().then(()=>{if(my!==seq)return;const el=v.querySelector('#msg');if(!el)return;const hs=G.search(q).slice(0,4);
          el.innerHTML=hs.map(x=>`<a class="li gd-hit" href="#/guide/${E(x.it.id)}/${x.s.i}" data-q="${E(q)}"><div class="m"><div class="t1">${E(x.it.title)}${x.s.i?` <span class="gd-path">› ${E(x.s.h)}</span>`:''}</div><div class="t2 w">${snip(x.s.text||x.it.summary,q)}</div></div><span class="ar">${I('next',18)}</span></a>`).join('')+tail;
          if(!ms.length&&!hs.length)el.insertAdjacentHTML('beforebegin',`<div class="blk"><div class="empty">'${E(q)}'에 맞는 메뉴를 못 찾았어요. 없는 기능이면 <a class="u" href="#/feedback">의견 보내기</a>로 알려 주세요.</div></div>`)
        }).catch(()=>{const el=v.querySelector('#msg');if(el)el.innerHTML=tail});
      };
      inp.oninput=()=>{clearTimeout(tm);tm=setTimeout(draw,140)};
      pop.onclick=ev=>{const b=ev.target.closest('button');if(!b)return;inp.value=b.dataset.w;draw()};
      res.onclick=ev=>{const h=ev.target.closest('a.gd-hit');if(h)sessionStorage.setItem('gd_q',h.dataset.q||'')};
    };
    mount();setTimeout(mount,350);return r;
  };
})();

/* 11/13: 대관 응대 입구 — 홈 매장·성장 '대관 문의' 타일(와인 퀴즈 옆) + 더보기 목록 */
(function(){
  const h=ROUTES[''];if(h)ROUTES['']=function(v){const r=h.apply(this,arguments);const add=()=>{try{if(v.querySelector('.tile[href="#/rental"]'))return;const q=v.querySelector('.tile[href="#/quiz"]');if(q)q.insertAdjacentHTML('afterend',`<a class="tile w" href="#/rental"><b>대관<br>문의</b><small>손님 답 복사</small></a>`)}catch(e){}};add();setTimeout(add,300);return r};
  const m=ROUTES.more;if(m)ROUTES.more=function(v){const r=m.apply(this,arguments);const add=()=>{if(v.querySelector('a.li[href="#/rental"]'))return;const g=v.querySelector('a.li[href="#/guide"],a.li[href="#/guide/01"]')||v.querySelector('a.li[href="#/avail"]');if(!g)return;const n=document.createElement('a');n.className='li';n.href='#/rental';n.innerHTML=`<div class="m"><div class="t1">대관 응대</div><div class="t2">손님 대관 질문 · 답 복사해서 보내기</div></div><span class="ar">${I('next',18)}</span>`;g.insertAdjacentElement('afterend',n)};const addDz=()=>{if(v.querySelector('a.li[href="#/guide/design"]'))return;const rv=v.querySelector('a.li[href="#/rental"]');if(!rv)return;const n=document.createElement('a');n.className='li';n.href='#/guide/design';n.innerHTML=`<div class="m"><div class="t1">디자인 가이드</div><div class="t2">로고 · 색 · 폰트 · 사이즈</div></div><span class="ar">${I('next',18)}</span>`;rv.insertAdjacentElement('afterend',n)};add();addDz();setTimeout(()=>{add();addDz()},400);return r};
})();


/* ── CREW-015 (2026-11-13) 확정 휴가 날짜 바꾸기: API v42 leave.change. 원 신청은 그대로(변경 요청 중), 새 날짜는 같은 결재선으로 재승인, 승인되면 원 신청 자동 취소 ── */
(function(){
  const _req=ROUTES.req;
  ROUTES.req=async function(v,id){
    await _req(v,id);
    let r; try{r=(await api('leave.get',{id})).request}catch(e){return}
    if(!r||location.hash!=='#/req/'+id||!v.querySelector('.form'))return;
    const per=(s,e)=>esc(s)+(e&&e!==s?' ~ '+esc(e):'');
    const title=v.querySelector('.title');
    if(r.changeReq)title.insertAdjacentHTML('afterend',`<a class="warn" id="chgb" href="#/req/${esc(r.changeReq.id)}" style="display:block;text-decoration:none;color:inherit;margin-top:12px"><b>날짜 변경 요청 중</b> · 새 날짜 ${per(r.changeReq.start,r.changeReq.end)} 결재를 기다리고 있어요. 승인되면 이 신청은 자동으로 취소돼요. <span class="u">보기</span></a>`);
    if(r.changeOf)title.insertAdjacentHTML('afterend',`<a class="warn" id="chgb" href="#/req/${esc(r.changeOf)}" style="display:block;text-decoration:none;color:inherit;margin-top:12px"><b>날짜 변경 요청</b>이에요. ${r.status==='승인완료'?'승인돼서 원래 신청은 자동 취소됐어요.':r.status==='진행중'?'승인되면 원래 신청은 자동으로 취소돼요.':'원래 신청은 그대로예요.'} <span class="u">원래 신청 보기</span></a>`);
    if(!r.canChange)return;
    const cc=v.querySelector('#cc'), row=cc?cc.parentElement:null;
    const btn=document.createElement('button');btn.className='pill wine';btn.id='chg';btn.textContent='날짜 바꾸기';
    if(row)row.prepend(btn);else{const d=document.createElement('div');d.className='btnrow';d.appendChild(btn);v.appendChild(d)}
    btn.onclick=()=>{
      const half=!!r.half, st={start:r.start,end:r.end||r.start,days:r.days||1}, today=ymd(new Date());
      openSheet(`<h2>날짜 바꾸기</h2><p class="note" style="padding:4px 0 0">${esc(r.type)} · 지금 ${per(r.start,r.end)} (${r.days}일)</p>
        ${half?`<label class="f">새 날짜</label><input class="in" type="date" id="nsd" min="${today}" value="${st.start}">`
          :`<div class="two"><div><label class="f">새 시작일</label><input class="in" type="date" id="nsd" min="${today}" value="${st.start}"></div><div><label class="f">새 종료일</label><input class="in" type="date" id="ned" min="${today}" value="${st.end}"></div></div>
          <label class="f">사용 일수 <em>근무일 기준으로 조정</em></label><div class="stepper"><button id="nmn">−</button><b id="ndy">${st.days}</b><button id="npl">+</button></div>`}
        <label class="f">바꾸는 이유 <em>(선택)</em></label><textarea class="in" id="nrs" placeholder="예) 검진 예약일이 바뀌었어요"></textarea>
        <div class="policy" style="margin-top:12px">새 날짜는 처음과 같은 결재선으로 다시 승인받아요. 승인되기 전까지는 지금 날짜가 그대로 유지되고, 승인되면 지금 신청은 자동으로 취소돼요. 남은 연차도 자동으로 다시 계산돼요.</div>
        <button class="pill wine full" style="margin-top:16px" id="nsb">변경 요청 보내기</button>`,m=>{
        const sd=m.querySelector('#nsd'),ed=m.querySelector('#ned'),dy=m.querySelector('#ndy');
        const calc=()=>{if(half){st.end=st.start;return}if(st.start&&st.end&&st.end>=st.start)st.days=Math.round((pd(st.end)-pd(st.start))/864e5)+1;dy.textContent=st.days};
        sd.onchange=()=>{st.start=sd.value;if(ed&&(!st.end||st.end<st.start)){st.end=st.start;ed.value=st.start}calc()};
        if(ed){ed.onchange=()=>{st.end=ed.value;calc()};m.querySelector('#nmn').onclick=()=>{st.days=Math.max(.5,st.days-.5);dy.textContent=st.days};m.querySelector('#npl').onclick=()=>{st.days+=.5;dy.textContent=st.days}}
        m.querySelector('#nsb').onclick=async e=>{
          if(!st.start)return toast('새 날짜를 골라 주세요');
          if(st.start===r.start&&(half||st.end===r.end)&&st.days===r.days)return toast('지금 날짜와 같아요');
          const b=e.currentTarget;busy(b,true,'보내는 중…');
          try{const j=await api('leave.change',{id:r.id,start:st.start,end:half?st.start:st.end,days:half?.5:st.days,reason:m.querySelector('#nrs').value.trim()});
            m.remove();toast('날짜 변경 요청을 보냈어요');await refresh();location.hash='#/req/'+j.id}catch(err){toast(err.message);busy(b,false)}};
      });
    };
  };
})();


/* 요청함 v4 (2026-11-14 미리보기, 바로가기 3칸 · 서포트센터 표기): 요청하기 하나로 · 지점 고르기 · 진행 단계(배송 조회식 트래커) · 내 요청 · 알림함
   벤치마크: ServiceNow Employee Center(정문 하나 · My Requests · To-dos), Workday Inbox, Jira Cloud for Slack(Slack은 알림, 앱은 처리)
   API req.catalog / req.create / req.mine / req.get / req.comment / req.csat / notis.list / notis.readOne
   화면 #/request · #/request/new/<kind> · #/ticket/<REQ-id> · #/myreq · #/notis */
(function(){
const BLUE='#156DFF';
const dots='<span class="rqd"><i style="background:#F43131"></i><i style="background:#156DFF"></i><i style="background:#FFC100"></i></span>';
const NOTYET=e=>/알 수 없는 요청/.test(String(e&&e.message||e));
const ICO={
 fix:'<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
 box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
 wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/>',
 won:'<path d="M3 6l4 12 3-9 2 0 3 9 4-12M2 11h20"/>',
 refund:'<path d="M4 10h13a4 4 0 0 1 0 8H9"/><path d="M8 6l-4 4 4 4"/>',
 alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
 party:'<path d="M4 20l5-14 9 9z"/><path d="M14 4l1 2M19 9l2-1M17 3l-1 3"/>',
 cal:'<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 swap:'<path d="M4 8h14l-4-4M20 16H6l4 4"/>',
 help:'<circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20a5 5 0 0 1 10 0M12 20a5 5 0 0 1 10 0"/>',
 doc:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
 card:'<rect x="3" y="6" width="18" height="12" rx="1"/><path d="M7 11h6M7 14h4"/>',
 shirt:'<path d="M8 3l-5 4 3 4 2-1v11h8V10l2 1 3-4-5-4-2 2h-4z"/>',
 heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 receipt:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
 bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',
 more:'<circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/>'
};
const AUTO={'시설':'fix','고장':'fix','수리':'fix','비품':'box','소모품':'box','POS':'wifi','IT':'wifi','앱':'wifi','환불':'refund','충전금':'refund','클레임':'alert','사고':'alert','대관':'party','휴가':'cal','연차':'cal','대타':'swap','근무':'swap','지원':'help','증명':'doc','명함':'card','근무복':'shirt','건강':'heart','급여':'user','인사':'user','경비':'receipt','정산':'won','결제':'won','아이디어':'bulb','개선':'bulb','질문':'chat','의견':'chat'};
const KEYICO={fix:'fix',repair:'fix',supply:'box',it:'wifi',refund:'refund',incident:'alert',claim:'alert',rental:'party',leave:'cal',leave2:'cal',swap:'swap',help:'help',helpout:'help',payhr:'user',pay:'user',cert:'doc',card:'card',bcard:'card',uniform:'shirt',checkup:'heart',expense:'receipt',settle:'won',appidea:'bulb',idea:'bulb',ask:'chat',etc:'more',other:'more'};
function ico(it,s){let k=it.icon&&ICO[it.icon]?it.icon:(KEYICO[it.key]||'');if(!k){for(const w in AUTO){if(String(it.title||'').includes(w)){k=AUTO[w];break}}}k=k||'more';
  return `<svg width="${s||22}" height="${s||22}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${ICO[k]}</svg>`}
const T=(k,l,t,ty,o)=>Object.assign({key:k,label:l,type:t||'text',required:!!(o&&o.req)},ty?{placeholder:ty}:{},o||{});
const P=()=>T('photo','사진','photo','',{});
/* 백엔드 준비 전 화면용 기본 카탈로그 (서버 req.catalog가 오면 그걸 씀) */
const FALLBACK={groups:[
 {key:'store',title:'매장 · 시설',items:[
  {key:'repair',icon:'fix',title:'고장 · 수리',desc:'누수 · 전기 · 냉장고 · 디스펜서',examples:['[마곡] 2번 디스펜서 온도 오류'],mode:'ticket',team:'시설팀',fields:[T('what','무엇이 문제인가요','textarea','예) 2번 디스펜서 온도가 18도로 떠요',{req:1}),T('since','언제부터','text','예) 오늘 오픈 때부터'),T('where','어디서','text','기계 번호 · 위치'),P()]},
  {key:'supply',icon:'box',title:'비품 · 소모품',desc:'떨어진 것 · 새로 필요한 것',examples:['[상암] 냅킨 · 와인잔 보충'],mode:'ticket',team:'구매원가팀',fields:[T('items','필요한 것과 수량','textarea','예) 와인잔 12개, 냅킨 2박스',{req:1}),T('when','언제까지','date'),P()]},
  {key:'it',icon:'wifi',title:'POS · 기기 · 앱 오류',desc:'포스 · 와이파이 · 프린터 · People 앱',examples:['[청계] 2번 포스 결제 오류'],mode:'ticket',team:'IT팀',fields:[T('what','어떤 오류인가요','textarea','화면에 뜬 문구 그대로 적어 주세요',{req:1}),T('since','언제부터','text'),P()]}]},
 {key:'guest',title:'고객',items:[
  {key:'refund',icon:'refund',title:'고객 충전금 환불',desc:'남은 잔액 환불 요청 전달',examples:['[마곡] 홍길동 고객 충전금 환불'],mode:'ticket',team:'재무팀',fields:[T('name','고객 이름','text','',{req:1}),T('phone','앱 가입 번호','text','010-',{req:1}),T('charged','충전일 · 금액','text','예) 2024.7.28 30,000원'),T('remain','남은 잔액','money','숫자만',{req:1}),T('account','환불 계좌','text','은행 / 번호 / 예금주'),T('why','사유','textarea')]},
  {key:'claim',icon:'alert',title:'고객 클레임 · 사고 보고',desc:'바로 보고 화면으로 가요',mode:'link',link:'#/incident/new'},
  {key:'rental',icon:'party',title:'대관 · 단체 문의 전달',desc:'손님 연락처와 날짜만',examples:['[동대문] 11/21 30명 대관 문의'],mode:'ticket',team:'영업팀',fields:[T('who','손님 · 연락처','text','',{req:1}),T('date','희망 날짜','date'),T('people','인원','text'),T('memo','내용','textarea')]}]},
 {key:'work',title:'나의 근무',items:[
  {key:'leave',icon:'cal',title:'휴가 · 연차',desc:'점장님 결재로 바로 가요',mode:'link',link:'#/new/연차'},
  {key:'swap',icon:'swap',title:'근무 바꾸기 · 대타',desc:'동료에게 근무 넘기기',mode:'link',link:'#/swap'},
  {key:'helpout',icon:'help',title:'다른 지점 지원',desc:'사람이 모자란 지점 돕기',mode:'link',link:'#/help'}]},
 {key:'hr',title:'인사 · 서류',items:[
  {key:'pay',icon:'user',title:'급여 · 4대보험 · 퇴직 문의',desc:'인사팀이 직접 답해요',examples:['10월 급여 공제 내역 문의'],mode:'ticket',team:'인사팀',fields:[T('what','궁금한 것','textarea','',{req:1})]},
  {key:'cert',icon:'doc',title:'재직 · 경력증명서',desc:'PDF로 바로 발급',mode:'link',link:'#/cert'},
  {key:'bcard',icon:'card',title:'명함 신청',desc:'점장 → 매니저 승인',mode:'link',link:'#/sup/명함'},
  {key:'uniform',icon:'shirt',title:'근무복 신청',desc:'점장 → 매니저 승인',mode:'link',link:'#/sup/근무복'},
  {key:'checkup',icon:'heart',title:'건강검진 완료 등록',desc:'날짜만 기록해요',mode:'link',link:'#/sup/건강검진'}]},
 {key:'money',title:'돈',items:[
  {key:'expense',icon:'receipt',title:'개인경비 청구',desc:'영수증 찍고 1분이면 끝',mode:'link',link:'#/exp/new'},
  {key:'settle',icon:'won',title:'결제 · 정산 문의',desc:'정산 금액 · 이체 확인',mode:'ticket',team:'재무팀',fields:[T('what','무엇이 궁금한가요','textarea','',{req:1}),T('amount','금액','money')]}]},
 {key:'voice',title:'의견',items:[
  {key:'idea',icon:'bulb',title:'앱 개선 아이디어',desc:'People · crew를 더 편하게',examples:['근무표에서 다음 주 바로 보기'],mode:'ticket',team:'IT팀',fields:[T('what','무엇을 바꾸면 좋을까요','textarea','',{req:1}),P()]},
  {key:'ask',icon:'chat',title:'질문 · 제안 · 불편 · 칭찬',desc:'익명으로도 보낼 수 있어요',mode:'link',link:'#/ask'}]},
 {key:'etc',title:'기타',items:[
  {key:'other',icon:'more',title:'그 밖의 요청',desc:'어디로 보낼지 모를 때',mode:'ticket',team:'전략기획팀',fields:[T('what','내용','textarea','무엇이 / 언제부터 / 어디서 / 원하는 것',{req:1}),P()]}]}
]};
const R={cat:null,ready:null,open:null};
const FBD={};FALLBACK.groups.forEach(g=>g.items.forEach(it=>{if(it.link)FBD[it.link]=it.desc}));
function norm(c){c.groups.forEach(g=>{g.title=String(g.title||'').replace(/·/g,' · ');g.items.forEach(it=>{const ex=it.examples;it.examples=Array.isArray(ex)?ex.filter(Boolean):(ex?[ex]:[]);it.title=String(it.title||'').replace(/·/g,' · ');it.desc=String(it.desc||'').replace(/·/g,' · ');if(it.mode==='link'&&(/^기존|질문함|^바로 발급/.test(it.desc))&&FBD[it.link.replace('#/help/new','#/help')])it.desc=FBD[it.link.replace('#/help/new','#/help')];if(it.link==='#/new/휴가')it.desc='경조 · 병가 · 공가 · 특별 휴가';if(it.link==='#/help/new')it.desc='사람이 모자란 지점에 지원 요청 올리기'})});return c}
async function catalog(){if(R.cat)return R.cat;try{const j=await apiRaw('req.catalog');R.cat=norm(j);R.ready=true}catch(e){if(NOTYET(e)){R.cat=FALLBACK;R.ready=false}else throw e}return R.cat}
function findItem(c,k){for(const g of c.groups)for(const it of g.items)if(it.key===k)return it;return null}
const hrefOf=it=>it.mode==='link'?(it.link==='#/exp/new'&&typeof EXP_URL!=='undefined'?'#/exp/new':it.link):'#/request/new/'+encodeURIComponent(it.key);
const soon=()=>`<div class="rqsoon"><b>곧 열려요</b><span>요청 접수 연결을 마무리하고 있어요. 급한 건 hello+request@tsb.wine 으로 메일 주세요.</span></div>`;
const ST={접수:'신청','진행 중':'진행중','답 기다림':'진행중',보류:'미확정',완료:'확정','다시 열림':'진행중'};
const stChip=s=>chip(ST[s]||'신청',s||'접수');
const dueK=s=>{const m=String(s||'').match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}:\d{2})/);if(!m)return s;const d=new Date(+m[1],m[2]-1,+m[3]);return `${+m[2]}/${+m[3]}(${WD[d.getDay()]}) ${m[4]}`};
const ds=s=>{if(!s)return'';const t=String(s).replace('T',' ');return t.slice(5,16).replace('-','.')};

/* ── 진행 단계 (배송 조회식) ── */
const GEN=team=>[{label:'접수',desc:'번호가 붙고 담당팀에 전달돼요'},{label:'담당 확인',desc:(team||'담당팀')+'이 내용을 확인해요'},{label:'처리 중',desc:'진행 상황이 바뀌면 Slack으로 알려 드려요'},{label:'완료',desc:'해결됐는지 한 번만 눌러 주세요'}];
const stepsOf=(x,team)=>Array.isArray(x&&x.steps)&&x.steps.length?x.steps.map(s=>typeof s==='string'?{label:s,desc:''}:s):GEN(team);
function genStage(t){const s=t.status;if(s==='완료')return 3;if(s==='진행 중'||s==='답 기다림'||s==='보류'||s==='다시 열림')return 2;return t.firstAt?1:0}
function stageIdx(j,t,steps){let k=j.stage!=null?j.stage:t.stage;
  if(typeof k==='string'&&!/^\d+$/.test(k)){const i=steps.findIndex(s=>s.label===k);k=i<0?null:i}
  if(k==null||k==='')return Math.min(genStage(t),steps.length-1);
  k=Number(k)-1;/* 서버 stage는 1부터 */if(t.status==='완료')return steps.length-1;return Math.max(0,Math.min(steps.length-1,k))}
function timeAt(j,t,steps,i){const st=j.stageTimes||t.stageTimes;
  if(Array.isArray(st))return st[i]||'';
  if(st&&typeof st==='object')return st[i+1]||st[String(i+1)]||st[steps[i].label]||'';
  if(i===0)return t.at;if(i===steps.length-1&&t.doneAt)return t.doneAt;if(i===1&&t.firstAt)return t.firstAt;return ''}
const HOLD={'보류':'잠시 멈춰 있어요. 이유는 아래 담당 메모를 봐 주세요. 다시 움직이면 바로 알려 드려요.','답 기다림':'담당팀이 요청자님의 답을 기다리고 있어요. 아래 메모 남기기로 알려 주세요.','다시 열림':'아직 해결되지 않았다고 알려 주셔서 다시 열었어요. 이어서 챙길게요.'};
function nowOf(j,t,steps,si){if(j.nowText||t.nowText)return j.nowText||t.nowText;const team=j.owner||t.owner||t.team||'담당팀';
  if(t.status==='완료')return '처리를 마쳤어요';if(t.status==='보류')return '잠시 멈춰 있어요';if(t.status==='답 기다림')return '요청자님의 답을 기다리고 있어요';
  if(si===0)return team+'에 전달됐어요';return team+'이 '+(steps[si].label||'처리')+' 중이에요'}
const brOpts=c=>{const l=(Array.isArray(c.branches)&&c.branches.length?c.branches.slice():['청계','상암','마곡','동대문','서여의도']).map(b=>typeof b==='string'?b:(b.name||b.branch));const hq=l.includes('서포트센터')?'서포트센터':'본사';const o=l.filter(b=>b&&!HQ(b));o.push(hq);return o};
const HQ=b=>b==='본사'||b==='서포트센터';
const brK=b=>HQ(b)?'서포트센터':b;
const strip=steps=>`<div class="rqstrip"><div class="h">보내면 이렇게 진행돼요</div><ol>${steps.map((s,i)=>`<li><i>${i+1}</i><span>${esc(s.label)}</span></li>`).join('')}</ol></div>`;

/* ── 요청하기 허브 ── */
ROUTES.request=async function(v,arg){
  if(arg&&arg.startsWith('new/'))return reqNew(v,arg.slice(4));
  const head=`${back('#/')}<div class="title">${dots}<h1>무엇을 도와드릴까요?</h1><p>고르면 맞는 양식이 나와요. 보내면 번호가 붙고, 진행 상황은 Slack으로 알려 드려요.</p></div>`;
  v.innerHTML=head+loading();
  let c;try{c=await catalog()}catch(e){v.innerHTML=`${back('#/')}<div class="empty">${esc(e.message)}</div>`;return}
  const open=R.open;
  v.innerHTML=head+`${R.ready===false?soon():''}
   <a class="rqmine" href="#/myreq"><div><b>내 요청</b><span>${open?`진행 중 ${open}건 · 지금 어디까지 왔는지 봐요`:'보낸 요청과 신청을 한곳에서'}</span></div><i>${I('next',18)}</i></a>
   ${c.groups.map(g=>`<div class="sec"><h2>${esc(g.title)}</h2></div><div class="rqg">${g.items.map(it=>`<a class="rqi ${it.mode==='link'?'lk':''}" href="${esc(hrefOf(it))}"><span class="rqic">${ico(it)}</span><span class="rqt"><b>${esc(it.title)}</b><small>${esc(it.desc||'')}</small>${it.examples&&it.examples.length?`<em>예) ${esc(String(it.examples[0]).replace(/^예\)\s*/,''))}</em>`:''}</span><span class="rqgo">${it.mode==='link'?'바로가기':(it.team?esc(it.team):'')}</span></a>`).join('')}</div>`).join('')}
   <p class="note rqfoot">급한 건(화재 · 누수 · 정전 · 가스 냄새)은 먼저 점장님과 서포트센터에 전화하고, 그다음 요청을 남겨 주세요.</p>`;
};
/* ── 요청 양식 (지점 고르기 + 진행 단계 미리보기) ── */
async function reqNew(v,kind){kind=decodeURIComponent(kind);
  v.innerHTML=`${back('#/request','요청하기')}${loading()}`;
  let c;try{c=await catalog()}catch(e){v.innerHTML=`${back('#/request','요청하기')}<div class="empty">${esc(e.message)}</div>`;return}
  const it=findItem(c,kind);if(!it){v.innerHTML=`${back('#/request','요청하기')}<div class="empty">없는 요청 종류예요</div>`;return}
  if(it.mode==='link'){location.replace(hrefOf(it));return}
  const me=S.data.me, photos=[], brs=brOpts(c);let br=(c.me&&c.me.branch)||me.branch||'본사';if(HQ(br))br=brs.find(HQ)||br;if(!brs.includes(br))brs.unshift(br);
  const steps=stepsOf(it,it.team);
  const fld=f=>{const id='rf_'+f.key, lab=`<label class="f">${esc(f.label)}${f.required?'':' <em>(선택)</em>'}</label>`;
    if(f.type==='photo')return '';
    if(f.type==='textarea')return lab+`<textarea class="in" id="${id}" placeholder="${esc(f.placeholder||'')}"></textarea>`;
    if(f.type==='select')return lab+`<select class="in" id="${id}"><option value="">고르기</option>${(f.options||[]).map(o=>`<option>${esc(o)}</option>`).join('')}</select>`;
    if(f.type==='date')return lab+`<input class="in" type="date" id="${id}">`;
    if(f.type==='money')return lab+`<input class="in" inputmode="numeric" id="${id}" placeholder="${esc(f.placeholder||'숫자만')}">`;
    return lab+`<input class="in" id="${id}" placeholder="${esc(f.placeholder||'')}">`};
  const hasPhoto=(it.fields||[]).some(f=>f.type==='photo');
  v.innerHTML=`${back('#/request','요청하기')}<div class="title"><div class="rqhd"><span class="rqic big">${ico(it,26)}</span><div><h1>${esc(it.title)}</h1><p>담당 ${esc(it.team||'서포트센터')}</p></div></div></div>
   ${R.ready===false?soon():''}
   ${strip(steps)}
   <div class="form">
    <label class="f">어느 지점 일인가요</label><div class="rqbr" id="rqbr">${brs.map(b=>`<button type="button" data-b="${esc(b)}" class="${b===br?'on':''}">${esc(brK(b))}</button>`).join('')}</div>
    <label class="f">제목 <em>(한 줄)</em></label><input class="in" id="rf__title" placeholder="${esc(it.examples&&it.examples[0]?'예) '+String(it.examples[0]).replace(/^예\)\s*/,''):'예) 무엇이 + 어떻게')}">
    ${(it.fields||[]).map(fld).join('')}
    ${hasPhoto?`<label class="f">사진 <em>(최대 3장)</em></label><div class="rqph" id="rqph"><label class="rqadd"><input type="file" accept="image/*" multiple hidden id="rqfile">+ 사진</label></div>`:''}
    <label class="rqurg"><input type="checkbox" id="rf__urgent"><span><b>긴급</b> · 영업에 바로 지장이 있어요 (4시간 안에 첫 답)</span></label>
   </div>
   <div class="btnrow"><button class="pill rqbtn" id="rqsend" ${R.ready===false?'disabled':''}>${R.ready===false?'곧 열려요':'요청 보내기'}</button></div>
   <p class="note" style="padding:0 var(--pad) 30px">${esc(it.afterSubmit||'보내면 번호가 붙어요. 첫 답은 다음 영업일 18시까지 드려요.')}</p>`;
  v.querySelectorAll('#rqbr button').forEach(b=>b.onclick=()=>{br=b.dataset.b;v.querySelectorAll('#rqbr button').forEach(x=>x.classList.toggle('on',x===b))});
  const drawPh=()=>{const el=$('#rqph');if(!el)return;el.querySelectorAll('.pt').forEach(x=>x.remove());photos.forEach((p,i)=>el.insertAdjacentHTML('afterbegin',`<span class="pt" style="background-image:url(${p.url})"><button type="button" data-rm="${i}">×</button></span>`));el.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{photos.splice(+b.dataset.rm,1);drawPh()});const ad=el.querySelector('.rqadd');if(ad)ad.style.display=photos.length>=3?'none':''};
  const fi=$('#rqfile');if(fi)fi.onchange=async()=>{for(const f of [...fi.files].slice(0,3-photos.length)){try{const url=await fileToDataUrl(f,1600,.8);photos.push({url,name:(f.name||'photo').replace(/\.\w+$/,'')+'.jpg',mime:'image/jpeg',data:url.split(',')[1]})}catch(e){toast('사진을 못 읽었어요')}}fi.value='';drawPh()};
  $('#rqsend').onclick=async e=>{const b=e.currentTarget;const fields={};let miss='';
    for(const f of it.fields||[]){if(f.type==='photo')continue;const el=$('#rf_'+f.key);const val=(el&&el.value||'').trim();if(f.required&&!val&&!miss)miss=f.label;if(val)fields[f.key]=val}
    let title=$('#rf__title').value.trim();
    if(miss)return toast(miss+'을(를) 적어 주세요');
    if(!title){const first=Object.values(fields)[0]||'';title=`[${brK(br)}] ${it.title}${first?' · '+String(first).split('\n')[0].slice(0,24):''}`}
    busy(b,true);
    try{const r=await api('req.create',{kind:it.key,title,fields,urgent:$('#rf__urgent').checked?1:'',photos:photos.map(p=>({name:p.name,mime:p.mime,data:p.data})),branch:br});
      R.open=(R.open||0)+1;done(v,r,it,title,br,steps)}
    catch(x){busy(b,false);toast(NOTYET(x)?'요청 접수가 아직 연결 중이에요. 잠시 뒤 다시 해 주세요':x.message)}};
}
function done(v,r,it,title,br,steps){
  steps=stepsOf(r.steps?r:it,r.team||it.team);
  const due=r.dueText||dueK(r.due)||'다음 영업일 18시';
  v.innerHTML=`<div class="rqdone">${dots}<div class="k">접수 완료</div><div class="no">${esc(r.id)}</div><p class="tt">${esc(title)}</p>
   <dl><dt>지점</dt><dd>${esc(brK(r.branch||br))}</dd><dt>담당</dt><dd>${esc(r.team||it.team||'서포트센터')}</dd><dt>첫 답</dt><dd>${esc(due)}까지</dd></dl>
   <div class="rqvs sm">${steps.map((s,i)=>`<div class="${i===0?'done':'fut'}"><i>${i===0?'✓':i+1}</i><div><b>${esc(s.label)}${i===0?' <small>지금</small>':''}</b>${s.desc?`<span>${esc(s.desc)}</span>`:''}${i===1?`<span class="due">첫 답 ${esc(due)}까지</span>`:''}</div></div>`).join('')}</div>
   ${it.afterSubmit?`<p class="aft">${esc(it.afterSubmit)}</p>`:''}
   <div class="slk"><b>알림은 Slack으로 와요</b><span>단계가 바뀔 때마다 TSB CREW가 DM을 보내요. 누르면 이 요청의 진행 화면으로 와요.</span></div></div>
   <div class="btnrow"><a class="pill line" href="#/">홈으로</a><a class="pill rqbtn" href="#/ticket/${encodeURIComponent(r.id)}">진행 상황 보기</a></div>`;
  window.scrollTo(0,0);
}
/* ── 티켓 상세: 배송 조회식 트래커 ── */
ROUTES.ticket=async function(v,id){
  v.innerHTML=`${back('#/myreq','내 요청')}${loading()}`;
  let j;try{j=await apiRaw('req.get',{id})}catch(e){v.innerHTML=`${back('#/myreq','내 요청')}${NOTYET(e)?'<div class="title"><h1>'+esc(id)+'</h1></div>'+soon():'<div class="empty">'+esc(e.message)+'</div>'}`;return}
  if(location.hash.indexOf('#/ticket/')!==0)return;
  const t=j.ticket||j.item||j, logs=j.logs||j.log||j.history||j.timeline||t.log||[], memo=t.pub||t.note||'';
  const steps=stepsOf(j.steps?j:t,t.team), si=stageIdx(j,t,steps), fin=t.status==='완료', hold=HOLD[t.status];
  const owner=j.owner||t.owner||t.team||'';
  const nxt=j.next||t.next||(!fin&&steps[si+1]?steps[si+1].label+(steps[si+1].desc?' · '+steps[si+1].desc:''):'');
  const canCs=j.canCsat!==undefined?j.canCsat:(fin&&!t.csat);
  v.innerHTML=`${back('#/myreq','내 요청')}
   <section class="rqnow ${fin?'fin':''} ${hold?'hold':''}"><div class="k">${dots}<span>${esc(t.id||id)}</span>${t.branch?`<span class="b">${esc(brK(t.branch))}</span>`:''}</div>
    <div class="nw">지금 어디에 있나</div><h2>${esc(nowOf(j,t,steps,si))}</h2><p class="tt">${esc(t.title||'')}</p>
    <div class="bar"><i style="width:${Math.round((fin?1:(si+.5)/steps.length)*100)}%"></i></div>
    <div class="meta"><span>${si+1}/${steps.length} ${esc(steps[si].label)}</span><span>담당 ${esc(owner)}</span></div></section>
   ${hold?`<div class="rqhold">${stChip(t.status)}<span>${esc(hold)}</span></div>`:''}
   ${canCs?`<section class="rqcs"><b>해결됐나요?</b><span>한 번만 눌러 주세요. 아직이면 바로 다시 열어요.</span><div class="btnrow" style="padding:12px 0 0"><button class="pill line" data-cs="bad">아직이에요</button><button class="pill rqbtn" data-cs="good">해결됐어요</button></div></section>`:''}
   <div class="rqvs">${steps.map((s,i)=>{const cls=i<si||fin?'done':i===si?'cur':'fut';const tm=timeAt(j,t,steps,i);
     return `<div class="${cls}"><i>${cls==='done'?'✓':i+1}</i><div><b>${esc(s.label)}${cls==='cur'?' <small>지금</small>':''}</b>${s.desc?`<span>${esc(s.desc)}</span>`:''}${tm&&cls!=='fut'?`<span class="tm">${esc(ds(tm))}</span>`:''}</div></div>`}).join('')}</div>
   ${nxt&&!fin?`<div class="rqnext"><b>다음 예정</b><span>${esc(nxt)}</span></div>`:''}
   ${t.csat?`<p class="note" style="padding:12px var(--pad) 0">남겨 주신 평가: <b>${esc(t.csat)}</b></p>`:''}
   <dl class="kv rqkv"><dt>상태</dt><dd>${stChip(t.status)}</dd><dt>지점</dt><dd>${esc(brK(t.branch||''))}</dd><dt>종류</dt><dd>${esc(t.kind||'')}</dd><dt>담당</dt><dd>${esc(t.team||'')}</dd><dt>접수</dt><dd>${esc(ds(t.at))}</dd><dt>첫 답 기한</dt><dd>${esc(t.dueText||dueK(t.due)||'')}${t.firstAt?' · 답함':''}</dd>${memo?`<dt>담당 메모</dt><dd>${esc(memo)}</dd>`:''}</dl>
   ${t.body?`<div class="sec"><h2>보낸 내용</h2></div><div class="rqbody">${esc(t.body)}</div>`:''}
   <div class="sec"><h2>기록</h2></div>
   <div class="rqtl">${logs.length?logs.slice().reverse().map(l=>`<div><i></i><b>${esc(l.event||l.action||'')}</b>${l.text?` · ${esc(l.text)}`:''}<small>${esc(ds(l.at))}</small></div>`).join(''):'<div class="empty">아직 기록이 없어요</div>'}</div>
   <div class="form"><label class="f">메모 남기기 <em>(담당팀이 바로 봐요)</em></label><textarea class="in" id="rqcm" placeholder="더 알려 줄 것, 바뀐 상황"></textarea></div>
   <div class="btnrow"><button class="pill ink" id="rqcmb">남기기</button></div><div style="height:30px"></div>`;
  v.querySelectorAll('[data-cs]').forEach(b=>b.onclick=async()=>{busy(b,true);try{await api('req.csat',{id:t.id||id,s:b.dataset.cs});toast(b.dataset.cs==='good'?'고마워요':'다시 열었어요. 담당팀이 이어서 챙길게요');ROUTES.ticket(v,id)}catch(e){busy(b,false);toast(e.message)}});
  $('#rqcmb').onclick=async e=>{const tx=$('#rqcm').value.trim();if(!tx)return toast('메모를 적어 주세요');busy(e.currentTarget,true);try{await api('req.comment',{id:t.id||id,text:tx});toast('남겼어요');ROUTES.ticket(v,id)}catch(x){busy(e.currentTarget,false);toast(x.message)}};
};
/* ── 내 요청 ── */
const SRC={apply:'신청',ticket:'요청',티켓:'요청',leave:'휴가',휴가:'휴가',신청:'신청',ask:'질문',질문:'질문',질문함:'질문',sup:'신청',지원:'지원'};
ROUTES.myreq=async function(v,tab){
  tab=tab==='closed'?'closed':'open';
  const head=`${back('#/request','요청하기')}<div class="title"><h1>내 요청</h1><p>보낸 요청, 휴가 신청, 질문을 번호별로 한곳에서 봐요.</p></div>
   <div class="seg"><button data-t="open" class="${tab==='open'?'on':''}">진행 중</button><button data-t="closed" class="${tab==='closed'?'on':''}">끝난 것</button></div>`;
  v.innerHTML=head+loading();
  const wire=()=>v.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>location.hash='#/myreq/'+b.dataset.t);
  wire();
  let items;
  try{const j=await apiRaw('req.mine',{status:tab});items=j.items||[];if(tab==='open')R.open=(j.counts&&j.counts.open!=null)?j.counts.open:items.length}
  catch(e){if(!NOTYET(e)){v.innerHTML=head+`<div class="empty">${esc(e.message)}</div>`;wire();return}
    const rq=(S.data.requests||[]).map(r=>({id:r.id,source:'휴가',kind:r.type,title:r.type+(r.group==='지원'?'':' '+(r.days||'')+'일'),status:r.status,at:r.at,link:'#/req/'+r.id,open:r.status==='진행중'}));
    items=rq.filter(r=>tab==='open'?r.open:!r.open);v.innerHTML=head+soon()+list(items,tab);wire();return}
  v.innerHTML=head+list(items,tab)+`<div class="btnrow"><a class="pill rqbtn" href="#/request">새 요청하기</a></div><div style="height:24px"></div>`;wire();
};
function mini(r){const isT=r.source==='ticket'||/^REQ-/.test(r.id);if(!isT)return '';
  const n=Number(r.stepsN||r.stepCount||(typeof r.steps==='number'?r.steps:(Array.isArray(r.steps)?r.steps.length:0)))||4;
  let k=r.stage;let lab=r.stageLabel||'';
  if(typeof k==='string'&&!/^\d+$/.test(k)){lab=lab||k;k=null}
  if(k==null||k===''){k=genStage(r)}else k=Number(k)-1;
  if(r.status==='완료'||r.open===false)k=n-1;
  if(!lab)lab=(Array.isArray(r.stepLabels)&&r.stepLabels[k])||GEN()[Math.min(k,3)].label;
  return `<div class="rqmini"><div class="bar"><i style="width:${Math.round((k+1)/n*100)}%"></i></div><span>${k+1}/${n} ${esc(lab)}</span></div>`}
function list(items,tab){if(!items.length)return `<div class="empty" style="padding:40px var(--pad)">${tab==='open'?'진행 중인 요청이 없어요':'끝난 요청이 아직 없어요'}</div>`;
  return `<div class="rql">${items.map(r=>{const src=SRC[r.source]||r.source||'요청';const href=r.link||(/^REQ-/.test(r.id)?'#/ticket/'+r.id:'#/req/'+r.id);
   return `<a class="rqr" href="${esc(href)}"><span class="src s-${esc(src)}">${esc(src)}</span><div class="m"><div class="t1">${esc(r.title||r.kind||'')}</div><div class="t2">${/^REQ-/.test(r.id)?esc(r.id)+' · ':''}${r.branch?esc(brK(r.branch))+' · ':''}${esc(r.team||r.kind||'')}${r.updated||r.at?' · '+esc(ds(r.updated||r.at)):''}</div>${mini(r)}</div>${stChip(r.status)}</a>`}).join('')}</div>`}
/* ── 알림함 ── */
const TYK={req:'요청',ticket:'요청',request:'요청',approval:'결재',approve:'결재',notice:'공지',etc:'기타'};
const KIND=n=>{const l=String(n.link||''),t=String(n.title||'');if(n.type&&TYK[n.type])return TYK[n.type];
  if(/^#\/(ticket|request|myreq)/.test(l)||/REQ-\d/.test(t))return '요청';
  if(/^#\/notice/.test(l)||/^\[공지\]/.test(t))return '공지';
  if(/^#\/(inbox|exp|close|admin)/.test(l)||/결재|승인 요청|리마인드|확인해 주세요/.test(t))return '결재';
  return '기타'};
ROUTES.notis=async function(v,tab){
  tab=['요청','결재','공지'].includes(tab)?tab:'전체';
  const tabs=['전체','요청','결재','공지'], TK={전체:'all',요청:'req',결재:'approval',공지:'notice'};
  let items=null, UC=null;
  try{const j=await apiRaw('notis.list',{tab:TK[tab],limit:60});UC=j.unread||null;items=(j.items||[]).map(n=>Object.assign({},n,{k:KIND(n)}))}
  catch(e){items=(S.data.notis||[]).map(n=>Object.assign({},n,{k:KIND(n)}));if(tab!=='전체')items=items.filter(n=>n.k===tab)}
  const unread=items.filter(n=>!n.read).length;
  v.innerHTML=`${back('#/')}<div class="title rqnh"><div><h1>알림함</h1><p>요청 진행, 결재, 공지가 여기 모여요. Slack 알림을 누르면 이곳으로 와요.</p></div>${unread?`<button class="pill sm line" id="rqall">모두 읽음</button>`:''}</div>
   <div class="rqtabs">${tabs.map(t=>{const c=UC?UC[TK[t]]:0;return `<a class="${t===tab?'on':''}" href="#/notis/${t==='전체'?'':t}">${t}${c?`<i class="tc">${c}</i>`:''}</a>`}).join('')}</div>
   <div class="rqn">${items.length?items.map(n=>`<a class="rqni ${n.read?'':'un'}" href="${esc(n.link||'#/')}" data-id="${esc(n.id)}"><span class="kd k-${esc(n.k)}">${esc(n.k==='기타'?'알림':n.k)}</span><div class="m"><div class="t1">${esc(n.title)}</div>${n.body?`<div class="t2">${esc(n.body)}</div>`:''}<div class="t3">${esc(ds(n.at))}</div></div>${n.read?'':'<i class="ud"></i>'}</a>`).join(''):`<div class="empty" style="padding:48px var(--pad)">${tab==='전체'?'새 알림이 없어요':tab+' 알림이 없어요'}</div>`}</div>`;
  v.querySelectorAll('.rqni').forEach(a=>a.onclick=()=>{const id=a.dataset.id,n=(S.data.notis||[]).find(x=>x.id===id);if(n)n.read=true;
    if(a.classList.contains('un'))apiRaw('notis.readOne',{id}).catch(()=>{}).finally(()=>refresh&&refresh())});
  const all=$('#rqall');if(all)all.onclick=async()=>{busy(all,true);try{await api('notis.read');(S.data.notis||[]).forEach(x=>x.read=true);shell(true);ROUTES.notis(v,tab)}catch(e){busy(all,false);toast(e.message)}};
};
/* ── 홈: 요청하기 카드 + 진행 중 칩 / 하단 '신청' → '요청' ── */
const QI={nt:'<path d="M4 10v4h3l6 4V6L7 10z"/><path d="M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"/>',ex:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14.5h2"/>',sc:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8 14h3v3H8z"/>'};
const qico=k=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${QI[k]}</svg>`;
function quickRow(v){const d=S.data,x=d.x||{},me=d.me;const hc=v.querySelector('.hcards');if(!hc||hc.querySelector('.rqquick'))return;
  const get=c=>hc.querySelector('.hcard.'+c), nt=get('nt'), ex=get('ex'), sc=get('sc');
  const ns=(x.shifts||[])[0], nots=x.notices||[], req=x.unreadRequired||0, unread=nots.filter(n=>n.read===false).length;
  const ntS=req?`필독 ${req}건 확인`:(nots[0]?esc(nots[0].title):'새 공지 없음'), ntB=req?`<em class="bd y">${req}</em>`:(unread?`<em class="bd">${unread}</em>`:'');
  const scS=ns?`${typeof shiftK==='function'?shiftK(ns.date):ns.date} ${esc(ns.start)}`:'다음 근무 없음';
  const tile=(k,href,label,st,badge)=>`<a class="qk qk-${k}" href="${esc(href)}">${badge||''}<span class="qi">${qico(k)}</span><b>${label}</b><small>${st}</small></a>`;
  const html=`<div class="rqql">바로가기</div><div class="rqquick">${tile('nt',nt?nt.getAttribute('href'):'#/notice','공지사항',ntS,ntB)}${tile('ex',ex?ex.getAttribute('href'):(typeof EXP_URL!=='undefined'?EXP_URL:'#/exp/new'),'개인경비','1분이면 끝','')}${tile('sc',sc?sc.getAttribute('href'):'#/schedule','내 근무표',scS,'')}</div>`;
  [nt,ex,sc].forEach(e=>e&&e.remove());
  const rq=hc.querySelector('.rqhome');rq?rq.insertAdjacentHTML('afterend',html):hc.insertAdjacentHTML('afterbegin',html)}
const _home=ROUTES[''];
ROUTES['']=function(v,a){const r=_home.apply(this,arguments);Promise.resolve(r).then(()=>{if(!v.querySelector('.rqhome')){
  const html=`<a class="rqhome" href="#/request"><div>${dots}<b>요청하기</b><span>수리 · 고객 환불 · 서류 · 앱 오류까지 한곳에서</span><em id="rqchip" class="${R.open?'':'z'}">${R.open?`내 요청 진행 중 ${R.open}`:'번호로 끝까지 챙겨요'}</em></div><i class="arr">${I('plus',24)}</i></a>`;
  const hc=v.querySelector('.hcards');if(hc)hc.insertAdjacentHTML('afterbegin',html);else{const pb=v.querySelector('#punchBlk');pb?pb.insertAdjacentHTML('afterend',`<div class="hcards">${html}</div>`):v.insertAdjacentHTML('afterbegin',html)}}
  quickRow(v);
  apiRaw('req.mine',{status:'open'}).then(j=>{R.open=(j.counts&&j.counts.open!=null)?j.counts.open:(j.items||[]).length;const c=$('#rqchip');if(c){c.textContent=R.open?`내 요청 진행 중 ${R.open}`:'번호로 끝까지 챙겨요';c.classList.toggle('z',!R.open);if(R.open)c.onclick=e=>{e.preventDefault();location.hash='#/myreq'}}}).catch(()=>{})});return r};
const _shell=shell;shell=function(){const r=_shell.apply(this,arguments);const p=document.querySelector('.nav a.plus');if(p){p.setAttribute('href','#/request');p.dataset.r='request';p.lastChild&&p.lastChild.nodeType===3&&(p.lastChild.textContent='요청')}return r};
const _mark=markNav;markNav=function(){_mark();const k=location.hash.replace(/^#\/?/,'').split('/')[0];if(['request','ticket','myreq','apply','new','req','sup','exp','incident'].includes(k))document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.r==='request'))};
})();
/* 화면에 '본사' 대신 '서포트센터' (API 데이터 포함, 2026-11-14 코치님). 입력값·전송값은 그대로 */
(function(){const RE=/본사/g, SKIP=/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/;
  const fixT=n=>{if(n.nodeValue&&n.nodeValue.indexOf('본사')>=0&&!(n.parentNode&&SKIP.test(n.parentNode.nodeName)))n.nodeValue=n.nodeValue.replace(RE,'서포트센터')};
  const fix=n=>{if(n.nodeType===3)return fixT(n);if(n.nodeType!==1||SKIP.test(n.nodeName))return;
    const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);let t;while((t=w.nextNode()))fixT(t);
    [n,...n.querySelectorAll('[placeholder*="본사"],[title*="본사"],[aria-label*="본사"]')].forEach(e=>['placeholder','title','aria-label'].forEach(k=>{const val=e.getAttribute&&e.getAttribute(k);if(val&&val.indexOf('본사')>=0)e.setAttribute(k,val.replace(RE,'서포트센터'))}))};
  const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')fixT(m.target);else m.addedNodes.forEach(fix)}});
  const go=()=>{fix(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true})};
  document.body?go():document.addEventListener('DOMContentLoaded',go);
  const _t=window.toast;if(typeof _t==='function')window.toast=function(m,ms){return _t(String(m).replace(RE,'서포트센터'),ms)};
})();


/* ── 확인 요청 (2026-11-14, 코치님): #/confirm/<id> 질문 + 버튼. 누르면 서버(API v47 CONFIRM_KINDS)가 정해 둔 동작을 실행. 화면은 모든 종류 공용 ── */
ROUTES.confirm=async function(v,id){
  v.innerHTML=`${back('#/notis','알림')}<div class="title"><h1>확인 요청</h1><p>버튼을 누르면 앱이 알아서 바꿔요.</p></div><div id="cfb">${loading()}</div>`;
  let it;try{it=(await api('confirm.get',{id})).item}catch(e){$('#cfb').innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  if(location.hash!=='#/confirm/'+id)return;
  const box=$('#cfb');
  const draw=()=>{
    box.innerHTML=`<div class="form"><p style="font-size:16.5px;line-height:1.65;font-weight:600">${esc(it.q)}</p></div>`+(it.status==='대기'
      ?`<div class="btnrow" id="cfbtn">${it.choices.map((c,i)=>`<button class="pill ${i?'line':'wine'}" data-k="${esc(c[0])}">${esc(c[1])}</button>`).join('')}</div><p class="note" style="padding:0 var(--pad)">한 번 누르면 바로 반영돼요.</p>`
      :`<div class="form"><div class="policy" style="margin-top:4px"><b>${esc(it.answer||'')}</b> · ${esc(String(it.answeredAt||'').slice(5,16))}<br>${esc(it.result||'')}</div></div>`);
    box.querySelectorAll('[data-k]').forEach(b=>b.onclick=async()=>{
      box.querySelectorAll('[data-k]').forEach(x=>x.disabled=true);busy(b,true,'바꾸는 중…');
      try{it=(await api('confirm.answer',{id,choice:b.dataset.k})).item;toast('반영했어요');draw()}catch(e){toast(e.message);busy(b,false);box.querySelectorAll('[data-k]').forEach(x=>x.disabled=false)}
    });
  };
  draw();
};
