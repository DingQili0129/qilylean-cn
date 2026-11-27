(function(){
  'use strict';
// DAP evidence jump: align the exact achievement below the sticky header
  // and replay the restrained QilyLean gold feedback on every activation.
  var dapEvidenceHighlightTimer = null;
  function scrollToDapEvidence(target){
    if(!target)return;
    var header=document.querySelector('header.site-header,header.qily-site-header,header.qily-global-header,header[data-qily-site-header]');
    var headerHeight=header?Math.ceil(header.getBoundingClientRect().height):0;
    // China can use a taller two-row sticky header on narrow screens; include its visible bottom edge in the landing offset.
    var stickyCandidates=document.querySelectorAll('header,nav,[role="banner"],.qily-cn-nav-shell,.qily-cn-nav-rail,#qilyCnNavRail,.qily-cn-header,[data-qily-sticky-header]');
    for(var headerIndex=0;headerIndex<stickyCandidates.length;headerIndex++){
      var candidate=stickyCandidates[headerIndex];
      var candidateStyle=window.getComputedStyle(candidate);
      var candidateRect=candidate.getBoundingClientRect();
      if((candidateStyle.position==='fixed'||candidateStyle.position==='sticky')&&candidateRect.top<=12&&candidateRect.bottom>0){
        headerHeight=Math.max(headerHeight,Math.ceil(candidateRect.bottom));
      }
    }
    var offset=Math.max(76,headerHeight+(window.innerWidth<=900?14:18));
    document.documentElement.style.setProperty('--qily-dap-anchor-offset',offset+'px');
    if(dapEvidenceHighlightTimer){window.clearTimeout(dapEvidenceHighlightTimer);dapEvidenceHighlightTimer=null;}
    target.removeAttribute('data-qily-dap-highlight');
    void target.offsetWidth;
    target.setAttribute('data-qily-dap-highlight','true');
    window.requestAnimationFrame(function(){
      var pageTop=window.pageYOffset||document.documentElement.scrollTop||0;
      var top=Math.max(0,target.getBoundingClientRect().top+pageTop-offset);
      var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // China-only hash navigation: prevent max-scroll clamping at the last career achievement.
      var main=target.closest('main')||document.querySelector('main');
      if(main){
        var runway=document.getElementById('cnDapEvidenceScrollRunwayV2');
        if(!runway){
          runway=document.createElement('div');
          runway.id='cnDapEvidenceScrollRunwayV2';
          runway.setAttribute('aria-hidden','true');
          runway.style.cssText='display:block;width:100%;height:0;pointer-events:none;overflow:hidden';
          main.appendChild(runway);
        }
        runway.style.height='0px';
        var maxScroll=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)-window.innerHeight;
        var wanted=Math.max(0,target.getBoundingClientRect().top+(window.pageYOffset||document.documentElement.scrollTop||0)-offset);
        if(wanted>maxScroll){
          runway.style.height=Math.ceil(wanted-maxScroll+36)+'px';
        }
      }
      // Scroll without a lengthy animation; a delayed font/layout shift must not cancel the jump.
      function alignDap(){
        if(!target.isConnected)return;
        var current=window.pageYOffset||document.documentElement.scrollTop||0;
        var desired=Math.max(0,target.getBoundingClientRect().top+current-offset);
        window.scrollTo({top:desired,left:0,behavior:'auto'});
      }
      alignDap();
      window.requestAnimationFrame(alignDap);
      window.setTimeout(alignDap,180);
    });
    var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    dapEvidenceHighlightTimer=window.setTimeout(function(){
      if(target.isConnected)target.removeAttribute('data-qily-dap-highlight');
      dapEvidenceHighlightTimer=null;
    },reduced?1300:2700);
  }
  function bindDapEvidenceJump(){
    if(window.__qilyDapEvidenceJumpV1)return;
    window.__qilyDapEvidenceJumpV1=true;
    function jumpFromLocation(){
      if(window.location.hash!=='#dap-vacuum-furnace')return;
      var target=document.getElementById('dap-vacuum-furnace');
      if(target)scrollToDapEvidence(target);
    }
    document.addEventListener('click',function(event){
      if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      var origin=event.target;
      if(origin&&origin.nodeType!==1)origin=origin.parentElement;
      var link=origin&&origin.closest('a.career-related-link[href]');
      if(!link||(link.textContent||'').replace(/\s+/g,' ').trim()!=='DAP真空熔炉编程优化')return;
      var destination;
      try{destination=new URL(link.href,window.location.href);}catch(error){return;}
      if(destination.origin!==window.location.origin||destination.pathname!==window.location.pathname||destination.hash!=='#dap-vacuum-furnace')return;
      var target=document.getElementById('dap-vacuum-furnace');
      if(!target)return;
      event.preventDefault();
      if(window.location.hash!==destination.hash){
        window.history.pushState({qilyDapEvidence:true},'',destination.pathname+destination.search+destination.hash);
      }
      scrollToDapEvidence(target);
    },true);
    window.addEventListener('hashchange',jumpFromLocation);
    window.addEventListener('pageshow',jumpFromLocation);
    if(window.location.hash==='#dap-vacuum-furnace')jumpFromLocation();
  }
  bindDapEvidenceJump();
})();
