(function(e,t,n){var r=undefined,i=31536e6,s="An unexpected error has occurred. Please try again.",o="focus",u="blur",a="keyup",f="scroll",l="resize",c="submit",h="reset",p="click",d="selectstart touchstart",v=p+" "+d,m=1,g=2,y=3,b=4,w=5,E=6,S=7,x=8,T=9,N=!0,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R;C=function(e,t,n,r){var i;return function(){var s=this,o=arguments,u=function(){i=null,n||e.apply(s,o)},a=n&&!i;clearTimeout(i),i=setTimeout(u,t),a?e.apply(s,o):r&&r.call(i,t)}},k=function(){function o(e){return d.callback=e,i?(t(document).on(a,u),s.show(),f(),!1):(r=!0,!1)}function u(e){return e.which==27?(l(),!1):!0}function f(){i.focus_response_field()}function l(){t(document).off("keyup",u),t("#solvemedia").hide()}function h(e){var n=t(e.target);switch(n.attr("id")||n[0].nodeName){case"adcopy-link-refresh":i.reload(),f();break;case"adcopy-link-audio":i.change2audio(),f();break;case"adcopy-link-image":i.change2image(),f();break;case"adcopy-link-info":case"I":i.moreinfo();break;case"solvemedia":case"B":l();break;default:return!0}return!1}function d(o){if(!o)return!1;s=t("#solvemedia");if(!s.length)return!1;e.ACPuzzleInfo={protocol:e.location.protocol.match(/^https?:$/)?"":"http:",apiserver:"//api.solvemedia.com",mediaserver:"//api.solvemedia.com",magic:"u7WpnzA6KVaLL0XYMDopVg",chalapi:"ajax",chalstamp:1424984044,lang:"en",size:"standard",theme:"custom",type:"img",onload:null},P(function(){t.ajax({url:n,dataType:"script",cache:!0}).fail(function(){}).done(function(){i=e.ACPuzzle,i.create(o)}),s.on(p,h),s.find("form").on(c,{success:function(e){r=!0,l(),t.type(d.callback)=="function"&&d.callback()},fail:function(e){return i.reload(),!1}},F)})}var n="//api.solvemedia.com/papi/_puzzle.js",i,s;return d.fire=o,d}(),L=function(e,t,n){if(arguments.length>1&&String(t)!=="[object Object]"){!n&&(n={});if(t===null||t===undefined)n.expires=-1;if(!isNaN(parseInt(n.expires))&&n.expires!==0){var r=n.expires,i=n.expires=new Date;r>1e3?i.setTime(r):i.setDate(i.getDate()+r)}return t=String(t),document.cookie=[encodeURIComponent(e),"=",n.raw?t:encodeURIComponent(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}n=t||{};var s,o=n.raw?function(e){return e}:decodeURIComponent;return(s=(new RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)")).exec(document.cookie))?o(s[1]):null},A=function(){function a(e){var n;e=t+e;if(u){try{n=JSON.parse(i[e]||s[e])}catch(r){}return!!n&&"d"in n?n.t>0&&n.t<(new Date).getTime()?(i[o](e),s[o](e),null):n.d:null}try{n=JSON.parse(L(e))}catch(r){}return n||null}function f(e,r,a){var f=(new Date).getTime();e=t+e,a=parseInt(a),a=a>0?a<f?a+f:a:0;if(u){if(r===null||r===undefined)return i[o](e),s[o](e),!0;var l={d:r,t:a},c=a?i:s;return i[o](e),c[e]=JSON.stringify(l),setTimeout(n,10),!0}return L(e,JSON.stringify(r),{expires:a})?!0:!1}function n(){if(!n||!r||!u)return!1;var e=i[r]=parseInt(i[r])+1;if(e<n)return!1;i[r]=0;var s=(new Date).getTime();for(var a in i){var f=null;if(!t||a.indexOf(t)===0){try{f=JSON.parse(i[a])}catch(l){}f&&f.t&&f.t<s&&i[o](a)}}}var t="",n=2,r="_gc",i=e.localStorage,s=e.sessionStorage,o="removeItem",u=function(){if(!i||!s)return!1;var e="TEST"+Math.random().toString().substr(2);try{s[e]="1",s[o](e)}catch(t){return!1}return!0};return function(t,n){var r=arguments;return r.length==1?typeof r[0]=="string"?a(r[0]):!1:r.length>1?f.apply(this,Array.prototype.slice.call(r)):!1}}(),O=function(){function o(e,t){var n={event:e};return t!==!1&&A("user_id")&&(n.userId=A("user_id")),n.ad=!N,r.push(n)}function u(e){if(s)return;if(!e)return;s=!0,t.ajax({url:"//www.googletagmanager.com/gtm.js?id="+e,dataType:"script",cache:!0}).done(function(){s=!1,i=!0}).fail(function(e,t,n){s=!1})}var n="dataLayer",r,i,s;return function(t,s){if(i)return o(t,s);if(typeof t=="string"&&t.indexOf("GTM-")===0)return e[n]||(r=e[n]=[{"gtm.start":+(new Date),event:"gtm.js"}]),u(t)}}(),M=function(e){var t=[];return function(n,r){if(arguments.length===0)return t.forEach(function(t){return t[0].call(t[1],e)});t.push([n,r||this])}},_={enterAnonymous:M("enterAnonymous"),signup:M("signup"),signupFail:M("signupFail"),login:M("login"),loginFail:M("loginFail"),enter:M("enter"),enterDuplicate:M("enterDuplicate"),enterFail:M("enterFail"),forgot:M("forgot"),reset:M("reset"),verify:M("verify"),verifyRequest:M("verifyRequest"),profileUpdate:M("profileUpdate"),logout:M("logout"),slideshowPrize:M("slideshowPrize"),slideshowCalendar:M("slideshowCalendar"),slideshowWinner:M("slideshowWinner")},D=function(e,t,n,r){t||(t=250);var i,s;return function(){var o=n||this,u=+(new Date),a=arguments;i&&u<i+t?(r&&r.call(o,s,t),clearTimeout(s),s=setTimeout(function(){i=u,e.apply(o,a)},t)):(i=u,e.apply(o,a))}},P=function(){function t(t,n){e.push([t,n||this])}var e=[];return t.fire=function(){return e.forEach(function(e){return e[0].call(e[1])})},t}(),H=function(){function f(t){t=parseInt(t),n.attr("src",i[o[t-1]]),r.html(s[o[t-1]]),e.removeClass("cur"+a).addClass("cur"+t),a=t,_.slideshowPrize()}function l(e){e.preventDefault(),e.stopPropagation(),f(a<=1?u:a-1)}function c(e){e.preventDefault(),e.stopPropagation(),f(a>=u?1:a+1)}var e,n,r,i={},s={},o=[1],u=1,a=1;P(function(){e=t(".prize");if(!e.length)return;n=e.find("img"),r=t(e.find("p")[0]),i[1]=n.attr("src"),s[1]=r.html();var a;if(a=n.data("img2"))i[2]=a;if(a=n.data("img3"))i[3]=a;if(a=r.data("desc2"))s[2]=a;if(a=r.data("desc3"))s[3]=a;for(var h=2;h<=3;h++)if(i[h]||s[h])o.push(h),i[h]||(i[h]=i[h-1]),s[h]||(s[h]=s[h-1]);if((u=o.length)==1)return;e.addClass("slideshow").append(t('<b class="prev">').on(d,C(l,100,!0))).append(t('<b class="next">').on(d,C(c,100,!0)));var p=t('<div class="dots">');for(var h=1;h<=u;h++)p.append(t("<i>").data("cur",h));e.addClass("cur1").append(p),p.on(d,"i",C(function(){f(t(this).data("cur"))},100,!0))})}(),B=function(){function b(){var e=h.position(),t=e&&e.left+s.scrollLeft();g=h.width(),p=t+g,v=i.width(),m=p-v,y=v/g}function w(e){var t=s.scrollLeft()-v*.63;t<=0?(t=0,i.addClass(n),i.removeClass(r)):i.removeClass(n),s.animate({scrollLeft:t},400),_.slideshowCalendar()}function E(e){var t=s.scrollLeft()+v*.63;t>=m?(t=m+2,i.addClass(r),i.removeClass(n)):i.removeClass(r),s.animate({scrollLeft:t},400),_.slideshowCalendar()}function S(e){var o=s.scrollLeft();o>=m?i.addClass(r):o<=0?i.addClass(n):i.removeClass(n).removeClass(r);var u=Math.floor(o/g),a=u+y+1;for(var f=u;f<=a;f++){var l=t(c[f]);if(l.length&&!l.data("loaded")){var h=l.find("img");h.attr("src",h.data("src")).data("src",!1).removeClass("loader"),l.addClass("loaded").data("loaded",!0)}}}var n="flush_left",r="flush_right",i,s,o,u,a,c,h,p,v,m,g,y;P(function(){i=t(".calendar.slideshow");if(!i.length)return;s=i.find(".wrap"),o=i.find(".prev"),u=i.find(".next"),a=i.find(".today"),c=s.children(),h=t(c[c.length-1]),b();var n=a.position(),r=n?n.left+g/2-v/2:0;s.scrollLeft(r),S(),o.on(d,D(w,450)),u.on(d,D(E,450)),s.on(f,D(S,32)),t(e).on(l,b)})}(),j=function(){function l(e){e.each(function(e,n){var r=t(n).find("img");r.attr("src")||r.attr("src",r.data("src"))})}function c(t){var r=f-1;if(r<1)return!1;r==1?i.addClass(n):i.removeClass(e),u[f-1].hide(),l(u[r-1].show()),_.slideshowWinner(),f=r}function h(t){var r=f+1;if(r>a)return!1;r==a?i.addClass(e):i.removeClass(n),u[f-1].hide(),l(u[r-1].show()),_.slideshowWinner(),f=r}var e="flush_left",n="flush_right",r=4,i,s,o,u=[[]],a=1,f=1;P(function(){i=t(".winners.slideshow");var e=i.children(),f=e.length;a=Math.ceil(f/r);if(!f||a<=1)return;for(var l=0;l<a;l++)u[l]=t(e.slice(l*r,l*r+r)),l!=0&&u[l].hide();s=t('<b class="prev"></b>'),o=t('<b class="next"></b>'),i.append(s).append(o).addClass(n),s.on(d,h),o.on(d,c)})}(),F=function(){function e(n){function h(){f.removeClass("on"),u.removeClass("loading"),a.attr("disabled",null)}function p(e,t,n){console.info("xhr.done"),console.debug(e),h();if(!e||!1 in e||e.status!==m){switch(e.status){case y:logout();break;case T:q.roadblock(function(){u.trigger(c)})}return l.html(e.message||s).show(),i(e)}return console.info("xhr: call success callback"),r(e)}function d(e,t,n){return console.info("xhr.fail"),console.debug(e),h(),l.html(s).show(),i()}n.preventDefault(),console.info("xhr"),console.debug(n);var r=n.data&&n.data.success||function(){},i=n.data&&n.data.fail||function(){},o=n.data&&n.data.prereq||function(){return!0},u=e.$form=t(this).addClass("loading"),a=e.$submit=u.find('input[type="submit"]').attr("disabled","disabled"),f=u.find(".loader").addClass("on"),l=e.$alert=u.find(".alert").empty().hide();return console.info("action: "+u.attr("action")),o(n)?(t.ajax({type:"POST",url:u.attr("action"),data:u.serialize(),dataType:"json"}).done(p).fail(d),!1):(console.info("xhr: prereq not met, returning false"),h(),!1)}return e}(),I=function(n){function l(n){t(".logo").trigger(o).trigger(u),t(e).scrollTop(n||0)}function d(e){console.info("enter()");var n=!!A("ineligible"),r=y();if(!r){console.info("enter: not logged in, show login form"),t(".frame").hide(),t("#signup").show(),t("#login_username").trigger(o),_.enterAnonymous();return}n?(console.info("enter: ineligible"),e&&t("#thanks h2").html("You have already entered today."),t(".frame, .calendar, #winners, .see_prizes").hide(),t("#thanks").append(t(A("thanks")||"")).show()):(console.info("eligible"),t(".frame").hide(),t("#prize").show())}function v(){return console.log("initiate action to get user info"),t.ajax({type:"GET",url:"/api/user/"+A("user_id"),datatype:"json"})}function g(){var e=t("#info_form .profile"),n;console.info("showAddressForm()");if(A("user_id")){e.find(".user_id").val(A("user_id"));if(!(n=A("address_info")))v().done(function(t){console.info("get user info from api server"),e.find(".firstname").val(t.firstname),e.find(".lastname").val(t.lastname),e.find(".address").val(t.address),e.find(".city").val(t.city),e.find(".state").val(t.state),e.find(".zipcode").val(t.zipcode)});else{console.info("get user info from local cache");for(var r in n)n.hasOwnProperty(r)&&e.find("."+r).val(n[r])}t(".frame").hide(),t("#info").show()}else console.error("no user_id, can't request info")}function y(){return A("lis")==1}function b(){t.ajax({type:"POST",url:"/api/eligible",dataType:"json"}).done(function(e){if(!e||!e.status||e.status!=m)return w();a.show(),A("lis",1,i),A("user_id",e.user_id,i),A("ineligible",!e.eligible,e.midnight*1e3)})}function w(){return t.ajax({type:"POST",url:"/api/logout",dataType:"json"}).done(function(e){a.hide(),A("lis",null),A("user_id",null),A("name",null),A("email",null),A("verify_address",null),A("address_info",null),A("ineligible",null),L("sid",null),r=null,_.logout()}),!1}function E(){function e(e){if(e.err)return n(e.message);f.html("Verification email sent."),_.verifyRequest()}function n(e){f.html(s)}return t.ajax({type:"POST",url:"/api/verify",dataType:"json"}).done(e).fail(n),!1}function S(e){q.refreshAds();var t=!O(e)}var a,f;for(var x in _)_[x](S);P(function(){t("#login_form").on(c,{success:function(e){var t={};return console.info("login form success callback"),console.debug(e),l(0),r=null,A("lis",1,i),A("user_id",e.id,i),A("name",e.name,i),A("email",e.email,i),!(t.firstname=e.firstname)||!(t.lastname=e.lastname)||!(t.address=e.address)||!(t.city=e.city)||!(t.state=e.state)||!(t.zipcode=e.zipcode)?(console.info("profile incomplete"),A("verify_address",!0,i),A("address_info",t,3e5)):(console.info("profile complete"),A("verify_address",null)),e.thanks&&A("thanks",e.thanks,i),a.show(),_.login(),e.eligible?d():(A("ineligible",!0,e.midnight*1e3),d(!0),_.enterDuplicate()),!1},fail:function(){console.info("login form fail callback"),_.loginFail()}},F),t("#info_form").on(c,function(){return console.info("address from submission"),!1}),t("#signup_form").on(c,{success:function(t){return l(0),r=null,A("lis",1,i),A("user_id",t.user_id,i),t.name&&A("name",t.name,i),a.show(),F.$form.trigger(h),F.$form.hasClass("profile")?(_.profileUpdate(),e.location.href="/"):(_.signup(),d()),!1},fail:function(){_.signupFail()}},F),t("#forgot_form").on(c,{success:function(e){return F.$alert.show().html(e.message),F.$form.trigger(h),F.$form.find("fieldset.login").hide(),F.$form.find("p").hide(),F.$submit.hide(),F.$form.find(".forgot_close").html("Dismiss"),_.forgot(),!1}},F),t("#reset_form").on(c,{success:function(e){return l(0),F.$alert.show().html(e.message),F.$form.trigger(h),F.$form.find("fieldset, input").hide(),F.$form.find(".success").show(),_.reset(),!1}},F),t("#prize_form").on(c,{prereq:function(){return y()?(console.info("prereq: is logged in"),A("ineligible")?(console.info("prereq: ineligible"),d(!0),_.enterDuplicate(),!1):A("verify_address")?(console.warn("need to verify address info"),g(),!1):(console.info("eligible"),!0)):(console.info("prereq: not logged in"),d(),!1)},success:function(e){l(0),r=null,A("ineligible",!0,e.midnight*1e3),A("thanks",e.thanks,i),d(),_.enter()}},F),a=t(".account"),t(".logout").on(p,w),f=t(".verify"),f.find("a").on(p,E),y()&&(a.show(),A("ineligible")||b())})}(H),q=function(){function n(){var e=[],r;return arguments.length?(Array.prototype.push.apply(e,arguments),r=e.shift(),r&&r in n&&t.isFunction(n[r])?n[r].apply(this,e):!1):!1}return n.refreshAds=function(){e.console&&console.warn("No refreshAds() method defined in shell!")},n.solvemedia=k,n.roadblock=k.fire,n.gtm=O,n}(),R=function(){function o(){}function u(){a(),f("//cdn.yldbt.com/js/yieldbot.intent.js",l,c),y(),g()}function a(){t(".ad").each(function(e,n){var r=t(n);if(!r.data("id"))return;r.empty().append(t("<div>").attr("id",r.data("id")))})}function f(e,n,r){t.ajax({url:e,dataType:"script",cache:!0}).done(n).fail(r)}function l(){var n=e.yieldbot;n.pub("d45f"),n.defineSlot("LB"),n.defineSlot("MR"),n.enableAsync(),n.go(),e.OX_ads=[{slot_id:"728x90_ATF",auid:"537513249",vars:n.getSlotCriteria("LB")},{slot_id:"300x250_ATF",auid:"537513251",vars:n.getSlotCriteria("MR")},{slot_id:"300x250_BTF",auid:"537513252"},{slot_id:"728x90_BTF",auid:"537513250"}],t.extend(!0,s,e.OX_ads),f("//junemedia-d.openx.net/w/1.0/jstag",h,p)}function c(){}function h(){}function p(){}function d(){}function m(){}function g(){f("http://www.zergnet.com/zerg.js?id=29457",d,m)}function y(n){n||(n="ourbestbox"),e[n]=function(e){t("#"+n).append(e&&e.result||"")},t.ajax({url:"http://www.betterrecipes.com/slideshows/ourbestbox_ajax",jsonp:n,dataType:"jsonp",data:{format:"json"}})}function b(){a(),s.forEach(function(e){OX.load(e)}),g(),y()}function E(){var e=t("footer nav");for(var i in r){var s=t("<nav>").append(t("<h5>").html(i)),o=r[i],u=o.length;for(var a=0;a<u;a++){var f=o[a],l,c;t.type(f)=="string"?(l=f,c=n.replace(/www/,l.toLowerCase().replace(" ",""))+"/",l=="Copycat"&&(c=n.replace(/www/,"restaurant")+"/"),l+=" Recipes"):(c=f[1].charAt(0)=="/"?n+f[1]:f[1],l=f[0]),s.append(t("<a>").attr("href",c).html(l))}e.before(s)}}var n="http://hypster.com",r={},i=4e3,s=[],w=o.refreshAds=C(function(){N=!1,setTimeout(b,1e3)},i,!0,function(){N=!0});return P(function(){t("body>header .menu").on(v,C(function(e){e.preventDefault(),t(this).closest("header").toggleClass("open")},100,!0)),u(),E()}),q.refreshAds=w,e.HYP=o,o}();var U,z=0;(function W(){if(!e[t]){z++||(U=setInterval(W,16));return}U&&clearInterval(U),t=e[t],e[n]&&e[n].q&&e[n].q.forEach(function(t){q.apply(e,t)}),e[n]=q,t(P.fire)})()})(window,"jQuery","jds");