new Vue({
	el: "#vxf",
	data: {
		userinfo: userinfo,
		loader: {},
		loadingFlag: true,
		loadingText: "玩命加载中...",
		titDrop: false,
		show: {
			home: true,
			info: false,
			rule: false,
			shareGuide: false,
		},
		cnt: 60,
		code: '',
		timer: null,
		form: {
			tel: '',
			pwd: '',
			pwd2: '',
			verify: ''
		},
		focus: {
			tel: false,
			pwd: false,
			pwd2: false,
			verify: false
		},
		fetchText: '获取验证码',
		styleObject: {},
		agree: false,
	},
	mounted: function(){
		this.$nextTick(function(){
			this.loadFunc();
		})
	},
	methods: {
		loadFunc: function(){
			var manifest = [
				{id:"myPath", src:"images/bg.jpg"},
				{id:"myPath", src:"images/btn.png"},
				{id:"myPath", src:"images/logo.png"},
				{id:"myPath", src:"images/rules.png"},
				{id:"myPath", src:"images/time.png"},
				{id:"myPath", src:"images/tit.png"}
			];

			this.loader = new createjs.LoadQueue(false);
			this.loader.addEventListener("fileload", this.handleFileLoad);
			this.loader.addEventListener("complete", this.handleComplete);
			this.loader.addEventListener("progress", this.handleFileProgress);
			this.loader.loadManifest(manifest);
		},
		handleFileProgress: function(event) {
			var percent = this.loader.progress*100|0;
			// console.log(percent+'% loaded.');
			this.loadingText = '玩命加载中...('+percent+'%)';
		},
		handleFileLoad: function(evt) {
			// console.log(evt);
		},
		handleComplete: function() {
			// console.log(this.loader.getResult("myPath").width);
			this.loadingFlag = false;//隐藏加载层
			this.titDrop = true;
		},
		fetchFunc: function(){
			if(this.cnt !== 60)return;
			if(/^1[345789][0-9]{9}$/.test(this.form.tel)==false){
				alert('请填写正确的手机号码');
				this.focus.tel = true;
				return;
			}
			this.cnt--;
			this.styleObject = {
				backgroundColor: 'gray'
			};
			this.fetchText = '重新获取('+this.cnt+')';
			//ajax获取验证码
			this.$http.get("data/code.json", {"phone":this.form.tel}).then(function(res){
				if(res.data.errcode==0){
					this.code='123456';
					console.log(this.code);
					this.timer = setInterval(this.countDown,1000);
				}else{
					alert('获取验证码失败，请稍后重试！');
				}
			});
		},
		countDown: function(){
			if (this.cnt <= 1) {
				clearInterval(this.timer);
				this.styleObject = {
					backgroundColor: '#cd2e1c'
				};
				this.fetchText = '获取验证码';
				this.cnt = 60;
			}else{
				this.cnt--;
				this.fetchText = '重新获取('+this.cnt+')';
			}
		},
		submitForm: function(){
			if(/^1[345789][0-9]{9}$/.test(this.form.tel)==false){
				alert('请填写正确的手机号码');
				this.focus.tel = true;
				return;
			}
			var pwdlen=this.form.pwd.length;
			if(pwdlen<6||pwdlen>16){
				alert('请填写正确的密码');
				this.focus.pwd = true;
				return;
			}
			if(this.form.pwd!=this.form.pwd2){
				alert('两次输入的密码不一致');
				this.focus.pwd2 = true;
				return;
			}
			if(this.form.verify==''){
				alert('请填写手机验证码');
				return;
			}else{
				if(this.form.verify!=this.code){
					alert('验证码输入不正确');
					return;
				}
			}
			if(!this.agree){
				alert('请同意协议');
				return;
			}
			//ajax提交
			this.show.info = false;
			this.show.shareGuide = true;
		}
	}
});
