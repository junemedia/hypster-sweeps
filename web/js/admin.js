/*!
     * Datepicker for Bootstrap v1.5.0 (https://github.com/eternicode/bootstrap-datepicker)
     *
     * Copyright 2012 Stefan Petre
     * Improvements by Andrew Rowls
     * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
     */

(function(e,t,n){var r="An unexpected error has occurred. Please try again.",i="focus",s="blur",o="keyup",u="scroll",a="resize",f="submit",l="reset",c="click",h="selectstart touchstart",p=c+" "+h,d=1,v=2,m=3,g=4,y=5,b=6,w=7,E=8,S=9,x,T,N,C,k,L,A,O,M,_,D,P,H,B;x=function(e,t,n,r){var i;return function(){var s=this,o=arguments,u=function(){i=null,n||e.apply(s,o)},a=n&&!i;clearTimeout(i),i=setTimeout(u,t),a?e.apply(s,o):r&&r.call(i,t)}},T=function(e,t,n,r){t||(t=250);var i,s;return function(){var o=n||this,u=+(new Date),a=arguments;i&&u<i+t?(r&&r.call(o,s,t),clearTimeout(s),s=setTimeout(function(){i=u,e.apply(o,a)},t)):(i=u,e.apply(o,a))}},N=function(){function t(t,n){e.push([t,n||this])}var e=[];return t.fire=function(){return e.forEach(function(e){return e[0].call(e[1])})},t}(),C=function(e,t,n){if(!n&&n!==0||n.toString().length!=1)n=" ";e=e.toString();var r=e.length+1,i="";while(r++<=t)i+=n;return i+e},k=function(e,t){var n=typeof e=="string"&&e.match(/^(\d+)-(\d+)-(\d+)$/),r;if(!n||n.length!=4)return t;var i=parseInt(n[1]),s=parseInt(n[2])-1,o=parseInt(n[3]);return s<0||s>11||o>31||o<1?t:(i<30&&(i+=2e3),r=new Date(i,s,o),isNaN(r.getTime())?t:r)},L=function(e){var t=new Date(e);return t?[t.getFullYear().toString(),C(t.getMonth()+1,2,0),C(t.getDate(),2,0)].join("-"):""},A=function(){var n="/admin/dashboard",r;N(function(){r=t("#dashboard nav");if(!r.length)return;r.on("click","b",function(r){var i=t(this).data("offset");e.location.href=n+(i!=0?"/"+t(this).data("offset"):"")})})}(),O=function(){function c(){i.attr("disabled",!1).val("Save"),s.attr("disabled",!1),o.html("")}function h(e,t){i.attr("disabled",!0).val(e||"Saved"),s.attr("disabled",!0),o.removeClass("error").html(""),u[t=="on"?"addClass":"removeClass"]("on")}function p(e,n){var r=new FormData,i=t('input[name="img'+n+'"]'),s=i.closest("fieldset"),o=s.find("img");r.append("img",e);if(!n)for(var u=1;u<=3;u++)if(!t('input[name="img'+u+'"]').val()){n=u;break}t.ajax({url:"/admin/upload",data:r,processData:!1,contentType:!1,type:"POST"}).done(function(t,n,r){s.removeClass("empty"),o.attr("src",t.url),i.val(t.md5),a[0].reset()}).fail(function(e,t,n){$warn=s.find("ol"),s.removeClass("empty").addClass("warn"),$warn.html("<li>"+n+"</li>"),console.warn("FAIL",e,t,n)})}function d(e){Prize.data["img"+e]=null}function v(e){var n=t(e),r=n.find("img"),i=n.find("ol");if(!r.length||r.attr("src").match(/unavailable/)){n.removeClass("warn"),i.html("");return}var s=[];width=r[0].naturalWidth,height=r[0].naturalHeight,width!=height&&s.push("Please use a square image with an 1:1 aspect ratio."),(width<400||height<400)&&s.push("Image should be at least 400 x 400 pixels."),s.length?(n.addClass("warn"),i.html("<li>"+s.join("</li><li>")+"</li>")):(n.removeClass("warn"),i.html(""))}var e="/img/unavailable.png",n="Server error encountered. Please try again.",r,i,s,o,u,a,f,l;return N(function(){r=t("form.prize"),i=r.find('input[type="submit"]'),s=r.find('input[type="reset"]'),o=r.find(".msg"),u=r.find(".loader"),a=t("form.upload"),f=a.find('input[type="file"]'),l=r.find("fieldset.img"),l.each(function(e,n){t(n).find("img").on("load",function(){v(t(this).closest("fieldset"))}),v(n)}),O.id=parseInt(r.find('input[name="id"]').val()),isNaN(O.id)&&(O.id=0),r.find("input, select, textarea").on("change, keydown",c),r.on("reset",function(){return h("No Changes"),!0}),r.on("submit",function(e){function i(e,t,n){return h(),e.status!==1?s(e.message):(e.prize_id&&(O.id=parseInt(e.prize_id,10),r.find('input[name="id"]').val(O.id),window.location.href=window.location.href.replace(/0$/,O.id)),!1)}function s(e){return h(),c(),o.addClass("error").html(e||n),!1}return h("Saving…","on"),t.ajax({url:"/admin/prize",data:t(this).serialize(),type:"POST"}).done(i).fail(function(){console.log(arguments),s()}),!1}),f.on("change",function(e){c(),p(this.files[0],f.data("index"))}),r.on("click","fieldset.img img",function(e){e.stopPropagation(),e.preventDefault();var n=t(this).closest("fieldset"),r=n.find('input[type="hidden"]').attr("name").substring(3);f.data("index",r),f.trigger("click")}),r.on("click","fieldset.img b",function(n){c(),n.stopPropagation(),n.preventDefault();var r=t(this).closest("fieldset"),i=r.find("img"),s=r.find('input[type="hidden"]');r.addClass("empty"),i.attr("src",e),s.val(""),v(r)}),t(document).bind("dragover",function(e){e.preventDefault();var n,r=window.dropZoneTimeout;r?clearTimeout(r):l.addClass("in");var i=!1,s=e.target;do{if(t(s).hasClass("img")){i=!0,n=t(s);break}s=s.parentNode}while(s!==null);l.removeClass("in hover"),i&&n.addClass("hover"),window.dropZoneTimeout=setTimeout(function(){window.dropZoneTimeout=null,l.removeClass("in hover")},100)}).bind("drop",function(e){c(),e.stopPropagation(),e.preventDefault();var n=t(e.target).closest("fieldset.img").find('input[type="hidden"]').attr("name"),r=n&&n.substring(3);return p((e.originalEvent.target.files||e.originalEvent.dataTransfer.files)[0],r),!1})}),{id:null}}(),M=function(){function f(n){o.html(n||r),s.addClass("error"),t(e).scrollTop(o.offset().top)}function l(e,n,r){if(!O.id)return f("Please save this prize before adding flight dates."),!1;o.html(""),s.removeClass("error"),t.ajax({url:"/admin/contest/"+e,data:{prize_id:O.id,date:n},dataType:"json",type:"POST"}).done(function(n,i,s){n.status===1?t.type(r)=="function"&&r(n):f(n.message)}).fail(function(e,t,n){f()})}function c(){var e=[];return n.find("tr").each(function(n,r){var i=t(r).find("td:nth-child(2)").text();i.match(/\d+-\d+\d+/)&&e.push(i)}),e.last=function(){return this[this.length-1]},e}function h(e){var t=u.indexOf(e)+2;n.find("tr:nth-child("+t+")").addClass("highlight")}function p(e){l("add",e,function(r){u.push(e),u.sort();var s=u.indexOf(e)+1;n.find("tr:nth-child("+s+")").after(t('<tr class="future"><td><b></b></td><td>'+e+"</td><td></td><td></td></tr>").addClass(e==a?"highlight":"")),i.val("")})}function d(e){l("del",e,function(t){var r=u.indexOf(e),i=r+2;u.splice(r,1),n.find("tr:nth-child("+i+")").remove()})}function v(e){i.val(""),l("alt",e,function(t){var r=u.indexOf(e),i=r+2,s=n.find("tr:nth-child("+i+")"),o=s.find("td:nth-child(3)"),a=s.find("td:nth-child(4)"),f=t.winner;o.html('<a href="mailto:'+f.email+'">'+f.firstname+" "+f.lastname+"</a>"),a.html(f.city+", "+f.state)})}var n,i,s,o,u,a=location.hash.substr(1)||k(new Date);N(function(){n=t("#flight"),i=t("#add_flight"),s=n.find("tr:last-child"),o=t("#contest_error"),u=c(),a=location.hash.substr(1)||k(new Date),h(a),i.on("keydown",function(e){switch(e.which){case 38:case 40:var n=(k(t(this).val())||k(u.last(),new Date)).getTime();return e.which==40?n+=864e5:n-=864e5,t(this).val(L(n)),!0;case 9:break;case 13:e.preventDefault();break;default:return!0}var r=t(this).val();if(k(r)<=new Date)return f("Cannot add a date in the past"),!1;if(u.indexOf(r)>=0)return f("This prize is already scheduled for "+r+"."),!1;p(r)}).datepicker({format:"yyyy-mm-dd",startDate:"today",autoclose:!0,orientation:"left bottom",todayBtn:!0,todayHighlight:!0}).on("hide",function(e){p(i.val())}),n.on("mousedown","b",function(){var e=t(this),n=e.closest("tr"),r=n.find("td:nth-child(2)").text(),i=!n.hasClass("won"),s=+(new Date),o=setTimeout(function(){e.removeClass("hold"),i?d(r):v(r)},1500);e.addClass("hold").on("mouseup mouseleave",function(){o&&clearTimeout(o),setTimeout(function(){e.removeClass("hold")},800)})})})}(),_=function(){function t(){return e?document.documentElement.scrollTop:window.pageYOffset}function r(e,r){if(e.updateInitiated)return;var i=t();if(i==n)return;var s=document.documentElement.scrollHeight,o=document.documentElement.clientHeight;s-(i+o)<e.options.distance&&(e.updateInitiated=!0,e.options.callback(function(){e.updateInitiated=!1})),n=i}var e=/msie/gi.test(navigator.userAgent);return function(e){var t={callback:function(){},distance:50};for(var n in t)typeof e[n]=="undefined"&&(e[n]=t[n]);var i={options:e,updateInitiated:!1};window.onscroll=function(e){r(i,e)},document.ontouchmove=function(e){r(i,e)}};var n}(),D=function(e){function d(e){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()]}function v(e){return[e.getMonth()+1,e.getDate(),String(e.getFullYear()).substr(2)].join("/")}function m(e){var n=k(e.date),r=d(n),i=v(n),s=e.user_id?e.user_firstname+" "+e.user_lastname+' &lt;<a href="mailto:'+e.user_email+'">'+e.user_email+"</a>&gt;":"—";return t("<tr>").append(t("<td>").html(i)).append(t("<td>").html(r)).append(t("<td>").html('<a href="/admin/prize/'+e.prize_id+"#"+e.date+'">'+e.prize_title+"</a>")).append(t("<td>").html("$"+e.prize_value+" Gift Card"+(e["prize_type"]=="prize"?" or Prize":""))).append(t("<td>").html(s))}function g(e){function s(n,i,s){e&&r.empty();var o=0;if(!n.contests){h=!0,p=!1;return}t.each(n.contests,function(e,t){o++,r.append(m(t))}),l+=o,p=!1}if(p)return;p=!0;if(!e&&h){p=!1;return}e&&(h=!1,l=0),t.ajax({url:n,data:{limit:f,offset:l,reverse:a.hasClass("reverse")?1:0,query:i.val()},type:"get",dataType:"json"}).done(s)}function y(){i.val(""),s.removeClass("active"),g(!0)}var n="/admin/contests",r,i,s,o,u,a,f,l,h,p;N(function(){r=t("table#contests tbody");if(!r.length)return;a=r.parent().find("a#reverse"),i=r.parent().find('input[name="query"]'),s=i.parent(),o=s.find("b"),u=s.find("i");var n=r.children();l=f=n.length,e({distance:1e3,callback:function(e){g(),e()}}),a.on("click",function(){a.toggleClass("reverse"),g(!0)}),i.on("keyup",function(e){s[(i.val().length?"add":"remove")+"Class"]("active");if(e.keyCode==27){y();return}e.keyCode==13&&g(!0)}),o.on(c,y),u.on(c,function(){g(!0)})})}(_),P=function(){N(function(){$forms=t("table#thanks form");if(!$forms.length)return;$forms.each(function(e,n){var r=t(n),i=r.find('input[type="submit"]');r.on("submit",function(){return i.attr("disabled",!0),t.ajax({url:r.attr("action"),method:"POST",dataType:"json",data:{b64thanks:btoa(r.find("textarea").val())}}).done(function(e,t,n){i.attr("disabled",null)}).fail(function(){i.attr("disabled",null)}),!1})})})}(),H=function(){(function(e,t){function n(){return new Date(Date.UTC.apply(Date,arguments))}function r(){var e=new Date;return n(e.getFullYear(),e.getMonth(),e.getDate())}function i(e,t){return e.getUTCFullYear()===t.getUTCFullYear()&&e.getUTCMonth()===t.getUTCMonth()&&e.getUTCDate()===t.getUTCDate()}function s(e){return function(){return this[e].apply(this,arguments)}}function f(t,n){function u(e,t){return t.toLowerCase()}var r=e(t).data(),i={},s,o=new RegExp("^"+n.toLowerCase()+"([A-Z])");n=new RegExp("^"+n.toLowerCase());for(var a in r)n.test(a)&&(s=a.replace(o,u),i[s]=r[a]);return i}function l(t){var n={};if(!v[t]){t=t.split("-")[0];if(!v[t])return}var r=v[t];return e.each(d,function(e,t){t in r&&(n[t]=r[t])}),n}var o=function(){var t={get:function(e){return this.slice(e)[0]},contains:function(e){var t=e&&e.valueOf();for(var n=0,r=this.length;n<r;n++)if(this[n].valueOf()===t)return n;return-1},remove:function(e){this.splice(e,1)},replace:function(t){if(!t)return;e.isArray(t)||(t=[t]),this.clear(),this.push.apply(this,t)},clear:function(){this.length=0},copy:function(){var e=new o;return e.replace(this),e}};return function(){var n=[];return n.push.apply(n,arguments),e.extend(n,t),n}}(),u=function(t,n){this._process_options(n),this.dates=new o,this.viewDate=this.o.defaultViewDate,this.focusDate=null,this.element=e(t),this.isInline=!1,this.isInput=this.element.is("input"),this.component=this.element.hasClass("date")?this.element.find(".add-on, .input-group-addon, .btn"):!1,this.hasInput=this.component&&this.element.find("input").length,this.component&&this.component.length===0&&(this.component=!1),this.picker=e(m.template),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("tfoot .today, tfoot .clear").attr("colspan",function(e,t){return parseInt(t)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.setDatesDisabled(this.o.datesDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};u.prototype={constructor:u,_process_options:function(i){this._o=e.extend({},this._o,i);var s=this.o=e.extend({},this._o),o=s.language;v[o]||(o=o.split("-")[0],v[o]||(o=p.language)),s.language=o;switch(s.startView){case 2:case"decade":s.startView=2;break;case 1:case"year":s.startView=1;break;default:s.startView=0}switch(s.minViewMode){case 1:case"months":s.minViewMode=1;break;case 2:case"years":s.minViewMode=2;break;default:s.minViewMode=0}s.startView=Math.max(s.startView,s.minViewMode),s.multidate!==!0&&(s.multidate=Number(s.multidate)||!1,s.multidate!==!1&&(s.multidate=Math.max(0,s.multidate))),s.multidateSeparator=String(s.multidateSeparator),s.weekStart%=7,s.weekEnd=(s.weekStart+6)%7;var u=m.parseFormat(s.format);s.startDate!==-Infinity&&(s.startDate?s.startDate instanceof Date?s.startDate=this._local_to_utc(this._zero_time(s.startDate)):s.startDate=m.parseDate(s.startDate,u,s.language):s.startDate=-Infinity),s.endDate!==Infinity&&(s.endDate?s.endDate instanceof Date?s.endDate=this._local_to_utc(this._zero_time(s.endDate)):s.endDate=m.parseDate(s.endDate,u,s.language):s.endDate=Infinity),s.daysOfWeekDisabled=s.daysOfWeekDisabled||[],e.isArray(s.daysOfWeekDisabled)||(s.daysOfWeekDisabled=s.daysOfWeekDisabled.split(/[,\s]*/)),s.daysOfWeekDisabled=e.map(s.daysOfWeekDisabled,function(e){return parseInt(e,10)}),s.datesDisabled=s.datesDisabled||[];if(!e.isArray(s.datesDisabled)){var a=[];a.push(m.parseDate(s.datesDisabled,u,s.language)),s.datesDisabled=a}s.datesDisabled=e.map(s.datesDisabled,function(e){return m.parseDate(e,u,s.language)});var f=String(s.orientation).toLowerCase().split(/\s+/g),l=s.orientation.toLowerCase();f=e.grep(f,function(e){return/^auto|left|right|top|bottom$/.test(e)}),s.orientation={x:"auto",y:"auto"};if(!!l&&l!=="auto")if(f.length===1)switch(f[0]){case"top":case"bottom":s.orientation.y=f[0];break;case"left":case"right":s.orientation.x=f[0]}else l=e.grep(f,function(e){return/^left|right$/.test(e)}),s.orientation.x=l[0]||"auto",l=e.grep(f,function(e){return/^top|bottom$/.test(e)}),s.orientation.y=l[0]||"auto";if(s.defaultViewDate){var c=s.defaultViewDate.year||(new Date).getFullYear(),h=s.defaultViewDate.month||0,d=s.defaultViewDate.day||1;s.defaultViewDate=n(c,h,d)}else s.defaultViewDate=r();s.showOnFocus=s.showOnFocus!==t?s.showOnFocus:!0},_events:[],_secondaryEvents:[],_applyEvents:function(e){for(var n=0,r,i,s;n<e.length;n++)r=e[n][0],e[n].length===2?(i=t,s=e[n][1]):e[n].length===3&&(i=e[n][1],s=e[n][2]),r.on(s,i)},_unapplyEvents:function(e){for(var n=0,r,i,s;n<e.length;n++)r=e[n][0],e[n].length===2?(s=t,i=e[n][1]):e[n].length===3&&(s=e[n][1],i=e[n][2]),r.off(i,s)},_buildEvents:function(){var t={keyup:e.proxy(function(t){e.inArray(t.keyCode,[27,37,39,38,40,32,13,9])===-1&&this.update()},this),keydown:e.proxy(this.keydown,this)};this.o.showOnFocus===!0&&(t.focus=e.proxy(this.show,this)),this.isInput?this._events=[[this.element,t]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),t],[this.component,{click:e.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:e.proxy(this.show,this)}]],this._events.push([this.element,"*",{blur:e.proxy(function(e){this._focused_from=e.target},this)}],[this.element,{blur:e.proxy(function(e){this._focused_from=e.target},this)}]),this._secondaryEvents=[[this.picker,{click:e.proxy(this.click,this)}],[e(window),{resize:e.proxy(this.place,this)}],[e(document),{"mousedown touchstart":e.proxy(function(e){this.element.is(e.target)||this.element.find(e.target).length||this.picker.is(e.target)||this.picker.find(e.target).length||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(t,n){var r=n||this.dates.get(-1),i=this._utc_to_local(r);this.element.trigger({type:t,date:i,dates:e.map(this.dates,this._utc_to_local),format:e.proxy(function(e,t){arguments.length===0?(e=this.dates.length-1,t=this.o.format):typeof e=="string"&&(t=e,e=this.dates.length-1),t=t||this.o.format;var n=this.dates.get(e);return m.formatDate(n,t,this.o.language)},this)})},show:function(){if(this.element.attr("readonly")&&this.o.enableOnReadonly===!1)return;return this.isInline||this.picker.appendTo(this.o.container),this.place(),this.picker.show(),this._attachSecondaryEvents(),this._trigger("show"),(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&this.o.disableTouchKeyboard&&e(this.element).blur(),this},hide:function(){return this.isInline?this:this.picker.is(":visible")?(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide"),this):this},remove:function(){return this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date,this},_utc_to_local:function(e){return e&&new Date(e.getTime()+e.getTimezoneOffset()*6e4)},_local_to_utc:function(e){return e&&new Date(e.getTime()-e.getTimezoneOffset()*6e4)},_zero_time:function(e){return e&&new Date(e.getFullYear(),e.getMonth(),e.getDate())},_zero_utc_time:function(e){return e&&new Date(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate()))},getDates:function(){return e.map(this.dates,this._utc_to_local)},getUTCDates:function(){return e.map(this.dates,function(e){return new Date(e)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){var e=this.dates.get(-1);return typeof e!="undefined"?new Date(e):null},clearDates:function(){var e;this.isInput?e=this.element:this.component&&(e=this.element.find("input")),e&&e.val("").change(),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()},setDates:function(){var t=e.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,t),this._trigger("changeDate"),this.setValue(),this},setUTCDates:function(){var t=e.isArray(arguments[0])?arguments[0]:arguments;return this.update.apply(this,e.map(t,this._utc_to_local)),this._trigger("changeDate"),this.setValue(),this},setDate:s("setDates"),setUTCDate:s("setUTCDates"),setValue:function(){var e=this.getFormattedDate();return this.isInput?this.element.val(e).change():this.component&&this.element.find("input").val(e).change(),this},getFormattedDate:function(n){n===t&&(n=this.o.format);var r=this.o.language;return e.map(this.dates,function(e){return m.formatDate(e,n,r)}).join(this.o.multidateSeparator)},setStartDate:function(e){return this._process_options({startDate:e}),this.update(),this.updateNavArrows(),this},setEndDate:function(e){return this._process_options({endDate:e}),this.update(),this.updateNavArrows(),this},setDaysOfWeekDisabled:function(e){return this._process_options({daysOfWeekDisabled:e}),this.update(),this.updateNavArrows(),this},setDatesDisabled:function(e){this._process_options({datesDisabled:e}),this.update(),this.updateNavArrows()},place:function(){if(this.isInline)return this;var t=this.picker.outerWidth(),n=this.picker.outerHeight(),r=10,i=e(this.o.container).width(),s=e(this.o.container).height(),o=e(this.o.container).scrollTop(),u=e(this.o.container).offset(),a=[];this.element.parents().each(function(){var t=e(this).css("z-index");t!=="auto"&&t!==0&&a.push(parseInt(t))});var f=Math.max.apply(Math,a)+10,l=this.component?this.component.parent().offset():this.element.offset(),c=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),h=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),p=l.left-u.left,d=l.top-u.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),this.o.orientation.x!=="auto"?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),this.o.orientation.x==="right"&&(p-=t-h)):l.left<0?(this.picker.addClass("datepicker-orient-left"),p-=l.left-r):p+t>i?(this.picker.addClass("datepicker-orient-right"),p=l.left+h-t):this.picker.addClass("datepicker-orient-left");var v=this.o.orientation.y,m,g;v==="auto"&&(m=-o+d-n,g=o+s-(d+c+n),Math.max(m,g)===g?v="top":v="bottom"),this.picker.addClass("datepicker-orient-"+v),v==="top"?d+=c:d-=n+parseInt(this.picker.css("padding-top"));if(this.o.rtl){var y=i-(p+h);this.picker.css({top:d,right:y,zIndex:f})}else this.picker.css({top:d,left:p,zIndex:f});return this},_allow_update:!0,update:function(){if(!this._allow_update)return this;var t=this.dates.copy(),n=[],r=!1;return arguments.length?(e.each(arguments,e.proxy(function(e,t){t instanceof Date&&(t=this._local_to_utc(t)),n.push(t)},this)),r=!0):(n=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val(),n&&this.o.multidate?n=n.split(this.o.multidateSeparator):n=[n],delete this.element.data().date),n=e.map(n,e.proxy(function(e){return m.parseDate(e,this.o.format,this.o.language)},this)),n=e.grep(n,e.proxy(function(e){return e<this.o.startDate||e>this.o.endDate||!e},this),!0),this.dates.replace(n),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate&&(this.viewDate=new Date(this.o.endDate)),r?this.setValue():n.length&&String(t)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&t.length&&this._trigger("clearDate"),this.fill(),this},fillDow:function(){var e=this.o.weekStart,t="<tr>";if(this.o.calendarWeeks){this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan",function(e,t){return parseInt(t)+1});var n='<th class="cw">&#160;</th>';t+=n}while(e<this.o.weekStart+7)t+='<th class="dow">'+v[this.o.language].daysMin[e++%7]+"</th>";t+="</tr>",this.picker.find(".datepicker-days thead").append(t)},fillMonths:function(){var e="",t=0;while(t<12)e+='<span class="month">'+v[this.o.language].monthsShort[t++]+"</span>";this.picker.find(".datepicker-months td").html(e)},setRange:function(t){!t||!t.length?delete this.range:this.range=e.map(t,function(e){return e.valueOf()}),this.fill()},getClassNames:function(t){var n=[],r=this.viewDate.getUTCFullYear(),s=this.viewDate.getUTCMonth(),o=new Date;return t.getUTCFullYear()<r||t.getUTCFullYear()===r&&t.getUTCMonth()<s?n.push("old"):(t.getUTCFullYear()>r||t.getUTCFullYear()===r&&t.getUTCMonth()>s)&&n.push("new"),this.focusDate&&t.valueOf()===this.focusDate.valueOf()&&n.push("focused"),this.o.todayHighlight&&t.getUTCFullYear()===o.getFullYear()&&t.getUTCMonth()===o.getMonth()&&t.getUTCDate()===o.getDate()&&n.push("today"),this.dates.contains(t)!==-1&&n.push("active"),(t.valueOf()<this.o.startDate||t.valueOf()>this.o.endDate||e.inArray(t.getUTCDay(),this.o.daysOfWeekDisabled)!==-1)&&n.push("disabled"),this.o.datesDisabled.length>0&&e.grep(this.o.datesDisabled,function(e){return i(t,e)}).length>0&&n.push("disabled","disabled-date"),this.range&&(t>this.range[0]&&t<this.range[this.range.length-1]&&n.push("range"),e.inArray(t.valueOf(),this.range)!==-1&&n.push("selected")),n},fill:function(){var r=new Date(this.viewDate),i=r.getUTCFullYear(),s=r.getUTCMonth(),o=this.o.startDate!==-Infinity?this.o.startDate.getUTCFullYear():-Infinity,u=this.o.startDate!==-Infinity?this.o.startDate.getUTCMonth():-Infinity,a=this.o.endDate!==Infinity?this.o.endDate.getUTCFullYear():Infinity,f=this.o.endDate!==Infinity?this.o.endDate.getUTCMonth():Infinity,l=v[this.o.language].today||v.en.today||"",c=v[this.o.language].clear||v.en.clear||"",h;if(isNaN(i)||isNaN(s))return;this.picker.find(".datepicker-days thead .datepicker-switch").text(v[this.o.language].months[s]+" "+i),this.picker.find("tfoot .today").text(l).toggle(this.o.todayBtn!==!1),this.picker.find("tfoot .clear").text(c).toggle(this.o.clearBtn!==!1),this.updateNavArrows(),this.fillMonths();var p=n(i,s-1,28),d=m.getDaysInMonth(p.getUTCFullYear(),p.getUTCMonth());p.setUTCDate(d),p.setUTCDate(d-(p.getUTCDay()-this.o.weekStart+7)%7);var g=new Date(p);g.setUTCDate(g.getUTCDate()+42),g=g.valueOf();var y=[],b;while(p.valueOf()<g){if(p.getUTCDay()===this.o.weekStart){y.push("<tr>");if(this.o.calendarWeeks){var w=new Date(+p+(this.o.weekStart-p.getUTCDay()-7)%7*864e5),E=new Date(Number(w)+(11-w.getUTCDay())%7*864e5),S=new Date(Number(S=n(E.getUTCFullYear(),0,1))+(11-S.getUTCDay())%7*864e5),x=(E-S)/864e5/7+1;y.push('<td class="cw">'+x+"</td>")}}b=this.getClassNames(p),b.push("day");if(this.o.beforeShowDay!==e.noop){var T=this.o.beforeShowDay(this._utc_to_local(p));T===t?T={}:typeof T=="boolean"?T={enabled:T}:typeof T=="string"&&(T={classes:T}),T.enabled===!1&&b.push("disabled"),T.classes&&(b=b.concat(T.classes.split(/\s+/))),T.tooltip&&(h=T.tooltip)}b=e.unique(b),y.push('<td class="'+b.join(" ")+'"'+(h?' title="'+h+'"':"")+">"+p.getUTCDate()+"</td>"),h=null,p.getUTCDay()===this.o.weekEnd&&y.push("</tr>"),p.setUTCDate(p.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(y.join(""));var N=this.picker.find(".datepicker-months").find("th:eq(1)").text(i).end().find("span").removeClass("active");e.each(this.dates,function(e,t){t.getUTCFullYear()===i&&N.eq(t.getUTCMonth()).addClass("active")}),(i<o||i>a)&&N.addClass("disabled"),i===o&&N.slice(0,u).addClass("disabled"),i===a&&N.slice(f+1).addClass("disabled");if(this.o.beforeShowMonth!==e.noop){var C=this;e.each(N,function(t,n){if(!e(n).hasClass("disabled")){var r=new Date(i,t,1),s=C.o.beforeShowMonth(r);s===!1&&e(n).addClass("disabled")}})}y="",i=parseInt(i/10,10)*10;var k=this.picker.find(".datepicker-years").find("th:eq(1)").text(i+"-"+(i+9)).end().find("td");i-=1;var L=e.map(this.dates,function(e){return e.getUTCFullYear()}),A;for(var O=-1;O<11;O++)A=["year"],O===-1?A.push("old"):O===10&&A.push("new"),e.inArray(i,L)!==-1&&A.push("active"),(i<o||i>a)&&A.push("disabled"),y+='<span class="'+A.join(" ")+'">'+i+"</span>",i+=1;k.html(y)},updateNavArrows:function(){if(!this._allow_update)return;var e=new Date(this.viewDate),t=e.getUTCFullYear(),n=e.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-Infinity&&t<=this.o.startDate.getUTCFullYear()&&n<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==Infinity&&t>=this.o.endDate.getUTCFullYear()&&n>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.o.startDate!==-Infinity&&t<=this.o.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==Infinity&&t>=this.o.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}},click:function(t){t.preventDefault();var r=e(t.target).closest("span, td, th"),i,s,o;if(r.length===1)switch(r[0].nodeName.toLowerCase()){case"th":switch(r[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var u=m.modes[this.viewMode].navStep*(r[0].className==="prev"?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,u),this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,u),this.viewMode===1&&this._trigger("changeYear",this.viewDate)}this.fill();break;case"today":var a=new Date;a=n(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0),this.showMode(-2);var f=this.o.todayBtn==="linked"?null:"view";this._setDate(a,f);break;case"clear":this.clearDates()}break;case"span":r.hasClass("disabled")||(this.viewDate.setUTCDate(1),r.hasClass("month")?(o=1,s=r.parent().find("span").index(r),i=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(s),this._trigger("changeMonth",this.viewDate),this.o.minViewMode===1&&this._setDate(n(i,s,o))):(o=1,s=0,i=parseInt(r.text(),10)||0,this.viewDate.setUTCFullYear(i),this._trigger("changeYear",this.viewDate),this.o.minViewMode===2&&this._setDate(n(i,s,o))),this.showMode(-1),this.fill());break;case"td":r.hasClass("day")&&!r.hasClass("disabled")&&(o=parseInt(r.text(),10)||1,i=this.viewDate.getUTCFullYear(),s=this.viewDate.getUTCMonth(),r.hasClass("old")?s===0?(s=11,i-=1):s-=1:r.hasClass("new")&&(s===11?(s=0,i+=1):s+=1),this._setDate(n(i,s,o)))}this.picker.is(":visible")&&this._focused_from&&e(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(e){var t=this.dates.contains(e);e||this.dates.clear(),t!==-1?(this.o.multidate===!0||this.o.multidate>1||this.o.toggleActive)&&this.dates.remove(t):this.o.multidate===!1?(this.dates.clear(),this.dates.push(e)):this.dates.push(e);if(typeof this.o.multidate=="number")while(this.dates.length>this.o.multidate)this.dates.remove(0)},_setDate:function(e,t){(!t||t==="date")&&this._toggle_multidate(e&&new Date(e));if(!t||t==="view")this.viewDate=e&&new Date(e);this.fill(),this.setValue(),(!t||t!=="view")&&this._trigger("changeDate");var n;this.isInput?n=this.element:this.component&&(n=this.element.find("input")),n&&n.change(),this.o.autoclose&&(!t||t==="date")&&this.hide()},moveMonth:function(e,n){if(!e)return t;if(!n)return e;var r=new Date(e.valueOf()),i=r.getUTCDate(),s=r.getUTCMonth(),o=Math.abs(n),u,a;n=n>0?1:-1;if(o===1){a=n===-1?function(){return r.getUTCMonth()===s}:function(){return r.getUTCMonth()!==u},u=s+n,r.setUTCMonth(u);if(u<0||u>11)u=(u+12)%12}else{for(var f=0;f<o;f++)r=this.moveMonth(r,n);u=r.getUTCMonth(),r.setUTCDate(i),a=function(){return u!==r.getUTCMonth()}}while(a())r.setUTCDate(--i),r.setUTCMonth(u);return r},moveYear:function(e,t){return this.moveMonth(e,t*12)},dateWithinRange:function(e){return e>=this.o.startDate&&e<=this.o.endDate},keydown:function(e){if(!this.picker.is(":visible")){e.keyCode===27&&this.show();return}var t=!1,n,i,s,o=this.focusDate||this.viewDate;switch(e.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),e.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;n=e.keyCode===37?-1:1,e.ctrlKey?(i=this.moveYear(this.dates.get(-1)||r(),n),s=this.moveYear(o,n),this._trigger("changeYear",this.viewDate)):e.shiftKey?(i=this.moveMonth(this.dates.get(-1)||r(),n),s=this.moveMonth(o,n),this._trigger("changeMonth",this.viewDate)):(i=new Date(this.dates.get(-1)||r()),i.setUTCDate(i.getUTCDate()+n),s=new Date(o),s.setUTCDate(o.getUTCDate()+n)),this.dateWithinRange(s)&&(this.focusDate=this.viewDate=s,this.setValue(),this.fill(),e.preventDefault());break;case 38:case 40:if(!this.o.keyboardNavigation)break;n=e.keyCode===38?-1:1,e.ctrlKey?(i=this.moveYear(this.dates.get(-1)||r(),n),s=this.moveYear(o,n),this._trigger("changeYear",this.viewDate)):e.shiftKey?(i=this.moveMonth(this.dates.get(-1)||r(),n),s=this.moveMonth(o,n),this._trigger("changeMonth",this.viewDate)):(i=new Date(this.dates.get(-1)||r()),i.setUTCDate(i.getUTCDate()+n*7),s=new Date(o),s.setUTCDate(o.getUTCDate()+n*7)),this.dateWithinRange(s)&&(this.focusDate=this.viewDate=s,this.setValue(),this.fill(),e.preventDefault());break;case 32:break;case 13:o=this.focusDate||this.dates.get(-1)||this.viewDate,this.o.keyboardNavigation&&(this._toggle_multidate(o),t=!0),this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(e.preventDefault(),typeof e.stopPropagation=="function"?e.stopPropagation():e.cancelBubble=!0,this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}if(t){this.dates.length?this._trigger("changeDate"):this._trigger("clearDate");var u;this.isInput?u=this.element:this.component&&(u=this.element.find("input")),u&&u.change()}},showMode:function(e){e&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+e))),this.picker.children("div").hide().filter(".datepicker-"+m.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}};var a=function(t,n){this.element=e(t),this.inputs=e.map(n.inputs,function(e){return e.jquery?e[0]:e}),delete n.inputs,h.call(e(this.inputs),n).bind("changeDate",e.proxy(this.dateUpdated,this)),this.pickers=e.map(this.inputs,function(t){return e(t).data("datepicker")}),this.updateDates()};a.prototype={updateDates:function(){this.dates=e.map(this.pickers,function(e){return e.getUTCDate()}),this.updateRanges()},updateRanges:function(){var t=e.map(this.dates,function(e){return e.valueOf()});e.each(this.pickers,function(e,n){n.setRange(t)})},dateUpdated:function(t){if(this.updating)return;this.updating=!0;var n=e(t.target).data("datepicker"),r=n.getUTCDate(),i=e.inArray(t.target,this.inputs),s=i-1,o=i+1,u=this.inputs.length;if(i===-1)return;e.each(this.pickers,function(e,t){t.getUTCDate()||t.setUTCDate(r)});if(r<this.dates[s])while(s>=0&&r<this.dates[s])this.pickers[s--].setUTCDate(r);else if(r>this.dates[o])while(o<u&&r>this.dates[o])this.pickers[o++].setUTCDate(r);this.updateDates(),delete this.updating},remove:function(){e.map(this.pickers,function(e){e.remove()}),delete this.element.data().datepicker}};var c=e.fn.datepicker,h=function(n){var r=Array.apply(null,arguments);r.shift();var i;return this.each(function(){var s=e(this),o=s.data("datepicker"),c=typeof n=="object"&&n;if(!o){var h=f(this,"date"),d=e.extend({},p,h,c),v=l(d.language),m=e.extend({},p,v,h,c);if(s.hasClass("input-daterange")||m.inputs){var g={inputs:m.inputs||s.find("input").toArray()};s.data("datepicker",o=new a(this,e.extend(m,g)))}else s.data("datepicker",o=new u(this,m))}if(typeof n=="string"&&typeof o[n]=="function"){i=o[n].apply(o,r);if(i!==t)return!1}}),i!==t?i:this};e.fn.datepicker=h;var p=e.fn.datepicker.defaults={autoclose:!1,beforeShowDay:e.noop,beforeShowMonth:e.noop,calendarWeeks:!1,clearBtn:!1,toggleActive:!1,daysOfWeekDisabled:[],datesDisabled:[],endDate:Infinity,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-Infinity,startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0,disableTouchKeyboard:!1,enableOnReadonly:!0,container:"body"},d=e.fn.datepicker.locale_opts=["format","rtl","weekStart"];e.fn.datepicker.Constructor=u;var v=e.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}},m={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(e){return e%4===0&&e%100!==0||e%400===0},getDaysInMonth:function(e,t){return[31,m.isLeapYear(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(e){var t=e.replace(this.validParts,"\0").split("\0"),n=e.match(this.validParts);if(!t||!t.length||!n||n.length===0)throw new Error("Invalid date format.");return{separators:t,parts:n}},parseDate:function(r,i,s){function w(){var e=this.slice(0,a[c].length),t=a[c].slice(0,e.length);return e.toLowerCase()===t.toLowerCase()}if(!r)return t;if(r instanceof Date)return r;typeof i=="string"&&(i=m.parseFormat(i));var o=/([\-+]\d+)([dmwy])/,a=r.match(/([\-+]\d+)([dmwy])/g),f,l,c;if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(r)){r=new Date;for(c=0;c<a.length;c++){f=o.exec(a[c]),l=parseInt(f[1]);switch(f[2]){case"d":r.setUTCDate(r.getUTCDate()+l);break;case"m":r=u.prototype.moveMonth.call(u.prototype,r,l);break;case"w":r.setUTCDate(r.getUTCDate()+l*7);break;case"y":r=u.prototype.moveYear.call(u.prototype,r,l)}}return n(r.getUTCFullYear(),r.getUTCMonth(),r.getUTCDate(),0,0,0)}a=r&&r.match(this.nonpunctuation)||[],r=new Date;var h={},p=["yyyy","yy","M","MM","m","mm","d","dd"],d={yyyy:function(e,t){return e.setUTCFullYear(t)},yy:function(e,t){return e.setUTCFullYear(2e3+t)},m:function(e,t){if(isNaN(e))return e;t-=1;while(t<0)t+=12;t%=12,e.setUTCMonth(t);while(e.getUTCMonth()!==t)e.setUTCDate(e.getUTCDate()-1);return e},d:function(e,t){return e.setUTCDate(t)}},g,y;d.M=d.MM=d.mm=d.m,d.dd=d.d,r=n(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0);var b=i.parts.slice();a.length!==b.length&&(b=e(b).filter(function(t,n){return e.inArray(n,p)!==-1}).toArray());if(a.length===b.length){var E;for(c=0,E=b.length;c<E;c++){g=parseInt(a[c],10),f=b[c];if(isNaN(g))switch(f){case"MM":y=e(v[s].months).filter(w),g=e.inArray(y[0],v[s].months)+1;break;case"M":y=e(v[s].monthsShort).filter(w),g=e.inArray(y[0],v[s].monthsShort)+1}h[f]=g}var S,x;for(c=0;c<p.length;c++)x=p[c],x in h&&!isNaN(h[x])&&(S=new Date(r),d[x](S,h[x]),isNaN(S)||(r=S))}return r},formatDate:function(t,n,r){if(!t)return"";typeof n=="string"&&(n=m.parseFormat(n));var i={d:t.getUTCDate(),D:v[r].daysShort[t.getUTCDay()],DD:v[r].days[t.getUTCDay()],m:t.getUTCMonth()+1,M:v[r].monthsShort[t.getUTCMonth()],MM:v[r].months[t.getUTCMonth()],yy:t.getUTCFullYear().toString().substring(2),yyyy:t.getUTCFullYear()};i.dd=(i.d<10?"0":"")+i.d,i.mm=(i.m<10?"0":"")+i.m,t=[];var s=e.extend([],n.separators);for(var o=0,u=n.parts.length;o<=u;o++)s.length&&t.push(s.shift()),t.push(i[n.parts[o]]);return t.join("")},headTemplate:'<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};m.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+m.headTemplate+"<tbody></tbody>"+m.footTemplate+"</table>"+"</div>"+'<div class="datepicker-months">'+'<table class="table-condensed">'+m.headTemplate+m.contTemplate+m.footTemplate+"</table>"+"</div>"+'<div class="datepicker-years">'+'<table class="table-condensed">'+m.headTemplate+m.contTemplate+m.footTemplate+"</table>"+"</div>"+"</div>",e.fn.datepicker.DPGlobal=m,e.fn.datepicker.noConflict=function(){return e.fn.datepicker=c,this},e.fn.datepicker.version="1.5.0",e(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(t){var n=e(this);if(n.data("datepicker"))return;t.preventDefault(),h.call(n,"show")}),e(function(){h.call(e('[data-provide="datepicker-inline"]'))})})(window.jQuery)}(),B=function(e){function n(){var e=[],r;return arguments.length?(Array.prototype.push.apply(e,arguments),r=e.shift(),r&&r in n&&t.isFunction(n[r])?n[r].apply(this,e):!1):!1}return n}(x);var j,F=0;(function I(){if(!e[t]){F++||(j=setInterval(I,16));return}j&&clearInterval(j),t=e[t],e[n]&&e[n].q&&e[n].q.forEach(function(t){B.apply(e,t)}),e[n]=B,t(N.fire)})()})(window,"jQuery","admin");