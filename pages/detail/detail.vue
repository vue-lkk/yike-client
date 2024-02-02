<template>
	<view class="detail">
		<!-- 头部 -->
		<TopBar @avatar='back' isBorderBottom>
			<template #left>
				<uni-icons class="left" type="left" size="23" />
			</template>
			<template #center>
				<view class="">个人</view>
			</template>
		</TopBar>

		<view class="main">
			<view class="list">
				<view class="item">
					<view class="title">头像</view>
					<view class="img">
						<image src="../../static/images/index/k.png" mode=""></image>
					</view>
					<view class="icon">
						<uni-icons class="right" type="right" size="23" />
					</view>
				</view>
				<view class="item" @click="addFriend(true,{sign:'修改签名'})">
					<view class="title">签名</view>
					<view class="img">
						<view class="text">
							{{userinfo.sign}}
						</view>
					</view>
					<view class="icon">
						<uni-icons class="right" type="right" size="23" />
					</view>
				</view>
				<view class="item">
					<view class="title">注册</view>
					<view class="img">2024-1-24 10:04:15</view>
				</view>
				<view class="item" @click="addFriend(true,{nickname:'修改昵称'})">
					<view class="title">昵称</view>
					<view class="img">{{userinfo.nickname}}</view>
					<view class="icon">
						<uni-icons class="right" type="right" size="23" />
					</view>
				</view>
				<view class="item">
					<picker style="width: 100%;" @change="bindPickerChangeSex" :value="userinfo.sex" :range="array">
						<div style="display: flex;width: 100%;">
							<view class="title">性别</view>
							<view class="img">
								<view class="uni-input">{{array[userinfo.sex]}}</view>
							</view>
							<view class="icon">
								<uni-icons class="right" type="right" size="23" />
							</view>
						</div>
					</picker>
				</view>
				<view class="item">
					<picker style="width: 100%;" mode="date" :value="date" :start="startDate" :end="endDate"
						@change="bindDateChange">
						<view style="display: flex;width: 100%;">
							<view class="title">生日</view>
							<view class="img">
								<view class="uni-input">{{date}}</view>
							</view>
							<view class="icon">
								<uni-icons class="right" type="right" size="23" />
							</view>
						</view>
					</picker>
				</view>
				<view class="item" @click="addFriend(true,{tell:'修改电话'})">
					<view class="title">电话</view>
					<view class="img">{{userinfo.tell}}</view>
					<view class="icon">
						<uni-icons class="right" type="right" size="23" />
					</view>
				</view>
				<view class="item" @click="addFriend(true,{emial:'修改邮箱'})">
					<view class="title">邮箱</view>
					<view class="img">{{userinfo.emial}}</view>
					<view class="icon">
						<uni-icons class="right" type="right" size="23" />
					</view>
				</view>
				<view class="item" @click="addFriend(true,{password:'修改密码'})">
					<view class="title">密码</view>
					<view class="img">
						<input type="password" :value="userinfo.password" />
					</view>
					<view class="icon">
						<uni-icons class="right" type="right" size="23" />
					</view>
				</view>
			</view>
			<view class="logout">退出应用</view>
		</view>

		<view class="detail-popup" :animation="animationData">
			<Popup
			@cancal='cancal'
			@confirm='confirm'
			:title='type'
			:isPassword="newTilte === 'password'?true:false"
			/>
		</view>

	</view>
</template>

<script>
	import TopBar from '../../components/TopBar.vue'
	import Popup from '../../components/Popup.vue'
	
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userinfo:{
					avatar:'../../static/images/index/k.png',
					sign:'斯蒂芬可视对讲佛我i额哦日我额日我是热佛牌死阿平台',
					nickname:'小明',
					sex:0,
					birth:new Date(),
					tell:'13692626694',
					emial:'1315637668@qq.com',
					password:'666'
				},
				array: ['男', '女', '未知'],
				date: currentDate,
				animationData: {},// 弹出层动画
				
				type:{}

			}
		},
		components: {
			TopBar,
			Popup
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			newTilte() {
				return Object.keys(this.type)[0]
			}
		},
		methods: {
			bindPickerChangeSex: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.userinfo.sex = e.detail.value
			},
			bindDateChange: function(e) {
				this.date = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 点击加好友,弹出弹出层
			addFriend: function(is,type={}) {
				this.type = type
				this.isAdd = is
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				this.animation = animation
			
				if(this.isAdd) {
					animation.top(0).step()
				}else{
					animation.top('-100vh').step()
				}
				this.animationData = animation.export()
			
			},
			// 取消修改
			cancal:function() {
				console.log(123)
				this.addFriend(false)
				
			},
			// 确定修改
			confirm:function(obj) {
				this.addFriend(false)
				console.log(obj)
				this.userinfo[obj.type] = obj.content
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		// 处理导航层叠
		padding-top: calc(44px + var(--status-bar-height));

		.main {
			.list {
				padding: 21px 16px 0 16px;

				.item {
					height: 74px;
					line-height: 74px;
					display: flex;
					align-items: center;

					.title {
						font-size: 16px;
						color: #272832;
					}

					.img {
						flex: 1;
						margin-left: 16px;
						display: flex;
						align-items: center;

						font-size: 16px;
						color: rgba(39, 40, 50, 0.60);

						.text {
							width: 230px;
							white-space: nowrap;
							/* 不换行 */
							overflow: hidden;
							/* 溢出部分隐藏 */
							text-overflow: ellipsis;
						}


						image {
							width: 54px;
							height: 54px;
							border-radius: 10px;
						}
					}

					.right {}

				}

				:not(:nth-of-type(1)) {
					height: 50px;
					line-height: 50px;
				}

			}

			.logout {
				margin-top: 10px;
				text-align: center;
				color: $uni-color-warning;
			}
		}
		
		.detail-popup{
			position: fixed;
			top: -100vh;
			z-index: 3;
		}
	}
</style>