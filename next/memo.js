/* 정산 메모 (2026-11-12 미리보기): 일정산 시트 '일별메모'에 앱에서 바로 기록. API memo.get / memo.add */
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
  let j;try{j=await api('memo.get',want?{branch:want}:{})}catch(e){$('#mm').innerHTML=`<div class="empty">${esc(e.message)}</div>`;return}
  const el=$('#mm');if(!el)return;
  const items=j.items||[];let n=1;
  el.innerHTML=`${j.test?'<div class="mtest"><b>테스트 중</b> · 실제 지점 시트가 아닌 테스트 사본에 기록돼요</div>':''}
   ${j.branches&&j.branches.length>1?`<div class="presets" style="padding:0 var(--pad)">${j.branches.map(b=>`<a href="#/memo/${encodeURIComponent(b)}"><button class="${b===j.branch?'on':''}">${esc(b)}</button></a>`).join('')}</div>`:''}
   <div class="blk form">
    <div class="mtop"><div><label class="f">일자</label><input class="in" type="date" id="md" value="${esc(j.today||bizDay())}" max="${ymd(new Date())}"></div>
     <div class="mwho"><label class="f">지점 · 작성자</label><div>${esc(j.branch)} · ${esc(j.name)}</div></div></div>
    <p class="note" style="margin-top:6px">새벽 6시 전에는 어제 날짜로 잡혀요. 한 번에 여러 줄 적을 수 있어요.</p>
    <div id="ml">${lineHTML(items,0)}</div>
    <button class="pill line full" id="madd" type="button" style="margin-top:10px">+ 줄 추가</button>
    <button class="pill wine full" id="msave" type="button" style="margin-top:10px">시트에 저장</button>
   </div>
   <div class="sec"><h2>내 최근 메모 <small style="font-size:13px;color:var(--mute);font-weight:600">3일</small></h2></div>
   <div class="blk" id="mmine" style="padding-top:0">${mineHTML(j.mine||[])}</div>`;
  const ml=$('#ml');
  const wire=()=>{ml.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{b.closest('.mline').remove();ml.querySelectorAll('.mline .mh b').forEach((x,i)=>x.textContent=i+1)});
    ml.querySelectorAll('select[data-k=item]').forEach(s=>s.onchange=()=>{const a=s.closest('.mline').querySelector('[data-k=amt]');a.placeholder=/재고조정/.test(s.value)?'금액 (비워도 돼요)':'금액'})};
  wire();
  $('#madd').onclick=()=>{const d=document.createElement('div');d.innerHTML=lineHTML(items,ml.children.length);ml.appendChild(d.firstElementChild);wire();ml.lastElementChild.querySelector('select').focus()};
  $('#msave').onclick=async e=>{
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
    try{const r=await api('memo.add',{branch:j.branch,lines});toast(`${r.n}줄 저장했어요${r.test?' (테스트 사본)':''}`);ROUTES.memo(v,arg)}
    catch(x){toast(x.message,4000);busy(e.currentTarget,false)}
  };
};
function mineHTML(list){
  if(!list.length)return '<div class="empty">최근 3일 동안 쓴 메모가 없어요</div>';
  let last='';return list.map(m=>{const h=m.date!==last?`<div class="mday">${fmtDay(m.date)}</div>`:'';last=m.date;
    return `${h}<div class="qa mrow"><div class="m">${esc(m.g||'')}${m.qty!==''&&m.qty!=null?' · '+esc(m.qty)+'개':''}</div><div class="q"><b>${esc(m.item)}</b>${m.amt!==''&&m.amt!=null?' · '+won(m.amt):''}</div><div class="mt">${esc(m.text)}</div></div>`}).join('')}
/* 홈 '매장 · 성장' 메뉴에 타일 추가 (업무일지 옆) */
const _home=ROUTES[''];
ROUTES['']=function(v,a){const r=_home(v,a);try{const lg=v.querySelector('a.tile[href="#/log"]');if(lg&&!v.querySelector('a.tile[href="#/memo"]'))lg.insertAdjacentHTML('afterend','<a class="tile y" href="#/memo"><b>정산<br>메모</b><small>할인 · 서비스 기록</small></a>')}catch(e){}return r};
})();
