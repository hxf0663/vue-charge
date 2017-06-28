var loader;
function init() {
	var manifest = [
		{id:"myPath", src:"images/bg.jpg"},
		{id:"myPath", src:"images/btn.png"},
		{id:"myPath", src:"images/logo.png"},
		{id:"myPath", src:"images/rules.png"},
		{id:"myPath", src:"images/time.png"},
		{id:"myPath", src:"images/tit.png"}
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
	$('.loadingText').html('玩命加载中...('+percent+'%)');
}

function handleFileLoad(evt) {
	//console.log(evt);
}

function handleComplete() {
	//console.log(loader.getResult("myPath").width);
	$('.loadingMask, .loadingText').hide();//隐藏加载层
	$('.tit').addClass('animated bounceInDown');

}

$(document).ready(function(){
	init();
});