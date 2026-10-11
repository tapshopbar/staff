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
    v.innerHTML=`${back()}<section class="hero ${kind==='마감'?'':'photo'}" style="${kind==='오픈'?'background-image:url(assets/loc_hall.jpg);':'background:var(--navy);'}padding-top:50px"><span class="tag"><i class="new">${esc(j.branch)}</i> ${fmtDay(j.date)}</span><h1 style="margin:10px 0 8px">${kind} 체크리스트.</h1><div style="font-size:15px;font-weight:700"><span id="cnt">${n}</span> / ${st.length}</div><div class="meter"><i id="bar" style="width:${n/st.length*100}%"></i></div></section>
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
   <div class="list">${j.items.map(i=>`<a class="li" href="#/incident/${i.id}"><div class="m"><div class="t1">${esc(i.type)} <span style="color:var(--mute);font-weight:600;font-size:13px">${esc(i.branch)} · ${esc(i.name)}</span></div><div class="t2">${esc(String(i.at).slice(5,16))} · ${esc(i.body)}</div></div>${i.severity==='긴급'||i.severity==='높음'?chip('반려',i.severity):''}${chip(i.status==='완료'?'승인완료':i.status==='처리중'?'진행중':'신청',i.status)}</a>`).join('')||'<div class="empty">보고된 사고가 없어요</div>'}</div>`;
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
  v.innerHTML=`${back('#/incident','사고 · 클레임')}<div class="title">${chip(i.status==='완료'?'승인완료':i.status==='처리중'?'진행중':'신청',i.status)} ${i.severity==='긴급'||i.severity==='높음'?chip('반려',i.severity):chip('미확정',i.severity)}<h1 style="margin-top:12px">${esc(i.type)}</h1><p>${esc(i.branch)} · ${esc(i.name)} · ${esc(i.when)}</p></div>
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
     <div class="sec"><h2>이번 달 랭킹</h2></div><div class="list">${data.board.map((b,i)=>`<div class="li" style="cursor:default;${b.me?'background:#FFF6D6':''}"><b style="font-size:20px;width:28px">${i+1}</b><div class="m"><div class="t1">${esc(b.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(b.branch)}</span></div><div class="t2">${b.score}/${b.total} · ${b.secs}초 · ${b.tries}회 도전</div></div>${i===0?'<i class="new">1위</i>':''}</div>`).join('')||'<div class="empty">이번 달 첫 도전자가 되어 보세요</div>'}</div>
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
  const byBr={};j.people.forEach(p=>{(byBr[p.branch]=byBr[p.branch]||[]).push(p)});
  v.innerHTML=`${back()}<section class="hero photo" style="background-image:url(assets/a26_men_B.jpg);background-position:50% 25%;padding-top:80px"><span class="tag"><i class="new">KUDOS</i> 받은 칭찬 ${j.received}장</span><h1 style="margin:10px 0 0">고마운 동료에게<br>한 장.</h1></section>
   <div class="form"><label class="f">누구에게</label><select class="in" id="to"><option value="">동료 선택</option>${Object.keys(byBr).map(b=>`<optgroup label="${esc(b)}">${byBr[b].map(p=>`<option value="${esc(p.email)}">${esc(p.name)}</option>`).join('')}</optgroup>`).join('')}</select>
   <label class="f">어떤 점이 좋았나요?</label><div class="presets">${j.values.map((x,i)=>`<button data-v="${esc(x)}" class="${i===0?'on':''}">${esc(x)}</button>`).join('')}</div>
   <label class="f">메시지</label><textarea class="in" id="mg" placeholder="예) 바쁜 금요일 마감 끝까지 같이 해줘서 고마워요!"></textarea>
   <label class="check"><input type="checkbox" id="pb" checked> <span>피드에 공개 (모두가 볼 수 있어요)</span></label></div>
   <div class="btnrow"><button class="pill wine" id="sd">칭찬카드 보내기</button></div>
   ${j.top.length?`<div class="sec"><h2>이번 달 칭찬왕</h2></div><div class="list">${j.top.map((t,i)=>`<div class="li" style="cursor:default"><b style="font-size:20px;width:28px">${i+1}</b><div class="m"><div class="t1">${esc(t.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(t.branch)}</span></div></div><b>${t.n}장</b></div>`).join('')}</div>`:''}
   <div class="sec"><h2>칭찬 피드</h2></div><div class="list">${j.feed.map(k=>`<div class="li" style="cursor:default;align-items:flex-start;${k.mine?'background:#FFF6D6':''}"><div class="m"><div class="t1">${esc(k.from)} → ${esc(k.to)} <i class="new" style="margin-left:4px">${esc(k.value)}</i></div><div class="t2 w" style="color:var(--ink);font-size:14.5px;margin-top:6px">${esc(k.msg)}</div><div class="t2">${esc(String(k.at).slice(5,16))} · ${esc(k.branch)}${k.pub?'':' · 비공개'}</div></div></div>`).join('')||'<div class="empty">첫 칭찬카드를 보내 보세요</div>'}</div>`;
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
  v.innerHTML=`${back()}<div class="title"><h1>업무일지</h1><p>누구나 한 줄씩. 매일 저녁 본사(장분도 · 박한울)로 모아서 메일이 가요.</p></div>
   ${date===today?`<div class="form"><textarea class="in" id="tx" style="min-height:90px" placeholder="예) 19시 단체 예약 12명, 와인 3병 추가 판매 · 냉장고 2번 온도 높음"></textarea>
   <div class="presets">${j.cats.map((c,i)=>`<button data-c="${esc(c)}" class="${i===0?'on':''}">${esc(c)}</button>`).join('')}<label class="u" style="margin-left:auto;align-self:center;font-size:13px">사진<input type="file" accept="image/*" capture="environment" hidden id="pf"></label></div><div id="pv"></div></div>
   <div class="btnrow"><button class="pill wine" id="sb">남기기</button></div>`:''}
   <div class="wk"><a href="#/log/${addD(date,-1)}${branch?'@'+encodeURIComponent(branch):''}">${I('back',18)}</a><b>${fmtDay(date)} · ${esc(j.scope)}</b>${date<today?`<a href="#/log/${addD(date,1)}${branch?'@'+encodeURIComponent(branch):''}">${I('next',18)}</a>`:'<span style="width:34px"></span>'}</div>
   ${j.branches?`<div class="presets" style="padding:0 var(--pad);margin-top:0">${['',...j.branches].map(b=>`<a href="#/log/${date}${b?'@'+encodeURIComponent(b):''}"><button class="${(branch||'')===b?'on':''}">${b||'전 지점'}</button></a>`).join('')}</div>`:''}
   <div class="list" style="margin-top:12px">${j.items.map(i=>`<div class="li" style="cursor:default;align-items:flex-start">${ava(i.name,'직원',36)}<div class="m"><div class="t1" style="font-size:14.5px">${esc(i.name)} <span style="color:var(--mute);font-weight:600;font-size:12.5px">${esc(i.branch)} · ${esc(String(i.at).slice(11,16))}</span> ${i.cat==='퇴근 한 줄'?'<i class="new">퇴근 한 줄</i>':`<span class="chip c-미확정">${esc(i.cat)}</span>`}</div><div style="font-size:15px;font-weight:500;margin-top:4px;line-height:1.55;white-space:pre-wrap">${esc(i.text)}</div>${i.photo?`<button class="u" style="font-size:12.5px;margin-top:6px" onclick="openFile('${i.photo}','업무일지 사진')">사진 보기</button>`:''}</div></div>`).join('')||'<div class="empty">아직 기록이 없어요</div>'}</div>`;
  if(date!==today)return;
  v.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{v.querySelectorAll('[data-c]').forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.c});
  $('#pf').onchange=async e=>{const f=e.target.files[0];if(!f)return;photo=await fileToDataUrl(f,1200,.72);$('#pv').innerHTML=`<img src="${photo}" style="width:120px;margin-top:10px">`};
  $('#sb').onclick=async e=>{const t=$('#tx').value.trim();if(!t)return toast('내용을 적어 주세요');busy(e.currentTarget,true);try{await api('log.add',{text:t,cat,photo});toast('남겼어요');ROUTES.log(v,arg)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
};
