<template>
	<view class="login">
		<!-- 头部 -->
		<TopBar
			@avatar="toLogin"
		>
			<template #left>
				<uni-icons class="left" type="left" size="23"/>
			</template>
		</TopBar>
	<!-- 	<view class="top-bar">
			<view class="top-bar-right">
				<uni-icons class="left" type="left" size="23" @click="toLogin"/>
			</view>
		</view> -->

		<view class="logo">
			<image src="../../static/images/login/logo.png" mode=""></image>
		</view>

		<view class="main">
			<view class="title">注册</view>
			<view class="inputs">
				<!-- 用户名 -->
				<view class="input-item">
					<input class="uni-input" placeholder="请取个名字" :value="username" @input="handleUsername" />
					<uni-icons class="close" type="checkmarkempty" size="23" v-if="isUsernameValid" color="#FFE431"/>
					<view v-else class="already">用户名已存在</view>
				</view>

				<!-- 邮箱 -->
				<view class="input-item">
					<input class="uni-input" placeholder="请输入邮箱" :value="email" @input="handleEmail" />
					<uni-icons class="close" type="checkmarkempty" size="23" v-if="isEmailValid" color="#FFE431"/>
					<view v-else class="already">邮箱格式错误</view>
				</view>

				<!-- 密码 -->
				<view class="input-item">
					<input class="uni-input" placeholder="请输入密码" :value="password" :password="!showPassword"
						@input="handlePassword" />
					<uni-icons class="eye" :type="!showPassword? 'eye-slash' : 'eye'" size="23" @click="changePassword" />
				</view>
				<button @click="register" :class='{active:isActive}' :disabled="!isActive">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	// 防抖第三方插件
	import _ from 'lodash'
	import TopBar from "../../components/TopBar.vue"
	
	export default {
		data() {
			return {
				username: '', // 用户名/邮箱
				password: '', // 密码
				email: '', // 邮箱
				
				isUsernameValid:false, // 验证用户
				isEmailValid: false, // 验证邮箱
				showPassword: false, // 是否显示密码
				
				isActive:true  // 控制注册按钮是否可以点击

			}
		},
		components:{
			TopBar
		},
		methods: {
			// 收集用户名和判断显示清除
			handleUsername: _.debounce(function(event) {
				console.log(1)
				this.username = event.detail.value;
				if(event.detail.value.length > 0) {
					this.isUsernameValid = true
				}else{
					this.isUsernameValid = false
				}
			},500),
			// 邮箱
			handleEmail:_.debounce(function(event) {
				console.log(2)
				this.email = event.detail.value
				// 使用正则表达式验证邮箱格式
				const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
				this.isEmailValid = emailRegex.test(this.email);
			},500),
			// 收集密码
			handlePassword: _.debounce(function(event) {
				console.log(3)
				this.password = event.detail.value
			},500),
			// 点击显示密码
			changePassword() {
				this.showPassword = !this.showPassword
			},
			// 登录
			register() {
				console.log(this.username)
				if (!this.username || !this.email || !this.password) {
					
				}
			},
			// 回到登录页面
			toLogin() {
				console.log(123)
				uni.navigateTo({
					url:'/pages/login/login'
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
		// 		justify-content: flex-start;

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

					.already {
						font-family: PingFangSC-Medium;
						font-size: $uni-font-size-base;
						color: $uni-color-error;
						letter-spacing: 0;
						font-weight: 500;
					}
				}
			}

			button {
				width: 260px;
				height: 48px;
				margin-top: 59px;
				background: $uni-bg-color-hover;
				box-shadow: 0px 25px 16px -18px $uni-bg-color-mask;
				border-radius: 24px;
				font-size: 700;
				
			}
			.active{
				background:$uni-color-primary;
			}
		}

	}
</style>