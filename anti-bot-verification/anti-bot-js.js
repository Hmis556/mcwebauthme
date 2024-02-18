function anti_bot_verification_ini(t){anti_bot_verification_path=t;var e=new XMLHttpRequest;e.onreadystatechange=function(){4===this.readyState&&200===this.status&&anti_bot_preload()},e.open("GET",anti_bot_verification_path+"/initialize.php",!0),e.send()}function anti_bot_preload(){anti_bot_icon='<div class="anti-bot-loading-large-circle"></div><div class="anti-bot-loading-small-circle"></div><div class="anti-bot-loading-cover-1"></div><div class="anti-bot-loading-arror"></div><div class="anti-bot-loading-cover-2"></div><div class="anti-bot-loading-cover-3"></div>',anti_bot_start_loading_status(null),anti_bot_large_picture=new Image,anti_bot_large_picture.src=anti_bot_verification_path+"/get-image.php?type=large_picture",anti_bot_large_picture.setAttribute("id","anti_bot_large_picture"),anti_bot_large_picture.setAttribute("draggable","false"),anti_bot_large_picture.style.boxShadow="0 0 2px 2px #aaa",anti_bot_large_picture.style.opacity=0,anti_bot_large_picture.onload=function(){anti_bot_small_picture=new Image,anti_bot_small_picture.src=anti_bot_verification_path+"/get-image.php?type=small_picture",anti_bot_small_picture.setAttribute("id","anti_bot_small_picture"),anti_bot_small_picture.setAttribute("draggable","false"),anti_bot_small_picture.setAttribute("unselectable","on"),anti_bot_small_picture.style.opacity=0,anti_bot_small_picture.onload=function(){var t=document.getElementById("anti_bot_frame");anti_bot_end_loading_status(function(){t.style.boxShadow="0 0 2px 2px #AAA";var e=document.createElement("div");e.setAttribute("class","anti-bot-loading-framework"),e.setAttribute("id","anti-bot-loading-framework"),e.innerHTML=anti_bot_icon,e.style.opacity=0,e.setAttribute("onclick","anti_bot_reload()"),t.appendChild(e),t.appendChild(anti_bot_large_picture),t.appendChild(anti_bot_small_picture),anti_bot_smallpic_ini_position={left:anti_bot_small_picture.offsetLeft,top:anti_bot_small_picture.offsetTop},anti_bot_start_mouse_monitor(),anti_bot_start_touchpoint_monitor();var i=0;!function t(){i+=.05;anti_bot_large_picture.style.opacity=i;anti_bot_small_picture.style.opacity=.7*i;e.style.opacity=i;i<1&&window.requestAnimationFrame(t)}()})}}}function anti_bot_start_mouse_monitor(){document.getElementById("anti_bot_frame").onselectstart=function(){return!1},document.getElementById("anti_bot_small_picture").onmousedown=function(t){var e=document.getElementById("anti_bot_frame");anti_bot_shadow_change(e,2,0,.2,"#AAA",function(){e.style.boxShadow="0 0 0 0"});var i=document.getElementById("anti_bot_small_picture"),n=document.getElementById("anti_bot_large_picture");anti_bot_shadow_change(n,2,0,.2,"#AAA",function(){n.style.boxShadow="0 0 0 0"});var o=t.clientX-i.offsetLeft,a=t.clientY-i.offsetTop;document.onmousemove=function(t){i.style.top=t.clientY-a+"px",i.style.left=t.clientX-o+"px"},document.onmouseup=function(t){document.onmousemove=null;var o=anti_bot_getCoordinateByElement(n);if(t.clientY>o.top&&t.clientY<o.bottom&&t.clientX>o.left&&t.clientX<o.right){var a=300*(i.offsetLeft-n.offsetLeft)/n.offsetWidth,_=200*(i.offsetTop-n.offsetTop)/n.offsetHeight;anti_bot_start_loading_status(function(){anti_bot_verify(a,_)})}else anti_bot_smallpic_moveback_to_original(i,anti_bot_smallpic_ini_position.left,anti_bot_smallpic_ini_position.top),anti_bot_shadow_change(e,0,2,.1,"#AAA",null),anti_bot_shadow_change(n,0,2,.1,"#aaa",null);document.onmouseup=null}}}function anti_bot_start_touchpoint_monitor(){document.getElementById("anti_bot_small_picture").ontouchstart=function(t){t.preventDefault();var e=document.getElementById("anti_bot_frame");anti_bot_shadow_change(e,2,0,.2,"#AAA",function(){e.style.boxShadow="0 0 0 0"});var i=document.getElementById("anti_bot_small_picture"),n=document.getElementById("anti_bot_large_picture");anti_bot_shadow_change(n,2,0,.2,"#AAA",function(){n.style.boxShadow="0 0 0 0"});var o=t.touches[0].clientX-i.offsetLeft,a=t.touches[0].clientY-i.offsetTop;document.ontouchmove=function(t){i.style.top=t.touches[0].clientY-a+"px",i.style.left=t.touches[0].clientX-o+"px"},document.ontouchend=function(t){document.ontouchmove=null;var o=anti_bot_getCoordinateByElement(n);if(t.changedTouches[0].clientY>o.top&&t.changedTouches[0].clientY<o.bottom&&t.changedTouches[0].clientX>o.left&&t.changedTouches[0].clientX<o.right){var a=300*(i.offsetLeft-n.offsetLeft)/n.offsetWidth,_=200*(i.offsetTop-n.offsetTop)/n.offsetHeight;anti_bot_start_loading_status(function(){anti_bot_verify(a,_)})}else anti_bot_smallpic_moveback_to_original(i,anti_bot_smallpic_ini_position.left,anti_bot_smallpic_ini_position.top),anti_bot_shadow_change(e,0,2,.1,"#AAA",null),anti_bot_shadow_change(n,0,2,.1,"#aaa",null);document.ontouchend=null}}}function anti_bot_getCoordinateByElement(t){var e=t.getBoundingClientRect().top,i=t.getBoundingClientRect().left;return{top:e,left:i,right:i+t.offsetWidth,bottom:e+t.offsetHeight}}function anti_bot_smallpic_moveback_to_original(t,e,i){var n=t.offsetLeft,o=t.offsetTop,a=0,_=0;if(n<e){a=e-n,window.requestAnimationFrame(function e(){t.style.left=t.offsetLeft+a/5+"px";a-=a/5;a>0&&window.requestAnimationFrame(e)})}else{a=n-e,window.requestAnimationFrame(function e(){t.style.left=t.offsetLeft-a/5+"px";a-=a/5;a>0&&window.requestAnimationFrame(e)})}if(o<i){_=i-o,window.requestAnimationFrame(function e(){t.style.top=t.offsetTop+_/5+"px";_-=_/5;_>0&&window.requestAnimationFrame(e)})}else{_=o-i,window.requestAnimationFrame(function e(){t.style.top=t.offsetTop-_/5+"px";_-=_/5;_>0&&window.requestAnimationFrame(e)})}}function anti_bot_verify(t,e){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4===this.readyState&&200===this.status){var t=document.getElementById("anti_bot_frame");if("1"===this.responseText){var e=new Image;e.src=anti_bot_verification_path+"/get-image.php?type=original_picture",e.setAttribute("id","anti_bot_large_picture"),e.onload=function(){t.removeChild(document.getElementById("anti-bot-loading-framework")),t.removeChild(document.getElementById("anti_bot_large_picture")),t.appendChild(e),t.removeChild(document.getElementById("anti_bot_small_picture"));var i=document.createElement("div");i.setAttribute("id","anti_bot_tick_area");var n=document.createElement("div");n.setAttribute("class","anti-bot-tick-framework"),n.innerHTML='<div class="anti-bot-tick-left"></div><div class="anti-bot-tick-right"></div><div class="anti-bot-tick-cover"></div>\n',i.appendChild(n),t.appendChild(i);var o=0;!function t(){i.style.opacity=o;o+=.05;o<1&&window.requestAnimationFrame(t)}(),anti_bot_end_loading_status(null)}}else anti_bot_smallpic_moveback_to_original(anti_bot_small_picture,anti_bot_smallpic_ini_position.left,anti_bot_smallpic_ini_position.top),anti_bot_shadow_change(t,0,2,.1,"#AAA",null),anti_bot_shadow_change(anti_bot_large_picture,0,2,.1,"#aaa",null),anti_bot_large_picture.src=anti_bot_verification_path+"/get-image.php?type=large_picture&nothing="+Math.random(),anti_bot_small_picture.src=anti_bot_verification_path+"/get-image.php?type=small_picture&nothing="+Math.random(),anti_bot_large_picture.onload=function(){anti_bot_small_picture.onload=function(){anti_bot_end_loading_status(null)}}}},i.open("GET",anti_bot_verification_path+"/verify.php?x="+t+"&y="+e,!0),i.send()}function anti_bot_reload(){var t=1,e=document.getElementById("anti_bot_frame");!function i(){t-=.05;e.style.opacity=t;t>0?window.requestAnimationFrame(i):(e.innerHTML="",e.style="",anti_bot_verification_ini(anti_bot_verification_path))}()}function anti_bot_start_loading_status(t){var e=document.createElement("div");e.setAttribute("id","anti_bot_loading_area");var i=document.createElement("div");i.setAttribute("class","anti_bot_loading_circle"),i.setAttribute("id","anti_bot_loading"),i.appendChild(document.createElement("div")),i.appendChild(document.createElement("div")),document.getElementById("anti_bot_frame").appendChild(e),e.appendChild(i);var n=document.getElementById("anti-bot-loading-framework");document.getElementById("anti_bot_frame").contains(n)&&(n.style.opacity=0);var o=0;!function n(){o+=.02;e.style.opacity=o;o<.6?window.requestAnimationFrame(n):(setTimeout(function(){e.removeChild(i);var t=document.createElement("div");t.setAttribute("class","anti-bot-loading-framework-large"),t.innerHTML=anti_bot_icon,t.setAttribute("onclick","anti_bot_reload()"),e.appendChild(t)},1e4),null!==t&&t())}()}function anti_bot_end_loading_status(t){var e=document.getElementById("anti_bot_loading_area"),i=.6,n=document.getElementById("anti-bot-loading-framework");document.getElementById("anti_bot_frame").contains(n)&&(n.style.opacity=1),function n(){i-=.02;e.style.opacity=i;i>0?window.requestAnimationFrame(n):(document.getElementById("anti_bot_frame").removeChild(e),null!==t&&t())}()}function anti_bot_shadow_change(t,e,i,n,o,a){var _=e<i;!function l(){t.style.boxShadow="0px 0px "+e+"px "+e+"px "+o;_?(e+=n)<i?window.requestAnimationFrame(l):null!==a&&a():(e-=n)>i?window.requestAnimationFrame(l):null!==a&&a()}()}