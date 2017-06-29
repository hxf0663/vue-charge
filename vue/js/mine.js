new Vue({
	el: "#vue-mine",
	data: {
		userinfo: userinfo,
		loader: {},
		loadingFlag: true,
		loadingText: "玩命加载中...",
		titDrop: false,
		show: {
			mine: true,
			rule: false,
			shareGuide: false,
		},
		gained: null,
		need_people: null,
		extra_flow: null,
		helpers: [],
		fcnt: 0,
		fidx: 0,
		flag: true
	},
	beforeCreate: function(){
		//ajax拉取页面所需数据
		this.$http.get("data/mine.json", {"openid":userinfo.openid}).then(function(res){
			if(res.data.errcode==0){
				this.gained = res.data.gained;
				this.need_people = res.data.need_people;
				this.extra_flow = res.data.extra_flow;
				this.helpers = res.data.helpers;
				this.fcnt = this.helpers.length;
				if(this.fcnt){
					var _this = this;
					this.helpers.forEach(function(item,index){
						if(typeof item.show == 'undefined'){
							_this.$set(item,"show",!index);
						}
					});
					setInterval(this.flipFunc,2000);
				}
			}else{
				alert('获取信息失败，请稍后重试！');
			}
		});
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
		flipFunc: function(){
			if(this.flag){
				this.helpers[this.fidx]['show'] = false;
			}else{
				if(this.fidx == this.fcnt - 1){
					this.fidx = 0;
				}else{
					this.fidx++;
				}
				this.helpers[this.fidx]['show'] = true;
			}
			this.flag = !this.flag;
		}

	}
});
