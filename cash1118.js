/* ═══ cash1118.js · 11/18 동대문 현금 계산·장부 바로가기 (이은경 팀장님 + 서포트센터만) ═══
   홈 출근 카드 아래 카드 1개. 다른 직원 화면에는 아무것도 안 생김.
   대상 = CASH_WHO (앱 자체도 장부 시트 설정 '허용이메일'로 한 번 더 막음)
   되돌리기: index.html 에서 cash1118.js 한 줄 지우기 */
(function(){
  const CASH_WHO=['ek.lee@tsb.wine','hello@tsb.wine'];
  const URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbydQ_IQyu_1GYpFYZrvTDCQrx5R2TWB0g1qi7uLyl16nDBOq5XdpaTK2QU3_VubZS8N/exec';
  const css=`#cashTile{display:flex;align-items:center;gap:12px;margin:10px 20px 0;padding:14px 16px;background:#fff;border:1.5px solid #E6E2DF;border-radius:16px;text-decoration:none;color:#191F28}
#cashTile .ic{width:38px;height:38px;border-radius:12px;background:#E8F1FF;color:#156DFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:17px;flex:none}
#cashTile .tx{flex:1;min-width:0}#cashTile b{display:block;font-size:15px}#cashTile small{display:block;color:#6B7684;font-size:12.5px;margin-top:2px}
#cashTile .ar{color:#B0B8C1;font-size:20px}`;
  let st=null;
  const add=()=>{try{
    if(typeof routeKey!=='function'||routeKey()!==''||typeof S==='undefined'||!S.data||!S.data.me)return;
    const em=String(S.data.me.email||localStorage.getItem('tsbp_email')||'').toLowerCase();
    if(CASH_WHO.indexOf(em)<0||document.getElementById('cashTile'))return;
    const anchor=document.getElementById('lvstrip')||document.getElementById('punchBlk');if(!anchor)return;
    if(!st){st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}
    const a=document.createElement('a');a.id='cashTile';a.href=URL;a.target='_blank';a.rel='noopener';
    a.innerHTML='<span class="ic">₩</span><span class="tx"><b>동대문 현금 계산 · 장부</b><small>현금 손님 찍기 · 외화 · 입금 기록</small></span><span class="ar">›</span>';
    anchor.insertAdjacentElement('afterend',a);
  }catch(e){}};
  new MutationObserver(add).observe(document.body,{childList:true,subtree:true});add();
})();
