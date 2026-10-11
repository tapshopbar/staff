/* TAP SHOP BAR People · core (shell, 로그인, 홈, 출퇴근, 휴가, 결재, 캘린더, 더보기, 관리) */
const API = 'https://script.google.com/macros/s/AKfycbzQac5fduY9sPhRXr9-nrvq0jV2ghsrJhug7b6DnSoLVPbv5V8Ays2eGZRPr202BtH8cQ/exec';
const LOGO = 'assets/tsb_wordmark_h.png';
const GOOGLE_CLIENT_ID = '207804770718-9ilhgaprc47k3ul52nnreofbbu62lpt3.apps.googleusercontent.com';
const TYPES = [
  {g:'연차',k:'연차',label:'연차',sub:'1일 · 유급',pol:'입사 1년 미만은 한 달 개근 시 1일(최대 11일), 1년 이상은 15일(2년마다 +1일, 최대 25일). 입사일 기준으로 관리해요.',docs:''},
  {g:'연차',k:'오전 반차',label:'오전 반차',sub:'0.5일 · 4시간',half:'오전',pol:'반차는 0.5일(4시간)이에요. 신청 → 점장 승인 → 매니저 승인 → 스케줄 반영 순서예요.',docs:''},
  {g:'연차',k:'오후 반차',label:'오후 반차',sub:'0.5일 · 4시간',half:'오후',pol:'반차는 0.5일(4시간)이에요. 먼저 점장님과 스케줄을 맞춰 주세요.',docs:''},
  {g:'휴가',k:'경조휴가',label:'경조휴가',sub:'유급 · 연차와 별도',pol:'결혼·출산·사망 등 경조사에 사용해요. 주말·공휴일 포함 연속 일수로 부여되고, 입사 3개월 이상이면 경조금도 지급돼요.',docs:'청첩장, 가족관계증명서, 사망 관련 증빙 등'},
  {g:'휴가',k:'병가',label:'병가',sub:'무급 · 연차 우선',pol:'발생한 연차를 먼저 쓰고, 모두 쓴 경우 협의해 병가를 사용해요. 당일 병가는 점장님께 먼저 연락하고 사후에 신청해 주세요.',docs:'진료확인서·진단서·입퇴원확인서 중 1개 이상'},
  {g:'휴가',k:'공가(건강검진)',label:'건강검진 공가',sub:'유급 · 4시간',pol:'국가건강검진 등이 근무시간과 겹칠 때 검진 당일에만 사용해요. 원칙적으로 오전 반차(4시간) 유급이에요.',docs:'건강검진 확인서 또는 결과서'},
  {g:'휴가',k:'보건휴가',label:'보건휴가',sub:'무급 · 월 1일',pol:'여성 근로자는 매월 1일 사용할 수 있어요 (무급, 이월 불가).',docs:''},
  {g:'휴가',k:'예비군·민방위',label:'예비군·민방위',sub:'유급 공가',pol:'훈련·교육 시간은 유급 공가로 인정돼요. 남은 근무시간은 복귀하거나 연차로 쓸 수 있어요.',docs:'교육 필증, 이수 증명서 (통지서만으로는 부족)'},
  {g:'휴가',k:'태아검진휴가',label:'태아검진휴가',sub:'유급 · 1회 4시간',pol:'임신 중 정기 검진을 위해 1회 4시간을 연차 차감 없이 유급으로 사용해요.',docs:'진료확인서, 예약증 또는 진료영수증'},
  {g:'휴가',k:'배우자 출산휴가',label:'배우자 출산휴가',sub:'유급 · 20일',pol:'출산일부터 120일 이내 총 20일, 최대 3회 나눠서 쓸 수 있어요.',docs:'출생증명서, 가족관계증명서'},
  {g:'휴가',k:'가족돌봄휴가',label:'가족돌봄휴가',sub:'무급 · 연 10일',pol:'가족의 질병·사고·노령·양육으로 돌봄이 필요할 때 연 최대 10일, 1일 단위로 사용해요.',docs:'가족관계증명서, 진단서 등'},
  {g:'휴가',k:'기타·휴직',label:'기타 · 휴직',sub:'상담 후 결정',pol:'무급휴가·휴직 등은 대표 및 HR과 상담 후 진행 여부를 정해요. 30일 전 신청을 권장해요.',docs:'사유 증빙 서류'}
];
const ROLECOL = {'직원':'#C99A9E','점장':'#6E1426','매니저':'#141B33','임원':'#3B4A7A','이사':'#4A0B18','대표':'#0E0E0E'};
const BR = ['청계','상암','마곡','동대문','서여의도','본사'];
const I = (n,s=22)=>{const p={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
 cal:'<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>',
 inbox:'<path d="M3 13l3-8h12l3 8v7H3z"/><path d="M3 13h5l1 3h6l1-3h5"/>',
 more:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 back:'<path d="M15 5l-7 7 7 7"/>', next:'<path d="M9 5l7 7-7 7"/>',
 pin:'<path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
 out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>', grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
}[n]||'';return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">${p}</svg>`};
/* ── state & utils ── */
const S = {token:localStorage.getItem('tsbp_token')||'', data:null, clockT:null, map:null};
const $ = s=>document.querySelector(s);
const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n=>String(n).padStart(2,'0');
const ymd = d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const WD = ['일','월','화','수','목','금','토'];
const pd = s=>{const [y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d)};
const fmtDay = s=>{if(!s)return'';const dt=pd(s);return `${dt.getMonth()+1}.${dt.getDate()} (${WD[dt.getDay()]})`};
const period = r=> r.start===r.end||!r.end ? fmtDay(r.start)+(r.half?` ${r.half}`:'') : `${fmtDay(r.start)} – ${fmtDay(r.end)}`;
const won = n=>(Number(n)||0).toLocaleString('ko-KR')+'원';
const ava = (name,role,size)=>`<div class="ava" style="background:${ROLECOL[role]||'#C99A9E'};${size?`width:${size}px;height:${size}px`:''}">${esc((name||'?').slice(-2))}</div>`;
const chip = (st,label)=>`<span class="chip c-${esc(st)}">${esc(label||st)}</span>`;
const monday = d=>{const x=new Date(d);const k=(x.getDay()+6)%7;x.setDate(x.getDate()-k);return ymd(x)};
const addD = (s,n)=>{const d=pd(s);d.setDate(d.getDate()+n);return ymd(d)};
function toast(m,ms=2400){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),ms)}
const READ_RE=/^(inbox|calendar|board|console|file\.get|admin\.users|notice\.stats|onb\.get|close\.preview|schedule\.(week|overview)|\w+\.(list|get))$/;
S.mem={};
/* 화면 데이터: 저장된 게 있으면 즉시 보여주고(0초), 뒤에서 최신으로 받아와 바뀌었으면 화면만 조용히 갱신 */
const MEMK=()=>'tsbp_mem_'+(S.token||'').slice(0,12);
function memLoad(){try{S.mem=JSON.parse(localStorage.getItem(MEMK())||'{}')}catch(e){S.mem={}}}
let memT=null;function memSave(){clearTimeout(memT);memT=setTimeout(()=>{try{const o={};Object.keys(S.mem).forEach(k=>{if(S.mem[k]&&S.mem[k].v)o[k]={t:S.mem[k].t,v:S.mem[k].v}});localStorage.setItem(MEMK(),JSON.stringify(o))}catch(e){}},800)}
function busyUI(){const a=document.activeElement;return !!document.querySelector('.mask')||(a&&/INPUT|TEXTAREA|SELECT/.test(a.tagName))}
async function api(action,data={},tries=0,bg=false){
  const key=action+JSON.stringify(data);
  if(!bg&&S.curKeys)S.curKeys.add(key);
  const cacheable=!tries&&action!=='file.get'&&(READ_RE.test(action)||action==='me');
  if(cacheable){
    const hit=S.mem[key];
    const fetchFresh=()=>{if(S.mem[key]&&S.mem[key].p)return S.mem[key].p;
      const p=apiRaw(action,data).then(j=>{const v=JSON.stringify(j);const old=S.mem[key]&&S.mem[key].v;S.mem[key]={t:Date.now(),v};memSave();return {j,changed:old!==v}}).catch(e=>{if(S.mem[key])delete S.mem[key].p;throw e});
      S.mem[key]=Object.assign({},S.mem[key]||{},{p});return p};
    if(hit&&hit.v){
      if(Date.now()-hit.t>15000){const h=location.hash;fetchFresh().then(r=>{if(!r.changed)return;if(action==='me'){S.data=r.j;shell(true);if(location.hash===h&&!busyUI()&&S.curKeys&&S.curKeys.has(key))route(true);return}if(location.hash===h&&!busyUI()&&S.curKeys&&S.curKeys.has(key))route(true)}).catch(()=>{})}
      return JSON.parse(hit.v);
    }
    const r=await fetchFresh();return r.j;
  }
  const j=await apiRaw(action,data,tries);
  if(!READ_RE.test(action)&&!/^(me|auth\.|logout)/.test(action)){S.mem={};memSave()}
  return j;
}
async function apiRaw(action,data={},tries=0){
  let j;
  try{const r = await fetch(API,{method:'POST',credentials:'omit',cache:'no-store',body:JSON.stringify({...data,action,token:S.token})});const t=await r.text();j=JSON.parse(t)}
  catch(e){ if(tries<2&&/^(me|inbox|calendar|board|console|file\.get|admin\.users|notice\.stats|onb\.get|close\.preview|schedule\.(week|overview)|\w+\.(list|get))$/.test(action)){await new Promise(r=>setTimeout(r,800*(tries+1)));return apiRaw(action,data,tries+1)} throw new Error(/^(me|inbox|calendar|board|console)$|\.(list|get|week|overview|preview|stats)$/.test(action)?'연결이 불안정해요. 다시 시도해 주세요':'응답을 못 받았어요. 처리됐을 수 있으니 새로고침해서 확인해 주세요') }
  if(j.error==='AUTH'){logout(true);throw new Error('AUTH')}
  if(!j.ok) throw new Error(j.message||j.error||'오류가 발생했어요');
  return j;
}
function prefetch(){
  if(!S.data)return; const me=S.data.me, x=S.data.x||{}, wk=monday(new Date());
  const list=[['inbox',{}],['notice.list',{}],['schedule.week',{branch:me.branch,start:wk}],['exp.list',{}],['log.list',{}],['kudos.list',{}],['swap.list',{}],['payslip.list',{}],['cert.list',{}],['quiz.get',{}],['inc.list',{}],['check.get',{kind:'오픈'}],['check.get',{kind:'마감'}]];
  if(x.isHQ)list.unshift(['console',{}],['schedule.overview',{start:wk}]);
  let i=0;const lane=async()=>{while(i<list.length){const [a,d]=list[i++];try{await api(a,d,0,true)}catch(e){}}};for(let k=0;k<4;k++)lane();
}
function logout(silent){try{localStorage.removeItem(MEMK())}catch(e){}S.mem={};api('logout').catch(()=>{});localStorage.removeItem('tsbp_token');S.token='';S.data=null;if(!silent)toast('로그아웃했어요');renderLogin()}
function greet(){const h=new Date().getHours();return h<6?'늦은 밤까지 수고 많아요':h<11?'좋은 아침이에요':h<17?'좋은 오후예요':'좋은 저녁이에요'}
function openSheet(html,onMount){const m=document.createElement('div');m.className='mask';m.innerHTML=`<div class="sheet"><button class="x" data-close>닫기</button>${html}</div>`;m.addEventListener('click',e=>{if(e.target===m||e.target.hasAttribute('data-close'))m.remove()});document.body.appendChild(m);onMount&&onMount(m);return m}
const busy=(b,on,txt)=>{if(!b)return;if(on){b.dataset.t=b.innerHTML;b.classList.add('busy');b.innerHTML=txt||'<div class="spin"></div>'}else{b.classList.remove('busy');b.innerHTML=b.dataset.t||b.innerHTML}};
const back = (href,label='뒤로')=>`<a class="back" href="${href||'javascript:history.back()'}">${I('back',16)} ${label}</a>`;
const loading = ()=>`<div style="padding:20px var(--pad)"><div class="sk" style="height:120px"></div><div class="sk" style="height:220px;margin-top:8px"></div></div>`;
function fileToDataUrl(file,max=1400,q=.78){return new Promise((res,rej)=>{if(file.type==='application/pdf'){const fr=new FileReader();fr.onload=()=>res(fr.result);fr.onerror=rej;fr.readAsDataURL(file);return}
  const img=new Image();img.onload=()=>{const s=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=img.width*s;c.height=img.height*s;c.getContext('2d').drawImage(img,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',q))};img.onerror=rej;img.src=URL.createObjectURL(file)})}
async function openFile(id,label){
  const m=openSheet(`<h2>${esc(label||'파일')}</h2><div class="empty"><div class="spin d" style="margin:0 auto"></div><br>불러오는 중…</div>`);
  try{const j=await api('file.get',{id});const bin=atob(j.b64);const u8=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u8[i]=bin.charCodeAt(i);
    const url=URL.createObjectURL(new Blob([u8],{type:j.mime}));
    m.querySelector('.sheet').innerHTML=`<button class="x" data-close>닫기</button><h2>${esc(label||j.name)}</h2>${j.mime.startsWith('image')?`<img src="${url}" style="width:100%;margin-top:12px">`:`<p class="note" style="padding:8px 0">${esc(j.name)}</p>`}<a class="pill wine full" style="margin-top:14px" href="${url}" target="_blank" download="${esc(j.name)}">${j.mime.startsWith('image')?'원본 저장':'PDF 열기'}</a>`;
  }catch(e){m.querySelector('.sheet').innerHTML=`<button class="x" data-close>닫기</button><h2>열 수 없어요</h2><p class="note">${esc(e.message)}</p>`}
}
/* ── login ── */
function renderLogin(step='email',email=''){
  document.body.classList.remove('wide');
  $('#root').innerHTML = `<div class="login"><div class="top"><img src="${LOGO}" alt="TAP SHOP BAR"><span class="new">PEOPLE</span></div>
   <div class="bot"><span class="tag"><i class="new">NEW</i> 직원 전용 앱</span>
    <h1>${step==='email'?'함께 일하는<br>사람들의 공간.':'메일로 받은<br>6자리 코드.'}</h1>
    <p>${step==='email'?'출퇴근, 스케줄, 휴가, 경비까지. 폰 하나로 끝내요.':esc(email)+' 으로 코드를 보냈어요.'}</p>
    ${step==='email'
      ?`<label for="em" style="display:block;font-size:12px;font-weight:800;letter-spacing:.04em;margin-bottom:6px">회사 이메일</label><input class="in" id="em" name="email" type="email" inputmode="email" autocomplete="username email" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" placeholder="name@tsb.wine" value="${esc(email||localStorage.getItem('tsbp_email')||'')}"><div id="lerr" style="display:none;background:rgba(244,49,49,.92);color:#fff;padding:12px 14px;margin-top:10px;font-size:14px;line-height:1.5;font-weight:600"></div><button class="pill" id="go">코드 받기</button>`
      :`<input class="in otp" id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="······"><button class="pill" id="go">시작하기</button><button class="pill line" style="color:#fff;margin-top:10px" id="re">다른 이메일로</button>`}
    ${step==='email'&&GOOGLE_CLIENT_ID.indexOf('__')<0?`<div style="display:flex;align-items:center;gap:12px;margin:22px 0 14px;font-size:12px;font-weight:800;letter-spacing:.1em;opacity:.75"><span style="flex:1;height:1px;background:rgba(255,255,255,.5)"></span>또는<span style="flex:1;height:1px;background:rgba(255,255,255,.5)"></span></div><div id="gbtn" style="display:flex;justify-content:center;min-height:44px"></div>`:''}
    <div class="slogan">wine is second americano</div></div></div>`;
  if(step==='email')initGoogle();
  const go=$('#go');
  if(step==='email'){
    const f=async()=>{const em=$('#em').value.trim().toLowerCase();const er=$('#lerr');er.style.display='none';if(!em)return;busy(go,true,'확인 중…');
      try{await api('auth.request',{email:em});localStorage.setItem('tsbp_email',em);renderLogin('code',em)}
      catch(e){busy(go,false);er.innerHTML=/직원 이메일이 아니/.test(e.message)?`<b>탭샵바 직원 이메일이 아니에요.</b><br>등록된 회사 이메일로 다시 확인해 주시고, 처음이라면 점장님께 등록을 요청해 주세요.`:esc(e.message);er.style.display='block'}};
    go.onclick=f;$('#em').onkeydown=e=>e.key==='Enter'&&f();
  }else{
    $('#re').onclick=()=>renderLogin('email',email);
    const c=$('#code');c.focus();
    const f=async()=>{if(c.value.length<6)return;busy(go,true,'확인 중…');
      try{const j=await api('auth.verify',{email,code:c.value});S.token=j.token;localStorage.setItem('tsbp_token',j.token);boot()}catch(e){toast(e.message);busy(go,false)}};
    go.onclick=f;c.oninput=()=>{c.value=c.value.replace(/\D/g,'');if(c.value.length===6)f()};
  }
}
function initGoogle(){
  if(GOOGLE_CLIENT_ID.indexOf('__')===0)return;
  const draw=()=>{const el=$('#gbtn');if(!el||!window.google||!google.accounts)return;
    google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:onGoogle,ux_mode:'popup',auto_select:false});
    google.accounts.id.renderButton(el,{theme:'filled_black',size:'large',shape:'pill',text:'signin_with',locale:'ko',width:Math.min(380,el.clientWidth||320)})};
  if(window.google&&google.accounts)return draw();
  if(!document.getElementById('gsi')){const s=document.createElement('script');s.id='gsi';s.src='https://accounts.google.com/gsi/client';s.async=true;s.onload=draw;document.head.appendChild(s)}else setTimeout(draw,600);
}
async function onGoogle(resp){
  const er=$('#lerr');if(er)er.style.display='none';
  try{const j=await api('auth.google',{credential:resp.credential});S.token=j.token;localStorage.setItem('tsbp_token',j.token);localStorage.setItem('tsbp_email',j.me.email);boot()}
  catch(e){if(er){er.innerHTML=/직원 이메일이 아니/.test(e.message)?`<b>탭샵바 직원 이메일이 아니에요.</b><br>${esc(e.message.replace(/^.*\(/,'(').replace(/\)$/,')'))} 등록된 회사 계정으로 로그인하거나, 점장님께 등록을 요청해 주세요.`:esc(e.message);er.style.display='block'}else toast(e.message)}
}
function renderRegister(me,pending){
  $('#root').innerHTML = `<div class="login"><div class="top"><img src="${LOGO}" alt="TAP SHOP BAR"><span class="new">PEOPLE</span></div><div class="bot">
   <h1>${pending?'승인을<br>기다리고 있어요.':'처음 오셨네요!'}</h1>
   <p>${pending?'점장님 또는 박한울 매니저님이 확인하면 바로 쓸 수 있어요. 승인되면 메일로 알려드릴게요.':'간단한 정보만 알려 주세요. 점장님 확인 후 바로 시작해요.'}</p>
   ${pending?`<button class="pill" id="rf">새로고침</button><button class="pill line" style="color:#fff;margin-top:10px" id="lo">로그아웃</button>`:`
    <input class="in" id="nm" placeholder="이름 (실명)">
    <select class="in" id="br" style="margin-top:8px"><option value="">근무 지점</option>${BR.map(b=>`<option>${b}</option>`).join('')}</select>
    <div class="two" style="margin-top:8px"><input class="in" id="hd" type="date" title="입사일"><input class="in" id="ph" inputmode="tel" placeholder="휴대폰"></div>
    <div style="font-size:12px;opacity:.75;margin-top:8px;font-weight:600">입사일은 연차 계산에 쓰여요</div>
    <button class="pill" id="go">가입 요청</button>`}
   <div class="slogan">${esc(me.email||'')}</div></div></div>`;
  if(pending){$('#rf').onclick=boot;$('#lo').onclick=()=>logout()}
  else $('#go').onclick=async()=>{const name=$('#nm').value.trim(),branch=$('#br').value;if(!name||!branch)return toast('이름과 지점을 입력해 주세요');
    try{await api('register',{name,branch,hire:$('#hd').value,phone:$('#ph').value});renderRegister(me,true)}catch(e){toast(e.message)}};
}
/* ── shell ── */
async function boot(){
  if(!S.token) return renderLogin();
  memLoad();
  $('#root').innerHTML = `<div class="app"><div class="hero" style="height:300px"></div>${loading()}</div>`;
  try{
    const j = await api('me');
    if(j.pending) return renderRegister(j.me, j.me.status==='대기');
    S.data=j; shell(); route(); setTimeout(prefetch,1500);
  }catch(e){ if(e.message!=='AUTH'){ $('#root').innerHTML=`<div class="app"><div class="title" style="padding-top:120px"><h1>연결이<br>불안정해요.</h1><p>잠시 후 다시 시도해 주세요.</p></div><div class="btnrow"><button class="pill ink" onclick="boot()">다시 시도</button></div></div>` } }
}
async function refresh(){try{const j=await apiRaw('me');S.data=j;S.mem['me{}']={t:Date.now(),v:JSON.stringify(j)};memSave();shell(true)}catch(e){}}
function shell(keep){
  const d=S.data, unread=d.notis.filter(n=>!n.read).length;
  const h=location.hash.replace(/^#\/?/,'').split('/')[0];
  const html = `${d.testMode?'<div class="test">테스트 모드 · 알림 메일은 hello@ 로만 가요</div>':''}
   <header class="hdr ${h===''?'dark':''}" id="hdr"><a class="brand" href="#/"><img class="logo" src="${LOGO}" alt="TAP SHOP BAR"><small>People</small></a>
   <div class="r">${d.x&&d.x.isHQ?`<a class="ic" href="#/console" title="본사 콘솔">${I('grid',20)}</a>`:''}<a class="ic" href="#/notis">${I('bell',21)}${unread?`<span class="dot">${unread}</span>`:''}</a></div></header>
   <main id="view"></main>
   <nav class="nav">
    <a href="#/" data-r="">${I('home')}홈</a>
    <a href="#/schedule" data-r="schedule">${I('cal')}스케줄</a>
    <a href="#/apply" data-r="apply" class="plus"><span class="pl">${I('plus',24)}</span>신청</a>
    <a href="#/inbox" data-r="inbox">${I('inbox')}결재${d.inboxCount?`<span class="dot">${d.inboxCount}</span>`:''}</a>
    <a href="#/more" data-r="more">${I('more')}더보기</a></nav>`;
  if(!keep||!$('.app')){$('#root').innerHTML=`<div class="app">${html}</div>`}
  else{const v=$('#view').innerHTML;$('.app').innerHTML=html;$('#view').innerHTML=v;}
  markNav();
}
function markNav(){const r=(location.hash.replace(/^#\/?/,'').split('/')[0]||'');const map={log:'',avail:'schedule',check:'',incident:'apply',quiz:'',kudos:'',req:'apply',new:'apply',exp:'apply',swap:'schedule',close:'more',notice:'more',payslip:'more',cert:'more',onb:'more',pay:'more',cal:'schedule',att:'more',admin:'more',console:'more'};
  document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===(map[r]||r)));const hd=$('#hdr');if(hd)hd.classList.toggle('dark',r==='')}
const ROUTES = {};
function route(keep){
  if(!S.data) return;
  keep=keep===true; const sy=window.scrollY; S.curKeys=new Set(['me{}']);
  clearInterval(S.clockT); if(S.map){try{S.map.remove()}catch(e){} S.map=null}
  const h=location.hash.replace(/^#\/?/,''); const [p,...rest]=h.split('/'); const a=rest.map(decodeURIComponent).join('/');
  document.body.classList.toggle('wide',p==='console');
  markNav(); if(!keep)window.scrollTo(0,0);
  const v=$('#view');
  const r=(ROUTES[p]||ROUTES[''])(v,a);
  if(keep)Promise.resolve(r).then(()=>window.scrollTo(0,sy));
}
window.addEventListener('hashchange',route);
/* ── HOME ── */
ROUTES['']=function vHome(v){
  const d=S.data, me=d.me, b=d.balance, at=d.attendance, x=d.x||{};
  const granted=(b.granted||0)+(Number(b.adj)||0), pct=b.known&&granted?Math.max(0,Math.min(100,(b.remain/granted)*100)):0;
  const ns=(x.shifts||[])[0];
  const cel=(x.celebrate&&x.celebrate.list)||[], mine=cel.filter(c=>c.mine), others=cel.filter(c=>!c.mine);
  v.innerHTML = `
  <section class="hero">
    <div class="hi">${greet()}</div>
    <h1>${esc(me.name)}님,<br><span style="opacity:.7">${esc(me.branch)} · ${esc(me.role)}</span></h1>
    ${b.known?`<div class="big"><b>${b.remain}</b><span>일 남은 연차</span>${b.pending?`<i class="new" style="margin:0 0 8px auto">결재중 ${b.pending}일</i>`:''}</div>
    <div class="meter"><i style="width:${pct}%"></i></div>
    <div class="meta"><span>발생 ${granted}일 · 사용 ${b.used}일</span><span>${b.firstYear?'입사 1년 차':`근속 ${b.years}년`}</span></div>`
    :`<div class="big"><b>${b.used||0}</b><span>일 사용한 연차</span></div><div class="meta" style="margin-top:10px"><span>입사일이 등록되면 남은 연차를 보여드려요</span></div>`}
    <a class="shiftline" href="#/schedule"><span>${ns?`다음 근무 ${fmtDay(ns.date)} ${esc(ns.start)}–${esc(ns.end)}${ns.pos?' · '+esc(ns.pos):''}`:'확정된 다음 근무가 없어요'}</span><span class="u" style="font-size:12.5px">스케줄</span></a>
  </section>
  ${x.unreadRequired?`<a class="bn y" href="#/notice"><div><b>필독 공지 ${x.unreadRequired}건</b><span>읽고 확인 버튼을 눌러 주세요</span></div><span class="go">읽기</span></a>`:''}
  ${d.inboxCount?`<a class="bn n" href="#/inbox"><div><b>결재할 문서 ${d.inboxCount}건</b><span>기다리고 있어요</span></div><span class="go">결재하기</span></a>`:''}
  ${d.pendingUsers?`<a class="bn w" href="#/admin"><div><b>가입 요청 ${d.pendingUsers}명</b><span>확인 후 승인해 주세요</span></div><span class="go">확인</span></a>`:''}
  ${!x.availDone&&(me.role==='직원'||me.role==='점장')?`<a class="bn" href="#/avail/${x.nextMon}"><div><b>다음 주 근무 가능 시간</b><span>${fmtDay(x.nextMon)} 주 · 아직 안 냈어요</span></div><span class="go">제출</span></a>`:''}
  ${x.kudosNew?`<a class="bn y" href="#/kudos"><div><b>칭찬카드 ${x.kudosNew}장 도착!</b><span>동료가 고마운 마음을 보냈어요</span></div><span class="go">열기</span></a>`:''}
  ${x.incOpen?`<a class="bn w" href="#/incident"><div><b>처리 중인 사고·클레임 ${x.incOpen}건</b><span>확인하고 처리 완료해 주세요</span></div><span class="go">보기</span></a>`:''}
  ${x.swapOpen?`<a class="bn" href="#/swap"><div><b>대타 구해요 ${x.swapOpen}건</b><span>우리 지점 동료가 도움을 기다려요</span></div><span class="go">보기</span></a>`:''}
  ${mine.map(c=>`<section class="cele"><span class="new" style="background:var(--ink);color:#fff">TODAY</span><h3 style="margin-top:10px">${esc(c.title)},<br>${esc(me.name)}님!</h3><p>${c.kind==='생일'?'오늘 하루 와인처럼 무르익는 날 되세요.':'탭샵바와 함께해 줘서 고마워요.'}</p>${(x.celebrate.cheers||[]).map(ch=>`<div class="cheer"><b>${esc(ch.from)}</b> · ${esc(ch.msg)}</div>`).join('')}</section>`).join('')}
  ${others.map(c=>`<section class="cele" style="background:var(--grey)"><span class="new">TODAY</span><h3 style="margin-top:10px;font-size:22px">오늘은 ${esc(c.name)}님<br>${esc(c.title.replace(' 축하해요',''))}!</h3><button class="pill sm ink" style="margin-top:12px" onclick="sendCheer('${esc(c.email)}','${esc(c.name)}','${esc(c.kind)}')">축하 카드 보내기</button></section>`).join('')}
  ${x.onboarding?`<a class="blk" href="#/onb" style="display:block;background:var(--grey)"><span class="tag"><i class="new">WELCOME</i> 온보딩 ${x.onboarding.done}/${x.onboarding.total}</span><div style="font-size:20px;font-weight:800;letter-spacing:-.03em;margin-top:8px">다음: ${esc(x.onboarding.next.title)}</div><div class="prog"><i style="width:${x.onboarding.done/x.onboarding.total*100}%"></i></div></a>`:''}
  <section class="blk navy" id="punchBlk">
    <div class="punch"><div class="clock"><div class="t" id="clk">--:--</div><div class="s" id="clkd"></div>
      ${at.working?`<div class="live" id="wk">근무 중 · ${esc(at.since)}부터</div>`:''}</div>
      <button class="pill ${at.working?'y':''}" id="pb">${at.working?'퇴근하기':'출근하기'}</button></div>
    <div id="pres"></div>
  </section>
  <div class="sec"><h2>바로 신청</h2><a href="#/apply">전체</a></div>
  <div class="grid g3">
    <a class="tile w" href="#/new/연차"><b>연차<br>반차</b><small>점장 → 매니저</small></a>
    <a class="tile n" href="#/new/휴가"><b>휴가</b><small>경조·병가·공가</small></a>
    <a class="tile p" href="#/exp/new" style="background-image:url(assets/a26_men_B.jpg);background-position:50% 25%"><b>경비<br>청구</b><small>영수증 찰칵</small></a>
    <a class="tile" href="#/swap"><b>대타<br>게시판</b><small>${x.swapOpen?x.swapOpen+'건 모집중':'근무 바꾸기'}</small></a>
    <a class="tile y" href="#/payslip"><b>급여<br>명세서</b><small>바로 열람</small></a>
    <a class="tile" href="#/cert"><b>증명서</b><small>재직·경력</small></a>
  </div>
  <div class="sec"><h2>매장 · 성장</h2></div>
  <div class="grid g3">
    <a class="tile w" href="#/log"><b>업무<br>일지</b><small>한 줄 남기기</small></a>
    <a class="tile ${x.check&&x.check['오픈']?'':'y'}" href="#/check/오픈"><b>오픈<br>체크</b><small>${x.check&&x.check['오픈']?'✓ '+esc(x.check['오픈'].by)+' '+esc(x.check['오픈'].at):'아직 안 했어요'}</small></a>
    <a class="tile ${x.check&&x.check['마감']?'':'n'}" href="#/check/마감"><b>마감<br>체크</b><small>${x.check&&x.check['마감']?'✓ '+esc(x.check['마감'].by)+' '+esc(x.check['마감'].at):'아직 안 했어요'}</small></a>
    <a class="tile n" href="#/incident/new"><b>사고 ·<br>클레임</b><small>바로 보고</small></a>
    <a class="tile p" href="#/quiz" style="background-image:url(assets/americano.jpg)"><b>와인<br>퀴즈</b><small>이번 달 랭킹</small></a>
    <a class="tile" href="#/kudos"><b>칭찬<br>카드</b><small>고마운 동료에게</small></a>
  </div>
  ${(x.notices||[]).length?`<div class="sec"><h2>공지 · 매뉴얼</h2><a href="#/notice">전체</a></div><div class="list">${x.notices.slice(0,3).map(n=>`<a class="li" href="#/notice/${n.id}"><div class="m"><div class="t1">${n.pinned?'<i class="new" style="margin-right:6px">PIN</i>':''}${esc(n.title)}</div><div class="t2">${esc(n.by)} · ${esc(String(n.at).slice(5,10))}</div></div>${n.required?chip(n.read?'읽음':'안읽음',n.read?'확인함':'필독'):''}</a>`).join('')}</div>`:''}
  <div class="sec"><h2>내 신청</h2><a href="#/apply">전체</a></div>
  <div class="list">${reqRows(d.requests.slice(0,3))||'<div class="empty">아직 신청 내역이 없어요</div>'}</div>
  ${d.canAdmin?`<div class="sec"><h2>오늘 우리 매장</h2>${x.isHQ?'<a href="#/console">본사 콘솔</a>':'<a href="#/schedule">스케줄</a>'}</div><div id="board" class="list"><div class="sk" style="height:60px"></div></div>`:''}
  <div class="note" style="text-align:center;padding:34px 0 10px;letter-spacing:.06em">wine is second americano</div>`;
  const tick=()=>{const n=new Date();const c=$('#clk');if(!c)return;c.textContent=`${pad(n.getHours())}:${pad(n.getMinutes())}`;$('#clkd').textContent=`${n.getMonth()+1}월 ${n.getDate()}일 ${WD[n.getDay()]}요일`;
    if(at.working&&at.sinceTs&&$('#wk')){const m=Math.floor((Date.now()-at.sinceTs)/60000);$('#wk').textContent=`근무 중 · ${Math.floor(m/60)}시간 ${m%60}분째`}};
  tick(); S.clockT=setInterval(tick,15000);
  $('#pb').onclick=()=>doPunch(at.working?'퇴근':'출근');
  if(d.canAdmin) api('board').then(j=>{const el=$('#board');if(!el)return;
    el.innerHTML=(j.working.length?j.working.map(w=>`<div class="li" style="cursor:default">${ava(w.name,'직원',36)}<div class="m"><div class="t1">${esc(w.name)} <span style="font-weight:600;color:var(--mute);font-size:12.5px">${esc(w.branch)}</span></div><div class="t2">출근 ${esc(w.in||'-')}${w.out?' · 퇴근 '+esc(w.out):''}</div></div>${chip(w.out?'취소':'정상',w.out?'퇴근':'근무중')}</div>`).join(''):'<div class="empty">아직 출근 기록이 없어요</div>')+
    (j.off.length?`<div class="note" style="padding:10px 0">오늘 휴가: ${j.off.map(o=>esc(o.name)+'('+esc(o.type)+')').join(', ')}</div>`:'')}).catch(()=>{});
};
window.sendCheer=(email,name,kind)=>openSheet(`<h2>${esc(name)}님께</h2><p class="note" style="padding:4px 0">축하 카드는 앱 홈과 알림으로 전달돼요</p><textarea class="in" id="cm" placeholder="예) 생일 축하해요! 오늘 마감은 제가 할게요"></textarea><button class="pill wine full" style="margin-top:14px" id="sd">보내기</button>`,m=>{
  m.querySelector('#sd').onclick=async()=>{try{await api('cheer.send',{email,kind,message:m.querySelector('#cm').value});m.remove();toast('축하 카드를 보냈어요')}catch(e){toast(e.message)}}});
function reqRows(list){return list.map(r=>`<a class="li" href="#/req/${r.id}"><div class="m"><div class="t1">${esc(r.type)} <span style="color:var(--mute);font-weight:600;font-size:13px">${r.days}일</span></div><div class="t2">${period(r)}${r.name&&r.email!==S.data.me.email?' · '+esc(r.name):''}</div></div>${chip(r.status,r.status==='진행중'?stepLabel(r):r.status)}</a>`).join('')}
function stepLabel(r){const s=r.steps[r.stepIdx];return s?`${s.name} 결재중`:'진행중'}
/* ── punch ── */
function doPunch(kind,extra={}){
  if(kind==='퇴근'&&extra.line===undefined){
    return openSheet(`<h2>오늘 한 줄</h2><p class="note" style="padding:2px 0 0">오늘 매장에서 있었던 일, 내일 알아야 할 것을 한 줄만. 매일 저녁 본사로 모아서 보내요.</p>
      <textarea class="in" id="ol" style="margin-top:12px" placeholder="예) 단체 12명 예약 손님 만족, 3번 탭 노즐 물 샘"></textarea>
      <div class="presets">${['특이사항 없음','바빴어요, 무사 마감','재고 확인 필요','손님 칭찬 받음'].map(t=>`<button data-q="${t}">${t}</button>`).join('')}</div>
      <div class="btnrow" style="padding:20px 0 0"><button class="pill line" id="sk">건너뛰기</button><button class="pill wine" id="ok">남기고 퇴근</button></div>`,m=>{
      m.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{m.querySelector('#ol').value=b.dataset.q});
      m.querySelector('#sk').onclick=()=>{m.remove();doPunch(kind,{line:''})};
      m.querySelector('#ok').onclick=()=>{const v=m.querySelector('#ol').value.trim();if(!v)return toast('한 줄만 적어 주세요 (또는 건너뛰기)');m.remove();doPunch(kind,{line:v})};
    });
  }
  if(!localStorage.getItem('tsbp_geo_ok')){
    return openSheet(`<h2>위치 확인 동의</h2><div style="font-size:15px;line-height:1.75;font-weight:500;margin-top:8px">출퇴근 버튼을 누르는 <b>그 순간에만</b> 위치를 1번 확인해요.<br>· 목적: 근무지 출퇴근 확인 · 급여 정산 참고<br>· 열람: 회사 관리자(대외비 시트)만<br>· 평소에는 위치를 추적하지 않아요</div>
      <button class="pill wine full" style="margin-top:18px" id="ok">동의하고 계속</button>`,m=>{
      m.querySelector('#ok').onclick=()=>{localStorage.setItem('tsbp_geo_ok','1');m.remove();doPunch(kind,extra)}});
  }
  const pb=$('#pb'); busy(pb,true,'<div class="spin d"></div>');
  const hav=(a,b,c2,d)=>{const R=6371000,t=Math.PI/180,x=Math.sin((c2-a)*t/2)**2+Math.cos(a*t)*Math.cos(c2*t)*Math.sin((d-b)*t/2)**2;return 2*R*Math.asin(Math.sqrt(x))};
  const check=pos=>{
    const {latitude:la,longitude:lo,accuracy:ac}=pos.coords; let near=null,dist=1e12;
    S.data.branches.forEach(b=>{if(b.lat){const d=hav(la,lo,b.lat,b.lng);if(d<dist){dist=d;near=b}}});
    const myB=S.data.branches.find(b=>b.name===S.data.me.branch);
    const myD=myB&&myB.lat?hav(la,lo,myB.lat,myB.lng):null;
    if(myD!=null&&myD<=myB.radius+Math.min(ac||0,100))return send(pos);
    if(!myB||!myB.lat)return send(pos);
    const other=near&&dist<=near.radius+Math.min(ac||0,100)&&near.name!==S.data.me.branch;
    busy(pb,false);
    openSheet(`<h2 style="color:var(--bad)">위치를 확인해 주세요</h2>
      <div class="warn" style="font-size:14.5px;line-height:1.6">${other?`지금 <b>${esc(near.name)}점</b> 근처예요.<br>소속은 <b>${esc(S.data.me.branch)}점</b>이에요.`:`지금 <b>${esc(S.data.me.branch)}점</b>에서 <b>${myD>=1000?(myD/1000).toFixed(1)+'km':Math.round(myD)+'m'}</b> 떨어져 있어요.`}</div>
      <p class="note" style="padding:10px 0 0">이대로 ${kind}하면 기록은 남지만 점장님께 "위치 확인" 알림이 가요.</p>
      <label class="f">사유</label><div class="presets">${(other?['다른 지점 지원 근무','외부 업무 · 행사','GPS 오류 같아요','기타']:['외부 업무 · 행사','배달 · 장보기','GPS 오류 같아요','기타']).map((r,i)=>`<button data-r="${r}" class="${i===0?'on':''}">${r}</button>`).join('')}</div>
      <input class="in" id="rn" placeholder="메모 (선택)" style="margin-top:10px">
      <div class="btnrow" style="padding:20px 0 0"><button class="pill line" data-close>취소</button><button class="pill wine" id="go">이대로 ${kind}</button></div>`,m=>{
      let reason=m.querySelector('[data-r].on').dataset.r;
      m.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>{m.querySelectorAll('[data-r]').forEach(x=>x.classList.remove('on'));b.classList.add('on');reason=b.dataset.r});
      m.querySelector('#go').onclick=()=>{const n=m.querySelector('#rn').value.trim();m.remove();busy($('#pb'),true,'<div class="spin d"></div>');send(pos,reason+(n?' · '+n:''))};
    });
  };
  const send=async(pos,err)=>{
    try{
      const j=await api('punch',{kind,lat:pos?pos.coords.latitude:null,lng:pos?pos.coords.longitude:null,acc:pos?pos.coords.accuracy:null,note:err||'',oneLine:extra.line||''});
      S.data.attendance=j.attendance; if(navigator.vibrate) navigator.vibrate(30);
      ROUTES[''](  $('#view') );
      const ok=String(j.verdict).indexOf('정상')===0;
      $('#pres').innerHTML=`<div class="res">${chip(ok?'정상':'반경밖',j.verdict)}<b>${kind} ${esc(j.time)}</b><span style="opacity:.75">${j.nearest?`${esc(j.nearest)}점에서 ${j.dist}m`:'위치 없음'}</span></div>${pos?'<div class="map" id="mp"></div>':''}`;
      toast(ok?(kind==='출근'?'출근 완료! 오늘도 잘 부탁해요':'퇴근 완료! 수고 많았어요'):`${kind} 기록 · 점장님께 위치 확인 알림이 갔어요`,3200);
      if(pos) drawMap(pos.coords.latitude,pos.coords.longitude,j.nearest);
      document.getElementById('punchBlk').scrollIntoView({behavior:'smooth',block:'center'});
    }catch(e){toast(e.message);ROUTES['']($('#view'))}
  };
  if(!navigator.geolocation) return send(null,'GPS 미지원 기기');
  navigator.geolocation.getCurrentPosition(p=>check(p),err=>{
    busy(pb,false);
    openSheet(`<h2>위치를 켜 주세요</h2><div style="font-size:14.5px;line-height:1.75;font-weight:500;margin-top:8px">출퇴근은 위치 확인이 필요해요.<br><br><b>iPhone</b> 설정 → 개인정보 보호 → 위치 서비스 → Safari(또는 Chrome) → 앱을 사용하는 동안<br><b>Android</b> 주소창 자물쇠 → 권한 → 위치 허용</div>
      <button class="pill wine full" style="margin-top:16px" id="rt">다시 시도</button><button class="pill line full" style="margin-top:8px" id="nl">위치 없이 기록 (점장 확인 필요)</button>`,m=>{
      m.querySelector('#rt').onclick=()=>{m.remove();doPunch(kind,extra)};m.querySelector('#nl').onclick=()=>{m.remove();send(null,'위치 거부: '+err.message)}});
  },{enableHighAccuracy:true,timeout:15000,maximumAge:0});
}
function drawMap(lat,lng,near){
  const go=()=>{if(!window.L||!$('#mp'))return;S.map=L.map('mp',{zoomControl:false,attributionControl:false}).setView([lat,lng],16);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{maxZoom:19}).addTo(S.map);
    const b=S.data.branches.find(x=>x.name===near);
    if(b&&b.lat){L.circle([b.lat,b.lng],{radius:b.radius,color:'#FFC100',weight:1.5,fillColor:'#FFC100',fillOpacity:.12}).addTo(S.map);S.map.fitBounds(L.latLngBounds([[lat,lng],[b.lat,b.lng]]).pad(.6))}
    L.circleMarker([lat,lng],{radius:8,color:'#fff',weight:3,fillColor:'#F43131',fillOpacity:1}).addTo(S.map)};
  window.L?go():setTimeout(go,800);
}
/* ── 신청 허브 ── */
ROUTES.apply=function(v){
  const d=S.data;
  v.innerHTML=`<div class="title"><h1>신청</h1><p>필요한 걸 고르면, 결재선은 알아서 잡혀요.</p></div>
  <div class="list" style="margin-top:14px">
   ${[['#/new/연차','연차 · 반차','점장 승인 → 박한울 매니저 승인 · 장분도·나기정 보고'],['#/new/휴가','휴가 (경조·병가·공가 등)','점장 → 매니저 → 이사 승인 · 대표 보고'],['#/exp/new','경비 · 소모품 청구','영수증 사진만 찍으면 이체 메모까지 자동'],['#/swap','대타 요청','내 근무를 동료에게 넘기기 · 점장 승인'],['#/incident/new','사고 · 클레임 보고','유형·긴급도는 AI가 자동 분류'],['#/avail','근무 가능 시간','다음 주 가능한 시간 제출'],['#/cert','재직 · 경력증명서','PDF로 바로 발급'],['#/payslip','급여명세서','본인만 열람']].map(([h,t,s])=>`<a class="li" href="${h}"><div class="m"><div class="t1">${t}</div><div class="t2">${s}</div></div><span class="ar">${I('next',18)}</span></a>`).join('')}
  </div>
  <a class="blk" href="${esc(d.policyUrl)}" target="_blank" rel="noopener" style="display:block;margin-top:18px;background:var(--grey)"><span class="tag"><i class="new">규정</i></span><div style="font-size:20px;font-weight:800;letter-spacing:-.03em;margin-top:8px">휴가 및 휴직 가이드</div><span class="u" style="margin-top:10px;font-size:13px">Notion에서 전문 읽기</span></a>
  <div class="sec"><h2>내 휴가 신청</h2></div><div class="list">${reqRows(d.requests)||'<div class="empty">아직 없어요</div>'}</div>
  <div class="sec"><h2>내 경비 청구</h2><a href="#/exp">전체</a></div><div class="list" id="myexp"><div class="sk" style="height:50px"></div></div>`;
  api('exp.list').then(j=>{const el=$('#myexp');if(el)el.innerHTML=expRows(j.items.slice(0,5))||'<div class="empty">아직 없어요</div>'}).catch(()=>{});
};
/* ── 휴가 신청 ── */
ROUTES.new=function(v,g){
  g = g==='휴가'?'휴가':'연차';
  const d=S.data, list=TYPES.filter(t=>t.g===g);
  const st={type:list[0],start:'',end:'',days:1};
  const chain=d.chain[g]; const today=ymd(new Date());
  v.innerHTML=`${back('#/apply','신청')}
   <div class="title"><h1>${g==='연차'?'연차 · 반차':'휴가 신청'}</h1>${g==='연차'&&d.balance.known?`<p>남은 연차 <b style="color:var(--ink)">${d.balance.remain}일</b>${d.balance.pending?` · 결재중 ${d.balance.pending}일`:''}</p>`:''}</div>
   <div class="seg"><button data-g="연차" class="${g==='연차'?'on':''}">연차 · 반차</button><button data-g="휴가" class="${g==='휴가'?'on':''}">특별 휴가</button></div>
   <div class="form"><label class="f">유형</label><div class="types">${list.map((t,i)=>`<button class="type ${i===0?'on':''}" data-i="${i}"><b>${t.label}</b><small>${t.sub}</small></button>`).join('')}</div>
   <div id="dates"></div>
   <label class="f">사유 ${g==='연차'?'<em>(선택)</em>':''}</label><textarea class="in" id="rs" placeholder="${g==='연차'?'예) 가족 여행':'예) 친형 결혼식 (10/25 토)'}"></textarea>
   <div id="docs"></div><div class="policy" id="pol"></div>
   <label class="check"><input type="checkbox" id="ag"> <span>휴가 규정을 확인했고, 점장님과 스케줄을 먼저 맞췄어요</span></label>
   <label class="f">결재선</label>${lineHTML(d.me,chain.steps.map(s=>({...s,status:'대기'})),chain.report,-1)}
   <p class="note" style="padding:6px 0 0">${g==='연차'?'점장님 승인 후 박한울 매니저가 승인하면 장분도 이사 · 나기정 대표에게 보고돼요.':'모든 승인이 끝나면 나기정 대표에게 보고돼요.'}</p></div>
   <div class="btnrow"><button class="pill wine" id="sb">신청하기</button></div>`;
  v.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>location.hash='#/new/'+b.dataset.g);
  const draw=()=>{const t=st.type;
    $('#dates').innerHTML = t.half?`<label class="f">날짜</label><input class="in" type="date" id="sd" value="${st.start}">`
      :`<div class="two"><div><label class="f">시작일</label><input class="in" type="date" id="sd" value="${st.start}"></div><div><label class="f">종료일</label><input class="in" type="date" id="ed" value="${st.end}"></div></div>
        <label class="f">사용 일수 <em>근무일 기준으로 조정</em></label><div class="stepper"><button id="mn">−</button><b id="dy">${st.days}</b><button id="pl">+</button></div>`;
    $('#pol').innerHTML=`<h4>${esc(t.label)} 규정 요약</h4>${esc(t.pol)}<br>· 사용일 <b>${d.minDays}일 전</b> 신청이 원칙이에요 (긴급 시 점장님께 먼저 연락)<br><a class="u" style="margin-top:8px;font-size:13px" href="${esc(d.policyUrl)}" target="_blank" rel="noopener">규정 전문 보기</a>`;
    $('#docs').innerHTML=t.docs?`<label class="f">증빙 링크 <em>(나중에 제출해도 돼요 · ${esc(t.docs)})</em></label><input class="in" id="pf" placeholder="구글드라이브 링크 등">`:'';
    const sd=$('#sd'),ed=$('#ed');
    const lead=()=>{const w=$('#lw');w&&w.remove();if(!st.start)return;const n=Math.round((pd(st.start)-pd(today))/864e5);if(n<d.minDays){const e=document.createElement('div');e.className='warn';e.id='lw';e.textContent=n<0?'지난 날짜예요. 사후 신청이라면 사유에 꼭 적어 주세요.':`사용일까지 ${n}일 남았어요. ${d.minDays}일 전 신청이 원칙이라 점장님께 먼저 말씀해 주세요.`;$('#dates').appendChild(e)}};
    const calc=()=>{if(t.half){st.days=.5;st.end=st.start;lead();return}if(st.start&&st.end&&st.end>=st.start)st.days=Math.round((pd(st.end)-pd(st.start))/864e5)+1;$('#dy').textContent=st.days;lead()};
    sd.onchange=()=>{st.start=sd.value;if(ed&&(!st.end||st.end<st.start)){st.end=st.start;ed.value=st.start}calc()};
    if(ed){ed.onchange=()=>{st.end=ed.value;calc()};$('#mn').onclick=()=>{st.days=Math.max(.5,st.days-.5);$('#dy').textContent=st.days};$('#pl').onclick=()=>{st.days+=.5;$('#dy').textContent=st.days}}
    if(t.half)st.days=.5;};
  v.querySelectorAll('.type').forEach(b=>b.onclick=()=>{v.querySelectorAll('.type').forEach(x=>x.classList.remove('on'));b.classList.add('on');st.type=list[+b.dataset.i];draw()});
  draw();
  $('#sb').onclick=async()=>{const reason=$('#rs').value.trim(),proof=$('#pf')?$('#pf').value.trim():'';
    if(!st.start)return toast('날짜를 골라 주세요'); if(!st.type.half&&!st.end)st.end=st.start;
    if(g==='휴가'&&!reason)return toast('사유를 적어 주세요'); if(!$('#ag').checked)return toast('규정 확인에 체크해 주세요');
    const sb=$('#sb');busy(sb,true,'보내는 중…');
    try{const j=await api('leave.create',{group:g,type:st.type.k,start:st.start,end:st.type.half?st.start:st.end,half:st.type.half||'',days:st.days,reason,proof,agree:true});
      toast('신청했어요! 결재가 시작됐어요');await refresh();location.hash='#/req/'+j.id}catch(e){toast(e.message);busy(sb,false)}};
};
function lineHTML(owner,steps,report,cur){
  let h=`<div class="line"><div class="ln done">${ava(owner.name,owner.role)}<div class="nm">${esc(owner.name)}</div><div class="rl">신청</div></div>`;
  steps.forEach((s,i)=>{const cls=s.status==='승인'?'done':s.status==='반려'?'rej':i===cur?'cur':'';
    h+=`<div class="arrow"></div><div class="ln ${cls}">${ava(s.name,s.role)}<div class="nm">${esc(s.name)}</div><div class="rl">${esc(s.role)}</div>${s.status!=='대기'||i===cur?`<div class="st" style="color:${s.status==='승인'?'var(--ok)':s.status==='반려'?'var(--bad)':'var(--warn)'}">${s.status==='대기'?'결재중':s.status}</div>`:''}</div>`});
  (report||[]).forEach(p=>{h+=`<div class="arrow" style="background:repeating-linear-gradient(90deg,var(--ink) 0 3px,transparent 3px 6px)"></div><div class="ln rep">${ava(p.name,p.role)}<div class="nm">${esc(p.name)}</div><div class="rl">보고</div></div>`});
  return h+'</div>';
}
/* ── 신청 상세 ── */
ROUTES.req=async function(v,id){
  v.innerHTML=loading();
  let r; try{r=(await api('leave.get',{id})).request}catch(e){v.innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  v.innerHTML=`${back()}<div class="title"><div style="display:flex;justify-content:space-between;align-items:center">${chip(r.status,r.status==='진행중'?stepLabel(r):r.status)}<span class="note" style="padding:0">${esc(r.id)}</span></div>
   <h1 style="margin-top:12px">${esc(r.type)} <span style="color:var(--mute)">${r.days}일</span></h1><p>${period(r)}</p></div>
   <div class="form"><label class="f">결재선</label>${lineHTML({name:r.name,role:r.email===S.data.me.email?S.data.me.role:'직원'},r.steps,r.report,r.status==='진행중'?r.stepIdx:-1)}
   ${r.notify.length?`<p class="note" style="padding:4px 0">알림: ${r.notify.map(n=>esc(n.name)+' '+esc(n.role)).join(', ')}</p>`:''}
   <dl class="kv" style="margin-top:18px"><dt>신청자</dt><dd>${esc(r.name)} · ${esc(r.branch)}</dd><dt>신청일</dt><dd>${esc(String(r.at).slice(0,16))}</dd><dt>사유</dt><dd>${esc(r.reason||'-')}</dd>
     ${r.proof?`<dt>증빙</dt><dd><a class="u" href="${esc(r.proof)}" target="_blank" rel="noopener">열기</a></dd>`:''}
     ${r.balance&&r.balance.known?`<dt>잔여 연차</dt><dd>${r.balance.remain}일 <span style="color:var(--mute);font-weight:600">(발생 ${r.balance.granted} · 사용 ${r.balance.used})</span></dd>`:''}</dl>
   <label class="f">진행 기록</label><div class="hist">${r.history.map(h=>`<div><b>${esc(h.action)}</b> · ${esc(h.by)} <small>${esc(String(h.at).slice(5,16))}</small>${h.comment?`<div style="color:#444;margin-top:2px">${esc(h.comment)}</div>`:''}</div>`).join('')}</div>
   ${r.canAct?`<label class="f">의견 <em>(반려 시 필수)</em></label><textarea class="in" id="cm" placeholder="예) 스케줄 확인했어요. 잘 다녀오세요!"></textarea>`:''}</div>
   ${r.canAct?`<div class="btnrow"><button class="pill line" id="rj" style="color:var(--bad);flex:.6">반려</button><button class="pill wine" id="ap">승인</button></div>`:''}
   ${r.canCancel?`<div class="btnrow"><button class="pill line" id="cc">신청 취소</button></div>`:''}`;
  const act=async(dec,btn)=>{const cm=$('#cm').value.trim();if(dec==='반려'&&!cm)return toast('반려 사유를 적어 주세요');busy(btn,true);
    try{await api('approve',{id:r.id,decision:dec,comment:cm});toast(dec==='승인'?'승인했어요':'반려했어요');await refresh();ROUTES.req(v,id)}catch(e){toast(e.message);busy(btn,false)}};
  if(r.canAct){$('#ap').onclick=e=>act('승인',e.currentTarget);$('#rj').onclick=e=>act('반려',e.currentTarget)}
  if(r.canCancel)$('#cc').onclick=async()=>{if(!confirm('이 신청을 취소할까요?'))return;try{await api('leave.cancel',{id:r.id});toast('취소했어요');await refresh();ROUTES.req(v,id)}catch(e){toast(e.message)}};
};
/* ── 결재함 ── */
ROUTES.inbox=async function(v){
  v.innerHTML=`<div class="title"><h1>결재</h1></div>${loading()}`;
  let j; try{j=await api('inbox')}catch(e){v.innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  const total=j.pending.length+j.exps.length+j.swaps.length+j.certs.length;
  v.innerHTML=`<div class="title"><h1>결재 <span style="color:var(--wine)">${total}</span></h1><p>${total?'기다리는 문서가 있어요.':'모두 처리했어요. 깔끔해요!'}</p></div>
   ${j.pending.length?`<div class="sec"><h2>휴가 · 연차</h2></div><div class="list">${j.pending.map(r=>`<div class="li" style="align-items:flex-start;cursor:default">${ava(r.name,'직원')}<div class="m"><a href="#/req/${r.id}"><div class="t1">${esc(r.name)} <span style="color:var(--mute);font-weight:600;font-size:13px">${esc(r.branch)}</span></div><div class="t2 w">${esc(r.type)} · ${r.days}일 · ${period(r)}${r.reason?' · '+esc(r.reason):''}</div>${r.balance&&r.balance.known?`<div class="t2">잔여 연차 ${r.balance.remain}일</div>`:''}${r.history.filter(h=>h.action==='주의').map(h=>`<div class="warn" style="margin-top:6px">${esc(h.comment)}</div>`).join('')}</a>
     <div style="display:flex;gap:6px;margin-top:10px"><a class="pill sm line" href="#/req/${r.id}">자세히</a><button class="pill sm wine" onclick="quickApprove('approve','${r.id}',this)">바로 승인</button></div></div></div>`).join('')}</div>`:''}
   ${j.exps.length?`<div class="sec"><h2>경비 · 소모품</h2></div><div class="list">${j.exps.map(e=>`<div class="li" style="align-items:flex-start;cursor:default">${ava(e.name,'직원')}<div class="m"><a href="#/exp/${e.id}"><div class="t1">${esc(e.name)} · ${won(e.amount)}</div><div class="t2 w">${esc(e.kind)} · ${esc(e.item)} · ${esc(e.place||'')} · ${fmtDay(e.date)}</div></a>
     <div style="display:flex;gap:6px;margin-top:10px"><a class="pill sm line" href="#/exp/${e.id}">영수증 보기</a><button class="pill sm wine" onclick="quickApprove('exp.approve','${e.id}',this)">바로 승인</button></div></div></div>`).join('')}</div>`:''}
   ${j.swaps.length?`<div class="sec"><h2>대타</h2></div><div class="list">${j.swaps.map(s=>`<div class="li" style="align-items:flex-start;cursor:default"><div class="m"><div class="t1">${esc(s.name)} → ${esc(s.applicant)}</div><div class="t2 w">${esc(s.branch)} · ${fmtDay(s.date)} ${esc(s.start)}–${esc(s.end)}${s.reason?' · '+esc(s.reason):''}</div>
     <div style="display:flex;gap:6px;margin-top:10px"><button class="pill sm line" onclick="swapDecide('${s.id}',false,this)">반려</button><button class="pill sm wine" onclick="swapDecide('${s.id}',true,this)">승인 · 스케줄 반영</button></div></div></div>`).join('')}</div>`:''}
   ${j.certs.length?`<div class="sec"><h2>증명서 발급</h2></div><div class="list">${j.certs.map(c=>`<div class="li" style="align-items:flex-start;cursor:default"><div class="m"><div class="t1">${esc(c.name)} · ${esc(c.kind)}</div><div class="t2 w">${esc(c.branch)} · 용도 ${esc(c.purpose||'-')} · 제출처 ${esc(c.to||'-')}</div>
     <div style="display:flex;gap:6px;margin-top:10px"><button class="pill sm wine" onclick="certIssue('${c.id}',this)">PDF 발급</button></div></div></div>`).join('')}</div>`:''}
   <div class="sec"><h2>처리 · 보고 받은 문서</h2></div><div class="list">${reqRows(j.done)||'<div class="empty">아직 없어요</div>'}</div>`;
};
window.quickApprove=async(action,id,btn)=>{busy(btn,true);try{await api(action,{id,decision:'승인',comment:''});toast('승인했어요');await refresh();ROUTES.inbox($('#view'))}catch(e){toast(e.message);busy(btn,false)}};
/* ── 캘린더 ── */
ROUTES.cal=async function(v,m){
  const now=new Date(); m=m||`${now.getFullYear()}-${pad(now.getMonth()+1)}`;
  const [y,mo]=m.split('-').map(Number);
  const prev=ymd(new Date(y,mo-2,1)).slice(0,7), next=ymd(new Date(y,mo,1)).slice(0,7);
  const head=`${back('#/schedule','스케줄')}<div class="title"><h1>휴가 캘린더</h1></div><div class="wk"><a href="#/cal/${prev}">${I('back',18)}</a><b>${y}년 ${mo}월</b><a href="#/cal/${next}">${I('next',18)}</a></div>`;
  v.innerHTML=head+loading();
  let j;try{j=await api('calendar',{month:m})}catch(e){return}
  const first=new Date(y,mo-1,1).getDay(), last=new Date(y,mo,0).getDate(), today=ymd(now);
  let cells=WD.map(w=>`<div class="wd">${w}</div>`).join('');
  for(let i=0;i<first;i++)cells+=`<div class="d x"></div>`;
  for(let d=1;d<=last;d++){const ds=`${m}-${pad(d)}`;const its=j.items.filter(i=>i.start<=ds&&i.end>=ds);const dw=(first+d-1)%7;
    cells+=`<div class="d ${ds===today?'today':''} ${dw===0?'sun':dw===6?'sat':''}" data-d="${ds}"><span class="n">${d}</span>${its.slice(0,2).map(i=>`<span class="p ${i.status==='진행중'?'pend':''}">${esc(i.name)}</span>`).join('')}${its.length>2?`<span class="p" style="background:none;color:var(--mute)">+${its.length-2}</span>`:''}</div>`}
  v.innerHTML=head+`<div class="legend"><span><i style="background:var(--wine)"></i>확정</span><span><i style="background:var(--yellow)"></i>결재중</span><span style="color:var(--mute)">${esc(j.scope)}</span></div><div class="cal">${cells}</div><div id="dl"></div>`;
  v.querySelectorAll('.d[data-d]').forEach(c=>c.onclick=()=>{const ds=c.dataset.d;const its=j.items.filter(i=>i.start<=ds&&i.end>=ds);
    $('#dl').innerHTML=`<div class="sec"><h2>${fmtDay(ds)}</h2></div><div class="list">${its.length?its.map(i=>`<div class="li" style="cursor:default">${ava(i.name,'직원',36)}<div class="m"><div class="t1">${esc(i.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(i.branch)}</span></div><div class="t2">${esc(i.type)}${i.half?' · '+esc(i.half):''}</div></div>${chip(i.status,i.status==='진행중'?'결재중':'확정')}</div>`).join(''):'<div class="empty">휴가자가 없어요</div>'}</div>`});
};
/* ── 더보기 ── */
ROUTES.more=function(v){
  const d=S.data, me=d.me, x=d.x||{};
  const item=(h,t,s,badge)=>`<a class="li" href="${h}"><div class="m"><div class="t1">${t}</div><div class="t2">${s}</div></div>${badge||''}<span class="ar">${I('next',18)}</span></a>`;
  v.innerHTML=`<section class="hero" style="display:flex;gap:16px;align-items:center">${ava(me.name,me.role,60)}<div><div style="font-size:24px;font-weight:800;letter-spacing:-.03em">${esc(me.name)}</div><div style="font-size:13.5px;font-weight:600;opacity:.8">${esc(me.branch)} · ${esc(me.role)} · ${esc(me.email)}</div>${me.hire?`<div style="font-size:12.5px;opacity:.7;margin-top:2px">입사 ${esc(me.hire)}</div>`:''}</div></section>
   <div class="sec"><h2>나</h2></div><div class="list">
    ${item('#/notice','공지 · 매뉴얼','읽음 확인',x.unreadNotices?chip('안읽음',x.unreadNotices+'개 안 읽음'):'')}
    ${item('#/schedule','내 스케줄','이번 주 · 다음 주 근무')}
    ${item('#/swap','대타 게시판','근무 바꾸기',x.swapOpen?chip('모집중',x.swapOpen+'건'):'')}
    ${item('#/exp','내 경비 청구','영수증 · 지급 상태')}
    ${item('#/payslip','급여명세서','본인만 열람')}
    ${item('#/cert','증명서','재직 · 경력증명서 발급')}
    ${item('#/att','내 출퇴근 기록','최근 7일')}
    ${item('#/onb','온보딩 체크리스트','입사 준비 현황')}
    ${item('#/cal','휴가 캘린더','우리 지점 휴가')}
    ${item('#/log','업무일지','매장 기록 · 퇴근 한 줄 · 저녁 요약 메일')}
    ${item('#/check/오픈','오픈 · 마감 체크리스트','사진 인증 · 점장 알림')}
    ${item('#/incident','사고 · 클레임','보고 · 처리 현황',x.incOpen?chip('신청',x.incOpen+'건'):'')}
    ${item('#/quiz','와인 퀴즈','이번 달 랭킹 · 레벨')}
    ${item('#/kudos','칭찬카드','보내기 · 피드 · 칭찬왕')}
    ${item('#/avail','근무 가능 시간','다음 주 제출')}
    <a class="li" href="${esc(d.policyUrl)}" target="_blank" rel="noopener"><div class="m"><div class="t1">휴가 및 휴직 가이드</div><div class="t2">Notion 규정 전문</div></div><span class="ar">${I('next',18)}</span></a>
   </div>
   ${d.canAdmin?`<div class="sec"><h2>관리</h2></div><div class="list">
    ${x.isHQ?item('#/console','본사 콘솔','전 지점 한눈에 · PC 추천',`<i class="new">HQ</i>`):''}
    ${item('#/schedule','스케줄 짜기','주간 시프트 편집 · 확정 알림')}
    ${item('#/close','월말 근태 마감','이슈 확인 → 점장 확정 → 최종 마감')}
    ${x.isHQ?item('#/pay','경비 지급','이체 메모 자동 · 지급 처리'):''}
    ${item('#/notice/new','공지 쓰기','필독 지정 · 읽음 확인')}
    ${x.isHQ?item('#/payslip','급여명세서 올리기','PDF 일괄 업로드'):''}
    ${item('#/admin','직원 관리','가입 승인 · 입사일 · 역할 · 온보딩',d.pendingUsers?chip('신청',d.pendingUsers+'명'):'')}
   </div>`:''}
   <div class="sec"><h2>설정</h2></div><div class="list">
    <div class="li" id="a2h"><div class="m"><div class="t1">홈 화면에 추가하기</div><div class="t2">앱처럼 한 번에 열기</div></div></div>
    ${d.canImpersonate?`<div class="li" id="imp"><div class="m"><div class="t1">다른 직원으로 보기</div><div class="t2">테스트 모드 전용 · 결재 흐름 확인</div></div><i class="new">TEST</i></div>`:''}
    ${localStorage.getItem('tsbp_admin_token')&&S.token!==localStorage.getItem('tsbp_admin_token')?`<div class="li" id="unimp"><div class="m"><div class="t1">내 계정으로 돌아가기</div><div class="t2">테스트 보기 종료</div></div></div>`:''}
    <div class="li" onclick="logout()"><div class="m"><div class="t1">로그아웃</div></div></div>
   </div>
   <div class="note" style="text-align:center;padding:30px 0;letter-spacing:.06em">wine is second americano</div>`;
  $('#a2h').onclick=()=>openSheet(`<h2>홈 화면에 추가</h2><div style="font-size:15px;line-height:1.8;font-weight:500;margin-top:8px"><b>iPhone (Safari)</b><br>아래 공유 버튼 → 홈 화면에 추가<br><br><b>Android (Chrome)</b><br>오른쪽 위 ⋮ → 홈 화면에 추가 또는 앱 설치</div>`);
  if($('#unimp'))$('#unimp').onclick=()=>{S.token=localStorage.getItem('tsbp_admin_token');localStorage.setItem('tsbp_token',S.token);localStorage.removeItem('tsbp_admin_token');location.hash='#/';boot()};
  if(d.canImpersonate) $('#imp').onclick=async()=>{const j=await api('admin.users');
    openSheet(`<h2>누구로 볼까요?</h2><div class="list" style="padding:0;margin-top:12px">${j.users.filter(u=>u.status==='재직'||u.status==='초대전').map(u=>`<div class="li" data-e="${esc(u.email)}">${ava(u.name,u.role,34)}<div class="m"><div class="t1">${esc(u.name)}</div><div class="t2">${esc(u.branch)} · ${esc(u.role)}</div></div></div>`).join('')}</div>`,m=>{
      m.querySelectorAll('[data-e]').forEach(r=>r.onclick=async()=>{const k=await api('admin.impersonate',{email:r.dataset.e});if(!localStorage.getItem('tsbp_admin_token'))localStorage.setItem('tsbp_admin_token',S.token);S.token=k.token;localStorage.setItem('tsbp_token',k.token);m.remove();location.hash='#/';boot()})})};
};
ROUTES.att=function(v){
  const at=S.data.attendance;
  v.innerHTML=`${back('#/more','더보기')}<div class="title"><h1>내 출퇴근</h1><p>기록이 틀리면 점장님께 말씀해 주세요. 위치 정보는 관리자만 볼 수 있어요.</p></div>
  <div class="list" style="margin-top:12px">${at.recent.length?at.recent.map(r=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${fmtDay(r.date)}</div><div class="t2">출근 ${esc(r.in||'-')} · 퇴근 ${esc(r.out||'-')}</div></div><b style="font-size:18px">${r.hours?r.hours.toFixed(1)+'h':''}</b></div>`).join(''):'<div class="empty">아직 기록이 없어요</div>'}</div>`;
};
ROUTES.notis=function(v){
  const n=S.data.notis;
  v.innerHTML=`${back()}<div class="title"><h1>알림</h1></div><div class="list" style="margin-top:12px">${n.length?n.map(x=>`<a class="li" href="${esc(x.link||'#/')}">${x.read?'':'<span style="width:8px;height:8px;border-radius:50%;background:var(--yellow);flex:none"></span>'}<div class="m"><div class="t1" style="font-size:15px">${esc(x.title)}</div><div class="t2 w">${esc(x.body)}</div><div class="t2" style="font-size:11.5px">${esc(String(x.at).slice(5,16))}</div></div></a>`).join(''):'<div class="empty">새 알림이 없어요</div>'}</div>`;
  if(n.some(x=>!x.read)) api('notis.read').then(()=>{S.data.notis.forEach(x=>x.read=true);shell(true)}).catch(()=>{});
};
ROUTES.admin=async function(v){
  v.innerHTML=loading();
  const j=await api('admin.users');
  const pend=j.users.filter(u=>u.status==='대기'), act=j.users.filter(u=>u.status!=='대기');
  const row=u=>`<div class="li" data-e="${esc(u.email)}">${ava(u.name,u.role,38)}<div class="m"><div class="t1">${esc(u.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(u.branch)} · ${esc(u.role)}</span></div><div class="t2">${u.hire?'입사 '+esc(u.hire):'입사일 미등록'}${u.balance&&u.balance.known?' · 잔여 '+u.balance.remain+'일':''}</div></div>${u.status!=='재직'?chip(u.status==='대기'?'신청':'취소',u.status):''}</div>`;
  v.innerHTML=`${back('#/more','더보기')}<div class="title"><h1>직원 관리</h1><p>입사일·생년월일은 연차 계산, 축하 카드, 증명서에 쓰여요.</p></div>
   ${pend.length?`<div class="sec"><h2>가입 요청 ${pend.length}</h2></div><div class="list">${pend.map(row).join('')}</div>`:''}
   <div class="btnrow"><button class="pill wine" id="add">직원 추가</button></div>
   <p class="note">등록된 이메일만 로그인할 수 있어요. "초대전"은 결재선에는 들어가지만 아직 로그인은 막혀 있는 상태예요.</p>
   <div class="sec"><h2>직원 ${act.length}</h2></div><div class="list">${act.map(row).join('')}</div>`;
  $('#add').onclick=()=>openSheet(`<h2>직원 추가</h2><p class="note" style="padding:2px 0 0">추가하면 이 이메일로 바로 로그인할 수 있어요.</p>
     <label class="f">이메일</label><input class="in" id="a_em" type="email" autocapitalize="off" placeholder="name@tsb.wine 또는 개인 이메일">
     <label class="f">이름</label><input class="in" id="a_nm">
     <div class="two"><div><label class="f">지점</label><select class="in" id="a_br" ${j.canEditRole?'':'disabled'}>${j.branches.map(b=>`<option ${b===S.data.me.branch?'selected':''}>${esc(b)}</option>`).join('')}</select></div>
     <div><label class="f">역할</label><select class="in" id="a_rl" ${j.canEditRole?'':'disabled'}>${['직원','점장','매니저','임원','이사','대표'].map(x=>`<option>${x}</option>`).join('')}</select></div></div>
     <div class="two"><div><label class="f">입사일</label><input class="in" type="date" id="a_hd"></div><div><label class="f">생년월일</label><input class="in" type="date" id="a_bd"></div></div>
     <button class="pill wine full" style="margin-top:20px" id="a_sv">추가하기</button>`,m=>{
     m.querySelector('#a_sv').onclick=async e=>{busy(e.currentTarget,true);try{await api('admin.addUser',{email:m.querySelector('#a_em').value,name:m.querySelector('#a_nm').value,branch:m.querySelector('#a_br').value,role:m.querySelector('#a_rl').value,hire:m.querySelector('#a_hd').value,birth:m.querySelector('#a_bd').value});m.remove();toast('추가했어요');ROUTES.admin(v)}catch(er){toast(er.message);busy(e.currentTarget,false)}}});
  v.querySelectorAll('[data-e]').forEach(r=>r.onclick=()=>{const u=j.users.find(x=>x.email===r.dataset.e);
    openSheet(`<h2>${esc(u.name)}</h2><div class="note" style="padding:0">${esc(u.email)}</div>
     <label class="f">이름</label><input class="in" id="u_nm" value="${esc(u.name)}">
     <div class="two"><div><label class="f">지점</label><select class="in" id="u_br" ${j.canEditRole?'':'disabled'}>${j.branches.map(b=>`<option ${b===u.branch?'selected':''}>${esc(b)}</option>`).join('')}</select></div>
     <div><label class="f">역할</label><select class="in" id="u_rl" ${j.canEditRole?'':'disabled'}>${['직원','점장','매니저','임원','이사','대표'].map(x=>`<option ${x===u.role?'selected':''}>${x}</option>`).join('')}</select></div></div>
     <div class="two"><div><label class="f">입사일</label><input class="in" type="date" id="u_hd" value="${esc(u.hire||'')}"></div><div><label class="f">연차 조정(±일)</label><input class="in" id="u_adj" inputmode="decimal" value="${esc(u.adj||'')}" placeholder="예) -3"></div></div>
     <label class="f">상태</label><select class="in" id="u_st">${['대기','초대전','재직','퇴사'].map(x=>`<option ${x===u.status?'selected':''}>${x}</option>`).join('')}</select>
     <div class="btnrow" style="padding:22px 0 0"><a class="pill line" href="#/onb/${encodeURIComponent(u.email)}" data-close>온보딩</a><button class="pill wine" id="u_sv">${u.status==='대기'?'승인하고 저장':'저장'}</button></div>`,m=>{
      m.querySelector('#u_sv').onclick=async()=>{const st=m.querySelector('#u_st').value;
        const body={email:u.email,name:m.querySelector('#u_nm').value,hire:m.querySelector('#u_hd').value,adj:m.querySelector('#u_adj').value,status:u.status==='대기'&&st==='대기'?'재직':st};
        if(j.canEditRole){body.branch=m.querySelector('#u_br').value;body.role=m.querySelector('#u_rl').value}
        try{await api('admin.saveUser',body);m.remove();toast('저장했어요');await refresh();ROUTES.admin(v)}catch(e){toast(e.message)}}})});
};
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
window.addEventListener('DOMContentLoaded',()=>boot());
