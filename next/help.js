/* 지원 요청 (2026-11-12 미리보기, API v36): 다른 지점에 사람 보내기 · Passport 도장 · 근무 겹침 막기
   API help.list / create / check / apply / home / decide / withdraw / cancel. 근무표 저장·확정·대타 지원에 hv:1 → 서버가 겹침 검사 */
(function(){
const PASS=(typeof BADGES!=='undefined'&&BADGES.find(b=>b.k==='pass'))||{k:'pass',n:'Passport',c:'#2F4858',i:'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z'};
if(typeof BADGES!=='undefined'){const b=BADGES.find(x=>x.k==='pass');if(b)b.d='다른 지점 지원을 한 번 다녀오면 발급, 갈 때마다 도장 한 칸. 5칸이면 완성'}
/* 근무표 저장·확정·대타 지원: 새 화면 표시(hv) → 서버 겹침 검사 */
const _api=api;api=function(a,d,...r){if(/^(schedule\.(save|publish)|swap\.apply)$/.test(a))d=Object.assign({},d,{hv:1});return _api(a,d,...r)};
const BRS=b=>b==='본사'?'서포트센터':b;
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
