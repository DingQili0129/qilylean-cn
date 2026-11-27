/* Generated from the accepted international APP share dialog. */
(function(){
'use strict';
var main=document.querySelector('main[data-cn-source-content="capabilities/index.html"]');
if(!main||window.__qilyCnAppProductActions)return;
window.__qilyCnAppProductActions=true;
var apps={"times26001": {"name": "Times26001", "url": "https://qilylean.cn/archive/tools/times26001/#android-download", "download": "/assets/public-media/Times26001_v1.1.15_API36_website_release.apk?v=cf4f443e9382625a", "qr": "/assets/times26001-v1115-cn-qr.svg"}, "qilyleanHome": {"name": "QilyLean Home｜官网通用安装包", "url": "https://qilylean.cn/archive/profile/capabilities/#qilylean-home", "download": "/assets/public-media/QilyLean_CN_Home_v1.0.0_API36_INSTALL.apk?v=9067a6afad39912c", "qr": "/assets/qilylean-cn-home-download-qr.svg"}};
  function copy(text){
    if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(text);}
    var area=document.createElement('textarea');
    area.value=text;area.setAttribute('readonly','');area.style.position='fixed';area.style.left='-9999px';
    document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();return Promise.resolve();
  }

  function toast(text){
    var old=document.querySelector('.app-share-toast');if(old)old.remove();
    var el=document.createElement('div');el.className='app-share-toast';el.setAttribute('role','status');el.textContent=text;
    document.body.appendChild(el);setTimeout(function(){el.remove();},2200);
  }

  function ensureDialog(){
    var dialog=document.getElementById('qilyAppShareDialog');
    if(dialog)return dialog;
    dialog=document.createElement('dialog');
    dialog.id='qilyAppShareDialog';dialog.className='app-share-dialog';
    dialog.innerHTML='<div class="app-share-dialog-card">'+
      '<div class="app-share-dialog-head"><div><h3 id="qilyAppShareTitle">APP下载分享</h3><p>扫码进入官方下载区；页面内提供可安装APK。正式应用市场上线后，以对应商店渠道更新为主。</p></div><button type="button" class="app-share-close" aria-label="关闭">×</button></div>'+
      '<div class="app-share-qr-wrap"><img class="app-share-qr" id="qilyAppShareQr" alt="APP页面二维码"></div>'+
      '<p class="app-share-url" id="qilyAppShareUrl"></p>'+
      '<div class="app-share-dialog-actions"><button type="button" id="qilyAppShareDownload">直接下载 APK</button><button type="button" id="qilyAppShareNative">分享下载页</button><button type="button" class="secondary" id="qilyAppShareCopy">复制下载页链接</button></div>'+
      '</div>';
    document.body.appendChild(dialog);
    dialog.querySelector('.app-share-close').addEventListener('click',function(){dialog.close();});
    dialog.addEventListener('click',function(e){if(e.target===dialog)dialog.close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dialog.open)dialog.close();});
    return dialog;
  }

  function showQr(key){
    var app=apps[key];if(!app)return;
    var dialog=ensureDialog();
    dialog.dataset.app=key;
    document.getElementById('qilyAppShareTitle').textContent=app.name+'｜扫码进入下载页';
    var img=document.getElementById('qilyAppShareQr');img.src=app.qr;img.alt=app.name+'官方下载页二维码';
    document.getElementById('qilyAppShareUrl').textContent=app.url;
    var downloadBtn=document.getElementById('qilyAppShareDownload');
    var nativeBtn=document.getElementById('qilyAppShareNative');
    var copyBtn=document.getElementById('qilyAppShareCopy');
    if(app.download){downloadBtn.hidden=false;downloadBtn.onclick=function(){window.location.href=app.download;};}
    else{downloadBtn.hidden=true;downloadBtn.onclick=null;}
    nativeBtn.onclick=function(){shareLink(key);};
    copyBtn.onclick=function(){copy(app.url).then(function(){toast('下载页链接已复制');});};
    if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');
  }

  function shareLink(key){
    var app=apps[key];if(!app)return;
    var data={title:app.name+' Android 下载',text:app.name+' 官方下载页',url:app.url};
    if(navigator.share){navigator.share(data).catch(function(err){if(err&&err.name!=='AbortError')copy(app.url).then(function(){toast('下载页链接已复制');});});}
    else{copy(app.url).then(function(){toast('下载页链接已复制');});}
  }

main.addEventListener('click',function(e){
  var trigger=e.target.closest('.module-actions a');
  if(!trigger)return;
  var card=trigger.closest('article');
  var key=card&&card.id==='times26001'?'times26001':card&&card.id==='qilylean-home'?'qilyleanHome':null;
  if(!key)return;
  var label=trigger.textContent.trim();
  if(label==='扫码下载'){e.preventDefault();showQr(key);}
  else if(label==='分享下载页'){e.preventDefault();shareLink(key);}
});
})();
