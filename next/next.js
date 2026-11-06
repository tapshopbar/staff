/* People next (2026-11 개편 미리보기): 스플래시, 홈 개인경비 카드, 교육·질문함·정책·슬랙 */
const EXP_URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbwxfxCgJu7EyfX-9eO4AT2IJQtuavQFa5iyYJwiB4G1YOCbDFNKw6aWBZq1AxTdZwmO/exec';
const SLACK_APP='slack://open?team=T0A61G7CADT', SLACK_WEB='https://tapshopbar.slack.com';
function todayK(){const n=new Date();return `${n.getMonth()+1}월 ${n.getDate()}일 ${WD[n.getDay()]}요일`}
function splash(ms){return new Promise(res=>{const d=document.createElement('div');d.className='splash';
  d.innerHTML=`<img src="${LOGO}" alt="TAP SHOP BAR"><div class="crew"><i style="background:#F43131"></i><i style="background:#156DFF"></i><i style="background:#FFC100"></i><span style="margin-left:8px">CREW</span></div>`;
  document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add('on'));
  setTimeout(()=>{res();d.classList.remove('on');setTimeout(()=>d.remove(),380)},ms)})}
ROUTES.edu=function(v){v.innerHTML=`${back('#/')}<div class="title"><span class="new">준비중</span><h1 style="margin-top:10px">교육</h1><p>와인 기초, 서비스, 오픈·마감 교육을 여기서 볼 수 있게 준비하고 있어요.</p></div>
  <div class="blk"><p class="note">지금은 홈의 와인 퀴즈로 먼저 연습해 보세요.</p><a class="pill ink" href="#/quiz" style="margin-top:12px">와인 퀴즈 하기</a></div>`};
ROUTES.slack=function(v){v.innerHTML=`${back('#/')}<div class="title"><h1>슬랙</h1><p>업무 소통은 슬랙 TAP SHOP BAR에서 해요.</p></div>
  <div class="blk"><a class="pill ink full" href="${SLACK_APP}">슬랙 앱으로 열기</a><a class="pill line full" style="margin-top:10px" href="${SLACK_WEB}" target="_blank" rel="noopener">웹에서 열기</a>
  <p class="note" style="margin-top:14px">앱이 안 열리면 웹에서 열기를 눌러 주세요. 회사 계정(@tsb.wine)으로 들어가요.</p></div>`;
  setTimeout(()=>{location.href=SLACK_APP},150)};
ROUTES.policy=function(v){v.innerHTML=`${back('#/')}<div class="title"><h1>회사 정책</h1><p>탭샵바인이 꼭 알아둘 것만 모았어요.</p></div>
 <div class="blk pol">
  <h3>회사 계정 사용 원칙</h3><ul>
   <li>회사 계정(@tsb.wine)은 본인만 씁니다. 비밀번호는 누구와도 공유하지 않습니다.</li>
   <li>퇴사하는 날 회사 계정과 앱 접속이 닫힙니다. 필요한 파일은 퇴사 1주 전까지 공유 폴더로 옮겨 주세요.</li>
   <li>외부 협력사에는 회사 계정을 만들지 않습니다. 필요한 파일만 공유합니다.</li></ul>
  <h3>개인경비 회사 지출 기준</h3><ul>
   <li>11/1 결제분부터 개인경비 청구로 받아요. 10월까지 쓴 비용은 기존 개인지출 시트로 한울 매니저에게 내 주세요.</li>
   <li>개인카드로 결제해도 되는 곳: 쿠팡 · 네이버 · 소금집. 결제 전에 수쉐프방에 거래처 · 금액을 먼저 올려 주세요.</li>
   <li>한 번에 10만원 미만으로 나눠 결제해 주세요.</li>
   <li>마감 · 업무 이동 택시비는 1회 3만원까지예요 (카카오T 이용내역 캡처 첨부).</li>
   <li>CJ프레시웨이 · 커피 리브레 · 미트프렌즈 · 닭리닭매 · 에디션덴마크는 본사가 계좌이체로 결제해요. 개인카드로 결제하지 말고 본사에 발주 요청해 주세요.</li></ul>
  <h3>휴가</h3><ul><li>연차 · 휴가는 점장 승인 후 매니저 승인으로 확정돼요.</li></ul>
  <a class="pill line full" style="margin-top:24px" href="https://www.notion.so/34ccdbb0aa9280b99452f801728669c6" target="_blank" rel="noopener">Notion에서 전체 보기</a>
 </div>`};
const ASK_KINDS=['질문','제안','불편','칭찬'];
ROUTES.ask=async function(v){
  const hq=S.data&&S.data.x&&S.data.x.isHQ;
  v.innerHTML=`${back('#/')}<div class="title"><h1>질문 · 피드백</h1><p>궁금한 것, 제안, 불편한 점, 칭찬까지 본사에 바로 전해요.</p></div>
  <div class="blk"><div class="askk" id="kk">${ASK_KINDS.map((k,i)=>`<button data-k="${k}" class="${i?'':'on'}">${k}</button>`).join('')}</div>
   <textarea class="in" id="qb" rows="5" placeholder="내용을 적어 주세요"></textarea>
   <label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:14px;font-weight:600"><input type="checkbox" id="qa"> 익명으로 보내기</label>
   <p class="note" style="margin-top:6px">익명이면 답변하는 사람에게 이름이 보이지 않아요.</p>
   <button class="pill wine full" id="qs" style="margin-top:12px">보내기</button></div>
  <div class="sec"><h2>${hq?'전체 질문함':'내 질문'}</h2></div><div class="blk" id="ql" style="padding-top:0"><div class="sk" style="height:80px"></div></div>`;
  let kind='질문';v.querySelectorAll('#kk button').forEach(b=>b.onclick=()=>{kind=b.dataset.k;v.querySelectorAll('#kk button').forEach(x=>x.classList.toggle('on',x===b))});
  $('#qs').onclick=async e=>{const body=$('#qb').value.trim();if(body.length<2)return toast('내용을 적어 주세요');busy(e.currentTarget,true);
    try{await api('ask.create',{kind,body,anon:$('#qa').checked?'1':''});toast('보냈어요. 답변이 오면 알려 드릴게요');ROUTES.ask(v)}catch(x){toast(x.message);busy(e.currentTarget,false)}};
  try{const j=await api('ask.list');const el=$('#ql');if(!el)return;
    el.innerHTML=j.items.length?j.items.map(q=>`<div class="qa"><div class="m">${esc(q.kind)} · ${esc(String(q.at).slice(5,16))}${hq?' · '+esc(q.name)+(q.branch?' ('+esc(q.branch)+')':''):''} · ${esc(q.status)}</div><div class="q">${esc(q.body)}</div>
      ${q.answer?`<div class="a"><b>본사 답변</b><br>${esc(q.answer)}</div>`:''}
      ${hq&&!q.answer?`<textarea class="in" data-ans="${esc(q.id)}" rows="2" placeholder="답변 쓰기" style="margin-top:8px"></textarea><button class="pill sm ink" data-send="${esc(q.id)}" style="margin-top:6px">답변 보내기</button>`:''}
      ${q.mine&&q.status==='접수'?`<button class="pill sm line" data-del="${esc(q.id)}" style="margin-top:6px">취소</button>`:''}</div>`).join(''):'<div class="empty">아직 보낸 질문이 없어요</div>';
    el.querySelectorAll('[data-send]').forEach(b=>b.onclick=async()=>{const id=b.dataset.send;const t=el.querySelector(`[data-ans="${id}"]`).value.trim();if(!t)return toast('답변을 적어 주세요');busy(b,true);try{await api('ask.answer',{id,answer:t});toast('답변했어요');ROUTES.ask(v)}catch(x){toast(x.message);busy(b,false)}});
    el.querySelectorAll('[data-del]').forEach(b=>b.onclick=async()=>{if(!confirm('이 질문을 취소할까요?'))return;try{await api('ask.delete',{id:b.dataset.del});toast('취소했어요');ROUTES.ask(v)}catch(x){toast(x.message)}});
  }catch(e){const el=$('#ql');if(el)el.innerHTML=`<div class="empty">${esc(e.message)}</div>`}
};

/* 뒤로 버튼: 앱 안 이동 기록이 있으면 history.back, 없으면 홈 */
S.hist=[location.hash||'#/'];
window.addEventListener('hashchange',()=>{const h=location.hash||'#/';const H=S.hist;if(H.length>1&&H[H.length-2]===h)H.pop();else if(H[H.length-1]!==h)H.push(h)});
function goBack(){if(S.hist&&S.hist.length>1)history.back();else location.hash='#/'}
function askLogout(){if(confirm('로그아웃할까요? 다음에 다시 로그인해야 해요.')){S.hist=['#/'];if(location.hash&&location.hash!=='#/')history.replaceState(null,'',location.pathname);logout()}}
