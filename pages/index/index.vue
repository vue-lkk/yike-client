<template>
	<view class="content">
		<!-- 头部 -->
		<TopBar
			@avatar="handleAvatar"
			@add="handleCreateGroup"
			@search="handleSearch"
			isBorderBottom
		>
			<template #left>
				<image src="../../static/images/index/m.png"></image>
			</template>
			<template #center>
				<image src="../../static/images/index/火.png"></image>
			</template>
			<template #search>
				<image src="../../static/images/index/search.png"></image>
			</template>
			<template #add>
				<image src="../../static/images/index/add.png"></image>
			</template>
		</TopBar>
		
		<!-- 中间内容区 -->
		<view class="main">
			<!-- 好友请求 -->
			<view class="apply"></view>

			<!-- 好友列表 -->
			<view class="friends">
				<view class="friend-list" v-for="friend in friends" :key="friend.id" @click="toFirend">
					<view class="friend-list-l">
						<view class="tip">{{friend.tip}}</view>
						<image :src="'../../static/images/index/' + friend.imgurl" mode=""></image>
					</view>
					<view class="friend-list-r">
						<view class="top">
							<view class="name">{{friend.name}}</view>
							<view class="time">{{formatTime(friend.time)}}</view>
						</view>
						<view class="bottom">{{friend.news}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 模拟好友列表json数据
	import datas from '../../components/js/data.js'
	// 格式化时间
	import formatTime from '../../components/js/formatTime.js'
	import TopBar from '../../components/TopBar.vue'
	
	export default {
		data() {
			return {
				friends:[]  // 好友列表
			}
		},
		onLoad() {
			this.getFriends()

		},
		components:{
			TopBar,
		},
		computed:{
			
		},
		methods: {
			// 格式化时间
			formatTime(time) {
				return formatTime.dateTime(time)
			},
			
			// 获取好友列表
			getFriends() {
				this.friends = datas.friends()
			},
			
			// 建群
			handleCreateGroup() {
				uni.navigateTo({
					url:'/pages/creategroup/creategroup'
				})
			},
			
			// 搜索
			handleSearch() {
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			
			// 头像
			handleAvatar() {
				uni.navigateTo({
					url:'/pages/userhome/userhome?id=aaa'
				})
			},
			
			toFirend() {
				uni.navigateTo({
					url:'/pages/chat/chat'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.content {
		// 处理导航层叠
		padding-top: calc(44px + var(--status-bar-height));
	
		
		.main {
			box-sizing: border-box;

			// 好友请求
			.apply {}

			// 好友列表
			.friends {

				.friend-list {
					display: flex;
					align-items: center;
					padding: 10px 18px;
					&:active{
						background-color: $uni-bg-color-grey;
					}

					.friend-list-l {
						position: relative;
						.tip {
							position: absolute;
							z-index: 1;
							top: -5px;
							right: -10px;
							text-align: center;
							box-sizing: border-box;
							padding: 0 2px;

							min-width: 18px;
							height: 18px;
							line-height: 18px;
							background: #FF5D5B;
							border-radius: $uni-border-radius-base;
							color: $uni-bg-color;
							font-size: $uni-font-size-sm;

						}
						image {
							width: 48px;
							height: 48px;
							border-radius: $uni-border-radius-base;
						}
					}

					.friend-list-r {
						flex: 1;
						margin-left: $uni-spacing-row-base;
						.top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							.name {
								font-size: 18px;
							}
							.time {
								font-size: $uni-font-size-sm;
								color: $uni-text-color-disable;
							}
						}
						.bottom {
							font-size: $uni-font-size-base;
							color: $uni-text-color-grey;
							/* 设置最大宽度 */
							max-width: 200px;
							/* 禁止文本换行 */
							white-space: nowrap;
							/* 隐藏溢出部分 */
							overflow: hidden;
							/* 使用省略号表示溢出部分 */
							text-overflow: ellipsis;
							
						}
					}
				}
			}
		}
	}
</style>