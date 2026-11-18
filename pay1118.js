/* ═══ pay1118.js · 11/18 정산 입금 예정 바로가기 (박한울 매니저 + 서포트센터만) ═══
   홈 출근 카드 아래 카드 1개. 다른 직원 화면에는 아무것도 안 생김.
   대상 = PAY_WHO (화면 웹앱도 스크립트 속성 ALLOW로 한 번 더 막음, 접근 = tsb.wine 도메인)
   숫자는 이 파일(공개 저장소)에 없음. 웹앱이 hello@ 스마트데이터 메일 → 시트 '탭샵바_정산입금예정_스마트데이터(자동)'를 읽어 보여 줌
   되돌리기: index.html 에서 pay1118.js 한 줄 지우기 */
(function(){
  const PAY_WHO=['hw.park@tsb.wine','hello@tsb.wine'];
  const URL='https://script.google.com/a/macros/tsb.wine/s/AKfycbxsTUtTa3FWvcvSgycAwxEFKvpWJzZ-ne9Re3nE4WOB0qU6ywMw6xeJEx4DBrcRxU76/exec';
  const css=`#payTile{display:flex;align-items:center;gap:12px;margin:10px 20px 0;padding:14px 16px;background:#fff;border:1.5px solid #E6E2DF;border-radius:16px;text-decoration:none;color:#191F28}
#payTile .ic{width:38px;height:38px;border-radius:12px;background:#E8F1FF;color:#156DFF;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12.5px;flex:none}
#payTile .tx{flex:1;min-width:0}#payTile b{display:block;font-size:15px}#payTile small{display:block;color:#6B7684;font-size:12.5px;margin-top:2px}
#payTile .ar{color:#B0B8C1;font-size:20px}`;
  let st=null;
  const add=()=>{try{
    if(typeof routeKey!=='function'||routeKey()!==''||typeof S==='undefined'||!S.data||!S.data.me)return;
    const em=String(S.data.me.email||localStorage.getItem('tsbp_email')||'').toLowerCase();
    if(PAY_WHO.indexOf(em)<0||document.getElementById('payTile'))return;
    const anchor=document.getElementById('cashTile')||document.getElementById('lvstrip')||document.getElementById('punchBlk');if(!anchor)return;
    if(!st){st=document.createElement('style');st.textContent=css;document.head.appendChild(st)}
    const a=document.createElement('a');a.id='payTile';a.href=URL;a.target='_blank';a.rel='noopener';
    a.innerHTML='<span class="ic">입금</span><span class="tx"><b>정산 입금 예정</b><small>카드·QR·앱 대금 · 오늘과 다음 입금</small></span><span class="ar">›</span>';
    anchor.insertAdjacentElement('afterend',a);
  }catch(e){}};
  new MutationObserver(add).observe(document.body,{childList:true,subtree:true});add();
})();
