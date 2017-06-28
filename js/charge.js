function tellphone(phoneNum){
	if(/^1[345789][0-9]{9}$/.test(phoneNum)==false){
		return -1;
	}else{
		var $c=phoneNum.substring(0,3);
		if($c=='134'||$c=='135'||$c=='136'||$c=='137'||$c=='138'||$c=='139'||$c=='147'||$c=='150'||$c=='151'||$c=='152'||$c=='157'||$c=='158'||$c=='159'||$c=='178'||$c=='182'||$c=='183'||$c=='184'||$c=='187'||$c=='188'){
			return 1;//中国移动
		}else if($c=='130'||$c=='131'||$c=='132'||$c=='155'||$c=='156'||$c=='185'||$c=='186'||$c=='145'||$c=='176'){
			return 2;//中国联通
		}else if($c=='133'||$c=='153'||$c=='177'||$c=='180'||$c=='181'||$c=='189'){
			return 3;//中国电信
		}else{
			return 0;
		}
	}
}
//活动规则
$('.rules').on('click',function(e){
	$('.popupmask,.popup').fadeIn();
});
$('.popBtn').on('click',function(){
	$('.popupmask,.popup').hide();
});
/*$('.closeBtn2').on('click',function(){
 $('.mask2,.popup2').hide();
 });*/
//立即开抢
$('#begin').on('click',function(e){
	$('.home').hide();
	$('.info').show();
});
//获取验证码
var code='';
$('#fetch').on('touchstart',function(e){
	if(/^1[345789][0-9]{9}$/.test($("#tel").val())==false){
		alert('请填写正确的手机号码');
		$("#tel").focus();
		return;
	}
	var _this=$(this);
	_this.css({'background-color':'gray'}).text('发送中...');
	code='123456';
	_this.text('已发送');

});
//立即获取
var agree=0;
$('#agreeBtn').on('touchstart',function(e){
	if(agree==0){
		$(this).attr('src','images/gou.png');
		agree=1;
	}else{
		$(this).attr('src','images/gou_bf.png');
		agree=0;
	}
});
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
	location.replace('./');
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
