/* TAP SHOP BAR People · v5 전자근로계약 (내 계약서 · 계약 관리 · 열람→재인증→손서명→PDF) */
(function(){
const PINE='#0F2A20';
const CST={'작성중':'#8a8f8c','발송':'#141B33','열람':'#156DFF','서명완료':PINE,'취소':'#B3261E'};
const cchip=s=>`<span style="display:inline-block;padding:3px 9px;font-size:11.5px;font-weight:800;color:#fff;background:${CST[s]||'#888'};white-space:nowrap">${esc(s)}</span>`;
const docCss=h=>String(h).replace(/<\/?(html|head|body)[^>]*>/gi,'').replace(/(^|[}\s])body\s*\{/g,'$1.doc{');
function mountDoc(el,html){const sr=el.attachShadow?el.attachShadow({mode:'open'}):el;sr.innerHTML=`<style>:host{display:block}.doc{padding:18px!important}</style><div class="doc">${docCss(html)}</div>`}
/* ── 메뉴 연결 ── */
const _more=ROUTES.more;
ROUTES.more=function(v,a){const r=_more(v,a);try{
  const li=(h,t,s)=>`<a class="li" href="${h}"><div class="m"><div class="t1">${t}</div><div class="t2">${s}</div></div><span class="ar">${I('next',18)}</span></a>`;
  const c=v.querySelector('a[href="#/cert"]');if(c)c.insertAdjacentHTML('afterend',li('#/contract','내 계약서','전자근로계약 · 서명 · PDF 보관'));
  const ad=v.querySelector('a[href="#/admin"]');if(ad&&['매니저','임원','이사','대표'].includes(S.data.me.role))ad.insertAdjacentHTML('beforebegin',li('#/contracts','계약 관리','전자근로계약 작성 · 발송 · 서명 현황'));
}catch(e){}return r};
/* ── 내 계약서 (목록 / 상세·서명) ── */
ROUTES.contract=async function(v,id){
  if(id) return contractDetail(v,id);
  v.innerHTML=`${back('#/more')}<div class="title"><h1>내 계약서.</h1><p>근로계약서를 앱에서 읽고 서명해요. 서명한 계약서는 PDF로 언제든 볼 수 있어요.</p></div>${loading()}`;
  const j=await api('contract.mine');
  v.innerHTML=`${back('#/more')}<div class="title"><h1>내 계약서.</h1><p>근로계약서를 앱에서 읽고 서명해요. 서명한 계약서는 PDF로 언제든 볼 수 있어요.</p></div>
   <div class="list">${j.items.length?j.items.map(c=>`<a class="li" href="#/contract/${c.id}"><div class="m"><div class="t1">근로계약서 · ${esc(c.branch)}</div><div class="t2">${esc(c.id)} · ${c.signedAt?'서명 '+esc(String(c.signedAt).slice(0,16)):'받은 날 '+esc(String(c.sentAt||c.createdAt).slice(0,10))}</div></div>${cchip(c.status==='발송'||c.status==='열람'?'서명 필요':c.status)}</a>`).join(''):`<div class="empty" style="padding:30px 0;color:var(--mute)">받은 계약서가 없어요</div>`}</div>`;
};
async function contractDetail(v,id){
  v.innerHTML=`${back('#/contract')}<div class="title"><h1>근로계약서</h1></div>${loading()}`;
  const ua=navigator.userAgent;
  const j=await api('contract.view',{id,ua});const c=j.c;
  const st={read:false,ag:j.agrees.map(()=>false),drawn:0,codeSent:false};
  v.innerHTML=`${back(S.data.me.email===c.email?'#/contract':'#/contracts')}
   <div class="title"><h1>근로계약서.</h1><p>${esc(c.name)} · ${esc(c.branch)} · ${esc(c.id)} ${cchip(c.status)}</p></div>
   <div style="padding:0 var(--pad)"><div style="height:3px;width:56px;background:${PINE};margin-bottom:10px"></div>
    <div id="docbox" style="max-height:62vh;overflow:auto;border:1.5px solid var(--ink);background:#fff;-webkit-overflow-scrolling:touch"></div>
    <div id="readst" class="note" style="padding:8px 0 0;font-size:13px">${j.canSign?'↓ 끝까지 스크롤해서 읽어 주세요':''}</div></div>
   <div id="signarea"></div><div id="auditarea"></div>`;
  const box=$('#docbox');mountDoc(box,j.html);
  const chk=()=>{if(!st.read&&box.scrollTop+box.clientHeight>=box.scrollHeight-24){st.read=true;$('#readst').textContent='✓ 끝까지 읽었어요';draw()}};
  box.addEventListener('scroll',chk);setTimeout(chk,400);
  if(c.status==='서명완료'){
    $('#signarea').innerHTML=`<div class="bn" style="background:${PINE};color:#fff;border-color:${PINE};margin-top:16px"><div><b>서명 완료 · ${esc(c.signedAt)}</b><span style="word-break:break-all">SHA-256 ${esc(c.pdfHash||'')}</span></div></div>
     <div class="btnrow"><button class="pill wine" id="pdfb">서명본 PDF 보기</button></div>`;
    $('#pdfb').onclick=()=>openFile(c.pdf,'근로계약서 (서명본)');
  }
  const draw=()=>{ if(!j.canSign)return;
    const sa=$('#signarea');
    sa.innerHTML=`<div class="sec"><h2>동의</h2></div><div class="list">${j.agrees.map((t,i)=>`<div class="li" data-ag="${i}" style="${st.read?'':'opacity:.4;pointer-events:none'}"><span class="ck ${st.ag[i]?'on':''}">${st.ag[i]?'✓':''}</span><div class="m"><div class="t1" style="font-size:14.5px">${esc(t)}</div></div></div>`).join('')}</div>
     <div class="sec"><h2>서명</h2><button class="lk" id="clr">다시 그리기</button></div>
     <div style="padding:0 var(--pad)"><canvas id="pad" style="width:100%;height:170px;border:1.5px solid var(--ink);background:#fff;touch-action:none;display:block"></canvas><div class="note" style="padding:6px 0 0;font-size:12.5px">손가락이나 마우스로 이름을 써 주세요</div></div>
     <div class="sec"><h2>본인 확인</h2></div>
     <div style="padding:0 var(--pad)"><p style="font-size:14px;color:var(--mute);margin-bottom:8px">${esc(j.maskedEmail)} 로 6자리 코드를 보내요</p>
      <div style="display:flex;gap:10px;align-items:center"><input class="in" id="code" inputmode="numeric" maxlength="6" placeholder="코드 6자리" style="flex:1"><button class="pill sm line" id="otp">${st.codeSent?'다시 받기':'코드 받기'}</button></div></div>
     <div class="btnrow"><button class="pill full" id="sgn" style="background:${PINE};color:#fff">서명하고 제출하기</button></div>
     <div class="note" style="padding:0 var(--pad) 24px;font-size:12px;line-height:1.6">제출하면 회사 직인과 내 서명, 서명 일시가 들어간 PDF가 만들어져 회사에 원본으로 보관되고, 사본이 메일과 앱으로 교부돼요. (전자문서법 4조 · 전자서명법 3조)</div>`;
    sa.querySelectorAll('[data-ag]').forEach(el=>el.onclick=()=>{const i=+el.dataset.ag;st.ag[i]=!st.ag[i];const sig=st.sigData;draw();if(sig)restore(sig)});
    setupPad();
    $('#otp').onclick=async e=>{busy(e.currentTarget,true);try{await api('contract.otp',{id,ua});st.codeSent=true;toast('코드를 보냈어요 (10분 유효)');busy(e.currentTarget,false);e.currentTarget.textContent='다시 받기'}catch(er){toast(er.message);busy(e.currentTarget,false)}};
    $('#sgn').onclick=async e=>{
      if(!st.read)return toast('계약서를 끝까지 읽어 주세요');if(st.ag.some(x=>!x))return toast('동의 항목을 모두 체크해 주세요');if(st.drawn<8)return toast('서명을 그려 주세요');
      const code=$('#code').value.trim();if(!/^\d{6}$/.test(code))return toast('인증 코드 6자리를 넣어 주세요');
      busy(e.currentTarget,true,'<div class="spin"></div>');toast('서명본 PDF 만드는 중이에요 (최대 30초)',5000);
      try{const r=await api('contract.sign',{id,code,agrees:st.ag,readToEnd:true,sig:$('#pad').toDataURL('image/png'),ua});toast('서명 완료! 사본을 보내 드렸어요');setTimeout(()=>ROUTES.contract(v,id),300)}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  };
  function setupPad(){const cv=$('#pad'),r=cv.getBoundingClientRect(),dpr=window.devicePixelRatio||1;cv.width=r.width*dpr;cv.height=r.height*dpr;const g=cv.getContext('2d');g.scale(dpr,dpr);g.lineWidth=2.6;g.lineCap='round';g.lineJoin='round';g.strokeStyle='#111';
    let on=false,last=null;const pt=e=>{const b=cv.getBoundingClientRect();return [e.clientX-b.left,e.clientY-b.top]};
    cv.onpointerdown=e=>{on=true;last=pt(e);cv.setPointerCapture(e.pointerId)};
    cv.onpointermove=e=>{if(!on)return;const p=pt(e);g.beginPath();g.moveTo(last[0],last[1]);g.lineTo(p[0],p[1]);g.stroke();last=p;st.drawn++};
    cv.onpointerup=cv.onpointercancel=()=>{on=false;st.sigData=cv.toDataURL('image/png')};
    $('#clr').onclick=()=>{g.clearRect(0,0,cv.width,cv.height);st.drawn=0;st.sigData=null};}
  function restore(d){const cv=$('#pad'),g=cv.getContext('2d'),im=new Image();im.onload=()=>{g.setTransform(1,0,0,1,0,0);g.drawImage(im,0,0)};im.src=d}
  draw();
  if(S.data.me.email!==c.email||c.status==='서명완료'){try{const a=await api('contract.audit',{id});$('#auditarea').innerHTML=`<div class="sec"><h2>감사 기록</h2></div><div class="list">${a.items.map(x=>`<div class="li" style="cursor:default;align-items:flex-start"><div class="m"><div class="t1" style="font-size:14px">${esc(x.ev)} <span style="color:var(--mute);font-weight:600">${esc(x.at)}</span></div><div class="t2" style="word-break:break-all">${esc(x.by)} ${esc(x.detail)}</div></div></div>`).join('')}</div><div style="height:30px"></div>`}catch(e){}}
}
/* ── 계약 관리 (매니저 이상) ── */
ROUTES.contracts=async function(v,arg){
  if(arg==='new')return contractNew(v);
  v.innerHTML=`${back('#/more')}<div class="title"><h1>계약 관리.</h1></div>${loading()}`;
  const j=await api('contract.mine');
  if(!j.admin){v.innerHTML=`${back('#/more')}<div class="title"><h1>권한이 없어요</h1></div>`;return}
  const cnt=s=>j.admin.filter(c=>c.status===s).length;
  v.innerHTML=`${back('#/more')}<div class="title"><h1>계약 관리.</h1><p>전자근로계약 작성 → 발송 → 열람 → 서명완료. 원본 PDF는 Drive "전자근로계약 (대외비)"에 읽기 전용으로 보관돼요 (종료 후 3년 이상).</p></div>
   <div class="kpis" style="padding:0 var(--pad)">${['작성중','발송','열람','서명완료','취소'].map(s=>`<div class="kpi"><b>${cnt(s)}</b><span>${s}</span></div>`).join('')}</div>
   <div class="btnrow"><a class="pill full" href="#/contracts/new" style="background:${PINE};color:#fff">+ 새 계약서 만들기</a></div>
   <div class="list">${j.admin.map(c=>`<div class="li" style="flex-wrap:wrap"><div class="m" onclick="location.hash='#/contract/${c.id}'"><div class="t1">${esc(c.name)} · ${esc(c.branch)}</div><div class="t2">${esc(c.id)} · ${esc(c.tpl)} · ${c.signedAt?'서명 '+esc(String(c.signedAt).slice(5,16)):c.viewedAt?'열람 '+esc(String(c.viewedAt).slice(5,16)):'작성 '+esc(String(c.createdAt).slice(5,16))}</div></div>${cchip(c.status)}
     <div style="width:100%;display:flex;gap:8px;margin-top:8px">${c.status==='작성중'?`<button class="pill sm line" onclick="cAct('contract.send','${c.id}',this)">발송</button>`:''}${c.pdf?`<button class="pill sm line" onclick="openFile('${c.pdf}','근로계약서 ${esc(c.name)}')">PDF</button>`:''}${c.status!=='서명완료'&&c.status!=='취소'?`<button class="pill sm line" onclick="cAct('contract.cancel','${c.id}',this)">취소</button>`:''}</div></div>`).join('')||'<div class="empty" style="padding:30px 0;color:var(--mute)">아직 계약서가 없어요</div>'}</div><div style="height:30px"></div>`;
};
window.cAct=async(a,id,b)=>{if(a==='contract.cancel'){const r=prompt('취소 사유');if(r===null)return;busy(b,true);try{await api(a,{id,reason:r});toast('취소했어요');route()}catch(e){toast(e.message);busy(b,false)}return}
  busy(b,true);try{await api(a,{id});toast('발송했어요');route()}catch(e){toast(e.message);busy(b,false)}};
async function contractNew(v){
  v.innerHTML=`${back('#/contracts')}<div class="title"><h1>새 계약서.</h1></div>${loading()}`;
  const [t,u]=await Promise.all([api('contract.templates'),api('admin.users')]);
  const D={생년월일:'',성별:'',입사일:ymd(new Date()),근무장소:'',업무:'',직위:'',월급:'',식대:'200000',고정연장시간:'',고정야간시간:'',근무시간:'11:00 ~ 23:00 (스케줄표에 따름)',휴게시간:'1일 2시간',근무일:'주 5일 (월 평균 8회 휴무, 스케줄표에 따름)',지급방식:'월급제 (월 단위로 임금을 정하고, 지급만 매주 나누어 함)',지급일:'매주 수요일에 직전 주(월요일~일요일) 근무분 지급. 수요일이 휴일이면 목요일 지급',계약일:ymd(new Date())};
  const users=u.users.filter(x=>x.status==='재직'||x.status==='초대전');
  v.innerHTML=`${back('#/contracts')}<div class="title"><h1>새 계약서.</h1><p>템플릿에 값을 채워 미리 보고 발송해요. 통상시급·기본급·수당은 월급과 고정시간으로 자동 계산돼요.</p></div>
   <div style="padding:0 var(--pad)"><label class="note">직원</label><select class="in" id="ce">${users.map(x=>`<option value="${esc(x.email)}">${esc(x.name)} · ${esc(x.branch)} · ${esc(x.email)}</option>`).join('')}</select>
   <label class="note" style="display:block;margin-top:14px">템플릿</label><select class="in" id="ct">${t.items.map(x=>`<option value="${esc(x.id)}">${esc(x.name)} ${esc(x.ver)}</option>`).join('')}</select>
   ${Object.keys(D).map(k=>`<label class="note" style="display:block;margin-top:14px">${k}${/시간$/.test(k)&&k.startsWith('고정')?' (월 시간)':''}</label><input class="in" data-f="${k}" value="${esc(D[k])}">`).join('')}
   <div id="calc" class="note" style="margin-top:14px"></div></div>
   <div class="btnrow"><button class="pill line" id="pv">미리보기</button><button class="pill line" id="sv">저장만</button><button class="pill" id="sd" style="background:${PINE};color:#fff">발송</button></div><div style="height:30px"></div>`;
  const fields=()=>{const f={};v.querySelectorAll('[data-f]').forEach(i=>f[i.dataset.f]=i.value.trim());const s=users.find(x=>x.email===$('#ce').value);if(s){f.이름=s.name;f.지점=s.branch}return f};
  $('#pv').onclick=async e=>{busy(e.currentTarget,true);try{const r=await api('contract.preview',{tpl:$('#ct').value,fields:fields()});busy(e.currentTarget,false);
    $('#calc').innerHTML=`통상시급 <b>${esc(r.calc.통상시급)}원</b> · 기본급 ${esc(r.calc.기본급)} · 연장 ${esc(r.calc.고정연장수당)} · 야간 ${esc(r.calc.고정야간수당)} ${r.calc.minWageOk?'':'<b style="color:#B3261E">· 최저시급 미달</b>'}`;
    openSheet(`<h2>미리보기</h2><div id="pvd" style="border:1.5px solid var(--ink);background:#fff;margin-top:10px"></div>`,m=>mountDoc(m.querySelector('#pvd'),r.html))}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  const save=send=>async e=>{if(send&&!confirm('직원에게 서명 요청을 보낼까요? (테스트모드면 hello@로만 가요)'))return;busy(e.currentTarget,true);try{const r=await api('contract.create',{email:$('#ce').value,tpl:$('#ct').value,fields:fields(),send,ua:navigator.userAgent});toast(send?'발송했어요':'저장했어요');location.hash='#/contract/'+r.id}catch(er){toast(er.message);busy(e.currentTarget,false)}};
  $('#sv').onclick=save(false);$('#sd').onclick=save(true);
}
/* 오류 시 빈 화면 대신 다시 시도 */
['contract','contracts'].forEach(k=>{const f=ROUTES[k];ROUTES[k]=async function(v,a){try{return await f(v,a)}catch(e){if(e.message==='AUTH')return;v.innerHTML=`${back('#/more')}<div class="title"><h1>잠시 문제가 생겼어요</h1><p>${esc(e.message)}</p></div><div class="btnrow"><button class="pill wine" onclick="route()">다시 시도</button></div>`}}});
})();
