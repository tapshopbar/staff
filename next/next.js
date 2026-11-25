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
   <li>11/1 결제분부터 개인경비 청구로 받아요. 10월까지 쓴 비용은 기존 개인지출 시트로 서포트센터에 내 주세요.</li>
   <li>개인카드로 결제해도 되는 곳: 쿠팡 · 네이버 · 소금집. 결제 전에 수쉐프방에 거래처 · 금액을 먼저 올려 주세요.</li>
   <li>한 번에 10만원 미만으로 나눠 결제해 주세요.</li>
   <li>마감 · 업무 이동 택시비는 1회 3만원까지예요 (카카오T 이용내역 캡처 첨부).</li>
   <li>CJ프레시웨이 · 커피 리브레 · 미트프렌즈 · 닭리닭매 · 에디션덴마크는 서포트센터가 계좌이체로 결제해요. 개인카드로 결제하지 말고 서포트센터에 발주 요청해 주세요.</li></ul>
  <h3>휴가</h3><ul><li>연차 · 휴가는 점장 승인으로 확정돼요. 점장님이 없는 경우와 점장님 본인은 서포트센터가 승인해요.</li><li>확정된 휴가 날짜를 바꾸려면 내 신청에서 [날짜 바꾸기]를 눌러 주세요. 새 날짜가 승인되면 원래 신청은 자동으로 취소돼요.</li></ul>
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
    el.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!await ask('이 질문을 취소할까요?'))return;try{await api('ask.delete',{id:b.dataset.del});toast('취소했어요');ROUTES.ask(v)}catch(x){toast(x.message)}});
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
async function askLogout(){if(await ask('로그아웃할까요? 다음에 다시 로그인해야 해요.')){S.hist=['#/'];if(location.hash&&location.hash!=='#/')history.replaceState(null,'',location.pathname);logout()}}
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
   <div class="wtop"><img src="${LOGO}" alt="TAP SHOP BAR"><span class="new">CREW</span></div>
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
function betaInfo(){openSheet(`<h2>지금은 베타 버전이에요</h2><div style="font-size:15px;line-height:1.75;font-weight:500;margin-top:10px;word-break:keep-all">매장에서 쓰면서 매주 고치고 있어요. 지금이 <b>12번째 업데이트(BETA 0.12)</b>예요.<br><b>12월 25일까지</b> 의견을 받고 베타를 마쳐요. 그리고 <b>2027년 1월, 정식 버전 1.0</b>으로 시작해요.<br><br>아주 작은 것도 좋아요. 고칠 것, 있으면 좋겠는 것, 좋았던 것까지 알려 주세요. 서포트센터가 전부 읽어요.</div><a class="pill wine full" href="#/feedback" data-close style="margin-top:18px">의견 보내기</a><p class="note" style="margin-top:12px;text-align:center">TSB CREW ${APP_V}</p>`)}
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
 '근무복':{d:'신규 입사, 교체(낡음·사이즈 변경), 분실 때 신청해요.',f:[['it','품목','예) 앞치마, 셔츠, 조리복'],['sz','사이즈 (필수)','예) M / 95 · 앞치마처럼 사이즈 없으면 프리'],['qt','수량','예) 1'],['why','사유','신규 / 교체 / 분실']]},
 '건강검진':{d:'국가건강검진을 받았다면 완료 날짜만 알려 주세요. 회사는 검진 결과를 받지 않아요. 결과지는 올리지 마세요.',f:[['dt','검진 받은 날','예) 2026-11-08',1],['org','검진 기관 (선택)','예) OO병원'],['kind','종류','일반 / 특수 / 기타']]}
};
ROUTES.sup=function(v,type){
  const t=SUP[type]?type:'명함', c=SUP[t];
  v.innerHTML=`${back('#/apply','신청')}<div class="title"><span class="new">${t==='건강검진'?'기록':'NEW'}</span><h1 style="margin-top:10px">${t==='건강검진'?'건강검진 완료 등록':t+' 신청'}</h1><p>${esc(c.d)}</p>${t!=='건강검진'?`<div class="supnote">${SUP_NOTE}<br>점장님이 먼저 확인하고, 서포트센터가 승인해서 알려 드려요.</div>`:''}</div>
   <div class="form">${c.f.map(([k,l,ph,dt])=>`<label class="f">${esc(l)}</label><input class="in" id="sf_${k}" ${dt?'type="date"':''} placeholder="${esc(ph)}">`).join('')}
   <label class="f">메모 <em>(선택)</em></label><textarea class="in" id="sf_memo" placeholder="더 알려 줄 것이 있으면 적어 주세요"></textarea></div>
   <div class="btnrow"><button class="pill wine" id="sb">${t==='건강검진'?'완료 등록하기':'신청하기'}</button></div>`;
  $('#sb').onclick=async()=>{
    const vals=c.f.map(([k,l])=>[l,($('#sf_'+k).value||'').trim()]);
    if(t==='건강검진'&&!vals[0][1])return toast('검진 받은 날을 골라 주세요');
    if(t==='근무복'&&!vals[0][1])return toast('품목을 적어 주세요');
    if(t==='근무복'&&!vals[1][1])return toast('사이즈를 적어 주세요. 사이즈가 없는 품목은 프리라고 적어 주세요');
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
     ${l.vid?`<div class="sec"><h2>영상으로 한 번 더</h2></div><div class="lrn-vid"><iframe referrerpolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/${esc(l.vid)}?rel=0" title="영상" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div><p class="note" style="padding:6px var(--pad) 0">외부 유튜브 영상이에요. 안 나오면 <a class="u" href="https://youtu.be/${esc(l.vid)}" target="_blank" rel="noopener">유튜브에서 보기</a></p>`:''}
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
  const text='탭샵바 매장 이야기에 같이 보고 싶은 글이 있어요. CREW 앱에서 열어 보세요.';
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
  v.querySelectorAll('.crph img').forEach(img=>img.onclick=()=>img.src&&openSheet(`<img src="${img.src}" alt="사진 크게 보기" style="width:100%;border-radius:12px">`));
  v.querySelectorAll('[data-cheer]').forEach(b=>b.onclick=async()=>{const id=b.closest('.crp').dataset.id;b.disabled=true;
    const em=b.querySelector('em'),was=b.classList.contains('on'),n=Number(em.textContent)||0;b.classList.toggle('on',!was);em.textContent=(n+(was?-1:1))||''; // 먼저 화면에 반영, 서버 응답으로 맞춤
    try{const r=await apiRaw('crew.cheer',{id});b.classList.toggle('on',r.cheered);em.textContent=r.cheers||'';S.mem={};memSave()}catch(e){b.classList.toggle('on',was);em.textContent=n||'';toast(e.message)}b.disabled=false});
  v.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!await ask('이 글을 지울까요?'))return;const id=b.closest('.crp').dataset.id;
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
    shots=await Promise.all(fs.map(f=>fileToDataUrl(f,1280,.78)));$('#cpv').className='crph n'+shots.length;$('#cpv').innerHTML=shots.map(s=>`<img class="on" src="${s}" alt="올릴 사진">`).join('')};
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
   <p class="note" style="padding:18px var(--pad) 0">결재 순서: 홀 직원 → 점장 · 주방 직원(Hybrid는 소속 기준) → 수쉐프 → 점장 · 수쉐프 → 점장 · 점장 본인은 결재 없이 서포트센터에 알림. 12시간 답이 없으면 다시 알리고, 24시간이면 다음 사람에게 넘어가요.</p><p class="note" style="padding:8px var(--pad) 40px">같은 사람이 같은 시간에 두 곳에 들어가지 않게 막아요. 다른 지점 근무·진행 중인 지원·휴가와 겹치거나 주 52시간을 넘으면 신청이 안 돼요.</p>`;
  const R=id=>j.items.find(x=>x.id===id)||(j.todo.find(t=>t.req.id===id)||{}).req;
  v.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>applySheet(R(b.dataset.go),null,v));
  v.querySelectorAll('[data-send]').forEach(b=>b.onclick=()=>sendSheet(R(b.dataset.send),j,v));
  v.querySelectorAll('[data-cx]').forEach(b=>b.onclick=async()=>{if(!await ask('이 지원 요청을 취소할까요?\n확정된 사람도 근무표에서 빠지고 알림이 가요.'))return;busy(b,true);try{await api('help.cancel',{id:b.dataset.cx});toast('취소했어요');ROUTES.help(v)}catch(e){toast(e.message);busy(b,false)}});
  v.querySelectorAll('[data-wd]').forEach(b=>b.onclick=async()=>{const und=b.dataset.u==='1';if(!await ask(und?'확정된 지원을 취소할까요? 근무표에서도 빠져요.':'지원 신청을 철회할까요?'))return;busy(b,true);try{await api('help.withdraw',{appId:b.dataset.wd});toast(und?'취소했어요':'철회했어요');ROUTES.help(v)}catch(e){toast(e.message);busy(b,false)}});
  v.querySelectorAll('[data-hm]').forEach(b=>b.onclick=()=>decide('help.home',b,v));
  v.querySelectorAll('[data-dc]').forEach(b=>b.onclick=()=>decide('help.decide',b,v));
};
async function decide(action,b,v){const ok=b.dataset.ok==='1';let memo='';if(!ok){memo=(await askText('한 줄 사유 (선택)',''))||'';}
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
  if(!j.canCreate.length){v.innerHTML=`${back('#/help','지원 요청')}<div class="title"><h1>지원 요청 올리기</h1><p>요청은 점장님·서포트센터가 올려요. 점장님께 말씀해 주세요.</p></div>`;return}
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
  v.querySelector('#go').onclick=async e=>{const ct=e.currentTarget;
    if(lines.some(l=>!l.date))return toast('날짜를 넣어 주세요');
    const br=v.querySelector('#br')?v.querySelector('#br').value:j.canCreate[0];
    const sum=lines.map(l=>`${md(l.date)}(${WD[pd(l.date).getDay()]}) ${l.start}–${l.end} ${l.part==='상관없음'?'홀·주방':l.part} ${l.count}명`).join('\n');
    if(!await ask(`${BRS(br)} 지원 요청을 올릴까요?\n\n${sum}\n\n다른 지점 직원과 점장님께 알림이 가요.`))return;
    busy(ct,true);
    try{const r=await api('help.create',{branch:br,lines,reason:v.querySelector('#rs').value.trim(),body:v.querySelector('#bd').value.trim()});toast(`올렸어요. ${r.notified}명에게 알림이 갔어요`,3200);location.hash='#/help'}catch(er){toast(er.message);busy(ct,false)}};
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
    ['#/sup/명함','명함 신청','점장 확인 → 서포트센터 승인','명함'],
    ['#/sup/근무복','근무복 신청','점장 확인 → 서포트센터 승인','근무복 유니폼 옷 앞치마'],
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
  {key:'it',icon:'wifi',title:'POS · 기기 · 앱 오류',desc:'포스 · 와이파이 · 프린터 · CREW 앱',examples:['[청계] 2번 포스 결제 오류'],mode:'ticket',team:'IT팀',fields:[T('what','어떤 오류인가요','textarea','화면에 뜬 문구 그대로 적어 주세요',{req:1}),T('since','언제부터','text'),P()]}]},
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
  {key:'bcard',icon:'card',title:'명함 신청',desc:'점장 확인 → 서포트센터 승인',mode:'link',link:'#/sup/명함'},
  {key:'uniform',icon:'shirt',title:'근무복 신청',desc:'점장 확인 → 서포트센터 승인',mode:'link',link:'#/sup/근무복'},
  {key:'checkup',icon:'heart',title:'건강검진 완료 등록',desc:'날짜만 기록해요',mode:'link',link:'#/sup/건강검진'}]},
 {key:'money',title:'돈',items:[
  {key:'expense',icon:'receipt',title:'개인경비 청구',desc:'영수증 찍고 1분이면 끝',mode:'link',link:'#/exp/new'},
  {key:'settle',icon:'won',title:'결제 · 정산 문의',desc:'정산 금액 · 이체 확인',mode:'ticket',team:'재무팀',fields:[T('what','무엇이 궁금한가요','textarea','',{req:1}),T('amount','금액','money')]}]},
 {key:'voice',title:'의견',items:[
  {key:'idea',icon:'bulb',title:'앱 개선 아이디어',desc:'CREW 앱을 더 편하게',examples:['근무표에서 다음 주 바로 보기'],mode:'ticket',team:'IT팀',fields:[T('what','무엇을 바꾸면 좋을까요','textarea','',{req:1}),P()]},
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
  const MG=/(?:박한울|한울)\s?매니저(님)?(에게|께서|께|이|가|을|를|은|는|과|와|의)?/g;const mgr=(m,nim,p)=>'서포트센터'+({'에게':'에','께':'에','께서':'에서','이':'가','가':'가','을':'를','를':'를','은':'는','는':'는','과':'와','와':'와','의':'의'}[p]||'');const noMg=()=>/^#\/(kudos|admin)/.test(location.hash);const fixT=n=>{const v=n.nodeValue;if(!v||(n.parentNode&&SKIP.test(n.parentNode.nodeName)))return;let o=v;if(o.indexOf('본사')>=0)o=o.replace(RE,'서포트센터');if(o.indexOf('매니저')>=0&&!noMg())o=o.replace(MG,mgr);if(/분도/.test(o)&&!noMg())o=o.replace(/(?:장분도|분도)\s?(?:이사|팀장)(님)?(에게|께서|께|이|가|을|를|은|는|과|와|의)?/g,(m,n,p)=>mgr(m,n,p));if(o.indexOf('서포트센터')>=0&&!noMg())o=o.replace(/서포트센터(\s?(?:매니저|팀장))?(님)?(에게|께서|께|이|가|을|를|은|는|과|와|의)?/g,(m,r,n,p)=>(!r&&!n)?m:mgr(m,n,p));if(o!==v)n.nodeValue=o};
  const fix=n=>{if(n.nodeType===3)return fixT(n);if(n.nodeType!==1||SKIP.test(n.nodeName))return;
    const w=document.createTreeWalker(n,NodeFilter.SHOW_TEXT);let t;while((t=w.nextNode()))fixT(t);
    [n,...n.querySelectorAll('[placeholder*="본사"],[title*="본사"],[aria-label*="본사"]')].forEach(e=>['placeholder','title','aria-label'].forEach(k=>{const val=e.getAttribute&&e.getAttribute(k);if(val&&val.indexOf('본사')>=0)e.setAttribute(k,val.replace(RE,'서포트센터'))}))};
  const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')fixT(m.target);else m.addedNodes.forEach(fix)}});
  const go=()=>{fix(document.body);mo.observe(document.body,{childList:true,subtree:true,characterData:true})};
  document.body?go():document.addEventListener('DOMContentLoaded',go);
  const _t=window.toast;if(typeof _t==='function')window.toast=function(m,ms){return _t(String(m).replace(RE,'서포트센터').replace(MG,mgr),ms)};
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

;/* ═══ 합침 11/25: order.js (원래 https://tapshopbar.github.io/staff/order.js) · 한 파일이 깨져도 나머지는 돌게 try ═══ */
try{
/* ═══ CREW 발주 탭 · BETA 서버 연결 (2026-11-18, TOM) · 처음 2026-11-16 연습 모드
 * - 11/18 밤: 크루 제출 → '점장확인' → 점장(매니저 이상)이 '크루 발주 확인' 카드에서 수량 고쳐 승인(order.approve) / 돌려보내기(order.reject, 사유 필수). 크루는 반려 사유 보고 '다시 담기'.
 * - 담는 중엔 이 기기 localStorage에 자동 저장. 제출 = People API order.submit(reqId 멱등) · 낸 발주 = order.mine · 취소 = order.cancel · 입고 = order.receive(+거래명세표 사진/엑셀/PDF).
 * - 공개 저장소라 금액 데이터(단가 · 판매가 · 마진)는 파일에 없음. 가격은 order.catalog 응답(v2 사용자만)에서 받아 메모리에만 둠.
 * - 아래 메뉴: 홈 · 스케줄 · ＋요청 · 발주 · 결재 (더보기는 헤더 ☰ 로 이동)
 * - 되돌리기: Downloads/In Process/TSB_발주시스템_1114/rollback_20261118_server 의 index.html · order.js · order.css 다시 올리기
 */
(function(){
const OD={"items":[["F001","f","꿈목장 치즈커드 1kg (냉동)","1KG","kg","S15",{"cg":1,"mg":1},[],"134"],["F002","f","폴스 휘핑크림 1L (35%)","1LT × 12EA/박스","ea","S15",{},[],"134"],["F003","f","차차 떡볶이 시즈닝 2kg","2KG × 10EA/박스","봉","S15",{},[],"134"],["F004","f","그라나롤로 그라나파다노 1kg 블럭","1KG × 10EA/박스","kg","S15",{},[],"134"],["F005","f","안티카 파르미지아노 레지아노 블럭 1kg","1KG × 5EA/박스","kg","S15",{},[],"134"],["F006","f","라비아노 올리브 오일(포마스) 5L","5LT","ea","S15",{},[],"134"],["F007","f","코스타도로 엑스트라버진 오일 5L","5L × 4EA/박스","ea","S15",{},[],"134"],["F008","f","셀렉티아 화이트 트러플 오일 250ml","250ML × 12EA/박스","ea","S15",{},[],"134"],["F009","f","캠포프리오 하몽 세라노 슬라이스 80g (면세)","80G × 10EA/박스","ea","S15",{},[],"134"],["F010","f","앵커 무염버터 454g (냉동)","454G × 20EA/박스","ea","S15",{},[],"134"],["F011","f","코시마르 엔초비 필레띠 700g","700G × 6EA/박스","ea","S15",{},[],"134"],["F012","f","디벨라 링귀니 500g","500G × 24EA/박스","ea","S15",{},[],"134"],["F013","f","데체코 파케리 500g","500G × 12EA/박스","ea","S15",{},[],"134"],["F014","f","롱고발디 토마토홀 2.5kg","2.5KG × 6EA/박스","ea","S15",{},[],"134"],["F015","f","램노스 메론망고 과일치즈 125g","125G × 12EA/박스","ea","S15",{"cg":2,"mg":1,"dd":1},[],"134"],["F016","f","피카치 카스텔베트라노 올리브 260g","260G × 12EA/박스","ea","S15",{"cg":1,"mg":1,"dd":1},[],"134"],["F017","f","퀼리 올리브 브래드스틱 50g","50G × 22EA/박스","ea","S15",{"cg":1,"mg":1,"dd":1},[],"134"],["F018","f","치즈 팝 고다 65g","65G × 12EA/박스","ea","S15",{},[],"134"],["F019","f","초야 요와나이 유즈슈(유자) 350ml","350ML × 24EA/박스","ea","S15",{},[],"134"],["F020","f","앵커 크림치즈 1kg (냉장)","1kg × 12EA/박스","kg","S15",{},[],"134"],["F021","f","필라델피아 크림치즈 2kg (호주산, 냉장)","2kg × 8EA/박스","ea","S15",{},[],"134"],["F023","f","[올리멜] 작업항정 캐나다 (항정살)","1박스 최대 12kg","box","S04",{"cg":1,"sa":1,"mg":1,"dd":1},[],"1234"],["F024","f","(냉장) 브라질산 닭다리살 정육 1kg (마일드염지)","1kg × 1개, 냉장, 마일드염지(+400 포함)","kg","S07",{},[],"4"],["F025","f","커피 원두 [도매] 버티고 1kg","1kg","kg","S03",{"cg":8,"sa":5,"mg":5},[],"123"],["F026","f","디카페인 원두","1봉 (중량 미확인)","봉","S20",{"mg":5},[],"3"],["F027","f","티백 (30입 1팩)","30입","팩","S08",{},[],"12"],["F028","f","냉동 채끝 등심 스테이크 250g","250g, 냉동, 손질 원육","ea","S12",{},[],"12"],["F030","f","연어 원물 1마리","원물 1마리","마리","S13",{},[],"2"],["F031","f","삼배체 굴 (택배)","5kg (택배비 포함)","박스","S14",{"cg":13,"sa":8,"mg":5},[],"123"],["F032","f","식용유 1통 (에스엠오일)","규격 미확인","통","S16",{},[],"14"],["F033","f","식용유 (제이엘오일)","미확인","통","S17",{},[],"3"],["F034","f","식용유 (에스에이치오일)","미확인","통","S18",{},[],"2"],["F035","s","묵은지 (강동김치, 종이박스 옵션)","standardfood 스마트스토어, 옵션 종이박스","","S05",{"cg":1,"sa":1,"mg":1},[],"123"],["F036","s","그라나 파다노 (jbrmall)","jbrmall.co.kr 상품 24121","","S05",{},[],"2"],["F037","s","달고나 베이스 1kg (milknara)","1kg","봉","S05",{"cg":2,"sa":2},[],"12"],["F038","s","아이스크림콘","미확인","","S05",{},[],"3"],["F039","s","아이스크림 슈가콘 (Npay)","미확인","","S05",{},[],"1234"],["F040","s","와인 배망 (rosekids)","smartstore rosekids 상품","","S05",{},[],"12"],["F041","s","라마르조코 가스켓","커피머신 가스켓","ea","S05",{"cg":3},[],"1"],["F042","f","잠봉 (잠봉뵈르용)","미확인","","S06",{},[],"4"],["F043","s","아이스컵","미확인","","S09",{},[],"13"],["F044","s","무지 냅킨 (8000매)","8000매","box","S10",{},[],"1"],["F045","s","물티슈","미확인","","S10",{},[],"2"],["F046","s","스트로우","미확인","","S21",{},[],"1"],["F047","s","직사각용기(소)","배민상회 상품 692633","","S22",{},[],"2"],["F048","s","아이스크림볼 2p","2p","세트","S23",{"mg":2},[],"3"],["F049","s","SVALKA 와인잔","이케아 40137812","ea","S24",{},[],"1"],["F050","s","도무송 스티커","미확인","","S27",{},[],"1"],["F051","s","인쇄물","미확인","","S26",{},[],"4"],["CJ001","f","이츠웰 깐양파","L_150~200g/개 1Kg/EA","EA","S01",{"cg":6,"sa":4,"mg":3,"dd":4},[],"1234"],["CJ002","f","깐마늘","외식전용 대_꼭지제거 1Kg/EA","EA","S01",{"cg":2,"sa":2,"mg":1,"dd":1},[],"1234"],["CJ003","f","청양고추","외식전용 상 1Kg/EA","EA","S01",{"cg":2,"sa":1,"mg":1,"dd":1},[],"1234"],["CJ004","f","홍고추","외식전용 상 1Kg/EA","EA","S01",{},[],"1234"],["CJ005","f","레몬","팬시 140과_100g*3개입 300g/EA","EA","S01",{},[],"1234"],["CJ006","f","이츠웰 느타리버섯","상품 다발_친환경 1Kg/BOX","BOX","S01",{},[],"1234"],["CJ007","f","표고버섯","외식전용 CN 300g/EA","EA","S01",{},[],"1234"],["CJ008","f","새송이버섯","외식전용 상 500g/EA","EA","S01",{},[],"1234"],["CJ009","f","와일드루꼴라","외식전용 200g/EA","EA","S01",{},[],"1234"],["CJ010","f","통로메인","KG","KG","S01",{},[],"1234"],["CJ011","f","파슬리","외식전용 500g/EA","EA","S01",{},[],"1234"],["CJ012","f","바질","상품 KG","KG","S01",{},[],"1234"],["CJ013","f","딜","외식전용 포장재포함 10g/EA","EA","S01",{},[],"1234"],["CJ014","f","타임","외식전용 포장재포함 10g/EA","EA","S01",{},[],"1234"],["CJ015","f","냉동알감자","유피 조림용 1Kg/EA","EA","S01",{},[],"1234"],["CJ016","f","대추방울토마토","외식전용 15~25g/개 1Kg/EA","EA","S01",{},[],"1234"],["CJ017","f","토마토","외식전용 완숙_5~7과 1Kg/EA","EA","S01",{},[],"1234"],["CJ018","f","알배기배추","상품 KG","KG","S01",{},[],"1234"],["CJ019","f","소이원 콩나물","찜용 1Kg/EA","EA","S01",{},[],"1234"],["CJ020","f","소이원 콩나물","장채 1Kg/EA","EA","S01",{},[],"1234"],["CJ021","f","사과","230g/EA","EA","S01",{},[],"1234"],["CJ022","f","머스크멜론","외식전용 1.2Kg/EA","EA","S01",{},[],"1234"],["CJ023","f","프레시원 샐러리","상 1Kg/EA","EA","S01",{},[],"1234"],["CJ024","f","미니양배추","외식전용 500g/EA","EA","S01",{},[],"1234"],["CJ025","f","냉동미니양배추","1Kg/EA","EA","S01",{},[],"1234"],["CJ026","f","이츠웰 신선한계란","1등급 조인_무항생제_특란_60g*30입 1.8Kg/EA","EA","S01",{},[],"1234"],["CJ027","f","코다노 후레쉬모짜렐라치즈","슬라이스_55파이_90매내외 1Kg/EA","EA","S01",{},[],"1234"],["CJ028","f","매일유업 흰우유","1L_바리스타 1Kg/EA","EA","S01",{},[],"1234"],["CJ029","f","서울우유 생크림","500ml_동물성 500g/EA","EA","S01",{},[],"1234"],["CJ030","f","건국유업 엄선 생크림","500ml_동물성 500g/EA","EA","S01",{},[],"1234"],["CJ031","f","덴마크 사워크림","970g/EA","EA","S01",{},[],"1234"],["CJ032","f","신라명과 프렌치바게트","미절단_270g*3개입 810g/EA","EA","S01",{},[],"1234"],["CJ033","f","토담 밀떡볶이떡","중 3.7Kg/EA","EA","S01",{},[],"1234"],["CJ034","f","프레시원X사조오양 칼집요리비엔나","1Kg/EA","EA","S01",{},[],"1234"],["CJ035","f","에스 세블락소시지","100g*10ea","EA","S01",{},[],"1234"],["CJ036","f","도야지식품 순대","new옛날찰순대_통 1Kg/EA","EA","S01",{},[],"1234"],["CJ037","f","김장독 묵은지","일반 10Kg/BOX","BOX","S01",{},[],"1234"],["CJ038","f","에쓰푸드 통베이컨","500g/EA","EA","S01",{},[],"1234"],["CJ039","f","닭가슴살","140±10g/덩어리_껍질있음 KG","KG","S01",{},[],"1234"],["CJ040","f","프레시원 소삼겹양지","온라인용 1.6mm두께_대패돌돌말이 짬뽕용 1Kg/EA","EA","S01",{},[],"1234"],["CJ041","f","마니커 버팔로윙","NEW 1Kg/EA","EA","S01",{},[],"1234"],["CJ042","f","아쿠아링크 크리스피통살오징어튀김","25개내외 1Kg/EA","EA","S01",{},[],"1234"],["CJ043","f","글로벌냉동 통살오징어튀김","15g*65±5입 1Kg/EA","EA","S01",{},[],"1234"],["CJ044","f","심플로트 냉동감자","메가크런치 2.04Kg/EA","EA","S01",{},[],"1234"],["CJ045","f","백설 꽃소금","3Kg/EA","EA","S01",{},[],"1234"],["CJ046","f","백설 구운소금","1Kg/EA","EA","S01",{},[],"1234"],["CJ047","f","신영 핑크솔트","고운_히말라야 1.5Kg/EA","EA","S01",{},[],"1234"],["CJ048","f","말돈 꽃소금","250g/EA","EA","S01",{},[],"1234"],["CJ049","f","범아식품 순대소금","3g*200입 600g/EA","EA","S01",{},[],"1234"],["CJ050","f","백설 하얀설탕_FW용","15Kg/EA","EA","S01",{},[],"1234"],["CJ051","f","백설 하얀설탕","3Kg/EA","EA","S01",{},[],"1234"],["CJ052","f","오쉐프 순후추","PET 저장용 450g/EA","EA","S01",{},[],"1234"],["CJ053","f","서원 흑후추","홀_100% 400g/EA","EA","S01",{},[],"1234"],["CJ054","f","스위트웰 레드페퍼","FC용 크러쉬드 340g/EA","EA","S01",{},[],"1234"],["CJ055","f","신영상회 파슬리후레이크","100g/EA","EA","S01",{},[],"1234"],["CJ056","f","두비산업 마늘분말","550g/EA","EA","S01",{},[],"1234"],["CJ057","f","이슬나라 양파분말","450g/EA","EA","S01",{},[],"1234"],["CJ058","f","선인 냉동바질","250g/EA","EA","S01",{},[],"1234"],["CJ059","f","이금기 치킨파우더","1Kg/EA","EA","S01",{},[],"1234"],["CJ060","f","백설 다시다","골드 쇠고기 식당용 1Kg/EA","EA","S01",{},[],"1234"],["CJ061","f","건다시마","굿픽_실속 1Kg/EA","EA","S01",{},[],"1234"],["CJ062","f","선일물산 전장김","돌김 20g/EA","EA","S01",{},[],"1234"],["CJ063","f","해농 김가루","고명용 100g/EA","EA","S01",{},[],"1234"],["CJ064","f","이츠웰 볶음참깨","1Kg/EA","EA","S01",{},[],"1234"],["CJ065","f","오뚜기 옛날참기름","450ml 412g/EA","EA","S01",{},[],"1234"],["CJ066","f","롯데웰푸드 도리토스","나쵸치즈 84g/EA","EA","S01",{},[],"1234"],["CJ067","f","오뚜기 케찹","스파우트팩 3.3Kg/EA","EA","S01",{},[],"1234"],["CJ068","f","오뚜기 마요네즈","골드 스파우트팩 3.2Kg/EA","EA","S01",{},[],"1234"],["CJ069","f","몽고장유 진간장","13L_부천몽고 13Kg/EA","EA","S01",{},[],"1234"],["CJ070","f","몽고장유 진간장","1.8L 1.8Kg/EA","EA","S01",{},[],"1234"],["CJ071","f","야마사 일식간장","고이구찌_진간장_1.8L 1.8Kg/EA","EA","S01",{},[],"1234"],["CJ072","f","해찬들 새콤달콤초고추장","2.3Kg/EA","EA","S01",{},[],"1234"],["CJ073","f","아진 초고추장","1Kg/EA","EA","S01",{},[],"1234"],["CJ074","f","오뚜기 타바스코소스","350g/EA","EA","S01",{},[],"1234"],["CJ075","f","골드크라운 레몬주스","946ml 946g/EA","EA","S01",{},[],"1234"],["CJ076","f","르네 홀그레인머스타드","820g/EA","EA","S01",{},[],"1234"],["CJ077","f","주비푸드 홀스래디쉬","NEW 1Kg/EA","EA","S01",{},[],"1234"],["CJ078","f","삼광999 생와사비","750g/EA","EA","S01",{},[],"1234"],["CJ079","f","티파로스 멸치액젓","700g/EA","EA","S01",{},[],"1234"],["CJ080","f","수리 팟타이소스","5Kg/EA","EA","S01",{},[],"1234"],["CJ081","f","해천 굴소스","시그니처_스파우트 2.2Kg/EA","EA","S01",{},[],"1234"],["CJ082","f","폰티 발사믹글레이즈","500ml 500g/EA","EA","S01",{},[],"1234"],["CJ083","f","치악산 사양꿀","1Kg/EA","EA","S01",{},[],"1234"],["CJ084","f","오뚜기 현미식초","18L 18Kg/EA","EA","S01",{},[],"1234"],["CJ085","f","이츠웰 바베큐소스","PET_리뉴얼 2Kg/EA","EA","S01",{},[],"1234"],["CJ086","f","임가네 고춧가루","고운것_중국100% 1Kg/EA","EA","S01",{},[],"1234"],["CJ087","f","신영에프에스 피클링스파이스","NEW 1Kg/EA","EA","S01",{},[],"1234"],["CJ088","f","한솔 호두","분태 1Kg/EA","EA","S01",{},[],"1234"],["CJ089","f","비엔지 아몬드가루","1Kg/EA","EA","S01",{},[],"1234"],["CJ090","f","건무화과","반건조 2Kg/EA","EA","S01",{},[],"1234"],["CJ091","f","글로벌냉동 냉동블루베리","1Kg/EA","EA","S01",{},[],"1234"],["CJ092","f","농심 올리브짜파게티","봉지 140g/EA","EA","S01",{},[],"1234"],["CJ093","f","델리시아스 케이퍼","950g/EA","EA","S01",{},[],"1234"],["CJ094","f","리치스 올리브","블랙_슬라이스 3Kg/EA","EA","S01",{},[],"1234"],["CJ095","f","엄선 냉동굴","굿픽_깐것_수율90% 1Kg/EA","EA","S01",{},[],"1234"],["CJ096","f","수협어기여찬 흰다리새우","통새우_40미 찜/구이용 1Kg/EA","EA","S01",{},[],"1234"],["CJ097","f","엄선 피홍합","굿픽_자숙 1Kg/EA","EA","S01",{},[],"1234"],["CJ098","f","Sanford 그린홍합","M_하프셸 800g/PAC","PAC","S01",{},[],"1234"],["CJ099","f","선화미인 쌀","신동진 10Kg/EA","EA","S01",{},[],"1234"],["CJ100","f","삼도식품 산고추","4Kg/EA","EA","S01",{},[],"1234"],["CJ101","f","경천식품 김밥김","100매 200g/EA","EA","S01",{},[],"1234"],["CJ102","f","일미 백색단무지","김밥용 2.8Kg/EA","EA","S01",{},[],"1234"],["CJ103","f","유탕처리새우튀김","반조리_30g*10입 300g/EA","EA","S01",{},[],"1234"],["CJ104","f","코다노 스리라차마요소스","2Kg/EA","EA","S01",{},[],"1234"],["CJ105","f","레몬","외식전용 100g*1개입 100g/EA","EA","S01",{},[],"1234"],["CJ106","f","이엔푸드 초밥소스","1.8L 1.8Kg/EA","EA","S01",{},[],"1234"],["CJ107","f","파머스 계란지단","초밥용 1Kg/EA","EA","S01",{},[],"1234"],["CJ108","s","프레시원 식기세척기세제","NEW_18L EA","EA","S01",{"sa":3,"mg":3,"dd":1},[],"1234"],["CJ109","s","프레시원 식기세척기린스","NEW_18L EA","EA","S01",{"dd":2},[],"1234"],["CJ110","s","리오 스케일제거제","20kg EA","EA","S01",{"dd":3},[],"1234"],["CJ111","s","프레시원 오븐크리너","NEW_18L EA","EA","S01",{},[],"1234"],["CJ112","s","유한양행 락스","레귤러_15kg 식품용 EA","EA","S01",{},[],"1234"],["CJ113","s","유한양행 락스","레귤러_2L 식품용 EA","EA","S01",{},[],"1234"],["CJ114","s","바이오크린콜 소독제","20L_75% EA","EA","S01",{},[],"1234"],["CJ115","s","진로발효 분무기","450ml 크린콜용 EA","EA","S01",{},[],"1234"],["CJ116","s","하이퐁 주방세제","11.8L_12kg EA","EA","S01",{},[],"1234"],["CJ117","s","무균무때 세정제","500ml 주방용 EA","EA","S01",{},[],"1234"],["CJ118","s","무궁화 세탁세제","파워넘버원_800g EA","EA","S01",{},[],"1234"],["CJ119","s","아이깨끗해 손세정제","거품형_레몬향_250ml EA","EA","S01",{},[],"1234"],["CJ120","s","크린업 스폰지수세미","15*9*3cm_2입 EA","EA","S01",{},[],"1234"],["CJ121","s","크린업 철수세미","30g*2입 EA","EA","S01",{},[],"1234"],["CJ122","s","행주","흰색_30*45cm EA","EA","S01",{},[],"1234"],["CJ123","s","행주","면_흰색_소_28*28cm_10입 EA","EA","S01",{},[],"1234"],["CJ124","s","LG생활건강 한입베이킹소다","100%천연_1kg 청소용 EA","EA","S01",{},[],"1234"],["CJ125","s","파트너 핸드타올A","100매*50입_5000매 BOX","BOX","S01",{},[],"1234"],["CJ126","s","프레시원 해동지","NEW_2겹_400*365mm_100매 EA","EA","S01",{},[],"1234"],["CJ127","s","그린스타 종이호일","30cm*20m EA","EA","S01",{},[],"1234"],["CJ128","s","대교 쿠킹호일","15㎛_30cm_30호 EA","EA","S01",{},[],"1234"],["CJ129","s","크린랲 지퍼백","25*30_20입 EA","EA","S01",{},[],"1234"],["CJ130","s","이츠웰 위생백","소_17*25cm_100입 EA","EA","S01",{},[],"1234"],["CJ131","s","이츠웰 롤백","미니_17*25cm_200입 EA","EA","S01",{},[],"1234"],["CJ132","s","이츠웰 롤백","특대_36*50cm_500입 EA","EA","S01",{},[],"1234"],["CJ133","s","크린엎 위생장갑","실속_200매입 EA","EA","S01",{},[],"1234"],["CJ134","s","에코프랜드 쓰레기봉투","검정색_120L_90*110cm_50매 EA","EA","S01",{},[],"1234"],["CJ135","s","대일 진공팩필름","16*25cm_100매 EA","EA","S01",{},[],"1234"],["CJ136","s","대일 진공팩필름","20*30cm_100매 EA","EA","S01",{},[],"1234"],["CJ137","s","대일 진공팩필름","28*38cm_100매 EA","EA","S01",{},[],"1234"],["CJ138","s","크린손 니트릴장갑","외식전용 검정색_소_100입 EA","EA","S01",{},[],"1234"],["CJ139","s","크린손 니트릴장갑","외식전용 검정색_중_100입 EA","EA","S01",{},[],"1234"],["CJ140","s","크린손 니트릴장갑","외식전용 검정색_대_100입 EA","EA","S01",{},[],"1234"],["CJ141","s","마미손 고무장갑","분홍색_중M EA","EA","S01",{},[],"1234"],["CJ142","s","마미손 고무장갑","분홍색_대L EA","EA","S01",{},[],"1234"],["CJ143","s","마미손 고무장갑","분홍색_특대XL EA","EA","S01",{},[],"1234"],["CJ144","s","이츠랩 랩","NEW_1호_30cm*500m EA","EA","S01",{},[],"1234"],["CJ145","s","이츠랩 랩","NEW_1호_30cm*500m EA","EA","S01",{},[],"1234"],["CJ146","s","이츠랩 랩","3호_40cm*500m EA","EA","S01",{},[],"1234"],["CJ147","s","면장갑","아주두꺼움_10입 EA","EA","S01",{},[],"1234"],["CJ148","f","소프트 아이스크림믹스","NEW_프레쉬 1Kg/EA","EA","S01",{},[],"1234"],["CJ149","f","백설 롱슈가","1000입_5g*100개*10봉 일회용 5g/EA","EA","S01",{},[],"1234"],["CJ150","f","리치스 슈가시럽","1.5L 1.5Kg/EA","EA","S01",{},[],"1234"],["CJ151","f","베오베 시나몬파우더","150g/EA","EA","S01",{},[],"1234"],["CJ152","f","포모나 바닐라시럽","1L 1Kg/EA","EA","S01",{},[],"1234"],["CJ153","f","매일유업 연유소프트","500g/EA","EA","S01",{},[],"1234"],["CJ154","f","포모나 카라멜소스","외식전용 2Kg/EA","EA","S01",{},[],"1234"],["CJ155","f","선인 코코아파우더","코코아22 1Kg/EA","EA","S01",{},[],"1234"],["CJ156","f","매일유업 흰우유","1L_바리스타 1Kg/EA","EA","S01",{},[],"1234"],["CJ157","f","베버시티 홍차라떼","500g/EA","EA","S01",{},[],"1234"],["CJ158","f","파낙스F&B 유자청","고흥 1Kg/EA","EA","S01",{},[],"1234"],["CJ159","f","르씨엘 레몬주스","946ml 946g/EA","EA","S01",{},[],"1234"],["CJ160","f","예뻐지는워터 레몬","건조_슬라이스 50g/EA","EA","S01",{},[],"1234"],["CJ161","f","흥국F&B 자몽에이드농축액","1.8Kg/EA","EA","S01",{},[],"1234"],["CJ162","f","까로망 청포도농축액","1.9Kg/EA","EA","S01",{},[],"1234"],["CJ163","f","일화 초정탄산수","캔_250ml 250g/EA","EA","S01",{},[],"1234"],["CJ164","f","돈시몬 오렌지주스","2L 2Kg/EA","EA","S01",{},[],"1234"],["CJ165","f","오트사이드 오트드링크","1L_바리스타블렌드_낱개_리뉴얼 1Kg/EA","EA","S01",{},[],"1234"],["CJ166","f","코카콜라 콜라","355ml 업소용 355g/EA","EA","S01",{},[],"1234"],["CJ167","f","코카콜라 제로콜라","355ml 업소용 355g/EA","EA","S01",{},[],"1234"],["CJ168","f","스프라이트 사이다","350ml 일반용 350g/EA","EA","S01",{},[],"1234"],["CJ169","f","스프라이트제로 사이다","350ml 350g/EA","EA","S01",{},[],"1234"],["CJ170","f","일화 초정탄산수","캔_350ml 350g/EA","EA","S01",{},[],"1234"],["CJ171","f","BUNDABERG 분다버그","병_375ml_레몬라임비터 375g/EA","EA","S01",{},[],"1234"],["CJ172","f","크린업 부직포행주","삼색_38*38cm_3입 EA","EA","S01",{},[],"1234"],["CJ173","f","크린업 부직포행주","삼색_38*38cm_3입 EA","EA","S01",{},[],"1234"],["CJ174","f","크린업 부직포행주","삼색_38*38cm_3입 EA","EA","S01",{},[],"1234"],["CJ175","f","BUNDABERG 분다버그","병_375ml_트로피칼망고 375g/EA","EA","S01",{},[],"1234"],["CJ176","f","마대자루","10매 80kg용 PAC","EA","S01",{},[],"1234"],["W0001","w","F 네그로 아마로","레드 · 이탈리아","병","WDJ",{"dd":1,"mg":1,"cg":1},["cg","mg"],"134"],["W0002","w","까날라스 블랑코","화이트 · 스페인","병","WDJ",{},["cg","dd"],"14"],["W0003","w","까날라스 틴토","레드 · 스페인","병","WDJ",{},["cg"],"1"],["W0004","w","끌로 드 로스 씨에떼","레드 · 아르헨티나","병","WDJ",{"cg":1},["mg"],"13"],["W0005","w","나헤 스마일 리슬링","화이트 · 독일","병","WDJ",{},["cg"],"1"],["W0006","w","두르뜨 뉘메로 엥 로제","로제 · 프랑스","병","WDJ",{},["sa"],"2"],["W0007","w","러브블록 말보로 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},["cg"],"1234"],["W0008","w","러브블록 센트럴 오타고 피노 누아","레드 · 뉴질랜드","병","WDJ",{},["sa","dd"],"24"],["W0009","w","러시안잭 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"dd":6,"mg":6,"sa":6,"cg":6},["sa","mg","dd"],"1234"],["W0010","w","레벨 릿지 샤르도네","화이트 · 미국","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},["mg"],"1234"],["W0011","w","레벨 릿지 카베르네 소비뇽","레드 · 미국","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},["dd"],"1234"],["W0012","w","로버트 몬다비 프라이빗 셀렉션 카베르네 소비뇽","레드 · 미국","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},["mg","dd"],"1234"],["W0013","w","리마페레 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"dd":2,"mg":2,"cg":2},["cg","sa"],"1234"],["W0014","w","리버 송 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"mg":1},["sa","dd"],"234"],["W0015","w","마초맨","레드 · 스페인","병","WDJ",{"mg":1,"sa":1,"cg":1},["cg"],"123"],["W0016","w","마츠 엘 레시오(중년)","레드 · 스페인","병","WDJ",{"dd":3,"mg":3,"sa":3,"cg":3},["sa"],"1234"],["W0017","w","마츠 엘 피카로(청년)","레드 · 스페인","병","WDJ",{"mg":2,"sa":2,"cg":2},["cg","dd"],"1234"],["W0019","w","바바 리베라 바르베라 다스티","레드 · 이탈리아","병","WDJ",{"sa":2,"cg":2},["sa"],"12"],["W0021","w","샤또 몽페라 레드","레드 · 프랑스","병","WDJ",{"mg":1,"sa":1,"cg":1},["cg"],"123"],["W0022","w","샤또 생 미셀 콜럼비아 밸리 리슬링","화이트 · 미국","병","WDJ",{"cg":3},["cg","dd"],"14"],["W0023","w","섹슈얼 초콜릿","레드 · 미국","병","WDJ",{"dd":1,"mg":1,"cg":1},["sa"],"1234"],["W0024","w","슈타인샤든 클래식 그뤼너 벨트리너","화이트 · 오스트리아","병","WDJ",{"dd":1},["dd"],"4"],["W0025","w","스톤 베이 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"dd":1,"mg":1},["cg","dd"],"134"],["W0026","w","시데랄","레드 · 칠레","병","WDJ",{"dd":1,"mg":1,"cg":1},["cg"],"134"],["W0027","w","신퀀타 꼴레찌오네","레드 · 이탈리아","병","WDJ",{"dd":3,"mg":3,"sa":3,"cg":3},["sa","dd"],"1234"],["W0028","w","쌩 클레어 오마카 리저브 샤도네이","화이트 · 뉴질랜드","병","WDJ",{},["cg"],"1"],["W0029","w","아젤리아 돌체토 달바 브리코 델오리올로 DOC","레드 · 이탈리아","병","WDJ",{"sa":1},["cg"],"12"],["W0030","w","알랭 좀므 도멘 그랑 브너 꼬뜨 뒤 론 레 샹포방 블랑","화이트 · 프랑스","병","WDJ",{},["dd"],"4"],["W0031","w","애봇 앤 델로네 샤도네이","화이트 · 프랑스","병","WDJ",{},["cg"],"1"],["W0032","w","애봇 앤 델로네 카베르네 소비뇽","레드 · 프랑스","병","WDJ",{},["cg","dd"],"14"],["W0033","w","오투 말보로 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"mg":1,"cg":1},["cg","mg","dd"],"134"],["W0034","w","이기갈 꼬뜨 뒤 론 루즈","레드 · 프랑스","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},["cg"],"1234"],["W0035","w","이기갈 꼬뜨 뒤 론 블랑","화이트 · 프랑스","병","WDJ",{},["sa"],"2"],["W0036","w","카를로 사니 수수마니엘로","레드 · 이탈리아","병","WDJ",{"mg":1},["mg"],"3"],["W0037","w","콥케 리저브 토니","주정강화(포트) · 포르투갈","병","WDJ",{"mg":1,"cg":1},["cg"],"13"],["W0038","w","타라파카 그란 리제르바 샤르도네","화이트 · 칠레","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},["mg"],"1234"],["W0039","w","타피 샤르도네","화이트 · 뉴질랜드","병","WDJ",{"sa":3,"cg":3},["cg"],"12"],["W0040","w","타피 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"dd":4,"mg":4,"sa":4,"cg":4},["cg"],"1234"],["W0041","w","19크라임즈 레드블랜드","레드 · 호주","병","WJS",{},["dd"],"4"],["W0042","w","군트럼 리슬링","화이트 · 독일","병","WJS",{},["cg","sa"],"12"],["W0043","w","그로브밀 소비뇽 블랑","화이트 · 뉴질랜드","병","WJS",{},["cg"],"1"],["W0045","w","라다치니 아이스 와인","스위트 · 몰도바 공화국","병","WJS",{},["dd"],"4"],["W0046","w","레미마틴 VSOP 700ml","레드 · 프랑스","병","WJS",{},["dd"],"4"],["W0047","w","레오네 데 카스트리스 돈나 리사 살렌토 말바시아 비앙코","레드 · 이탈리아","병","WJS",{},["dd"],"4"],["W0048","w","버메스터 10y 토니 포트","주정강화(포트) · 포르투갈","병","WJS",{"cg":1},["cg"],"1"],["W0049","w","버메스터 토니 포트","주정강화(포트) · 포르투갈","병","WJS",{},["mg"],"3"],["W0050","w","보글 메를로","레드 · 미국","병","WJS",{},["cg"],"1"],["W0051","w","보글 샤르도네","화이트 · 미국","병","WJS",{"dd":1,"mg":1,"cg":1},["cg"],"134"],["W0052","w","보글 슈냉블랑","레드 · 미국","병","WJS",{"mg":1,"sa":1,"cg":1},["cg","sa"],"123"],["W0053","w","볼베르 배럴 셀렉션","레드 · 스페인","병","WJS",{},["cg"],"1"],["W0056","w","솔레이 블랑","화이트 · 프랑스","병","WJS",{},["cg"],"1"],["W0057","w","엘리자베스 그로망상","레드 · 프랑스","병","WJS",{},["mg"],"3"],["W0058","w","오린 스위프트 파피용","레드 · 미국","병","WJS",{},["dd"],"4"],["W0059","w","제니 비냐 알테 소아베 클라시코","레드 · 이탈리아","병","WJS",{},["cg"],"1"],["W0060","w","집집락 쉬라즈 카베르네","레드 · 호주","병","WJS",{},["cg"],"1"],["W0061","w","카 데이 프라티 이 프라티 루가나","화이트 · 이탈리아","병","WJS",{"sa":2,"cg":2},["mg"],"123"],["W0062","w","킹핀 레드","레드 · 스페인","병","WJS",{},["cg"],"1"],["W0063","w","킹핀 화이트","화이트 · 스페인","병","WJS",{},["cg","sa"],"12"],["W0064","w","테파 소비뇽 블랑","화이트 · 뉴질랜드","병","WJS",{},["cg"],"1"],["W0065","w","트러블 메이커","레드 · 미국","병","WJS",{"mg":2,"sa":2,"cg":2},["cg","sa","dd"],"1234"],["W0066","w","폰타나프레다 가비 디 가비","화이트 · 이탈리아","병","WJS",{"sa":1},["sa"],"2"],["W0130","w","까날라스 스파클링 브뤼","스파클링 · 스페인","병","WDJ",{"cg":1},[],"1"],["W0131","w","까테나 자파타 까테나 말벡","레드 · 아르헨티나","병","WDJ",{"dd":1,"sa":1},[],"24"],["W0133","w","꼬네 따블 딸보","레드 · 프랑스","병","WDJ",{"mg":1,"cg":1},[],"13"],["W0155","w","다우 파인 토니 포트","주정강화(포트) · 포르투갈","병","WDJ",{"cg":1},[],"1"],["W0196","w","떼땅져 리저브 브뤼","스파클링","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W0211","w","로버트 몬다비 나파 밸리 카베르네 소비뇽","레드 · 미국","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0212","w","로버트 몬다비 샤르도네 나파밸리","화이트 · 미국","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0213","w","로버트 몬다비 프라이빗 셀렉션 버터리 샤르도네","화이트 · 미국","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0215","w","로버트 바일 라인가우 리슬링 콸리태츠바인 트로켄","화이트 · 독일","병","WDJ",{"dd":1,"mg":1},[],"34"],["W0220","w","루이나 블랑 드 블랑","스파클링(샴페인)","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W0222","w","루이자도 부르고뉴 샤르도네","화이트 · 프랑스","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0223","w","루이자도 부르고뉴 피노 누아","레드 · 프랑스","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W0224","w","루이자도 샤블리","화이트 · 프랑스","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0235","w","마누 말보로 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"mg":1,"sa":1,"cg":1},[],"123"],["W0239","w","마르케스 데 리스칼 리제르바","레드 · 스페인","병","WDJ",{"dd":1,"cg":1},[],"14"],["W0244","w","마츠 엘 비에호(노년)","레드 · 스페인","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W0249","w","머드하우스 말보로 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0250","w","머드하우스 피노 누아","레드 · 뉴질랜드","병","WDJ",{"cg":2},[],"1"],["W0251","w","머드하우스 피노그리","화이트 · 뉴질랜드","병","WDJ",{"cg":2},[],"1"],["W0255","w","모알라 부르고뉴 오-꼬뜨 드 뉘 루즈","레드 · 프랑스","병","WDJ",{"dd":1,"sa":1},[],"24"],["W0256","w","모알라 부르고뉴 오-꼬뜨 드 뉘 블랑","화이트 · 프랑스","병","WDJ",{"dd":1,"sa":1},[],"24"],["W0258","w","모알라 크레망 드 부르고뉴 브뤼","스파클링 · 프랑스","병","WDJ",{"mg":1,"sa":1},[],"23"],["W0266","w","무초마스 골드","레드 · 스페인","병","WDJ",{"dd":2,"cg":2},[],"14"],["W0267","w","무초마스 레드","레드 · 스페인","병","WDJ",{"dd":3,"mg":3,"sa":3,"cg":3},[],"1234"],["W0269","w","무초마스 엑스트라 드라이","스파클링","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0270","w","무초마스 화이트","화이트 · 스페인","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0276","w","바바 바롤로","레드 · 이탈리아","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0278","w","바바 토우 비앙크 피에몬테 샤르도네","화이트","병","WDJ",{"cg":2},[],"1"],["W0284","w","발비 소프라니 모스카토 다스티","스위트 · 이탈리아","병","WDJ",{"dd":2,"sa":2,"cg":2},[],"124"],["W0304","w","블랭크 캔버스 홀더웨이 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"cg":1},[],"1"],["W0311","w","뿌삐유","레드 · 프랑스","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W0317","w","생 클레어 비카스 초이스 소비뇽 블랑 버블스","스파클링 · 뉴질랜드","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0318","w","생 클레어 파이오니어 블락 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0332","w","샤또 보쉔 샤또뇌프 뒤 빠쁘 그랑 리저브","레드 · 프랑스","병","WDJ",{"sa":1},[],"2"],["W0333","w","샤또 보쉔 프로방스 로제 꾸지나드","로제","병","WDJ",{"cg":1},[],"1"],["W0354","w","스와틀랜드 프라이빗 컬렉션 슈냉블랑","화이트 · 남아공","병","WDJ",{"sa":1},[],"2"],["W0361","w","스털링 캘리포니아 샤르도네","화이트 · 미국","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0362","w","스털링 캘리포니아 카베르네 소비뇽","레드 · 미국","병","WDJ",{"cg":1},[],"1"],["W0379","w","아젤리아 랑게 네비올로 DOC","레드 · 이탈리아","병","WDJ",{"sa":1},[],"2"],["W0407","w","이기갈 따벨 로제","로제 · 프랑스","병","WDJ",{"cg":1},[],"1"],["W0424","w","조지 미쉘 소비뇽 블랑","화이트","병","WDJ",{"dd":1,"mg":1,"sa":1},[],"234"],["W0439","w","칸티 브라케토","스위트 · 이탈리아","병","WDJ",{"sa":1},[],"2"],["W0441","w","칸티나 자카니니, 일 비앙코 디 치쵸","레드","병","WDJ",{"sa":1},[],"2"],["W0442","w","칸티나 자카니니, 체라수올로 다브루쪼","레드 · 이탈리아","병","WDJ",{"sa":1},[],"2"],["W0443","w","칸티나 자카니니, 피노 그리지오","화이트 · 이탈리아","병","WDJ",{"mg":1},[],"3"],["W0448","w","케이머스 카베르네 소비뇽","레드 · 미국","병","WDJ",{"mg":1,"sa":1,"cg":1},[],"123"],["W0452","w","코노 아로누이 소비뇽 블랑","화이트 · 뉴질랜드","병","WDJ",{"sa":1,"cg":1},[],"12"],["W0468","w","클라우디베이 펠로루스 브뤼","스파클링","병","WDJ",{"mg":1,"sa":1},[],"23"],["W0470","w","타라파카 그란 리제르바 카르미네르","레드 · 칠레","병","WDJ",{"mg":1,"sa":1,"cg":1},[],"123"],["W0471","w","타라파카 그란 리제르바 카베르네 소비뇽","레드 · 칠레","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0479","w","테라스 가우다","화이트 · 스페인","병","WDJ",{"mg":1,"cg":1},[],"13"],["W0490","w","토마시 아마로네 델라 발폴리첼라 클라시코","레드 · 이탈리아","병","WDJ",{"dd":1,"mg":1,"cg":1},[],"134"],["W0492","w","토후 말보로 피노그리","화이트 · 뉴질랜드","병","WDJ",{"mg":1},[],"3"],["W0494","w","투핸즈 날리 듀즈 쉬라즈","레드 · 호주","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0498","w","투핸즈 섹시비스트","레드 · 호주","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0500","w","투핸즈 엔젤스 쉐어","레드 · 호주","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0501","w","투핸즈 필즈 오브 조이","레드 · 호주","병","WDJ",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W0513","w","파스칼 졸리베 상세르 블랑","화이트","병","WDJ",{"cg":1},[],"1"],["W0515","w","파우스티노 I 그랑 리제르바 2016","레드 · 스페인","병","WDJ",{"dd":1},[],"4"],["W0519","w","파우스티노 아트 컬렉션 크리안자","레드 · 스페인","병","WDJ",{"dd":1},[],"4"],["W0526","w","페리에주에 그랑 브뤼","스파클링(샴페인)","병","WDJ",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W0527","w","페트라 징가리","레드 · 이탈리아","병","WDJ",{"dd":1,"mg":1,"sa":1},[],"234"],["W0546","w","프로즌 툰드라 비달 아이스 와인 375ML","스위트 · 캐나다","병","WDJ",{"cg":1},[],"1"],["W0547","w","플라네타 라 세그레타 그릴로","화이트 · 이탈리아","병","WDJ",{"dd":1},[],"4"],["W0551","w","필리터리 아티장 비달 아이스 와인 375ML","스위트 · 캐나다","병","WDJ",{"cg":1},[],"1"],["W0553","w","하이 바르셀로나 까바 브뤼","스파클링 · 스페인","병","WDJ",{"dd":1,"mg":1,"sa":1},[],"234"],["W0554","w","헨켈 트로켄","스파클링 · 독일","병","WDJ",{"dd":1,"sa":1,"cg":1},[],"124"],["W0557","w","화이트 헤븐 소비뇽 블랑","화이트","병","WDJ",{"sa":1},[],"2"],["W0767","w","도멘 베레 크레망 드 부르고뉴","스파클링","병","WJS",{"cg":1},[],"1"],["W0822","w","도미니크 로랑 마르사네 블랑","레드","병","WJS",{"dd":1},[],"4"],["W0827","w","도우 카베르네 소비뇽","레드 · 미국","병","WJS",{"dd":1,"mg":1,"sa":1},[],"234"],["W0957","w","마담 뵈브 포인트 부르고뉴 샤르도네","화이트 · 프랑스","병","WJS",{"dd":1,"sa":1},[],"24"],["W0986","w","모엣 샹동 브뤼","스파클링(샴페인)","병","WJS",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W1000","w","몰리두커 더 복서","레드 · 호주","병","WJS",{"mg":1,"sa":1},[],"23"],["W1034","w","반피 키안티 클라시코","레드","병","WJS",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W1042","w","배비치 블랙 말보로 소비뇽 블랑","화이트 · 뉴질랜드","병","WJS",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W1044","w","배비치 패밀리 싱글빈야드 소비뇽 블랑","화이트","병","WJS",{"cg":2},[],"1"],["W1049","w","버메스터 LBV 2016","주정강화(포트)","병","WJS",{"cg":1},[],"1"],["W1050","w","버메스터 루비 포트","주정강화(포트)","병","WJS",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"],["W1052","w","버메스터 화이트 포트","주정강화(포트)","병","WJS",{"mg":1,"sa":1,"cg":1},[],"123"],["W1072","w","보글 쁘띠 시라","레드 · 미국","병","WJS",{"mg":2,"cg":2},[],"13"],["W1073","w","보글 카베르네 소비뇽","레드","병","WJS",{"dd":2,"cg":2},[],"14"],["W1085","w","뵈브 클리코 옐로우 라벨","스파클링(샴페인)","병","WJS",{"dd":2,"mg":2,"sa":2},[],"234"],["W1112","w","브레드 앤 버터 버터 피노 누아","레드 · 미국","병","WJS",{"dd":1,"cg":1},[],"14"],["W1113","w","브레드 앤 버터 샤르도네","화이트","병","WJS",{"dd":1,"mg":1,"cg":1},[],"134"],["W1114","w","브레드 앤 버터 카베르네 소비뇽","레드 · 미국","병","WJS",{"dd":2,"mg":2,"cg":2},[],"134"],["W1134","w","비달 플뢰리 에르미따쥬 루즈","스위트 · 프랑스","병","WJS",{"mg":1},[],"3"],["W1225","w","샤블리 5L (주방)","화이트 · 프랑스","병","WJS",{"cg":1},[],"1"],["W1267","w","샹동 브뤼","스파클링","병","WJS",{"dd":2,"mg":2,"sa":2,"cg":2},[],"1234"],["W1309","w","스톤캡 카베르네소비뇽","레드 · 미국","병","WJS",{"sa":1},[],"2"],["W1334","w","아마라야 블랑코 돌체","레드","병","WJS",{"sa":1,"cg":1},[],"12"],["W1335","w","아모레 돌체 모스카토 다스티","스위트 · 이탈리아","병","WJS",{"cg":1},[],"1"],["W1453","w","임페리얼 리제르바","레드","병","WJS",{"mg":1,"sa":1},[],"23"],["W1471","w","조셉 펠프스 나파 카베르 네소비뇽","레드 · 미국","병","WJS",{"dd":1,"mg":1,"cg":1},[],"134"],["W1478","w","지라드 나파밸리 카베르네 소비뇽","레드 · 미국","병","WJS",{"mg":1,"sa":1},[],"23"],["W1508","w","카사로호 라 가바차 소비뇽 블랑","화이트","병","WJS",{"mg":1,"sa":1},[],"23"],["W1566","w","클라우디베이 샤르도네","화이트","병","WJS",{"mg":3,"sa":3,"cg":3},[],"123"],["W1567","w","클라우디베이 소비뇽 블랑","화이트","병","WJS",{"dd":4,"mg":4,"sa":4,"cg":4},[],"1234"],["W1594","w","텍스트북 카베르네 소비뇽","레드 · 미국","병","WJS",{"dd":1,"mg":1,"sa":1,"cg":1},[],"1234"]],"sups":{"S01":["CJ프레시웨이","D-1 (전날 주문)",{"d":[0,1,2,3,4],"h":20}],"S03":["커피리브레","",null],"S04":["미트프렌즈","",null],"S05":["네이버 쇼핑","",null],"S06":["소금집","",null],"S07":["닭리닭매","평일 17시",{"d":[1,2,3,4,5],"h":17}],"S08":["에디션덴마크","",null],"S09":["공컵","",null],"S10":["월드냅킨","",null],"S12":["제이엔엠","",null],"S13":["연어퀸수산","",null],"S14":["모란수산","",null],"S15":["씨앤에이치에프에스","입고 3일 전",{"d":[1],"h":18}],"S16":["에스엠오일","",null],"S17":["제이엘오일","",null],"S18":["에스에이치오일","",null],"S20":["벙커컴퍼니","",null],"S21":["카페테라","",null],"S22":["배민상회","",null],"S23":["오늘의집","",null],"S24":["이케아","",null],"S26":["킨코스","",null],"S27":["성원애드피아","",null],"WDJ":["대정","목요일 (허가 신청)",{"d":[4],"h":18}],"WJS":["진성통합상사","목요일 (허가 신청)",{"d":[4],"h":18}]}};
const ST=[{id:'cg',k:'1',nm:'청계',br:'청계'},{id:'sa',k:'2',nm:'상암',br:'상암'},{id:'mg',k:'3',nm:'마곡',br:'마곡'},{id:'dd',k:'4',nm:'동대문두타',br:'동대문'}];
const CATS=[{id:'f',nm:'식자재'},{id:'s',nm:'소모품'},{id:'w',nm:'와인'}];
const STEPS=['담는 중','제출','서포트센터','거래처 확인','입고'];
const WARN=0.03, CAP=0.05;          // 3% 넘으면 노랑 경고, 5% 넘으면 빨강 + '이번 주만 늘려 주세요'
const IT=OD.items.map(a=>({id:a[0],cat:a[1],name:a[2],spec:a[3],unit:a[4],sup:a[5],usual:a[6],tap:a[7],st:a[8]}));
const ITEM=Object.fromEntries(IT.map(i=>[i.id,i]));
const SUPN=id=>id==='CU'?'직접 추가':String(id||'').startsWith('V:')?id.slice(2):(OD.sups[id]||[id])[0];
const e=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const $o=s=>document.querySelector(s);
const ICART='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><path d="M3 4h2.2l2.2 11h11L20.6 7H6.2"/><circle cx="9.2" cy="19.6" r="1.3"/><circle cx="17.2" cy="19.6" r="1.3"/></svg>';

/* ── 이번 주 ── */
function weekOf(){const n=new Date();const d=(n.getDay()+6)%7;const m=new Date(n.getFullYear(),n.getMonth(),n.getDate()-d);const s=new Date(m);s.setDate(m.getDate()+6);
  const f=x=>`${x.getMonth()+1}/${x.getDate()}(${'일월화수목금토'[x.getDay()]})`;return {id:`${m.getFullYear()}${String(m.getMonth()+1).padStart(2,'0')}${String(m.getDate()).padStart(2,'0')}`,label:`${f(m)} – ${f(s)}`}}
const WK=weekOf();
WK.iso=(()=>{const n=new Date(),t=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate()));const d=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-d);const y=t.getUTCFullYear();return `${y}-W${String(Math.ceil(((t-Date.UTC(y,0,1))/864e5+1)/7)).padStart(2,'0')}`})();

/* ── 나 · 지점 · 권한 ── */
function me(){const d=(typeof S!=='undefined'&&S&&S.data)||{};return {m:d.me||{},hq:!!(d.x&&d.x.isHQ)}}
const HQB=b=>!ST.some(s=>s.br===b);
function mgrRole(){const {m,hq}=me();return hq||/점장|매니저|팀장|대표|이사/.test(m.role||'')}
let UI={store:null,cat:'f',q:'',fil:'usual',view:null,mode:null};
function uiLoad(){try{Object.assign(UI,JSON.parse(localStorage.getItem('tsb_ord_ui')||'{}'))}catch(_){} UI.q='';}
function uiSave(){localStorage.setItem('tsb_ord_ui',JSON.stringify({store:UI.store,cat:UI.cat,fil:UI.fil,view:UI.view}))}
function store(){const {m,hq}=me();const own=ST.find(s=>s.br===m.branch);if(own&&!hq)return own;return ST.find(s=>s.id===UI.store)||own||ST[0]}
function canSwitch(){const {m,hq}=me();return hq||HQB(m.branch)}
function isMgr(){return mgrRole()&&(UI.view?UI.view==='mgr':true)}
const cats=()=>CATS.filter(c=>c.id!=='w'||isMgr());

/* ── 담는 중 (이 기기에 자동 저장) ── */
let O;
const KEY=()=>`tsb_ord_d1_${(me().m.email||'x')}_${store().id}_${WK.id}`;
const newDraft=()=>({lines:{},custom:{},memo:'',why:'',did:'D'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),rq:{}});
function oLoad(){try{O=JSON.parse(localStorage.getItem(KEY()))}catch(_){O=null}
  if(!O||typeof O!=='object')O=newDraft();O.lines=O.lines||{};O.custom=O.custom||{};O.rq=O.rq||{};if(!O.did)O.did=newDraft().did;
  if(CAT.v2)migrateV2()}
function oSave(){try{localStorage.setItem(KEY(),JSON.stringify(O))}catch(_){}}
function usualOf(i){return (i.usual||{})[store().id]||0}
function inStore(i){return String(i.st||'1234').includes(store().k)}
function lineItem(id){return ITEM[id]||CAT.by[id]||O.custom[id]}
/* 평소 대비: 평소 수량만큼 담으면 100% (금액 없이 수량 기준) */
function pct(c){const base=IT.filter(i=>i.cat===c&&inStore(i)&&usualOf(i));if(!base.length)return 0;
  let p=0;Object.entries(O.lines).forEach(([id,q])=>{const it=lineItem(id);if(!it||it.cat!==c)return;const u=usualOf(it)||1;p+=q/u});return p/base.length}
function band(c){const p=pct(c);return p>1+CAP?'over':p>1+WARN?'tol':'ok'}
const overCats=()=>cats().filter(c=>band(c.id)==='over');
const sups=()=>{const s=[...new Set(Object.keys(O.lines).map(id=>(lineItem(id)||{}).sup).filter(Boolean))];const due=x=>(OD.sups[x]&&OD.sups[x][2])?0:1;return s.sort((a,b)=>due(a)-due(b)||SUPN(a).localeCompare(SUPN(b)))};

/* ── 서버 (People API · order.*) ──────────────────────────────
 * 가격(단가 · 판매가 · 마진)은 order.catalog 응답에만 있고 메모리에만 둔다 (파일 · 기기 저장 안 함).
 * v2(가격 · 도매 · MD 표시)는 서버가 v2:true 줄 때만. 나머지는 지금 화면 그대로.
 */
const CAT={st:0,v2:false,items:[],by:{},key:{},hold:0.2,err:'',at:0,p:null};
const SV={st:0,pos:[],err:'',at:0,sid:'',p:null};
const SUB={busy:0,err:''};
const CATKO={f:'식자재',s:'소모품',w:'와인'},CATID={'식자재':'f','소모품':'s','와인':'w'};
const won=n=>Math.round(+n||0).toLocaleString('ko-KR');
const emsg=er=>{const m=String((er&&er.message)||er||'').replace(/^Error:\s*/,'');return /응답을 못 받았어요|Failed to fetch|NetworkError|Load failed/i.test(m)?'인터넷 연결이 불안정해요':m};
async function call(a,d){if(typeof apiRaw!=='function')throw new Error('앱을 새로고침해 주세요');return apiRaw(a,d||{})}
function supCode(n){n=String(n||'').trim();if(!n)return 'V:거래처 미정';const k=Object.keys(OD.sups).find(k=>k[0]==='W'&&(OD.sups[k][0]===n||OD.sups[k][0].startsWith(n)||n.startsWith(OD.sups[k][0])));return k||('V:'+n)}
let LOCN=null;function locN(){if(!LOCN){LOCN={};IT.forEach(i=>{if(i.cat==='w')LOCN[WM.norm(i.name)]=i})}return LOCN}
function loadCat(force){if(!mgrRole())return Promise.resolve();if(CAT.st===1)return CAT.p;if(CAT.st===2&&!force&&Date.now()-CAT.at<6e5)return Promise.resolve();
  CAT.st=1;CAT.p=call('order.catalog',{cat:'wine'}).then(j=>{const ln=locN();
    CAT.v2=!!j.v2;CAT.hold=+(j.settings&&j.settings.holdMargin)||0.2;CAT.by={};CAT.key={};CAT.items=[];
    (j.items||[]).forEach(x=>{if(!x||x.key==null||!x.name)return;const md=x.md||{};const sp=md.forceSupplier||x.supplier||'';const n=WM.norm(x.name);const loc=ln[n];
      const it={id:'K'+x.key,key:String(x.key),cat:'w',name:x.name,en:x.en||'',spec:x.importer||'',unit:'병',sup:supCode(sp),supn:sp,usual:loc?loc.usual:{},tap:loc?loc.tap:[],st:'1234',srv:x,md,force:md.forceSupplier||'',loc:loc?loc.id:null};
      CAT.items.push(it);CAT.by[it.id]=it;if(!CAT.key[n])CAT.key[n]=it});
    CAT.st=2;CAT.at=Date.now();CAT.err='';if(CAT.v2&&O)migrateV2()})
  .catch(er=>{CAT.st=3;CAT.err=emsg(er);CAT.v2=false});return CAT.p}
function catOf(it){if(!it||it.cat!=='w'||CAT.st!==2)return null;if(it.id&&it.id[0]==='K'&&CAT.by[it.id])return CAT.by[it.id];return CAT.key[WM.norm(it.name)]||null}
function ensureCustom(id){const it=CAT.by[id];if(it&&!O.custom[id])O.custom[id]={id,cat:'w',name:it.name,spec:it.spec,unit:'병',sup:it.sup,supn:it.supn,usual:{},tap:[],st:'1234',key:it.key}}
/* v2: 예전 품목 id(W0001)로 담긴 와인을 서버 품목(K…)으로 옮김 */
function migrateV2(){let ch=0;Object.keys(O.lines).forEach(id=>{if(id[0]==='K')return;const it=ITEM[id]||O.custom[id];if(!it||it.cat!=='w')return;const c=CAT.key[WM.norm(it.name)];if(!c)return;
  O.lines[c.id]=Math.min(999,(O.lines[c.id]||0)+O.lines[id]);delete O.lines[id];ensureCustom(c.id);ch=1});if(ch)oSave()}
function keyOf(id){if(id[0]==='K')return id.slice(1);const it=lineItem(id)||{};const c=catOf(it);return c?c.key:id}
/* 가격 정보 (v2만) */
function pr(id){if(!CAT.v2)return null;const c=catOf(lineItem(id)||{});if(!c)return null;const s=c.srv||{};const cost=+s.cost||0,price=+s.price||0;
  let m=(s.margin!=null&&s.margin!=='')?+s.margin:(price&&cost?(price-cost*1.1)/price:null);if(m!=null&&Math.abs(m)>1.5)m=m/100;
  const md=String((c.md&&c.md.status)||'정상');const block=/판매중지|단종/.test(md);const low=m!=null&&m<CAT.hold;
  return {cost,price,m,md,block,low,hold:low||/쇼트|판매중지|단종|보류/.test(md),c}}
function mdTag(p){return p&&p.md&&p.md!=='정상'?`<span class="otg ${p.block?'wxr':'wxo'}">${e(p.md)}</span>`:''}
function supTxt(c){const s=c.srv||{};const deal=c.force?`(도매) ${c.force}`:(s.deal||s.type||(/^(대정|진성|서영|삼정)/.test(c.supn)?`(도매) ${c.supn}`:c.supn));return [deal,s.importer].filter(Boolean).join(' · ')}
function pxLine(p){if(!p)return '';if(!p.cost&&!p.price)return `<div class="opx"><span>단가 정보 없음</span></div>`;
  return `<div class="opx"><span>단가 ${p.cost?won(p.cost):'-'}<small> VAT별도</small></span><span>판매가 ${p.price?won(p.price):'-'}</span><span class="${p.low?'lo':''}">마진 ${p.m!=null?Math.floor(p.m*100)+'%':'-'}</span>${p.low?'<span class="otg wxo">보류</span>':''}</div>`}
function wineTot(){let n=0,b=0,sup=0,sale=0,miss=0,hold=0;Object.keys(O.lines).forEach(id=>{const it=lineItem(id);if(!it||it.cat!=='w')return;const q=O.lines[id],p=pr(id);n++;b+=q;
  if(p&&p.cost)sup+=p.cost*q;else miss++;if(p&&p.price)sale+=p.price*q;if(p&&p.hold)hold++});return {n,b,sup,vat:Math.round(sup*0.1),sale,miss,hold}}
function totHTML(t){if(!CAT.v2||!t.n)return '';return `<div class="otot"><div class="oth">와인 합계 <small>대관 견적용</small></div>
  <div class="r"><span>병수</span><b>${t.b}병</b></div><div class="r"><span>공급가 (VAT 별도)</span><b>${won(t.sup)}원</b></div><div class="r"><span>VAT 포함</span><b>${won(t.sup+t.vat)}원</b></div><div class="r"><span>판매가 합계</span><b>${won(t.sale)}원</b></div>
  ${t.miss?`<div class="osub">단가 없는 ${t.miss}개는 합계에서 빠졌어요</div>`:''}</div>
  ${t.hold?`<div class="onote y"><b>보류 ${t.hold}개</b> · 제출은 돼요. 마진 ${Math.round(CAT.hold*100)}% 미만이거나 쇼트 품목이라 서포트센터가 확인하고 보내요.</div>`:''}`}
/* 낸 발주 (order.mine) */
function normPo(p){const L=(p.lines||[]).map(l=>({lineId:l.lineId||l.id||'',key:l.key!=null?String(l.key):'',name:l.name||l.itemName||'',qty:+l.qty||0,sup:l.supplier||l.sup||'',imp:l.importer||'',status:l.status||l.lineStatus||'',cost:l.cost,price:l.price,margin:l.margin}));
  return {...p,poId:p.poId||p.id,cat:p.cat||'',status:p.status||'제출',memo:p.memo||'',totals:p.totals||{},lines:L}}
function loadMine(force){const s=store();if(SV.st===1&&SV.sid===s.id)return SV.p;if(!force&&SV.st===2&&SV.sid===s.id&&Date.now()-SV.at<3e4)return Promise.resolve();
  if(SV.sid!==s.id)SV.pos=[];SV.st=1;SV.sid=s.id;SV.err='';
  const p=SV.p=call('order.mine',{store:s.nm,weeks:4}).then(j=>{if(SV.p!==p)return;SV.pos=(j.pos||[]).map(normPo).sort((a,b)=>String(b.submittedAt||'').localeCompare(String(a.submittedAt||'')));SV.st=2;SV.at=Date.now()})
   .catch(er=>{if(SV.p!==p)return;SV.st=3;SV.err=emsg(er)}).then(()=>softDraw());return p}
function stOf(po){const s=String(po.status||'');if(/반려/.test(s))return {k:-2,lab:'돌려보냄',c:'rj'};if(/취소/.test(s))return {k:-1,lab:'취소됨',c:'s0'};if(/점장/.test(s))return {k:1,lab:'점장님 확인 대기',c:'s1'};if(/입고|완료/.test(s)||po.received)return {k:5,lab:'입고 끝',c:'s5'};
  if(/확정|입금|출고|배송/.test(s))return {k:4,lab:'오는 중',c:'s3'};if(/단가확인|취합|발주|거래처|회신|링크|vpo/i.test(s))return {k:3,lab:'거래처 확인 중',c:'s3'};return {k:2,lab:'서포트센터 확인 중',c:'s2'}}
const livePos=()=>SV.pos.filter(p=>p.week===WK.iso&&stOf(p).k>0);
const isTest=po=>/TEST/i.test(po.memo||'');
function fmtAt(v){if(!v)return '';const d=new Date(v);if(isNaN(d))return String(v).slice(5,16);return `${d.getMonth()+1}/${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`}
function mode(){if(UI.mode)return UI.mode;return !Object.keys(O.lines).length&&livePos().length?'status':'cart'}
let PD=0;function softDraw(){const a=document.activeElement;if(VIEW&&a&&VIEW.contains(a)&&/INPUT|TEXTAREA|SELECT/.test(a.tagName)){PD=1;return}PD=0;draw()}
document.addEventListener('focusout',()=>{if(PD)setTimeout(()=>{if(PD&&location.hash.startsWith('#/order'))softDraw()},150)});
addEventListener('online',()=>{if(SUB.err&&location.hash.startsWith('#/order'))otoast('인터넷이 다시 연결됐어요 · 다시 보내기를 눌러 주세요')});
const isAdm=()=>{try{return !!(window.OA_isAdmin&&window.OA_isAdmin())}catch(_){return false}};
/* 발주 관리(order_admin.js) 링크: 서포트센터(HQ)만 한 번 확인해서 order_admin.js와 같은 키에 기억 */
let ADMQ=0;function admProbe(){try{if(ADMQ||!window.OA_isAdmin||isAdm())return;const x=(S.data&&S.data.x)||{};if(!x.isHQ)return;const k='tsb_oadm_'+String(S.token||'').slice(0,12);if(localStorage.getItem(k)!=null)return;ADMQ=1;
  call('order.admin.board',{week:WK.iso}).then(()=>{localStorage.setItem(k,'1');softDraw()}).catch(er=>{if(/권한|FORBID|DENIED|관리자|NOT_ADMIN/i.test(String(er&&er.message||'')))localStorage.setItem(k,'0')})}catch(_){}}

/* ── 아래 메뉴 · 헤더 ☰ ── */
function patchNav(){
  const nav=$o('.nav');if(nav&&!nav.querySelector('a[data-r="order"]')){
    const more=nav.querySelector('a[data-r="more"]');if(more)more.remove();
    const a=document.createElement('a');a.href='#/order';a.dataset.r='order';a.innerHTML=`${ICART}발주<span class="onew">NEW</span>`;
    const inbox=nav.querySelector('a[data-r="inbox"]');nav.insertBefore(a,inbox||null);
  }
  const r=$o('#hdr .r');if(r&&!r.querySelector('.omore')){const m=document.createElement('a');m.className='ic omore';m.href='#/more';m.title='더보기';m.setAttribute('aria-label','더보기 (전체 메뉴)');m.innerHTML=I('more',21);r.appendChild(m)}
}
let COACHED=0;function coach(){if(COACHED)return;const n=+localStorage.getItem('tsb_more_moved')||0;if(n>=3||$o('.ocm'))return;const b=$o('#hdr .omore');if(!b)return;const rc=b.getBoundingClientRect();if(!rc.width)return;
  COACHED=1;localStorage.setItem('tsb_more_moved',n+1);const c=document.createElement('div');c.className='ocm';c.innerHTML='<b>더보기</b>는 여기로 옮겼어요.<br>아래 메뉴엔 <b>발주</b>가 생겼어요.';
  c.style.top=(rc.bottom+10)+'px';c.style.right=Math.max(8,innerWidth-rc.right-6)+'px';c.onclick=()=>c.remove();document.body.appendChild(c);setTimeout(()=>c.remove(),7000)}
if(typeof shell==='function'){const _s=shell;shell=function(){const r=_s.apply(this,arguments);try{patchNav();markNav();setTimeout(coach,400)}catch(_){}return r}}
if(typeof markNav==='function'){const _m=markNav;markNav=function(){_m.apply(this,arguments);try{patchNav();const k=location.hash.replace(/^#\/?/,'').split('/')[0].split('?')[0];
  document.body.classList.toggle('ordw',k==='order');
  if(k==='order')document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.r==='order'));
  const any=[...document.querySelectorAll('.nav a')].some(a=>a.classList.contains('on'));const mb=$o('#hdr .omore');if(mb)mb.classList.toggle('on',!any&&k!==''&&k!=='order'&&k!=='notis'&&k!=='console')}catch(_){}}}

/* ── 공통 UI ── */
function sheet(h,foot){closeSheet();const b=document.createElement('dialog');b.className='omask';b.id='osheet';b.onclick=ev=>{if(ev.target===b)closeSheet()};b.addEventListener('close',()=>closeSheet());
  b.innerHTML=`<div class="osheet"><div class="grab"></div><div class="osb">${h}</div>${foot?`<div class="osf">${foot}</div>`:''}</div>`;if(typeof dlgOpen==='function')dlgOpen(b);else document.body.appendChild(b);
  const f=b.querySelector('input,textarea,button.obtn');if(f&&innerWidth>=768)setTimeout(()=>f.focus(),30)}
function closeSheet(){const s=$o('#osheet');if(s)s.remove()}
document.addEventListener('click',ev=>{const sh=ev.target.closest&&ev.target.closest('#oscart');if(!sh)return;const t=ev.target.closest('button');if(!t)return;
  if(t.dataset.d){const id=t.dataset.for;setQ(id,(O.lines[id]||0)+(+t.dataset.d));return}
  if(t.dataset.act==='submit')submit()});
document.addEventListener('focusout',ev=>{const t=ev.target;if(t.classList&&t.classList.contains('oq')&&t.closest('.ocb'))setTimeout(()=>{if(!(document.activeElement&&document.activeElement.closest&&document.activeElement.closest('.ocb')))refreshSide()},60)});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&$o('#osheet'))closeSheet()});
let TT;function otoast(m,undo,ms){document.querySelectorAll('.otoast').forEach(t=>t.remove());clearTimeout(TT);const t=document.createElement('div');t.className='otoast';t.setAttribute('role','status');t.append(m);
  if(undo){const b=document.createElement('button');b.textContent='되돌리기';b.onclick=()=>{O=JSON.parse(undo);oSave();draw();t.remove()};t.append(b)}
  if(typeof topLayer==='function')topLayer(t);else document.body.appendChild(t);TT=setTimeout(()=>t.remove(),ms||2600)}
const BETA=`<div class="obeta"><i>BETA</i><span>제출하면 서포트센터에 저장돼요. 11/23(월) 실제 사용 전까지는 지금 방식 발주도 같이 해 주세요.</span></div>`;

/* ── 화면 ── */
let VIEW=null;
ROUTES.order=function(v){VIEW=v;uiLoad();oLoad();draw();loadMine();loadPend();loadCat().then(()=>softDraw());admProbe()};
function draw(){const v=VIEW;if(!v||!document.body.contains(v)||!O)return;const sy=scrollY;v.innerHTML=page();bind(v);if(mode()==='cart')refreshSide();window.scrollTo(0,sy);fitCart()}
function stepsHTML(cur){return `<div class="osteps">${STEPS.map((s,i)=>`<div class="${i+1<cur?'d':i+1===cur?'c':''}"><i></i>${s}</div>`).join('')}</div>`}
function top(){const s=store(),m=mode(),n=livePos().length;
  return `${BETA}<div class="otop"><div><h1>발주</h1><div class="ow">${s.nm} · ${WK.label}</div></div>
  ${canSwitch()?`<div class="ostores" role="group" aria-label="지점">${ST.map(x=>`<button data-st="${x.id}" class="${x.id===s.id?'on':''}">${x.nm}</button>`).join('')}</div>`:''}</div>
  <div class="obar2"><div class="omode" role="tablist"><button role="tab" data-mode="cart" aria-selected="${m==='cart'}" class="${m==='cart'?'on':''}">담기</button><button role="tab" data-mode="status" aria-selected="${m==='status'}" class="${m==='status'?'on':''}">낸 발주${n?` <b>${n}</b>`:''}</button></div>
  ${isAdm()?`<a class="oadm" href="#/order-admin">발주 관리</a>`:''}</div>
  ${mgrRole()?`<div class="orole">화면 보기 <button data-view="mgr" class="${isMgr()?'on':''}">점장님 화면</button><button data-view="crew" class="${!isMgr()?'on':''}">크루 화면</button></div>`:''}`}
function budgetCard(){return `<div class="ocard bud"><div class="oh">평소 대비 <small>평소만큼 담으면 100%</small></div>${cats().map(c=>`<div class="obg" id="ob_${c.id}"></div>`).join('')}</div>`}
function budgetRow(c){const p=pct(c.id),b=band(c.id),n=Object.keys(O.lines).some(id=>(lineItem(id)||{}).cat===c.id);
  const txt=!n?'아직 안 담았어요':b==='ok'?'괜찮아요':b==='tol'?'평소보다 조금 많아요 (+3% 넘음)':`평소보다 많이 담았어요 · 제출할 때 이유 한 줄`;
  return `<div class="r"><span>${c.nm}</span><span>${Math.round(p*100)}%</span></div><div class="obar ${b==='ok'?'':b}" role="progressbar" aria-label="${c.nm} 평소 대비" aria-valuenow="${Math.round(p*100)}"><i style="width:${Math.min(100,p/(1+CAP)*100)}%"></i><em style="left:${100/(1+CAP)}%"></em></div><div class="obn ${n?b:''}">${txt}</div>`}
function dueCard(){const ids=[...new Set(IT.filter(i=>inStore(i)&&(i.cat!=='w'||isMgr())).map(i=>i.sup))].filter(id=>OD.sups[id]&&OD.sups[id][1]);
  return `<div class="ocard"><div class="oh">마감 <small>예시 · 실제 마감은 지금처럼</small></div><div class="ochips">${ids.map(id=>`<span class="ochip ${id==='S01'?'hot':''}">${e(SUPN(id))} · ${e(OD.sups[id][1])}</span>`).join('')}</div></div>`}
function fbCard(){return `<div class="ocard"><div class="oh">써 보니 어때요?</div><div class="osub" style="margin:6px 0 12px">없는 품목 · 헷갈리는 말 · 불편한 점을 11/20(금)까지 보내 주세요. 고쳐서 11/23(월)부터 실제로 써요.</div><a class="obtn line sm" href="#/request/new/appidea" style="width:100%">불편한 점 보내기</a></div>`}
function heroCard(){const n=Object.keys(O.lines).length;const cnt=c=>IT.filter(i=>i.cat===c&&inStore(i)&&usualOf(i)).length;
  if(n)return '';return `<div class="ocard pine"><div class="osub">${store().nm} · 이번 주</div><div class="obig">이번 주도 지난주처럼<br>담을까요?</div>
  <button class="obtn y" data-act="like" style="margin-top:12px">지난주처럼 담기</button>
  <div class="osub oc" style="margin-top:10px">${cats().map(c=>`${c.nm} ${cnt(c.id)}`).join(' · ')} · 평소 수량</div></div>`}
function sentCard(){const L=livePos();if(!L.length)return '';return `<div class="ocard"><div class="oh">이번 주 낸 발주 <small>${L.length}건</small></div><div class="osub" style="margin:4px 0 10px">${L.map(p=>`${e(p.cat)} ${stOf(p).lab}`).join(' · ')}</div><button class="obtn line sm" data-mode="status" style="width:100%">진행 보기</button></div>`}
function page(){
  if(mode()==='status') return statusPage();
  const n=Object.keys(O.lines).length,v2w=UI.cat==='w'&&CAT.v2;
  return `<div class="ord ${n?'hasbar':''}">${top()}${pendCard()}<div class="ogrid">
   <div class="oleft">${heroCard()}${sentCard()}${budgetCard()}${dueCard()}${fbCard()}</div>
   <div class="omain"><div class="ocard">
     <div class="oseg" role="tablist">${cats().map(c=>`<button role="tab" aria-selected="${UI.cat===c.id}" data-cat="${c.id}" class="${UI.cat===c.id?'on':''}">${c.nm}</button>`).join('')}</div>
     <input class="osearch" id="oq" type="search" placeholder="${CATS.find(c=>c.id===UI.cat).nm} 검색 (이름 · 거래처${v2w?' · 수입사':''})" value="${e(UI.q)}" autocomplete="off">
     ${UI.cat==='w'?`<button class="wxbtn" data-act="wxl"><span class="wxic">XLS</span><span><b>엑셀로 담기</b><small>점장님 발주 엑셀을 올리면 품목표와 맞춰 드려요</small></span><span class="wxgo">›</span></button>`:''}<div class="ofil"><button data-fil="usual" class="${UI.fil==='usual'?'on':''}">우리 지점 평소 품목</button><button data-fil="all" class="${UI.fil==='all'?'on':''}">전체</button></div>
     ${v2w?`<div class="ov2n">단가는 VAT 별도 · 마진 ${Math.round(CAT.hold*100)}% 미만은 <b>보류</b>(제출은 되고 서포트센터가 확인) · 거래처는 시트 기준으로 자동으로 나눠요</div>`:''}
     <div class="ohd"><span>품목 · 규격</span><span>거래처</span><span style="text-align:right">평소</span><span style="text-align:right">수량</span></div>
     <div id="olist">${listHTML()}</div>
     ${UI.cat!=='w'?`<button class="obtn line" data-act="custom" style="margin-top:12px;min-height:46px;font-size:14px">＋ 목록에 없는 것 담기</button>`:`<div class="osub" style="margin-top:10px">와인은 목록에 있는 것만 담을 수 있어요 (주류 거래 규정).</div>`}
     <div class="okbd">PC 키보드: <b>/</b> 검색 · 숫자 칸에 바로 입력 · <b>Enter</b> 다음 품목 · <b>Tab</b> 이동 · <b>Esc</b> 닫기</div>
   </div></div>
   <aside class="ocart ocard" id="ocart" aria-label="담은 것"><div class="ocb"></div></aside>
  </div></div>
  <button class="ocartbar" id="ocbar" data-act="cart" style="${n?'':'display:none'}"></button>`;
}
function list(){const q=UI.q.trim().toLowerCase();const v2w=UI.cat==='w'&&CAT.v2;
  let l=v2w?CAT.items.slice():IT.filter(i=>i.cat===UI.cat&&inStore(i));
  if(UI.fil==='usual'&&!q)l=l.filter(i=>usualOf(i)||(i.tap||[]).includes(store().id)||O.lines[i.id]);
  if(q)l=l.filter(i=>(i.name+' '+(i.en||'')+' '+(i.supn||SUPN(i.sup))+' '+(i.spec||'')).toLowerCase().includes(q));
  const cu=Object.values(O.custom).filter(c=>c.cat===UI.cat&&c.cu&&!(v2w&&catOf(c)));
  return cu.concat(l.sort((a,b)=>(usualOf(b)?1:0)-(usualOf(a)?1:0)))}
function listHTML(){const l=list();if(!l.length)return `<div class="oempty">찾는 품목이 없어요.<br>‘＋ 목록에 없는 것 담기’나 ‘불편한 점 보내기’로 알려 주세요.</div>`;
  const LIM=UI.q?150:120;
  return l.slice(0,LIM).map(i=>{const q=O.lines[i.id]||0,u=usualOf(i);const unit=i.unit&&!/^ea$/i.test(i.unit)?i.unit:'';
   const p=i.srv?pr(i.id):null;const sp=i.srv?supTxt(i):(SUPN(i.sup)||i.supn||'');const blk=p&&p.block&&!q;
   return `<div class="oit ${q?'':'z'} ${blk?'blk':''}" data-id="${e(i.id)}"><div class="g"><div class="n">${e(i.name)}</div>
    <div class="d"><span class="otg h-sup">${e(sp)}</span>${i.force?`<span class="otg">${e(i.force)}로 발주</span>`:''}${mdTag(p)}${(i.tap||[]).includes(store().id)?'<span class="otg tap">지금 탭</span>':''}${i.cu?'<span class="otg">직접 추가</span>':''}${i.srv?'':`<span class="h-spec">${e(i.spec||'')}</span>`}${u?`<span class="ou">평소 ${u}${unit}</span>`:''}</div>${pxLine(p)}${p&&p.block?`<div class="oblr">${e((p.c.md&&p.c.md.memo)||p.md+' 품목이라 담을 수 없어요')}</div>`:''}</div>
    <span class="c-sup">${e(sp)}</span><span class="c-us">${u?u+unit:'–'}</span>
    ${blk?`<span class="oblk">못 담아요</span>`:`<button class="oadd" data-add="${e(i.id)}" aria-label="${e(i.name)} 담기">담기</button>`}
    <div class="ost"><button data-d="-1" aria-label="${e(i.name)} 빼기" tabindex="-1">−</button><input class="oq" inputmode="numeric" pattern="[0-9]*" value="${q||''}" placeholder="0" aria-label="${e(i.name)} 수량" data-q="${e(i.id)}"><button data-d="1" aria-label="${e(i.name)} 더하기" tabindex="-1">+</button></div></div>`}).join('')
   +(l.length>LIM?`<div class="omore2">${l.length-LIM}개 더 있어요 · 이름으로 검색해 주세요</div>`:'')}
function cartHTML(editable){const ids=Object.keys(O.lines);
  if(!ids.length)return `<div class="oh">담은 것</div><div class="oempty" style="padding:30px 0">아직 비어 있어요.<br>‘지난주처럼 담기’를 누르면 한 번에 담겨요.</div>`;
  const over=overCats();
  return `<div class="oh">담은 것 ${ids.length}개 <small>거래처별로 나눠서 보내요</small></div><div class="ocitems">
  ${sups().map(sid=>`<div class="ogl">${e(SUPN(sid))}${OD.sups[sid]&&OD.sups[sid][1]?` · ${e(OD.sups[sid][1])}`:''}</div>${ids.filter(id=>(lineItem(id)||{}).sup===sid).map(id=>{const it=lineItem(id),p=pr(id);
    return `<div class="oln"><span>${e(it.name)}${p?`<small class="ocp">${p.cost?won(p.cost):'단가 없음'}${p.m!=null?` · 마진 ${Math.floor(p.m*100)}%`:''}${p.hold?` · <b>${p.low?'보류':e(p.md)}</b>`:''}</small>`:''}</span>${editable?`<div class="ost"><button data-d="-1" data-for="${e(id)}" aria-label="빼기">−</button><input class="oq" inputmode="numeric" value="${O.lines[id]}" data-q="${e(id)}" aria-label="${e(it.name)} 수량"><button data-d="1" data-for="${e(id)}" aria-label="더하기">+</button></div>`:`<b>${O.lines[id]}</b>`}</div>`}).join('')}`).join('')}</div>
  ${totHTML(wineTot())}
  ${editable?`<div class="ocfoot">${submitForm(over)}</div>`:''}`}
function submitForm(over){return `${over.length?(isMgr()?`<div class="onote r"><b>평소보다 많이 담았어요.</b> 막지 않아요. 이유 한 줄을 적으면 서포트센터가 보고 정해요.</div><div class="olbl">이유 한 줄 (${over.map(c=>c.nm).join(' · ')})</div><input class="ofield" id="owhy" placeholder="예: 토요일 대관 60명" value="${e(O.why||'')}">`
   :`<div class="onote r">평소보다 많이 담았어요. 점장님과 확인하고 제출해 주세요.</div>`):cats().some(c=>band(c.id)==='tol')?`<div class="onote y">평소보다 조금 많아요 (+3% 넘음). 그대로 제출해도 돼요.</div>`:''}
  <div class="olbl">서포트센터에 남길 말 (선택)</div><input class="ofield" id="omemo" placeholder="예: 굴은 금요일 오전 도착으로" value="${e(O.memo||'')}">
  ${SUB.err?`<div class="onote r"><b>아직 못 보냈어요.</b> 담은 건 이 기기에 그대로 있어요. 인터넷을 확인하고 다시 보내기를 눌러 주세요.<small class="oerr">${e(SUB.err)}</small></div>`:''}
  <button class="obtn" data-act="submit" style="margin-top:12px" ${SUB.busy?'disabled':''}>${SUB.busy?'보내는 중…':SUB.err?'다시 보내기':over.length&&isMgr()?'이유와 함께 제출하기':'제출하기'}</button>
  <div class="osub oc onar" style="margin-top:8px">${isMgr()?'제출하면 서포트센터가 확인하고 거래처에 넣어요':'제출하면 점장님과 서포트센터가 같이 봐요'} · 담는 중엔 이 기기에 자동 저장</div>`}
function refreshSide(){
  cats().forEach(c=>{const b=$o('#ob_'+c.id);if(b)b.innerHTML=budgetRow(c)});
  const n=Object.keys(O.lines).length;
  document.querySelectorAll('.ocb').forEach(cb=>{if(!cb.offsetParent&&cb.id!=='oscart')return;const ae=document.activeElement;if(ae&&cb.contains(ae)&&/INPUT|TEXTAREA/.test(ae.tagName))return;
    const wv=cb.querySelector('#owhy'),mv=cb.querySelector('#omemo');const w=wv&&wv.value,m=mv&&mv.value;cb.innerHTML=cartHTML(true);
    if(w!=null&&cb.querySelector('#owhy'))cb.querySelector('#owhy').value=w;if(m!=null&&cb.querySelector('#omemo'))cb.querySelector('#omemo').value=m});
  const bar=$o('#ocbar');if(bar){bar.style.display=n?'':'none';const ov=overCats().length,tol=cats().some(c=>band(c.id)==='tol');bar.className='ocartbar '+(ov?'over':tol?'tol':'');
    const t=CAT.v2?wineTot():null;
    bar.innerHTML=`<div><div class="t">${n}개 품목 담음${t&&t.n?` · 와인 ${t.b}병`:''}</div><div class="v">${SUB.err?'아직 못 보냈어요 · 다시 보내기':ov?'평소보다 많이 담음':tol?'평소보다 조금 많아요':t&&t.n?`공급가 ${won(t.sup)}원 (VAT 별도)`:'다음: 확인하고 제출'}</div></div><span class="go">담은 것 보기</span>`}
  const o=$o('.ord');if(o)o.classList.toggle('hasbar',!!n);
  if(!n&&!$o('.oleft .ocard.pine')){const l=$o('.oleft');if(l)l.insertAdjacentHTML('afterbegin',heroCard())}
  if(n){const h=$o('.oleft .ocard.pine');if(h)h.remove()}
}
function setQ(id,v){v=Math.max(0,Math.min(999,Math.round(+v||0)));const p=pr(id);if(p&&p.block&&v>(O.lines[id]||0)){otoast(((p.c.md&&p.c.md.memo)||p.md+' 품목이라 담을 수 없어요'));v=O.lines[id]||0}
  if(v){O.lines[id]=v;if(id[0]==='K')ensureCustom(id)}else delete O.lines[id];oSave();
  document.querySelectorAll(`.oit[data-id="${CSS.escape(id)}"]`).forEach(r=>{r.classList.toggle('z',!v);const inp=r.querySelector('.oq');if(inp&&document.activeElement!==inp)inp.value=v||''});refreshSide()}
function likeLast(){const prev=JSON.stringify(O);IT.filter(i=>inStore(i)&&usualOf(i)&&cats().some(c=>c.id===i.cat)).forEach(i=>{O.lines[i.id]=usualOf(i)});if(CAT.v2)migrateV2();oSave();draw();otoast(`평소 수량으로 ${Object.keys(O.lines).length}개 담았어요`,prev,6000)}
function openCart(){sheet(`<div class="ocb" id="oscart">${cartHTML(true)}</div>`)}
function openCustom(){sheet(`<div class="oh">목록에 없는 것 담기</div><div class="osub" style="margin-top:4px">서포트센터가 확인하고 목록에 넣어요.</div>
  <div class="olbl">품목 이름</div><input class="ofield" id="cu_n" placeholder="예: 위생장갑 L 200매">
  <div class="olbl">수량</div><input class="ofield" id="cu_q" inputmode="numeric" value="1">
  <div class="olbl">살 곳 · 링크 (선택)</div><input class="ofield" id="cu_l" placeholder="쿠팡 · 네이버 링크 또는 거래처 이름">`,
  `<button class="obtn line" data-x style="flex:1">닫기</button><button class="obtn" id="cu_ok" style="flex:2">담기</button>`);
  $o('#osheet [data-x]').onclick=closeSheet;
  $o('#cu_ok').onclick=()=>{const n=$o('#cu_n').value.trim();if(!n){$o('#cu_n').focus();return}const id='C'+Date.now();
    O.custom[id]={id,cat:UI.cat,name:n,spec:$o('#cu_l').value.trim(),unit:'',sup:'CU',supn:'직접 추가',usual:{},tap:[],st:'1234',cu:1};
    O.lines[id]=Math.max(1,+$o('#cu_q').value||1);oSave();closeSheet();draw();otoast('담았어요')}}

/* 제출: 분류(식자재 · 소모품 · 와인)마다 order.submit 한 번. reqId 같으면 서버가 같은 결과(멱등) → 실패해도 같은 reqId로 다시 보내기 */
async function submit(){if(SUB.busy)return;const over=overCats();const w=$o('#owhy');
  if(isMgr()&&over.length){const why=(w&&w.value.trim())||O.why||'';if(!why){if(w){w.focus();w.style.borderColor='#C2283A'}otoast('이유 한 줄을 적어 주세요');return}O.why=why}else O.why='';
  const m=$o('#omemo');if(m)O.memo=m.value.trim();oSave();
  const s=store(),memo=[over.length&&O.why?`이번 주만 늘려 주세요(${over.map(c=>c.nm).join('·')}): ${O.why}`:'',O.memo].filter(Boolean).join(' / ');
  const by={};Object.keys(O.lines).forEach(id=>{const it=lineItem(id);if(!it)return;(by[it.cat]=by[it.cat]||[]).push(id)});
  SUB.busy=1;SUB.err='';refreshSide();let holds=0,okN=0,toMgr=0;
  for(const c of ['f','s','w']){const ids=by[c];if(!ids||!ids.length)continue;
    const lines=ids.map(id=>{const it=lineItem(id);return {key:keyOf(id),name:it.name,qty:O.lines[id],memo:it.cu&&it.spec?it.spec:'',supplier:it.supn||SUPN(it.sup)||'',cat:CATKO[c]}});
    try{const d={store:s.nm,week:WK.iso,cat:CATKO[c],reqId:`${O.did}-${c}${O.rq[c]||''}`,memo,lines};if(mgrRole()&&!isMgr()&&isAdm())d._testCrew=true;const r=await call('order.submit',d);
      if(/점장/.test(r.status||''))toMgr=1;O.rq[c]=(O.rq[c]||0)+1;holds+=(r.holds||[]).length;okN++;ids.forEach(id=>{delete O.lines[id]});oSave()}
    catch(er){SUB.err=emsg(er)||'연결이 불안정해요';break}}
  SUB.busy=0;
  if(SUB.err){oSave();draw();otoast('아직 못 보냈어요 · 담은 건 그대로 있어요',null,5000);return}
  O=newDraft();oSave();closeSheet();UI.mode='status';draw();scrollTo(0,0);
  otoast(toMgr?'점장님께 보냈어요 · 점장님이 확인하면 서포트센터로 가요':`제출했어요 · 서포트센터로 갔어요${holds?` · 보류 ${holds}개는 서포트센터가 확인해요`:''}`,null,6000);loadMine(1)}

/* 낸 발주 화면 (order.mine) */
function poRow(po){const st=stOf(po),n=po.lines.length,t=po.totals||{},old=po.week!==WK.iso;const g={};po.lines.forEach(l=>{(g[l.sup||'거래처 미정']=g[l.sup||'거래처 미정']||[]).push(l)});
  return `<div class="opo ${st.k===-1?'cx':''}"><div class="osup"><div class="g"><div class="n">${e(po.cat||'발주')} · ${n}개 품목${isTest(po)?' <span class="otg">TEST</span>':''}</div>
    <div class="d">${old?`${e(po.week)} · `:''}제출 ${e(fmtAt(po.submittedAt))}${po.memo?` · ${e(po.memo)}`:''}</div></div><span class="ost2 ${st.c}">${st.lab}</span></div>
   ${st.k===1?`<div class="onote">점장님이 확인하면 서포트센터로 가요. 확인 전에는 취소하고 고칠 수 있어요.</div>`:''}
   ${st.k===-2?`<div class="onote r"><b>점장님이 돌려보냈어요</b>${po.reason?` · ${e(po.reason)}`:''}</div>`:''}
   ${CAT.v2&&t.supply?`<div class="opx"><span>공급가 ${won(t.supply)}</span><span>VAT 포함 ${won(t.total||t.supply*1.1)}</span>${t.sale?`<span>판매가 ${won(t.sale)}</span>`:''}</div>`:''}
   <details class="opod"><summary>품목 보기</summary>${Object.entries(g).map(([sp,L])=>`<div class="ogl">${e(sp)}</div>${L.map(l=>`<div class="oln"><span>${e(l.name)}${/보류|품절|빠짐/.test(l.status)?` <span class="otg wxo">${e(l.status)}</span>`:''}</span><b>${l.qty}</b></div>`).join('')}`).join('')}</details>
   ${st.k>0&&st.k<5?`<div class="opoa">${st.k<=2?`<button class="obtn sm line" data-cx="${e(po.poId)}">취소하고 고치기</button>`:''}${st.k>=2?`<button class="obtn sm ${st.k===4?'':'line'}" data-rx="${e(po.poId)}">도착 확인</button>`:''}</div>`:''}
   ${st.k===-2?`<div class="opoa">${redone(po.poId)?'<span class="osub">다시 담았어요</span>':`<button class="obtn sm" data-redo="${e(po.poId)}">다시 담기</button>`}</div>`:''}</div>`}
function statusPage(){const L=livePos(),wk=SV.pos.filter(p=>p.week===WK.iso),prev=SV.pos.filter(p=>p.week!==WK.iso&&stOf(p).k>0&&stOf(p).k<5);
  const cur=L.length?Math.min(...L.map(p=>stOf(p).k)):0,all=L.length&&L.every(p=>stOf(p).k===5);
  const head=SV.st===1&&!SV.pos.length?`<div class="osub">불러오는 중…</div><div class="obig">낸 발주를<br>가져오고 있어요</div>`
   :all?`<div class="odone">✓</div><div class="obig oc">이번 주 입고 끝</div><div class="osub oc">다르게 온 건 서포트센터가 거래처에 챙겨요</div>`
   :!L.length?`<div class="osub">${store().nm} · 이번 주</div><div class="obig">이번 주 낸 발주가<br>아직 없어요</div>`
   :`<div class="osub">${store().nm} · 발주 ${L.length}건 · ${L.reduce((a,p)=>a+p.lines.length,0)}개 품목</div><div class="obig">${cur===1?'점장님 확인을<br>기다리고 있어요':cur<=2?'제출했어요.<br>서포트센터가 확인하고 있어요':cur===3?'서포트센터가 확인했어요.<br>거래처 확인을 기다려요':'물건이 오고 있어요.<br>도착하면 눌러 주세요'}</div>`;
  const sup={};L.forEach(p=>p.lines.forEach(l=>{const k=l.sup||'거래처 미정';(sup[k]=sup[k]||[]).push(l)}));
  return `<div class="ord">${top()}${pendCard()}<div class="ogrid"><div class="oleft">
   <div class="ocard ${all?'':'pine'}">${head}${L.length?stepsHTML(all?6:cur+1):''}
    <button class="obtn ${all?'line':'w'}" data-mode="cart" style="margin-top:12px">${L.length?'더 담기 (추가 발주)':'담으러 가기'}</button></div></div>
   <div class="omain">
    ${SV.st===3?`<div class="onote r"><b>진행 상황을 못 불러왔어요.</b> 인터넷을 확인하고 다시 시도해 주세요.<small class="oerr">${e(SV.err)}</small><button class="obtn sm line" data-act="reload" style="margin-top:8px">다시 시도</button></div>`:''}
    ${wk.some(p=>stOf(p).k===-2&&!redone(p.poId))?`<div class="onote r" style="margin:0 0 12px"><b>점장님이 돌려보낸 발주가 있어요.</b> 사유를 보고 다시 담아 주세요.</div>`:''}
    <div class="ocard"><div class="oh">이번 주 발주 <button class="olink" data-act="reload">${SV.st===1?'불러오는 중…':'새로고침'}</button></div>
     ${wk.length?wk.map(poRow).join(''):`<div class="oempty" style="padding:20px 0">${SV.st===1?'불러오는 중…':'이번 주에 낸 발주가 없어요'}</div>`}</div>
    ${prev.length?`<div class="ocard"><div class="oh">지난 발주 <small>아직 도착 확인 전</small></div>${prev.map(poRow).join('')}</div>`:''}
    ${fbCard()}</div>
   <aside class="ocart ocard" aria-label="제출한 것"><div class="oh">제출한 것 <small>거래처별</small></div><div class="ocitems">${Object.keys(sup).length?Object.entries(sup).map(([k,ls])=>`<div class="ogl">${e(k)}</div>${ls.map(l=>`<div class="oln"><span>${e(l.name)}</span><b>${l.qty}</b></div>`).join('')}`).join(''):'<div class="oempty" style="padding:20px 0">아직 없어요</div>'}</div></aside>
  </div></div>`}
function idOfLine(l,c){if(c==='w'){if(CAT.v2&&CAT.by['K'+l.key]){ensureCustom('K'+l.key);return 'K'+l.key}const loc=locN()[WM.norm(l.name)];if(loc)return loc.id}
  if(ITEM[l.key])return l.key;const f=IT.find(i=>i.cat===c&&i.name===l.name);if(f)return f.id;
  const id='C'+Date.now()+Math.random().toString(36).slice(2,5);O.custom[id]={id,cat:c,name:l.name,spec:'',unit:'',sup:'CU',supn:'직접 추가',usual:{},tap:[],st:'1234',cu:1};return id}
const RDK='tsb_ord_redone';function redone(id){try{return (JSON.parse(localStorage.getItem(RDK)||'[]')).includes(id)}catch(_){return false}}
function redoPo(poId){const po=SV.pos.find(p=>p.poId===poId);if(!po)return;const c=CATID[po.cat]||'f';po.lines.forEach(l=>{if(!(+l.qty>0))return;const id=idOfLine(l,c);O.lines[id]=Math.min(999,(O.lines[id]||0)+l.qty)});oSave();
  try{const a=JSON.parse(localStorage.getItem(RDK)||'[]');a.push(poId);localStorage.setItem(RDK,JSON.stringify(a.slice(-50)))}catch(_){}
  UI.mode='cart';draw();scrollTo(0,0);otoast('담기 화면으로 돌려놨어요 · 고쳐서 다시 제출해 주세요')}
async function cancelPo(poId){const po=SV.pos.find(p=>p.poId===poId);if(!po)return;if(!await ask('이 발주를 취소할까요?\n담은 품목은 담기 화면으로 돌아와요.'))return;
  try{await call('order.cancel',{poId});const c=CATID[po.cat]||'f';po.lines.forEach(l=>{const id=idOfLine(l,c);O.lines[id]=Math.min(999,(O.lines[id]||0)+l.qty)});if(po.memo&&!O.memo)O.memo=po.memo;oSave();
    po.status='취소';UI.mode='cart';draw();otoast('취소했어요 · 담기 화면으로 돌려놨어요');loadMine(1)}
  catch(er){otoast('취소하지 못했어요 · '+emsg(er),null,5000)}}

/* 크루 발주 → 점장 확인 (order.pending / approve / reject) */
const PD2={st:0,pos:[],sid:'',p:null,no:0};
function loadPend(force){if(!mgrRole()||!isMgr())return Promise.resolve();const s=store();if(PD2.st===1&&PD2.sid===s.id)return PD2.p;if(!force&&PD2.st===2&&PD2.sid===s.id&&Date.now()-PD2.at<3e4)return Promise.resolve();
  if(PD2.sid!==s.id)PD2.pos=[];PD2.st=1;PD2.sid=s.id;
  const p=PD2.p=call('order.pending',{store:s.nm}).then(j=>{if(PD2.p!==p)return;PD2.pos=(j.pos||[]).map(normPo);PD2.st=2;PD2.at=Date.now();PD2.no=0})
   .catch(er=>{if(PD2.p!==p)return;PD2.st=3;PD2.pos=[];if(/FORBID|권한/i.test(String(er&&er.message||'')))PD2.no=1}).then(()=>softDraw());return p}
function pendCard(){if(!mgrRole()||!isMgr()||PD2.sid!==store().id||!PD2.pos.length)return '';const L=PD2.pos;
  return `<div class="ocard opk"><div class="oh"><span><i class="opkd"></i>크루 발주 확인 ${L.length}건</span><small>확인하면 서포트센터로 가요</small></div>
   ${L.map(p=>`<button class="opkr" data-pk="${e(p.poId)}"><div class="g"><div class="n">${e(p.cat||'발주')} · ${p.lines.length}개 품목${isTest(p)?' <span class="otg">TEST</span>':''}</div><div class="d">${e(p.submittedBy||'크루')} · ${e(fmtAt(p.submittedAt))}${p.memo?` · ${e(p.memo)}`:''}</div></div><span class="obtn sm">확인</span></button>`).join('')}</div>`}
let PK={};
function openPk(poId){const po=PD2.pos.find(p=>p.poId===poId);if(!po)return;PK={po,q:{},rej:0,reason:'',memo:'',busy:0,err:''};po.lines.forEach(l=>PK.q[l.lineId]=+l.qty||0);drawPk()}
function drawPk(){const po=PK.po;if(!po)return;const left=po.lines.filter(l=>PK.q[l.lineId]>0).length,ch=po.lines.filter(l=>PK.q[l.lineId]!==(+l.qty||0)).length;
  const g={};po.lines.forEach(l=>{(g[l.sup||'거래처 미정']=g[l.sup||'거래처 미정']||[]).push(l)});
  const body=`<div class="oh">크루 발주 확인${isTest(po)?' <small>TEST</small>':''}</div><div class="osub" style="margin:4px 0 6px">${e(po.submittedBy||'크루')} · ${e(fmtAt(po.submittedAt))} · ${e(po.cat||'')} ${po.lines.length}개 품목</div>
   ${po.memo?`<div class="onote" style="margin:4px 0 8px">남긴 말 · ${e(po.memo)}</div>`:''}
   <div class="osub" style="margin:2px 0 4px">수량을 고칠 수 있어요. 0으로 하면 빠져요.</div>
   <div id="opkl">${Object.entries(g).map(([sp,L])=>`<div class="ogl">${e(sp)}</div>${L.map(l=>{const q=PK.q[l.lineId],o=+l.qty||0;return `<div class="oln ${q?'':'off'}"><span>${e(l.name)}${q!==o?`<small class="ocp">${q?`원래 ${o} → ${q}`:'빼기'}</small>`:''}</span><div class="ost"><button data-pq="-1" data-for="${e(l.lineId)}" aria-label="빼기">−</button><input class="opq" inputmode="numeric" value="${q}" data-pqi="${e(l.lineId)}" aria-label="${e(l.name)} 수량"><button data-pq="1" data-for="${e(l.lineId)}" aria-label="더하기">+</button></div></div>`}).join('')}`).join('')}</div>
   ${PK.rej?`<div class="olbl">돌려보내는 이유 (꼭 적어 주세요)</div><input class="ofield" id="opkr" placeholder="예: 깐마늘은 이번 주 재고 있어요" value="${e(PK.reason)}">`
     :`<div class="olbl">서포트센터에 남길 말 (선택)</div><input class="ofield" id="opkm" placeholder="예: 수량 줄였어요" value="${e(PK.memo)}">`}
   ${!left&&!PK.rej?`<div class="onote r">모두 빼면 보낼 수 없어요. 돌려보내기를 써 주세요.</div>`:''}
   ${PK.err?`<div class="onote r">${e(PK.err)}</div>`:''}`;
  const foot=PK.rej?`<button class="obtn line" id="pk_back" style="flex:1" ${PK.busy?'disabled':''}>이전</button><button class="obtn opkx" id="pk_rej" style="flex:2" ${PK.busy?'disabled':''}>${PK.busy?'보내는 중…':'돌려보내기'}</button>`
    :`<button class="obtn line" id="pk_rj" style="flex:1" ${PK.busy?'disabled':''}>돌려보내기</button><button class="obtn" id="pk_ok" style="flex:2" ${PK.busy||!left?'disabled':''}>${PK.busy?'보내는 중…':ch?`고쳐서 보내기 (${ch}줄)`:'확인하고 보내기'}</button>`;
  sheet(body,foot);const sh=$o('#osheet');
  sh.querySelectorAll('[data-pq]').forEach(b=>b.onclick=()=>{const id=b.dataset.for;PK.q[id]=Math.max(0,Math.min(999,(PK.q[id]||0)+(+b.dataset.pq)));keepPk();drawPk()});
  sh.querySelectorAll('[data-pqi]').forEach(i=>i.onchange=()=>{PK.q[i.dataset.pqi]=Math.max(0,Math.min(999,+i.value.replace(/[^0-9]/g,'')||0));keepPk();drawPk()});
  const m=$o('#opkm');if(m)m.oninput=()=>PK.memo=m.value;const r=$o('#opkr');if(r){r.oninput=()=>PK.reason=r.value;setTimeout(()=>r.focus(),30)}
  const ok=$o('#pk_ok');if(ok)ok.onclick=approvePk;const rj=$o('#pk_rj');if(rj)rj.onclick=()=>{PK.rej=1;PK.err='';drawPk()};
  const bk=$o('#pk_back');if(bk)bk.onclick=()=>{PK.rej=0;PK.err='';drawPk()};const rx=$o('#pk_rej');if(rx)rx.onclick=rejectPk}
function keepPk(){const m=$o('#opkm');if(m)PK.memo=m.value;const r=$o('#opkr');if(r)PK.reason=r.value}
const pkErr=er=>{const m=String(er&&er.message||'');return /EMPTY/.test(m)?'모두 빼면 보낼 수 없어요. 돌려보내기를 써 주세요.':/STATE/.test(m)?'이미 처리된 발주예요. 새로고침했어요.':'아직 못 보냈어요. 다시 눌러 주세요. ('+emsg(er)+')'};
async function approvePk(){if(PK.busy)return;keepPk();const po=PK.po;const ch=po.lines.filter(l=>PK.q[l.lineId]!==(+l.qty||0)).map(l=>({lineId:l.lineId,qty:PK.q[l.lineId]}));
  PK.busy=1;PK.err='';drawPk();const d={poId:po.poId};if(ch.length)d.lines=ch;if(PK.memo.trim())d.memo=PK.memo.trim();
  try{await call('order.approve',d);PK={};closeSheet();PD2.pos=PD2.pos.filter(p=>p.poId!==po.poId);draw();otoast('확인했어요 · 서포트센터로 보냈어요',null,5000);loadPend(1);loadMine(1)}
  catch(er){PK.busy=0;PK.err=pkErr(er);if(/STATE/.test(String(er&&er.message)))loadPend(1);drawPk()}}
async function rejectPk(){if(PK.busy)return;keepPk();const why=PK.reason.trim();if(!why){PK.err='돌려보내는 이유를 적어 주세요.';drawPk();return}const po=PK.po;
  PK.busy=1;PK.err='';drawPk();
  try{await call('order.reject',{poId:po.poId,reason:why});PK={};closeSheet();PD2.pos=PD2.pos.filter(p=>p.poId!==po.poId);draw();otoast('돌려보냈어요 · 크루 화면에 이유가 보여요',null,5000);loadPend(1);loadMine(1)}
  catch(er){PK.busy=0;PK.err=pkErr(er);if(/STATE/.test(String(er&&er.message)))loadPend(1);drawPk()}}

/* 입고 확인: 다 맞아요 / 차이 → 거래명세표 사진 · 엑셀 · PDF(선택) → order.receive */
let RX={};
function openRx(poId){const po=SV.pos.find(p=>p.poId===poId);if(!po)return;RX={po,bad:{},step:1,file:null,busy:0,err:'',rid:'R'+Date.now().toString(36)};drawRx()}
function drawRx(){const po=RX.po;if(!po)return;const nb=Object.keys(RX.bad).length;
  if(RX.step===1){const g={};po.lines.forEach(l=>{(g[l.sup||'거래처 미정']=g[l.sup||'거래처 미정']||[]).push(l)});
    sheet(`<div class="oh">${e(po.cat||'발주')} 도착 확인${isTest(po)?' <small>TEST</small>':''}</div><div class="osub" style="margin:4px 0 8px">맞으면 아래 버튼 한 번. 다르게 온 줄만 눌러 주세요.</div>
    ${Object.entries(g).map(([sp,L])=>`<div class="ogl">${e(sp)}</div>${L.map(l=>{const b=RX.bad[l.lineId];return `<button class="orx ${b?'bad':''}" data-t="${e(l.lineId)}"><span class="ck">${b?'✕':'✓'}</span><span style="flex:1">${e(l.name)}</span><b>${l.qty}</b></button>${b?`<div class="ors">${['안 옴','덜 옴','불량','다른 것'].map(r=>`<button data-r="${r}" data-for="${e(l.lineId)}" class="${b.r===r?'on':''}">${r}</button>`).join('')}</div>${b.r!=='안 옴'?`<label class="orq"><span>제대로 온 수량</span><input class="ofield" inputmode="numeric" data-rq="${e(l.lineId)}" value="${b.qty}"></label>`:''}`:''}`}).join('')}`).join('')}`,
    `<button class="obtn" id="rx_next">${nb?`${nb}개 다르게 왔어요 · 다음`:'다 맞아요 · 다음'}</button>`);
    const sh=$o('#osheet');
    sh.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const id=b.dataset.t;if(RX.bad[id])delete RX.bad[id];else RX.bad[id]={r:'안 옴',qty:0};drawRx()});
    sh.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{const x=RX.bad[b.dataset.for];x.r=b.dataset.r;if(x.r==='덜 옴'&&!x.qty){const l=po.lines.find(l=>l.lineId===b.dataset.for);x.qty=Math.max(0,(l?l.qty:1)-1)}drawRx()});
    sh.querySelectorAll('[data-rq]').forEach(i=>i.oninput=()=>{i.value=i.value.replace(/[^0-9]/g,'').slice(0,3);RX.bad[i.dataset.rq].qty=+i.value||0});
    $o('#rx_next').onclick=()=>{RX.step=2;drawRx()};return}
  const f=RX.file;
  sheet(`<div class="oh">거래명세표 <small>선택</small></div><div class="osub" style="margin:4px 0 12px">${nb?`${nb}개 다르게 왔어요`:'다 맞게 왔어요'}. 거래명세표가 있으면 같이 올려 주세요.</div>
   ${f?`<div class="orxf1">${f.thumb?`<img class="orxp" src="${f.thumb}" alt="거래명세표 사진">`:`<div class="orxdoc">${e(f.kind)}</div>`}<div class="g"><div class="n">${e(f.name)}</div><div class="osub">${Math.max(1,Math.round(f.size/1024))}KB${f.kind==='사진'?' · 줄여서 보내요':''}</div></div><button class="obtn sm line" data-rf="x">빼기</button></div>`
    :`<div class="orxf"><label class="obtn line"><input type="file" accept="image/*" capture="environment" hidden data-rf="cam">사진 찍기</label><label class="obtn line"><input type="file" accept="image/*" hidden data-rf="alb">앨범에서 고르기</label><label class="obtn line"><input type="file" accept=".xlsx,.xls,.csv,.pdf,application/pdf" hidden data-rf="doc">엑셀 · PDF 파일</label></div>`}
   ${RX.load?`<div class="osub" style="margin-top:8px">사진 준비하는 중…</div>`:''}
   <div class="onote">사진은 서포트센터가 확인해요. 앱에 바로 반영되지 않아도 괜찮아요.</div>
   ${RX.err?`<div class="onote r">${e(RX.err)}</div>`:''}`,
   `<button class="obtn line" id="rx_back" style="flex:1" ${RX.busy?'disabled':''}>이전</button><button class="obtn" id="rx_send" style="flex:2" ${RX.busy||RX.load?'disabled':''}>${RX.busy?'보내는 중…':RX.err?'다시 보내기':f?'입고 확인 보내기':'사진 없이 보내기'}</button>`);
  const sh=$o('#osheet');
  sh.querySelectorAll('input[data-rf]').forEach(i=>i.onchange=()=>{const fl=i.files&&i.files[0];if(fl)pickFile(fl,i.dataset.rf)});
  const x=sh.querySelector('button[data-rf="x"]');if(x)x.onclick=()=>{RX.file=null;drawRx()};
  $o('#rx_back').onclick=()=>{RX.step=1;RX.err='';drawRx()};$o('#rx_send').onclick=sendRx}
function shrink(fl){return new Promise((ok,no)=>{const u=URL.createObjectURL(fl),im=new Image();im.onload=()=>{try{const M=1600,s=Math.min(1,M/Math.max(im.naturalWidth,im.naturalHeight));const w=Math.max(1,Math.round(im.naturalWidth*s)),h=Math.max(1,Math.round(im.naturalHeight*s));
  const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(im,0,0,w,h);URL.revokeObjectURL(u);ok(c.toDataURL('image/jpeg',0.82))}catch(er){URL.revokeObjectURL(u);no(er)}};im.onerror=()=>{URL.revokeObjectURL(u);no(new Error('img'))};im.src=u})}
const readURL=fl=>new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(fl)});
async function pickFile(fl,how){const po=RX.po,d=new Date(),tag=`${isTest(po)?'TEST_':''}거래명세표_${store().nm}_${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;RX.err='';
  try{if(how!=='doc'||/^image\//.test(fl.type)){RX.load=1;drawRx();let url;try{url=await shrink(fl)}catch(_){if(fl.size>8e6)throw new Error('big');url=await readURL(fl)}
      const mime=(url.match(/^data:([^;]+)/)||[])[1]||'image/jpeg';const b64=url.split(',')[1];RX.file={name:tag+(mime==='image/jpeg'?'.jpg':'.'+(fl.name.split('.').pop()||'img')),mime,b64,size:Math.round(b64.length*0.75),kind:'사진',thumb:url}}
    else{if(fl.size>10e6){RX.err='파일이 너무 커요 (10MB까지). 사진으로 찍어 올려 주세요.';return drawRx()}const url=await readURL(fl);const ext=(fl.name.split('.').pop()||'').toLowerCase();
      RX.file={name:tag+'.'+ext,mime:fl.type||(ext==='pdf'?'application/pdf':'application/octet-stream'),b64:url.split(',')[1],size:fl.size,kind:ext==='pdf'?'PDF':'엑셀'}}}
  catch(er){RX.err='파일을 못 읽었어요. 다른 사진이나 파일로 해 주세요.'}
  RX.load=0;drawRx()}
async function sendRx(){if(RX.busy||!RX.po)return;RX.busy=1;RX.err='';drawRx();const po=RX.po;
  const diffs=Object.entries(RX.bad).map(([lineId,b])=>({lineId,qty:b.r==='안 옴'?0:Math.max(0,+b.qty||0),memo:b.r}));
  const d={poId:po.poId,result:diffs.length?'차이':'다맞음',diffs,reqId:RX.rid};if(isTest(po))d.memo='TEST 삭제예정';
  if(RX.file)d.file={name:RX.file.name,mime:RX.file.mime,b64:RX.file.b64};
  try{await call('order.receive',d);const k=diffs.length,hf=!!RX.file;RX={};closeSheet();po.status='입고';draw();otoast(k?`입고 확인했어요 · 다른 ${k}줄은 서포트센터가 챙겨요`:hf?'입고 확인했어요 · 거래명세표는 서포트센터가 확인해요':'입고 확인했어요',null,5000);loadMine(1)}
  catch(er){RX.busy=0;RX.err='아직 못 보냈어요. 고른 내용과 사진은 그대로 있어요. 다시 보내기를 눌러 주세요. ('+emsg(er)+')';drawRx()}}

/* ── 이벤트 ── */
function bind(v){
  v.onclick=ev=>{const t=ev.target.closest('button,[data-act]');if(!t||!v.contains(t))return;
    if(t.dataset.st){UI.store=t.dataset.st;UI.mode=null;SUB.err='';uiSave();oLoad();draw();loadMine(1);loadPend(1);return}
    if(t.dataset.mode){UI.mode=t.dataset.mode;draw();scrollTo(0,0);if(UI.mode==='status')loadMine();return}
    if(t.dataset.view){UI.view=t.dataset.view;if(UI.view==='crew'&&UI.cat==='w')UI.cat='f';uiSave();draw();if(UI.view==='mgr')loadPend(1);return}
    if(t.dataset.cat){UI.cat=t.dataset.cat;UI.q='';uiSave();draw();return}
    if(t.dataset.fil){UI.fil=t.dataset.fil;uiSave();$o('#olist').innerHTML=listHTML();v.querySelectorAll('[data-fil]').forEach(b=>b.classList.toggle('on',b.dataset.fil===UI.fil));return}
    if(t.dataset.add){setQ(t.dataset.add,1);const r=v.querySelector(`.oit[data-id="${CSS.escape(t.dataset.add)}"] .oq`);if(r&&innerWidth>=768)r.focus();return}
    if(t.dataset.d){const id=t.dataset.for||t.closest('[data-id]').dataset.id;setQ(id,(O.lines[id]||0)+(+t.dataset.d));return}
    if(t.dataset.rx){openRx(t.dataset.rx);return}
    if(t.dataset.cx){cancelPo(t.dataset.cx);return}
    if(t.dataset.redo){redoPo(t.dataset.redo);return}
    if(t.dataset.pk){openPk(t.dataset.pk);return}
    const a=t.dataset.act;
    if(a==='like')likeLast();else if(a==='cart')openCart();else if(a==='custom')openCustom();else if(a==='wxl')wxOpen();else if(a==='submit')submit();
    else if(a==='reload'){loadMine(1);draw()}};
  const q=$o('#oq');if(q)q.oninput=()=>{UI.q=q.value;$o('#olist').innerHTML=listHTML()};
  if(q)q.onkeydown=ev=>{if(ev.key==='Enter'){ev.preventDefault();const f=$o('#olist .oq');if(f){f.focus();f.select()}}};
}
/* 숫자 직접 입력 (목록 · 담은 것 · 시트 공통) */
document.addEventListener('input',ev=>{const t=ev.target;if(!t.classList||!t.classList.contains('oq')||!location.hash.startsWith('#/order'))return;t.value=t.value.replace(/[^0-9]/g,'').slice(0,3);setQ(t.dataset.q,t.value)});
document.addEventListener('focusin',ev=>{const t=ev.target;if(t.classList&&t.classList.contains('oq'))setTimeout(()=>t.select(),0)});
document.addEventListener('keydown',ev=>{if(!location.hash.startsWith('#/order'))return;const t=ev.target;
  if(t.classList&&t.classList.contains('oq')){
    if(ev.key==='Enter'||ev.key==='ArrowDown'||ev.key==='ArrowUp'){ev.preventDefault();const all=[...(t.closest('#ocart,.osheet')||$o('#olist')).querySelectorAll('.oq')].filter(x=>x.offsetParent);const i=all.indexOf(t);const n=all[i+(ev.key==='ArrowUp'?-1:1)];if(n){n.focus();n.select()}}
    if(ev.key==='+'||ev.key==='='){ev.preventDefault();setQ(t.dataset.q,(O.lines[t.dataset.q]||0)+1);t.value=O.lines[t.dataset.q]||''}
    if(ev.key==='-'){ev.preventDefault();setQ(t.dataset.q,(O.lines[t.dataset.q]||0)-1);t.value=O.lines[t.dataset.q]||''}
    return}
  if(ev.key==='/'&&!/INPUT|TEXTAREA/.test((t.tagName||''))&&$o('#oq')){ev.preventDefault();$o('#oq').focus()}});
addEventListener('resize',()=>{if(location.hash.startsWith('#/order')&&O&&VIEW&&mode()==='cart')refreshSide();fitCart()});
/* 넓은 화면: 담은 것 패널이 아래 메뉴에 가리지 않게 높이 맞춤 */
let FR=0;function fitCart(){cancelAnimationFrame(FR);FR=requestAnimationFrame(()=>{const c=$o('.ocart');if(!c||innerWidth<768||getComputedStyle(c).display==='none')return;const t=Math.max(76,c.getBoundingClientRect().top);const nav=$o('.nav');const nb=nav?nav.getBoundingClientRect().height:80;c.style.maxHeight=Math.max(420,innerHeight-t-nb-16)+'px'})}
addEventListener('scroll',()=>{if(location.hash.startsWith('#/order'))fitCart()},{passive:true});

/* ── 와인 엑셀로 담기 (2026-11-18 BETA, TOM) ─────────────────────────────
 * 점장님 발주 엑셀 → 와인 품목표와 맞춰서 담기.
 *   초록 = 맞음 · 주황 = 비슷한 걸 찾음(맞아요 눌러야 담김) · 빨강 = 못 찾음(검색 · 빼기)
 * - 엑셀은 이 기기 브라우저 안에서만 읽음(서버로 안 감).
 * - 품목표 wx_wines.js 는 이름 · 거래처 · 상태만(금액 없음). SheetJS wx_xlsx.js. 둘 다 버튼 누를 때만 불러옴.
 * - '맞아요'로 확인한 이름은 이 기기에 기억(tsb_wine_alias_v1) → 다음 엑셀부터 초록.
 * - 되돌리기: 이 블록과 와인 탭의 data-act="wxl" 버튼 줄만 지우면 됨.
 */
const WM=(function(){
  const SYN=[[/chateau|château|ch\.|샤토|샤떼|샤또/g,'샤또'],[/까베르네|카베르네|까쇼|카쇼|cabernet/g,'카베르네'],[/쇼비뇽|쏘비뇽|소비뇽|sauvignon/g,'소비뇽'],
  [/시라즈|쉬라즈|shiraz/g,'쉬라즈'],[/샤르도네이|샤도네이|샤르도네|샤도네|chardonnay/g,'샤르도네'],[/피노누아르|피노누와|피노누아|pinotnoir/g,'피노누아'],
  [/브륏|브룻|브뤼|brut/g,'브뤼'],[/리제르바|리저바|리져브|리저브|레제르바|reserva|reserve/g,'리저브'],[/뀌베|퀴베|cuvee|cuvée/g,'뀌베'],[/블랑|blanc/g,'블랑'],[/로제|rose|rosé/g,'로제'],
  [/메를로|멀롯|메를롯|merlot/g,'메를로'],[/모스카토|모스까또|moscato/g,'모스카토'],[/프로세코|프로세꼬|prosecco/g,'프로세코'],[/샴페인|샹파뉴|champagne/g,'샴페인']];
  function norm(s){s=String(s||'').normalize('NFC').toLowerCase();
    s=s.replace(/\b(19[5-9]\d|20[0-4]\d)\b/g,' ').replace(/\(?\s*750\s*(ml)?\s*\)?/g,' ').replace(/nv\b/g,' ');
    s=s.replace(/\s+/g,'');SYN.forEach(([r,t])=>{s=s.replace(r,t)});return s.replace(/[\s·.,\-_'"’`()\[\]/&+~]/g,'')}
  function vol(s){s=String(s||'');const m=s.match(/(\d{3,4})\s*ml/i)||s.match(/\(\s*(\d{3,4})\s*\)/);return m?m[1]:''}
  function clean(s){s=String(s||'').trim();const memo=[];s=s.replace(/\((고객\s*요청|요청|추가|급|긴급|샘플|행사)\)/g,(a,b)=>{memo.push(b);return ''});return {name:s.replace(/\s+/g,' ').trim(),memo:memo.join(', ')}}
  function vint(s){const m=String(s||'').match(/\b(19[5-9]\d|20[0-4]\d)\b/);return m?m[1]:''}
  function grams(s){const g=new Map();for(let i=0;i<s.length-1;i++){const k=s.slice(i,i+2);g.set(k,(g.get(k)||0)+1)}return g}
  function dice(a,b){if(!a||!b)return 0;if(a===b)return 1;const A=grams(a),B=grams(b);let n=0,ta=0,tb=0;A.forEach(v=>ta+=v);B.forEach(v=>tb+=v);A.forEach((v,k)=>{n+=Math.min(v,B.get(k)||0)});return 2*n/(ta+tb||1)}
  function score(q,c){let d=dice(q,c);if(q.length>=4&&(c.includes(q)||q.includes(c)))d=Math.max(d,0.6+0.4*Math.min(q.length,c.length)/Math.max(q.length,c.length));return d}
  const RANK={'사용':0,'보류':1,'단종':2};
  function index(rows,pref){return rows.map(a=>{const w={id:a[0],name:a[1],name_en:a[2]||'',supplier:a[3]||'',status:a[4]||'사용',inList:!!pref[a[0]]};return {w,n:norm(w.name),ne:w.name_en?norm(w.name_en):'',v:vint(w.name)}})}
  const rk=x=>(RANK[x.w.status]||0)*2+(x.w.inList?0:1);
  function match(name,idx,aliases,opt){
    const q=norm(name),v=vint(name);if(!q)return{color:'red',reason:'품목 이름이 비어 있어요',cands:[]};
    if(aliases[q]){const it=idx.find(x=>x.w.id===aliases[q]);if(it)return fin({color:'green',how:'alias',pick:it.w,cands:[it.w],reason:''},opt)}
    const ex=idx.filter(x=>(x.n===q||x.ne===q)&&(!v||!x.v||x.v===v)).sort((a,b)=>rk(a)-rk(b));
    if(ex.length===1||(ex.length>1&&rk(ex[0])<rk(ex[1])))return fin({color:'green',how:'exact',pick:ex[0].w,cands:ex.map(x=>x.w),reason:v&&!ex[0].v?'빈티지 '+v+' 적혀 있음':''},opt);
    if(ex.length>1)return fin({color:'orange',reason:'같은 이름이 '+ex.length+'개 있어요',pick:ex[0].w,cands:ex.map(x=>x.w).slice(0,3)},opt);
    const sc=idx.map(x=>({x,s:Math.max(score(q,x.n),x.ne?score(q,x.ne):0)-(RANK[x.w.status]||0)*0.03+(x.w.inList?0.02:0)+(opt.sup&&x.w.supplier.includes(opt.sup)?0.03:0)})).sort((a,b)=>b.s-a.s).slice(0,3);
    const top=sc[0];if(!top||top.s<0.5)return{color:'red',reason:'품목표에서 못 찾았어요',cands:sc.filter(c=>c.s>0.3).map(c=>c.x.w)};
    const r={color:'orange',pick:top.x.w,cands:sc.filter(c=>c.s>=0.4).map(c=>c.x.w),reason:'이름이 달라서 비슷한 걸 찾았어요'};
    const qv=vol(name),cv=vol(top.x.w.name);
    if(v&&top.x.v&&v!==top.x.v)r.reason='빈티지가 달라요 ('+v+' → '+top.x.v+')';
    else if(qv&&cv&&qv!==cv)r.reason='용량이 달라요 ('+qv+'ml → '+cv+'ml)';
    else if(!qv&&cv&&cv!=='750')r.reason='용량 확인 ('+cv+'ml 품목)';
    return fin(r,opt)}
  function fin(r,opt){const w=r.pick;r.flags=[];if(!w)return r;
    if(w.status==='단종'&&r.color==='green'){r.color='orange';r.reason='단종으로 표시된 품목이에요'}
    if(opt.sup&&w.supplier&&!w.supplier.includes(opt.sup)&&!opt.sup.includes(w.supplier))r.flags.push('엑셀엔 거래처 '+opt.sup);
    return r}
  return {norm,clean,match,index};
})();
const WX_BASE='https://tapshopbar.github.io/staff/',WX_AKEY='tsb_wine_alias_v1';
const WXC={name:/품목|품명|와인|상품|제품|아이템|name|item|wine/i,qty:/수량|발주|병|qty|개수|주문/i,store:/지점|매장|store/i,sup:/거래처|업체|공급|supplier|vendor/i,memo:/비고|메모|note|요청/i,price:/단가|가격|금액|price/i};
let WX={lines:[],filt:'all',info:'',wb:null,sn:null,err:''};let WXR=null,WIDX=null,WBY={};
function wxAl(){try{return JSON.parse(localStorage.getItem(WX_AKEY)||'{}')}catch(_){return {}}}
function wxJs(src){return new Promise((ok,no)=>{const s=document.createElement('script');s.src=WX_BASE+src;s.onload=ok;s.onerror=()=>no(new Error(src));document.head.appendChild(s)})}
function wxReady(){if(!WXR)WXR=Promise.all([window.XLSX?0:wxJs('wx_xlsx.js?v=1'),window.TSB_WINES?0:wxJs('wx_wines.js?v=1')]).then(()=>{
  const pref={};IT.forEach(i=>{if(i.cat==='w')pref[i.id]=1});WIDX=WM.index(window.TSB_WINES,pref);WIDX.forEach(x=>WBY[x.w.id]=x.w)}).catch(er=>{WXR=null;throw er});return WXR}
const wxSN=s=>String(s.nm||'').replace(/두타$/,'');
function wxHead(rows){const SN=ST.map(wxSN);let best=null;for(let r=0;r<Math.min(rows.length,20);r++){const row=rows[r]||[];const m={};
  row.forEach((v,c)=>{const t=String(v==null?'':v).trim();if(!t||t.length>20)return;for(const k in WXC){if(m[k]==null&&WXC[k].test(t)){if(k==='qty'&&WXC.price.test(t))continue;if(k==='name'&&/no\b|번호/i.test(t))continue;m[k]=c;break}}});
  const wide=SN.map(s=>[s,row.findIndex(v=>String(v==null?'':v).replace(/\s/g,'').startsWith(s))]).filter(x=>x[1]>=0);
  const sc=(m.name!=null?3:0)+(m.qty!=null?2:0)+(wide.length?2:0)+Object.keys(m).length*.1;if(m.name!=null&&(!best||sc>best.sc))best={r,m,wide,sc}}return best}
function wxParse(wb,force){if(wb!==WX.wb)force=null;WX.wb=wb;let pick=null;const sn=wxSN(store());
  for(const n of wb.SheetNames){if(force&&n!==force)continue;const rows=XLSX.utils.sheet_to_json(wb.Sheets[n],{header:1,defval:null,raw:true});const h=wxHead(rows);if(!h)continue;
    const cnt=rows.slice(h.r+1).filter(r=>r&&r[h.m.name]).length;const sc=h.sc*100+cnt+(h.m.store!=null&&!h.wide.length?50:0)+(/발주|주문|order/i.test(n)?500:0)-(/이력|근거|요약|history|기록|참고/i.test(n)?1000:0);
    if(!pick||sc>pick.sc)pick={n,rows,h,sc}}
  if(!pick){WX.err='품목 이름 칸을 못 찾았어요. 맨 위 줄 근처에 "품목" 또는 "와인명" 제목이 있는지 봐 주세요.';WX.lines=[];return wxDraw()}
  WX.err='';const {rows,h}=pick;WX.sn=pick.n;const raw=[];
  for(const r of rows.slice(h.r+1)){if(!r)continue;const nm=r[h.m.name];if(!nm||/합계|소계|total/i.test(String(nm)))continue;
    const b={name:String(nm),sup:h.m.sup!=null?String(r[h.m.sup]||''):'',memo:h.m.memo!=null?String(r[h.m.memo]||''):''};
    if(h.wide.length){const c=h.wide.find(x=>x[0]===sn);if(!c)continue;const q=+r[c[1]]||0;if(q>0)raw.push({...b,qty:q})}
    else{if(h.m.store!=null){const s=String(r[h.m.store]||'');if(s&&!s.includes(sn))continue}const q=h.m.qty!=null?+r[h.m.qty]||0:1;if(q>0)raw.push({...b,qty:q})}}
  const col=i=>XLSX.utils.encode_col(i);
  WX.info=`시트 '${e(pick.n)}' · ${raw.length}줄 · 품목 ${col(h.m.name)}열`+(h.wide.length?` · 수량 '${e(sn)}' 열`:h.m.qty!=null?` · 수량 ${col(h.m.qty)}열`:' · 수량 칸 없음(1병씩)')+(h.m.store!=null&&!h.wide.length?` · ${e(sn)}만`:'');
  const al=wxAl();
  WX.lines=raw.map((r,i)=>{const c=WM.clean(r.name);const sup=r.sup.replace(/㈜|\(주\)|주식회사/g,'').trim();const m=WM.match(c.name,WIDX,al,{sup});
    return {i,raw:r.name,key:WM.norm(c.name),qty:Math.min(999,Math.round(r.qty)),memo:[r.memo,c.memo].filter(Boolean).join(' · '),m,color:m.color,sel:m.pick?m.pick.id:null,state:m.color==='green'?'ok':'ask',q:''}});
  WX.filt='all';wxDraw()}
function wxOpen(){WX={lines:[],filt:'all',info:'',wb:null,sn:null,err:''};
  sheet(`<div id="wxb"></div>`,`<div id="wxf" style="display:flex;gap:8px;width:100%"></div>`);
  const sh=$o('#osheet .osheet');if(sh)sh.classList.add('wxs');wxDraw();
  wxReady().then(()=>{if($o('#wxb'))wxDraw()}).catch(()=>{WX.err='준비 파일을 못 불러왔어요. 인터넷 연결을 확인하고 다시 열어 주세요.';wxDraw()})}
const wxPend=()=>WX.lines.filter(l=>l.state==='ask');
function wxTag(w){return (w.status!=='사용'?`<span class="otg ${w.status==='단종'?'wxr':''}">${e(w.status)}</span>`:'')+(w.inList?'':'<span class="otg">발주 목록 밖</span>')}
function wxItem(l){const w=l.sel?WBY[l.sel]:null;const cls=l.state==='drop'?'x':l.color==='green'?'g':l.color==='orange'?'o':'r';
  let h=`<div class="wxi ${cls}" data-wi="${l.i}"><div class="wxt"><div style="min-width:0;flex:1">`;
  if(l.state==='drop')h+=`<div class="wxn" style="text-decoration:line-through">${e(l.raw)}</div><div class="wxraw">이번엔 뺐어요 · <button class="wxlink" data-wa="undo">되돌리기</button></div>`;
  else if(!w)h+=`<div class="wxn">${e(l.raw)}</div><div class="wxraw">품목표에 없는 이름이에요</div>`;
  else{h+=`<div class="wxn">${e(w.name)}</div>`+(w.name!==l.raw.trim()?`<div class="wxraw">엑셀: <em>${e(l.raw)}</em></div>`:'');
    h+=`<div class="wxtags">`+(l.state==='ok'&&l.color!=='green'?'<span class="otg wxg">확인함 · 다음부터 자동</span>':'')+(l.m.how==='alias'?'<span class="otg wxg">전에 확인한 이름</span>':'')
      +(l.state==='ask'&&l.m.reason?`<span class="otg ${l.color==='red'?'wxr':'wxo'}">${e(l.m.reason)}</span>`:'')+(l.state==='ok'&&l.color==='green'&&l.m.reason?`<span class="otg">${e(l.m.reason)}</span>`:'')
      +(w.supplier?`<span class="otg">${e(w.supplier)}</span>`:'')+wxTag(w)+(l.m.flags||[]).map(f=>`<span class="otg">${e(CAT.v2&&/^엑셀엔 거래처/.test(f)?f+' · 시트 기준 '+(((catOf({cat:'w',name:w.name})||{}).supn)||w.supplier)+'로 보내요':f)}</span>`).join('')+(l.memo?`<span class="otg">메모: ${e(l.memo)}</span>`:'')+`</div>`}
  h+=`</div>`+(l.state!=='drop'?`<div class="ost wxq"><button data-wa="m" aria-label="빼기">−</button><input class="wxqi" inputmode="numeric" value="${l.qty}" aria-label="수량"><button data-wa="p" aria-label="더하기">＋</button></div>`:'')+`</div>`;
  if(l.state==='ask'){const cs=l.m.cands||[];
    h+=`<div class="wxask"><div class="wxq2">${l.color==='red'?'비슷한 이름을 찾아 주세요':'이 품목이 맞나요?'}</div>`
     +cs.map(c=>`<label class="wxc"><input type="radio" name="wxc${l.i}" value="${e(c.id)}" ${c.id===l.sel?'checked':''}><span>${e(c.name)}</span>${wxTag(c)}<small>${e(c.supplier)}</small></label>`).join('')
     +`<input class="ofield wxs2" data-wa="s" placeholder="품목표에서 찾기 (예: 클라우디)" value="${e(l.q)}">`;
    if(l.q){const qn=WM.norm(l.q);const rs=WIDX.filter(x=>x.n.includes(qn)||(x.ne&&x.ne.includes(qn))).sort((a,b)=>((a.w.status==='사용'?0:2)+(a.w.inList?0:1))-((b.w.status==='사용'?0:2)+(b.w.inList?0:1))).slice(0,6);
      h+=rs.map(x=>`<label class="wxc"><input type="radio" name="wxc${l.i}" value="${e(x.w.id)}" ${x.w.id===l.sel?'checked':''}><span>${e(x.w.name)}</span>${wxTag(x.w)}<small>${e(x.w.supplier)}</small></label>`).join('')||'<div class="wxraw" style="padding:6px">검색 결과가 없어요</div>'}
    h+=`<div class="wxacts"><button class="obtn sm" data-wa="ok" ${l.sel?'':'disabled'}>맞아요</button><button class="obtn sm line" data-wa="drop">이번엔 빼기</button></div></div>`}
  return h+`</div>`}
function wxDraw(){const b=$o('#wxb'),f=$o('#wxf');if(!b)return;const osb=b.closest('.osb'),sy=osb?osb.scrollTop:0;
  const head=`<div class="oh">와인 엑셀로 담기 <small>BETA</small></div><div class="osub" style="margin:4px 0 10px">점장님이 쓰던 발주 엑셀을 그대로 올리면 와인 품목표와 맞춰서 담아 드려요. 엑셀은 이 기기 안에서만 읽어요.</div>`;
  if(!WIDX&&!WX.err){b.innerHTML=head+`<div class="oempty">준비하는 중…</div>`;f.innerHTML=`<button class="obtn line" data-wa="close">닫기</button>`;return}
  const up=`<label class="wxdrop"><input type="file" id="wxfile" accept=".xlsx,.xls,.csv" hidden><b>${WX.lines.length?'다른 엑셀 올리기':'엑셀 파일 고르기'}</b><span>.xlsx · .xls · .csv · ${e(store().nm)} 기준</span></label>`;
  const legend=`<div class="wxleg"><span><i class="g"></i>초록 맞음</span><span><i class="o"></i>주황 비슷한 걸 찾음 · 확인</span><span><i class="r"></i>빨강 못 찾음</span></div>`;
  let body=head+up+(WX.err?`<div class="onote r">${e(WX.err)}</div>`:'');
  if(WX.info){const ss=WX.wb&&WX.wb.SheetNames.length>1?` · <select id="wxsh">${WX.wb.SheetNames.map(n=>`<option ${n===WX.sn?'selected':''}>${e(n)}</option>`).join('')}</select>`:'';body+=`<div class="wxinfo">${WX.info}${ss}</div>`}
  if(!WX.lines.length){b.innerHTML=body+legend;f.innerHTML=`<button class="obtn line" data-wa="close">닫기</button>`;wxBind();return}
  const c={g:0,o:0,r:0};WX.lines.forEach(l=>{if(l.state!=='drop')c[l.color==='green'?'g':l.color==='orange'?'o':'r']++});const p=wxPend().length;
  body+=`<div class="wxsum"><button data-wf="green" class="g ${WX.filt==='green'?'on':''}"><b>${c.g}</b>초록 · 맞음</button><button data-wf="orange" class="o ${WX.filt==='orange'?'on':''}"><b>${c.o}</b>주황 · 확인</button><button data-wf="red" class="r ${WX.filt==='red'?'on':''}"><b>${c.r}</b>빨강 · 못 찾음</button></div>`;
  body+=`<div class="wxleft">${WX.filt!=='all'?'<button class="wxlink" data-wf="all">← 전체 보기</button>':p?`확인할 것 <b style="color:#B86500">${p}개</b> 남았어요`:'모두 확인했어요'}</div>`;
  const ord={ask:0,ok:1,drop:2};const L=WX.lines.filter(l=>WX.filt==='all'||l.color===WX.filt).sort((a,b)=>(ord[a.state]-ord[b.state])||((a.color==='red'?0:1)-(b.color==='red'?0:1))||a.i-b.i);
  b.innerHTML=body+L.map(wxItem).join('');
  const ok=WX.lines.filter(l=>l.state==='ok'&&l.qty>0),n=new Set(ok.map(l=>l.sel)).size,bt=ok.reduce((s,l)=>s+l.qty,0);
  f.innerHTML=`<button class="obtn line" data-wa="close" style="flex:1">닫기</button><button class="obtn" data-wa="add" style="flex:2" ${p||!n?'disabled':''}>${p?`확인할 것 ${p}개 남음`:`${n}개 · ${bt}병 담기`}</button>`;
  if(osb)osb.scrollTop=sy;wxBind()}
function wxBind(){const fi=$o('#wxfile');if(fi)fi.onchange=async ev=>{const fl=ev.target.files[0];if(!fl)return;try{await wxReady();wxParse(XLSX.read(await fl.arrayBuffer(),{type:'array'}))}catch(er){WX.err='엑셀을 못 읽었어요. 파일이 열리는지 확인해 주세요.';wxDraw()}};
  const sh=$o('#wxsh');if(sh)sh.onchange=()=>wxParse(WX.wb,sh.value)}
document.addEventListener('click',ev=>{const box=ev.target.closest&&ev.target.closest('#osheet');if(!box||!$o('#wxb'))return;
  const wf=ev.target.closest('[data-wf]');if(wf){WX.filt=WX.filt===wf.dataset.wf?'all':wf.dataset.wf;wxDraw();return}
  const t=ev.target.closest('[data-wa]');if(!t)return;const a=t.dataset.wa;
  if(a==='close'){closeSheet();return}
  if(a==='add'){wxAdd();return}
  const card=t.closest('[data-wi]');if(!card)return;const l=WX.lines[+card.dataset.wi];
  if(a==='m')l.qty=Math.max(0,l.qty-1);else if(a==='p')l.qty=Math.min(999,l.qty+1);
  else if(a==='ok'&&l.sel){l.state='ok';const al=wxAl();al[l.key]=l.sel;localStorage.setItem(WX_AKEY,JSON.stringify(al));otoast('기억했어요 · 다음 엑셀부터 자동으로 맞춰요')}
  else if(a==='drop'){l.prev=l.state;l.state='drop'}else if(a==='undo'){l.state=l.prev||'ask'}else return;wxDraw()});
document.addEventListener('change',ev=>{const t=ev.target;if(!$o('#wxb')||!t.closest)return;const card=t.closest('[data-wi]');if(!card)return;const l=WX.lines[+card.dataset.wi];
  if(t.type==='radio'){l.sel=t.value;wxDraw()}else if(t.classList.contains('wxqi')){l.qty=Math.max(0,Math.min(999,+t.value.replace(/[^0-9]/g,'')||0));wxDraw()}});
document.addEventListener('input',ev=>{const t=ev.target;if(!$o('#wxb')||!t.classList||!t.classList.contains('wxs2'))return;const card=t.closest('[data-wi]');const l=WX.lines[+card.dataset.wi];l.q=t.value;
  const pos=t.selectionStart;card.outerHTML=wxItem(l);const ni=$o(`[data-wi="${l.i}"] .wxs2`);if(ni){ni.focus();try{ni.setSelectionRange(pos,pos)}catch(_){}}});
function wxAdd(){const ok=WX.lines.filter(l=>l.state==='ok'&&l.qty>0);if(!ok.length)return;const prev=JSON.stringify(O);const sum={};
  ok.forEach(l=>{sum[l.sel]=(sum[l.sel]||0)+l.qty});
  let blocked=0;
  Object.entries(sum).forEach(([id,q])=>{if(CAT.v2){const w=WBY[id];const c=w&&catOf({cat:'w',name:w.name});if(c){const p=pr(c.id);if(p&&p.block){blocked++;return}ensureCustom(c.id);O.lines[c.id]=Math.min(999,q);return}}
    if(!ITEM[id]&&!O.custom[id]){const w=WBY[id];const sid=Object.keys(OD.sups).find(k=>OD.sups[k][0]===w.supplier)||w.supplier||'CU';O.custom[id]={id,cat:'w',name:w.name,spec:'엑셀로 담음',unit:'병',sup:sid,supn:w.supplier||'직접 추가',usual:{},tap:[],st:'1234',cu:1}}O.lines[id]=Math.min(999,q)});
  const merged=Object.keys(sum).length<ok.length;
  oSave();closeSheet();UI.cat='w';UI.q='';uiSave();draw();otoast(`와인 ${Object.keys(sum).length-blocked}개 담았어요${merged?' (같은 품목은 합쳤어요)':''}${blocked?` · 판매중지 · 단종 ${blocked}개는 뺐어요`:''}`,prev,7000)}

})();

}catch(_e){console.error('[order.js]',_e)}

;/* ═══ 합침 11/25: order_admin.js (원래 https://tapshopbar.github.io/staff/order_admin.js) · 한 파일이 깨져도 나머지는 돌게 try ═══ */
try{
/* ═══ TSB ORDER · 서포트센터 '발주 관리' (CREW 안, 2026-11-18, TOM)
 * 주소: #/order-admin  (보드 · 거래처 단가 확인 링크 · 회신 확정 · 입금 · 출고 · 단가이력 · MD 설정 · 시트 반영 목록 · 입고 확인함)
 * 보이는 사람: People API 설정 '발주관리자' 목록(지금은 hello@만). 서버가 권한을 다시 확인하므로 화면만 열어도 데이터는 안 나와요.
 * 공개 저장소라 이 파일에 금액·토큰·시트 내용 없음. 금액은 API 응답으로만.
 * 되돌리기: index.html에서 order_admin.css / order_admin.js 두 줄 삭제.
 */
(function(){
if(typeof ROUTES==='undefined')return;
const call=(a,d)=>(window.OA_MOCK?window.OA_MOCK(a,d||{}):apiRaw(a,d||{}));
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const N=v=>{if(v==null||v==='')return null;const n=Number(String(v).replace(/[^\d.-]/g,''));return isNaN(n)?null:n};
const W=n=>n==null||isNaN(n)?'-':Math.round(n).toLocaleString('ko-KR');
const P=x=>x==null||isNaN(x)?'-':(x*100).toFixed(1)+'%';
const pad2=n=>String(n).padStart(2,'0');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate())};
const md=s=>{if(!s)return'';if(s instanceof Date||/T\d{2}:\d{2}.*(Z|[+-]\d{2}:?\d{2})$/.test(String(s))){const d=new Date(s);if(!isNaN(d))return (d.getMonth()+1)+'/'+d.getDate()+' '+pad2(d.getHours())+':'+pad2(d.getMinutes())}const m=String(s).match(/(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);return m?(+m[2])+'/'+(+m[3])+(m[4]?' '+m[4]+':'+m[5]:''):E(s)};
function isoWeek(d){const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=x.getUTCDay()||7;x.setUTCDate(x.getUTCDate()+4-day);const y=x.getUTCFullYear();const w=Math.ceil(((x-Date.UTC(y,0,1))/864e5+1)/7);return y+'-W'+pad2(w)}
function weekMon(wk){const m=String(wk).match(/(\d{4})-W(\d{2})/);if(!m)return new Date();const y=+m[1],w=+m[2];const j4=new Date(Date.UTC(y,0,4));const k=(j4.getUTCDay()||7)-1;const mon=new Date(Date.UTC(y,0,4-k+(w-1)*7));return new Date(mon.getUTCFullYear(),mon.getUTCMonth(),mon.getUTCDate())}
function weekShift(wk,n){const d=weekMon(wk);d.setDate(d.getDate()+7*n+3);return isoWeek(d)}
function weekLabel(wk){const d=weekMon(wk);const e=new Date(d);e.setDate(e.getDate()+6);return (d.getMonth()+1)+'/'+d.getDate()+' ~ '+(e.getMonth()+1)+'/'+e.getDate()}
async function copy(t,btn,ok){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}if(btn){const o=btn.dataset.o||btn.textContent;btn.dataset.o=o;btn.textContent=ok||'복사했어요';setTimeout(()=>{btn.textContent=o},1600)}}
const tst=m=>{if(typeof toast==='function')toast(m);else console.warn(m)};

/* ── 권한: 서버 'me'의 x.orderAdmin 우선, 없으면 서포트센터 계정만 보드 1회 확인 후 기억 ── */
const AK=()=>'tsb_oadm_'+String((typeof S!=='undefined'&&S.token)||'').slice(0,12);
function known(){const x=(S.data&&S.data.x)||{};if(x.orderAdmin===true)return true;if(x.orderAdmin===false)return false;const c=localStorage.getItem(AK());return c==='1'?true:c==='0'?false:null}
let probing=null;
function probe(){const k=known();if(k!==null)return Promise.resolve(k);const x=(S.data&&S.data.x)||{};if(!x.isHQ)return Promise.resolve(false);
 if(!probing)probing=call('order.admin.board',{week:isoWeek(new Date())}).then(j=>{localStorage.setItem(AK(),'1');OA.boardCache=j;return true}).catch(e=>{if(/권한|FORBID|DENIED|관리자|NOT_ADMIN/i.test(e.message||''))localStorage.setItem(AK(),'0');probing=null;return false});
 return probing}
window.OA_isAdmin=()=>known()===true;
window.OA_probe=probe;

/* ── 상태 ── */
const RULE={margin:0.30,end:900,small:1000};
const OA=window.OA={week:isoWeek(new Date()),tab:'board',links:{},vpo:null,ed:{},cat:null,mdQ:'',mdOnly:true,prQ:'',rcSt:'대기',since:null,boardCache:null};
let V=null;
const ST_PO=['제출','보류','단가확인중','입금대기','출고','입고완료'];
const ST_CLS={'제출':'s1','보류':'s2','단가확인중':'s3','입금대기':'s4','출고':'s5','입고완료':'s6','회신':'s3b','링크생성':'s3','대기':'s3','확정':'s4','입금완료':'s5','취소':'s0','만료':'s0'};
const chipS=s=>`<span class="oa-st ${ST_CLS[s]||'s0'}">${E(s||'-')}</span>`;

/* ── 가격 규칙 (미리보기 v0.1 ③과 같음) ── */
const mg=(c,p)=>c&&p?(p-c*1.1)/p:null;
function suggest(c){if(!c)return null;const p=c*1.1/(1-RULE.margin);let b=Math.ceil((p-RULE.end)/1000)*1000+RULE.end;if(b<p)b+=1000;return b}
const target=p=>p?Math.floor(p*(1-RULE.margin)/1.1/100)*100:null;

/* ── 공통 머리 ── */
function head(sub){const tabs=[['board','보드'],['prices','단가이력'],['md','MD 설정'],['sheet','시트 반영 목록'],['receipts','입고 확인함']];
 return `<div class="oa-top"><span class="oa-dots"><i></i><i></i><i></i></span><span class="oa-lab">TSB ORDER · 서포트센터</span></div>
 <div class="oa-hd"><div><h1>발주 관리</h1><div class="oa-sub">${sub||'지점 발주를 거래처별로 묶어 단가 확인 링크를 보내고, 회신을 확정해요.'}</div></div>
 ${OA.tab==='board'?`<div class="oa-wk"><button type="button" onclick="OA.wk(-1)" aria-label="지난주">&lsaquo;</button><div><b>${weekLabel(OA.week)}</b><small>${E(OA.week)}</small></div><button type="button" onclick="OA.wk(1)" aria-label="다음 주">&rsaquo;</button></div>`:''}</div>
 <nav class="oa-tabs">${tabs.map(([k,t])=>`<a href="#/order-admin/${k==='board'?'':k}" class="${OA.tab===k||(k==='board'&&OA.tab==='vpo')?'on':''}">${t}</a>`).join('')}</nav>`}
function shell(inner,sub){V.innerHTML=`<div class="oa">${head(sub)}${inner}</div>`}
const loading=()=>`<div class="oa-card"><div class="oa-sk"></div><div class="oa-sk s"></div></div>`;
const errBox=(m,retry)=>`<div class="oa-card oa-err"><b>불러오지 못했어요</b><div class="oa-mut">${E(m)}</div>${retry?`<button class="oa-btn" onclick="${retry}">다시 시도</button>`:''}</div>`;

/* ═══ 보드 ═══ */
function normBoard(j){
 const pos=(j.pos||j.orders||[]).map(p=>({poId:p.poId||p.id,store:p.store||p.지점||'',cat:p.cat||p.분류||'',status:p.status||p.상태||'',lines:N(p.count??p.lineCount??p.items??(Array.isArray(p.lines)?p.lines.length:p.lines))||0,bottles:N(p.bottles??p.병수)||0,supply:N(p.totals?p.totals.supply:p.supply),holds:N(p.holds??p.보류수)||0,at:p.submittedAt||p.제출시각||''}));
 if(!pos.length&&j.byStatus){Object.entries(j.byStatus).forEach(([st,arr])=>(arr||[]).forEach(p=>pos.push({poId:p.poId,store:p.store,cat:p.cat,status:st,lines:N(p.lines)||0,bottles:N(p.bottles)||0,supply:N(p.totals&&p.totals.supply),holds:N(p.holds)||0,at:p.submittedAt||''})))}
 const sups=(j.suppliers||[]).map(s=>{
  let stores=[];
  if(Array.isArray(s.stores)&&s.stores.length&&typeof s.stores[0]==='string')stores=s.stores.map(x=>({store:x,bottles:null,supply:null,lines:null}));
  else if(Array.isArray(s.stores)&&s.stores.length&&typeof s.stores[0]==='object')stores=s.stores.map(x=>({store:x.store,bottles:N(x.bottles)||0,supply:N(x.supply)||0,lines:N(x.lines)||0}));
  else{const m={};const src=Array.isArray(s.lines)?s.lines:(s.pos||[]).filter(x=>typeof x==='object');src.forEach(x=>{const st=x.store||x.지점||'?';m[st]=m[st]||{store:st,bottles:0,supply:0,lines:0};const q=N(x.qty??x.bottles)||0;m[st].bottles+=q;m[st].supply+=N(x.supply)??((N(x.price??x.ourPrice)||0)*q);m[st].lines+=Array.isArray(s.lines)?1:(N(x.lines)||0)});stores=Object.values(m)}
  const poIds=(s.poIds||(s.pos||[]).map(p=>p.poId||p)).filter(Boolean);
  return {supplier:s.supplier||s.name,lines:Array.isArray(s.lines)?s.lines.length:(N(s.lines)||stores.reduce((a,x)=>a+x.lines,0)),bottles:N(s.bottles)??stores.reduce((a,x)=>a+(x.bottles||0),0),supply:N(s.supply)??stores.reduce((a,x)=>a+(x.supply||0),0),holds:N(s.holds)||0,stores,poIds,vpos:(s.vpos||[]),open:s.open!==false}});
 const vpos=(j.vpos||[]).map(v=>({vpoId:v.vpoId||v.id,supplier:v.supplier,status:v.status,expires:v.expires,createdAt:v.createdAt,repliedAt:v.repliedAt||v.회신시각,shipDate:v.shipDate,supply:N(v.supply),total:N(v.total??v.확정합계),paidAt:v.paidAt,shippedAt:v.shippedAt,poIds:v.poIds||[]}));
 sups.forEach(s=>{s.vpos=[]});
 return {pos,sups,vpos,week:j.week||OA.week}}
async function vBoard(){OA.tab='board';shell(loading());
 let j,vl;try{[j,vl]=await Promise.all([OA.boardCache&&OA.boardCache.__w===OA.week?OA.boardCache:call('order.admin.board',{week:OA.week}),call('order.admin.vpo.list',{}).catch(()=>({vpos:[]}))]);j.__w=OA.week;OA.boardCache=null}catch(e){shell(errBox(e.message,'OA.go()'));return}
 j.vpos=(vl&&vl.vpos)||[];const b=normBoard(j);OA.board=b;
 const cnt=Object.assign({},j.counts||{});if(!j.counts)b.pos.forEach(p=>{cnt[p.status]=(cnt[p.status]||0)+1});
 const others=Object.keys(cnt).filter(k=>!ST_PO.includes(k));
 const stores=[...new Set(['청계','상암','마곡','동대문'].concat(b.pos.map(p=>p.store)).filter(Boolean))];
 const strip=`<div class="oa-strip">${ST_PO.concat(others).map(s=>`<div class="${cnt[s]?'on':''}"><small>${E(s)}</small><b>${cnt[s]||0}</b></div>`).join('')}</div>`;
 const grid=`<div class="oa-card"><div class="oa-ch"><h3>지점 발주</h3><span class="oa-mut">${b.pos.length}건</span></div>
  <div class="oa-stores">${stores.map(st=>{const ps=b.pos.filter(p=>p.store===st);return `<div class="oa-srow"><b>${E(st)}</b><div class="oa-pos">${ps.length?ps.map(p=>`<span class="oa-po">${chipS(p.status)} ${E(p.cat)} ${p.lines}품목 · ${p.bottles}${p.cat==='와인'||!p.cat?'병':'개'}${p.holds?` · <em class="oa-w">보류 ${p.holds}</em>`:''}</span>`).join(''):'<span class="oa-mut">이번 주 발주 없음</span>'}</div></div>`}).join('')}</div></div>`;
 const cards=b.sups.length?b.sups.map(s=>supCard(s)).join(''):`<div class="oa-card"><b>이번 주 거래처별 묶음이 없어요</b><div class="oa-mut">지점 발주가 제출되면 여기 거래처별로 모여요.</div></div>`;
 const act=b.vpos.filter(v=>OA.showAll||!/취소|입고완료/.test(v.status)).sort((x,y)=>String(y.createdAt).localeCompare(String(x.createdAt)));
 const vsec=`<div class="oa-sec"><h2>거래처 발주 진행</h2><button class="oa-lk" onclick="OA.showAll=!OA.showAll;OA.go()">${OA.showAll?'진행 중만':'취소·완료도 보기'}</button></div><div class="oa-card">${act.length?`<div class="oa-vps">${act.map(v=>vRow(v)).join('')}</div>`:'<div class="oa-mut">진행 중인 거래처 발주가 없어요. 아래 거래처 묶음에서 단가 확인 링크를 만들어 주세요.</div>'}</div>`;
 shell(`${strip}${grid}${vsec}<div class="oa-sec"><h2>거래처별 묶음 <span class="oa-mut">아직 링크 안 만든 줄</span></h2><button class="oa-lk" onclick="OA.go()">새로고침</button></div><div class="oa-grid">${cards}</div>`);
}
function vRow(v){const lk=OA.links[v.vpoId];return `<a class="oa-vrow" href="#/order-admin/vpo/${encodeURIComponent(v.vpoId)}">${chipS(v.status)}<b>${E(v.supplier)}</b><span class="oa-mut">${E(v.vpoId)}</span><span class="oa-mut">${v.shippedAt?'출고 '+md(v.shippedAt):v.paidAt?'입금 '+md(v.paidAt):v.repliedAt?'회신 '+md(v.repliedAt):v.expires?'만료 '+md(v.expires):''}</span>${v.total?`<span class="oa-mut">${W(v.total)}원</span>`:''}${v.status==='회신'?'<em class="oa-new">회신 왔어요</em>':''}<span class="oa-ar">&rsaquo;</span></a>${lk&&v.status!=='회신'?linkBox(lk):''}`}
function supCard(s){const id=encodeURIComponent(s.supplier);
 const lk=Object.values(OA.links).filter(x=>x.supplier===s.supplier).pop();
 const vp=s.vpos.map(v=>`<a class="oa-vrow" href="#/order-admin/vpo/${encodeURIComponent(v.vpoId)}">${chipS(v.status)}<span>${E(v.vpoId)}</span><span class="oa-mut">${v.repliedAt?'회신 '+md(v.repliedAt):v.expires?'~'+md(v.expires):''}</span>${v.status==='회신'?'<em class="oa-new">회신 왔어요</em>':''}<span class="oa-ar">&rsaquo;</span></a>`).join('');
 const canMake=s.poIds.length>0&&s.open;
 return `<div class="oa-card oa-sup" id="sup_${id}"><div class="oa-ch"><h3>${E(s.supplier)}</h3><span class="oa-mut">${s.lines}품목 · ${s.bottles}병${s.holds?` · <em class="oa-w">보류 ${s.holds}</em>`:''}</span></div>
 <div class="oa-amt"><small>시트 기준 공급가</small><b>${W(s.supply)}</b><span>원</span></div>
 <table class="oa-mini"><tbody>${s.stores.map(x=>`<tr><td>${E(x.store)}</td><td>${x.lines?x.lines+'품목':''}</td><td>${x.bottles!=null?x.bottles+'병':''}</td><td>${x.supply!=null?W(x.supply):''}</td></tr>`).join('')}</tbody></table>
 ${vp?`<div class="oa-vps">${vp}</div>`:''}
 ${lk?linkBox(lk):''}
 ${canMake&&!lk?`<button class="oa-btn p" onclick="OA.make('${E(s.supplier).replace(/'/g,'&#39;')}',this)">단가 확인 링크 만들기</button>`:''}
 ${!canMake&&!vp?'<div class="oa-mut">묶을 발주가 없어요</div>':''}</div>`}
function kakao(lk){const exp=lk.expires?md(lk.expires).split(' ')[0]:'';
 return `[탭샵바] 발주 단가 확인 부탁드립니다\n${lk.lines?lk.lines+'품목 · ':''}${lk.bottles?lk.bottles+'병':''}${lk.stores?' ('+lk.stores+')':''}\n아래 링크에서 지금 출고 단가·수량만 확인하고 제출해 주세요.\n${lk.url}\n${exp?'링크는 '+exp+'까지 열려요.\n':''}탭샵바 서포트센터`}
function linkBox(lk){const k=lk.vpoId;return `<div class="oa-link"><div class="oa-ch"><b>링크가 만들어졌어요</b><span class="oa-mut">${E(k)}</span></div>
 <input class="oa-in mono" readonly value="${E(lk.url)}" onclick="this.select()">
 <div class="oa-btns"><button class="oa-btn p" onclick="OA.cp('url','${E(k)}',this)">링크 복사</button><button class="oa-btn" onclick="OA.cp('kakao','${E(k)}',this)">카톡 문구 복사</button></div>
 <pre class="oa-pre">${E(kakao(lk))}</pre>
 <div class="oa-mut">이 링크는 지금 한 번만 보여요. 잃어버리면 '새 링크 만들기'를 누르면 되고, 예전 링크는 바로 막혀요.</div></div>`}
OA.cp=(what,k,btn)=>{const lk=OA.links[k];if(!lk)return;copy(what==='url'?lk.url:kakao(lk),btn)};
OA.make=async(sup,btn)=>{const s=OA.board.sups.find(x=>x.supplier===sup);if(!s)return;btn.disabled=true;btn.textContent='만드는 중...';
 try{const j=await call('order.admin.vpo.create',{supplier:sup,poIds:s.poIds,week:OA.week});
  OA.links[j.vpoId]={vpoId:j.vpoId,url:j.url,expires:j.expires,supplier:sup,lines:typeof j.lines==='number'?j.lines:(Array.isArray(j.lines)?j.lines.length:s.lines),bottles:typeof j.bottles==='number'?j.bottles:s.bottles,stores:s.stores.map(x=>x.store).join('·')};
  s.vpos.push({vpoId:j.vpoId,supplier:sup,status:j.status||'링크생성',expires:j.expires});s.poIds=[];
  const el=document.getElementById('sup_'+encodeURIComponent(sup));if(el)el.outerHTML=supCard(s);
 }catch(e){tst(e.message);btn.disabled=false;btn.textContent='단가 확인 링크 만들기'}};
OA.wk=n=>{OA.week=weekShift(OA.week,n);vBoard()};

/* ═══ VPO 상세 (회신 확인 · 확정 · 입금 · 출고) ═══ */
function normVpo(j){const v=j.vpo||j;const reps=j.replies||v.replies||[];
 const lines=(j.lines||v.lines||[]).map(l=>{const r=reps.find(x=>x.lineId===l.lineId)||l.reply||null;
  return {lineId:l.lineId,key:l.key||l.품목키,row:l.row,name:l.name||l.품목명,store:l.store||l.지점||'',qty:N(l.qty??l.수량)||0,our:N(l.ourPrice??l.price??l.단가),sale:N(l.salePrice??l.sale??l.판매가),
   reply:r?{price:N(r.price??r.회신단가),qty:N(r.qty??r.회신수량),soldOut:!!(r.soldOut===true||r.soldOut==='Y'||r.soldOut==='TRUE'||r.품절===true||r.품절==='Y'),alt:r.alt||r.대체품||'',memo:r.memo||r.메모||''}:null,
   conf:N(l.confirmedPrice??l.확정단가),lst:l.status||'',confSale:N(l.confirmedSale),sugSale:N(l.suggestSale??l.suggestedSale),nego:N(l.negoTarget)}});
 const t=v.totals||j.totals||{};
 return {vpoId:v.vpoId||v.id,supplier:v.supplier,status:v.status||'',expires:v.expires,linkAt:v.linkAt||v.createdAt||v.링크생성시각,repliedAt:v.repliedAt||v.회신시각,shipDate:v.shipDate||v.출고예정일||'',memo:v.vendorMemo||v.memo||v.메모||'',
  confSupply:N(t.supply??v.confirmedSupply??v.확정공급가),confTotal:N(t.total??v.confirmedTotal??v.확정합계),confVat:N(t.vat),paidAt:v.paidAt||v.입금시각||'',paidAmt:N(v.paidAmount??v.입금액),shippedAt:v.shippedAt||v.출고시각||'',lines,settings:j.settings||{}}}
function stage(v){if(v.shippedAt||v.status==='출고')return 'shipped';if(v.paidAt||/입금완료|^입금$/.test(v.status))return 'paid';if(v.status==='취소')return 'cancelled';if(v.status==='확정')return 'confirmed';if(v.repliedAt||v.status==='회신'||v.lines.some(l=>l.reply))return 'replied';if(v.status==='만료')return 'expired';return 'waiting'}
async function vVpo(id){OA.tab='vpo';shell(loading());let j;try{j=await call('order.admin.vpo.get',{vpoId:id})}catch(e){shell(errBox(e.message,`OA.go()`));return}
 const v=normVpo(j);OA.vpo=v;if(v.settings.targetMargin)RULE.margin=+v.settings.targetMargin;if(v.settings.priceEnd)RULE.end=+v.settings.priceEnd;
 const stg=stage(v),done=/confirmed|paid|shipped/.test(stg);OA.ed={};v.lines.forEach(l=>{const r=l.reply;const price=l.conf??(r&&r.price!=null?r.price:l.our);const so=!!(r&&r.soldOut);
  OA.ed[l.lineId]={acc:done?(l.conf!=null&&!/빠짐|품절/.test(l.lst||'')):!so,price,qty:r&&r.qty!=null?r.qty:l.qty,sale:l.confSale??null}});
 drawVpo()}
function lineCalc(l){const e=OA.ed[l.lineId];const c=e.price;const m0=mg(l.our,l.sale),m1=mg(c,l.sale);const up=c!=null&&l.our!=null&&c>l.our;const was=m0!=null&&m0<RULE.margin;const need=up&&m1!=null&&m1<RULE.margin&&m0!=null&&!was;
 const sp=need?Math.max(suggest(c),l.sale||0):null;const ns=e.sale??(need?sp:l.sale);
 const r=l.reply;let cls='wait',lab='회신 대기';
 if(r){if(r.soldOut){cls=r.alt?'new':'bad';lab=r.alt?'대체품':'품절'}else{const d=(r.price??l.our)-l.our;cls=d===0?'same':d<0?'down':d<=RULE.small?'small':'up';lab=d===0?'같음':d<0?'인하':d<=RULE.small?'소폭 인상':'큰 인상'}}
 return {c,m0,m1,need,sp,was,ns,cls,lab,nego:need?target(l.sale):null}}
function vTotals(v){let sheet=0,sup=0,acc=0,wait=0,so=0;v.lines.forEach(l=>{const e=OA.ed[l.lineId];sheet+=(l.our||0)*l.qty;if(!l.reply)wait++;if(l.reply&&l.reply.soldOut)so++;if(e.acc){sup+=(e.price||0)*(e.qty||0);acc++}});const vat=Math.round(sup*0.1);return {sheet,sheetT:Math.round(sheet*1.1),sup,vat,total:sup+vat,acc,wait,so}}
function drawVpo(){const v=OA.vpo,st=stage(v),T=vTotals(v),locked=st==='confirmed'||st==='paid'||st==='shipped'||st==='cancelled';
 const rows=v.lines.map(l=>{const k=lineCalc(l),e=OA.ed[l.lineId],r=l.reply,d=r&&r.price!=null&&!r.soldOut?r.price-l.our:null,qd=r&&r.qty!=null&&r.qty!==l.qty;
  return `<tr class="${e.acc?'':'off'} ${d?'chg':''}"><td class="l" data-l="품목"><div class="oa-nm"><a href="#/order-admin/prices/${encodeURIComponent(l.key||l.name)}" title="단가이력">${E(l.name)}</a></div><div class="oa-mut">${E(l.store)} · 주문 ${l.qty}${l.row?' · 시트 '+l.row+'행':''}</div>${r&&r.alt?`<div class="oa-alt">대체품: ${E(r.alt)}</div>`:''}${r&&r.memo?`<div class="oa-mut">메모: ${E(r.memo)}</div>`:''}</td>
  <td data-l="시트 단가">${W(l.our)}</td>
  <td data-l="회신 단가">${r?(r.soldOut?'<span class="oa-mut">품절</span>':W(r.price)):'<span class="oa-mut">-</span>'}${d?`<div class="${d>0?'bad':'good'} oa-s">${d>0?'+':''}${W(d)} (${(d/l.our*100).toFixed(1)}%)</div>`:''}</td>
  <td data-l="확정 단가"><input class="oa-n" inputmode="numeric" value="${e.price??''}" ${locked?'disabled':''} onchange="OA.set('${l.lineId}','price',this.value)"></td>
  <td data-l="수량"><input class="oa-n q" inputmode="numeric" value="${e.qty??''}" ${locked?'disabled':''} onchange="OA.set('${l.lineId}','qty',this.value)">${qd?`<div class="oa-w oa-s">주문 ${l.qty}</div>`:''}</td>
  <td data-l="지금 판매가">${W(l.sale)}</td>
  <td data-l="마진" class="${k.m1!=null&&k.m1<RULE.margin?'bad':''}">${P(k.m1)}<div class="oa-mut oa-s">전 ${P(k.m0)}</div></td>
  <td data-l="새 판매가">${k.need?`<b>${W(k.sp)}</b><div class="oa-mut oa-s">${Math.round(RULE.margin*100)}% 맞춤</div>`:`<span class="oa-mut oa-s">${k.was?'원래도 '+Math.round(RULE.margin*100)+'% 미만':'그대로'}</span>`}<div><input class="oa-n" inputmode="numeric" value="${k.ns??''}" ${locked?'disabled':''} onchange="OA.set('${l.lineId}','sale',this.value)"></div></td>
  <td data-l="상태"><span class="oa-c c-${k.cls}">${k.lab}</span>${k.nego?`<div class="oa-w oa-s">네고 목표 ${W(k.nego)}</div>`:''}</td>
  <td data-l="수락"><label class="oa-tg"><input type="checkbox" ${e.acc?'checked':''} ${locked?'disabled':''} onchange="OA.set('${l.lineId}','acc',this.checked)"><span>${e.acc?'수락':'빼기'}</span></label></td></tr>`}).join('');
 const negos=v.lines.filter(l=>lineCalc(l).need&&OA.ed[l.lineId].acc);
 const permit=N(localStorage.getItem('tsb_oa_permit_'+OA.week));
 const amt=locked?(v.confTotal??T.total):T.total;
 const steps=[['waiting','링크 보냄'],['replied','회신'],['confirmed','확정'],['paid','입금'],['shipped','출고']];const si=st==='cancelled'?-1:st==='expired'?0:steps.findIndex(x=>x[0]===st);
 V.innerHTML=`<div class="oa">${head('거래처 회신을 보고 줄마다 수락·수정한 뒤 확정해요.')}
 <a class="oa-back" href="#/order-admin/">&lsaquo; 보드</a>
 <div class="oa-card"><div class="oa-ch"><h2>${E(v.supplier)} <span class="oa-mut">${E(v.vpoId)}</span></h2>${chipS(v.status)}</div>
  <div class="oa-flow">${steps.map((x,i)=>`<span class="${i<=si?'on':''}">${x[1]}</span>`).join('<em>&rsaquo;</em>')}</div>
  <div class="oa-meta"><span>링크 ${v.linkAt?md(v.linkAt):'-'}${v.expires?' · 만료 '+md(v.expires):''}</span><span>회신 ${v.repliedAt?md(v.repliedAt):'아직'}</span><span>출고 가능일 ${E(v.shipDate||'-')}</span></div>
  ${v.memo?`<div class="oa-memo">거래처 메모: ${E(v.memo)}</div>`:''}
  <div class="oa-btns">${st==='waiting'||st==='expired'?`<button class="oa-btn" onclick="OA.relink(this)">새 링크 만들기 (예전 링크 막힘)</button>`:''}${st!=='shipped'&&st!=='cancelled'&&st!=='paid'?`<button class="oa-btn sm" onclick="OA.cancel(this)">이 거래처 발주 취소</button>`:''}${st==='cancelled'?'<span class="oa-mut">취소된 거래처 발주예요. 줄은 보드의 거래처 묶음으로 돌아가요.</span>':''}</div>
  ${OA.links[v.vpoId]&&(st==='waiting'||st==='expired')?linkBox(OA.links[v.vpoId]):''}</div>
 <div class="oa-kpis"><div><small>시트 기준 (VAT 포함)</small><b>${W(T.sheetT)}</b></div><div><small>${locked?'확정 합계':'확정 예정'} (VAT 포함)</small><b>${W(amt)}</b></div><div><small>차이</small><b class="${amt-T.sheetT>0?'bad':'good'}">${amt-T.sheetT>0?'+':''}${W(amt-T.sheetT)}</b></div><div><small>회신 대기 · 품절</small><b>${T.wait} · ${T.so}</b></div></div>
 <div class="oa-card oa-tw"><div class="oa-ch"><h3>차이 · 마진 · 판매가</h3><span class="oa-mut">마진 = (판매가 − 매입가×1.1) ÷ 판매가 · 목표 ${Math.round(RULE.margin*100)}% · 끝자리 ${RULE.end}</span></div>
  <table class="oa-t"><thead><tr><th>품목</th><th>시트 단가</th><th>회신 단가</th><th>확정 단가</th><th>수량</th><th>지금 판매가</th><th>마진</th><th>새 판매가</th><th>상태</th><th>수락</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="oa-mut" style="margin-top:8px">매입가가 올라서 ${Math.round(RULE.margin*100)}% 아래로 떨어진 줄만 판매가를 제안해요. 원래 ${Math.round(RULE.margin*100)}% 미만이던 줄은 표시만 해요. 단가는 모두 VAT 별도.</div></div>
 ${negos.length&&!locked?`<div class="oa-card"><div class="oa-ch"><h3>네고 요청 문구 ${negos.length}건</h3><button class="oa-btn sm" onclick="OA.cpNego(this)">복사</button></div><pre class="oa-pre" id="oa_nego">${E(negoText(negos))}</pre></div>`:''}
 <div class="oa-card"><div class="oa-ch"><h3>${locked?'확정 금액':'확정할 금액'}</h3><span class="oa-mut">수락 ${T.acc}/${v.lines.length}줄</span></div>
  <table class="oa-sum"><tr><td>공급가</td><td>${W(locked?(v.confSupply??T.sup):T.sup)}</td></tr><tr><td>부가세</td><td>${W(locked?(v.confVat??(v.confTotal!=null&&v.confSupply!=null?v.confTotal-v.confSupply:T.vat)):T.vat)}</td></tr><tr class="t"><td>합계 (입금할 금액)</td><td>${W(amt)}</td></tr></table>
  ${st==='paid'||st==='shipped'?`<div class="oa-permit"><span class="oa-mut">이번 주 남은 허가 잔액 (이 기기 메모): ${permit!=null?W(permit)+'원':'입력 안 함'}</span></div>`:`<div class="oa-permit"><label>이번 주 허가 잔액 <em>(회생 2026회합1185 · 서포트센터 입력)</em></label><input class="oa-in" inputmode="numeric" id="oa_permit" placeholder="예: 5,000,000" value="${permit!=null?W(permit):''}" oninput="OA.permit(this.value,${amt})"><div id="oa_pres">${permitMsg(permit,amt)}</div></div>`}
  <div class="oa-btns">
   ${st==='replied'||st==='waiting'||st==='expired'?`<button class="oa-btn p" id="oa_conf" ${st!=='replied'?'disabled':''} onclick="OA.confirm(this)">${st!=='replied'?'회신이 오면 확정할 수 있어요':'확정'}</button>`:''}
   ${st==='confirmed'?`<input class="oa-in sm" id="oa_paid" inputmode="numeric" value="${W(amt)}"><button class="oa-btn p" onclick="OA.paid(this)">입금 완료</button>`:''}
   ${st==='paid'?`<span class="oa-mut">입금 ${md(v.paidAt)}${v.paidAmt?' · '+W(v.paidAmt)+'원':''}</span><button class="oa-btn p" onclick="OA.shipped(this)">출고 표시</button>`:''}
   ${st==='shipped'?`<span class="oa-mut">입금 ${md(v.paidAt)} · 출고 ${md(v.shippedAt)}. 지점 입고 확인을 기다려요.</span>`:''}
  </div>
  ${st==='paid'||st==='confirmed'?'<div class="oa-mut">입금 뒤: 이체확인증 PDF · 클로브 [회생1185 허가지급] 메모 · 증빙대장 연결.</div>':''}</div></div>`}
function permitMsg(p,amt){if(p==null)return '<span class="oa-mut">허가 잔액을 넣으면 넘는지 바로 알려줘요.</span>';return amt<=p?`<span class="good">허가 잔액 안이에요 (남는 금액 ${W(p-amt)}원)</span>`:`<span class="bad">허가 잔액보다 ${W(amt-p)}원 많아요. 품목을 줄이거나 추가 허가 신청 (법무팀 확인 필요)</span>`}
function negoText(ls){return ls.map(l=>`${l.name}: 회신 ${W(OA.ed[l.lineId].price)}원 → ${W(lineCalc(l).nego)}원 가능할까요?`).join('\n')+'\n\n어려우면 100원이라도 맞춰 주실 수 있을지 부탁드립니다.'}
OA.cpNego=btn=>copy(document.getElementById('oa_nego').innerText,btn);
OA.permit=(val,amt)=>{const p=N(val);if(p==null)localStorage.removeItem('tsb_oa_permit_'+OA.week);else localStorage.setItem('tsb_oa_permit_'+OA.week,String(p));document.getElementById('oa_pres').innerHTML=permitMsg(p,amt);const b=document.getElementById('oa_conf');if(b&&b.dataset.two){delete b.dataset.two;b.textContent='확정'}};
OA.set=(id,f,val)=>{const e=OA.ed[id];if(!e)return;if(f==='acc')e.acc=!!val;else e[f]=N(val);const y=window.scrollY;drawVpo();window.scrollTo(0,y)};
OA.relink=async btn=>{const v=OA.vpo;btn.disabled=true;try{const j=await call('order.admin.vpo.relink',Object.assign({vpoId:v.vpoId},stage(v)==='expired'?{reopen:true}:{}));const ls=v.lines;OA.links[v.vpoId]={vpoId:v.vpoId,url:j.url,expires:j.expires,supplier:v.supplier,lines:ls.length,bottles:ls.reduce((a,l)=>a+l.qty,0),stores:[...new Set(ls.map(l=>l.store))].join('·')};v.expires=j.expires||v.expires;if(v.status==='만료')v.status='링크생성';drawVpo()}catch(e){tst(e.message);btn.disabled=false}};
OA.cancel=async btn=>{const v=OA.vpo;if(!btn.dataset.two){btn.dataset.two='1';btn.textContent='한 번 더 누르면 취소돼요';btn.classList.add('bad');return}btn.disabled=true;try{await call('order.admin.vpo.cancel',{vpoId:v.vpoId});delete OA.links[v.vpoId];tst('취소했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false}};
OA.confirm=async btn=>{const v=OA.vpo,T=vTotals(v);const p=N(localStorage.getItem('tsb_oa_permit_'+OA.week));
 if(!T.acc){tst('수락한 줄이 없어요');return}
 if(p!=null&&T.total>p&&!btn.dataset.two){btn.dataset.two='1';btn.textContent='허가 잔액 초과: 그래도 확정';btn.classList.add('bad');return}
 if(p==null&&!btn.dataset.two){btn.dataset.two='1';btn.textContent='허가 잔액 없이 확정 (한 번 더 누르기)';return}
 btn.disabled=true;btn.textContent='확정하는 중...';
 const accept=v.lines.filter(l=>OA.ed[l.lineId].acc).map(l=>{const e=OA.ed[l.lineId],k=lineCalc(l);const o={lineId:l.lineId,price:e.price,qty:e.qty};if(k.ns!=null&&k.ns!==l.sale)o.salePrice=k.ns;return o});
 const reject=v.lines.filter(l=>!OA.ed[l.lineId].acc).map(l=>l.lineId);
 try{await call('order.admin.vpo.confirm',{vpoId:v.vpoId,accept,reject});tst('확정했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false;btn.textContent='확정'}};
OA.paid=async btn=>{const v=OA.vpo;const amt=N(document.getElementById('oa_paid').value);if(!amt){tst('입금액을 넣어 주세요');return}
 const p=N(localStorage.getItem('tsb_oa_permit_'+OA.week));if(p!=null&&amt>p&&!btn.dataset.two){btn.dataset.two='1';btn.textContent='허가 잔액 초과: 그래도 표시';return}
 btn.disabled=true;try{await call('order.admin.vpo.paid',{vpoId:v.vpoId,amount:amt,at:new Date().toISOString()});if(p!=null)localStorage.setItem('tsb_oa_permit_'+OA.week,String(Math.max(0,p-amt)));tst('입금 완료로 표시했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false}};
OA.shipped=async btn=>{const v=OA.vpo;btn.disabled=true;try{await call('order.admin.vpo.shipped',{vpoId:v.vpoId,at:new Date().toISOString()});tst('출고로 표시했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false}};

/* ═══ 단가이력 ═══ */
async function vPrices(q){OA.tab='prices';if(q!=null)OA.prQ=q;shell(loading());
 const isKey=/^(R\d+|\d{8,14})$/.test(OA.prQ);let j;
 try{j=await call('order.admin.prices',Object.assign({limit:300},OA.prQ&&isKey?{key:OA.prQ}:{} ,OA.prQ&&OA.sups().includes(OA.prQ)?{supplier:OA.prQ}:{}))}catch(e){shell(errBox(e.message,'OA.go()'));return}
 const rows=(j.rows||j.prices||j.items||[]).map(r=>({at:r.at||r.시각,sup:r.supplier||r.거래처,key:r.key||r.품목키,name:r.name||r.품목명,old:N(r.oldPrice??r.prev??r.이전단가),nw:N(r.newPrice??r.price??r.새단가),src:r.source||r.출처,st:r.status||r.상태,by:r.by||r.확인자}));
 const qq=OA.prQ&&!isKey&&!OA.sups().includes(OA.prQ)?OA.prQ.replace(/\s/g,''):'';
 const g={};rows.filter(r=>!qq||String(r.name).replace(/\s/g,'').includes(qq)).forEach(r=>{const k=r.key||r.name;(g[k]=g[k]||{name:r.name,key:r.key,rows:[]}).rows.push(r)});
 const items=Object.values(g).map(x=>{x.rows.sort((a,b)=>String(b.at).localeCompare(String(a.at)));return x});
 shell(`<div class="oa-card"><div class="oa-row"><input class="oa-in" id="oa_pq" placeholder="품목명, 품목키 또는 거래처" value="${E(OA.prQ)}" onkeydown="if(event.key==='Enter')OA.pq()"><button class="oa-btn p" onclick="OA.pq()">찾기</button></div>
  <div class="oa-chips">${OA.sups().map(s=>`<button class="${OA.prQ===s?'on':''}" onclick="OA.pq('${E(s)}')">${E(s)}</button>`).join('')}${OA.prQ?'<button onclick="OA.pq(\'\')">전체</button>':''}</div></div>
  ${items.length?`<div class="oa-grid">${items.slice(0,80).map(x=>{const last=x.rows.find(r=>r.st==='수락')||x.rows[0];const first=x.rows[x.rows.length-1];const tr=last&&first&&first.old!=null?last.nw-first.old:null;
   return `<div class="oa-card"><div class="oa-ch"><h3>${E(x.name)}</h3><span class="oa-mut">${E(x.key||'')}</span></div>
   <div class="oa-amt sm"><small>최근 ${E(last.st||'')}</small><b>${W(last.nw)}</b><span>원</span>${tr?`<em class="${tr>0?'bad':'good'}">${tr>0?'+':''}${W(tr)}</em>`:''}</div>
   <table class="oa-mini h"><thead><tr><th>날짜</th><th>거래처</th><th>이전 → 새</th><th>출처</th><th>상태</th></tr></thead><tbody>${x.rows.slice(0,8).map(r=>`<tr><td>${md(r.at)}</td><td>${E(r.sup)}</td><td>${W(r.old)} → <b>${W(r.nw)}</b></td><td>${E(r.src)}</td><td>${E(r.st)}</td></tr>`).join('')}</tbody></table></div>`}).join('')}</div>`
  :`<div class="oa-card"><b>단가이력이 아직 없어요</b><div class="oa-mut">거래처 회신·확정·시트 단가 변경이 생기면 여기 쌓여요.</div></div>`}`,'품목별 단가가 언제, 누구 회신으로 바뀌었는지 봐요.')}
OA.sups=()=>((OA.board&&OA.board.sups)||[]).map(s=>s.supplier).concat(['진성','대정','서영','삼정']).filter((x,i,a)=>x&&a.indexOf(x)===i);
OA.pq=q=>{vPrices(q!=null?q:document.getElementById('oa_pq').value.trim())};

/* ═══ MD 설정 ═══ */
const MDS=['정상','쇼트','판매중지','단종','보류'];
async function vMd(){OA.tab='md';if(!OA.cat){shell(loading());try{const j=await call('order.catalog',{cat:'wine'});OA.cat=(j.items||[]).map(i=>({key:i.key,row:i.row,name:i.name,sup:i.supplier,imp:i.importer,md:Object.assign({status:'정상',forceSupplier:'',minUnit:'',memo:''},i.md||{})}))}catch(e){shell(errBox(e.message,'OA.go()'));return}}
 drawMd()}
function drawMd(){const q=OA.mdQ.replace(/\s/g,'');const all=OA.cat;
 const list=all.filter(i=>(!OA.mdOnly||q||(i.md.status&&i.md.status!=='정상')||i.md.forceSupplier||(N(i.md.minUnit)||1)>1)&&(!q||String(i.name).replace(/\s/g,'').includes(q)||String(i.key)===OA.mdQ||String(i.sup).includes(OA.mdQ)));
 const cnt={};all.forEach(i=>{cnt[i.md.status]=(cnt[i.md.status]||0)+1});
 shell(`<div class="oa-card"><div class="oa-row"><input class="oa-in" id="oa_mq" placeholder="와인 이름, 품목키, 거래처" value="${E(OA.mdQ)}" oninput="OA.mq(this.value)"><label class="oa-tg"><input type="checkbox" ${OA.mdOnly?'checked':''} onchange="OA.mdOnly=this.checked;OA.drawMdKeep()"><span>정상 아닌 것만</span></label></div>
  <div class="oa-mut">${all.length}품목 · ${MDS.map(s=>`${s} ${cnt[s]||0}`).join(' · ')} · 쇼트·판매중지·단종이면 점장 발주가 '보류'로 들어와요.</div></div>
  <div class="oa-card oa-tw"><table class="oa-t md"><thead><tr><th>품목</th><th>발주 상태</th><th>강제 거래처</th><th>최소 단위</th><th>메모</th><th></th></tr></thead><tbody>
  ${list.slice(0,80).map(i=>`<tr id="md_${E(i.key)}"><td class="l" data-l="품목"><div class="oa-nm">${E(i.name)}</div><div class="oa-mut">${E(i.sup||'')}${i.imp?' · '+E(i.imp):''} · ${E(i.key)}</div></td>
   <td data-l="발주 상태"><select class="oa-in sm" data-f="status">${MDS.map(s=>`<option ${i.md.status===s?'selected':''}>${s}</option>`).join('')}</select></td>
   <td data-l="강제 거래처"><input class="oa-in sm" data-f="forceSupplier" value="${E(i.md.forceSupplier)}" placeholder="없음"></td>
   <td data-l="최소 단위"><input class="oa-in sm" data-f="minUnit" inputmode="numeric" value="${E(i.md.minUnit)}" placeholder="1"></td>
   <td data-l="메모"><input class="oa-in sm" data-f="memo" value="${E(i.md.memo)}"></td>
   <td><button class="oa-btn sm p" onclick="OA.mdSave('${E(i.key)}',this)">저장</button></td></tr>`).join('')||'<tr><td class="l oa-mut" colspan="6">해당하는 품목이 없어요</td></tr>'}</tbody></table>${list.length>80?`<div class="oa-mut">${list.length}개 중 80개만 보여요. 검색으로 좁혀 주세요.</div>`:''}</div>`,'품목별 발주 상태(쇼트·판매중지·단종), 강제 거래처, 최소 단위를 정해요.')}
let mqT=null;OA.mq=v=>{OA.mdQ=v;clearTimeout(mqT);mqT=setTimeout(drawMdKeep,250)};
function drawMdKeep(){const a=document.activeElement&&document.activeElement.id;const pos=a==='oa_mq'?document.activeElement.selectionStart:null;drawMd();if(a==='oa_mq'){const el=document.getElementById('oa_mq');el.focus();try{el.setSelectionRange(pos,pos)}catch(e){}}}
OA.drawMdKeep=drawMdKeep;
OA.mdSave=async(key,btn)=>{const tr=btn.closest('tr');const o={key};tr.querySelectorAll('[data-f]').forEach(el=>{o[el.dataset.f]=el.value.trim()});if(o.minUnit)o.minUnit=N(o.minUnit);
 btn.disabled=true;btn.textContent='저장 중';try{await call('order.admin.md.set',o);const it=OA.cat.find(i=>String(i.key)===String(key));if(it)Object.assign(it.md,o);btn.textContent='저장됨';setTimeout(()=>{btn.textContent='저장';btn.disabled=false},1400)}catch(e){tst(e.message);btn.textContent='저장';btn.disabled=false}};

/* ═══ 시트 반영 목록 ═══ */
async function vSheet(){OA.tab='sheet';if(!OA.since){const d=new Date();d.setDate(d.getDate()-7);OA.since=d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate())}shell(loading());
 let j;try{j=await call('order.admin.sheetUpdates',{since:OA.since})}catch(e){shell(errBox(e.message,'OA.go()'));return}
 const rows=(j.rows||j.items||j.updates||[]).map(r=>({row:r.row??r.행,name:r.name||r.품목명,A:r.A??r.date??today(),B:r.B??r.memo??'',K:N(r.K??r.cost??r.newCost),was:N(r.wasCost??r.oldCost??r.prevCost),Q:N(r.Q??r.price??r.newPrice),AA:N(r.AA??r.prevPrice)}));
 OA.tsv=['행\t품목명\tA 신규&변경등록일\tB 확인 사항\tK 최근 입고가\tQ 최근 판매가\tAA 직전 판매가'].concat(rows.map(r=>[r.row,r.name,r.A,r.B,r.K??'',r.Q??'',r.AA??''].join('\t'))).join('\n');
 shell(`<div class="oa-card"><div class="oa-row"><label class="oa-mut" style="white-space:nowrap">이 날짜부터</label><input class="oa-in sm" type="date" value="${E(OA.since)}" onchange="OA.since=this.value;OA.go()"><button class="oa-btn p" ${rows.length?'':'disabled'} onclick="OA.copy(OA.tsv,this)">표 복사 (TSV)</button></div>
  <div class="oa-mut">와인 정보 시트는 시스템이 직접 고치지 않아요. 확정된 단가·판매가 중 시트에 옮길 칸만 모았어요. 시트 담당자가 확인하고 직접 반영해요. 최초 입고가(Z)는 건드리지 않아요. 판매가가 바뀌면 POS 가격도 같이 바꿔야 해요.</div></div>
  <div class="oa-card oa-tw"><table class="oa-t"><thead><tr><th>행</th><th>품목</th><th>A 날짜</th><th>B 확인 사항</th><th>K 입고가</th><th>Q 판매가</th><th>AA 직전 판매가</th></tr></thead><tbody>
  ${rows.map(r=>`<tr><td class="l" data-l="행">${E(r.row)}</td><td class="l oa-nm" data-l="품목">${E(r.name)}</td><td data-l="A">${E(r.A)}</td><td class="l" data-l="B">${E(r.B)}</td><td data-l="K">${r.was!=null?W(r.was)+' → ':''}<b>${W(r.K)}</b></td><td data-l="Q"><b>${W(r.Q)}</b></td><td data-l="AA">${r.AA!=null?W(r.AA):'-'}</td></tr>`).join('')||'<tr><td class="l oa-mut" colspan="7">이 기간에 반영할 품목이 없어요</td></tr>'}</tbody></table></div>`,'확정된 단가를 와인 정보 시트에 옮길 목록이에요.')}
OA.copy=copy;

/* ═══ 입고 확인함 ═══ */
async function vReceipts(){OA.tab='receipts';shell(loading());let j;try{j=await call('order.admin.receipts',OA.rcSt?{status:OA.rcSt}:{})}catch(e){shell(errBox(e.message,'OA.go()'));return}
 const rows=(j.rows||j.receipts||j.items||[]).map(r=>({id:r.receiptId||r.id||r.입고ID,poId:r.poId||r.발주ID,vpoId:r.vpoId,store:r.store||r.지점,by:r.by||r.확인자,at:r.at||r.시각,result:r.result||r.결과,diffs:r.diffs||r.차이JSON,fileId:r.fileId||r.파일ID,fileUrl:r.fileUrl,kind:r.fileType||r.파일종류,ai:r.aiStatus||r.AI상태||'없음',aiRes:r.aiResult||r.AI결과JSON}));
 const parse=x=>{if(!x)return null;if(typeof x==='object')return x;try{return JSON.parse(x)}catch(e){return null}};
 shell(`<div class="oa-chips big">${['대기','확인필요',''].map(s=>`<button class="${OA.rcSt===s?'on':''}" onclick="OA.rcSt='${s}';OA.go()">${s||'전체'}</button>`).join('')}</div>
 ${rows.length?rows.map(r=>{const df=parse(r.diffs),ar=parse(r.aiRes);const tbl=ar&&(ar.rows||ar.lines||(Array.isArray(ar)?ar:null));
  return `<div class="oa-card"><div class="oa-ch"><h3>${E(r.store)} <span class="oa-mut">${E(r.poId||'')}</span></h3><span class="oa-c c-${r.ai==='완료'?'same':r.ai==='확인필요'?'bad':r.ai==='대기'?'small':'wait'}">AI ${E(r.ai)}</span></div>
  <div class="oa-meta"><span>${md(r.at)}</span><span>결과 <b class="${r.result==='차이'?'bad':''}">${E(r.result||'-')}</b></span>${r.kind?`<span>${E(r.kind)}</span>`:''}${r.fileId||r.fileUrl?`<a class="oa-lk" target="_blank" rel="noopener" href="${E(r.fileUrl||'https://drive.google.com/file/d/'+r.fileId+'/view')}">첨부 열기</a>`:''}</div>
  ${Array.isArray(df)&&df.length?`<table class="oa-mini h"><thead><tr><th>줄</th><th>받은 수량</th><th>메모</th></tr></thead><tbody>${df.map(d=>`<tr><td>${E(d.name||d.lineId)}</td><td>${E(d.qty)}</td><td>${E(d.memo)}</td></tr>`).join('')}</tbody></table>`:''}
  ${Array.isArray(tbl)&&tbl.length?`<details class="oa-det"><summary>읽은 표 ${tbl.length}줄</summary><table class="oa-mini h"><tbody>${tbl.slice(0,30).map(x=>`<tr>${(Array.isArray(x)?x:Object.values(x)).slice(0,6).map(c=>`<td>${E(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>`:ar&&ar.note?`<div class="oa-mut">${E(ar.note)}</div>`:''}
  ${r.ai==='확인필요'?`<div class="oa-btns"><button class="oa-btn sm" onclick="OA.rcDone('${E(r.id)}',this)">확인했어요</button></div>`:''}</div>`}).join(''):`<div class="oa-card"><b>${OA.rcSt?OA.rcSt+' 상태 입고가 없어요':'입고 기록이 없어요'}</b><div class="oa-mut">점장님이 입고 확인에서 사진·엑셀을 올리면 여기 모여요.</div></div>`}`,'지점 입고 확인(거래명세표 사진·엑셀)과 AI 읽기 상태를 봐요.')}
OA.rcDone=async(id,btn)=>{btn.disabled=true;try{await call('order.admin.receipt.set',{receiptId:id,aiStatus:'완료'});tst('확인 완료로 바꿨어요');OA.go()}catch(e){tst(e.message);btn.disabled=false}};

/* ═══ 라우터 ═══ */
OA.go=()=>{const a=OA._a||'';route_(a)};
function route_(a){const [sub,...r]=String(a||'').split('/');const rest=r.join('/');
 if(sub==='vpo'&&rest)return vVpo(rest);if(sub==='prices')return vPrices(rest||null);if(sub==='md')return vMd();if(sub==='sheet')return vSheet();if(sub==='receipts')return vReceipts();return vBoard()}
ROUTES['order-admin']=function(v,a){V=v;OA._a=a||'';document.body.classList.add('wide','oaw');
 const k=known();
 if(k===true)return route_(a);
 v.innerHTML=`<div class="oa">${loading()}</div>`;
 return probe().then(ok=>{if(location.hash.indexOf('#/order-admin')!==0)return;if(ok)route_(a);else v.innerHTML=`<div class="oa"><div class="oa-card"><b>발주 관리 권한이 없어요</b><div class="oa-mut">이 화면은 서포트센터 발주 담당만 볼 수 있어요.</div></div></div>`})};
window.addEventListener('hashchange',()=>{if(location.hash.indexOf('#/order-admin')!==0)document.body.classList.remove('oaw')});

/* ── 더보기에 '발주 관리' 줄 (관리자만) ── */
function addMore(v){const put=()=>{if(!v||v.querySelector('.oa-morelink'))return;const anchor=v.querySelector('.sec');if(!anchor)return;
  const box=document.createElement('div');box.className='oa-morelink';box.innerHTML=`<div class="sec"><h2>서포트센터</h2></div><div class="list"><a class="li" href="#/order-admin"><div class="m"><div class="t1">발주 관리 <i class="new">BETA</i></div><div class="t2">거래처 단가 확인 링크 · 회신 확정 · 입금 · 입고</div></div><span class="ar">${I('next',18)}</span></a></div>`;anchor.parentNode.insertBefore(box,anchor)};
 if(known()===true)put();else probe().then(ok=>{if(ok&&location.hash.indexOf('#/more')===0)put()})}
const _more=ROUTES.more;if(_more){ROUTES.more=function(v){const r=_more.apply(this,arguments);try{addMore(v)}catch(e){}return r}}
window.OA_link=()=>known()===true?'<a class="oa-entry" href="#/order-admin">발주 관리</a>':'';
if(location.hash.indexOf('#/order-admin')===0&&S.data)setTimeout(()=>route(),0);
})();

}catch(_e){console.error('[order_admin.js]',_e)}

;/* ═══ 합침 11/25: crew1117.js (원래 https://tapshopbar.github.io/staff/crew1117.js) · 한 파일이 깨져도 나머지는 돌게 try ═══ */
try{
/* ═══ crew1117.js · 11/17 직원 의견 반영 (BETA 0.13) ═══
   1) 근무 신청 달력: 1일이 월요일 칸에 붙던 문제 (11/16 발주 탭 CSS .oth 충돌, 차현 님 Q261117-EEC1) → 지난달·다음달 날짜를 다시 보이고 'M/D'로 표시
   2) 아래 메뉴: 휴대폰에서 스크롤·키보드 때 떠오르던 문제, 글 쓸 때 입력창 가림 (윤홍민 님 CREW-020)
   3) 정산 메모 고치기·지우기 (이수용 님 Q261117-85D7) — 아래 정산 메모 블록
   4) 내 근무 · 연차: 남은 연차 + 이번 달 근무시간 (차현 님 CREW-022), 홈에 한 줄
   5) 화면의 실명 '장분도'·옛 표기 → 서포트센터
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


/* ── 5) 화면에 실명·옛 표기 대신 서포트센터 (11/17 코치님 "장분도라는 이름은 다 빼죠" → 밤 "TOM 한글 이름도 빼고 전부 서포트센터") ──
   서버는 직원 화면을 표시이름(서포트센터)으로 바꿔 보내고, 여기서는 본인 화면·남은 글자까지 화면에서만 바꾼다(입력값·저장값은 그대로) */
(function(){
  const HIT=/장분도|\uC11C\uB3C4\uBBFC/,P={'이':'가','을':'를','은':'는','과':'와'},SKIP=/^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION)$/;
  const RE=/(?:장분도|\uC11C\uB3C4\uBBFC)(?:\s?(?:이사|팀장))?님?(?:(이|을|은|과)(?![가-힣]))?/g;
  const fx=n=>{const v=n.nodeValue;if(!v||!HIT.test(v)||(n.parentNode&&SKIP.test(n.parentNode.nodeName)))return;n.nodeValue=v.replace(RE,(m,p)=>'서포트센터'+(P[p]||''))};
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
    el.querySelector('#ed_x').onclick=async e=>{const ct=e.currentTarget;if(!await ask('이 메모를 시트에서 지울까요?\n'+m.item+(m.amt!==''&&m.amt!=null?' · '+won(m.amt):'')+'\n'+m.text))return;
      busy(ct,true,'지우는 중…');
      try{await apiRaw('memo.edit',{branch:j.branch,row:m.row,orig,del:true});toast('지웠어요');el.remove();done()}catch(x){toast(x.message,4000);busy(ct,false)}};
  })}
})();

}catch(_e){console.error('[crew1117.js]',_e)}

;/* ═══ 합침 11/25: cash1118.js (원래 https://tapshopbar.github.io/staff/cash1118.js) · 한 파일이 깨져도 나머지는 돌게 try ═══ */
try{
/* ═══ cash1118.js · 11/18 동대문 현금 계산·장부 바로가기 (이은경 팀장님만) ═══
   홈 출근 카드 아래 카드 1개. 다른 직원 화면에는 아무것도 안 생김.
   대상 = CASH_WHO (앱 자체도 장부 시트 설정 '허용이메일'로 한 번 더 막음)
   되돌리기: index.html 에서 cash1118.js 한 줄 지우기 */
(function(){
  const CASH_WHO=['ek.lee@tsb.wine']; /* 11/18 21:10 코치님: hello@ 홈에서는 빼기 (장부 웹앱 자체 허용이메일은 그대로) */
  const URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbydQ_IQyu_1GYpFYZrvTDCQrx5R2TWB0g1qi7uLyl16nDBOq5XdpaTK2QU3_VubZS8N/exec';
  const css=`#cashTile{display:flex;align-items:center;gap:12px;margin:10px 20px 0;padding:14px 16px;background:#fff;border:1.5px solid #E6E2DF;border-radius:16px;text-decoration:none;color:#191F28}
#cashTile .ic{width:38px;height:38px;border-radius:12px;background:#E8F1FF;color:#156DFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;flex:none}
#cashTile .tx{flex:1;min-width:0}#cashTile b{display:block;font-size:15px}#cashTile small{display:block;color:#6B7684;font-size:12.5px;margin-top:2px}
#cashTile .ar{color:#B0B8C1;font-size:20px}`;
  let st=null;
  const add=()=>{try{
    if(typeof routeKey!=='function'||routeKey()!==''||typeof S==='undefined'||!S.data||!S.data.me)return;
    const em=String(S.data.me.email||localStorage.getItem('tsbp_email')||'').toLowerCase();
    if(CASH_WHO.indexOf(em)<0||document.getElementById('cashTile'))return;
    const anchor=document.getElementById('lvstrip')||document.getElementById('punchBlk');if(!anchor)return;
    if(!st){st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}
    const a=document.createElement('a');a.id='cashTile';a.href=URL;a.target='_blank';a.rel='noopener';
    a.innerHTML='<span class="ic">₩</span><span class="tx"><b>동대문 현금 계산 · 장부</b><small>현금 손님 찍기 · 외화 · 입금 기록</small></span><span class="ar">›</span>';
    anchor.insertAdjacentElement('afterend',a);
  }catch(e){}};
  new MutationObserver(add).observe(document.body,{childList:true,subtree:true});add();
})();

}catch(_e){console.error('[cash1118.js]',_e)}

;/* ═══ 합침 11/25: pay1118.js (원래 https://tapshopbar.github.io/staff/pay1118.js) · 한 파일이 깨져도 나머지는 돌게 try ═══ */
try{
/* ═══ pay1118.js v3 · 11/18 정산 입금 예정 (박한울 매니저 + 서포트센터만) ═══
   홈 출근 카드 아래 카드 1개. 누르면 펼쳐져 오늘 정산 금액·다음 입금이 보임 (코치님 11/18 21:15 "카드로 만들어서 클릭하면 보이게"). 다른 직원 화면에는 아무것도 안 생김.
   숫자는 People API sdpay.get (서버가 설정 '정산입금열람'으로 한 번 더 막음). 이 공개 파일에는 금액 없음.
   '자세히'는 정산 화면 웹앱(날짜 넘기기·지점별·지난 입금)
   되돌리기: index.html 에서 pay1118.js 한 줄 지우기 */
(function(){
  const PAY_WHO=['hw.park@tsb.wine','hello@tsb.wine'];
  const URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbxsTUtTa3FWvcvSgycAwxEFKvpWJzZ-ne9Re3nE4WOB0qU6ywMw6xeJEx4DBrcRxU76/exec';
  const LS='tsbp_pay1118';
  const css=`#payTile{display:block;margin:10px 20px 0;padding:14px 16px;background:#fff;border:1.5px solid #E6E2DF;border-radius:16px;color:#191F28}
#payTile .ph{display:flex;align-items:center;gap:10px}#payTile .ic{width:34px;height:34px;border-radius:11px;background:#E8F1FF;color:#156DFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11.5px;flex:none}
#payTile .tt{flex:1;min-width:0}#payTile .tt b{display:block;font-size:15px}#payTile .tt small{display:block;color:#6B7684;font-size:12px;margin-top:1px}
#payTile .more{color:#156DFF;font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap}#payTile .ph{cursor:pointer;-webkit-tap-highlight-color:transparent}#payTile .ar{color:#B0B8C1;font-size:20px;transition:transform .2s}#payTile.open .ar{transform:rotate(90deg)}#payTile #payBody{display:none}#payTile.open #payBody{display:block}#payTile .lk{display:block;text-align:right;margin-top:10px}
#payTile .tot{display:flex;align-items:baseline;gap:8px;margin:12px 0 2px;flex-wrap:wrap}#payTile .tot strong{font-size:26px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}#payTile .tot em{font-style:normal;font-size:14px;font-weight:600}
#payTile .chip{font-size:11.5px;font-weight:700;padding:3px 8px;border-radius:999px;background:#E8F1FF;color:#156DFF}#payTile .chip.no{background:#FFF4E5;color:#C76A00}
#payTile .kg{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;margin-top:10px}#payTile .kg div{display:flex;justify-content:space-between;gap:6px;font-size:13.5px}#payTile .kg span{color:#6B7684;white-space:nowrap}#payTile .kg i{font-style:normal;font-weight:700;font-variant-numeric:tabular-nums}
#payTile .nx{display:flex;gap:8px;margin-top:12px}#payTile .nx div{flex:1;background:#F9FAFB;border-radius:12px;padding:9px 11px}#payTile .nx small{display:block;color:#8B95A1;font-size:11.5px}#payTile .nx b{font-size:14.5px;font-variant-numeric:tabular-nums}
#payTile .ft{color:#B0B8C1;font-size:11.5px;margin-top:10px}`;
  const f=n=>Number(n||0).toLocaleString('ko-KR');
  const md=s=>{const p=String(s).split('-');return Number(p[1])+'/'+Number(p[2])};
  const dw=s=>'일월화수목금토'.charAt(new Date(s+'T12:00:00+09:00').getDay());
  let st=null,busy=false,lastT=0;
  const body=j=>{
    if(!j||!j.ok)return `<div class="ft">${j&&j.message?j.message:'불러오는 중…'}</div>`;
    const t=j.today,k=t.kinds||{};
    let h='';
    if(t.status==='none')h+=`<div class="tot"><em style="color:#6B7684">오늘 들어올 정산 메일이 없어요</em></div>`;
    else h+=`<div class="tot"><strong>${f(t.total)}<em>원</em></strong><span class="chip${t.status==='ok'?'':' no'}">${t.status==='ok'?'4종 도착':(t.miss||[]).join('·')+' 메일 아직'}</span></div>
<div class="kg"><div><span>국내 카드</span><i>${f(k['국내'])}</i></div><div><span>해외 카드</span><i>${f(k['해외'])}</i></div><div><span>QR 오더</span><i>${f(k['QR'])}</i></div><div><span>앱</span><i>${f(k['APP'])}</i></div></div>`;
    if(j.next&&j.next.length)h+=`<div class="nx">${j.next.map(n=>`<div><small>${md(n.date)} (${dw(n.date)})</small><b>${f(n.total)}</b></div>`).join('')}</div>`;
    h+=`<div class="ft">스마트데이터 메일 기준${j.updated?' · 갱신 '+j.updated:''}</div><a class="more lk" href="${URL}" target="_blank" rel="noopener">날짜별 · 지점별 자세히 ›</a>`;
    return h};
  const paint=j=>{const el=document.getElementById('payBody');if(el)el.innerHTML=body(j)};
  const load=()=>{if(busy||Date.now()-lastT<60000||typeof apiRaw!=='function'){if(lastT)paint(JSON.parse(localStorage.getItem(LS)||'null'));return}busy=true;lastT=Date.now();
    apiRaw('sdpay.get',{}).then(j=>{busy=false;if(j&&j.ok)try{localStorage.setItem(LS,JSON.stringify(j))}catch(e){}paint(j)}).catch(()=>{busy=false})};
  const add=()=>{try{
    if(typeof routeKey!=='function'||routeKey()!==''||typeof S==='undefined'||!S.data||!S.data.me)return;
    const em=String(S.data.me.email||localStorage.getItem('tsbp_email')||'').toLowerCase();
    if(PAY_WHO.indexOf(em)<0||document.getElementById('payTile'))return;
    const anchor=document.getElementById('cashTile')||document.getElementById('lvstrip')||document.getElementById('punchBlk');if(!anchor)return;
    if(!st){st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}
    const d=document.createElement('div');d.id='payTile';
    const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
    d.innerHTML=`<div class="ph"><span class="ic">입금</span><span class="tt"><b>정산 입금 예정</b><small>오늘 ${md(today)} (${dw(today)}) · 눌러서 보기</small></span><span class="ar">›</span></div><div id="payBody"></div>`;
    d.querySelector('.ph').addEventListener('click',()=>{d.classList.toggle('open');const sm=d.querySelector('.tt small');if(sm)sm.textContent='오늘 '+md(today)+' ('+dw(today)+') · '+(d.classList.contains('open')?'패스파인더22 IBK 입금':'눌러서 보기');if(d.classList.contains('open'))load()});
    anchor.insertAdjacentElement('afterend',d);
    let c=null;try{c=JSON.parse(localStorage.getItem(LS)||'null')}catch(e){}
    paint(c&&c.today&&c.today.date===today?c:null);
    load();
  }catch(e){}};
  new MutationObserver(add).observe(document.body,{childList:true,subtree:true});add();
})();

}catch(_e){console.error('[pay1118.js]',_e)}
