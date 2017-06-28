//活动规则
$('.rules').on('click',function(e){
	$('.popupMask,.popup').fadeIn();
});
$('.popBtn').on('click',function(){
	$('.popupMask,.popup').hide();
});
//立即开抢
$('#begin').on('click',function(e){
	$('.home').hide();
	$('.info').show();
});
//获取验证码
var code='';
var timer;
var cnt = 60;
$('#fetch').on('touchstart',function(e){
	if(cnt !== 60)return;
	cnt--;
	if(/^1[345789][0-9]{9}$/.test($("#tel").val())==false){
		alert('请填写正确的手机号码');
		$("#tel").focus();
		return;
	}
	var _this=$(this);
	//ajax获取验证码
	_this.css({'background-color':'gray'}).text('重新获取('+cnt+')');
	timer = setInterval("countDown()",1000);
	code='123456';
	console.log(code);
});
function countDown() {
	if (cnt <= 1) {
		clearInterval(timer);
		$('#fetch').css({'background-color':'#cd2e1c'}).text('获取验证码');
		cnt = 60;
	}else{
		cnt--;
		$('#fetch').text('重新获取('+cnt+')');
	}
}
//同意协议
var agree=0;
$('#agreeBtn').on('touchstart',function(e){
	if(agree==0){
		$(this).attr('src','images/gou.png');
		agree=1;
	}else{
		$(this).attr('src','images/gou_bf.png');
		agree=0;
	}
	console.log(agree);
});
//立即获取
var agree=0;
$('#submit_info').on('touchstart',function(e){
	if(/^1[345789][0-9]{9}$/.test($("#tel").val())==false){
		alert('请填写正确的手机号码');
		$("#tel").focus();
		return;
	}
	var pwdlen=$("#pwd").val().length;
	if(pwdlen<6||pwdlen>16){
		alert('请填写正确的密码');
		$("#pwd").focus();
		return;
	}
	if($("#pwd").val()!=$("#pwd2").val()){
		alert('两次输入的密码不一致');
		$("#pwd2").focus();
		return;
	}
	if($("#verify").val()==''){
		alert('请填写手机验证码');
		return;
	}else{
		if($("#verify").val()!=code){
			alert('验证码输入不正确');
			return;
		}
	}
	if(agree==0){
		alert('请同意协议');
		return;
	}
	$('.info').hide();
	$('.mask,.share_box').show();
});
//继续邀请
$('#invite').on('touchstart',function(e){
	$('.mine').hide();
	$('.mask,.share_box').show();
});
//助力
$('#click').on('touchstart',function(e){
	$('.click').hide();
	$('.mask,.share_box').show();
});
$('#tohome').on('touchstart',function(e){
	location.replace('./index.html');
});
//翻动名单
var fcnt=3;
var flag=0;
var fidx=0;
function flip(){
	if(flag==0){
		$('.footer').eq(fidx).fadeOut(1000);
		flag=1;
		fidx++;
	}else{
		if(fidx==fcnt)fidx=0;
		$('.footer').eq(fidx).fadeIn(1000);
		flag=0;
	}
}

if(fcnt>1)setInterval("flip()",2000);