// 注册一个全局自定义指令 v-focus 使DOM获得焦点
Vue.directive('focus', {
	componentUpdated: function (el,binding) {
		!binding.oldValue && binding.value && el.focus();
	}
});
// 活动规则组件
Vue.component('rule-box', {//组件名驼峰变横杆
        props: ['showrule'],//接收父组件的属性全部小写（每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop）
	template: '<transition\
                    name="custom-classes-transition"\
                    enter-active-class="animated bounceInLeft"\
                    leave-active-class="animated bounceOutRight"\
                  >\
                  <div class="popup" v-if="show">\
                    <div class="popTit">{{ title }}</div>\
                        <div class="popCont" v-html="content">\
                    </div>\
                    <div class="popBtn" @touchstart="closeMe">确 认</div>\
                  </div>\
                  </transition>',
	data: function () {
		return {
                        show: this.showrule,
			title: '星之灵“春节流量带回家”活动规则',
			content: "1. 活动时间：2017-02-03 至2017-02-25" +
                "<br> 2. 活动奖品：移动用户70M流量包/次，联通及电信用户50M流量包/次" +
                "<br> 3. 参与方式：凡通过此活动成为星之灵新注册用户即可免费获得上述相应的流量包。同时可邀请好友助力，2名好友成功助力后另可获取相同流量的叠加流量包一个（未达到2人助力，不额外叠加流量；每个手机号限领叠加包一次）。" +
                "<br> 4. 关于流量充值：" +
                "<br> ① 在活动页面输入手机号及登录密码，验证成功后，流量将在24小时内生效，节假日会延迟48小时生效，72小时到账。如遇特殊情况产生延迟，将视运营商情况而定；该流量当月有效（若部分帐号因运营商原因充值失败，则延续到次月充值生效），全国可用。" +
                "<br> ② 为了确保能为您顺利的进行流量充值，请您使用正准确的手机号码。号码处于欠费停机等异常状态均不能参加活动，请确保手机号码处于正常状态，否则运营商可能会充值失败。" +
                "<br> ③ 未实名认证用户和联通纯2G用户可能会充值失败，符合此条件的用户建议使用其他号码参与。" +
                "<br> ④ 参与赠送流量活动的手机号，默认生成“星之灵”平台帐号，并通过短信方式通知您帐号密码，同时赠送您88元投资券，您一旦接受本活动的流量，就视同表示已经允许该行为。" +
                "<br>" +
                "<br>" +
                "<strong>本活动最终解释权归星之灵所有。更多信息请登录星之灵官方网站了解更多！</strong>" +
                "<br>" +
                "<br>" +
                "<strong>关于星之灵</strong>" +
                "<br> 复星旗下互联网金融平台，运营方上海星灵资产管理有限公司，注册资本1亿人民币。" +
                "<br>" +
                "<strong>关于复星</strong>" +
                "<br> 业务遍及保险、地产、医药、零售等多个领域，总资产超过千亿。《福布斯》2015年全球上市公司2000强中排名第536位。" +
                "<br>" +
                "<strong>优势</strong>" +
                "<br> &middot;复星卓越的投资能力和产业整合能力。" +
                "<br> &middot;依托复星综合性金融集团优势，在风控和产品结构设计上为投资人提供丰富、安全和灵活的产品；" +
                "<br> &middot;资深国际背景的专业团队，拥有行业中领先的产品设计能力；" +
                "<br> &middot;通过实现复星各产业之间的互融互通，建立产业互联网生态系统，实现客户账户体系的全面整合。"
		}
	},
        watch: {
                showrule: function(val, oldVal){
                        this.show = val;
                }
        },
        methods: {
                closeMe: function(){
                        this.show = false;
                        this.$emit('box-close', this.show);
                }
        }
})