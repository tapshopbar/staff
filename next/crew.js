/* 매장 이야기 (구 크루 게시판, 2026-11-12 미리보기): 매장 이야기·손님 한마디·응원. API crew.list / crew.create / crew.cheer / crew.delete, 사진은 file.get */
(function(){
const PH=new Map();
const ago=s=>{const t=new Date(String(s).replace(' ','T'));const m=Math.floor((Date.now()-t)/60000);return m<1?'방금':m<60?m+'분 전':m<1440?Math.floor(m/60)+'시간 전':fmtDay(String(s).slice(0,10))};
async function photo(img){const id=img.dataset.fid;try{if(!PH.has(id)){const j=await apiRaw('file.get',{id});PH.set(id,`data:${j.mime};base64,${j.b64}`)}img.src=PH.get(id);img.classList.add('on')}catch(e){img.alt='사진을 못 불러왔어요'}}
function card(p){return `<article class="crp" data-id="${esc(p.id)}">
  <div class="crh"><b>${esc(p.name)}</b><span>${p.tag?esc(p.tag)+' 이야기 · ':''}${ago(p.at)}</span></div>
  ${p.photos.length?`<div class="crph n${p.photos.length}">${p.photos.map(f=>`<img data-fid="${esc(f)}" alt="" loading="lazy">`).join('')}</div>`:''}
  <div class="crb">${esc(p.body)}</div>
  <div class="cra"><button type="button" class="crc ${p.cheered?'on':''}" data-cheer>♥ 응원해요 <em>${p.cheers||''}</em></button>${p.canDel?'<button type="button" class="crd" data-del>지우기</button>':''}</div></article>`}
ROUTES.crew=async function(v,arg){
  if(arg==='new')return crewNew(v);
  v.innerHTML=`${back('#/')}<div class="title"><h1>매장 이야기</h1><p>손님 한마디, 오늘의 좋은 순간, 고마운 동료. 남겨 두고 같이 봐요.</p></div>${loading()}`;
  let j;try{j=await api('crew.list')}catch(e){v.querySelector('.sk')?.parentElement.remove();v.insertAdjacentHTML('beforeend',`<div class="empty">${esc(e.message)}</div>`);return}
  v.innerHTML=`${back('#/')}<div class="title"><h1>매장 이야기</h1><p>손님 한마디, 오늘의 좋은 순간, 고마운 동료. 남겨 두고 같이 봐요.</p></div>
   <div class="btnrow"><a class="pill wine" href="#/crew/new">글 쓰기</a></div>
   <div class="crl">${j.items.map(card).join('')||'<div class="empty">아직 글이 없어요. 첫 이야기를 올려 주세요.</div>'}</div>`;
  v.querySelectorAll('img[data-fid]').forEach(photo);
  v.querySelectorAll('.crph img').forEach(img=>img.onclick=()=>img.src&&openSheet(`<img src="${img.src}" style="width:100%;border-radius:12px">`));
  v.querySelectorAll('[data-cheer]').forEach(b=>b.onclick=async()=>{const id=b.closest('.crp').dataset.id;b.disabled=true;
    const em=b.querySelector('em'),was=b.classList.contains('on'),n=Number(em.textContent)||0;b.classList.toggle('on',!was);em.textContent=(n+(was?-1:1))||''; // 먼저 화면에 반영, 서버 응답으로 맞춤
    try{const r=await apiRaw('crew.cheer',{id});b.classList.toggle('on',r.cheered);em.textContent=r.cheers||'';S.mem={};memSave()}catch(e){b.classList.toggle('on',was);em.textContent=n||'';toast(e.message)}b.disabled=false});
  v.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!confirm('이 글을 지울까요?'))return;const id=b.closest('.crp').dataset.id;
    try{await api('crew.delete',{id});toast('지웠어요');ROUTES.crew(v)}catch(e){toast(e.message)}});
};
function crewNew(v){
  const hq=S.data.x&&S.data.x.isHQ;let shots=[];
  v.innerHTML=`${back('#/crew','매장 이야기')}<div class="title"><h1>글 쓰기</h1><p>오늘 있었던 좋은 순간, 손님 한마디, 고마운 동료 이야기 무엇이든요.</p></div><div class="form">
   <label class="f">내용</label><textarea class="in" id="cb" style="min-height:180px" placeholder="예) 오늘 단골 손님이 직접 쓴 메모를 두고 가셨어요"></textarea>
   <label class="f">사진 <em>(3장까지)</em></label><label class="pill sm crpick"><input type="file" id="cp" accept="image/*" multiple hidden>사진 고르기</label><div class="crph n0" id="cpv"></div>
   ${hq?`<label class="f">어느 매장 이야기?</label><select class="in" id="ct"><option value="">전체</option>${BR.map(b=>`<option>${b}</option>`).join('')}</select>
   <label class="check"><input type="checkbox" id="ca" checked> <span>서포트센터 이름으로 올리기</span></label>`:''}</div>
   <div class="btnrow"><button class="pill wine" id="cs">올리기</button></div>`;
  $('#cp').onchange=async e=>{const fs=[...e.target.files].slice(0,3);if(e.target.files.length>3)toast('사진은 3장까지예요');
    shots=await Promise.all(fs.map(f=>fileToDataUrl(f,1280,.78)));$('#cpv').className='crph n'+shots.length;$('#cpv').innerHTML=shots.map(s=>`<img class="on" src="${s}">`).join('')};
  $('#cs').onclick=async e=>{const body=$('#cb').value.trim();if(body.length<2){toast('내용을 적어 주세요');return}busy(e.currentTarget,true);
    try{await api('crew.create',{body,photos:shots,tag:$('#ct')?$('#ct').value:'',asTeam:$('#ca')?$('#ca').checked:false});toast('올렸어요');location.hash='#/crew'}catch(er){toast(er.message);busy(e.currentTarget,false)}};
}
/* 홈: 전체 메뉴 타일만 (메인 카드는 공지·개인경비·근무표 3개 유지) */
const home=ROUTES[''];
ROUTES['']=function(v){const r=home.apply(this,arguments);try{v.querySelector('.grid .tile[href="#/kudos"]')?.insertAdjacentHTML('beforebegin',`<a class="tile w" href="#/crew"><b>매장<br>이야기</b><small>손님·동료 한마디</small></a>`)}catch(e){}return r};
})();
