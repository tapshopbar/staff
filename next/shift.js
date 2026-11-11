/* TAP SHOP BAR People · v22 근무표 (홀/주방 · Hybrid · 수쉐프 주방 편집 · 지점 프리셋 · 연속 넣기 · 24시간 선택기 · 휴무 칸 · 근무 신청) */
(function(){
const toM=t=>{const m=String(t||'').match(/(\d{1,2}):(\d{2})/);return m?(+m[1])*60+(+m[2]):null};
const span=(a,b)=>{let x=toM(a),y=toM(b);if(x==null||y==null)return 0;if(y<=x)y+=1440;return y-x};
const autoBrk=(a,b)=>{const s=span(a,b);return s>=510?60:s>240?30:0};
const hrs=s=>Math.max(0,(span(s.start,s.end)-(+s.brk||0))/60);
const tt=(a,b)=>`${esc(a)}–${esc(b)}${toM(b)!=null&&toM(a)!=null&&toM(b)<=toM(a)?'<sup>+1</sup>':''}`;
const pad=n=>String(n).padStart(2,'0');
const HOURS=[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0,1,2];
const PAL={홀:['#FFC100','#C99A9E','#8A5A62','#4A0B18','#E0875F','#B33A4E'],주방:['#FFC100','#7C8BB5','#3A4A7A','#141B33','#5E8C7A','#2F6B5A']};
const TCLS=s=>{const n=String(s.pos||'');if(/미들\s*\/?\s*마감|롱/.test(n))return '미들마감';if(/오픈/.test(n))return '오픈';if(/마감/.test(n))return '마감';if(/미들/.test(n))return '미들';
  const a=toM(s.start);let b=toM(s.end);if(a==null||b==null)return '미들';if(b<=a)b+=1440;
  if(a<11*60)return b>=22*60?'풀':'오픈';if(b>=22*60+30)return a>=13*60?'마감':'미들마감';return '미들'};
const TCOL={오픈:['#FFC100','#0E0E0E'],미들:['#C99A9E','#0E0E0E'],미들마감:['#8A5A62','#fff'],마감:['#4A0B18','#fff'],풀:['#2B2F3A','#fff']};
const brL=b=>b==='본사'?'서포트센터':b;
const hybI=(sz=14)=>`<i class="hybi" style="width:${sz}px;height:${sz}px" title="Hybrid"></i>`;
window.hybI=hybI;

ROUTES.schedule=async function(v,arg){
  const d=S.data, me=d.me;
  let [branch,start]=(arg||'').split('@'); branch=branch||me.branch; start=start||monday(new Date());
  v.innerHTML=`<div class="title"><h1>스케줄</h1></div>${loading()}`;
  let j; try{j=await api('schedule.week',{branch,start,v2:1})}catch(e){v.innerHTML=`<div class="title"><h1>스케줄</h1><p>${esc(e.message)}</p></div>`;return}
  j.offs=j.offs||[];j.reqs=j.reqs||[];j.editParts=j.editParts||(j.canEdit?['홀','주방','하이브리드']:[]);
  j.staff.forEach(s=>{s.part=s.part||'홀'});j.shifts.forEach(s=>{s.part=s.part||'홀'});
  const days=[...Array(7)].map((_,i)=>addD(start,i)), today=ymd(new Date());
  const parts=j.editParts, can=p=>parts.includes(p), sous=parts.length===1&&parts[0]==='주방';
  const st={shifts:j.shifts.slice(),offs:j.offs.slice(),dirty:false,deletes:[],offDeletes:[],mode:'one',paint:null,filter:sous?'주방':'전체',color:(j.canEdit&&!j.foreign)?'파트':'시간대'};
  const shStyle=(s,pr)=>{if(st.color==='시간대'){const c=TCOL[TCLS(s)];return `background:${c[0]};color:${c[1]}`}return `background:${shBg(s.part)};${pr&&pr.color?`box-shadow:inset 4px 0 0 ${pr.color}`:''}`};
  const total=p=>st.shifts.filter(s=>s.email===p.email).reduce((a,s)=>a+hrs(s),0)+(+p.other||0);
  const over=p=>{if(j.foreign)return '';const t=total(p);return t>52?'x':t>=48?'w':''};
  const my=(d.x&&d.x.shifts)||[];
  const people=()=>{const ps=j.staff.slice();st.shifts.forEach(s=>{if(!ps.some(p=>p.email===s.email))ps.push({email:s.email,name:s.name,part:s.part,role:'직원'})});return ps};
  const P=e=>people().find(p=>p.email===e)||{email:e,name:e,part:'홀'};
  const partsFor=p=>(p.hybrid?['홀','주방','하이브리드']:[p.part]).filter(can);
  const canCell=p=>partsFor(p).length>0;
  const canOff=p=>can(p.part);
  const presetOf=s=>j.presets.find(x=>x.name===s.pos&&(x.part===s.part||s.part==='하이브리드'));
  const isDraft=()=>st.shifts.some(s=>s.status!=='확정'&&can(s.part))||st.offs.some(o=>o.status!=='확정'&&can(P(o.email).part));
  const shBg=p=>p==='주방'?'var(--navy)':p==='하이브리드'?'linear-gradient(90deg,#6E1426 50%,#141B33 50%)':'var(--wine)';

  const cellHtml=(p,ds)=>{
    const cell=st.shifts.filter(s=>s.email===p.email&&s.date===ds);
    const off=st.offs.find(o=>o.email===p.email&&o.date===ds);
    const lv=j.leaves.find(l=>l.email===p.email&&l.start<=ds&&l.end>=ds);
    const rq=j.reqs.find(q=>q.email===p.email&&q.date===ds);
    let h='';
    if(lv)h+=`<span class="sh lv">${esc(lv.type)}<small>${lv.status==='진행중'?'결재중':'확정'}</small></span>`;
    h+=cell.map(s=>{const pr=presetOf(s);return `<button class="sh ${s.status!=='확정'?'draft':''} ${can(s.part)?'':'ro'}" data-id="${esc(s.id||s.tmp)}" style="${shStyle(s,pr)}">${tt(s.start,s.end)}<small>${s.part!==p.part||(st.color==='시간대'&&s.part==='하이브리드')?`<b class="pt">${s.part==='하이브리드'?'단독':s.part}</b> `:''}${esc(s.pos||'')}${s.memo&&String(s.memo).startsWith('대타')?' · 대타':''}</small></button>`}).join('');
    if(off)h+=`<button class="sh off ${off.status!=='확정'?'draft':''} ${canOff(p)?'':'ro'}" data-off="${esc(off.id||off.tmp)}">휴무${off.n?` <b>${off.n}</b>`:''}<small>${off.n?'이달 '+off.n+'번째':'저장 후 번호'}</small></button>`;
    if(!cell.length&&!off&&rq&&rq.status==='신청')h+=`<span class="rqc ${rq.kind==='휴무'?'o':'w'}">${rq.kind==='휴무'?'휴무 희망':'희망 '+esc(rq.preset||(rq.start?rq.start+'–'+rq.end:''))}</span>`;
    else if(!cell.length&&!off&&!rq){const av=(j.avail||[]).find(a=>a.email===p.email&&a.date===ds);if(av)h+=`<span class="avl" style="color:${av.ok?'var(--ok)':'var(--bad)'}">${av.ok?'가능 '+esc(av.start)+'–'+esc(av.end):'불가'}</span>`}
    if(j.canEdit&&!cell.length&&!off&&canCell(p))h+=`<button class="addc" data-e="${esc(p.email)}" data-d="${ds}">+</button>`;
    return h;
  };

  const draw=()=>{
    const sl=(v.querySelector('.sg2')||{}).scrollLeft||0;
    const ps=people();
    const groups=['홀','주방'].map(g=>({g,list:ps.filter(p=>p.part===g).sort((a,b)=>(b.role==='점장')-(a.role==='점장')||(b.sous?1:0)-(a.sous?1:0)).concat(st.filter===g?ps.filter(p=>p.part!==g&&p.hybrid).map(p=>({...p,helper:true})):[])})).filter(x=>x.list.length&&(st.filter==='전체'||st.filter===x.g));
    const cnt=(ds,g)=>st.shifts.filter(s=>s.date===ds&&(s.part===g||s.part==='하이브리드')).length;
    const pw=p=>st.shifts.filter(s=>s.email===p.email).reduce((a,s)=>a+hrs(s),0);
    const po=p=>st.offs.filter(o=>o.email===p.email).length;
    const draft=isDraft();
    const paintBar=st.mode==='paint'?`<div class="pbar">${j.presets.filter(x=>can(x.part)).map((x,i)=>`<button data-pi="${j.presets.indexOf(x)}" class="${st.paint&&st.paint.t==='p'&&st.paint.i===j.presets.indexOf(x)?'on':''}"><i style="background:${x.part==='주방'?'var(--navy)':'var(--wine)'};box-shadow:inset 3px 0 0 ${esc(x.color||'transparent')}"></i>${esc(x.part==='주방'&&!sous?'주방 ':'')}${esc(x.name)}<small>${esc(x.start)}–${esc(x.end)}</small></button>`).join('')}<button data-pt="off" class="${st.paint&&st.paint.t==='off'?'on':''}"><i style="background:#D9D4D1"></i>휴무<small>쉬는 날</small></button><button data-pt="erase" class="${st.paint&&st.paint.t==='erase'?'on':''}"><i class="er"></i>지우기<small>칸 비우기</small></button></div><p class="note" style="padding-top:0">${st.paint?'칸을 톡톡 누르면 바로 들어가요. 다 넣으면 아래 확정하기.':'위에서 근무를 하나 고르고, 표의 칸을 눌러요.'}</p>`:'';
    v.innerHTML=`<div class="title"><h1>스케줄</h1><p>${esc(brL(branch))} · ${fmtDay(start)} – ${fmtDay(days[6])}${sous?' · 주방 편집':''}</p></div>${j.foreign?`<div class="fban">${esc(brL(branch))} 근무표 · 읽기 전용 · 확정된 근무만 보여요</div>`:''}
    ${my.length&&branch===me.branch?`<section class="blk navy" style="margin-top:12px"><span class="tag"><i class="new">MY</i> 다가오는 내 근무</span><div class="list" style="padding:0;margin-top:10px">${my.slice(0,3).map(s=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${fmtDay(s.date)} ${tt(s.start,s.end)}</div><div class="t2">${esc(s.branch)}${s.pos?' · '+esc(s.pos):''} · ${s.hours.toFixed(1)}h</div></div><a class="u" style="font-size:12.5px" href="#/swap">대타</a></div>`).join('')}</div></section>`:''}
    <div class="wk" style="margin-top:8px"><button id="pw">${I('back',18)}</button><div style="text-align:center">${j.branches.length>1?`<select class="in" id="bsel" style="font-size:15px;padding:4px 22px 4px 2px;width:auto;font-weight:800">${j.branches.map(b=>`<option value="${esc(b)}" ${b===branch?'selected':''}>${esc(brL(b))}${j.myBranch&&b===j.myBranch?' (우리)':''}</option>`).join('')}</select>`:`<b>${esc(brL(branch))}</b>`}</div><button id="nw">${I('next',18)}</button></div>
    ${j.canEdit&&j.horizon?`<div class="hz"><span class="hl">3주 앞 목표</span>${j.horizon.map((h,i)=>`<a href="#/schedule/${encodeURIComponent(branch)}@${h.start}" class="hd ${h.state==='확정'?'ok':h.state==='임시'?'dr':''} ${h.start===start?'cur':''}"><b>${i===0?'이번 주':i===1?'다음 주':'+'+i+'주'}</b><small>${h.state}</small></a>`).join('')}<button class="hfill" id="h3">3주 채우기</button></div>`:''}
    <div class="stool"><div class="sseg">${['전체','홀','주방'].map(f=>`<button data-f="${f}" class="${st.filter===f?'on':''}">${f}</button>`).join('')}</div><div class="sseg c">${['파트','시간대'].map(c=>`<button data-c="${c}" class="${st.color===c?'on':''}">${c==='파트'?'색: 파트':'색: 시간대'}</button>`).join('')}</div>${j.canEdit?`<div class="sseg m">${[['one','하나씩'],['paint','연속 넣기']].map(([k,l])=>`<button data-m="${k}" class="${st.mode===k?'on':''}">${l}</button>`).join('')}</div>`:''}</div>
    ${paintBar}
    <div class="sgrid sg2 ${st.color==='시간대'?'tm':''}"><table><thead><tr><th style="text-align:left">직원</th>${days.map(ds=>{const dt=pd(ds);return `<th class="${ds===today?'today':''}">${WD[dt.getDay()]} ${dt.getMonth()+1}.${dt.getDate()}<span class="h">홀 ${cnt(ds,'홀')} · 주방 ${cnt(ds,'주방')}</span></th>`}).join('')}</tr></thead><tbody>
    ${groups.map(G=>`<tr class="grp"><td colspan="8"><span class="gdot ${G.g==='주방'?'k':''}"></span>${G.g} <small>${G.list.length}명${G.g==='주방'&&!can('주방')&&!j.canEdit?'':''}</small></td></tr>`+G.list.map(p=>`<tr><td class="nm ${j.canEditStaff?'ed':''}" data-sp="${esc(p.email)}">${esc(p.name)}${p.hybrid?hybI(13):''}<small>${p.helper?'Hybrid · '+esc(p.part)+' 소속':total(p).toFixed(1)+'h · 휴무 '+po(p)}</small>${!p.helper&&p.other?`<small class="oth">타지점 ${p.other}h 포함</small>`:''}${!p.helper&&over(p)?`<small class="ov ${over(p)}">${over(p)==='x'?'52h 초과':'52h 임박'}</small>`:''}${p.role==='점장'?'<small class="rl">점장</small>':p.sous?'<small class="rl">수쉐프</small>':''}</td>${days.map(ds=>`<td data-e="${esc(p.email)}" data-d="${ds}" class="${st.mode==='paint'&&canCell(p)?'pt':''}">${cellHtml(p,ds)}</td>`).join('')}</tr>`).join('')).join('')}
    </tbody></table></div>
    <div class="legend">${st.color==='시간대'?Object.entries(TCOL).map(([k,c])=>`<span><i style="background:${c[0]}"></i>${k==='미들마감'?'미들~마감':k==='풀'?'풀타임':k}</span>`).join(''):`<span><i style="background:var(--wine)"></i>홀</span><span><i style="background:var(--navy)"></i>주방</span><span><i style="background:linear-gradient(90deg,#6E1426 50%,#141B33 50%)"></i>단독(Hybrid)</span>`}<span><i style="background:#D9D4D1"></i>휴무</span><span><i style="${st.color==='시간대'?'background:#fff;border:2px solid var(--yellow)':'background:var(--yellow)'}"></i>휴가</span><span><i style="border:1.5px dashed var(--ink);background:transparent"></i>임시 (직원에게 안 보임)</span></div>
    ${j.canEdit?`<div class="btnrow" style="flex-wrap:wrap"><button class="pill line sm" id="cp">지난주 복사</button>${st.dirty?'<button class="pill ink sm" id="sv">임시 저장</button>':''}<button class="pill wine sm" id="pub" ${(!draft&&!st.dirty)?'disabled':''}>${sous?'주방 ':''}확정하고 알리기</button></div>
      <p class="note">${sous?'수쉐프님은 주방 근무와 주방 직원 휴무를 편집할 수 있어요. Hybrid 배지가 있는 홀 직원도 주방 근무로 넣을 수 있어요.':'빈 칸 + 를 누르거나 연속 넣기로 근무를 넣고, 확정하면 직원에게 메일·앱 알림이 가요.'}${j.canEditStaff?' 이름을 누르면 홀/주방, Hybrid를 바꿀 수 있어요.':''} <a class="u" href="javascript:void 0" id="pm">프리셋 관리</a></p>`:''}
    <div class="list" style="margin-top:14px"><a class="li" href="#/avail/${start}"><div class="m"><div class="t1">근무 신청 ${j.canEdit?'· 신청 현황':''}</div><div class="t2">${j.canEdit?(j.reqs.length?'이번 주 '+new Set(j.reqs.map(q=>q.email)).size+'명 신청 · 표에 점선 칩으로 보여요':'아직 신청한 사람이 없어요'):'휴무 희망 · 근무 희망 내기'}</div></div><span class="ar">${I('next',18)}</span></a><a class="li" href="#/swap"><div class="m"><div class="t1">대타 게시판</div><div class="t2">근무를 바꿔야 하면 여기서</div></div><span class="ar">${I('next',18)}</span></a><a class="li" href="#/cal"><div class="m"><div class="t1">휴가 캘린더</div><div class="t2">월간 휴가 현황</div></div><span class="ar">${I('next',18)}</span></a>${d.x&&d.x.isHQ?`<a class="li" href="#/console"><div class="m"><div class="t1">전 지점 스케줄 한눈에</div><div class="t2">운영 콘솔</div></div><span class="ar">${I('next',18)}</span></a>`:''}</div>`;
    if(sl&&v.querySelector('.sg2'))v.querySelector('.sg2').scrollLeft=sl;
    $('#pw').onclick=()=>location.hash=`#/schedule/${encodeURIComponent(branch)}@${addD(start,-7)}`;
    $('#nw').onclick=()=>location.hash=`#/schedule/${encodeURIComponent(branch)}@${addD(start,7)}`;
    if($('#bsel'))$('#bsel').onchange=e=>location.hash=`#/schedule/${encodeURIComponent(e.target.value)}@${start}`;
    v.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{st.filter=b.dataset.f;draw()});
    v.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{st.color=b.dataset.c;draw()});
    if($('#h3'))$('#h3').onclick=async e=>{const ws=j.horizon.map(h=>h.start).filter(w=>w>start).slice(0,3);if(!ws.length)return toast('이미 3주 앞이에요');if(!confirm(`지금 보는 주(${fmtDay(start)}) 근무를 기준으로 ${ws.length}주를 임시로 채울까요?\n이미 근무가 있는 주는 건너뛰어요. 확정 전까지 직원에게 안 보여요.`))return;busy(e.currentTarget,true,'<div class="spin d"></div>');let n=0,sk=0;for(const w of ws){try{const r=await api('schedule.copy',{branch,start:w,v2:1});n+=r.copied}catch(er){sk++}}toast(`근무 ${n}개를 채웠어요${sk?' · '+sk+'주는 이미 있어서 건너뜀':''}`);ROUTES.schedule(v,arg)};
    if(j.canEditStaff)v.querySelectorAll('td.nm[data-sp]').forEach(t=>t.onclick=()=>staffSheet(P(t.dataset.sp)));
    if(!j.canEdit)return;
    v.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{st.mode=b.dataset.m;if(st.mode==='paint'&&!st.paint){const f=j.presets.findIndex(x=>can(x.part));st.paint=f>=0?{t:'p',i:f}:{t:'off'}}draw()});
    v.querySelectorAll('.pbar [data-pi]').forEach(b=>b.onclick=()=>{st.paint={t:'p',i:+b.dataset.pi};draw()});
    v.querySelectorAll('.pbar [data-pt]').forEach(b=>b.onclick=()=>{st.paint={t:b.dataset.pt};draw()});
    if(st.mode==='paint'){v.querySelectorAll('.sg2 td[data-e]').forEach(td=>td.onclick=e=>{e.preventDefault();e.stopPropagation();paintCell(P(td.dataset.e),td.dataset.d)})}
    else{
      v.querySelectorAll('.addc').forEach(b=>b.onclick=()=>editShift(P(b.dataset.e),b.dataset.d));
      v.querySelectorAll('.sh[data-id]').forEach(b=>b.onclick=()=>{const s=st.shifts.find(x=>(x.id||x.tmp)===b.dataset.id);if(!can(s.part))return toast(`${s.part} 근무는 편집 권한이 없어요`);editShift(P(s.email),s.date,s)});
      v.querySelectorAll('.sh[data-off]').forEach(b=>b.onclick=()=>{const o=st.offs.find(x=>(x.id||x.tmp)===b.dataset.off);const p=P(o.email);if(!canOff(p))return toast('휴무는 편집 권한이 없어요');editShift(p,o.date)});
    }
    $('#cp').onclick=async e=>{busy(e.currentTarget,true,'<div class="spin d"></div>');try{const r=await api('schedule.copy',{branch,start,v2:1,force:(st.shifts.length+st.offs.length)>0&&confirm('이번 주 기존 근무 위에 지난주 근무를 더할까요?')});toast(`근무 ${r.copied}개${r.offs?', 휴무 '+r.offs+'개':''}를 복사했어요`);ROUTES.schedule(v,arg)}catch(er){toast(er.message);draw()}};
    if($('#sv'))$('#sv').onclick=e=>save(e.currentTarget,false);
    $('#pub').onclick=e=>save(e.currentTarget,true);
    $('#pm').onclick=presetSheet;
  };

  /* 칸 비우기 · 근무 넣기 (로컬) */
  const clearCell=(p,ds,keepOff)=>{
    st.shifts=st.shifts.filter(s=>{if(s.email===p.email&&s.date===ds&&can(s.part)){if(s.id)st.deletes.push(s.id);return false}return true});
    if(!keepOff)st.offs=st.offs.filter(o=>{if(o.email===p.email&&o.date===ds&&canOff(p)){if(o.id)st.offDeletes.push(o.id);return false}return true});
  };
  const putShift=(p,ds,o)=>{clearCell(p,ds);const s={...o,email:p.email,name:p.name,date:ds,status:'임시',changed:true,tmp:'t'+Math.random().toString(36).slice(2,8)};s.hours=hrs(s);st.shifts.push(s);st.dirty=true};
  const putOff=(p,ds)=>{clearCell(p,ds);st.offs.push({tmp:'o'+Math.random().toString(36).slice(2,8),email:p.email,date:ds,status:'임시'});st.dirty=true};
  const partOk=(p,part)=>{
    if(part==='하이브리드'&&!p.hybrid){toast(`${p.name}님은 Hybrid 배지가 없어요. 단독 근무는 Hybrid만 넣을 수 있어요`);return false}
    if(part!==p.part&&part!=='하이브리드'&&!p.hybrid){if(sous||!can(p.part)){toast(`${p.name}님은 ${p.part} 직원이에요 (Hybrid 아님)`);return false}return confirm(`${p.name}님은 ${p.part} 직원이에요. 그래도 ${part} 근무로 넣을까요?`)}
    if(!can(part)){toast(`${part} 근무는 편집 권한이 없어요`);return false}
    return true;
  };
  const paintCell=(p,ds)=>{
    if(!canCell(p))return toast(`${p.name}님 칸은 편집 권한이 없어요`);
    const t=st.paint;if(!t)return toast('위에서 근무를 먼저 골라 주세요');
    if(t.t==='erase'){clearCell(p,ds);st.dirty=true;return draw()}
    if(t.t==='off'){if(!canOff(p))return toast('휴무는 편집 권한이 없어요');putOff(p,ds);return draw()}
    const x=j.presets[t.i];const part=x.part;
    const ex=st.shifts.find(s=>s.email===p.email&&s.date===ds&&s.start===x.start&&s.end===x.end&&s.part===part);if(ex)return;
    if(!partOk(p,part))return;
    putShift(p,ds,{start:x.start,end:x.end,brk:x.brk,pos:x.name,part});draw();
  };

  /* 근무 하나 넣기 · 고치기 */
  const editShift=(p,ds,s)=>{
    const rq=j.reqs.find(q=>q.email===p.email&&q.date===ds&&q.status==='신청');
    const off=st.offs.find(o=>o.email===p.email&&o.date===ds);
    const pf=partsFor(p);
    let cur=s?{...s}:{part:pf.includes(p.part)?p.part:pf[0],start:'',end:'',brk:null,pos:''};
    if(!s&&rq&&rq.kind==='근무'){const x=j.presets.find(y=>y.name===rq.preset&&pf.includes(y.part));if(x)Object.assign(cur,{start:x.start,end:x.end,brk:x.brk,pos:x.name,part:x.part});else if(rq.start)Object.assign(cur,{start:rq.start,end:rq.end})}
    let brkManual=cur.brk!=null&&cur.brk!==autoBrk(cur.start,cur.end), act=cur.start?'end':'start';
    openSheet(`<h2>${esc(p.name)}${p.hybrid?hybI(18):''}</h2><div class="note" style="padding:0">${fmtDay(ds)} · ${esc(p.part)} 직원${p.hybrid?' · Hybrid':''}</div>
      ${rq?`<div class="rqbox">${esc(p.name)}님 신청: <b>${rq.kind==='휴무'?'휴무 희망':'근무 희망 '+esc(rq.preset||rq.start+'–'+rq.end)}</b>${rq.memo?' · '+esc(rq.memo):''}</div>`:''}
      ${pf.length>1?`<div class="sseg pseg" style="margin-top:14px">${pf.map(x=>`<button data-pp="${x}">${x==='하이브리드'?'단독 (홀+주방)':x}</button>`).join('')}</div>`:''}
      <label class="f">프리셋</label><div class="presets" id="pl"></div>
      <div class="tp"><div class="tpv"><button data-k="start"><small>시작</small><b id="vs"></b></button><span>→</span><button data-k="end"><small>종료</small><b id="ve"></b></button></div>
        <div class="tph">${HOURS.map(h=>`<button data-h="${h}">${pad(h)}</button>`).join('')}</div>
        <div class="tpm">${[0,15,30,45].map(m=>`<button data-mm="${m}">:${pad(m)}</button>`).join('')}</div></div>
      <div class="sum" id="sum"></div>
      <label class="f">휴게 <em>자동: 4시간 넘으면 30분, 일하는 시간이 8시간이면 60분</em></label><div class="presets" id="bk">${[0,30,60,90].map(b=>`<button data-b="${b}">${b}분</button>`).join('')}</div>
      <label class="f">메모 <em>(선택)</em></label><input class="in" id="ps" placeholder="예) 바, 주방 보조" value="${esc(cur.pos||'')}">
      <div class="btnrow" style="padding:22px 0 0;flex-wrap:wrap">${s||off?'<button class="pill line sm" id="dl" style="color:var(--bad)">비우기</button>':''}${canOff(p)?'<button class="pill line sm" id="of">휴무로</button>':''}<button class="pill line sm" id="sp">프리셋 저장</button><button class="pill wine" id="ok" style="flex-basis:100%">넣기</button></div>`,m=>{
      const q=x=>m.querySelector(x);
      const paint=()=>{
        if(!brkManual&&cur.start&&cur.end)cur.brk=autoBrk(cur.start,cur.end);
        q('#vs').textContent=cur.start||'--:--';q('#ve').innerHTML=cur.end?esc(cur.end)+(toM(cur.end)<=toM(cur.start)?'<sup>+1</sup>':''):'--:--';
        m.querySelectorAll('.tpv button').forEach(b=>b.classList.toggle('on',b.dataset.k===act));
        const v0=cur[act],h0=v0?+v0.split(':')[0]:null,m0=v0?+v0.split(':')[1]:null;
        m.querySelectorAll('[data-h]').forEach(b=>b.classList.toggle('on',+b.dataset.h===h0));
        m.querySelectorAll('[data-mm]').forEach(b=>b.classList.toggle('on',+b.dataset.mm===m0));
        m.querySelectorAll('[data-b]').forEach(b=>b.classList.toggle('on',+b.dataset.b===(+cur.brk||0)));
        m.querySelectorAll('[data-pp]').forEach(b=>b.classList.toggle('on',b.dataset.pp===cur.part));
        const ls=j.presets.filter(x=>cur.part==='하이브리드'?can(x.part):x.part===cur.part);
        q('#pl').innerHTML=ls.length?ls.map(x=>`<button data-i="${j.presets.indexOf(x)}" class="${x.start===cur.start&&x.end===cur.end?'on':''}"><i class="cd" style="background:${esc(x.color||'#ccc')}"></i>${cur.part==='하이브리드'?esc(x.part)+' ':''}${esc(x.name)} ${esc(x.start)}–${esc(x.end)}</button>`).join(''):'<span class="note" style="padding:0">이 파트 프리셋이 아직 없어요. 시간을 고르고 프리셋 저장을 눌러 주세요.</span>';
        m.querySelectorAll('#pl button').forEach(b=>b.onclick=()=>{const x=j.presets[+b.dataset.i];Object.assign(cur,{start:x.start,end:x.end,brk:x.brk,pos:x.name});if(cur.part==='하이브리드'){}else cur.part=x.part;brkManual=x.brk!==autoBrk(x.start,x.end);q('#ps').value=x.name;act='end';paint()});
        const sp=span(cur.start,cur.end);q('#sum').innerHTML=cur.start&&cur.end?`<b>${(sp/60).toFixed(sp%60?1:0)}시간</b> 매장에 있어요 · 휴게 ${+cur.brk||0}분 · 실근무 <b>${hrs(cur).toFixed(1)}h</b>${(sp-(+cur.brk||0))>=480&&(+cur.brk||0)<60?' <span class="warn">8시간 일하면 휴게 60분이 필요해요</span>':''}`:'시작과 종료를 골라 주세요';
      };
      m.querySelectorAll('.tpv button').forEach(b=>b.onclick=()=>{act=b.dataset.k;paint()});
      m.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{const mm=cur[act]?cur[act].split(':')[1]:'00';cur[act]=pad(b.dataset.h)+':'+mm;paint()});
      m.querySelectorAll('[data-mm]').forEach(b=>b.onclick=()=>{const hh=cur[act]?cur[act].split(':')[0]:(act==='start'?'10':'19');cur[act]=hh+':'+pad(b.dataset.mm);if(act==='start'&&!cur.end)act='end';paint()});
      m.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{cur.brk=+b.dataset.b;brkManual=true;paint()});
      m.querySelectorAll('[data-pp]').forEach(b=>b.onclick=()=>{cur.part=b.dataset.pp;paint()});
      q('#ok').onclick=()=>{
        if(!cur.start||!cur.end)return toast('시작과 종료를 골라 주세요');
        if(!partOk(p,cur.part))return;
        const o={start:cur.start,end:cur.end,brk:+cur.brk||0,pos:q('#ps').value.trim(),part:cur.part};
        if(s){const i=st.shifts.findIndex(x=>(x.id||x.tmp)===(s.id||s.tmp));const n={...s,...o,status:'임시',changed:true};n.hours=hrs(n);st.shifts[i]=n;st.offs=st.offs.filter(x=>{if(x.email===p.email&&x.date===ds){if(x.id)st.offDeletes.push(x.id);return false}return true});st.dirty=true}
        else putShift(p,ds,o);
        m.remove();draw()};
      const dl=q('#dl');if(dl)dl.onclick=()=>{clearCell(p,ds);st.dirty=true;m.remove();draw()};
      const of=q('#of');if(of)of.onclick=()=>{putOff(p,ds);m.remove();draw()};
      q('#sp').onclick=async e=>{
        if(!cur.start||!cur.end)return toast('시간을 먼저 골라 주세요');
        const part=cur.part==='하이브리드'?(can('홀')?'홀':'주방'):cur.part;
        const name=(prompt(`${part} 프리셋 이름 (예: 오픈, 마감, 롱)`,q('#ps').value.trim()||'')||'').trim();if(!name)return;
        const used=j.presets.filter(x=>x.part===part).map(x=>x.color),color=(PAL[part]||PAL.홀).find(c=>!used.includes(c))||PAL[part][0];
        busy(e.currentTarget,true);try{const r=await api('preset.save',{branch,name,part,start:cur.start,end:cur.end,brk:+cur.brk||0,color});j.presets=r.presets;cur.pos=name;q('#ps').value=name;toast(`프리셋 '${name}' 저장했어요`)}catch(er){toast(er.message)}busy(e.currentTarget,false);paint()};
      paint();
    });
  };

  /* 프리셋 관리 */
  const presetSheet=()=>{
    const m=openSheet(`<h2>프리셋 관리</h2><div class="note" style="padding:0">${esc(branch)} 전용 · 근무 넣는 창에서 시간을 고르고 ‘프리셋 저장’을 누르면 추가돼요.</div><div id="pml"></div>`,m=>{
      const paint=()=>{m.querySelector('#pml').innerHTML=['홀','주방'].map(g=>{const ls=j.presets.filter(x=>x.part===g);return ls.length?`<label class="f">${g}</label>${ls.map(x=>`<div class="pmi"><i class="cd" style="background:${esc(x.color||'#ccc')}"></i><b>${esc(x.name)}</b><span>${esc(x.start)}–${esc(x.end)} · 휴게 ${x.brk}분</span>${can(g)?`<button data-del="${j.presets.indexOf(x)}">삭제</button>`:''}</div>`).join('')}`:''}).join('');
        m.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{const x=j.presets[+b.dataset.del];if(!confirm(`'${x.name}' 프리셋을 지울까요? (이미 넣은 근무는 그대로예요)`))return;busy(b,true);try{const r=await api('preset.delete',{branch,name:x.name,part:x.part});j.presets=r.presets;paint();draw()}catch(e){toast(e.message);busy(b,false)}})};
      paint();});
  };

  /* 직원 파트 · Hybrid */
  const staffSheet=p=>{
    let part=p.part,hy=!!p.hybrid;
    openSheet(`<h2>${esc(p.name)}</h2><div class="note" style="padding:0">근무표에서 어느 파트에 보일지 정해요.</div>
      <label class="f">기본 파트</label><div class="sseg pseg" id="pp">${['홀','주방'].map(x=>`<button data-p="${x}">${x}</button>`).join('')}</div>
      <label class="f">배지</label><button class="hybt" id="hy">${hybI(30)}<div><b>Hybrid</b><span>홀과 주방을 혼자서도 운영해요. 켜면 두 파트 근무와 ‘단독(홀+주방)’ 근무에 넣을 수 있고, 수쉐프가 주방 근무로도 넣을 수 있어요.</span></div><i class="tg"></i></button>
      <div class="btnrow" style="padding:22px 0 0"><button class="pill wine" id="ok">저장</button></div>`,m=>{
      const paint=()=>{m.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===part));m.querySelector('#hy').classList.toggle('on',hy)};
      m.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{part=b.dataset.p;paint()});
      m.querySelector('#hy').onclick=()=>{hy=!hy;paint()};
      m.querySelector('#ok').onclick=async e=>{busy(e.currentTarget,true);try{await api('staffpart.save',{email:p.email,part,hybrid:hy});toast('저장했어요');m.remove();ROUTES.schedule(v,arg)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
      paint();});
  };

  const save=async(btn,publish)=>{
    if(publish){const ov=people().filter(p=>total(p)>52);if(ov.length&&!confirm(`주 52시간을 넘는 직원이 있어요:\n${ov.map(p=>p.name+' '+total(p).toFixed(1)+'h').join(', ')}\n\n법 위반이 될 수 있어요. 그래도 확정할까요?`))return}
    busy(btn,true);
    try{ if(st.dirty) await api('schedule.save',{branch,v2:1,shifts:st.shifts.filter(s=>s.changed).map(s=>({id:s.id,date:s.date,email:s.email,start:s.start,end:s.end,brk:s.brk,pos:s.pos,memo:s.memo,part:s.part})),deletes:st.deletes,offs:st.offs.filter(o=>o.tmp).map(o=>({email:o.email,date:o.date})),offDeletes:st.offDeletes});
      if(publish){const r=await api('schedule.publish',{branch,start,v2:1});toast(`확정! ${r.notified}명에게 알렸어요`)}else toast('임시 저장했어요');
      ROUTES.schedule(v,arg)}catch(e){toast(e.message);busy(btn,false)}};
  draw();
};

/* ── 근무 신청 (휴무 희망 · 근무 희망) ── */
ROUTES.avail=async function(v,start){
  const x=S.data.x||{};start=start||x.nextMon||addD(monday(new Date()),7);
  v.innerHTML=`${back()}<div class="title"><h1>근무 신청.</h1></div>${loading()}`;
  let j;try{j=await api('shiftreq.get',{start})}catch(e){v.innerHTML=`${back()}<div class="title"><h1>근무 신청.</h1><p>${esc(e.message)}</p></div>`;return}
  const days=[...Array(7)].map((_,i)=>addD(start,i));
  const st={};days.forEach(ds=>{const q=j.mine.find(y=>y.date===ds);st[ds]=q?{kind:q.kind,preset:q.preset,start:q.start,end:q.end,memo:q.memo,status:q.status}:{kind:''}});
  const submitted=j.mine.length>0;
  const draw=()=>{
    const off=days.filter(ds=>st[ds].kind==='휴무').length,work=days.filter(ds=>st[ds].kind==='근무').length;
    v.innerHTML=`${back()}<div class="title"><h1>근무 신청.</h1><p>쉬고 싶은 날과 일하고 싶은 시간을 알려 주세요. 점장님이 보고 근무표를 짜요. 3주 뒤까지 미리 낼 수 있어요. ${submitted?'<b>제출했어요.</b> 바꾸면 다시 제출하면 돼요.':''}</p></div>
     <div class="wk"><a href="#/avail/${addD(start,-7)}">${I('back',18)}</a><b>${pd(start).getMonth()+1}월 ${pd(start).getDate()}일 주</b><a href="#/avail/${addD(start,7)}">${I('next',18)}</a></div>
     <div class="rqs">${days.map(ds=>{const s=st[ds],dt=pd(ds);return `<div class="rq"><div class="rqd"><b>${WD[dt.getDay()]}</b><span>${dt.getMonth()+1}.${dt.getDate()}</span>${s.status&&s.status!=='신청'?`<i class="rs ${s.status==='반영'?'ok':'no'}">${s.status}</i>`:''}</div><div class="rqo">
       <div class="sseg sm">${[['','상관없음'],['휴무','휴무 희망'],['근무','근무 희망']].map(([k,l])=>`<button data-d="${ds}" data-k="${k}" class="${s.kind===k?'on':''}">${l}</button>`).join('')}</div>
       ${s.kind==='근무'?`<div class="presets">${j.presets.map(p=>`<button data-d="${ds}" data-p="${esc(p.name)}|${esc(p.part)}" class="${s.preset===p.name?'on':''}">${j.hybrid?esc(p.part)+' ':''}${esc(p.name)} <small>${esc(p.start)}–${esc(p.end)}</small></button>`).join('')}<button data-d="${ds}" data-p="" class="${s.kind==='근무'&&!s.preset?'on':''}">아무 시간</button></div>`:''}
       ${s.kind?`<input class="in sm" data-d="${ds}" data-memo placeholder="${s.kind==='휴무'?'사유 (선택) 예) 병원, 학교':'메모 (선택)'}" value="${esc(s.memo||'')}">`:''}
     </div></div>`}).join('')}</div>
     <p class="note">휴무 희망 ${off}일 · 근무 희망 ${work}일 · 연차·반차는 여기 말고 ‘신청 → 연차’로 내 주세요.</p>
     <div class="btnrow"><button class="pill wine full" id="sb">${submitted?'다시 제출하기':'제출하기'}</button></div>
     ${j.team?`<div class="sec"><h2>팀 신청 현황</h2><a href="#/schedule/${encodeURIComponent(S.data.me.branch)}@${start}">근무표 짜기</a></div><div class="list">${j.team.map(t=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(t.name)} <small class="pchip ${t.part==='주방'?'k':''}">${esc(t.part)}</small></div><div class="t2">${t.submitted?`휴무 희망 ${t.off}일 · 근무 희망 ${t.work}일`:'아직 안 냈어요'}</div></div>${t.submitted?chip('승인완료','제출'):chip('대기','미제출')}</div>`).join('')}</div>`:''}`;
    v.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const s=st[b.dataset.d];s.kind=b.dataset.k;if(s.kind!=='근무'){s.preset='';s.start='';s.end=''}draw()});
    v.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const s=st[b.dataset.d];if(!b.dataset.p){s.preset='';s.start='';s.end=''}else{const [n,pt]=b.dataset.p.split('|');const p=j.presets.find(y=>y.name===n&&y.part===pt);Object.assign(s,{preset:p.name,start:p.start,end:p.end})}draw()});
    v.querySelectorAll('[data-memo]').forEach(i=>i.oninput=()=>{st[i.dataset.d].memo=i.value});
    $('#sb').onclick=async e=>{busy(e.currentTarget,true);try{const items=days.filter(ds=>st[ds].kind).map(ds=>({date:ds,kind:st[ds].kind,preset:st[ds].preset||'',start:st[ds].start||'',end:st[ds].end||'',memo:st[ds].memo||''}));await api('shiftreq.save',{start,items});try{localStorage.setItem('tsbp_req_'+start,'1')}catch(_){}toast('제출했어요. 점장님께 알렸어요');ROUTES.avail(v,start)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  };
  draw();
};
})();
