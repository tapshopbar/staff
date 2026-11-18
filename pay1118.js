/* ═══ pay1118.js v2 · 11/18 정산 입금 예정 (박한울 매니저 + 서포트센터만) ═══
   홈 출근 카드 아래 카드 1개에 오늘 정산 금액을 바로 보여 줌. 다른 직원 화면에는 아무것도 안 생김.
   숫자는 People API sdpay.get (서버가 설정 '정산입금열람'으로 한 번 더 막음). 이 공개 파일에는 금액 없음.
   '자세히'는 정산 화면 웹앱(날짜 넘기기·지점별·지난 입금)
   되돌리기: index.html 에서 pay1118.js 한 줄 지우기 */
(function(){
  const PAY_WHO=['hw.park@tsb.wine','hello@tsb.wine'];
  const URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbxsTUtTa3FWvcvSgycAwxEFKvpWJzZ-ne9Re3nE4WOB0qU6ywMw6xeJEx4DBrcRxU76/exec';
  const LS='tsbp_pay1118';
  const css=`#payTile{display:block;margin:10px 20px 0;padding:16px;background:#fff;border:1.5px solid #E6E2DF;border-radius:16px;color:#191F28}
#payTile .ph{display:flex;align-items:center;gap:10px}#payTile .ic{width:34px;height:34px;border-radius:11px;background:#E8F1FF;color:#156DFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11.5px;flex:none}
#payTile .tt{flex:1;min-width:0}#payTile .tt b{display:block;font-size:15px}#payTile .tt small{display:block;color:#6B7684;font-size:12px;margin-top:1px}
#payTile .more{color:#156DFF;font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap}
#payTile .tot{display:flex;align-items:baseline;gap:8px;margin:12px 0 2px;flex-wrap:wrap}#payTile .tot strong{font-size:26px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums}#payTile .tot em{font-style:normal;font-size:14px;font-weight:600}
#payTile .chip{font-size:11.5px;font-weight:700;padding:3px 8px;border-radius:999px;background:#E8F1FF;color:#156DFF}#payTile .chip.no{background:#FFF4E5;color:#C76A00}
#payTile .kg{display:grid;grid-template-columns:1fr 1fr;gap:6px 14px;margin-top:10px}#payTile .kg div{display:flex;justify-content:space-between;gap:6px;font-size:13.5px}#payTile .kg span{color:#6B7684;white-space:nowrap}#payTile .kg i{font-style:normal;font-weight:700;font-variant-numeric:tabular-nums}
#payTile .nx{display:flex;gap:8px;margin-top:12px}#payTile .nx div{flex:1;background:#F9FAFB;border-radius:12px;padding:9px 11px}#payTile .nx small{display:block;color:#8B95A1;font-size:11.5px}#payTile .nx b{font-size:14.5px;font-variant-numeric:tabular-nums}
#payTile .ft{color:#B0B8C1;font-size:11.5px;margin-top:10px}`;
  const f=n=>Number(n||0).toLocaleString('ko-KR');
  const md=s=>{const p=String(s).split('-');return Number(p[1])+'/'+Number(p[2])};
  const dw=s=>'일월화수목금토'.charAt(new Date(s+'T12:00:00+09:00').getDay());
  let st=null,busy=false,lastT=0;
  const body=j=>{
    if(!j||!j.ok)return `<div class="ft">${j&&j.message?j.message:'불러오는 중…'}</div>`;
    const t=j.today,k=t.kinds||{};
    let h='';
    if(t.status==='none')h+=`<div class="tot"><em style="color:#6B7684">오늘 들어올 정산 메일이 없어요</em></div>`;
    else h+=`<div class="tot"><strong>${f(t.total)}<em>원</em></strong><span class="chip${t.status==='ok'?'':' no'}">${t.status==='ok'?'4종 도착':(t.miss||[]).join('·')+' 메일 아직'}</span></div>
<div class="kg"><div><span>국내 카드</span><i>${f(k['국내'])}</i></div><div><span>해외 카드</span><i>${f(k['해외'])}</i></div><div><span>QR 오더</span><i>${f(k['QR'])}</i></div><div><span>앱</span><i>${f(k['APP'])}</i></div></div>`;
    if(j.next&&j.next.length)h+=`<div class="nx">${j.next.map(n=>`<div><small>${md(n.date)} (${dw(n.date)})</small><b>${f(n.total)}</b></div>`).join('')}</div>`;
    h+=`<div class="ft">스마트데이터 메일 기준${j.updated?' · 갱신 '+j.updated:''}</div>`;
    return h};
  const paint=j=>{const el=document.getElementById('payBody');if(el)el.innerHTML=body(j)};
  const load=()=>{if(busy||Date.now()-lastT<60000||typeof apiRaw!=='function'){if(lastT)paint(JSON.parse(localStorage.getItem(LS)||'null'));return}busy=true;lastT=Date.now();
    apiRaw('sdpay.get',{}).then(j=>{busy=false;if(j&&j.ok)try{localStorage.setItem(LS,JSON.stringify(j))}catch(e){}paint(j)}).catch(()=>{busy=false})};
  const add=()=>{try{
    if(typeof routeKey!=='function'||routeKey()!==''||typeof S==='undefined'||!S.data||!S.data.me)return;
    const em=String(S.data.me.email||localStorage.getItem('tsbp_email')||'').toLowerCase();
    if(PAY_WHO.indexOf(em)<0||document.getElementById('payTile'))return;
    const anchor=document.getElementById('cashTile')||document.getElementById('lvstrip')||document.getElementById('punchBlk');if(!anchor)return;
    if(!st){st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}
    const d=document.createElement('div');d.id='payTile';
    const today=new Date(Date.now()+9*3600e3).toISOString().slice(0,10);
    d.innerHTML=`<div class="ph"><span class="ic">입금</span><span class="tt"><b>정산 입금 예정</b><small>오늘 ${md(today)} (${dw(today)}) · 패스파인더22 IBK</small></span><a class="more" href="${URL}" target="_blank" rel="noopener">자세히 ›</a></div><div id="payBody"></div>`;
    anchor.insertAdjacentElement('afterend',d);
    let c=null;try{c=JSON.parse(localStorage.getItem(LS)||'null')}catch(e){}
    paint(c&&c.today&&c.today.date===today?c:null);
    load();
  }catch(e){}};
  new MutationObserver(add).observe(document.body,{childList:true,subtree:true});add();
})();
