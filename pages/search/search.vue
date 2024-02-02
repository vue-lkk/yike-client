<template>
	<view class="search">
		<!-- 头部 -->
		<TopBar isBorderBottom>
			<template #center>
				<view class="search_input">
					<input class="uni-input" placeholder="搜索用户/群" @input='search' />
					<view class="icon">
						<image src="../../static/images/index/search.png"></image>
					</view>
				</view>
			</template>
			<template #add>
				<view class="cancel" @click="close">取消</view>
			</template>
		</TopBar>
		<!-- 中间 -->
		<view class="main">
			<view class="search-user result">
				<view class="title" v-show="searchList.length> 0">用户</view>
				<view class="list user" v-for="user in searchList" :key="user.id">
					<view class="left">
						<navigator url="/pages/userhome/userhome?id=aaa">
							<image class="left-avatar" :src="user.imgurl" mode=""></image>
						</navigator>
						<view class="left-names">
							<view class="name" v-html="user.name"></view>
							<view class="email" v-html="user.email"></view>
						</view>
					</view>
					<view class="right send" v-if='user.tip === 0' @click="toUserhome(user)">发消息</view>
					<view class="right add" v-else @click="toUserhome(user)">加好友</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 引入模拟数据
	import data from '../../components/js/data.js'
	// 防抖
	import _ from 'lodash'
	import TopBar from '../../components/TopBar.vue'

	export default {
		data() {
			return {
				searchList: []
			}
		},
		components: {
			TopBar
		},
		methods: {
			// 搜索关键字
			search: _.debounce(function(event) {
				this.searchList = []
				let keyword = event.detail.value
				if (keyword.length > 0) {
					this.searchUser(keyword)
				}

			}, 500),
			// 关键字匹配查找用户
			searchUser: function(keyword) {
				const friendArr = data.friends()
				// 正则表达式
				let exp = eval(`/${keyword}/g`)
				let key = `<span style="color:rgb(87 153 255);">${keyword}</span>`
				
				friendArr.map(item => {
					item.imgurl = item.imgurl
					if (item.name.search(keyword) != -1 || item.email.search(keyword) != -1) {
						item.imgurl = '../../static/images/index/' + item.imgurl
	
						// 高亮替换
						item.name = item.name.replace(exp,key)
						// 高亮替换
						item.email = item.email.replace(exp,key)
						// 判断是否为好友
						this.isFriend(item)
						this.searchList.push(item)
					}
				})
			},
			// 判断是否为好友
			isFriend:function(user) {
				let isFriend  = data.isFriend()
				let tip = 0
				isFriend.map(item => {
					if(item.friend === user.id){
						tip = 1
					}
				})
				user.tip = tip
			},
			// 取消
			close() {
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},
			// 跳转到用户主页
			toUserhome:function(user) {
				uni.navigateTo({
					url:`/pages/userhome/userhome?id=${user.id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.search {
		box-sizing: border-box;
		// 处理导航层叠
		padding-top: calc(44px + var(--status-bar-height));

		.top-bar-center {
			margin-left: 0;
		}

		.search_input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 240px;
			background: $uni-bg-color-grey;
			border-radius: 5px;
			padding: 0 5px 0px 8px;

			input {
				width: 200px;
			}

			.icon {
				width: 30px;
				height: 30px;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 21px;
					height: 21px;
				}
			}

		}

		.cancel {
			font-size: $uni-font-size-base;
			padding-top: var(--status-bar-height);
		}

		.main {
			.result {
				box-sizing: border-box;

				.title {
					width: 43px;
					height: 30px;
					font-family: PingFangSC-Semibold;
					font-size: 22px;
					color: $uni-text-color;
					letter-spacing: -0.75px;
					font-weight: 600;
					padding-top: $uni-spacing-col-base;
					padding-left:  $uni-spacing-row-base;
				}

				.list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px $uni-spacing-row-base;

					.left {
						display: flex;
						align-items: center;
						
						.navigator-hover{
							background-color: transparent;
						}

						.left-avatar {
							width: 40px;
							height: 40px;
							border-radius: 10px;
							pointer-events: none;
						}

						.left-names {
							margin-left: $uni-spacing-row-base;

							.name {
								font-size: 18px;
								color: $uni-text-color;
							}

							.email {
								font-size: $uni-font-size-sm;
								color: $uni-text-color-disable;
							}
						}
					}

					.right {
						width: 60px;
						height: 24px;
						line-height: 24px;
						text-align: center;
						font-size: $uni-font-size-sm;
						border-radius: $uni-border-radius-base;
					}

					.send {
						background: $uni-color-primary;
					}

					.add {
						color: $uni-color-success;
						background: rgba(74, 170, 255, 0.10);
					}

				}
			
			}
		}
	}
</style>