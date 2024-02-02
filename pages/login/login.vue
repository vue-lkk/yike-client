<template>
	<view class="login">
		<!-- 头部 -->
		<TopBar
		@add="toRegister"
		>
			<template #add>
				<view class="top-bar-right">注册</view>
			</template>
		</TopBar>

		<view class="logo">
			<image src="../../static/images/login/logo.png" mode=""></image>
		</view>

		<view class="main">
			<view class="title">登录</view>
			<view class="welcome">您好！欢迎来到 yike!</view>
			<view class="inputs">
				<!-- 用户名/邮箱 -->
				<view class="input-item">
					<input class="uni-input" placeholder="用户名/邮箱" :value="username" @input="handleUsername" />
					<uni-icons class="close" type="close" size="23" v-if="showClearIcon" @click="clearIcon"></uni-icons>
				</view>
				<!-- 密码 -->
				<view class="input-item">
					<input class="uni-input" placeholder="密码" :value="password" :password="!showPassword"
						@input="handlePassword" />
					<uni-icons class="eye" :type="!showPassword? 'eye-slash' : 'eye'" size="23"
						@click="changePassword"></uni-icons>
				</view>
				<view class="tip" v-show="error">输入用户或密码错误！</view>
				<button @click="login">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	// 防抖第三方插件
	import _ from 'lodash'
	import TopBar from '../../components/TopBar.vue'

	export default {
		data() {
			return {
				username: '而特特', // 用户名/邮箱
				password: '666', // 密码
				showClearIcon: false, // 是否显示清除图标
				showPassword: false, // 是否显示密码
				error: false
			}
		},
		components:{
			TopBar
		},
		methods: {
			// 收集用户名和判断显示清除
			handleUsername: _.debounce(function(event) {
				console.log(123)
				// 使用 lodash 的 debounce 处理输入框输入事件
				this.username = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			}, 500),
			// 点击清除
			clearIcon() {
				this.username = ''
				this.showClearIcon = false
			},
			// 收集密码
			handlePassword: _.debounce(function(event) {
				console.log(345)
				this.password = event.detail.value
			},500),
			// 点击显示密码
			changePassword() {
				this.showPassword = !this.showPassword
			},
			// 登录
			login() {
				if (!this.username || !this.password) {
					this.error = true
				} else {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			},
			// 跳转到注册页面
			toRegister() {
				console.log(123)
				uni.navigateTo({
					url: '/pages/register/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		// 处理导航层叠
		padding-top: calc(44px + var(--status-bar-height));

		// .top-bar {
		// 	// 处理导航层叠
		// 	height: calc(44px + var(--status-bar-height));
		// 	// 处理导航层叠
		// 	padding-top: var(--status-bar-height);

		// 	box-sizing: border-box;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;

		// 	// 粘性定位
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;

		// 	background: $uni-bg-color;
		// 	padding-left: $uni-spacing-col-base;
		// 	padding-right: $uni-spacing-col-base;

		// 	// 头部-右边
		// 	.top-bar-right {
		// 		display: flex;
		// 		flex: 1;
		// 		justify-content: flex-end;

		// 	}
		// }

		// logo
		.logo {
			text-align: center;
			margin-top: 40px;

			image {
				width: 96px;
				height: 45.82px;
			}
		}

		// 中间
		.main {
			margin: 27px 29px;

			.title {
				width: 56px;
				height: 40px;
				font-family: PingFangSC-Medium;
				font-size: 28px;
				color: $uni-text-color;
				letter-spacing: 0;
				font-weight: 500;
			}

			.welcome {
				width: 204px;
				height: 28px;
				font-family: PingFangSC-Regular;
				font-size: 20px;
				color: $uni-text-color-grey;
				letter-spacing: 0;
				font-weight: 400;
				margin-top: 7px;
			}

			// 输入框
			.inputs {
				.input-item {
					display: flex;
					padding: 5px;
					margin: 20px 0px;
					border-bottom: 1px solid $uni-border-color;

					.uni-input {
						flex: 6;
						font-family: AvenirNext-Medium;
						font-size: 18px;
						color: #272832;
						letter-spacing: 0;
						font-weight: 500;
					}

					.close,
					.eye {
						display: flex;
					}
				}
			}

			.tip {
				color: $uni-color-error;
			}

			button {
				width: 260px;
				height: 48px;
				margin-top: 59px;
				background: $uni-color-primary;
				box-shadow: 0px 25px 16px -18px $uni-bg-color-mask;
				border-radius: 24px;
				font-size: 700;
			}
		}

	}
</style>