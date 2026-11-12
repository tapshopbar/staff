/* 마감하기 (2026-11-12 미리보기): 한 화면 한 질문. 뒤에서 자동 정산(settle.preview), 직원은 현금·서비스·메모·한 줄만. API settle.get / settle.preview / settle.memo / settle.commit (항상 test) */
(function(){
const W=n=>(Number(n)||0).toLocaleString('ko-KR');
const STAGES=['포스 매출 불러오는 중','결제수단 맞추는 중','할인 · 충전 정리 중','지난주와 비교하는 중','정산 준비 완료'];
const CAT_Q={'잘된 것':'뭐가 잘됐나요?','아쉬운 것':'아쉬웠던 건 뭐였나요?','내일 해볼 것':'내일은 뭘 해 볼까요?'};
const pct=(a,b)=>b?Math.round((a-b)/b*100):null;
function keypad(id){return `<div class="stkp" data-kp="${id}">${['1','2','3','4','5','6','7','8','9','00','0','⌫'].map(k=>`<button type="button" data-key="${k}">${k}</button>`).join('')}</div>`}
ROUTES.settle=async function(v,arg){
  const want=arg?decodeURIComponent(arg):'';
  v.innerHTML=`<section class="stl"><div class="sttop">${back('#/')}<span class="stbadge">마감하기</span></div><div class="stc"><div class="sk" style="height:140px;opacity:.15"></div></div></section>`;
  let g;try{g=await apiRaw('settle.get',want?{branch:want}:{})}catch(e){v.querySelector('.stc').innerHTML=`<h1>잠시 후 다시 열어 주세요</h1><p class="sts">${esc(e.message)}</p>`;return}
  const me=(S.data&&S.data.me)||{};
  const f={cash:'',wd:'',hasWd:false,svc:'',memoQ:[],line:'',lineCat:'잘된 것',item:'',amt:'',why:''};
  let step=0,pv=null,pvErr='',stage=0,stT=null,dir='fwd';
  const P={get:g};
  const lastStep=6;
  const startPreview=()=>{if(pv||P.p)return;stage=0;
    stT=setInterval(()=>{if(stage<STAGES.length-2){stage++;bar()}},1400);
    const t0=Date.now();P.p=apiRaw('settle.preview',{branch:g.branch,date:g.date}).then(j=>new Promise(r=>setTimeout(()=>r(j),Math.max(0,5200-(Date.now()-t0))))).then(j=>{pv=j;stage=STAGES.length-1;clearInterval(stT);bar();if([1,2,3,5].includes(step))draw('same')})
      .catch(e=>{pvErr=e.message;clearInterval(stT);bar()});
  };
  const bar=()=>{const el=v.querySelector('.stauto');if(!el)return;el.innerHTML=autoHTML()};
  const autoHTML=()=>pvErr?`<span class="sterr">자동 정산을 못 불러왔어요 · 마감표 숫자로 진행할게요</span>`
    :`<i class="${pv?'ok':'run'}"></i><span>${pv?'자동 정산 준비 완료':esc(STAGES[stage])+'…'}</span><em>${pv?'✓':''}</em>${pv?'':'<div class="stline">'}<b style="width:${pv?100:Math.round((stage+1)/STAGES.length*100)}%"></b></div>`;
  const svcOf=()=>pv&&pv.service!=null?Number(pv.service):(Number(f.svc)||0);
  const netOf=()=>{const n=Number(pv&&pv.sales&&pv.sales.net)||0;return pv&&pv.netExcludesService?n-(Number(f.svc)||0):n};
  const memoNeed=()=>{const d=pv?Number(pv.discount||0):0,s=pv?svcOf():0;return {d,s,total:d+s}};
  const memoHave=()=>{const m=g.memo||{};const q=f.memoQ.reduce((a,l)=>a+(Number(l.amt)||0),0);return (Number(m.total)||0)+q};
  const draw=(d)=>{dir=d||dir;
    const prog=`<div class="fbp"><i style="width:${Math.min(step,lastStep-1)/(lastStep-1)*100}%"></i></div>`;
    let h='';
    if(g.done&&step===0){h=`<div class="stdone"><span class="fbcheck">✓</span><h1>오늘 마감은 끝났어요</h1><p class="sts">${esc(g.branch)} · ${fmtDay(g.date)} · ${esc(g.done.by)}님이 ${esc(String(g.done.at).slice(11,16))}에 확정했어요.</p>
      ${g.done.line?`<blockquote class="stq">“${esc(g.done.line)}”</blockquote>`:''}
      <div class="fbend"><a class="pill line" href="#/ask">수정이 필요해요 (서포트센터에 알리기)</a><a class="u" href="#/">홈으로</a></div></div>`}
    else if(step===0){h=`<span class="fbn">${esc(fmtDay(g.date))} · 마감</span><h1>정산을 만들기<br>시작할게요.</h1><p class="sts">자동 정산이 뒤에서 도는 동안<br>몇 가지만 알려 주세요. 5분이면 끝나요.</p>
      <div class="stbr">${(g.branches||[]).map(b=>`<button data-br="${esc(b)}" class="${b===g.branch?'on':''}">${esc(b)}${b===g.own?' <small>내 매장</small>':''}</button>`).join('')}</div>
      ${g.branch?'':'<p class="sts" style="margin-top:12px">마감할 지점을 먼저 골라 주세요.</p>'}
      <button class="pill y stgo" id="st0" ${g.branch?'':'disabled'}>마감하고 정산 만들기</button>
      ${g.test?'<p class="sttest">미리보기 · 테스트 사본에만 기록돼요</p>':''}`}
    else if(step===1){const ref=pv&&pv.pay?pv.pay.cash:null;h=`<span class="fbn">1 / 5 · 현금</span><h1>금고 현금,<br>세어 보셨어요?</h1>
      <div class="stnum ${f.hasWd&&S.kpTarget==='wd'?'':'on'}" data-t="cash"><small>금고 현금</small><b>${f.cash?W(f.cash):'0'}<i>원</i></b></div>
      <p class="stref">${ref!=null?`포스 현금 매출 ${W(ref)}원`:'포스 현금 매출 불러오는 중…'}</p>
      <button type="button" class="sttog ${f.hasWd?'on':''}" id="stwd">${f.hasWd?'✓ ':''}출금 있었어요</button>
      ${f.hasWd?`<div class="stnum sm ${S.kpTarget==='wd'?'on':''}" data-t="wd"><small>출금한 금액</small><b>${f.wd?W(f.wd):'0'}<i>원</i></b></div>`:''}
      ${keypad('k1')}<button class="pill y stgo" id="stn">다음</button>`}
    else if(step===2){const ref=pv?pv.service:null;h=`<span class="fbn">2 / 5 · 서비스</span><h1>오늘 서비스로<br>나간 금액은요?</h1><p class="sts">포스 마감표의 서비스 합계예요.</p>
      <div class="stnum on" data-t="svc"><small>서비스 합계</small><b>${f.svc?W(f.svc):'0'}<i>원</i></b></div>
      <p class="stref">${ref!=null?`자동 정산 ${W(ref)}원`:pv?'포스 마감표 숫자를 그대로 넣어 주세요':'자동 정산 불러오는 중…'}</p>
      ${keypad('k2')}<div class="strow"><button class="pill line stghost" id="stnone">없었어요</button><button class="pill y" id="stn">다음</button></div>`}
    else if(step===3){const n=memoNeed(),have=memoHave(),ok=pv&&have>=n.total;h=`<span class="fbn">3 / 5 · 정산 메모</span>
      ${!pv?`<h1>할인·서비스 내역을<br>확인하고 있어요</h1><p class="sts">잠깐만요. 자동 정산이 끝나면 바로 보여 드릴게요.</p>`
      :n.total===0?`<h1>오늘은 할인·서비스가<br>없었어요</h1><p class="sts">적을 정산 메모가 없어요.</p>`
      :`<h1>이 금액, 누구에게<br>왜 나갔나요?</h1><div class="stsum"><div><small>할인</small><b>${W(n.d)}</b></div><div><small>서비스</small><b>${W(n.s)}</b></div><div class="${ok?'ok':''}"><small>적은 메모</small><b>${W(have)}</b></div></div>
        ${ok?'<p class="stok">다 적었어요 ✓</p>':`<p class="sts">남은 금액 <b>${W(n.total-have)}원</b> · 자주 쓰는 항목을 눌러 한 줄씩 적어 주세요.</p>
        <div class="fba stchips">${(g.top||[]).map(t=>`<button data-it="${esc(t)}" class="${f.item===t?'on':''}">${esc(t)}</button>`).join('')}</div>
        ${f.item?`<div class="stmemo"><input class="fbt" id="sta" inputmode="numeric" placeholder="금액" value="${esc(f.amt)}"><input class="fbt" id="stw" placeholder="누구에게 · 왜 (예: 단골 김OO님 트러플 프라이즈)" value="${esc(f.why)}"><button class="pill line stghost" id="stadd">이 줄 추가</button></div>`:''}`}
        ${f.memoQ.length?`<div class="stq2">${f.memoQ.map((l,i)=>`<div><b>${esc(l.item)}</b> ${W(l.amt)}원 · ${esc(l.text)} <button data-rm="${i}">빼기</button></div>`).join('')}</div>`:''}`}
      <button class="pill y stgo" id="stn" ${pv?'':'disabled'}>${f.memoQ.length?'메모 저장하고 다음':'다음'}</button>`}
    else if(step===4){const q=lineQ();h=`<span class="fbn">4 / 5 · 오늘 한 줄</span><h1>${esc(q.h)}</h1><p class="sts">${esc(q.s)}</p>
      <div class="fba">${Object.keys(CAT_Q).map(c=>`<button data-lc="${c}" class="${f.lineCat===c?'on':''}">${c}</button>`).join('')}</div>
      <textarea id="stl" class="fbt" rows="3" placeholder="${esc(CAT_Q[f.lineCat])}" style="margin-top:14px">${esc(f.line)}</textarea>
      <div class="strow">${g.lineRequired?'':'<button class="pill line stghost" id="stskip">건너뛰기</button>'}<button class="pill y" id="stn">다음</button></div>
      ${g.lineRequired?`<p class="sttest">${esc(g.lineWhy||'점장님은 꼭 남겨 주세요')}</p>`:''}`}
    else if(step===5){h=`<span class="fbn">5 / 5 · 확인</span><h1>정산이<br>만들어졌어요.</h1>${!pv?'<p class="sts">자동 정산을 마무리하고 있어요…</p>':cardsHTML()}
      <button class="pill y stgo" id="stok" ${pv?'':'disabled'}>확정하기</button>`}
    else if(step===6){h=finishHTML()}
    v.innerHTML=`<section class="stl fb ${dir}">${step<6&&!(g.done&&step===0)?`<div class="sttop">${step?`<button class="fbb" id="stb">${I('back',18)} 이전</button>`:back('#/')}<span class="stbadge">${esc(g.branch||'지점 선택')} · 마감</span></div>${step?`<div class="stauto">${autoHTML()}</div>`:''}${prog}`:''}<div class="fbc">${h}</div></section>`;
    wire();
  };
  const lineQ=()=>{const c=pv&&pv.compare&&pv.compare.lastWeek,s=pv&&pv.sales;
    if(s&&c&&c.count){const p=pct(s.count,c.count);if(p!=null&&p!==0)return {h:`지난주 같은 요일보다 결제가 ${Math.abs(p)}% ${p>0?'많았어요':'적었어요'}.`,s:p>0?'뭐가 잘됐나요? 한 줄이면 충분해요.':'왜 그랬을까요? 내일 해 볼 것도 좋아요.'}}
    if(s&&s.count)return {h:`오늘 결제 ${W(s.count)}건이었어요.`,s:'오늘 매장은 어땠나요? 한 줄이면 충분해요.'};
    return {h:'오늘 매장은 어땠나요?',s:'한 줄이면 충분해요.'}};
  const cardsHTML=()=>{const s=Object.assign({},pv.sales||{},{net:netOf()}),p=pv.pay||{},cashIn=Number(f.cash)||0,wd=f.hasWd?(Number(f.wd)||0):0,diff=cashIn+wd-(Number(p.cash)||0);
    const c=(k,val,sub,auto=1)=>`<div class="stcard"><small>${k}${auto?'<i>자동</i>':''}</small><b>${val}</b>${sub?`<span>${sub}</span>`:''}</div>`;
    return `<div class="stcards">${c('실매출',W(s.net)+'원',pv.compare&&pv.compare.lastWeek&&pv.compare.lastWeek.net?`지난주 같은 요일 ${W(pv.compare.lastWeek.net)}원`:'')}
      ${c('결제 수',W(s.count)+'건',s.guests?`손님 ${W(s.guests)}명`:'')}${c('객단가',W(s.avg)+'원','')}
      <div class="stcard wide"><small>결제수단<i>자동</i></small><div class="stpay"><div><span>카드</span><b>${W(p.card)}</b></div><div><span>현금</span><b>${W(p.cash)}</b></div><div><span>간편</span><b>${W(p.easy)}</b></div>${p.prepaid?`<div><span>선불권</span><b>${W(p.prepaid)}</b></div>`:''}</div></div>
      ${c('할인 · 서비스',`${W(pv.discount)} · ${W(svcOf())}`,pv.service==null?'서비스는 마감표 입력값':(f.svc!==''&&Number(f.svc)!==Number(pv.service)?`마감표 서비스 ${W(f.svc)}원`:''))}
      ${c('선불권 충전',W(pv.prepaidCharge)+'원','')}
      ${c('금고 현금 (직접 입력)',W(cashIn)+'원',(wd?`출금 ${W(wd)}원 · `:'')+`포스 현금 매출 ${W(p.cash)}원`,0)}</div>
      ${pv.itemsReady?'':'<p class="sts" style="margin-top:12px">품목별 매출은 새벽에 채워져요.'+(pv.approx?' 지금 실매출은 결제 합계 기준이에요.':'')+'</p>'}${(pv.notes||[]).length?`<p class="sts">${pv.notes.map(esc).join('<br>')}</p>`:''}`};
  const finishHTML=()=>{const r=P.done||{},s=Object.assign({},(pv&&pv.sales)||{},{net:netOf()}),tm=(pv&&pv.topMenus)||[],cd=r.backend&&r.backend.cash,m=pv&&pv.month,c=pv&&pv.compare&&pv.compare.lastWeek,p=c&&c.net?pct(s.net,c.net):null;
    return `<div class="stfin"><div class="stconf">${Array.from({length:18},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div><span class="fbcheck">✓</span>
      <h1>오늘 하루도<br>정말 애쓰셨어요.</h1><p class="sts">${esc(g.branch)}의 하루를 지켜 줘서 고마워요${me.name?', '+esc(me.name)+'님':''}.</p>
      <div class="stfacts">${s.guests?`<div><b>${W(s.guests)}</b><small>오늘 손님</small></div>`:''}<div><b>${W(s.count)}</b><small>결제</small></div>${m&&m.net?`<div><b>${W(Math.round(m.net/10000))}<i>만</i></b><small>이번 달 누적</small></div>`:''}${p!=null?`<div><b>${p>0?'+':''}${p}<i>%</i></b><small>지난주 대비</small></div>`:''}</div>
      ${f.line?`<blockquote class="stq">“${esc(f.line)}”<cite>오늘 한 줄 · ${esc(me.name||'')}</cite></blockquote>`:''}
      ${s.count?`<p class="stpride">오늘 ${esc(g.branch)}에서 ${s.guests?W(s.guests)+'분이 ':''}${W(s.count)}번 결제하며 좋은 시간을 보냈어요.<br>그 하루를 만든 건 여러분이에요.</p>`:''}${tm.length?`<p class="stpride">오늘 가장 많이 나간 메뉴는 <b>${esc(tm[0].name)}</b>${tm[0].qty?` (${W(tm[0].qty)}개)`:''}.</p>`:''}${cd&&cd.diff?`<p class="sttest">금고 현금이 장부와 ${W(cd.diff)}원 달라요. 정산 메모 '현금 시재 차이'로 남겨 주세요.</p>`:''}<p class="sts">${r.mock?'미리보기라 숫자는 예시이고, 시트에는 기록하지 않았어요.':r.test?'미리보기라 정산을 테스트 사본에만 기록했어요.':'정산을 일정산 시트에 기록했어요.'}<br>내일도 좋은 하루 만들어요.</p>
      <div class="fbend"><a class="pill y" href="#/">홈으로</a></div></div>`};
  const kp=()=>{const k=v.querySelector('[data-kp]');if(!k)return;const tgt=()=>step===2?'svc':(f.hasWd&&S.kpTarget==='wd'?'wd':'cash');
    k.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>{const t=tgt(),key=b.dataset.key;let s=String(f[t]||'');if(key==='⌫')s=s.slice(0,-1);else if(s.length<9)s=(s+key).replace(/^0+/,'');f[t]=s;draw('same')});
    v.querySelectorAll('.stnum[data-t]').forEach(n=>n.onclick=()=>{S.kpTarget=n.dataset.t;draw('same')})};
  const wire=()=>{const go=n=>{step=n;draw('fwd')};kp();
    v.querySelectorAll('[data-br]').forEach(b=>b.onclick=()=>{location.hash='#/settle/'+encodeURIComponent(b.dataset.br)});
    if($('#st0'))$('#st0').onclick=()=>{startPreview();go(1)};
    if($('#stb'))$('#stb').onclick=()=>{step=Math.max(0,step-1);draw('back')};
    if($('#stwd'))$('#stwd').onclick=()=>{f.hasWd=!f.hasWd;S.kpTarget=f.hasWd?'wd':'cash';if(!f.hasWd)f.wd='';draw('same')};
    if($('#stnone'))$('#stnone').onclick=()=>{f.svc='0';go(3)};
    v.querySelectorAll('[data-it]').forEach(b=>b.onclick=()=>{f.item=b.dataset.it;draw('same');setTimeout(()=>{const a=$('#sta');a&&a.focus()},60)});
    const sa=$('#sta'),sw=$('#stw');if(sa)sa.oninput=()=>{f.amt=sa.value.replace(/[^\d]/g,'')};if(sw)sw.oninput=()=>{f.why=sw.value};
    if($('#stadd'))$('#stadd').onclick=()=>{const amt=(f.amt||'').replace(/[^\d]/g,'');if(!amt&&!/재고조정/.test(f.item))return toast('금액을 적어 주세요');if((f.why||'').trim().length<2)return toast('누구에게 · 왜 를 적어 주세요');
      f.memoQ.push({item:f.item,amt,text:f.why.trim()});f.item='';f.amt='';f.why='';draw('same')};
    v.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{f.memoQ.splice(+b.dataset.rm,1);draw('same')});
    v.querySelectorAll('[data-lc]').forEach(b=>b.onclick=()=>{f.lineCat=b.dataset.lc;const t=$('#stl');if(t){f.line=t.value;}draw('same')});
    const tl=$('#stl');if(tl){tl.oninput=()=>{f.line=tl.value}}
    if($('#stskip'))$('#stskip').onclick=()=>{f.line='';go(5)};
    const nx=$('#stn');if(nx)nx.onclick=async e=>{
      if(step===1){if(f.cash==='')return toast('금고 현금을 넣어 주세요 (없으면 0)');return go(2)}
      if(step===2){if(f.svc==='')return toast('서비스 합계를 넣거나 [없었어요]를 눌러 주세요');return go(3)}
      if(step===3){if(f.memoQ.length){busy(e.currentTarget,true,'저장 중…');try{const r=await apiRaw('settle.memo',{branch:g.branch,date:g.date,lines:f.memoQ.map(l=>({...l,date:g.date}))});g.memo=r.memo||g.memo;f.memoQ=[];toast(`정산 메모 ${r.n}줄 저장했어요`)}catch(x){busy(e.currentTarget,false);return toast(x.message,4000)}}
        const n=memoNeed();if(pv&&n.total>memoHave()&&!confirm(`아직 ${W(n.total-memoHave())}원이 메모에 없어요. 그래도 다음으로 갈까요?`))return draw('same');return go(4)}
      if(step===4){f.line=($('#stl').value||'').trim();if(g.lineRequired&&f.line.length<2)return toast('한 줄만 남겨 주세요');return go(5)}
    };
    if($('#stok'))$('#stok').onclick=async e=>{busy(e.currentTarget,true,'정산 확정 중…');
      try{P.done=await apiRaw('settle.commit',{branch:g.branch,date:g.date,cash:f.cash,withdraw:f.hasWd?f.wd:'',service:f.svc,line:f.line,lineCat:f.line?f.lineCat:'',previewId:pv&&pv.id||''});go(6)}
      catch(x){toast(x.message,4000);busy(e.currentTarget,false)}};
  };
  draw('fwd');
};
/* 진입: 마감 체크 화면 맨 아래 버튼 */
const _chk=ROUTES.check;
if(_chk)ROUTES.check=async function(v,kind){const r=await _chk(v,kind);const add=()=>{if(kind!=='마감'||!decodeURIComponent(location.hash).startsWith('#/check/마감')||v.querySelector('#stgo2'))return;const b=document.createElement('div');b.className='btnrow';b.innerHTML='<a class="pill y" id="stgo2" href="#/settle">마감하고 정산 만들기</a>';const nt=v.querySelector('.note:last-of-type');(nt||v).insertAdjacentElement(nt?'afterend':'beforeend',b)};
  add();const ob=new MutationObserver(()=>{if(!location.hash.startsWith('#/check')){ob.disconnect();return}add()});ob.observe(v,{childList:true});return r};
})();
