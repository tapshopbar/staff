/* TAP SHOP BAR People · features (스케줄, 대타, 경비, 공지, 급여명세, 증명서, 온보딩, 근태마감, 본사 콘솔) */
/* ── 스케줄 ── */
ROUTES.schedule=async function(v,arg){
  const d=S.data, me=d.me;
  let [branch,start]=(arg||'').split('@'); branch=branch||me.branch; start=start||monday(new Date());
  v.innerHTML=`<div class="title"><h1>스케줄</h1></div>${loading()}`;
  let j; try{j=await api('schedule.week',{branch,start})}catch(e){v.innerHTML=`<div class="title"><h1>스케줄</h1><p>${esc(e.message)}</p></div>`;return}
  const days=[...Array(7)].map((_,i)=>addD(start,i)), today=ymd(new Date());
  const st={shifts:j.shifts.slice(),dirty:false,deletes:[]};
  const my=(d.x&&d.x.shifts)||[];
  const draw=()=>{
    const people=j.staff.slice(); st.shifts.forEach(s=>{if(!people.some(p=>p.email===s.email))people.push({email:s.email,name:s.name,role:'직원'})});
    const hrs=e=>st.shifts.filter(s=>s.email===e).reduce((a,s)=>a+(s.hours||0),0);
    const draft=st.shifts.some(s=>s.status!=='확정');
    v.innerHTML=`<div class="title"><h1>스케줄</h1><p>${esc(branch)} · ${fmtDay(start)} – ${fmtDay(days[6])}</p></div>
    ${my.length&&branch===me.branch?`<section class="blk navy" style="margin-top:12px"><span class="tag"><i class="new">MY</i> 다가오는 내 근무</span><div class="list" style="padding:0;margin-top:10px">${my.slice(0,3).map(s=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${fmtDay(s.date)} ${esc(s.start)}–${esc(s.end)}</div><div class="t2">${esc(s.branch)}${s.pos?' · '+esc(s.pos):''} · ${s.hours.toFixed(1)}h</div></div><a class="u" style="font-size:12.5px" href="#/swap">대타</a></div>`).join('')}</div></section>`:''}
    <div class="wk" style="margin-top:8px"><button id="pw">${I('back',18)}</button><div style="text-align:center">${j.branches.length>1?`<select class="in" id="bsel" style="font-size:15px;padding:4px 22px 4px 2px;width:auto;font-weight:800">${j.branches.map(b=>`<option ${b===branch?'selected':''}>${esc(b)}</option>`).join('')}</select>`:`<b>${esc(branch)}</b>`}</div><button id="nw">${I('next',18)}</button></div>
    <div class="sgrid"><table><thead><tr><th style="text-align:left">직원</th>${days.map(ds=>{const dt=pd(ds);const tot=st.shifts.filter(s=>s.date===ds).length;return `<th class="${ds===today?'today':''}">${WD[dt.getDay()]} ${dt.getMonth()+1}.${dt.getDate()}<span class="h">${tot}명</span></th>`}).join('')}</tr></thead><tbody>
    ${people.map(p=>`<tr><td class="nm">${esc(p.name)}<small>${hrs(p.email).toFixed(1)}h</small></td>${days.map(ds=>{
      const cell=st.shifts.filter(s=>s.email===p.email&&s.date===ds);
      const lv=j.leaves.find(l=>l.email===p.email&&l.start<=ds&&l.end>=ds);
      return `<td>${lv?`<span class="sh lv">${esc(lv.type)}<small>${lv.status==='진행중'?'결재중':'확정'}</small></span>`:''}${cell.map(s=>`<button class="sh ${s.status!=='확정'?'draft':''}" data-id="${esc(s.id||s.tmp)}">${esc(s.start)}–${esc(s.end)}<small>${esc(s.pos||'')}${s.memo&&s.memo.startsWith('대타')?' · 대타':''}</small></button>`).join('')}${j.canEdit&&!cell.length?`<button class="addc" data-e="${esc(p.email)}" data-d="${ds}">+</button>`:''}</td>`}).join('')}</tr>`).join('')}
    </tbody></table></div>
    <div class="legend"><span><i style="background:var(--wine)"></i>확정</span><span><i style="background:#8a5a62"></i>임시 (직원에게 안 보임)</span><span><i style="background:var(--yellow)"></i>휴가</span></div>
    ${j.canEdit?`<div class="btnrow" style="flex-wrap:wrap"><button class="pill line sm" id="cp">지난주 복사</button>${st.dirty?'<button class="pill ink sm" id="sv">임시 저장</button>':''}<button class="pill wine sm" id="pub" ${(!draft&&!st.dirty)?'disabled':''}>확정하고 알리기</button></div>
      <p class="note">빈 칸 + 를 눌러 근무를 넣고, 확정하면 직원에게 메일·앱 알림이 가요.</p>`:''}
    <div class="list" style="margin-top:14px"><a class="li" href="#/swap"><div class="m"><div class="t1">대타 게시판</div><div class="t2">근무를 바꿔야 하면 여기서</div></div><span class="ar">${I('next',18)}</span></a><a class="li" href="#/cal"><div class="m"><div class="t1">휴가 캘린더</div><div class="t2">월간 휴가 현황</div></div><span class="ar">${I('next',18)}</span></a>${d.x&&d.x.isHQ?`<a class="li" href="#/console"><div class="m"><div class="t1">전 지점 스케줄 한눈에</div><div class="t2">본사 콘솔</div></div><span class="ar">${I('next',18)}</span></a>`:''}</div>`;
    $('#pw').onclick=()=>location.hash=`#/schedule/${encodeURIComponent(branch)}@${addD(start,-7)}`;
    $('#nw').onclick=()=>location.hash=`#/schedule/${encodeURIComponent(branch)}@${addD(start,7)}`;
    if($('#bsel'))$('#bsel').onchange=e=>location.hash=`#/schedule/${encodeURIComponent(e.target.value)}@${start}`;
    if(!j.canEdit)return;
    v.querySelectorAll('.addc').forEach(b=>b.onclick=()=>editShift({email:b.dataset.e,date:b.dataset.d,name:people.find(p=>p.email===b.dataset.e).name}));
    v.querySelectorAll('.sh[data-id]').forEach(b=>b.onclick=()=>editShift(st.shifts.find(s=>(s.id||s.tmp)===b.dataset.id)));
    $('#cp').onclick=async e=>{busy(e.currentTarget,true,'<div class="spin d"></div>');try{const r=await api('schedule.copy',{branch,start,force:st.shifts.length>0&&confirm('이번 주 기존 근무 위에 지난주 근무를 더할까요?')});toast(`${r.copied}개 근무를 복사했어요`);ROUTES.schedule(v,arg)}catch(er){toast(er.message);draw()}};
    if($('#sv'))$('#sv').onclick=e=>save(e.currentTarget,false);
    $('#pub').onclick=e=>save(e.currentTarget,true);
  };
  const save=async(btn,publish)=>{busy(btn,true);
    try{ if(st.dirty) await api('schedule.save',{branch,shifts:st.shifts.filter(s=>s.changed).map(s=>({id:s.id,date:s.date,email:s.email,start:s.start,end:s.end,brk:s.brk,pos:s.pos,memo:s.memo})),deletes:st.deletes});
      if(publish){const r=await api('schedule.publish',{branch,start});toast(`확정! ${r.notified}명에게 알렸어요`)}else toast('임시 저장했어요');
      ROUTES.schedule(v,arg)}catch(e){toast(e.message);busy(btn,false)}};
  const editShift=s=>{
    const presets=j.presets; let cur={...s,start:s.start||presets[0].start,end:s.end||presets[0].end,brk:s.brk??presets[0].brk,pos:s.pos??presets[0].name};
    openSheet(`<h2>${esc(s.name)}</h2><div class="note" style="padding:0">${fmtDay(s.date)}</div>
      <label class="f">프리셋</label><div class="presets">${presets.map((p,i)=>`<button data-i="${i}" class="${p.name===cur.pos?'on':''}">${esc(p.name)} ${esc(p.start)}–${esc(p.end)}</button>`).join('')}</div>
      <div class="two"><div><label class="f">시작</label><input class="in" type="time" id="s1" value="${esc(cur.start)}"></div><div><label class="f">종료</label><input class="in" type="time" id="s2" value="${esc(cur.end)}"></div></div>
      <div class="two"><div><label class="f">휴게(분)</label><input class="in" id="s3" inputmode="numeric" value="${esc(cur.brk)}"></div><div><label class="f">포지션</label><input class="in" id="s4" value="${esc(cur.pos||'')}" placeholder="오픈/마감/주방"></div></div>
      <div class="btnrow" style="padding:22px 0 0">${s.id||s.tmp?'<button class="pill line" id="dl" style="color:var(--bad);flex:.6">삭제</button>':''}<button class="pill wine" id="ok">넣기</button></div>`,m=>{
      m.querySelectorAll('.presets button').forEach(b=>b.onclick=()=>{const p=presets[+b.dataset.i];m.querySelector('#s1').value=p.start;m.querySelector('#s2').value=p.end;m.querySelector('#s3').value=p.brk;m.querySelector('#s4').value=p.name;m.querySelectorAll('.presets button').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
      m.querySelector('#ok').onclick=()=>{const o={...s,start:m.querySelector('#s1').value,end:m.querySelector('#s2').value,brk:Number(m.querySelector('#s3').value)||0,pos:m.querySelector('#s4').value,status:'임시',changed:true};
        const a=o.start.split(':').map(Number),b=o.end.split(':').map(Number);let mins=(b[0]*60+b[1])-(a[0]*60+a[1]);if(mins<=0)mins+=1440;o.hours=Math.max(0,(mins-o.brk)/60);
        if(!o.id&&!o.tmp)o.tmp='t'+Math.random().toString(36).slice(2,8);
        const i=st.shifts.findIndex(x=>(x.id||x.tmp)===(o.id||o.tmp));if(i>=0)st.shifts[i]=o;else st.shifts.push(o);st.dirty=true;m.remove();draw()};
      const dl=m.querySelector('#dl');if(dl)dl.onclick=()=>{st.shifts=st.shifts.filter(x=>(x.id||x.tmp)!==(s.id||s.tmp));if(s.id)st.deletes.push(s.id);st.dirty=true;m.remove();draw()};});
  };
  draw();
};
/* ── 대타 게시판 ── */
ROUTES.swap=async function(v){
  v.innerHTML=`<div class="title"><h1>대타 게시판</h1></div>${loading()}`;
  let j;try{j=await api('swap.list')}catch(e){return}
  const me=S.data.me;
  v.innerHTML=`${back()}<div class="title"><h1>대타 게시판</h1><p>근무를 못 하게 되면 올리고, 동료가 "제가 할게요" 하면 점장님이 승인해요. 승인되면 스케줄이 자동으로 바뀌어요.</p></div>
   <div class="btnrow"><button class="pill wine" id="nw">내 근무 대타 구하기</button></div>
   <div class="sec"><h2>모집 · 진행</h2></div><div class="list">${j.items.length?j.items.map(s=>`<div class="li" style="align-items:flex-start;cursor:default">${ava(s.name,'직원')}<div class="m"><div class="t1">${fmtDay(s.date)} ${esc(s.start)}–${esc(s.end)}</div><div class="t2 w">${esc(s.name)} · ${esc(s.branch)}${s.reason?' · '+esc(s.reason):''}${s.applicant?' · 지원: '+esc(s.applicant):''}</div>
     <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">${s.status==='모집중'&&!s.mine?`<button class="pill sm wine" onclick="swapApply('${s.id}',this)">제가 할게요</button>`:''}${s.canDecide?`<button class="pill sm line" onclick="swapDecide('${s.id}',false,this)">반려</button><button class="pill sm wine" onclick="swapDecide('${s.id}',true,this)">승인</button>`:''}${s.mine&&s.status!=='확정'?`<button class="pill sm line" onclick="swapCancel('${s.id}',this)">취소</button>`:''}</div></div>${chip(s.status)}</div>`).join(''):'<div class="empty">지금은 대타 요청이 없어요</div>'}</div>`;
  $('#nw').onclick=()=>{if(!j.myShifts.length)return toast('확정된 내 근무가 없어요');
    openSheet(`<h2>어떤 근무?</h2><div class="list" style="padding:0;margin-top:10px">${j.myShifts.map(s=>`<label class="li"><input type="radio" name="sf" value="${esc(s.id)}" style="width:20px;height:20px;accent-color:var(--wine)"><div class="m"><div class="t1">${fmtDay(s.date)} ${esc(s.start)}–${esc(s.end)}</div><div class="t2">${esc(s.branch)}${s.pos?' · '+esc(s.pos):''}</div></div></label>`).join('')}</div>
      <label class="f">사유</label><input class="in" id="rs" placeholder="예) 학교 시험"><button class="pill wine full" style="margin-top:18px" id="ok">올리기</button>`,m=>{
      m.querySelector('#ok').onclick=async e=>{const sel=m.querySelector('input[name=sf]:checked');if(!sel)return toast('근무를 골라 주세요');busy(e.currentTarget,true);
        try{await api('swap.create',{shiftId:sel.value,reason:m.querySelector('#rs').value});m.remove();toast('올렸어요. 동료들에게 알림이 갔어요');ROUTES.swap(v)}catch(er){toast(er.message);busy(e.currentTarget,false)}}})};
};
window.swapApply=async(id,b)=>{busy(b,true);try{await api('swap.apply',{id});toast('지원했어요. 점장님 승인을 기다려요');ROUTES.swap($('#view'))}catch(e){toast(e.message);busy(b,false)}};
window.swapDecide=async(id,ok,b)=>{busy(b,true);try{await api('swap.decide',{id,approve:ok});toast(ok?'승인! 스케줄에 반영했어요':'반려했어요');await refresh();route()}catch(e){toast(e.message);busy(b,false)}};
window.swapCancel=async(id,b)=>{busy(b,true);try{await api('swap.cancel',{id});toast('취소했어요');ROUTES.swap($('#view'))}catch(e){toast(e.message);busy(b,false)}};
/* ── 경비 ── */
function expRows(list){return list.map(e=>`<a class="li" href="#/exp/${e.id}"><div class="m"><div class="t1">${won(e.amount)} <span style="color:var(--mute);font-weight:600;font-size:13px">${esc(e.kind)}</span></div><div class="t2">${esc(e.item)} · ${fmtDay(e.date)}${e.name&&e.email!==S.data.me.email?' · '+esc(e.name):''}</div></div>${chip(e.status,e.status==='진행중'&&e.steps[e.stepIdx]?e.steps[e.stepIdx].name+' 결재중':e.status)}</a>`).join('')}
ROUTES.exp=async function(v,id){
  if(id==='new')return expNew(v);
  if(id)return expDetail(v,id);
  v.innerHTML=`<div class="title"><h1>내 경비</h1></div>${loading()}`;
  const j=await api('exp.list');
  const sum=j.items.filter(e=>e.status==='지급대기').reduce((a,e)=>a+e.amount,0);
  v.innerHTML=`${back()}<div class="title"><h1>내 경비</h1><p>${sum?`지급 대기 ${won(sum)}`:'영수증 사진 한 장이면 끝나요.'}</p></div><div class="btnrow"><a class="pill wine" href="#/exp/new">새로 청구하기</a></div><div class="list">${expRows(j.items)||'<div class="empty">아직 청구 내역이 없어요</div>'}</div>`;
};
async function expNew(v){
  let me={bank:'',account:''};try{me=await api('exp.list')}catch(e){}
  const st={kind:'개인경비',receipt:''};
  v.innerHTML=`${back()}<div class="title"><h1>경비 · 소모품<br>청구</h1><p>승인되면 장분도 이사의 지급 목록에 이체 메모까지 자동으로 올라가요.</p></div>
   <div class="seg"><button class="on" data-k="개인경비">개인경비</button><button data-k="소모품">소모품 (매장 구매)</button></div>
   <div class="form"><label class="f">영수증 사진</label><label class="photo-in" id="ph"><input type="file" accept="image/*" capture="environment" id="pf" hidden><span style="font-size:26px">+</span><span>카메라로 찍기 · 앨범에서 고르기</span></label>
   <label class="f">금액</label><input class="in" id="am" inputmode="numeric" placeholder="0원" style="font-size:26px;font-weight:800">
   <div class="two"><div><label class="f">항목</label><input class="in" id="it" placeholder="예) 키친타올" list="items"><datalist id="items"><option>식자재</option><option>소모품</option><option>교통비</option><option>식대</option><option>택배비</option><option>수리비</option></datalist></div><div><label class="f">사용일</label><input class="in" type="date" id="dt" value="${ymd(new Date())}"></div></div>
   <div class="two"><div><label class="f">사용처</label><input class="in" id="pl" placeholder="예) 쿠팡"></div><div><label class="f">결제 수단</label><select class="in" id="mt"><option>개인카드</option><option>현금</option><option>계좌이체</option></select></div></div>
   <label class="f">내용 <em>(선택)</em></label><textarea class="in" id="mm" placeholder="예) 주방 소모품 긴급 구매"></textarea>
   <div class="two"><div><label class="f">입금 은행</label><input class="in" id="bk" value="${esc(me.bank||'')}" placeholder="예) 카카오뱅크"></div><div><label class="f">계좌번호</label><input class="in" id="ac" value="${esc(me.account||'')}" inputmode="numeric" placeholder="본인 명의"></div></div>
   <p class="note" style="padding:8px 0">계좌는 한 번 입력하면 기억해요. 30만원 이상은 장분도 이사 승인까지 가요.</p></div>
   <div class="btnrow"><button class="pill wine" id="sb">청구하기</button></div>`;
  v.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{v.querySelectorAll('.seg button').forEach(x=>x.classList.remove('on'));b.classList.add('on');st.kind=b.dataset.k});
  $('#pf').onchange=async e=>{const f=e.target.files[0];if(!f)return;st.receipt=await fileToDataUrl(f);$('#ph').innerHTML=`<img src="${st.receipt}"><input type="file" accept="image/*" capture="environment" id="pf" hidden>`;$('#ph').querySelector('input').onchange=$('#pf')?.onchange};
  $('#am').oninput=e=>{const n=e.target.value.replace(/[^\d]/g,'');e.target.value=n?Number(n).toLocaleString('ko-KR'):''};
  $('#sb').onclick=async e=>{if(!st.receipt)return toast('영수증 사진을 올려 주세요');const b=e.currentTarget;busy(b,true,'올리는 중…');
    try{const r=await api('exp.create',{kind:st.kind,amount:$('#am').value,item:$('#it').value,date:$('#dt').value,place:$('#pl').value,method:$('#mt').value,memo:$('#mm').value,bank:$('#bk').value,account:$('#ac').value,receipt:st.receipt});
      toast('청구했어요!');await refresh();location.hash='#/exp/'+r.id}catch(er){toast(er.message);busy(b,false)}};
}
async function expDetail(v,id){
  v.innerHTML=loading();
  let e;try{e=(await api('exp.get',{id})).item}catch(er){v.innerHTML=`<div class="empty">${esc(er.message)}</div>`;return}
  v.innerHTML=`${back()}<div class="title">${chip(e.status)}<h1 style="margin-top:12px">${won(e.amount)}</h1><p>${esc(e.kind)} · ${esc(e.item)} · ${fmtDay(e.date)}</p></div>
   <div class="form"><label class="f">결재선</label>${lineHTML({name:e.name,role:'직원'},e.steps,[],e.status==='진행중'?e.stepIdx:-1)}
   <dl class="kv" style="margin-top:18px"><dt>청구자</dt><dd>${esc(e.name)} · ${esc(e.branch)}</dd><dt>사용처</dt><dd>${esc(e.place||'-')}</dd><dt>결제</dt><dd>${esc(e.method)}</dd><dt>내용</dt><dd>${esc(e.memo||'-')}</dd>
     <dt>입금</dt><dd>${esc(e.bank||'-')} ${esc(e.account||'')}</dd><dt>이체 메모</dt><dd>${esc(e.transferMemo)}</dd>${e.paidAt?`<dt>지급일</dt><dd>${esc(e.paidAt)}</dd>`:''}</dl>
   <button class="pill line full" style="margin-top:16px" id="rc">영수증 보기</button>
   <label class="f">진행 기록</label><div class="hist">${e.history.map(h=>`<div><b>${esc(h.action)}</b> · ${esc(h.by)} <small>${esc(String(h.at).slice(5,16))}</small>${h.comment?`<div style="color:#444">${esc(h.comment)}</div>`:''}</div>`).join('')}</div>
   ${e.canAct?`<label class="f">의견 <em>(반려 시 필수)</em></label><textarea class="in" id="cm"></textarea>`:''}</div>
   ${e.canAct?`<div class="btnrow"><button class="pill line" id="rj" style="color:var(--bad);flex:.6">반려</button><button class="pill wine" id="ap">승인</button></div>`:''}
   ${e.canCancel?`<div class="btnrow"><button class="pill line" id="cc">청구 취소</button></div>`:''}`;
  $('#rc').onclick=()=>openFile(e.receipt,'영수증');
  const act=async(dec,b)=>{busy(b,true);try{await api('exp.approve',{id,decision:dec,comment:$('#cm')?$('#cm').value:''});toast(dec==='취소'?'취소했어요':dec+'했어요');await refresh();expDetail(v,id)}catch(er){toast(er.message);busy(b,false)}};
  if(e.canAct){$('#ap').onclick=ev=>act('승인',ev.currentTarget);$('#rj').onclick=ev=>act('반려',ev.currentTarget)}
  if(e.canCancel)$('#cc').onclick=ev=>act('취소',ev.currentTarget);
}
ROUTES.pay=async function(v){
  v.innerHTML=loading();
  let j;try{j=await api('pay.list')}catch(e){v.innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  const sum=j.items.reduce((a,e)=>a+e.amount,0);
  v.innerHTML=`${back()}<div class="title"><h1>경비 지급</h1><p>승인 완료된 청구예요. 새마을금고 다계좌이체에 그대로 쓰는 이체 메모가 붙어 있어요.</p></div>
   <div class="kpis" style="margin-top:12px"><div class="kpi w"><b>${j.items.length}건</b><span>지급 대기</span></div><div class="kpi"><b>${won(sum).replace('원','')}</b><span>합계(원)</span></div></div>
   <div class="tblw" style="margin-top:14px"><table class="tbl"><thead><tr>${j.canPay?'<th><input type="checkbox" id="all"></th>':''}<th>받는 분</th><th>금액</th><th>은행 · 계좌</th><th>이체 메모</th><th>내용</th></tr></thead><tbody>
   ${j.items.map(e=>`<tr>${j.canPay?`<td><input type="checkbox" class="pk" value="${esc(e.id)}"></td>`:''}<td><b>${esc(e.name)}</b><br><span style="color:var(--mute)">${esc(e.branch)}</span></td><td><b>${won(e.amount)}</b></td><td>${esc(e.bank)}<br>${esc(e.account)}</td><td><b>${esc(e.transferMemo)}</b></td><td>${esc(e.item)} · ${fmtDay(e.date)}<br><a class="u" style="font-size:12px" href="#/exp/${e.id}">영수증</a></td></tr>`).join('')||'<tr><td colspan="6" class="empty">지급 대기 없음</td></tr>'}
   </tbody></table></div>
   ${j.canPay&&j.items.length?`<div class="btnrow"><button class="pill line" id="csv">이체 목록 복사</button><button class="pill wine" id="pd">선택 지급 완료</button></div>`:''}
   <div class="sec"><h2>최근 지급</h2></div><div class="list">${expRows(j.paid)||'<div class="empty">없어요</div>'}</div>`;
  if(!j.canPay||!j.items.length)return;
  $('#all').onchange=e=>v.querySelectorAll('.pk').forEach(c=>c.checked=e.target.checked);
  $('#csv').onclick=()=>{const t=j.items.map(e=>[e.name,e.bank,e.account,e.amount,e.transferMemo].join('\t')).join('\n');navigator.clipboard.writeText(t).then(()=>toast('복사했어요 (이름·은행·계좌·금액·메모)'))};
  $('#pd').onclick=async e=>{const ids=[...v.querySelectorAll('.pk:checked')].map(c=>c.value);if(!ids.length)return toast('선택해 주세요');busy(e.currentTarget,true);
    try{const r=await api('pay.mark',{ids});toast(`${r.count}건 지급 완료 · 직원에게 알렸어요`);ROUTES.pay(v)}catch(er){toast(er.message)}};
};
/* ── 공지 · 매뉴얼 ── */
ROUTES.notice=async function(v,id){
  if(id==='new')return noticeNew(v);
  v.innerHTML=loading();
  const j=await api('notice.list');
  if(id){const n=j.items.find(x=>x.id===id);if(!n){v.innerHTML='<div class="empty">공지를 찾을 수 없어요</div>';return}
    v.innerHTML=`${back('#/notice','공지')}<div class="title">${n.required?'<i class="new">필독</i>':''}<h1 style="margin-top:10px">${esc(n.title)}</h1><p>${esc(n.by)} · ${esc(String(n.at).slice(0,16))} · ${esc(n.target)}</p></div>
     <div class="form"><div style="font-size:16px;line-height:1.75;font-weight:500;white-space:pre-wrap;padding:16px 0;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink)">${esc(n.body)}</div>
     ${n.link?`<a class="u" style="margin-top:16px" href="${esc(n.link)}" target="_blank" rel="noopener">매뉴얼 · 첨부 열기</a>`:''}</div>
     <div class="btnrow">${n.read?`<button class="pill line" disabled>확인했어요 ✓</button>`:`<button class="pill wine" id="rd">읽고 확인했어요</button>`}</div>
     ${j.canPost?`<div class="sec"><h2>읽음 현황</h2><button class="lk" id="rm">안 읽은 사람 다시 알림</button></div><div class="list" id="stats"><div class="sk" style="height:60px"></div></div>`:''}`;
    if($('#rd'))$('#rd').onclick=async e=>{busy(e.currentTarget,true);await api('notice.read',{id});toast('확인했어요');await refresh();ROUTES.notice(v,id)};
    if(j.canPost){api('notice.stats',{id}).then(s=>{const r=s.items.filter(i=>i.read).length;$('#stats').innerHTML=`<div class="li" style="cursor:default"><div class="m"><div class="t1">${r} / ${s.items.length}명 확인</div><div class="bar2"><i style="width:${s.items.length?r/s.items.length*100:0}%"></i></div></div></div>`+s.items.map(i=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(i.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(i.branch)}</span></div><div class="t2">${i.read?esc(String(i.at).slice(5,16)):'아직 안 읽음'}</div></div>${chip(i.read?'읽음':'안읽음')}</div>`).join('')});
      $('#rm').onclick=async()=>{const r=await api('notice.remind',{id});toast(`${r.count}명에게 다시 알렸어요`)}}
    return;}
  v.innerHTML=`${back()}<div class="title"><h1>공지 · 매뉴얼</h1><p>필독 공지는 "확인" 버튼을 눌러야 읽음으로 기록돼요.</p></div>
   ${j.canPost?`<div class="btnrow"><a class="pill wine" href="#/notice/new">공지 쓰기</a></div>`:''}
   <div class="list" style="margin-top:8px">${j.items.map(n=>`<a class="li" href="#/notice/${n.id}"><div class="m"><div class="t1">${n.pinned?'<i class="new" style="margin-right:6px">PIN</i>':''}${esc(n.title)}</div><div class="t2">${esc(n.by)} · ${esc(String(n.at).slice(5,10))} · ${esc(n.target)}</div></div>${n.required?chip(n.read?'읽음':'안읽음',n.read?'확인함':'필독'):(n.read?'':chip('신청','NEW'))}</a>`).join('')||'<div class="empty">공지가 없어요</div>'}</div>`;
};
function noticeNew(v){
  const isHQ=S.data.x&&S.data.x.isHQ;
  v.innerHTML=`${back('#/notice','공지')}<div class="title"><h1>공지 쓰기</h1></div><div class="form">
   <label class="f">제목</label><input class="in" id="tt" placeholder="예) 10월 신메뉴 레시피 매뉴얼">
   <label class="f">내용</label><textarea class="in" id="bd" style="min-height:160px"></textarea>
   <label class="f">매뉴얼 링크 <em>(Notion, 구글드라이브 등)</em></label><input class="in" id="lk" placeholder="https://">
   <label class="f">대상</label>${isHQ?`<select class="in" id="tg"><option>전체</option>${BR.map(b=>`<option>${b}</option>`).join('')}</select>`:`<div style="font-weight:800;padding:8px 0">${esc(S.data.me.branch)}</div>`}
   <label class="check"><input type="checkbox" id="rq" checked> <span>필독 (읽음 확인 받기 · 메일 발송)</span></label>
   <label class="check"><input type="checkbox" id="pn"> <span>맨 위에 고정</span></label></div>
   <div class="btnrow"><button class="pill wine" id="sb">올리기</button></div>`;
  $('#sb').onclick=async e=>{busy(e.currentTarget,true);try{const r=await api('notice.create',{title:$('#tt').value,body:$('#bd').value,link:$('#lk').value,target:$('#tg')?$('#tg').value:'',required:$('#rq').checked,pinned:$('#pn').checked});toast('올렸어요');location.hash='#/notice/'+r.id}catch(er){toast(er.message);busy(e.currentTarget,false)}};
}
/* ── 급여명세서 ── */
ROUTES.payslip=async function(v){
  v.innerHTML=loading();
  const j=await api('payslip.list');
  v.innerHTML=`${back()}<div class="title"><h1>급여명세서</h1><p>본인만 열람할 수 있어요. 비밀번호 없이 바로 열려요. 급여일은 매월 10일.</p></div>
   <div class="list" style="margin-top:12px">${j.items.map(p=>`<div class="li" data-ps="${esc(p.id)}"><div class="m"><div class="t1">${p.month.slice(0,4)}년 ${Number(p.month.slice(5))}월</div><div class="t2">${p.opened?'열람함':'새 명세서'}</div></div>${p.opened?'':chip('신청','NEW')}<span class="ar">${I('next',18)}</span></div>`).join('')||'<div class="empty">아직 등록된 명세서가 없어요</div>'}</div>
   ${j.canUpload?`<div class="sec"><h2>올리기 (본사)</h2></div><div class="form"><p class="note" style="padding:0 0 8px">파일 이름을 <b>2026-09_홍길동.pdf</b> 처럼 맞추면 여러 개를 한 번에 올릴 수 있어요.</p>
     <label class="photo-in" style="min-height:90px"><input type="file" accept="application/pdf" multiple id="pfs" hidden><span>PDF 여러 개 선택</span></label><div id="upl"></div></div>
     <div class="sec"><h2>최근 등록</h2></div><div class="tblw"><table class="tbl"><thead><tr><th>월</th><th>이름</th><th>열람</th></tr></thead><tbody>${(j.admin||[]).map(p=>`<tr><td>${esc(p.month)}</td><td><b>${esc(p.name)}</b></td><td>${p.opened?esc(String(p.opened).slice(5,16)):'<span style="color:var(--bad)">미열람</span>'}</td></tr>`).join('')}</tbody></table></div>`:''}`;
  // fix onclick for file ids (list holds record id; need file id)
  v.querySelectorAll('[data-ps]').forEach(el=>el.onclick=()=>{const r=j.items.find(p=>p.id===el.dataset.ps);openFile(r.file,`${Number(r.month.slice(5))}월 급여명세서`);setTimeout(refresh,3000)});
  if(!j.canUpload)return;
  $('#pfs').onchange=async e=>{const files=[...e.target.files];const out=$('#upl');out.innerHTML='';
    for(const f of files){const m=f.name.match(/(\d{4}-\d{2})[_\s-]+(.+?)\.pdf$/i);const row=document.createElement('div');row.className='li';row.style.cursor='default';
      if(!m){row.innerHTML=`<div class="m"><div class="t1">${esc(f.name)}</div><div class="t2" style="color:var(--bad)">이름 형식 확인 (YYYY-MM_이름.pdf)</div></div>`;out.appendChild(row);continue}
      const u=j.staff.find(s=>s.name===m[2].trim());row.innerHTML=`<div class="m"><div class="t1">${esc(m[2])} · ${esc(m[1])}</div><div class="t2">${u?'올리는 중…':'직원 이름을 찾을 수 없어요'}</div></div>`;out.appendChild(row);
      if(!u)continue;try{await api('payslip.upload',{email:u.email,month:m[1],file:await fileToDataUrl(f)});row.querySelector('.t2').textContent='완료 · 직원에게 알림';}catch(er){row.querySelector('.t2').textContent=er.message}}};
};
/* ── 증명서 ── */
ROUTES.cert=async function(v){
  v.innerHTML=loading();
  const j=await api('cert.list');
  v.innerHTML=`${back()}<div class="title"><h1>증명서</h1><p>신청하면 박한울 매니저가 확인 후 바로 PDF로 발급돼요.</p></div>
   <div class="form"><div class="two"><div><label class="f">종류</label><select class="in" id="kd"><option>재직증명서</option><option>경력증명서</option></select></div><div><label class="f">부수</label><input class="in" id="cp" inputmode="numeric" value="1"></div></div>
   <div class="two"><div><label class="f">용도</label><input class="in" id="pp" placeholder="예) 은행 제출"></div><div><label class="f">제출처</label><input class="in" id="to" placeholder="예) 국민은행"></div></div></div>
   <div class="btnrow"><button class="pill wine" id="sb">발급 신청</button></div>
   <div class="sec"><h2>내 신청</h2></div><div class="list">${j.items.map(c=>`<div class="li" ${c.file?`onclick="openFile('${c.file}','${esc(c.kind)}')"`:''}><div class="m"><div class="t1">${esc(c.kind)}</div><div class="t2">${esc(String(c.at).slice(0,10))} · ${esc(c.purpose||'-')}${c.memo?' · '+esc(c.memo):''}</div></div>${chip(c.status)}${c.file?`<span class="u" style="font-size:12.5px">PDF</span>`:''}</div>`).join('')||'<div class="empty">아직 없어요</div>'}</div>
   ${j.queue&&j.queue.length?`<div class="sec"><h2>발급 대기 (관리)</h2></div><div class="list">${j.queue.map(c=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(c.name)} · ${esc(c.kind)}</div><div class="t2">${esc(c.branch)} · ${esc(c.purpose||'-')} · ${esc(c.to||'-')}</div></div><button class="pill sm wine" onclick="certIssue('${c.id}',this)">PDF 발급</button></div>`).join('')}</div>`:''}`;
  $('#sb').onclick=async e=>{busy(e.currentTarget,true);try{await api('cert.create',{kind:$('#kd').value,copies:$('#cp').value,purpose:$('#pp').value,to:$('#to').value});toast('신청했어요');ROUTES.cert(v)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
};
window.certIssue=async(id,b)=>{busy(b,true,'<div class="spin"></div>');toast('PDF 만드는 중이에요 (최대 30초)',4000);try{await api('cert.issue',{id});toast('발급했어요 · 직원에게 알렸어요');await refresh();route()}catch(e){toast(e.message);busy(b,false)}};
window.openFile=openFile;
/* ── 온보딩 ── */
ROUTES.onb=async function(v,email){
  v.innerHTML=loading();
  let j;try{j=await api('onb.get',email?{email}:{})}catch(e){v.innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  const mine=!email||email===S.data.me.email;
  v.innerHTML=`${back()}<section class="hero photo" style="background-image:url(assets/loc_hall.jpg);padding-top:60px"><span class="tag"><i class="new">WELCOME</i></span><h1 style="margin:10px 0 8px">${mine?'탭샵바에 오신 걸<br>환영해요.':esc(j.name)+'님<br>온보딩'}</h1><div style="font-size:15px;font-weight:700">${j.done} / ${j.total} 완료</div><div class="meter"><i style="width:${j.done/j.total*100}%"></i></div></section>
   <div class="list" style="margin-top:6px">${j.items.map(i=>`<div class="li" data-no="${i.no}"><span class="ck ${i.done?'on':''}">${i.done?'✓':''}</span><div class="m"><div class="t1" style="${i.done?'text-decoration:line-through;opacity:.55':''}">${esc(i.title)}</div><div class="t2 w">${esc(i.desc)}${i.by==='점장'?' · 점장 확인':''}${i.done?' · '+esc(i.checker)+' '+esc(String(i.at).slice(5,10)):''}</div>${i.link?`<a class="u" style="font-size:12.5px;margin-top:6px" href="${esc(i.link)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">열기</a>`:''}</div></div>`).join('')}</div>
   <p class="note">본인 항목은 직접 체크하고, "점장 확인" 항목은 점장님이 체크해요.</p>`;
  v.querySelectorAll('[data-no]').forEach(el=>el.onclick=async()=>{try{await api('onb.check',{no:el.dataset.no,email:email||''});ROUTES.onb(v,email);refresh()}catch(e){toast(e.message)}});
};
/* ── 월말 근태 마감 ── */
ROUTES.close=async function(v,arg){
  const d=S.data, now=new Date();
  const lm=ymd(new Date(now.getFullYear(),now.getMonth()-1,1)).slice(0,7);
  let [month,branch]=(arg||'').split('@'); month=month||lm; branch=branch||(d.me.branch==='본사'?'청계':d.me.branch);
  v.innerHTML=`<div class="title"><h1>근태 마감</h1></div>${loading()}`;
  let j;try{j=await api('close.preview',{month,branch})}catch(e){v.innerHTML=`<div class="title"><h1>근태 마감</h1><p>${esc(e.message)}</p></div>`;return}
  const isHQ=d.x&&d.x.isHQ, issues=j.rows.reduce((a,r)=>a+r.issues.filter(i=>i.type!=='지각').length,0);
  const months=[0,1,2].map(k=>ymd(new Date(now.getFullYear(),now.getMonth()-k,1)).slice(0,7));
  v.innerHTML=`${back('#/more','더보기')}<div class="title"><h1>근태 마감</h1><p>스케줄과 실제 출퇴근을 비교해서 이슈를 보여줘요. 점장 확정 → 매니저 최종 마감 → 급여 시트 생성.</p></div>
   <div class="form"><div class="two"><div><label class="f">월</label><select class="in" id="mo">${months.map(m=>`<option ${m===month?'selected':''}>${m}</option>`).join('')}</select></div><div><label class="f">지점</label>${isHQ?`<select class="in" id="br">${BR.map(b=>`<option ${b===branch?'selected':''}>${b}</option>`).join('')}</select>`:`<div style="font-weight:800;padding:11px 0">${esc(branch)}</div>`}</div></div></div>
   <div class="kpis" style="margin-top:16px"><div class="kpi ${j.status.status==='마감'?'':'w'}"><b style="font-size:24px">${esc(j.status.status)}</b><span>${j.status.by?esc(j.status.by)+' 확정':'상태'}</span></div><div class="kpi ${issues?'y':'g'}"><b>${issues}</b><span>확인할 이슈</span></div><div class="kpi g"><b>${j.rows.reduce((a,r)=>a+r.paidHours,0).toFixed(0)}h</b><span>급여 인정 시간</span></div></div>
   <div class="tblw" style="margin-top:14px"><table class="tbl"><thead><tr><th>이름</th><th>예정</th><th>실근무</th><th>휴게</th><th>인정</th><th>휴가</th><th>지각</th><th>결근?</th></tr></thead><tbody>
   ${j.rows.map(r=>`<tr class="${r.issues.length?'hot':''}"><td><b>${esc(r.name)}</b></td><td>${r.schedDays}일 ${r.schedHours}h</td><td>${r.workDays}일 ${r.workHours}h</td><td>-${r.breakHours}h</td><td><b>${r.paidHours}h</b></td><td>${r.leaveDays||''}</td><td>${r.late||''}</td><td>${r.absent||''}</td></tr>`).join('')||'<tr><td colspan="8" class="empty">기록 없음</td></tr>'}</tbody></table></div>
   <p class="note">휴게시간은 근로기준법 기준(4시간 이상 30분, 8시간 이상 1시간)으로 자동 차감해요.</p>
   <div class="sec"><h2>이슈 ${issues}</h2></div><div class="list">${j.rows.flatMap(r=>r.issues.map(i=>({...i,name:r.name,email:r.email}))).map(i=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(i.name)} · ${fmtDay(i.date)}</div><div class="t2 w">${esc(i.detail)}</div></div>${chip(i.type==='지각'?'임시':i.type==='위치확인'?'지급대기':'반려',i.type)}${j.status.status!=='마감'&&i.type!=='지각'?`<button class="pill sm line" data-fix='${esc(JSON.stringify(i))}'>수정</button>`:''}</div>`).join('')||'<div class="empty">이슈가 없어요</div>'}</div>
   <div class="btnrow">${j.status.status!=='마감'?`<button class="pill wine" id="cf">${esc(branch)} ${esc(month)} 확정</button>`:''}${isHQ?`<button class="pill ink" id="fn">${esc(month)} 전 지점 최종 마감</button>`:''}</div>
   ${isHQ?'<p class="note">최종 마감하면 DB 시트에 "근태마감_월" 탭이 생기고, 급여 정산에 바로 쓸 수 있어요.</p>':''}`;
  $('#mo').onchange=e=>location.hash=`#/close/${e.target.value}@${encodeURIComponent(branch)}`;
  if($('#br'))$('#br').onchange=e=>location.hash=`#/close/${month}@${encodeURIComponent(e.target.value)}`;
  v.querySelectorAll('[data-fix]').forEach(b=>b.onclick=()=>{const i=JSON.parse(b.dataset.fix);
    openSheet(`<h2>${esc(i.name)} · ${fmtDay(i.date)}</h2><div class="note" style="padding:0">${esc(i.type)} · ${esc(i.detail)}</div>
     <div class="two"><div><label class="f">출근</label><input class="in" type="time" id="fi" value="${esc((i.in||'').slice(0,5))}"></div><div><label class="f">퇴근</label><input class="in" type="time" id="fo" value="${esc((i.out||'').slice(0,5))}"></div></div>
     <label class="f">수정 사유 <em>(기록에 남아요)</em></label><input class="in" id="fn2" placeholder="예) 폰 배터리 방전, CCTV 확인"><button class="pill wine full" style="margin-top:18px" id="ok">저장</button>`,m=>{
      m.querySelector('#ok').onclick=async e=>{busy(e.currentTarget,true);try{await api('close.fix',{row:i.row,email:i.email,date:i.date,in:m.querySelector('#fi').value,out:m.querySelector('#fo').value,note:m.querySelector('#fn2').value});m.remove();toast('수정했어요');ROUTES.close(v,arg)}catch(er){toast(er.message);busy(e.currentTarget,false)}}})});
  if($('#cf'))$('#cf').onclick=async e=>{if(issues&&!confirm(`이슈 ${issues}건이 남아 있어요. 그래도 확정할까요?`))return;busy(e.currentTarget,true);try{await api('close.confirm',{month,branch});toast('확정했어요. 매니저에게 알렸어요');ROUTES.close(v,arg)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  if($('#fn'))$('#fn').onclick=async e=>{if(!confirm(`${month} 전 지점 근태를 마감할까요?`))return;busy(e.currentTarget,true);try{const r=await api('close.finalize',{month});toast(`마감 완료 · "${r.sheet}" 탭에 ${r.rows}명`,4000);ROUTES.close(v,arg)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
};
/* ── 본사 콘솔 ── */
ROUTES.console=async function(v){
  v.innerHTML=`<div class="title"><h1>본사 콘솔</h1></div>${loading()}`;
  let j,ov;try{[j,ov]=await Promise.all([api('console'),api('schedule.overview',{start:monday(new Date())})])}catch(e){v.innerHTML=`<div class="title"><h1>본사 콘솔</h1><p>${esc(e.message)}</p></div>`;return}
  const p=j.pending, days=[...Array(7)].map((_,i)=>addD(ov.start,i)), today=ymd(new Date());
  v.innerHTML=`<section class="hero photo" style="background-image:url(assets/loc_hall.jpg);padding:40px var(--pad) 30px"><span class="tag"><i class="new">HQ</i> ${fmtDay(j.today)}</span><h1 style="font-size:44px;margin:12px 0 0">본사 콘솔.</h1><div style="font-size:15px;font-weight:600;opacity:.85;margin-top:6px">전 지점 근무 · 결재 · 경비 · 공지를 한 화면에서.</div></section>
   <div class="sec"><h2>오늘 매장</h2><a href="#/schedule">스케줄 편집</a></div>
   <div class="cgrid">${j.branches.filter(b=>b.branch!=='본사').map(b=>`<div class="cbox"><h3>${esc(b.branch)} ${b.missing.length?chip('반려','미출근 '+b.missing.length):b.scheduled?chip('정상','정상'):chip('미확정','스케줄 없음')}</h3>
     <div style="display:flex;gap:18px;margin-top:12px"><div><div class="n">${b.working}</div><div class="note" style="padding:0">근무 중</div></div><div><div class="n" style="color:var(--mute)">${b.scheduled}</div><div class="note" style="padding:0">오늘 스케줄</div></div><div><div class="n" style="color:var(--mute)">${b.done}</div><div class="note" style="padding:0">퇴근</div></div></div>
     ${b.missing.length?`<div class="warn">미출근: ${b.missing.map(esc).join(', ')}</div>`:''}
     <div class="row" style="margin-top:12px"><span>휴가</span><span>${b.off.length?b.off.map(esc).join(', '):'-'}</span></div>
     <div class="row"><span>이번 달 근무</span><span>${b.monthHours}h</span></div>
     <div class="row"><span>직원</span><span>${b.staff}명</span></div>
     <div class="row"><span>${esc(j.lastMonth)} 근태</span><a href="#/close/${j.lastMonth}@${encodeURIComponent(b.branch)}">${chip(b.close)}</a></div></div>`).join('')}</div>
   <div class="sec"><h2>처리할 일</h2></div>
   <div class="kpis"><a class="kpi w" href="#/inbox"><b>${p.leave}</b><span>휴가 결재 진행</span></a><a class="kpi w" href="#/inbox"><b>${p.exp}</b><span>경비 결재 진행</span></a><a class="kpi" href="#/pay"><b>${j.payWait.count}</b><span>경비 지급 대기 · ${won(j.payWait.sum)}</span></a><a class="kpi" href="#/swap"><b>${p.swap}</b><span>대타 진행</span></a><a class="kpi y" href="#/cert"><b>${p.cert}</b><span>증명서 발급 대기</span></a><a class="kpi g" href="#/admin"><b>${p.users}</b><span>가입 요청</span></a></div>
   <div class="sec"><h2>이번 주 스케줄</h2><span class="note" style="padding:0">${fmtDay(days[0])} – ${fmtDay(days[6])}</span></div>
   <div class="tblw"><table class="tbl"><thead><tr><th>지점</th>${days.map(ds=>`<th style="${ds===today?'background:var(--ink);color:#fff':''}">${WD[pd(ds).getDay()]} ${pd(ds).getDate()}</th>`).join('')}<th>합계</th></tr></thead><tbody>
   ${ov.branches.map(b=>`<tr><td><a href="#/schedule/${encodeURIComponent(b.branch)}@${ov.start}"><b>${esc(b.branch)}</b></a>${b.draft?'<br>'+chip('임시','임시 있음'):''}${b.empty?'<br>'+chip('미확정','미작성'):''}</td>${b.days.map(dd=>`<td title="${esc(dd.names.join(', '))}">${dd.count?`<b>${dd.count}명</b><br><span style="color:var(--mute)">${dd.hours}h</span>`:'<span style="color:#ccc">-</span>'}</td>`).join('')}<td><b>${b.total}h</b></td></tr>`).join('')}</tbody></table></div>
   <div class="sec"><h2>이번 달 경비 (지점별)</h2><a href="#/pay">지급</a></div>
   <div class="list">${Object.keys(j.expByBranch).length?Object.entries(j.expByBranch).map(([b,s])=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(b)}</div></div><b>${won(s)}</b></div>`).join(''):'<div class="empty">이번 달 승인된 경비가 없어요</div>'}</div>
   <div class="sec"><h2>필독 공지 읽음률</h2><a href="#/notice/new">공지 쓰기</a></div>
   <div class="list">${j.notices.map(n=>`<a class="li" href="#/notice/${n.id}"><div class="m"><div class="t1">${esc(n.title)}</div><div class="bar2"><i style="width:${n.total?n.read/n.total*100:0}%"></i></div></div><b>${n.read}/${n.total}</b></a>`).join('')||'<div class="empty">필독 공지가 없어요</div>'}</div>
   ${j.celebrations.length?`<div class="sec"><h2>오늘의 축하</h2></div><div class="list">${j.celebrations.map(c=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(c.name)} · ${esc(c.title)}</div><div class="t2">${esc(c.branch)}</div></div><button class="pill sm y" onclick="sendCheer('${esc(c.email)}','${esc(c.name)}','${esc(c.kind)}')">축하하기</button></div>`).join('')}</div>`:''}
   <div class="note" style="text-align:center;padding:34px 0;letter-spacing:.06em">wine is second americano</div>`;
};
