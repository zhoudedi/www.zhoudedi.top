//include('js/switcher.js')
$(window).load(function(){var nav=$('nav'),content=$('#content'),content_inner=$('>.inner',content),content_inner_width=content_inner[0].offsetWidth,content_layer_1=$('>.z1',content),content_layer_2=$('>.z2',content),content_layer_3=$('>.z3',content),layer_1_k=1.2,layer_2_k=1.4,layer_3_k=1.6,track=$('#glob>.track'),track_a=$('a',track),back_to_home=$('footer a.back_to_home'),back_btn=$('footer a.back'),track_a_bl=false,track_width=track.width()-track_a.width(),content_x=0,glob_bl=false
$('.list a').append('<span/>')
$('.r-menu a').each(function(){var th=$(this),img=$('<img>').attr({src:'images/mrk-1.png'})
th.append(img)})
$('.parts').on('mousedown',function(){return false})
$('.parts').each(function(){var th=$(this),left=+(th.prop('offsetLeft')/content_inner_width*100+'').slice(0,4)+'%'
th.css({left:left})})
content_layer_1.width(content_inner_width*layer_1_k)
content_layer_2.width(content_inner_width*layer_2_k)
content_layer_3.width(content_inner_width*layer_3_k)
track_a.dragg({axis:'x',containment:'parent',cursor:'pointer',start:function(){track_a.stop()
glob_bl=true},drag:function(posX){if(track_a_bl)
return false
var anim=false
if(content_x>1)
anim={duration:400,easing:'easeInBack',complete:function(){track_a_bl=false}},track_a_bl=true
render_content(content_x=posX,anim)},end:function(){track_a.trigger('refresh')
glob_bl=false}})
var map=(function(){var dbow=document.body.offsetWidth,_pos=[]
$('>ul>li',content_inner).each(function(){var th=$(this),pos=(th.prop('offsetLeft')-(dbow-th.width())/2)/(content_inner_width-dbow)
if(pos<0)
pos=0
_pos.push({hash:'#!/'+th.attr('id'),pos:pos})})
for(var i=1,l=_pos.length;i<l;i++)
_pos[i].pos-=(_pos[i].pos-_pos[i-1].pos)/2
return _pos})()
function render_content(pos,anim){pos||(pos=content_x)
for(var tmp,i=0,l=map.length;i<l;i++)
if(map[i].pos>pos){tmp=map[i-1]
break}
tmp||(tmp=map[map.length-1])
location.hash=tmp.hash
if(pos*(content_inner_width-document.body.offsetWidth)>260&&back_to_home.is(':hidden'))
back_to_home.fadeIn()
if(pos*(content_inner_width-document.body.offsetWidth)<260&&back_to_home.is(':visible'))
back_to_home.fadeOut()
var _fu=function(el,k,pos){el.css({left:-(content_inner_width*k-document.body.offsetWidth)*pos})}
if(anim){anim=$.extend({},anim,{step:function(now){var pos=-now/(content_inner_width-document.body.offsetWidth)
_fu(content_layer_1,layer_1_k,pos)
_fu(content_layer_2,layer_2_k,pos)
_fu(content_layer_3,layer_3_k,pos)}})
content_inner.stop().animate({left:-(content_inner_width-document.body.offsetWidth)*pos},anim)}else{_fu(content_inner,1,pos)
_fu(content_layer_1,layer_1_k,pos)
_fu(content_layer_2,layer_2_k,pos)
_fu(content_layer_3,layer_3_k,pos)}}
$(window).resize(function(){track_width=track.width()-track_a.width()
render_content()}).resize()
content_inner.tabs({empty:'#!/splash',preFu:function(){},actFu:function(_){if(glob_bl)
return false
var _t,dbow=document.body.offsetWidth,anim={duration:1000,easing:'easeInOutSine'}
if(_.curr)
_t=content_x=(_.curr.prop('offsetLeft')-(dbow-_.curr.width())/2)/(content_inner_width-dbow),render_content(_t,anim),track_a.stop().animate({left:track_width*(_t>1?1:_t)},anim),$.when(track_a).then(function(){track_a.trigger('refresh')})
if(_.curr&&_.curr.hasClass('hidden_pages')&&back_btn.is(':hidden'))
back_btn.fadeIn()
if(_.curr&&!_.curr.hasClass('hidden_pages')&&back_btn.is(':visible'))
back_btn.fadeOut()}})
nav.navs({useHash:true,defHash:'#!/splash'}).navs(function(n,_){if(n===_.defHash||n==='close')
!glob_bl&&render_content(content_x=0,{duration:1000,easing:'easeInOutSine'}),!glob_bl&&track_a.stop().animate({left:0},{duration:1000,easing:'easeInOutSine',complete:function(){track_a.trigger('refresh')}}),back_btn.fadeOut()
else
content_inner.tabs(n)})
function show_splash(){if(!show_subpages.ready)
return false
show_subpages.ready=false}
function show_subpages(){if(show_subpages.ready)
return false
show_subpages.ready=true}
function googleMap(){if(googleMap.ready)
return false
googleMap.ready=true
var cssPath='.google_map',holder=$(cssPath),src='http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=Brooklyn,+New+York,+NY,+United+States&amp;aq=0&amp;sll=37.0625,-95.677068&amp;sspn=61.282355,146.513672&amp;ie=UTF8&amp;hq=&amp;hnear=Brooklyn,+Kings,+New+York&amp;ll=40.649974,-73.950005&amp;spn=0.01628,0.025663&amp;z=14&amp;iwloc=A&amp;output=embed',str='<iframe class="blo" width="'+holder.width()+'" height="'+holder.height()+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+src+'"></iframe>'
holder.html(str)}
$('#gspinner').fadeOut(function(){$('body').css({overflow:'auto'})})});(function($){var hasTouch='ontouchstart'in window&&!(/hp-tablet/gi).test(navigator.appVersion)
$.fn.dragg=function(o){return this.each(function(){var th=$(this),body=$('body'),win=$(window),hld,sx,xy,csx,csy,mix,miy,max,may,posX=0,posY=0,cont,pd,startEv=hasTouch?'touchstart':'mousedown',moveEv=hasTouch?'touchmove':'mousemove',endEv=hasTouch?'touchend touchcancel':'mouseup'
o=$.extend(true,{axis:'xy',containment:false,cursor:'auto',calcPadding:false,start:function(){},end:function(){},drag:function(){}},o)
if(o.containment){cont=o.containment
if(cont=='parent')
cont=th.parent()
if(typeof cont=='string')
cont=$(cont)
if(cont.prop)
$(window).resize(function(){max=cont.prop('offsetWidth')-th.prop('offsetWidth')-parseInt(cont.css('paddingRight'))
may=cont.prop('offsetHeight')-th.prop('offsetHeight')-parseInt(cont.css('paddingBottom'))
mix=parseInt(cont.css('paddingLeft'))
miy=parseInt(cont.css('paddingTop'))
render()}).resize()}
function render(){th.css({left:max*posX,top:may*posY,cursor:o.cursor})}
function start(e){hld=true
e=hasTouch?e.originalEvent.touches[0]:e
sx=~o.axis.indexOf('x')?e.pageX:false
sy=~o.axis.indexOf('y')?e.pageY:false
th.css({left:csx=th.prop('offsetLeft'),top:csy=th.prop('offsetTop')})
posX=csx/max
posY=csy/may
o.start.call(th,posX,posY)
return false}
function end(e){if(!hld)
return false
hld=false
th.css({cursor:'auto'})
o.end.call(th,posX,posY)}
function drag(e){if(!hld)
return false
var x,y
e=hasTouch?e.originalEvent.touches[0]:e
x=sx?csx+(e.pageX-sx):csx
y=sy?csy+(e.pageY-sy):csy
if(cont)
x=x<mix?mix:x>max?max:x,y=y<miy?miy:y>may?may:y
posX=x/max
posY=y/may
render()
o.drag.call(th,posX,posY)}
th.on(startEv,function(e){start(e)
return false})
th.on('refresh',function(){posX=th.prop('offsetLeft')/max
posY=th.prop('offsetTop')/may})
win.add(body).on(endEv,function(e){end(e)
return false})
body.on(moveEv,function(e){drag(e)})})}})(jQuery);(function($){var c=['DOMMouseScroll','mousewheel'];$.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var i=c.length;i;)this.addEventListener(c[--i],handler,false);else this.onmousewheel=handler},teardown:function(){if(this.removeEventListener)for(var i=c.length;i;)this.removeEventListener(c[--i],handler,false);else this.onmousewheel=null}};$.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}});function handler(a){var b=[].slice.call(arguments,1),delta=0,returnValue=true;a=$.event.fix(a||window.event);a.type="mousewheel";if(a.originalEvent.wheelDelta)delta=a.originalEvent.wheelDelta/120;if(a.originalEvent.detail)delta=-a.originalEvent.detail/3;b.unshift(a,delta);return $.event.handle.apply(this,b)}})(jQuery);eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('h.i[\'V\']=h.i[\'y\'];h.M(h.i,{B:\'C\',y:9(x,t,b,c,d){6 h.i[h.i.B](x,t,b,c,d)},14:9(x,t,b,c,d){6 c*(t/=d)*t+b},C:9(x,t,b,c,d){6-c*(t/=d)*(t-2)+b},13:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t+b;6-c/2*((--t)*(t-2)-1)+b},12:9(x,t,b,c,d){6 c*(t/=d)*t*t+b},Q:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t+1)+b},O:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t+b;6 c/2*((t-=2)*t*t+2)+b},P:9(x,t,b,c,d){6 c*(t/=d)*t*t*t+b},L:9(x,t,b,c,d){6-c*((t=t/d-1)*t*t*t-1)+b},S:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t+b;6-c/2*((t-=2)*t*t*t-2)+b},F:9(x,t,b,c,d){6 c*(t/=d)*t*t*t*t+b},J:9(x,t,b,c,d){6 c*((t=t/d-1)*t*t*t*t+1)+b},K:9(x,t,b,c,d){e((t/=d/2)<1)6 c/2*t*t*t*t*t+b;6 c/2*((t-=2)*t*t*t*t+2)+b},N:9(x,t,b,c,d){6-c*8.A(t/d*(8.g/2))+c+b},R:9(x,t,b,c,d){6 c*8.n(t/d*(8.g/2))+b},X:9(x,t,b,c,d){6-c/2*(8.A(8.g*t/d)-1)+b},11:9(x,t,b,c,d){6(t==0)?b:c*8.j(2,10*(t/d-1))+b},15:9(x,t,b,c,d){6(t==d)?b+c:c*(-8.j(2,-10*t/d)+1)+b},16:9(x,t,b,c,d){e(t==0)6 b;e(t==d)6 b+c;e((t/=d/2)<1)6 c/2*8.j(2,10*(t-1))+b;6 c/2*(-8.j(2,-10*--t)+2)+b},E:9(x,t,b,c,d){6-c*(8.q(1-(t/=d)*t)-1)+b},G:9(x,t,b,c,d){6 c*8.q(1-(t=t/d-1)*t)+b},H:9(x,t,b,c,d){e((t/=d/2)<1)6-c/2*(8.q(1-t*t)-1)+b;6 c/2*(8.q(1-(t-=2)*t)+1)+b},I:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.u(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.v(c/a);6-(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b},T:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d)==1)6 b+c;e(!p)p=d*.3;e(a<8.u(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.v(c/a);6 a*8.j(2,-10*t)*8.n((t*d-s)*(2*8.g)/p)+c+b},U:9(x,t,b,c,d){f s=1.l;f p=0;f a=c;e(t==0)6 b;e((t/=d/2)==2)6 b+c;e(!p)p=d*(.3*1.5);e(a<8.u(c)){a=c;f s=p/4}m f s=p/(2*8.g)*8.v(c/a);e(t<1)6-.5*(a*8.j(2,10*(t-=1))*8.n((t*d-s)*(2*8.g)/p))+b;6 a*8.j(2,-10*(t-=1))*8.n((t*d-s)*(2*8.g)/p)*.5+c+b},W:9(x,t,b,c,d,s){e(s==w)s=1.l;6 c*(t/=d)*t*((s+1)*t-s)+b},Y:9(x,t,b,c,d,s){e(s==w)s=1.l;6 c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},Z:9(x,t,b,c,d,s){e(s==w)s=1.l;e((t/=d/2)<1)6 c/2*(t*t*(((s*=(1.D))+1)*t-s))+b;6 c/2*((t-=2)*t*(((s*=(1.D))+1)*t+s)+2)+b},z:9(x,t,b,c,d){6 c-h.i.r(x,d-t,0,c,d)+b},r:9(x,t,b,c,d){e((t/=d)<(1/2.k)){6 c*(7.o*t*t)+b}m e(t<(2/2.k)){6 c*(7.o*(t-=(1.5/2.k))*t+.k)+b}m e(t<(2.5/2.k)){6 c*(7.o*(t-=(2.17/2.k))*t+.18)+b}m{6 c*(7.o*(t-=(2.19/2.k))*t+.1a)+b}},1b:9(x,t,b,c,d){e(t<d/2)6 h.i.z(x,t*2,0,c,d)*.5+b;6 h.i.r(x,t*2-d,0,c,d)*.5+c*.5+b}});',62,74,'||||||return||Math|function|||||if|var|PI|jQuery|easing|pow|75|70158|else|sin|5625||sqrt|easeOutBounce|||abs|asin|undefined||swing|easeInBounce|cos|def|easeOutQuad|525|easeInCirc|easeInQuint|easeOutCirc|easeInOutCirc|easeInElastic|easeOutQuint|easeInOutQuint|easeOutQuart|extend|easeInSine|easeInOutCubic|easeInQuart|easeOutCubic|easeOutSine|easeInOutQuart|easeOutElastic|easeInOutElastic|jswing|easeInBack|easeInOutSine|easeOutBack|easeInOutBack||easeInExpo|easeInCubic|easeInOutQuad|easeInQuad|easeOutExpo|easeInOutExpo|25|9375|625|984375|easeInOutBounce'.split('|'),0,{}));(function(d){d.each(['backgroundColor','borderBottomColor','borderLeftColor','borderRightColor','borderTopColor','color','outlineColor'],function(i,b){d.fx.step[b]=function(a){if(a.state==0){a.start=getColor(a.elem,b);a.end=getRGB(a.end)}a.elem.style[b]="rgb("+[Math.max(Math.min(parseInt((a.pos*(a.end[0]-a.start[0]))+a.start[0]),255),0),Math.max(Math.min(parseInt((a.pos*(a.end[1]-a.start[1]))+a.start[1]),255),0),Math.max(Math.min(parseInt((a.pos*(a.end[2]-a.start[2]))+a.start[2]),255),0)].join(",")+")"}});function getRGB(a){var b;if(a&&a.constructor==Array&&a.length==3)return a;if(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))return[parseInt(b[1]),parseInt(b[2]),parseInt(b[3])];if(b=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))return[parseFloat(b[1])*2.55,parseFloat(b[2])*2.55,parseFloat(b[3])*2.55];if(b=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))return[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)];if(b=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))return[parseInt(b[1]+b[1],16),parseInt(b[2]+b[2],16),parseInt(b[3]+b[3],16)];if(b=/rgba\(0, 0, 0, 0\)/.exec(a))return e['transparent'];return e[d.trim(a).toLowerCase()]}function getColor(a,b){var c;do{c=d.curCSS(a,b);if(c!=''&&c!='transparent'||d.nodeName(a,"body"))break;b="backgroundColor"}while(a=a.parentNode);return getRGB(c)};var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]}})(jQuery);function include(url){document.write('<script type="text/javascript" src="'+url+'"></script>')}