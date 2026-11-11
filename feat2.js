/* TAP SHOP BAR People · v3 (근무 가능 시간, 오픈·마감 체크리스트, 사고·클레임, 와인 퀴즈, 칭찬카드) */
/* ── 근무 가능 시간 ── */
ROUTES.avail=async function(v,start){
  const x=S.data.x||{}; start=start||x.nextMon||monday(new Date());
  v.innerHTML=`<div class="title"><h1>근무 가능 시간</h1></div>${loading()}`;
  const j=await api('avail.get',{start});
  const days=[...Array(7)].map((_,i)=>addD(start,i));
  const st=days.map(ds=>{const m=j.mine.find(a=>a.date===ds);return m?{...m}:{date:ds,ok:true,start:'11:00',end:'22:00',memo:''}});
  const submitted=j.mine.length>0;
  const draw=()=>{
    v.innerHTML=`${back()}<div class="title"><h1>근무 가능<br>시간.</h1><p>${fmtDay(start)} – ${fmtDay(days[6])} 주 · ${submitted?'제출했어요. 바꾸면 다시 제출하면 돼요.':'점장님이 이걸 보고 스케줄을 짜요.'}</p></div>
     <div class="wk"><a href="#/avail/${addD(start,-7)}">${I('back',18)}</a><b>${pd(start).getMonth()+1}월 ${pd(start).getDate()}일 주</b><a href="#/avail/${addD(start,7)}">${I('next',18)}</a></div>
     <div class="btnrow" style="padding-top:0"><button class="pill sm line" id="allok">전부 가능</button><button class="pill sm line" id="allno">전부 불가</button></div>
     <div class="list">${st.map((d,i)=>`<div class="li" style="cursor:default;flex-wrap:wrap"><div style="width:74px"><div class="t1">${WD[pd(d.date).getDay()]}</div><div class="t2">${pd(d.date).getMonth()+1}.${pd(d.date).getDate()}</div></div>
       <button class="pill sm ${d.ok?'wine':'line'}" data-t="${i}" style="min-width:64px">${d.ok?'가능':'불가'}</button>
       ${d.ok?`<input class="in" type="time" data-s="${i}" value="${esc(d.start)}" style="width:96px;font-size:15px"><span>–</span><input class="in" type="time" data-e="${i}" value="${esc(d.end)}" style="width:96px;font-size:15px">`:`<input class="in" data-m="${i}" value="${esc(d.memo)}" placeholder="사유 (선택)" style="flex:1;font-size:15px">`}</div>`).join('')}</div>
     <div class="btnrow"><button class="pill wine" id="sb">${submitted?'다시 제출':'제출하기'}</button></div>
     ${j.team?`<div class="sec"><h2>우리 지점 제출 현황</h2><span class="note" style="padding:0">${j.team.filter(t=>t.submitted).length}/${j.team.length}</span></div><div class="list">${j.team.map(t=>`<div class="li" style="cursor:default"><div class="m"><div class="t1">${esc(t.name)}</div><div class="t2 w">${t.submitted?t.days.map(d=>`${WD[pd(d.date).getDay()]} ${d.ok?esc(d.start)+'–'+esc(d.end):'불가'}`).join(' · '):'아직 안 냈어요'}</div></div>${chip(t.submitted?'확정':'미확정',t.submitted?'제출':'미제출')}</div>`).join('')}</div>
       <div class="btnrow"><a class="pill ink" href="#/schedule/${encodeURIComponent(S.data.me.branch)}@${start}">이걸로 스케줄 짜기</a></div>`:''}`;
    v.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const d=st[+b.dataset.t];d.ok=!d.ok;draw()});
    v.querySelectorAll('[data-s]').forEach(b=>b.onchange=()=>st[+b.dataset.s].start=b.value);
    v.querySelectorAll('[data-e]').forEach(b=>b.onchange=()=>st[+b.dataset.e].end=b.value);
    v.querySelectorAll('[data-m]').forEach(b=>b.oninput=()=>st[+b.dataset.m].memo=b.value);
    $('#allok').onclick=()=>{st.forEach(d=>d.ok=true);draw()};$('#allno').onclick=()=>{st.forEach(d=>d.ok=false);draw()};
    $('#sb').onclick=async e=>{busy(e.currentTarget,true);try{await api('avail.save',{start,days:st});toast('제출했어요. 점장님께 알렸어요');await refresh();ROUTES.avail(v,start)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  };
  draw();
};
/* ── 오픈 · 마감 체크리스트 ── */
ROUTES.check=async function(v,kind){
  kind=kind==='마감'?'마감':'오픈';
  v.innerHTML=`<div class="title"><h1>${kind} 체크</h1></div>${loading()}`;
  const j=await api('check.get',{kind});
  const st=j.tpl.map(t=>({...t,done:false,photoData:'',note:''}));
  const draw=()=>{
    const n=st.filter(i=>i.done).length;
    v.innerHTML=`${back()}<section class="hero ${kind==='마감'?'':'photo'}" style="${kind==='오픈'?'background-image:url(assets/loc_hall.jpg);':'background:var(--navy);'}padding-top:50px"><span class="tag"><i class="new">${esc(brLabel(j.branch))}</i> ${fmtDay(j.date)}</span><h1 style="margin:10px 0 8px">${kind} 체크리스트.</h1><div style="font-size:15px;font-weight:700"><span id="cnt">${n}</span> / ${st.length}</div><div class="meter"><i id="bar" style="width:${n/st.length*100}%"></i></div></section>
     <div class="seg"><button class="${kind==='오픈'?'on':''}" onclick="location.hash='#/check/오픈'">오픈</button><button class="${kind==='마감'?'on':''}" onclick="location.hash='#/check/마감'">마감</button></div>
     ${j.record?`<div class="bn y" style="margin-top:12px"><div><b>오늘 ${esc(j.record.by)}님이 제출했어요 · ${j.record.done}/${j.record.total}</b><span>${esc(String(j.record.at).slice(11,16))} · 다시 제출하면 새 기록으로 남아요</span></div></div>`:''}
     <div class="list" style="margin-top:8px">${st.map((i,k)=>`<div class="li" data-k="${k}" style="align-items:flex-start"><span class="ck ${i.done?'on':''}">${i.done?'✓':''}</span><div class="m"><div class="t1" style="${i.done?'opacity:.55':''}">${esc(i.title)}</div>${i.photo?`<label class="u" style="font-size:12.5px;margin-top:6px" onclick="event.stopPropagation()">${i.photoData?'사진 다시 찍기':'사진 찍기 (필수)'}<input type="file" accept="image/*" capture="environment" hidden data-p="${k}"></label>${i.photoData?`<img src="${i.photoData}" style="width:100%;margin-top:8px">`:''}`:''}</div></div>`).join('')}</div>
     <div class="form"><label class="f">메모 <em>(특이사항)</em></label><textarea class="in" id="mm" placeholder="예) 3번 탭 노즐 물 샘, 내일 확인 필요"></textarea></div>
     <div class="btnrow"><button class="pill wine" id="sb">${kind} 체크 제출</button></div>
     <p class="note">못 한 항목이 있으면 점장님께 자동으로 알려요. 체크 항목은 시트 "체크템플릿"에서 지점별로 바꿀 수 있어요.</p>`;
    v.querySelectorAll('[data-k]').forEach(el=>el.onclick=()=>{const i=st[+el.dataset.k];if(i.photo&&!i.photoData&&!i.done)return toast('사진을 먼저 찍어 주세요');i.done=!i.done;draw()});
    v.querySelectorAll('[data-p]').forEach(inp=>inp.onchange=async e=>{const f=e.target.files[0];if(!f)return;const i=st[+inp.dataset.p];i.photoData=await fileToDataUrl(f,1200,.7);i.done=true;draw()});
    $('#sb').onclick=async e=>{const miss=st.filter(i=>!i.done).length;if(miss&&!confirm(`${miss}개 항목이 남았어요. 이대로 제출할까요?`))return;busy(e.currentTarget,true,'올리는 중…');
      try{const r=await api('check.submit',{kind,memo:$('#mm').value,items:st.map(i=>({no:i.no,title:i.title,done:i.done,photo:i.photoData||''}))});toast(`${kind} 체크 제출 · ${r.done}/${r.total}`);await refresh();ROUTES.check(v,kind)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  };
  draw();
};
/* ── 사고 · 클레임 ── */
const INC_T=['고객 클레임','안전사고(부상)','기물 파손','위생·이물질','분실·도난','직원 간 문제','기타'];
ROUTES.incident=async function(v,id){
  if(id==='new')return incNew(v);
  if(id)return incDetail(v,id);
  v.innerHTML=`<div class="title"><h1>사고 · 클레임</h1></div>${loading()}`;
  const j=await api('inc.list');
  v.innerHTML=`${back()}<div class="title"><h1>사고 · 클레임</h1><p>작은 일이라도 바로 남겨 주세요. 점장 · 박한울 매니저 · 장분도 이사에게 바로 가고, 긴급하면 대표님께도 가요.</p></div>
   <div class="btnrow"><a class="pill wine" href="#/incident/new">보고하기</a></div>
   <div class="list">${j.items.map(i=>`<a class="li" href="#/incident/${i.id}"><div class="m"><div class="t1">${esc(i.type)} <span style="color:var(--mute);font-weight:600;font-size:13px">${esc(brLabel(i.branch))} · ${esc(i.name)}</span></div><div class="t2">${esc(String(i.at).slice(5,16))} · ${esc(i.body)}</div></div>${i.severity==='긴급'||i.severity==='높음'?chip('반려',i.severity):''}${chip(i.status==='완료'?'승인완료':i.status==='처리중'?'진행중':'신청',i.status)}</a>`).join('')||'<div class="empty">보고된 사고가 없어요</div>'}</div>`;
};
function incNew(v){
  const now=new Date(), loc=`${ymd(now)}T${pad(now.getHours())}:${pad(now.getMinutes())}`; let photo='';
  v.innerHTML=`${back()}<div class="title"><h1>사고 · 클레임<br>보고.</h1><p>유형과 긴급도는 비워 두면 AI(Jev)가 내용을 읽고 자동으로 분류해요.</p></div>
   <div class="form"><label class="f">무슨 일이 있었나요?</label><textarea class="in" id="bd" style="min-height:120px" placeholder="예) 20:30 2번 테이블 손님이 잔에 립스틱 자국이 있다고 항의"></textarea>
   <label class="f">어떻게 조치했나요?</label><textarea class="in" id="ac" placeholder="예) 새 잔으로 교체, 사과, 테이스팅 한 잔 서비스"></textarea>
   <div class="two"><div><label class="f">유형 <em>(선택)</em></label><select class="in" id="tp"><option value="">AI 자동 분류</option>${INC_T.map(t=>`<option>${t}</option>`).join('')}</select></div><div><label class="f">긴급도 <em>(선택)</em></label><select class="in" id="sv"><option value="">AI 자동 판단</option><option>낮음</option><option>보통</option><option>높음</option><option>긴급</option></select></div></div>
   <label class="f">발생 시각</label><input class="in" type="datetime-local" id="at" value="${loc}">
   <label class="f">고객 정보 <em>(연락이 필요할 때만 · 이름/연락처)</em></label><input class="in" id="cu">
   <label class="f">사진 <em>(선택)</em></label><label class="photo-in" id="ph"><input type="file" accept="image/*" capture="environment" id="pf" hidden><span style="font-size:26px">+</span><span>현장 사진</span></label></div>
   <div class="btnrow"><button class="pill wine" id="sb">보고하기</button></div>`;
  $('#pf').onchange=async e=>{const f=e.target.files[0];if(!f)return;photo=await fileToDataUrl(f,1200,.72);$('#ph').innerHTML=`<img src="${photo}">`};
  $('#sb').onclick=async e=>{if(!$('#bd').value.trim())return toast('내용을 적어 주세요');busy(e.currentTarget,true,'AI가 분류하는 중…');
    try{const r=await api('inc.create',{body:$('#bd').value,taken:$('#ac').value,type:$('#tp').value,severity:$('#sv').value,at:$('#at').value.replace('T',' '),customer:$('#cu').value,photo});toast(`접수했어요 · ${r.type} · ${r.severity}`,3500);location.hash='#/incident/'+r.id}catch(er){toast(er.message);busy(e.currentTarget,false)}};
}
async function incDetail(v,id){
  v.innerHTML=loading();
  let i;try{i=(await api('inc.get',{id})).item}catch(e){v.innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  const jv=i.jev;
  v.innerHTML=`${back('#/incident','사고 · 클레임')}<div class="title">${chip(i.status==='완료'?'승인완료':i.status==='처리중'?'진행중':'신청',i.status)} ${i.severity==='긴급'||i.severity==='높음'?chip('반려',i.severity):chip('미확정',i.severity)}<h1 style="margin-top:12px">${esc(i.type)}</h1><p>${esc(brLabel(i.branch))} · ${esc(i.name)} · ${esc(i.when)}</p></div>
   <div class="form"><dl class="kv"><dt>내용</dt><dd style="white-space:pre-wrap">${esc(i.body)}</dd><dt>조치</dt><dd>${esc(i.action||'-')}</dd>${i.customer?`<dt>고객</dt><dd>${esc(i.customer)}</dd>`:''}${i.resolution?`<dt>처리</dt><dd style="white-space:pre-wrap">${esc(i.resolution)}</dd>`:''}</dl>
   ${jv?`<div class="policy"><h4>Jev 자동 분류</h4>유형 <b>${esc(jv.kind||'-')}</b> · 긴급도 <b>${esc(jv.severity||'-')}</b>${jv.compensation!=null?` · 보상·사과 필요 가능성 <b>${Math.round(jv.compensation*100)}%</b>`:''}${jv.unresolved!=null?` · 미해결 가능성 <b>${Math.round(jv.unresolved*100)}%</b>`:''}</div>`:''}
   ${i.photo?`<button class="pill line full" style="margin-top:14px" onclick="openFile('${i.photo}','현장 사진')">현장 사진 보기</button>`:''}
   ${i.canManage&&i.status!=='완료'?`<label class="f">처리 내용</label><textarea class="in" id="nt" placeholder="예) 고객에게 사과 문자, 재발 방지 교육"></textarea>`:''}</div>
   ${i.canManage&&i.status!=='완료'?`<div class="btnrow"><button class="pill line" data-s="처리중">처리중</button><button class="pill wine" data-s="완료">처리 완료</button></div>`:''}`;
  v.querySelectorAll('[data-s]').forEach(b=>b.onclick=async()=>{busy(b,true);try{await api('inc.update',{id,status:b.dataset.s,note:$('#nt').value});toast('저장했어요');incDetail(v,id)}catch(e){toast(e.message);busy(b,false)}});
}
/* ── 와인 퀴즈 ── */
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function buildQuiz(data,n=10){
  const W=data.wines, pool=[];
  const uniq=(arr)=>[...new Set(arr.filter(Boolean))];
  const opts=(ans,all)=>shuffle([ans,...shuffle(uniq(all).filter(x=>x!==ans)).slice(0,3)]);
  W.forEach(w=>{
    if(w.country) pool.push({cat:'산지',q:`"${w.name}"의 생산 국가는?`,a:w.country,o:opts(w.country,W.map(x=>x.country)),exp:w.desc});
    if(w.grape) pool.push({cat:'품종',q:`"${w.name}"의 주요 품종은?`,a:w.grape,o:opts(w.grape,W.map(x=>x.grape)),exp:w.desc});
    if(w.style) pool.push({cat:'스타일',q:`"${w.name}"은 어떤 스타일로 추천하나요?`,a:w.style,o:opts(w.style,W.map(x=>x.style)),exp:w.desc});
  });
  uniq(W.map(w=>w.country)).forEach(c=>{const ins=W.filter(w=>w.country===c),outs=W.filter(w=>w.country!==c);if(ins.length&&outs.length>=3){const a=shuffle(ins)[0].name;pool.push({cat:'산지',q:`다음 중 ${c} 와인은?`,a,o:shuffle([a,...shuffle(outs).slice(0,3).map(x=>x.name)])})}});
  data.questions.forEach(q=>pool.push({cat:q.cat,q:q.q,a:q.a,o:shuffle([q.a,...q.wrong]),exp:q.exp}));
  return shuffle(pool).slice(0,n);
}
ROUTES.quiz=async function(v){
  v.innerHTML=`<div class="title"><h1>와인 퀴즈</h1></div>${loading()}`;
  let data=await api('quiz.get');
  const home=()=>{
    v.innerHTML=`${back()}<section class="hero photo" style="background-image:url(assets/americano.jpg);padding-top:70px"><span class="tag"><i class="new">QUIZ</i> 탭 와인 64가지</span><h1 style="margin:10px 0 6px">오늘의<br>와인 퀴즈.</h1><div style="font-size:14px;font-weight:600;opacity:.85">10문제 · 산지 · 품종 · 스타일 · 페어링 · 서비스</div>
      <div class="meta" style="margin-top:18px"><span>내 레벨 <b>${esc(data.my.level)}</b></span><span>누적 정답 ${data.my.correct} · ${data.my.plays}회</span></div></section>
     <div class="btnrow"><button class="pill wine" id="go">시작하기</button></div>
     <div class="sec"><h2>이번 달 랭킹</h2></div><div class="list">${data.board.map((b,i)=>`<div class="li" style="cursor:default;${b.me?'background:#FFF6D6':''}"><b style="font-size:20px;width:28px">${i+1}</b><div class="m"><div class="t1">${esc(b.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(brLabel(b.branch))}</span></div><div class="t2">${b.score}/${b.total} · ${b.secs}초 · ${b.tries}회 도전</div></div>${i===0?'<i class="new">1위</i>':''}</div>`).join('')||'<div class="empty">이번 달 첫 도전자가 되어 보세요</div>'}</div>
     <p class="note">레벨: 루키 → 탭 크루(20) → 와인 러버(60) → 와인 마스터(150) → 소믈리에(300 누적 정답). 와인 정보는 시트 "와인" 탭과 "퀴즈문항" 탭에서 늘릴 수 있어요.</p>`;
    $('#go').onclick=play;
  };
  const play=()=>{
    const qs=buildQuiz(data,10); let k=0,score=0,wrong=[]; const t0=Date.now();
    const show=()=>{
      if(k>=qs.length)return finish();
      const q=qs[k];
      v.innerHTML=`<div class="title"><span class="tag"><i class="new">${k+1} / ${qs.length}</i> ${esc(q.cat)}</span><h1 style="font-size:28px;margin-top:14px;line-height:1.25">${esc(q.q)}</h1></div><div class="meter" style="margin:12px var(--pad);background:var(--grey)"><i style="width:${k/qs.length*100}%"></i></div>
       <div class="list">${q.o.map(o=>`<button class="li" style="width:100%;text-align:left" data-o="${esc(o)}"><div class="m"><div class="t1">${esc(o)}</div></div></button>`).join('')}</div><div id="fb"></div>`;
      v.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{
        const ok=b.dataset.o===q.a; if(ok)score++; else wrong.push(q.q);
        v.querySelectorAll('[data-o]').forEach(x=>{x.disabled=true;if(x.dataset.o===q.a){x.style.background='var(--wine)';x.style.color='#fff'}else if(x===b){x.style.background='#FBE1E4'}});
        $('#fb').innerHTML=`<div class="blk" style="background:${ok?'#DDF0E6':'#FBE1E4'};margin-top:12px"><b style="font-size:18px">${ok?'정답!':'아쉬워요'}</b>${q.exp?`<div style="margin-top:4px;font-weight:500">${esc(q.exp)}</div>`:''}</div><div class="btnrow"><button class="pill ink" id="nx">${k+1<qs.length?'다음':'결과 보기'}</button></div>`;
        $('#nx').onclick=()=>{k++;show()};
      });
    };
    const finish=async()=>{
      const secs=Math.round((Date.now()-t0)/1000);
      v.innerHTML=`<section class="hero" style="padding-top:70px;text-align:left"><span class="tag"><i class="new">RESULT</i></span><div class="big" style="margin-top:12px"><b>${score}</b><span>/ ${qs.length} 정답 · ${secs}초</span></div><h1 style="margin-top:14px">${score>=9?'소믈리에 감이에요!':score>=7?'와인 마스터 느낌!':score>=5?'좋아요, 조금만 더!':'다시 도전해 볼까요?'}</h1></section>${loading()}`;
      try{data=await api('quiz.submit',{score,total:qs.length,secs,wrong:wrong.join(' | ')})}catch(e){}
      home();toast(`${score}/${qs.length} 기록했어요`);
    };
    show();
  };
  home();
};
/* ── 칭찬카드 ── */
ROUTES.kudos=async function(v){
  v.innerHTML=`<div class="title"><h1>칭찬카드</h1></div>${loading()}`;
  const j=await api('kudos.list');
  let val=j.values[0], pub=true;
  const byBr={};j.people.forEach(p=>{const g=typeof peopleGroup==='function'?peopleGroup(p):p.branch;(byBr[g]=byBr[g]||[]).push(p)});if(typeof sortGroups==='function'){const o={};sortGroups(Object.keys(byBr)).forEach(k=>o[k]=byBr[k]);Object.keys(byBr).forEach(k=>delete byBr[k]);Object.assign(byBr,o)}
  v.innerHTML=`${back()}<section class="hero photo" style="background-image:url(assets/a26_men_B.jpg);background-position:50% 25%;padding-top:80px"><span class="tag"><i class="new">KUDOS</i> 받은 칭찬 ${j.received}장</span><h1 style="margin:10px 0 0">고마운 동료에게<br>한 장.</h1></section>
   <div class="form"><label class="f">누구에게</label><select class="in" id="to"><option value="">동료 선택</option>${Object.keys(byBr).map(b=>`<optgroup label="${esc(b)}">${byBr[b].map(p=>`<option value="${esc(p.email)}">${esc(p.name)}</option>`).join('')}</optgroup>`).join('')}</select>
   <label class="f">어떤 점이 좋았나요?</label><div class="presets">${j.values.map((x,i)=>`<button data-v="${esc(x)}" class="${i===0?'on':''}">${esc(x)}</button>`).join('')}</div>
   <label class="f">메시지</label><textarea class="in" id="mg" placeholder="예) 바쁜 금요일 마감 끝까지 같이 해줘서 고마워요!"></textarea>
   <label class="check"><input type="checkbox" id="pb" checked> <span>피드에 공개 (모두가 볼 수 있어요)</span></label></div>
   <div class="btnrow"><button class="pill wine" id="sd">칭찬카드 보내기</button></div>
   ${j.top.length?`<div class="sec"><h2>이번 달 칭찬왕</h2></div><div class="list">${j.top.map((t,i)=>`<div class="li" style="cursor:default"><b style="font-size:20px;width:28px">${i+1}</b><div class="m"><div class="t1">${esc(t.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(typeof brLabel==='function'?brLabel(t.branch):t.branch)}</span></div></div><b>${t.n}장</b></div>`).join('')}</div>`:''}
   <div class="sec"><h2>칭찬 피드</h2></div><div class="list">${j.feed.map(k=>`<div class="li" style="cursor:default;align-items:flex-start;${k.mine?'background:#FFF6D6':''}"><div class="m"><div class="t1">${esc(k.from)} → ${esc(k.to)} <i class="new" style="margin-left:4px">${esc(k.value)}</i></div><div class="t2 w" style="color:var(--ink);font-size:14.5px;margin-top:6px">${esc(k.msg)}</div><div class="t2">${esc(String(k.at).slice(5,16))} · ${esc(typeof brLabel==='function'?brLabel(k.branch):k.branch)}${k.pub?'':' · 비공개'}</div></div></div>`).join('')||'<div class="empty">첫 칭찬카드를 보내 보세요</div>'}</div>`;
  v.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{v.querySelectorAll('[data-v]').forEach(x=>x.classList.remove('on'));b.classList.add('on');val=b.dataset.v});
  $('#sd').onclick=async e=>{busy(e.currentTarget,true);try{await api('kudos.send',{email:$('#to').value,value:val,message:$('#mg').value,public:$('#pb').checked});toast('칭찬카드를 보냈어요');ROUTES.kudos(v)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
};

/* ── 업무일지 ── */
ROUTES.log=async function(v,arg){
  let [date,branch]=(arg||'').split('@');
  v.innerHTML=`<div class="title"><h1>업무일지</h1></div>${loading()}`;
  const j=await api('log.list',{date,branch});
  date=j.date; let cat=j.cats[0], photo='';
  const today=(()=>{const d=new Date(Date.now()-6*3600e3);return ymd(d)})();
  v.innerHTML=`${back()}<div class="title"><h1>업무일지</h1><p>누구나 한 줄씩. 매일 저녁 서포트센터(장분도 · 박한울)로 모아서 메일이 가요.</p></div>
   ${date===today?`<div class="form"><textarea class="in" id="tx" style="min-height:90px" placeholder="예) 19시 단체 예약 12명, 와인 3병 추가 판매 · 냉장고 2번 온도 높음"></textarea>
   <div class="presets">${j.cats.map((c,i)=>`<button data-c="${esc(c)}" class="${i===0?'on':''}">${esc(c)}</button>`).join('')}<label class="u" style="margin-left:auto;align-self:center;font-size:13px">사진<input type="file" accept="image/*" capture="environment" hidden id="pf"></label></div><div id="pv"></div></div>
   <div class="btnrow"><button class="pill wine" id="sb">남기기</button></div>`:''}
   <div class="wk"><a href="#/log/${addD(date,-1)}${branch?'@'+encodeURIComponent(branch):''}">${I('back',18)}</a><b>${fmtDay(date)} · ${esc(j.scope)}</b>${date<today?`<a href="#/log/${addD(date,1)}${branch?'@'+encodeURIComponent(branch):''}">${I('next',18)}</a>`:'<span style="width:34px"></span>'}</div>
   ${j.branches?`<div class="presets" style="padding:0 var(--pad);margin-top:0">${['',...j.branches].map(b=>`<a href="#/log/${date}${b?'@'+encodeURIComponent(b):''}"><button class="${(branch||'')===b?'on':''}">${b||'전 지점'}</button></a>`).join('')}</div>`:''}
   <div class="list" style="margin-top:12px">${j.items.map(i=>`<div class="li" style="cursor:default;align-items:flex-start">${ava(i.name,'직원',36)}<div class="m"><div class="t1" style="font-size:14.5px">${esc(i.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(brLabel(i.branch))} · ${esc(String(i.at).slice(11,16))}</span> ${i.cat==='퇴근 한 줄'?'<i class="new">퇴근 한 줄</i>':`<span class="chip c-미확정">${esc(i.cat)}</span>`}</div><div style="font-size:15px;font-weight:500;margin-top:4px;line-height:1.55;white-space:pre-wrap">${esc(i.text)}</div>${i.photo?`<button class="u" style="font-size:12.5px;margin-top:6px" onclick="openFile('${i.photo}','업무일지 사진')">사진 보기</button>`:''}</div></div>`).join('')||'<div class="empty">아직 기록이 없어요</div>'}</div>`;
  if(date!==today)return;
  v.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{v.querySelectorAll('[data-c]').forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.c});
  $('#pf').onchange=async e=>{const f=e.target.files[0];if(!f)return;photo=await fileToDataUrl(f,1200,.72);$('#pv').innerHTML=`<img src="${photo}" style="width:120px;margin-top:10px">`};
  $('#sb').onclick=async e=>{const t=$('#tx').value.trim();if(!t)return toast('내용을 적어 주세요');busy(e.currentTarget,true);try{await api('log.add',{text:t,cat,photo});toast('남겼어요');ROUTES.log(v,arg)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
};


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
    <div class="stool"><div class="sseg">${['전체','홀','주방'].map(f=>`<button data-f="${f}" class="${st.filter===f?'on':''}">${f}</button>`).join('')}</div><div class="sseg c">${['파트','시간대'].map(c=>`<button data-c="${c}" class="${st.color===c?'on':''}">${c==='파트'?'색: 파트':'색: 시간대'}</button>`).join('')}</div>${j.canEdit?`<div class="sseg m">${[['one','하나씩'],['paint','연속 넣기']].map(([k,l])=>`<button data-m="${k}" class="${st.mode===k?'on':''}">${l}</button>`).join('')}</div><button class="pmb" id="pm2">프리셋</button>`:''}</div>
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
    $('#pm').onclick=presetSheet;if($('#pm2'))$('#pm2').onclick=presetSheet;
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

  /* 프리셋 관리 (11/11: 수정·추가·삭제 한 곳에서) */
  const presetSheet=()=>{
    const HH=['06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02'],MM=['00','15','30','45'];
    const m=openSheet(`<h2>프리셋 관리</h2><div class="note" style="padding:0">${esc(brL(branch))} 전용 · 고치거나 지워도 이미 넣은 근무는 그대로예요.</div><div id="pml"></div>`,m=>{
      let ed=null,brkM=false;
      const q=s=>m.querySelector(s);
      const tsel=(id,v)=>{const [h,mi]=String(v||'').split(':');return `<span class="pmt"><select class="in sm" id="${id}h">${HH.map(x=>`<option ${x===h?'selected':''}>${x}</option>`).join('')}</select><b>:</b><select class="in sm" id="${id}m">${MM.map(x=>`<option ${x===mi?'selected':''}>${x}</option>`).join('')}</select></span>`};
      const grab=()=>{if(!ed||!q('#fn'))return;ed.name=q('#fn').value.trim();ed.start=q('#fsh').value+':'+q('#fsm').value;ed.end=q('#feh').value+':'+q('#fem').value};
      const form=()=>`<div class="pmf"><div class="pmf-h"><b>${ed.i<0?'새 프리셋':'프리셋 고치기'}</b>${ed.i<0&&can('홀')&&can('주방')?`<div class="sseg sm">${['홀','주방'].map(g=>`<button data-fp="${g}" class="${ed.part===g?'on':''}">${g}</button>`).join('')}</div>`:`<small>${esc(ed.part)}</small>`}</div>
        <input class="in" id="fn" maxlength="12" placeholder="이름 (예: 오픈, 마감, 롱)" value="${esc(ed.name)}">
        <div class="pmr"><span>시작</span>${tsel('fs',ed.start)}</div><div class="pmr"><span>종료</span>${tsel('fe',ed.end)}</div>
        <div class="pmr"><span>휴게</span><div class="sseg sm">${[0,30,60,90].map(b=>`<button data-fb="${b}" class="${+ed.brk===b?'on':''}">${b}분</button>`).join('')}</div></div>
        <div class="pmr" style="justify-content:flex-end"><button class="pill line sm" id="fc">취소</button><button class="pill wine sm" id="fo">저장</button></div></div>`;
      const paint=()=>{
        q('#pml').innerHTML=['홀','주방'].map(g=>{const ls=j.presets.filter(x=>x.part===g);return ls.length||can(g)?`<label class="f">${g}</label>${ls.map(x=>{const i=j.presets.indexOf(x);return ed&&ed.i===i?form():`<div class="pmi"><i class="cd" style="background:${esc(x.color||'#ccc')}"></i><b>${esc(x.name)}</b><span>${esc(x.start)}–${esc(x.end)} · 휴게 ${x.brk}분</span>${can(g)?`<button class="pme" data-ed="${i}">수정</button><button data-del="${i}">삭제</button>`:''}</div>`}).join('')}`:''}).join('')
          +(ed&&ed.i<0?form():(parts.some(p=>p==='홀'||p==='주방')?`<button class="pill line full" id="fa" style="margin-top:14px">+ 새 프리셋</button>`:''));
        m.querySelectorAll('[data-ed]').forEach(b=>b.onclick=()=>{const x=j.presets[+b.dataset.ed];ed={i:+b.dataset.ed,old:x.name,part:x.part,name:x.name,start:x.start,end:x.end,brk:+x.brk||0,color:x.color};brkM=true;paint()});
        const fa=q('#fa');if(fa)fa.onclick=()=>{ed={i:-1,part:can('홀')?'홀':'주방',name:'',start:'10:00',end:'19:00',brk:60,color:''};brkM=false;paint()};
        if(ed){
          m.querySelectorAll('[data-fp]').forEach(b=>b.onclick=()=>{grab();ed.part=b.dataset.fp;paint()});
          m.querySelectorAll('[data-fb]').forEach(b=>b.onclick=()=>{grab();ed.brk=+b.dataset.fb;brkM=true;paint()});
          m.querySelectorAll('.pmt select').forEach(s=>s.onchange=()=>{grab();if(!brkM){ed.brk=autoBrk(ed.start,ed.end);paint()}});
          q('#fc').onclick=()=>{ed=null;paint()};
          q('#fo').onclick=async e=>{grab();
            if(!ed.name)return toast('이름을 입력해 주세요');
            if(ed.start===ed.end)return toast('시작과 종료가 같아요');
            if(j.presets.some(x=>x.part===ed.part&&x.name===ed.name&&x.name!==ed.old))return toast(`${ed.part}에 '${ed.name}' 프리셋이 이미 있어요`);
            const used=j.presets.filter(x=>x.part===ed.part).map(x=>x.color),color=ed.color||(PAL[ed.part]||PAL.홀).find(c=>!used.includes(c))||PAL[ed.part][0];
            busy(e.currentTarget,true);
            try{const r=await api('preset.save',{branch,name:ed.name,part:ed.part,start:ed.start,end:ed.end,brk:ed.brk,color,old:ed.i>=0?ed.old:''});j.presets=r.presets;toast(`프리셋 '${ed.name}' 저장했어요`);ed=null;paint();draw()}
            catch(er){toast(er.message);busy(e.currentTarget,false)}};
        }
        m.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{const x=j.presets[+b.dataset.del];if(!confirm(`'${x.name}' 프리셋을 지울까요? (이미 넣은 근무는 그대로예요)`))return;busy(b,true);try{await api('preset.save',{branch,name:x.name,part:x.part,start:x.start,end:x.end,brk:x.brk,color:x.color,old:x.name});/* 공용(전체) 프리셋을 쓰는 지점은 먼저 지점 것으로 복사해야 지워짐 */const r=await api('preset.delete',{branch,name:x.name,part:x.part});j.presets=r.presets;paint();draw()}catch(e){toast(e.message);busy(b,false)}})};
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

/* ── 근무표 한눈에 보기 (윤홍민 수쉐프 요청 11/11) ──
   1) 태블릿·PC(가로 760px 이상)에서는 근무표 화면을 자동으로 넓게 (가로 스크롤 없음)
   2) 폰: '한눈에 보기'를 켜면 표가 화면 폭에 맞게 줄어들고 위 안내·아래 메뉴를 숨김. 켠 상태는 기억. */
(function(){
const K='tsbp_swide',big=()=>matchMedia('(min-width:760px)').matches,onSched=()=>routeKey()==='schedule';
const isOn=()=>{try{return localStorage.getItem(K)==='1'}catch(_){return false}};
function apply(){const s=onSched();if(s&&big())document.body.classList.add('wide');document.body.classList.toggle('sfit',s&&isOn());btn()}
function btn(){if(!onSched())return;const t=document.querySelector('#view .stool');if(!t||t.querySelector('#sfx'))return;
  const b=document.createElement('button');b.id='sfx';b.className='sfx'+(isOn()?' on':'');
  b.innerHTML=isOn()?'기본 보기':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg> 한눈에 보기';
  b.onclick=()=>{const on=!isOn();try{localStorage.setItem(K,on?'1':'0')}catch(_){}
    const de=document.documentElement;
    if(on&&!big()&&de.requestFullscreen&&!document.fullscreenElement)de.requestFullscreen().catch(()=>{});
    if(!on&&document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});
    t.querySelector('#sfx').remove();apply();window.scrollTo(0,0);
    if(on&&!big()&&innerHeight>innerWidth)toast('폰을 가로로 돌리면 더 넓게 보여요',2200)};
  t.appendChild(b)}
const orig=ROUTES.schedule;
ROUTES.schedule=async function(v,a){apply();const r=await orig(v,a);apply();return r};
addEventListener('hashchange',()=>setTimeout(apply,0));
addEventListener('resize',()=>{if(onSched())apply()});
new MutationObserver(()=>{if(onSched())btn()}).observe(document.body,{childList:true,subtree:true});
})();

/* ── 정산 메모 (2026-11-12 라이브 v32, memo.js 합침) ── */
/* 정산 메모 (2026-11-12, v32: 모든 재직 직원 지점 선택 · 기본 = 내 매장): 일정산 시트 '일별메모'에 앱에서 바로 기록. API memo.get / memo.add */
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
  let last='';return list.map(m=>{const h=m.date!==last?`<div class="mday">${fmtDay(m.date)}</div>`:'';last=m.date;
    return `${h}<div class="qa mrow"><div class="m">${esc(m.g||'')}${m.qty!==''&&m.qty!=null?' · '+esc(m.qty)+'개':''}</div><div class="q"><b>${esc(m.item)}</b>${m.amt!==''&&m.amt!=null?' · '+won(m.amt):''}</div><div class="mt">${esc(m.text)}</div></div>`}).join('')}
/* 홈 타일은 core.js '매장 · 성장' 그리드에 직접 (2026-11-12 v32) */
})();
