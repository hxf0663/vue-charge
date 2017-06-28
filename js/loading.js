var loader;
function init() {
	var manifest = [
		{id:"myPath_1", src:"images/bg.jpg"},
		{id:"myPath_2", src:"images/btn.png"},
		{id:"myPath_3", src:"images/rules.png"},
		{id:"myPath_4", src:"images/time.png"},
		{id:"myPath_5", src:"images/tit.png"},
		{id:"myPath_6", src:"images/info_bg.jpg"},
		{id:"myPath_7", src:"images/info_btn.png"},
		{id:"myPath_8", src:"images/info_share.png"},
		{id:"myPath_9", src:"images/info_tit.png"},
		{id:"myPath_10", src:"images/click_btn.png"},
		{id:"myPath_11", src:"images/click_share.png"},
		{id:"myPath_11", src:"images/gou.png"},
		{id:"myPath_11", src:"images/gou_bf.png"},
		{id:"myPath_12", src:"images/logo_sm.jpg"},
		{id:"myPath_13", src:"images/mine_share.png"},
	];

	loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("progress", handleFileProgress);
	loader.loadManifest(manifest);
}

function handleFileProgress(event) {
	var percent = loader.progress*100|0;
	//console.log(percent+'% loaded.');
	//加载动画效果
	$('.loadingText').html('玩命加载中...('+percent+'%)');
}

function handleFileLoad(evt) {
	//console.log(evt);
}

function handleComplete() {
	console.log(loader.getResult("myPath_13").width);
	$('.loadingMask, .loadingText').hide();//隐藏加载层
	$('.tit').addClass('animated bounceInDown');


}

$(document).ready(function(){
	init();
});