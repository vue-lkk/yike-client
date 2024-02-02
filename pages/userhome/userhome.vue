<template>
	<view class="userhome">
		<!-- 头部 -->
		<TopBar 
		@avatar='back'
		@add='test'
		>
			<template #left>
				<uni-icons class="left" type="left" size="23" />
			</template>
			<template #add>
				<image class="more" src="../../static/images/userhome/more.png"></image>
			</template>
		</TopBar>

		<!-- 背景 -->
		<view class="bg">
			<!-- 白色透明层 -->
			<view class="bg-bai"></view>
			<!-- 图片背景模糊层 -->
			<view class="bg-img">
				<image src="../../static/images/index/m.png" mode="aspectFill" />
			</view>
		</view>

		<!-- 中间 -->
		<view class="main">
			<view class="user" :animation="animationData2">
				<view class="user-sex" :animation="animationData3">
					<image src="../../static/images/userhome/女.png" mode=""></image>
				</view>
				<view class="user-avatar">
					<image src="../../static/images/index/m.png" mode=""></image>
				</view>
			</view>
			<view class="userinfo">
				<view class="name">孙悟空</view>
				<view class="nickname">昵称：弼马温</view>
				<view class="intoduction">
					水电费拉开距sdgfdsg手工费多少发给大哥离。
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<TabBar>
				<template #center>
					<button @click="addFriend(true)">加好友</button>
				</template>
			</TabBar>
		</view>

		<!-- 弹出层 -->
		<view class="add-friend" :style="{height: (activeHeight-186) + 'px'}" :animation="animationData">
			<view class="name">孙悟空</view>
			<view class="remark">
				<textarea name="" id="" cols="30" rows="20" value="" :maxlength='300' placeholder="验证备注" />
			</view>

			<!-- 底部 -->
			<view class="bottom1" :animation="animationData1">
				<TabBar>
					<template #left>
						<button class="left-btn" @click="addFriend(false)">取消</button>
					</template>
					<template #center>
						<button class="center-btn">加好友</button>  
					</template>
				</TabBar>
			</view>
		</view>

	</view>
</template>

<script>
	import TopBar from '../../components/TopBar.vue'
	import TabBar from '../../components/TabBar.vue'

	export default {
		data() {
			return {
				activeHeight: '',  // 动态高度
				activeWidth:'',
				isAdd:false,  // 控制弹出层
				animationData: {},// 弹出层动画
				animationData1:{}, // 底部TabBar动画
				animationData2:{}, // 头像动画
				animationData3:{}, // 性别图标动画
				// animationData4:{}, // 背景动画
			}
		},
		components: {
			TopBar,
			TabBar
		},
		onReady: function() {
			this.getElement()
		},
		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			test:function() {
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
			},
			// 动态获取页面高度
			getElement: function() {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(".bg")
					.boundingClientRect((data) => {
						console.log("得到布局位置信息" + JSON.stringify(data));
						console.log("节点离页面顶部的距离为" + data.top);
						this.activeHeight = data.height
						this.activeWidth = data.width
					})
					.exec();
			},
			// 点击加好友,弹出弹出层
			addFriend: function(is) {
				this.isAdd = is
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				var animation1 = uni.createAnimation({
					duration: 500,
					delay: 300,
					timingFunction: 'ease',
				})
				var animation2 = uni.createAnimation({
					duration: 500,
					delay: 200,
					timingFunction: 'ease',
				})
				var animation3 = uni.createAnimation({
					duration: 500,
					delay: 200,
					timingFunction: 'ease',
				})
				// var animation4 = uni.createAnimation({
				// 	duration: 500,
				// 	delay: 200,
				// 	timingFunction: 'ease',
				// })
				this.animation = animation
				this.animation1 = animation1
				this.animation2 = animation2
				this.animation3 = animation3
				// this.animation4 = animation4
				
				if(this.isAdd) {
					animation.bottom(0).step()
					animation1.bottom(0).step()
					animation2.translate(-(this.activeWidth/2 -80 ), -5).scale(0.5).rotate(6).step()
					animation3.opacity(0).step()
					// animation4.backgroundColor('rgba(255,228,49,.5)').step()
				}else{
					animation.bottom('-100vh').step()
					animation1.bottom('-90px').step()
					animation2.translate(0,0).scale(1).step()
					animation3.opacity(1).step()
					// animation4.backgroundColor('rgba(255,228,49,0)').step()
				}
				this.animationData = animation.export()
				this.animationData1 = animation1.export()
				this.animationData2 = animation2.export()
				this.animationData3 = animation3.export()
				// this.animationData4 = animation4.export()
				// setTimeout(function() {
				// 	animation.translate(30).step()
				// 	this.animationData = animation.export()
				// }.bind(this), 1000)
			}
		}
	}
</script>

<style lang="scss">
	.userhome {

		// 头部
		.top-bar {
			background: transparent;
		}

		.more {
			display: flex;
			height: 6px;

			image {
				height: 6px;
			}
		}

		// 背景
		.bg {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			// 白色透明层
			.bg-bai {
				z-index: -1;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: #fff;
				opacity: 0.5;
			}

			// 图片模糊层
			.bg-img {
				z-index: -2;
				position: absolute;
				width: 100%;
				height: 100%;

				image {
					width: 110%;
					height: 110%;
					transform: translate(-20px, -20px);
					filter: blur(16px);
				}
			}

		}

		// 中间
		.main {
			box-sizing: border-box;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			// 处理导航层叠
			padding-top: calc(44px + var(--status-bar-height));

			// 用户头像
			.user {
				position: relative;
				left: 0;
				z-index: 3;
				margin-top: 30px;
				width: 200px;
				height: 200px;
				border: 3px solid #FFFFFF;
				border-radius: 24px;
				overflow: hidden;

				.user-sex {
					position: absolute;
					z-index: 3;
					bottom: 8px;
					right: 8px;
					width: 32px;
					height: 32px;
					text-align: center;
					line-height: 32px;
					border-radius: $uni-border-radius-lg;
					background: $uni-color-warning;

					image {
						width: 16px;
						height: 16px;
					}

				}

				.user-avatar {
					position: absolute;

					image {
						width: 200px;
						height: 200px;
					}

				}
			}

			// 用户信息
			.userinfo {
				z-index: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 24px;

				.name {
					font-size: 26px;
					color: $uni-text-color;
					letter-spacing: -0.89px;
					font-weight: 400;
				}

				.nickname {
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					letter-spacing: -0.48px;
					font-weight: 400;
				}

				.intoduction {
					width: 276px;
					height: 85px;
					text-align: center;
					margin-top: 10px;
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
					letter-spacing: -0.48px;
					line-height: 24px;
					font-weight: 200;
				}
			}
		}

		// 底部
		.bottom,
		.bottom1 {
			position: relative;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			padding: 5px 20px;
			background-color: transparent;

			button {
				font-size: $uni-font-size-lg;
				color: $uni-text-color;
				letter-spacing: -0.55px;
				font-weight: 400;
				background: $uni-color-primary;
			}

			.center-btn {
				background: $uni-color-primary;
			}

			.left-btn {
				background: #efebeb;
			}
		}

		.bottom1 {
			bottom: -90px;
		}

		// 弹出层
		.add-friend {
			padding: 0 26px;
			z-index: 2;
			position: fixed;
			left: 0;
			right: 0;
			bottom: -100vh;
			background: #FFFFFF;
			// height: 75%;
			border-radius: $uni-border-radius-lg $uni-border-radius-lg 0 0;

			.name {
				margin-top: 84px;
				font-size: $uni-font-size-subtitle;
				color: $uni-text-color;
				letter-spacing: -0.89px;
				font-weight: 400;
			}

			.remark {
				box-sizing: border-box;
				margin-top: 20px;
				padding: 10px;  
				width: 100%;
				height: 35%;
				background: $uni-bg-color-grey;
				border-radius: $uni-border-radius-base;
  
				textarea {
					width: 100%;
					height: 100%;
					line-height: 26px;
				}

			}
		}
	}
</style>