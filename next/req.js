/* 요청함 v2 (2026-11-14 미리보기): 요청하기 하나로 · 내 요청 · 알림함
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
const STEP=['접수','담당 확인','진행 중','완료'];
function stepIdx(t){const s=t.status;if(s==='완료')return 3;if(s==='진행 중'||s==='답 기다림'||s==='보류'||s==='다시 열림')return 2;return t.firstAt?1:0}
const ST={접수:'신청','진행 중':'진행중','답 기다림':'진행중',보류:'미확정',완료:'확정','다시 열림':'진행중'};
const stChip=s=>chip(ST[s]||'신청',s||'접수');
const dueK=s=>{const m=String(s||'').match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}:\d{2})/);if(!m)return s;const d=new Date(+m[1],m[2]-1,+m[3]);return `${+m[2]}/${+m[3]}(${WD[d.getDay()]}) ${m[4]}`};
const ds=s=>{if(!s)return'';const t=String(s).replace('T',' ');return t.slice(5,16).replace('-','.')};

/* ── 요청하기 허브 ── */
ROUTES.request=async function(v,arg){
  if(arg&&arg.startsWith('new/'))return reqNew(v,arg.slice(4));
  v.innerHTML=`${back('#/')}<div class="title">${dots}<h1>무엇을 도와드릴까요?</h1><p>고르면 맞는 양식이 나와요. 보내면 번호가 붙고, 진행 상황은 Slack으로 알려 드려요.</p></div>${loading()}`;
  let c;try{c=await catalog()}catch(e){v.innerHTML=`${back('#/')}<div class="empty">${esc(e.message)}</div>`;return}
  const open=R.open;
  v.innerHTML=`${back('#/')}<div class="title">${dots}<h1>무엇을 도와드릴까요?</h1><p>고르면 맞는 양식이 나와요. 보내면 번호가 붙고, 진행 상황은 Slack으로 알려 드려요.</p></div>
   ${R.ready===false?soon():''}
   <a class="rqmine" href="#/myreq"><div><b>내 요청</b><span>${open?`진행 중 ${open}건 · 번호별 진행 상황`:'보낸 요청과 신청을 한곳에서'}</span></div><i>${I('next',18)}</i></a>
   ${c.groups.map(g=>`<div class="sec"><h2>${esc(g.title)}</h2></div><div class="rqg">${g.items.map(it=>`<a class="rqi ${it.mode==='link'?'lk':''}" href="${esc(hrefOf(it))}"><span class="rqic">${ico(it)}</span><span class="rqt"><b>${esc(it.title)}</b><small>${esc(it.desc||'')}</small>${it.examples&&it.examples.length?`<em>예) ${esc(it.examples[0].replace(/^예\)\s*/,''))}</em>`:''}</span><span class="rqgo">${it.mode==='link'?'바로가기':(it.team?esc(it.team):'')}</span></a>`).join('')}</div>`).join('')}
   <p class="note rqfoot">급한 건(화재 · 누수 · 정전 · 가스 냄새)은 먼저 점장님과 서포트센터에 전화하고, 그다음 요청을 남겨 주세요.</p>`;
};
/* ── 요청 양식 ── */
async function reqNew(v,kind){kind=decodeURIComponent(kind);
  v.innerHTML=`${back('#/request','요청하기')}${loading()}`;
  let c;try{c=await catalog()}catch(e){v.innerHTML=`${back('#/request','요청하기')}<div class="empty">${esc(e.message)}</div>`;return}
  const it=findItem(c,kind);if(!it){v.innerHTML=`${back('#/request','요청하기')}<div class="empty">없는 요청 종류예요</div>`;return}
  if(it.mode==='link'){location.replace(hrefOf(it));return}
  const me=S.data.me, photos=[];
  const fld=f=>{const id='rf_'+f.key, lab=`<label class="f">${esc(f.label)}${f.required?'':' <em>(선택)</em>'}</label>`;
    if(f.type==='photo')return '';
    if(f.type==='textarea')return lab+`<textarea class="in" id="${id}" placeholder="${esc(f.placeholder||'')}"></textarea>`;
    if(f.type==='select')return lab+`<select class="in" id="${id}"><option value="">고르기</option>${(f.options||[]).map(o=>`<option>${esc(o)}</option>`).join('')}</select>`;
    if(f.type==='date')return lab+`<input class="in" type="date" id="${id}">`;
    if(f.type==='money')return lab+`<input class="in" inputmode="numeric" id="${id}" placeholder="${esc(f.placeholder||'숫자만')}">`;
    return lab+`<input class="in" id="${id}" placeholder="${esc(f.placeholder||'')}">`};
  const hasPhoto=(it.fields||[]).some(f=>f.type==='photo');
  v.innerHTML=`${back('#/request','요청하기')}<div class="title"><div class="rqhd"><span class="rqic big">${ico(it,26)}</span><div><h1>${esc(it.title)}</h1><p>담당 ${esc(it.team||'서포트센터')} · ${esc(typeof brLabel==='function'?brLabel(me.branch):me.branch)}</p></div></div></div>
   ${R.ready===false?soon():''}
   <div class="form">
    <label class="f">제목 <em>(한 줄)</em></label><input class="in" id="rf__title" placeholder="${esc(it.examples&&it.examples[0]?'예) '+it.examples[0].replace(/^예\)\s*/,''):'예) ['+me.branch+'] 무엇이 + 어떻게')}">
    ${(it.fields||[]).map(fld).join('')}
    ${hasPhoto?`<label class="f">사진 <em>(최대 3장)</em></label><div class="rqph" id="rqph"><label class="rqadd"><input type="file" accept="image/*" multiple hidden id="rqfile">+ 사진</label></div>`:''}
    <label class="rqurg"><input type="checkbox" id="rf__urgent"><span><b>긴급</b> · 영업에 바로 지장이 있어요 (4시간 안에 첫 답)</span></label>
   </div>
   <div class="btnrow"><button class="pill rqbtn" id="rqsend" ${R.ready===false?'disabled':''}>${R.ready===false?'곧 열려요':'요청 보내기'}</button></div>
   <p class="note" style="padding:0 var(--pad) 30px">보내면 번호가 붙어요. 첫 답은 다음 영업일 18시까지 드려요.</p>`;
  const drawPh=()=>{const el=$('#rqph');if(!el)return;el.querySelectorAll('.pt').forEach(x=>x.remove());photos.forEach((p,i)=>el.insertAdjacentHTML('afterbegin',`<span class="pt" style="background-image:url(${p.url})"><button type="button" data-rm="${i}">×</button></span>`));el.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{photos.splice(+b.dataset.rm,1);drawPh()});const ad=el.querySelector('.rqadd');if(ad)ad.style.display=photos.length>=3?'none':''};
  const fi=$('#rqfile');if(fi)fi.onchange=async()=>{for(const f of [...fi.files].slice(0,3-photos.length)){try{const url=await fileToDataUrl(f,1600,.8);photos.push({url,name:(f.name||'photo').replace(/\.\w+$/,'')+'.jpg',mime:'image/jpeg',data:url.split(',')[1]})}catch(e){toast('사진을 못 읽었어요')}}fi.value='';drawPh()};
  $('#rqsend').onclick=async e=>{const b=e.currentTarget;const fields={};let miss='';
    for(const f of it.fields||[]){if(f.type==='photo')continue;const el=$('#rf_'+f.key);const val=(el&&el.value||'').trim();if(f.required&&!val&&!miss)miss=f.label;if(val)fields[f.key]=val}
    let title=$('#rf__title').value.trim();
    if(miss)return toast(miss+'을(를) 적어 주세요');
    if(!title){const first=Object.values(fields)[0]||'';title=`[${me.branch}] ${it.title}${first?' · '+String(first).split('\n')[0].slice(0,24):''}`}
    busy(b,true);
    try{const r=await api('req.create',{kind:it.key,title,fields,urgent:$('#rf__urgent').checked?1:'',photos:photos.map(p=>({name:p.name,mime:p.mime,data:p.data})),branch:me.branch});
      R.open=(R.open||0)+1;done(v,r,it,title)}
    catch(x){busy(b,false);toast(NOTYET(x)?'요청 접수가 아직 연결 중이에요. 잠시 뒤 다시 해 주세요':x.message)}};
}
function done(v,r,it,title){
  v.innerHTML=`<div class="rqdone">${dots}<div class="k">접수 완료</div><div class="no">${esc(r.id)}</div><p class="tt">${esc(title)}</p>
   <dl><dt>담당</dt><dd>${esc(r.team||it.team||'서포트센터')}</dd><dt>첫 답</dt><dd>${esc(r.dueText||dueK(r.due)||'다음 영업일 18시')}까지</dd></dl>
   <div class="slk"><b>알림은 Slack으로 와요</b><span>담당이 정해지고 상태가 바뀔 때마다 TSB CREW가 DM을 보내요. 누르면 이 화면으로 와요.</span></div></div>
   <div class="btnrow"><a class="pill line" href="#/">홈으로</a><a class="pill rqbtn" href="#/ticket/${encodeURIComponent(r.id)}">진행 상황 보기</a></div>`;
  window.scrollTo(0,0);
}
/* ── 티켓 상세 ── */
ROUTES.ticket=async function(v,id){
  v.innerHTML=`${back('#/myreq','내 요청')}${loading()}`;
  let j;try{j=await apiRaw('req.get',{id})}catch(e){v.innerHTML=`${back('#/myreq','내 요청')}${NOTYET(e)?'<div class="title"><h1>'+esc(id)+'</h1></div>'+soon():'<div class="empty">'+esc(e.message)+'</div>'}`;return}
  const t=j.ticket||j.item||j, logs=j.logs||j.log||j.history||j.timeline||t.log||[];
  const memo=t.pub||t.note||'';
  const si=stepIdx(t);
  const note={'답 기다림':'요청자님의 답을 기다리고 있어요. 아래 메모로 알려 주세요.','보류':'잠시 보류 중이에요. 이유는 메모를 봐 주세요.','다시 열림':'다시 열어서 이어서 챙기고 있어요.'}[t.status]||'';
  v.innerHTML=`${back('#/myreq','내 요청')}
   <section class="rqtk"><div class="k">${dots}요청 번호</div><div class="no">${esc(t.id||id)}</div><p class="tt">${esc(t.title||'')}</p>
    <div class="rqst">${STEP.map((s,i)=>`<div class="${i<=si?'on':''}"><i></i>${s}</div>`).join('')}</div>${note?`<p class="nt">${esc(note)}</p>`:''}</section>
   ${(j.canCsat!==undefined?j.canCsat:(t.status==='완료'&&!t.csat))?`<section class="rqcs"><b>해결됐나요?</b><span>한 번만 눌러 주세요. 아직이면 바로 다시 열어요.</span><div class="btnrow" style="padding:12px 0 0"><button class="pill line" data-cs="bad">아직이에요</button><button class="pill rqbtn" data-cs="good">해결됐어요</button></div></section>`:''}
   ${t.csat?`<p class="note" style="padding:12px var(--pad) 0">남겨 주신 평가: <b>${esc(t.csat)}</b></p>`:''}
   <dl class="kv rqkv"><dt>상태</dt><dd>${stChip(t.status)}</dd><dt>종류</dt><dd>${esc(t.kind||'')}</dd><dt>담당</dt><dd>${esc(t.team||'')}</dd><dt>접수</dt><dd>${esc(ds(t.at))}</dd><dt>첫 답 기한</dt><dd>${esc(t.dueText||ds(t.due))}${t.firstAt?' · 답함':''}</dd>${memo?`<dt>담당 메모</dt><dd>${esc(memo)}</dd>`:''}</dl>
   ${t.body?`<div class="sec"><h2>보낸 내용</h2></div><div class="rqbody">${esc(t.body)}</div>`:''}
   <div class="sec"><h2>기록</h2></div>
   <div class="rqtl">${logs.length?logs.slice().reverse().map(l=>`<div><i></i><b>${esc(l.event||l.action||'')}</b>${l.text?` · ${esc(l.text)}`:''}<small>${esc(ds(l.at))}</small></div>`).join(''):'<div class="empty">아직 기록이 없어요</div>'}</div>
   <div class="form"><label class="f">메모 남기기 <em>(담당팀이 바로 봐요)</em></label><textarea class="in" id="rqcm" placeholder="더 알려 줄 것, 바뀐 상황"></textarea></div>
   <div class="btnrow"><button class="pill ink" id="rqcmb">남기기</button></div><div style="height:30px"></div>`;
  v.querySelectorAll('[data-cs]').forEach(b=>b.onclick=async()=>{busy(b,true);try{await api('req.csat',{id:t.id||id,s:b.dataset.cs});toast(b.dataset.cs==='good'?'고마워요':'다시 열었어요. 담당팀이 이어서 챙길게요');ROUTES.ticket(v,id)}catch(e){busy(b,false);toast(e.message)}});
  $('#rqcmb').onclick=async e=>{const tx=$('#rqcm').value.trim();if(!tx)return toast('메모를 적어 주세요');busy(e.currentTarget,true);try{await api('req.comment',{id:t.id||id,text:tx});toast('남겼어요');ROUTES.ticket(v,id)}catch(x){busy(e.currentTarget,false);toast(x.message)}};
};
/* ── 내 요청 (티켓 + 신청 + 질문 한곳에) ── */
const SRC={apply:'신청',ticket:'요청',티켓:'요청',leave:'휴가',휴가:'휴가',신청:'신청',ask:'질문',질문:'질문',질문함:'질문',sup:'신청',지원:'지원'};
ROUTES.myreq=async function(v,tab){
  tab=tab==='closed'?'closed':'open';
  const head=`${back('#/request','요청하기')}<div class="title"><h1>내 요청</h1><p>보낸 요청, 휴가 신청, 질문을 번호별로 한곳에서 봐요.</p></div>
   <div class="seg"><button data-t="open" class="${tab==='open'?'on':''}">진행 중</button><button data-t="closed" class="${tab==='closed'?'on':''}">끝난 것</button></div>`;
  v.innerHTML=head+loading();
  const wire=()=>v.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>location.hash='#/myreq/'+b.dataset.t);
  wire();
  let items;
  try{const j=await apiRaw('req.mine',{status:tab});items=j.items||[];if(tab==='open')R.open=items.length}
  catch(e){if(!NOTYET(e)){v.innerHTML=head+`<div class="empty">${esc(e.message)}</div>`;wire();return}
    const rq=(S.data.requests||[]).map(r=>({id:r.id,source:'휴가',kind:r.type,title:r.type+(r.group==='지원'?'':' '+(r.days||'')+'일'),status:r.status,at:r.at,link:'#/req/'+r.id,open:r.status==='진행중'}));
    items=rq.filter(r=>tab==='open'?r.open:!r.open);v.innerHTML=head+soon()+list(items,tab);wire();return}
  v.innerHTML=head+list(items,tab)+`<div class="btnrow"><a class="pill rqbtn" href="#/request">새 요청하기</a></div><div style="height:24px"></div>`;wire();
};
function list(items,tab){if(!items.length)return `<div class="empty" style="padding:40px var(--pad)">${tab==='open'?'진행 중인 요청이 없어요':'끝난 요청이 아직 없어요'}</div>`;
  return `<div class="rql">${items.map(r=>{const src=SRC[r.source]||r.source||'요청';const href=r.link||(/^REQ-/.test(r.id)?'#/ticket/'+r.id:'#/req/'+r.id);
   return `<a class="rqr" href="${esc(href)}"><span class="src s-${esc(src)}">${esc(src)}</span><div class="m"><div class="t1">${esc(r.title||r.kind||'')}</div><div class="t2">${/^REQ-/.test(r.id)?esc(r.id)+' · ':''}${esc(r.team||r.kind||'')}${r.updated||r.at?' · '+esc(ds(r.updated||r.at)):''}</div></div>${stChip(r.status)}</a>`}).join('')}</div>`}
/* ── 알림함 ── */
const TYK={req:'요청',ticket:'요청',request:'요청',approval:'결재',approve:'결재',notice:'공지'};
const KIND=n=>{const l=String(n.link||''),t=String(n.title||'');if(n.type&&TYK[n.type])return TYK[n.type];
  if(/^#\/(ticket|request|myreq)/.test(l)||/REQ-\d/.test(t))return '요청';
  if(/^#\/notice/.test(l)||/^\[공지\]/.test(t))return '공지';
  if(/^#\/(inbox|exp|close|admin)/.test(l)||/결재|승인 요청|리마인드|확인해 주세요/.test(t))return '결재';
  return '기타'};
ROUTES.notis=async function(v,tab){
  tab=['요청','결재','공지'].includes(tab)?tab:'전체';
  const tabs=['전체','요청','결재','공지'];
  let items=null;
  var NJ=null;
  try{const j=await apiRaw('notis.list',{tab:tab==='전체'?'all':({요청:'req',결재:'approval',공지:'notice'})[tab],limit:60});NJ=j;items=(j.items||[]).map(n=>Object.assign({},n,{k:KIND(n)}))}
  catch(e){items=(S.data.notis||[]).map(n=>Object.assign({},n,{k:KIND(n)}));if(tab!=='전체')items=items.filter(n=>n.k===tab)}
  const unread=items.filter(n=>!n.read).length, UC=(typeof NJ!=='undefined'&&NJ&&NJ.unread)||null;
  v.innerHTML=`${back('#/')}<div class="title rqnh"><div><h1>알림함</h1><p>요청 진행, 결재, 공지가 여기 모여요. Slack 알림을 누르면 이곳으로 와요.</p></div>${unread?`<button class="pill sm line" id="rqall">모두 읽음</button>`:''}</div>
   <div class="rqtabs">${tabs.map(t=>{const c=UC?UC[({전체:'all',요청:'req',결재:'approval',공지:'notice'})[t]]:0;return `<a class="${t===tab?'on':''}" href="#/notis/${t==='전체'?'':t}">${t}${c?`<i class="tc">${c}</i>`:''}</a>`}).join('')}</div>
   <div class="rqn">${items.length?items.map(n=>`<a class="rqni ${n.read?'':'un'}" href="${esc(n.link||'#/')}" data-id="${esc(n.id)}"><span class="kd k-${esc(n.k)}">${esc(n.k==='기타'?'알림':n.k)}</span><div class="m"><div class="t1">${esc(n.title)}</div>${n.body?`<div class="t2">${esc(n.body)}</div>`:''}<div class="t3">${esc(ds(n.at))}</div></div>${n.read?'':'<i class="ud"></i>'}</a>`).join(''):`<div class="empty" style="padding:48px var(--pad)">${tab==='전체'?'새 알림이 없어요':tab+' 알림이 없어요'}</div>`}</div>`;
  v.querySelectorAll('.rqni').forEach(a=>a.onclick=ev=>{const id=a.dataset.id,n=(S.data.notis||[]).find(x=>x.id===id);if(n)n.read=true;
    if(a.classList.contains('un'))apiRaw('notis.readOne',{id}).catch(()=>apiRaw('notis.read').catch(()=>{})).finally(()=>refresh&&refresh())});
  const all=$('#rqall');if(all)all.onclick=async()=>{busy(all,true);try{await api('notis.read');(S.data.notis||[]).forEach(x=>x.read=true);shell(true);ROUTES.notis(v,tab)}catch(e){busy(all,false);toast(e.message)}};
};
/* ── 홈: 요청하기 카드 + 진행 중 칩 / 하단 '신청' → '요청' ── */
const _home=ROUTES[''];
ROUTES['']=function(v,a){const r=_home.apply(this,arguments);Promise.resolve(r).then(()=>{if(v.querySelector('.rqhome'))return;
  const html=`<a class="rqhome" href="#/request"><div>${dots}<b>요청하기</b><span>수리 · 고객 환불 · 서류 · 앱 오류까지 한곳에서</span><em id="rqchip" class="${R.open?'':'z'}">${R.open?`내 요청 진행 중 ${R.open}`:'번호로 끝까지 챙겨요'}</em></div><i class="arr">${I('plus',24)}</i></a>`;
  const hc=v.querySelector('.hcards');if(hc)hc.insertAdjacentHTML('afterbegin',html);else{const pb=v.querySelector('#punchBlk');pb?pb.insertAdjacentHTML('afterend',`<div class="hcards">${html}</div>`):v.insertAdjacentHTML('afterbegin',html)}
  apiRaw('req.mine',{status:'open'}).then(j=>{R.open=(j.items||[]).length;const c=$('#rqchip');if(c){c.textContent=R.open?`내 요청 진행 중 ${R.open}`:'번호로 끝까지 챙겨요';c.classList.toggle('z',!R.open);if(R.open)c.onclick=e=>{e.preventDefault();location.hash='#/myreq'}}}).catch(()=>{})});return r};
const _shell=shell;shell=function(){const r=_shell.apply(this,arguments);const p=document.querySelector('.nav a.plus');if(p){p.setAttribute('href','#/request');p.dataset.r='request';p.lastChild&&p.lastChild.nodeType===3&&(p.lastChild.textContent='요청')}return r};
const _mark=markNav;markNav=function(){_mark();const k=location.hash.replace(/^#\/?/,'').split('/')[0];if(['request','ticket','myreq','apply','new','req','sup','exp','incident'].includes(k))document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.r==='request'))};
})();
