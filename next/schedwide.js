/* ── 근무표 한눈에 보기 (윤홍민 수쉐프 요청 11/11) ──
   1) 태블릿·PC(가로 760px 이상)에서는 근무표 화면을 자동으로 넓게 (가로 스크롤 없음)
   2) 폰: '한눈에 보기'를 켜면 표가 화면 폭에 맞게 줄어들고 위 안내·아래 메뉴를 숨김. 켠 상태는 기억. */
(function(){
const K='tsbp_swide',big=()=>matchMedia('(min-width:760px)').matches,onSched=()=>routeKey()==='schedule';
const isOn=()=>{try{return localStorage.getItem(K)==='1'}catch(_){return false}};
function apply(){const s=onSched();if(s&&big())document.body.classList.add('wide');document.body.classList.toggle('sfit',s&&isOn());btn()}
function btn(){if(!onSched())return;const t=document.querySelector('#view .stool');if(!t||t.querySelector('#sfx'))return;
  const b=document.createElement('button');b.id='sfx';b.className='sfx'+(isOn()?' on':'');
  b.innerHTML=isOn()?'기본 보기':'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg> 한눈에 보기';
  b.onclick=()=>{const on=!isOn();try{localStorage.setItem(K,on?'1':'0')}catch(_){}
    const de=document.documentElement;
    if(on&&!big()&&de.requestFullscreen&&!document.fullscreenElement)de.requestFullscreen().catch(()=>{});
    if(!on&&document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});
    t.querySelector('#sfx').remove();apply();window.scrollTo(0,0);
    if(on&&!big()&&innerHeight>innerWidth)toast('폰을 가로로 돌리면 더 넓게 보여요',2200)};
  t.appendChild(b)}
const orig=ROUTES.schedule;
ROUTES.schedule=async function(v,a){apply();const r=await orig(v,a);apply();return r};
addEventListener('hashchange',()=>setTimeout(apply,0));
addEventListener('resize',()=>{if(onSched())apply()});
new MutationObserver(()=>{if(onSched())btn()}).observe(document.body,{childList:true,subtree:true});
})();
