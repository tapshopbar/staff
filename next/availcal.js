/* ── 근무 신청: 달력 (차현 님 제안 11/11) ──
   날짜를 누르면(여러 날 가능) 휴무 / 오픈 / 미들 / 마감 / 시간 상관없이 중에서 고른다.
   서버는 기존 주 단위 API(shiftreq.get / shiftreq.save) 그대로. 바뀐 주만 저장한다. */
(function(){
const SLOTS=[['휴무','휴무','off'],['오픈','오픈','op'],['미들','미들','md'],['마감','마감','cl'],['any','시간 상관없이','any']];
const DRAFT={}; // 다시 그려져도 고른 것 유지: {ds:{kind,slot,preset,start,end,memo}}
const slotOf=(kind,preset)=>{if(kind==='휴무')return '휴무';if(kind!=='근무')return '';if(!preset)return 'any';for(const s of ['오픈','미들','마감'])if(String(preset).startsWith(s))return String(preset).includes('/')?(s==='미들'?'미들':s):s;return preset};
const cls=s=>({휴무:'off',오픈:'op',미들:'md',마감:'cl',any:'any'}[s]||'etc');
const lbl=s=>s==='any'?'근무':s;

ROUTES.avail=async function(v,arg){
  const x=S.data.x||{},today=ymd(new Date());
  let ym=/^\d{4}-\d{2}/.test(arg||'')?arg.slice(0,7):(x.nextMon||addD(monday(new Date()),7)).slice(0,7);
  const first=ym+'-01',fd=pd(first),last=ymd(new Date(fd.getFullYear(),fd.getMonth()+1,0));
  const g0=monday(fd),weeks=[];for(let w=g0;w<=last;w=addD(w,7))weeks.push(w);
  const prevYm=ymd(new Date(fd.getFullYear(),fd.getMonth()-1,1)).slice(0,7),nextYm=ymd(new Date(fd.getFullYear(),fd.getMonth()+1,1)).slice(0,7);
  const head=`${back()}<div class="title"><h1>근무 신청.</h1></div>`;
  v.innerHTML=head+loading();
  const live=weeks.filter(w=>addD(w,6)>=today);
  let res;try{res=await Promise.all(live.map(w=>api('shiftreq.get',{start:w})))}catch(e){v.innerHTML=head+`<p class="note" style="padding:0 var(--pad)">${esc(e.message)}</p>`;return}
  const W={};live.forEach((w,i)=>W[w]=res[i]);
  const j0=res[0]||{presets:[],part:'홀'},presets=j0.presets||[],myPart=j0.part||'홀';
  const srv={};live.forEach(w=>(W[w].mine||[]).forEach(q=>srv[q.date]=q));
  const days=[];weeks.forEach(w=>{for(let i=0;i<7;i++)days.push(addD(w,i))});
  const wkOf=ds=>monday(pd(ds));
  const cur=ds=>DRAFT[ds]||srv[ds]||null;
  const locked=ds=>{const q=srv[ds];return q&&q.status&&q.status!=='신청'};
  const editable=ds=>ds>=today&&W[wkOf(ds)]&&!locked(ds);
  const dirtyWeeks=()=>[...new Set(Object.keys(DRAFT).filter(ds=>W[wkOf(ds)]).map(wkOf))];
  const pick=slot=>{if(slot==='any')return {preset:'',start:'',end:''};
    const c=presets.filter(p=>p.part===myPart).concat(presets.filter(p=>p.part!==myPart));
    const p=c.find(p=>p.name===slot)||c.find(p=>p.name.startsWith(slot)&&!p.name.includes('/'))||c.find(p=>p.name.startsWith(slot));
    return p?{preset:p.name,start:p.start,end:p.end}:{preset:slot,start:'',end:''}};
  let sel=new Set(),teamW=live.find(w=>w>=(x.nextMon||''))||live[0];
  const draw=()=>{
    const inM=ds=>ds.slice(0,7)===ym;
    let off=0,work=0;days.filter(inM).forEach(ds=>{const q=cur(ds);if(!q||!q.kind)return;q.kind==='휴무'?off++:work++});
    const dw=dirtyWeeks();
    const cells=days.map(ds=>{const q=cur(ds),dt=pd(ds),s=q?slotOf(q.kind,q.preset):'',lk=locked(ds),ed=editable(ds);
      const st=lk?`<i class="acs ${srv[ds].status==='반영'?'ok':'no'}">${srv[ds].status==='반영'?'반영':'불가'}</i>`:'';
      return `<button class="acd ${inM(ds)?'':'oth'} ${ed?'':'dis'} ${sel.has(ds)?'sel':''} ${ds===today?'tdy':''} ${DRAFT[ds]?'drf':''}" data-ds="${ds}" ${ed?'':'disabled'}><span class="n">${dt.getDate()}</span>${s?`<span class="pl ${cls(s)}">${esc(lbl(s))}</span>`:''}${q&&q.memo?'<span class="mm"></span>':''}${st}</button>`}).join('');
    const selArr=[...sel].sort();
    v.innerHTML=head.replace('</h1></div>',`</h1><p>쉬고 싶은 날, 일하고 싶은 시간대를 달력에서 골라 주세요. 여러 날을 한 번에 눌러도 돼요. 3주 뒤까지 미리 내 주시면 근무표 짜기가 쉬워져요.</p></div>`)+`
     <div class="wk"><a href="#/avail/${prevYm}">${I('back',18)}</a><b>${fd.getFullYear()}년 ${fd.getMonth()+1}월</b><a href="#/avail/${nextYm}">${I('next',18)}</a></div>
     <div class="acal">
       <div class="acw">${['월','화','수','목','금','토','일'].map((d,i)=>`<button data-wd="${i}" title="이달 ${d}요일 전부 고르기">${d}</button>`).join('')}</div>
       <div class="acg">${cells}</div>
       <div class="acl"><span class="pl off">휴무</span><span class="pl op">오픈</span><span class="pl md">미들</span><span class="pl cl">마감</span><span class="pl any">근무(시간 무관)</span><span class="lg">요일을 누르면 그 요일 전부</span></div>
     </div>
     <div class="acp ${selArr.length?'on':''}">
       ${selArr.length?`<div class="acp-h"><b>${selArr.length}일 선택</b><span>${esc(selArr.slice(0,4).map(d=>{const t=pd(d);return (t.getMonth()+1)+'.'+t.getDate()}).join(', '))}${selArr.length>4?' 외':''}</span><button class="lnk" id="acx">선택 풀기</button></div>
       <div class="acp-b">${SLOTS.map(([k,l,c])=>`<button class="ab ${c}" data-slot="${k}">${l}</button>`).join('')}</div>
       <div class="acp-f"><input class="in sm" id="acm" placeholder="메모 (선택) 예) 병원, 학교, 오후만 가능"><button class="lnk" data-slot="">지우기</button></div>`
       :`<p class="note">날짜를 눌러 고르세요. 연차·반차는 여기 말고 ‘신청 → 연차’로 내 주세요.</p>`}
     </div>
     <p class="note acsum">${fd.getMonth()+1}월 휴무 희망 <b>${off}</b>일 · 근무 희망 <b>${work}</b>일${dw.length?` · <span class="drfn">아직 제출 안 한 변경 ${Object.keys(DRAFT).filter(ds=>W[wkOf(ds)]).length}일</span>`:''}</p>
     <div class="btnrow"><button class="pill wine full" id="sb" ${dw.length?'':'disabled'}>${dw.length?`제출하기 (${dw.length}주)`:'바꾼 내용이 없어요'}</button></div>
     ${j0.team?teamHtml():''}`;
    v.querySelectorAll('.acd[data-ds]').forEach(b=>b.onclick=()=>{const d=b.dataset.ds;sel.has(d)?sel.delete(d):sel.add(d);draw()});
    v.querySelectorAll('[data-wd]').forEach(b=>b.onclick=()=>{const k=+b.dataset.wd;const ds=days.filter(d=>inM(d)&&editable(d)&&(pd(d).getDay()+6)%7===k);const all=ds.every(d=>sel.has(d));ds.forEach(d=>all?sel.delete(d):sel.add(d));draw()});
    const x1=$('#acx');if(x1)x1.onclick=()=>{sel.clear();draw()};
    v.querySelectorAll('[data-slot]').forEach(b=>b.onclick=()=>{const k=b.dataset.slot,memo=($('#acm')||{}).value||'';
      sel.forEach(ds=>{const q=cur(ds)||{};
        if(!k)DRAFT[ds]={kind:'',preset:'',start:'',end:'',memo:''};
        else if(k==='휴무')DRAFT[ds]={kind:'휴무',preset:'',start:'',end:'',memo:memo||q.memo||''};
        else DRAFT[ds]=Object.assign({kind:'근무',memo:memo||q.memo||''},pick(k));});
      toast(`${sel.size}일 ${k?(k==='any'?'시간 상관없이 근무':k==='휴무'?'휴무 희망':k+' 희망'):'지움'} · 아래 제출하기를 눌러 주세요`,1800);sel.clear();draw()});
    if(j0.team)v.querySelectorAll('[data-tw]').forEach(b=>b.onclick=()=>{teamW=b.dataset.tw;draw()});
    $('#sb').onclick=async e=>{const ws=dirtyWeeks();if(!ws.length)return;busy(e.currentTarget,true);
      try{for(const w of ws){const items=[...Array(7)].map((_,i)=>addD(w,i)).filter(ds=>!locked(ds)).map(ds=>({ds,q:cur(ds)})).filter(o=>o.q&&o.q.kind).map(({ds,q})=>({date:ds,kind:q.kind,preset:q.preset||'',start:q.start||'',end:q.end||'',memo:q.memo||''}));
          await api('shiftreq.save',{start:w,items});try{localStorage.setItem('tsbp_req_'+w,'1')}catch(_){}
          Object.keys(DRAFT).filter(ds=>wkOf(ds)===w).forEach(ds=>delete DRAFT[ds]);}
        toast('제출했어요. 점장님께 알렸어요');ROUTES.avail(v,ym)}
      catch(er){toast(er.message);busy(e.currentTarget,false)}};
  };
  const teamHtml=()=>{const t=(W[teamW]||{}).team||[];const fw=w=>{const d=pd(w);return (d.getMonth()+1)+'.'+d.getDate()};
    return `<div class="sec"><h2>팀 신청 현황</h2><a href="#/schedule/${encodeURIComponent(S.data.me.branch)}@${teamW}">근무표 짜기</a></div>
    <div class="actw">${live.map(w=>`<button data-tw="${w}" class="${w===teamW?'on':''}">${fw(w)} 주</button>`).join('')}</div>
    <div class="list">${t.map(p=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(p.name)} <small class="pchip ${p.part==='주방'?'k':''}">${esc(p.part)}</small></div><div class="t2">${p.submitted?`휴무 희망 ${p.off}일 · 근무 희망 ${p.work}일`:'아직 안 냈어요'}</div></div>${p.submitted?chip('승인완료','제출'):chip('대기','미제출')}</div>`).join('')||'<p class="note" style="padding:12px 0">이 주 팀원이 없어요</p>'}</div>`};
  draw();
};
})();
