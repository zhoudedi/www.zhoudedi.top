var xinname	=location.search.split("=")[1];

if(!xinname){
	xinname="某人";
}
else{
	xinname=unescape(xinname);
}
var ainame=location.search.split("=")[2];
if(!ainame){
	ainame="雅林";
}
else{
	ainame=unescape(ainame);
}

function check(obj){
	if (obj.xin.value.length>12) {
		alert('哪国的名字？太长了！'); 
		return false;
	}
	if (obj.xin.value.length==0) {
		alert('你的心上人没有名字吗？'); 
		return false;
	}
    if (obj.ai.value.length>12) {
		alert('哪国的名字？太长了！'); 
		return false;
	}
	if (obj.ai.value.length==0) {
		alert('难道你连名字都不敢留下吗？'); 
		return false;
	}
	var url	=location.protocol + "//" + location.host + location.pathname+"?xin="+escape(obj.xin.value)+"ai="+escape(obj.ai.value);
	window.clipboardData.setData("Text",url);
	alert('网址已生成并替您复制好了，直接粘贴到QQ、MSN、邮箱就可以发给你的心上人了\n\n 快快发送吧！');
	window.location.replace(url);
	return false;
}
