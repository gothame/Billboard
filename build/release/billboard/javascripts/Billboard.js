(function(e,t){var n=e.document,r=function(t){var n=!0;if(n){t=t||{};var r="wdj://window/log.json",i=[],s;for(s in t)t.hasOwnProperty(s)&&i.push(s+"="+e.encodeURIComponent(t[s]));r+="?"+i.join("&"),e.OneRingRequest("get",r,"",function(e){e=JSON.parse(e),e.state_code===200&&console.log("Log: ",r)})}},i=function(t){var n=$.Deferred(),r=t.url;t.data=t.data||{};var i=function(e){n.resolve(e)},s=[],o;for(o in t.data)t.data.hasOwnProperty(o)&&s.push(o+"="+e.encodeURIComponent(t.data[o]));return s.length>0&&(r=r+"?"+s.join("&")),e.OneRingRequest("get",r,null,i),n.promise()};$(".list-ctn").masonry({itemSelector:"li"}),$(e).on("resize",function(){$(".wrap").width(Math.floor($(this).width()/220)*220+2),$(".wrap").height(Math.floor($(this).height()/220)*220+25)}),$(".wrap").width(Math.floor($(this).width()/220)*220+2),$(".wrap").height(Math.floor($(this).height()/220)*220+25);var s=function(e,t){i({url:"wdj://window/publish.json",data:{value:JSON.stringify({type:"ext",id:e,url:t||""}),channel:"billborad.navigate"}})},o=function(e,t,n){i({url:"wdj://window/publish.json",data:{value:JSON.stringify({type:"download",url:e,name:t,icon:n}),channel:"billborad.navigate"}})};$(n).on("click",".list-ctn li > span",function(){var e=$(this),t=e.attr("data-type"),n=e.attr("data-extension-id"),i=e.attr("data-url")||"",u=e.attr("data-name")||"",a=e.attr("data-icon")||"",f=e.attr("data-package")||"";switch(t){case"extension":s(n,i);break;case"wandoujia":s(18,i);break;case"download":o(i,u,a)}r({event:"ui.click.welcome.billborad.item",action:t,content:n||u})})})(this),define("Billboard",[],function(){})