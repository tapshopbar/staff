/* ═══ TSB ORDER · 서포트센터 '발주 관리' (CREW 안, 2026-11-18, TOM)
 * 주소: #/order-admin  (보드 · 거래처 단가 확인 링크 · 회신 확정 · 입금 · 출고 · 단가이력 · MD 설정 · 시트 반영 목록 · 입고 확인함)
 * 보이는 사람: People API 설정 '발주관리자' 목록(지금은 hello@만). 서버가 권한을 다시 확인하므로 화면만 열어도 데이터는 안 나와요.
 * 공개 저장소라 이 파일에 금액·토큰·시트 내용 없음. 금액은 API 응답으로만.
 * 되돌리기: index.html에서 order_admin.css / order_admin.js 두 줄 삭제.
 */
(function(){
if(typeof ROUTES==='undefined')return;
const call=(a,d)=>(window.OA_MOCK?window.OA_MOCK(a,d||{}):apiRaw(a,d||{}));
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const N=v=>{if(v==null||v==='')return null;const n=Number(String(v).replace(/[^\d.-]/g,''));return isNaN(n)?null:n};
const W=n=>n==null||isNaN(n)?'-':Math.round(n).toLocaleString('ko-KR');
const P=x=>x==null||isNaN(x)?'-':(x*100).toFixed(1)+'%';
const pad2=n=>String(n).padStart(2,'0');
const today=()=>{const d=new Date();return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate())};
const md=s=>{if(!s)return'';if(s instanceof Date||/T\d{2}:\d{2}.*(Z|[+-]\d{2}:?\d{2})$/.test(String(s))){const d=new Date(s);if(!isNaN(d))return (d.getMonth()+1)+'/'+d.getDate()+' '+pad2(d.getHours())+':'+pad2(d.getMinutes())}const m=String(s).match(/(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);return m?(+m[2])+'/'+(+m[3])+(m[4]?' '+m[4]+':'+m[5]:''):E(s)};
function isoWeek(d){const x=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=x.getUTCDay()||7;x.setUTCDate(x.getUTCDate()+4-day);const y=x.getUTCFullYear();const w=Math.ceil(((x-Date.UTC(y,0,1))/864e5+1)/7);return y+'-W'+pad2(w)}
function weekMon(wk){const m=String(wk).match(/(\d{4})-W(\d{2})/);if(!m)return new Date();const y=+m[1],w=+m[2];const j4=new Date(Date.UTC(y,0,4));const k=(j4.getUTCDay()||7)-1;const mon=new Date(Date.UTC(y,0,4-k+(w-1)*7));return new Date(mon.getUTCFullYear(),mon.getUTCMonth(),mon.getUTCDate())}
function weekShift(wk,n){const d=weekMon(wk);d.setDate(d.getDate()+7*n+3);return isoWeek(d)}
function weekLabel(wk){const d=weekMon(wk);const e=new Date(d);e.setDate(e.getDate()+6);return (d.getMonth()+1)+'/'+d.getDate()+' ~ '+(e.getMonth()+1)+'/'+e.getDate()}
async function copy(t,btn,ok){try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}if(btn){const o=btn.dataset.o||btn.textContent;btn.dataset.o=o;btn.textContent=ok||'복사했어요';setTimeout(()=>{btn.textContent=o},1600)}}
const tst=m=>{if(typeof toast==='function')toast(m);else alert(m)};

/* ── 권한: 서버 'me'의 x.orderAdmin 우선, 없으면 서포트센터 계정만 보드 1회 확인 후 기억 ── */
const AK=()=>'tsb_oadm_'+String((typeof S!=='undefined'&&S.token)||'').slice(0,12);
function known(){const x=(S.data&&S.data.x)||{};if(x.orderAdmin===true)return true;if(x.orderAdmin===false)return false;const c=localStorage.getItem(AK());return c==='1'?true:c==='0'?false:null}
let probing=null;
function probe(){const k=known();if(k!==null)return Promise.resolve(k);const x=(S.data&&S.data.x)||{};if(!x.isHQ)return Promise.resolve(false);
 if(!probing)probing=call('order.admin.board',{week:isoWeek(new Date())}).then(j=>{localStorage.setItem(AK(),'1');OA.boardCache=j;return true}).catch(e=>{if(/권한|FORBID|DENIED|관리자|NOT_ADMIN/i.test(e.message||''))localStorage.setItem(AK(),'0');probing=null;return false});
 return probing}
window.OA_isAdmin=()=>known()===true;
window.OA_probe=probe;

/* ── 상태 ── */
const RULE={margin:0.30,end:900,small:1000};
const OA=window.OA={week:isoWeek(new Date()),tab:'board',links:{},vpo:null,ed:{},cat:null,mdQ:'',mdOnly:true,prQ:'',rcSt:'대기',since:null,boardCache:null};
let V=null;
const ST_PO=['제출','보류','단가확인중','입금대기','출고','입고완료'];
const ST_CLS={'제출':'s1','보류':'s2','단가확인중':'s3','입금대기':'s4','출고':'s5','입고완료':'s6','회신':'s3b','링크생성':'s3','대기':'s3','확정':'s4','입금완료':'s5','취소':'s0','만료':'s0'};
const chipS=s=>`<span class="oa-st ${ST_CLS[s]||'s0'}">${E(s||'-')}</span>`;

/* ── 가격 규칙 (미리보기 v0.1 ③과 같음) ── */
const mg=(c,p)=>c&&p?(p-c*1.1)/p:null;
function suggest(c){if(!c)return null;const p=c*1.1/(1-RULE.margin);let b=Math.ceil((p-RULE.end)/1000)*1000+RULE.end;if(b<p)b+=1000;return b}
const target=p=>p?Math.floor(p*(1-RULE.margin)/1.1/100)*100:null;

/* ── 공통 머리 ── */
function head(sub){const tabs=[['board','보드'],['prices','단가이력'],['md','MD 설정'],['sheet','시트 반영 목록'],['receipts','입고 확인함']];
 return `<div class="oa-top"><span class="oa-dots"><i></i><i></i><i></i></span><span class="oa-lab">TSB ORDER · 서포트센터</span></div>
 <div class="oa-hd"><div><h1>발주 관리</h1><div class="oa-sub">${sub||'지점 발주를 거래처별로 묶어 단가 확인 링크를 보내고, 회신을 확정해요.'}</div></div>
 ${OA.tab==='board'?`<div class="oa-wk"><button type="button" onclick="OA.wk(-1)" aria-label="지난주">&lsaquo;</button><div><b>${weekLabel(OA.week)}</b><small>${E(OA.week)}</small></div><button type="button" onclick="OA.wk(1)" aria-label="다음 주">&rsaquo;</button></div>`:''}</div>
 <nav class="oa-tabs">${tabs.map(([k,t])=>`<a href="#/order-admin/${k==='board'?'':k}" class="${OA.tab===k||(k==='board'&&OA.tab==='vpo')?'on':''}">${t}</a>`).join('')}</nav>`}
function shell(inner,sub){V.innerHTML=`<div class="oa">${head(sub)}${inner}</div>`}
const loading=()=>`<div class="oa-card"><div class="oa-sk"></div><div class="oa-sk s"></div></div>`;
const errBox=(m,retry)=>`<div class="oa-card oa-err"><b>불러오지 못했어요</b><div class="oa-mut">${E(m)}</div>${retry?`<button class="oa-btn" onclick="${retry}">다시 시도</button>`:''}</div>`;

/* ═══ 보드 ═══ */
function normBoard(j){
 const pos=(j.pos||j.orders||[]).map(p=>({poId:p.poId||p.id,store:p.store||p.지점||'',cat:p.cat||p.분류||'',status:p.status||p.상태||'',lines:N(p.count??p.lineCount??p.items??(Array.isArray(p.lines)?p.lines.length:p.lines))||0,bottles:N(p.bottles??p.병수)||0,supply:N(p.totals?p.totals.supply:p.supply),holds:N(p.holds??p.보류수)||0,at:p.submittedAt||p.제출시각||''}));
 if(!pos.length&&j.byStatus){Object.entries(j.byStatus).forEach(([st,arr])=>(arr||[]).forEach(p=>pos.push({poId:p.poId,store:p.store,cat:p.cat,status:st,lines:N(p.lines)||0,bottles:N(p.bottles)||0,supply:N(p.totals&&p.totals.supply),holds:N(p.holds)||0,at:p.submittedAt||''})))}
 const sups=(j.suppliers||[]).map(s=>{
  let stores=[];
  if(Array.isArray(s.stores)&&s.stores.length&&typeof s.stores[0]==='string')stores=s.stores.map(x=>({store:x,bottles:null,supply:null,lines:null}));
  else if(Array.isArray(s.stores)&&s.stores.length&&typeof s.stores[0]==='object')stores=s.stores.map(x=>({store:x.store,bottles:N(x.bottles)||0,supply:N(x.supply)||0,lines:N(x.lines)||0}));
  else{const m={};const src=Array.isArray(s.lines)?s.lines:(s.pos||[]).filter(x=>typeof x==='object');src.forEach(x=>{const st=x.store||x.지점||'?';m[st]=m[st]||{store:st,bottles:0,supply:0,lines:0};const q=N(x.qty??x.bottles)||0;m[st].bottles+=q;m[st].supply+=N(x.supply)??((N(x.price??x.ourPrice)||0)*q);m[st].lines+=Array.isArray(s.lines)?1:(N(x.lines)||0)});stores=Object.values(m)}
  const poIds=(s.poIds||(s.pos||[]).map(p=>p.poId||p)).filter(Boolean);
  return {supplier:s.supplier||s.name,lines:Array.isArray(s.lines)?s.lines.length:(N(s.lines)||stores.reduce((a,x)=>a+x.lines,0)),bottles:N(s.bottles)??stores.reduce((a,x)=>a+(x.bottles||0),0),supply:N(s.supply)??stores.reduce((a,x)=>a+(x.supply||0),0),holds:N(s.holds)||0,stores,poIds,vpos:(s.vpos||[]),open:s.open!==false}});
 const vpos=(j.vpos||[]).map(v=>({vpoId:v.vpoId||v.id,supplier:v.supplier,status:v.status,expires:v.expires,createdAt:v.createdAt,repliedAt:v.repliedAt||v.회신시각,shipDate:v.shipDate,supply:N(v.supply),total:N(v.total??v.확정합계),paidAt:v.paidAt,shippedAt:v.shippedAt,poIds:v.poIds||[]}));
 sups.forEach(s=>{s.vpos=[]});
 return {pos,sups,vpos,week:j.week||OA.week}}
async function vBoard(){OA.tab='board';shell(loading());
 let j,vl;try{[j,vl]=await Promise.all([OA.boardCache&&OA.boardCache.__w===OA.week?OA.boardCache:call('order.admin.board',{week:OA.week}),call('order.admin.vpo.list',{}).catch(()=>({vpos:[]}))]);j.__w=OA.week;OA.boardCache=null}catch(e){shell(errBox(e.message,'OA.go()'));return}
 j.vpos=(vl&&vl.vpos)||[];const b=normBoard(j);OA.board=b;
 const cnt=Object.assign({},j.counts||{});if(!j.counts)b.pos.forEach(p=>{cnt[p.status]=(cnt[p.status]||0)+1});
 const others=Object.keys(cnt).filter(k=>!ST_PO.includes(k));
 const stores=[...new Set(['청계','상암','마곡','동대문'].concat(b.pos.map(p=>p.store)).filter(Boolean))];
 const strip=`<div class="oa-strip">${ST_PO.concat(others).map(s=>`<div class="${cnt[s]?'on':''}"><small>${E(s)}</small><b>${cnt[s]||0}</b></div>`).join('')}</div>`;
 const grid=`<div class="oa-card"><div class="oa-ch"><h3>지점 발주</h3><span class="oa-mut">${b.pos.length}건</span></div>
  <div class="oa-stores">${stores.map(st=>{const ps=b.pos.filter(p=>p.store===st);return `<div class="oa-srow"><b>${E(st)}</b><div class="oa-pos">${ps.length?ps.map(p=>`<span class="oa-po">${chipS(p.status)} ${E(p.cat)} ${p.lines}품목 · ${p.bottles}${p.cat==='와인'||!p.cat?'병':'개'}${p.holds?` · <em class="oa-w">보류 ${p.holds}</em>`:''}</span>`).join(''):'<span class="oa-mut">이번 주 발주 없음</span>'}</div></div>`}).join('')}</div></div>`;
 const cards=b.sups.length?b.sups.map(s=>supCard(s)).join(''):`<div class="oa-card"><b>이번 주 거래처별 묶음이 없어요</b><div class="oa-mut">지점 발주가 제출되면 여기 거래처별로 모여요.</div></div>`;
 const act=b.vpos.filter(v=>OA.showAll||!/취소|입고완료/.test(v.status)).sort((x,y)=>String(y.createdAt).localeCompare(String(x.createdAt)));
 const vsec=`<div class="oa-sec"><h2>거래처 발주 진행</h2><button class="oa-lk" onclick="OA.showAll=!OA.showAll;OA.go()">${OA.showAll?'진행 중만':'취소·완료도 보기'}</button></div><div class="oa-card">${act.length?`<div class="oa-vps">${act.map(v=>vRow(v)).join('')}</div>`:'<div class="oa-mut">진행 중인 거래처 발주가 없어요. 아래 거래처 묶음에서 단가 확인 링크를 만들어 주세요.</div>'}</div>`;
 shell(`${strip}${grid}${vsec}<div class="oa-sec"><h2>거래처별 묶음 <span class="oa-mut">아직 링크 안 만든 줄</span></h2><button class="oa-lk" onclick="OA.go()">새로고침</button></div><div class="oa-grid">${cards}</div>`);
}
function vRow(v){const lk=OA.links[v.vpoId];return `<a class="oa-vrow" href="#/order-admin/vpo/${encodeURIComponent(v.vpoId)}">${chipS(v.status)}<b>${E(v.supplier)}</b><span class="oa-mut">${E(v.vpoId)}</span><span class="oa-mut">${v.shippedAt?'출고 '+md(v.shippedAt):v.paidAt?'입금 '+md(v.paidAt):v.repliedAt?'회신 '+md(v.repliedAt):v.expires?'만료 '+md(v.expires):''}</span>${v.total?`<span class="oa-mut">${W(v.total)}원</span>`:''}${v.status==='회신'?'<em class="oa-new">회신 왔어요</em>':''}<span class="oa-ar">&rsaquo;</span></a>${lk&&v.status!=='회신'?linkBox(lk):''}`}
function supCard(s){const id=encodeURIComponent(s.supplier);
 const lk=Object.values(OA.links).filter(x=>x.supplier===s.supplier).pop();
 const vp=s.vpos.map(v=>`<a class="oa-vrow" href="#/order-admin/vpo/${encodeURIComponent(v.vpoId)}">${chipS(v.status)}<span>${E(v.vpoId)}</span><span class="oa-mut">${v.repliedAt?'회신 '+md(v.repliedAt):v.expires?'~'+md(v.expires):''}</span>${v.status==='회신'?'<em class="oa-new">회신 왔어요</em>':''}<span class="oa-ar">&rsaquo;</span></a>`).join('');
 const canMake=s.poIds.length>0&&s.open;
 return `<div class="oa-card oa-sup" id="sup_${id}"><div class="oa-ch"><h3>${E(s.supplier)}</h3><span class="oa-mut">${s.lines}품목 · ${s.bottles}병${s.holds?` · <em class="oa-w">보류 ${s.holds}</em>`:''}</span></div>
 <div class="oa-amt"><small>시트 기준 공급가</small><b>${W(s.supply)}</b><span>원</span></div>
 <table class="oa-mini"><tbody>${s.stores.map(x=>`<tr><td>${E(x.store)}</td><td>${x.lines?x.lines+'품목':''}</td><td>${x.bottles!=null?x.bottles+'병':''}</td><td>${x.supply!=null?W(x.supply):''}</td></tr>`).join('')}</tbody></table>
 ${vp?`<div class="oa-vps">${vp}</div>`:''}
 ${lk?linkBox(lk):''}
 ${canMake&&!lk?`<button class="oa-btn p" onclick="OA.make('${E(s.supplier).replace(/'/g,'&#39;')}',this)">단가 확인 링크 만들기</button>`:''}
 ${!canMake&&!vp?'<div class="oa-mut">묶을 발주가 없어요</div>':''}</div>`}
function kakao(lk){const exp=lk.expires?md(lk.expires).split(' ')[0]:'';
 return `[탭샵바] 발주 단가 확인 부탁드립니다\n${lk.lines?lk.lines+'품목 · ':''}${lk.bottles?lk.bottles+'병':''}${lk.stores?' ('+lk.stores+')':''}\n아래 링크에서 지금 출고 단가·수량만 확인하고 제출해 주세요.\n${lk.url}\n${exp?'링크는 '+exp+'까지 열려요.\n':''}탭샵바 서포트센터`}
function linkBox(lk){const k=lk.vpoId;return `<div class="oa-link"><div class="oa-ch"><b>링크가 만들어졌어요</b><span class="oa-mut">${E(k)}</span></div>
 <input class="oa-in mono" readonly value="${E(lk.url)}" onclick="this.select()">
 <div class="oa-btns"><button class="oa-btn p" onclick="OA.cp('url','${E(k)}',this)">링크 복사</button><button class="oa-btn" onclick="OA.cp('kakao','${E(k)}',this)">카톡 문구 복사</button></div>
 <pre class="oa-pre">${E(kakao(lk))}</pre>
 <div class="oa-mut">이 링크는 지금 한 번만 보여요. 잃어버리면 '새 링크 만들기'를 누르면 되고, 예전 링크는 바로 막혀요.</div></div>`}
OA.cp=(what,k,btn)=>{const lk=OA.links[k];if(!lk)return;copy(what==='url'?lk.url:kakao(lk),btn)};
OA.make=async(sup,btn)=>{const s=OA.board.sups.find(x=>x.supplier===sup);if(!s)return;btn.disabled=true;btn.textContent='만드는 중...';
 try{const j=await call('order.admin.vpo.create',{supplier:sup,poIds:s.poIds,week:OA.week});
  OA.links[j.vpoId]={vpoId:j.vpoId,url:j.url,expires:j.expires,supplier:sup,lines:typeof j.lines==='number'?j.lines:(Array.isArray(j.lines)?j.lines.length:s.lines),bottles:typeof j.bottles==='number'?j.bottles:s.bottles,stores:s.stores.map(x=>x.store).join('·')};
  s.vpos.push({vpoId:j.vpoId,supplier:sup,status:j.status||'링크생성',expires:j.expires});s.poIds=[];
  const el=document.getElementById('sup_'+encodeURIComponent(sup));if(el)el.outerHTML=supCard(s);
 }catch(e){tst(e.message);btn.disabled=false;btn.textContent='단가 확인 링크 만들기'}};
OA.wk=n=>{OA.week=weekShift(OA.week,n);vBoard()};

/* ═══ VPO 상세 (회신 확인 · 확정 · 입금 · 출고) ═══ */
function normVpo(j){const v=j.vpo||j;const reps=j.replies||v.replies||[];
 const lines=(j.lines||v.lines||[]).map(l=>{const r=reps.find(x=>x.lineId===l.lineId)||l.reply||null;
  return {lineId:l.lineId,key:l.key||l.품목키,row:l.row,name:l.name||l.품목명,store:l.store||l.지점||'',qty:N(l.qty??l.수량)||0,our:N(l.ourPrice??l.price??l.단가),sale:N(l.salePrice??l.sale??l.판매가),
   reply:r?{price:N(r.price??r.회신단가),qty:N(r.qty??r.회신수량),soldOut:!!(r.soldOut===true||r.soldOut==='Y'||r.soldOut==='TRUE'||r.품절===true||r.품절==='Y'),alt:r.alt||r.대체품||'',memo:r.memo||r.메모||''}:null,
   conf:N(l.confirmedPrice??l.확정단가),lst:l.status||'',confSale:N(l.confirmedSale),sugSale:N(l.suggestSale??l.suggestedSale),nego:N(l.negoTarget)}});
 const t=v.totals||j.totals||{};
 return {vpoId:v.vpoId||v.id,supplier:v.supplier,status:v.status||'',expires:v.expires,linkAt:v.linkAt||v.createdAt||v.링크생성시각,repliedAt:v.repliedAt||v.회신시각,shipDate:v.shipDate||v.출고예정일||'',memo:v.vendorMemo||v.memo||v.메모||'',
  confSupply:N(t.supply??v.confirmedSupply??v.확정공급가),confTotal:N(t.total??v.confirmedTotal??v.확정합계),confVat:N(t.vat),paidAt:v.paidAt||v.입금시각||'',paidAmt:N(v.paidAmount??v.입금액),shippedAt:v.shippedAt||v.출고시각||'',lines,settings:j.settings||{}}}
function stage(v){if(v.shippedAt||v.status==='출고')return 'shipped';if(v.paidAt||/입금완료|^입금$/.test(v.status))return 'paid';if(v.status==='취소')return 'cancelled';if(v.status==='확정')return 'confirmed';if(v.repliedAt||v.status==='회신'||v.lines.some(l=>l.reply))return 'replied';if(v.status==='만료')return 'expired';return 'waiting'}
async function vVpo(id){OA.tab='vpo';shell(loading());let j;try{j=await call('order.admin.vpo.get',{vpoId:id})}catch(e){shell(errBox(e.message,`OA.go()`));return}
 const v=normVpo(j);OA.vpo=v;if(v.settings.targetMargin)RULE.margin=+v.settings.targetMargin;if(v.settings.priceEnd)RULE.end=+v.settings.priceEnd;
 const stg=stage(v),done=/confirmed|paid|shipped/.test(stg);OA.ed={};v.lines.forEach(l=>{const r=l.reply;const price=l.conf??(r&&r.price!=null?r.price:l.our);const so=!!(r&&r.soldOut);
  OA.ed[l.lineId]={acc:done?(l.conf!=null&&!/빠짐|품절/.test(l.lst||'')):!so,price,qty:r&&r.qty!=null?r.qty:l.qty,sale:l.confSale??null}});
 drawVpo()}
function lineCalc(l){const e=OA.ed[l.lineId];const c=e.price;const m0=mg(l.our,l.sale),m1=mg(c,l.sale);const up=c!=null&&l.our!=null&&c>l.our;const was=m0!=null&&m0<RULE.margin;const need=up&&m1!=null&&m1<RULE.margin&&m0!=null&&!was;
 const sp=need?Math.max(suggest(c),l.sale||0):null;const ns=e.sale??(need?sp:l.sale);
 const r=l.reply;let cls='wait',lab='회신 대기';
 if(r){if(r.soldOut){cls=r.alt?'new':'bad';lab=r.alt?'대체품':'품절'}else{const d=(r.price??l.our)-l.our;cls=d===0?'same':d<0?'down':d<=RULE.small?'small':'up';lab=d===0?'같음':d<0?'인하':d<=RULE.small?'소폭 인상':'큰 인상'}}
 return {c,m0,m1,need,sp,was,ns,cls,lab,nego:need?target(l.sale):null}}
function vTotals(v){let sheet=0,sup=0,acc=0,wait=0,so=0;v.lines.forEach(l=>{const e=OA.ed[l.lineId];sheet+=(l.our||0)*l.qty;if(!l.reply)wait++;if(l.reply&&l.reply.soldOut)so++;if(e.acc){sup+=(e.price||0)*(e.qty||0);acc++}});const vat=Math.round(sup*0.1);return {sheet,sheetT:Math.round(sheet*1.1),sup,vat,total:sup+vat,acc,wait,so}}
function drawVpo(){const v=OA.vpo,st=stage(v),T=vTotals(v),locked=st==='confirmed'||st==='paid'||st==='shipped'||st==='cancelled';
 const rows=v.lines.map(l=>{const k=lineCalc(l),e=OA.ed[l.lineId],r=l.reply,d=r&&r.price!=null&&!r.soldOut?r.price-l.our:null,qd=r&&r.qty!=null&&r.qty!==l.qty;
  return `<tr class="${e.acc?'':'off'} ${d?'chg':''}"><td class="l" data-l="품목"><div class="oa-nm"><a href="#/order-admin/prices/${encodeURIComponent(l.key||l.name)}" title="단가이력">${E(l.name)}</a></div><div class="oa-mut">${E(l.store)} · 주문 ${l.qty}${l.row?' · 시트 '+l.row+'행':''}</div>${r&&r.alt?`<div class="oa-alt">대체품: ${E(r.alt)}</div>`:''}${r&&r.memo?`<div class="oa-mut">메모: ${E(r.memo)}</div>`:''}</td>
  <td data-l="시트 단가">${W(l.our)}</td>
  <td data-l="회신 단가">${r?(r.soldOut?'<span class="oa-mut">품절</span>':W(r.price)):'<span class="oa-mut">-</span>'}${d?`<div class="${d>0?'bad':'good'} oa-s">${d>0?'+':''}${W(d)} (${(d/l.our*100).toFixed(1)}%)</div>`:''}</td>
  <td data-l="확정 단가"><input class="oa-n" inputmode="numeric" value="${e.price??''}" ${locked?'disabled':''} onchange="OA.set('${l.lineId}','price',this.value)"></td>
  <td data-l="수량"><input class="oa-n q" inputmode="numeric" value="${e.qty??''}" ${locked?'disabled':''} onchange="OA.set('${l.lineId}','qty',this.value)">${qd?`<div class="oa-w oa-s">주문 ${l.qty}</div>`:''}</td>
  <td data-l="지금 판매가">${W(l.sale)}</td>
  <td data-l="마진" class="${k.m1!=null&&k.m1<RULE.margin?'bad':''}">${P(k.m1)}<div class="oa-mut oa-s">전 ${P(k.m0)}</div></td>
  <td data-l="새 판매가">${k.need?`<b>${W(k.sp)}</b><div class="oa-mut oa-s">${Math.round(RULE.margin*100)}% 맞춤</div>`:`<span class="oa-mut oa-s">${k.was?'원래도 '+Math.round(RULE.margin*100)+'% 미만':'그대로'}</span>`}<div><input class="oa-n" inputmode="numeric" value="${k.ns??''}" ${locked?'disabled':''} onchange="OA.set('${l.lineId}','sale',this.value)"></div></td>
  <td data-l="상태"><span class="oa-c c-${k.cls}">${k.lab}</span>${k.nego?`<div class="oa-w oa-s">네고 목표 ${W(k.nego)}</div>`:''}</td>
  <td data-l="수락"><label class="oa-tg"><input type="checkbox" ${e.acc?'checked':''} ${locked?'disabled':''} onchange="OA.set('${l.lineId}','acc',this.checked)"><span>${e.acc?'수락':'빼기'}</span></label></td></tr>`}).join('');
 const negos=v.lines.filter(l=>lineCalc(l).need&&OA.ed[l.lineId].acc);
 const permit=N(localStorage.getItem('tsb_oa_permit_'+OA.week));
 const amt=locked?(v.confTotal??T.total):T.total;
 const steps=[['waiting','링크 보냄'],['replied','회신'],['confirmed','확정'],['paid','입금'],['shipped','출고']];const si=st==='cancelled'?-1:st==='expired'?0:steps.findIndex(x=>x[0]===st);
 V.innerHTML=`<div class="oa">${head('거래처 회신을 보고 줄마다 수락·수정한 뒤 확정해요.')}
 <a class="oa-back" href="#/order-admin/">&lsaquo; 보드</a>
 <div class="oa-card"><div class="oa-ch"><h2>${E(v.supplier)} <span class="oa-mut">${E(v.vpoId)}</span></h2>${chipS(v.status)}</div>
  <div class="oa-flow">${steps.map((x,i)=>`<span class="${i<=si?'on':''}">${x[1]}</span>`).join('<em>&rsaquo;</em>')}</div>
  <div class="oa-meta"><span>링크 ${v.linkAt?md(v.linkAt):'-'}${v.expires?' · 만료 '+md(v.expires):''}</span><span>회신 ${v.repliedAt?md(v.repliedAt):'아직'}</span><span>출고 가능일 ${E(v.shipDate||'-')}</span></div>
  ${v.memo?`<div class="oa-memo">거래처 메모: ${E(v.memo)}</div>`:''}
  <div class="oa-btns">${st==='waiting'||st==='expired'?`<button class="oa-btn" onclick="OA.relink(this)">새 링크 만들기 (예전 링크 막힘)</button>`:''}${st!=='shipped'&&st!=='cancelled'&&st!=='paid'?`<button class="oa-btn sm" onclick="OA.cancel(this)">이 거래처 발주 취소</button>`:''}${st==='cancelled'?'<span class="oa-mut">취소된 거래처 발주예요. 줄은 보드의 거래처 묶음으로 돌아가요.</span>':''}</div>
  ${OA.links[v.vpoId]&&(st==='waiting'||st==='expired')?linkBox(OA.links[v.vpoId]):''}</div>
 <div class="oa-kpis"><div><small>시트 기준 (VAT 포함)</small><b>${W(T.sheetT)}</b></div><div><small>${locked?'확정 합계':'확정 예정'} (VAT 포함)</small><b>${W(amt)}</b></div><div><small>차이</small><b class="${amt-T.sheetT>0?'bad':'good'}">${amt-T.sheetT>0?'+':''}${W(amt-T.sheetT)}</b></div><div><small>회신 대기 · 품절</small><b>${T.wait} · ${T.so}</b></div></div>
 <div class="oa-card oa-tw"><div class="oa-ch"><h3>차이 · 마진 · 판매가</h3><span class="oa-mut">마진 = (판매가 − 매입가×1.1) ÷ 판매가 · 목표 ${Math.round(RULE.margin*100)}% · 끝자리 ${RULE.end}</span></div>
  <table class="oa-t"><thead><tr><th>품목</th><th>시트 단가</th><th>회신 단가</th><th>확정 단가</th><th>수량</th><th>지금 판매가</th><th>마진</th><th>새 판매가</th><th>상태</th><th>수락</th></tr></thead><tbody>${rows}</tbody></table>
  <div class="oa-mut" style="margin-top:8px">매입가가 올라서 ${Math.round(RULE.margin*100)}% 아래로 떨어진 줄만 판매가를 제안해요. 원래 ${Math.round(RULE.margin*100)}% 미만이던 줄은 표시만 해요. 단가는 모두 VAT 별도.</div></div>
 ${negos.length&&!locked?`<div class="oa-card"><div class="oa-ch"><h3>네고 요청 문구 ${negos.length}건</h3><button class="oa-btn sm" onclick="OA.cpNego(this)">복사</button></div><pre class="oa-pre" id="oa_nego">${E(negoText(negos))}</pre></div>`:''}
 <div class="oa-card"><div class="oa-ch"><h3>${locked?'확정 금액':'확정할 금액'}</h3><span class="oa-mut">수락 ${T.acc}/${v.lines.length}줄</span></div>
  <table class="oa-sum"><tr><td>공급가</td><td>${W(locked?(v.confSupply??T.sup):T.sup)}</td></tr><tr><td>부가세</td><td>${W(locked?(v.confVat??(v.confTotal!=null&&v.confSupply!=null?v.confTotal-v.confSupply:T.vat)):T.vat)}</td></tr><tr class="t"><td>합계 (입금할 금액)</td><td>${W(amt)}</td></tr></table>
  ${st==='paid'||st==='shipped'?`<div class="oa-permit"><span class="oa-mut">이번 주 남은 허가 잔액 (이 기기 메모): ${permit!=null?W(permit)+'원':'입력 안 함'}</span></div>`:`<div class="oa-permit"><label>이번 주 허가 잔액 <em>(회생 2026회합1185 · 서포트센터 입력)</em></label><input class="oa-in" inputmode="numeric" id="oa_permit" placeholder="예: 5,000,000" value="${permit!=null?W(permit):''}" oninput="OA.permit(this.value,${amt})"><div id="oa_pres">${permitMsg(permit,amt)}</div></div>`}
  <div class="oa-btns">
   ${st==='replied'||st==='waiting'||st==='expired'?`<button class="oa-btn p" id="oa_conf" ${st!=='replied'?'disabled':''} onclick="OA.confirm(this)">${st!=='replied'?'회신이 오면 확정할 수 있어요':'확정'}</button>`:''}
   ${st==='confirmed'?`<input class="oa-in sm" id="oa_paid" inputmode="numeric" value="${W(amt)}"><button class="oa-btn p" onclick="OA.paid(this)">입금 완료</button>`:''}
   ${st==='paid'?`<span class="oa-mut">입금 ${md(v.paidAt)}${v.paidAmt?' · '+W(v.paidAmt)+'원':''}</span><button class="oa-btn p" onclick="OA.shipped(this)">출고 표시</button>`:''}
   ${st==='shipped'?`<span class="oa-mut">입금 ${md(v.paidAt)} · 출고 ${md(v.shippedAt)}. 지점 입고 확인을 기다려요.</span>`:''}
  </div>
  ${st==='paid'||st==='confirmed'?'<div class="oa-mut">입금 뒤: 이체확인증 PDF · 클로브 [회생1185 허가지급] 메모 · 증빙대장 연결.</div>':''}</div></div>`}
function permitMsg(p,amt){if(p==null)return '<span class="oa-mut">허가 잔액을 넣으면 넘는지 바로 알려줘요.</span>';return amt<=p?`<span class="good">허가 잔액 안이에요 (남는 금액 ${W(p-amt)}원)</span>`:`<span class="bad">허가 잔액보다 ${W(amt-p)}원 많아요. 품목을 줄이거나 추가 허가 신청 (법무팀 확인 필요)</span>`}
function negoText(ls){return ls.map(l=>`${l.name}: 회신 ${W(OA.ed[l.lineId].price)}원 → ${W(lineCalc(l).nego)}원 가능할까요?`).join('\n')+'\n\n어려우면 100원이라도 맞춰 주실 수 있을지 부탁드립니다.'}
OA.cpNego=btn=>copy(document.getElementById('oa_nego').innerText,btn);
OA.permit=(val,amt)=>{const p=N(val);if(p==null)localStorage.removeItem('tsb_oa_permit_'+OA.week);else localStorage.setItem('tsb_oa_permit_'+OA.week,String(p));document.getElementById('oa_pres').innerHTML=permitMsg(p,amt);const b=document.getElementById('oa_conf');if(b&&b.dataset.two){delete b.dataset.two;b.textContent='확정'}};
OA.set=(id,f,val)=>{const e=OA.ed[id];if(!e)return;if(f==='acc')e.acc=!!val;else e[f]=N(val);const y=window.scrollY;drawVpo();window.scrollTo(0,y)};
OA.relink=async btn=>{const v=OA.vpo;btn.disabled=true;try{const j=await call('order.admin.vpo.relink',Object.assign({vpoId:v.vpoId},stage(v)==='expired'?{reopen:true}:{}));const ls=v.lines;OA.links[v.vpoId]={vpoId:v.vpoId,url:j.url,expires:j.expires,supplier:v.supplier,lines:ls.length,bottles:ls.reduce((a,l)=>a+l.qty,0),stores:[...new Set(ls.map(l=>l.store))].join('·')};v.expires=j.expires||v.expires;if(v.status==='만료')v.status='링크생성';drawVpo()}catch(e){tst(e.message);btn.disabled=false}};
OA.cancel=async btn=>{const v=OA.vpo;if(!btn.dataset.two){btn.dataset.two='1';btn.textContent='한 번 더 누르면 취소돼요';btn.classList.add('bad');return}btn.disabled=true;try{await call('order.admin.vpo.cancel',{vpoId:v.vpoId});delete OA.links[v.vpoId];tst('취소했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false}};
OA.confirm=async btn=>{const v=OA.vpo,T=vTotals(v);const p=N(localStorage.getItem('tsb_oa_permit_'+OA.week));
 if(!T.acc){tst('수락한 줄이 없어요');return}
 if(p!=null&&T.total>p&&!btn.dataset.two){btn.dataset.two='1';btn.textContent='허가 잔액 초과: 그래도 확정';btn.classList.add('bad');return}
 if(p==null&&!btn.dataset.two){btn.dataset.two='1';btn.textContent='허가 잔액 없이 확정 (한 번 더 누르기)';return}
 btn.disabled=true;btn.textContent='확정하는 중...';
 const accept=v.lines.filter(l=>OA.ed[l.lineId].acc).map(l=>{const e=OA.ed[l.lineId],k=lineCalc(l);const o={lineId:l.lineId,price:e.price,qty:e.qty};if(k.ns!=null&&k.ns!==l.sale)o.salePrice=k.ns;return o});
 const reject=v.lines.filter(l=>!OA.ed[l.lineId].acc).map(l=>l.lineId);
 try{await call('order.admin.vpo.confirm',{vpoId:v.vpoId,accept,reject});tst('확정했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false;btn.textContent='확정'}};
OA.paid=async btn=>{const v=OA.vpo;const amt=N(document.getElementById('oa_paid').value);if(!amt){tst('입금액을 넣어 주세요');return}
 const p=N(localStorage.getItem('tsb_oa_permit_'+OA.week));if(p!=null&&amt>p&&!btn.dataset.two){btn.dataset.two='1';btn.textContent='허가 잔액 초과: 그래도 표시';return}
 btn.disabled=true;try{await call('order.admin.vpo.paid',{vpoId:v.vpoId,amount:amt,at:new Date().toISOString()});if(p!=null)localStorage.setItem('tsb_oa_permit_'+OA.week,String(Math.max(0,p-amt)));tst('입금 완료로 표시했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false}};
OA.shipped=async btn=>{const v=OA.vpo;btn.disabled=true;try{await call('order.admin.vpo.shipped',{vpoId:v.vpoId,at:new Date().toISOString()});tst('출고로 표시했어요');vVpo(v.vpoId)}catch(e){tst(e.message);btn.disabled=false}};

/* ═══ 단가이력 ═══ */
async function vPrices(q){OA.tab='prices';if(q!=null)OA.prQ=q;shell(loading());
 const isKey=/^(R\d+|\d{8,14})$/.test(OA.prQ);let j;
 try{j=await call('order.admin.prices',Object.assign({limit:300},OA.prQ&&isKey?{key:OA.prQ}:{} ,OA.prQ&&OA.sups().includes(OA.prQ)?{supplier:OA.prQ}:{}))}catch(e){shell(errBox(e.message,'OA.go()'));return}
 const rows=(j.rows||j.prices||j.items||[]).map(r=>({at:r.at||r.시각,sup:r.supplier||r.거래처,key:r.key||r.품목키,name:r.name||r.품목명,old:N(r.oldPrice??r.prev??r.이전단가),nw:N(r.newPrice??r.price??r.새단가),src:r.source||r.출처,st:r.status||r.상태,by:r.by||r.확인자}));
 const qq=OA.prQ&&!isKey&&!OA.sups().includes(OA.prQ)?OA.prQ.replace(/\s/g,''):'';
 const g={};rows.filter(r=>!qq||String(r.name).replace(/\s/g,'').includes(qq)).forEach(r=>{const k=r.key||r.name;(g[k]=g[k]||{name:r.name,key:r.key,rows:[]}).rows.push(r)});
 const items=Object.values(g).map(x=>{x.rows.sort((a,b)=>String(b.at).localeCompare(String(a.at)));return x});
 shell(`<div class="oa-card"><div class="oa-row"><input class="oa-in" id="oa_pq" placeholder="품목명, 품목키 또는 거래처" value="${E(OA.prQ)}" onkeydown="if(event.key==='Enter')OA.pq()"><button class="oa-btn p" onclick="OA.pq()">찾기</button></div>
  <div class="oa-chips">${OA.sups().map(s=>`<button class="${OA.prQ===s?'on':''}" onclick="OA.pq('${E(s)}')">${E(s)}</button>`).join('')}${OA.prQ?'<button onclick="OA.pq(\'\')">전체</button>':''}</div></div>
  ${items.length?`<div class="oa-grid">${items.slice(0,80).map(x=>{const last=x.rows.find(r=>r.st==='수락')||x.rows[0];const first=x.rows[x.rows.length-1];const tr=last&&first&&first.old!=null?last.nw-first.old:null;
   return `<div class="oa-card"><div class="oa-ch"><h3>${E(x.name)}</h3><span class="oa-mut">${E(x.key||'')}</span></div>
   <div class="oa-amt sm"><small>최근 ${E(last.st||'')}</small><b>${W(last.nw)}</b><span>원</span>${tr?`<em class="${tr>0?'bad':'good'}">${tr>0?'+':''}${W(tr)}</em>`:''}</div>
   <table class="oa-mini h"><thead><tr><th>날짜</th><th>거래처</th><th>이전 → 새</th><th>출처</th><th>상태</th></tr></thead><tbody>${x.rows.slice(0,8).map(r=>`<tr><td>${md(r.at)}</td><td>${E(r.sup)}</td><td>${W(r.old)} → <b>${W(r.nw)}</b></td><td>${E(r.src)}</td><td>${E(r.st)}</td></tr>`).join('')}</tbody></table></div>`}).join('')}</div>`
  :`<div class="oa-card"><b>단가이력이 아직 없어요</b><div class="oa-mut">거래처 회신·확정·시트 단가 변경이 생기면 여기 쌓여요.</div></div>`}`,'품목별 단가가 언제, 누구 회신으로 바뀌었는지 봐요.')}
OA.sups=()=>((OA.board&&OA.board.sups)||[]).map(s=>s.supplier).concat(['진성','대정','서영','삼정']).filter((x,i,a)=>x&&a.indexOf(x)===i);
OA.pq=q=>{vPrices(q!=null?q:document.getElementById('oa_pq').value.trim())};

/* ═══ MD 설정 ═══ */
const MDS=['정상','쇼트','판매중지','단종','보류'];
async function vMd(){OA.tab='md';if(!OA.cat){shell(loading());try{const j=await call('order.catalog',{cat:'wine'});OA.cat=(j.items||[]).map(i=>({key:i.key,row:i.row,name:i.name,sup:i.supplier,imp:i.importer,md:Object.assign({status:'정상',forceSupplier:'',minUnit:'',memo:''},i.md||{})}))}catch(e){shell(errBox(e.message,'OA.go()'));return}}
 drawMd()}
function drawMd(){const q=OA.mdQ.replace(/\s/g,'');const all=OA.cat;
 const list=all.filter(i=>(!OA.mdOnly||q||i.md.status!=='정상'||i.md.forceSupplier||i.md.minUnit||i.md.memo)&&(!q||String(i.name).replace(/\s/g,'').includes(q)||String(i.key)===OA.mdQ||String(i.sup).includes(OA.mdQ)));
 const cnt={};all.forEach(i=>{cnt[i.md.status]=(cnt[i.md.status]||0)+1});
 shell(`<div class="oa-card"><div class="oa-row"><input class="oa-in" id="oa_mq" placeholder="와인 이름, 품목키, 거래처" value="${E(OA.mdQ)}" oninput="OA.mq(this.value)"><label class="oa-tg"><input type="checkbox" ${OA.mdOnly?'checked':''} onchange="OA.mdOnly=this.checked;OA.drawMdKeep()"><span>설정된 것만</span></label></div>
  <div class="oa-mut">${all.length}품목 · ${MDS.map(s=>`${s} ${cnt[s]||0}`).join(' · ')} · 쇼트·판매중지·단종이면 점장 발주가 '보류'로 들어와요.</div></div>
  <div class="oa-card oa-tw"><table class="oa-t md"><thead><tr><th>품목</th><th>발주 상태</th><th>강제 거래처</th><th>최소 단위</th><th>메모</th><th></th></tr></thead><tbody>
  ${list.slice(0,80).map(i=>`<tr id="md_${E(i.key)}"><td class="l" data-l="품목"><div class="oa-nm">${E(i.name)}</div><div class="oa-mut">${E(i.sup||'')}${i.imp?' · '+E(i.imp):''} · ${E(i.key)}</div></td>
   <td data-l="발주 상태"><select class="oa-in sm" data-f="status">${MDS.map(s=>`<option ${i.md.status===s?'selected':''}>${s}</option>`).join('')}</select></td>
   <td data-l="강제 거래처"><input class="oa-in sm" data-f="forceSupplier" value="${E(i.md.forceSupplier)}" placeholder="없음"></td>
   <td data-l="최소 단위"><input class="oa-in sm" data-f="minUnit" inputmode="numeric" value="${E(i.md.minUnit)}" placeholder="1"></td>
   <td data-l="메모"><input class="oa-in sm" data-f="memo" value="${E(i.md.memo)}"></td>
   <td><button class="oa-btn sm p" onclick="OA.mdSave('${E(i.key)}',this)">저장</button></td></tr>`).join('')||'<tr><td class="l oa-mut" colspan="6">해당하는 품목이 없어요</td></tr>'}</tbody></table>${list.length>80?`<div class="oa-mut">${list.length}개 중 80개만 보여요. 검색으로 좁혀 주세요.</div>`:''}</div>`,'품목별 발주 상태(쇼트·판매중지·단종), 강제 거래처, 최소 단위를 정해요.')}
let mqT=null;OA.mq=v=>{OA.mdQ=v;clearTimeout(mqT);mqT=setTimeout(drawMdKeep,250)};
function drawMdKeep(){const a=document.activeElement&&document.activeElement.id;const pos=a==='oa_mq'?document.activeElement.selectionStart:null;drawMd();if(a==='oa_mq'){const el=document.getElementById('oa_mq');el.focus();try{el.setSelectionRange(pos,pos)}catch(e){}}}
OA.drawMdKeep=drawMdKeep;
OA.mdSave=async(key,btn)=>{const tr=btn.closest('tr');const o={key};tr.querySelectorAll('[data-f]').forEach(el=>{o[el.dataset.f]=el.value.trim()});if(o.minUnit)o.minUnit=N(o.minUnit);
 btn.disabled=true;btn.textContent='저장 중';try{await call('order.admin.md.set',o);const it=OA.cat.find(i=>String(i.key)===String(key));if(it)Object.assign(it.md,o);btn.textContent='저장됨';setTimeout(()=>{btn.textContent='저장';btn.disabled=false},1400)}catch(e){tst(e.message);btn.textContent='저장';btn.disabled=false}};

/* ═══ 시트 반영 목록 ═══ */
async function vSheet(){OA.tab='sheet';if(!OA.since){const d=new Date();d.setDate(d.getDate()-7);OA.since=d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate())}shell(loading());
 let j;try{j=await call('order.admin.sheetUpdates',{since:OA.since})}catch(e){shell(errBox(e.message,'OA.go()'));return}
 const rows=(j.rows||j.items||j.updates||[]).map(r=>({row:r.row??r.행,name:r.name||r.품목명,A:r.A??r.date??today(),B:r.B??r.memo??'',K:N(r.K??r.cost??r.newCost),was:N(r.wasCost??r.oldCost??r.prevCost),Q:N(r.Q??r.price??r.newPrice),AA:N(r.AA??r.prevPrice)}));
 OA.tsv=['행\t품목명\tA 신규&변경등록일\tB 확인 사항\tK 최근 입고가\tQ 최근 판매가\tAA 직전 판매가'].concat(rows.map(r=>[r.row,r.name,r.A,r.B,r.K??'',r.Q??'',r.AA??''].join('\t'))).join('\n');
 shell(`<div class="oa-card"><div class="oa-row"><label class="oa-mut" style="white-space:nowrap">이 날짜부터</label><input class="oa-in sm" type="date" value="${E(OA.since)}" onchange="OA.since=this.value;OA.go()"><button class="oa-btn p" ${rows.length?'':'disabled'} onclick="OA.copy(OA.tsv,this)">표 복사 (TSV)</button></div>
  <div class="oa-mut">와인 정보 시트는 시스템이 직접 고치지 않아요. 확정된 단가·판매가 중 시트에 옮길 칸만 모았어요. 시트 담당자가 확인하고 직접 반영해요. 최초 입고가(Z)는 건드리지 않아요. 판매가가 바뀌면 POS 가격도 같이 바꿔야 해요.</div></div>
  <div class="oa-card oa-tw"><table class="oa-t"><thead><tr><th>행</th><th>품목</th><th>A 날짜</th><th>B 확인 사항</th><th>K 입고가</th><th>Q 판매가</th><th>AA 직전 판매가</th></tr></thead><tbody>
  ${rows.map(r=>`<tr><td class="l" data-l="행">${E(r.row)}</td><td class="l oa-nm" data-l="품목">${E(r.name)}</td><td data-l="A">${E(r.A)}</td><td class="l" data-l="B">${E(r.B)}</td><td data-l="K">${r.was!=null?W(r.was)+' → ':''}<b>${W(r.K)}</b></td><td data-l="Q"><b>${W(r.Q)}</b></td><td data-l="AA">${r.AA!=null?W(r.AA):'-'}</td></tr>`).join('')||'<tr><td class="l oa-mut" colspan="7">이 기간에 반영할 품목이 없어요</td></tr>'}</tbody></table></div>`,'확정된 단가를 와인 정보 시트에 옮길 목록이에요.')}
OA.copy=copy;

/* ═══ 입고 확인함 ═══ */
async function vReceipts(){OA.tab='receipts';shell(loading());let j;try{j=await call('order.admin.receipts',OA.rcSt?{status:OA.rcSt}:{})}catch(e){shell(errBox(e.message,'OA.go()'));return}
 const rows=(j.rows||j.receipts||j.items||[]).map(r=>({id:r.receiptId||r.id||r.입고ID,poId:r.poId||r.발주ID,vpoId:r.vpoId,store:r.store||r.지점,by:r.by||r.확인자,at:r.at||r.시각,result:r.result||r.결과,diffs:r.diffs||r.차이JSON,fileId:r.fileId||r.파일ID,fileUrl:r.fileUrl,kind:r.fileType||r.파일종류,ai:r.aiStatus||r.AI상태||'없음',aiRes:r.aiResult||r.AI결과JSON}));
 const parse=x=>{if(!x)return null;if(typeof x==='object')return x;try{return JSON.parse(x)}catch(e){return null}};
 shell(`<div class="oa-chips big">${['대기','확인필요',''].map(s=>`<button class="${OA.rcSt===s?'on':''}" onclick="OA.rcSt='${s}';OA.go()">${s||'전체'}</button>`).join('')}</div>
 ${rows.length?rows.map(r=>{const df=parse(r.diffs),ar=parse(r.aiRes);const tbl=ar&&(ar.rows||ar.lines||(Array.isArray(ar)?ar:null));
  return `<div class="oa-card"><div class="oa-ch"><h3>${E(r.store)} <span class="oa-mut">${E(r.poId||'')}</span></h3><span class="oa-c c-${r.ai==='완료'?'same':r.ai==='확인필요'?'bad':r.ai==='대기'?'small':'wait'}">AI ${E(r.ai)}</span></div>
  <div class="oa-meta"><span>${md(r.at)}</span><span>결과 <b class="${r.result==='차이'?'bad':''}">${E(r.result||'-')}</b></span>${r.kind?`<span>${E(r.kind)}</span>`:''}${r.fileId||r.fileUrl?`<a class="oa-lk" target="_blank" rel="noopener" href="${E(r.fileUrl||'https://drive.google.com/file/d/'+r.fileId+'/view')}">첨부 열기</a>`:''}</div>
  ${Array.isArray(df)&&df.length?`<table class="oa-mini h"><thead><tr><th>줄</th><th>받은 수량</th><th>메모</th></tr></thead><tbody>${df.map(d=>`<tr><td>${E(d.name||d.lineId)}</td><td>${E(d.qty)}</td><td>${E(d.memo)}</td></tr>`).join('')}</tbody></table>`:''}
  ${Array.isArray(tbl)&&tbl.length?`<details class="oa-det"><summary>읽은 표 ${tbl.length}줄</summary><table class="oa-mini h"><tbody>${tbl.slice(0,30).map(x=>`<tr>${(Array.isArray(x)?x:Object.values(x)).slice(0,6).map(c=>`<td>${E(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></details>`:ar&&ar.note?`<div class="oa-mut">${E(ar.note)}</div>`:''}
  ${r.ai==='확인필요'?`<div class="oa-btns"><button class="oa-btn sm" onclick="OA.rcDone('${E(r.id)}',this)">확인했어요</button></div>`:''}</div>`}).join(''):`<div class="oa-card"><b>${OA.rcSt?OA.rcSt+' 상태 입고가 없어요':'입고 기록이 없어요'}</b><div class="oa-mut">점장님이 입고 확인에서 사진·엑셀을 올리면 여기 모여요.</div></div>`}`,'지점 입고 확인(거래명세표 사진·엑셀)과 AI 읽기 상태를 봐요.')}
OA.rcDone=async(id,btn)=>{btn.disabled=true;try{await call('order.admin.receipt.set',{receiptId:id,aiStatus:'완료'});tst('확인 완료로 바꿨어요');OA.go()}catch(e){tst(e.message);btn.disabled=false}};

/* ═══ 라우터 ═══ */
OA.go=()=>{const a=OA._a||'';route_(a)};
function route_(a){const [sub,...r]=String(a||'').split('/');const rest=r.join('/');
 if(sub==='vpo'&&rest)return vVpo(rest);if(sub==='prices')return vPrices(rest||null);if(sub==='md')return vMd();if(sub==='sheet')return vSheet();if(sub==='receipts')return vReceipts();return vBoard()}
ROUTES['order-admin']=function(v,a){V=v;OA._a=a||'';document.body.classList.add('wide','oaw');
 const k=known();
 if(k===true)return route_(a);
 v.innerHTML=`<div class="oa">${loading()}</div>`;
 return probe().then(ok=>{if(location.hash.indexOf('#/order-admin')!==0)return;if(ok)route_(a);else v.innerHTML=`<div class="oa"><div class="oa-card"><b>발주 관리 권한이 없어요</b><div class="oa-mut">이 화면은 서포트센터 발주 담당만 볼 수 있어요.</div></div></div>`})};
window.addEventListener('hashchange',()=>{if(location.hash.indexOf('#/order-admin')!==0)document.body.classList.remove('oaw')});

/* ── 더보기에 '발주 관리' 줄 (관리자만) ── */
function addMore(v){const put=()=>{if(!v||v.querySelector('.oa-morelink'))return;const anchor=v.querySelector('.sec');if(!anchor)return;
  const box=document.createElement('div');box.className='oa-morelink';box.innerHTML=`<div class="sec"><h2>서포트센터</h2></div><div class="list"><a class="li" href="#/order-admin"><div class="m"><div class="t1">발주 관리 <i class="new">BETA</i></div><div class="t2">거래처 단가 확인 링크 · 회신 확정 · 입금 · 입고</div></div><span class="ar">${I('next',18)}</span></a></div>`;anchor.parentNode.insertBefore(box,anchor)};
 if(known()===true)put();else probe().then(ok=>{if(ok&&location.hash.indexOf('#/more')===0)put()})}
const _more=ROUTES.more;if(_more){ROUTES.more=function(v){const r=_more.apply(this,arguments);try{addMore(v)}catch(e){}return r}}
window.OA_link=()=>known()===true?'<a class="oa-entry" href="#/order-admin">발주 관리</a>':'';
if(location.hash.indexOf('#/order-admin')===0&&S.data)setTimeout(()=>route(),0);
})();
