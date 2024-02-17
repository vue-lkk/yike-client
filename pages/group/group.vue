<template>
	<view class="group">
		<!-- 头部 -->
		<TopBar 
		@avatar="handleCancal" 
		isBorderBottom 
		class="top-bar"
		:animation="animationData"
		>
			<template #left>
				<uni-icons class="left" type="left" size="23" :color="iconShow?'#fff':'#000'" />
			</template>
			<template #add>
				<image class="more" :src="iconShow?'../../static/images/creategroup/more1.png':'../../static/images/creategroup/more.png'" mode=""></image>
			</template>
		</TopBar>

		<view class="bg" >
			<image :src="groupinfo.groupAvatar" mode="aspectFill"></image>
		</view>

		<view class="main">

			<view class="top">
				<view class="info">
					<view class="text">
						开心就好了
					</view>
					<view class="time">
						2019/12/23
					</view>
				</view>
				<view class="title">
					特别的爱给特别的你，就阿什顿库，大哭高科技啊老哭高科技啊老大。领导咖啡什顿库，大哭高科技啊老哭高科…
				</view>
			</view>

			<view class="center">
				
				<view class="center-top">
					<view class="member">
						群成员
					</view>
					<view class="manage">
						成员管理
						<image src="../../static/images/group/more.png" mode=""></image>
					</view>
				</view>

				<view class="center-main">
					<view class="list">
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法
							</view>
						</view>
						<view class="item">
							<view class="avatar-box">
								<image class="avatar" src="../../static/images/index/c.png" mode=""></image>
								<image class="cancal" src="../../static/images/creategroup/delete.png" mode=""></image>
							</view>
							<view class="name">
								小法SEO认识
							</view>
						</view>
						<view class="item">
							<view class="add-box">
								<image class="add" src="../../static/images/creategroup/add.png" mode=""></image>
							</view>
							<view class="name">
								邀请
							</view>
						</view>
					</view>
				</view>

				<view class="center-fooler">
					<view class="main1">
						<view class="list">
							<view class="item" @click="addFriend(true,{groupName:'群名称'})">
								<view class="title">群名称</view>
								<view class="info">
									<view class="text">{{groupinfo.groupName}}</view>
								</view>
								<view class="icon">
									<uni-icons class="right" type="right" size="23" />
								</view>
							</view>
							<view class="item" @tap="changeAvatar">
								<view class="title">群头像</view>
								<view class="info">
									<view class="avatar">
										<image class="avatar" :src="groupinfo.groupAvatar" mode=""></image>
									</view>
								</view>
								<view class="icon">
									<uni-icons class="right" type="right" size="23" />
								</view>
							</view>
							<view class="item" @click="addFriend(true,{groupNotice:'群公告'})">
								<view class="title">群公告</view>
								<view class="info">{{groupinfo.groupNotice}}</view>
								<view class="icon">
									<uni-icons class="right" type="right" size="23" />
								</view>
							</view>
							<view class="item" @click="addFriend(true,{groupNickname:'群内名'})">
								<view class="title">群内名</view>
								<view class="info">{{groupinfo.groupNickname}}</view>
								<view class="icon">
									<uni-icons class="right" type="right" size="23" />
								</view>
							</view>
							<view class="item">
								<view class="title">消息免打扰</view>
								<view class="info"></view>
								<view class="icon">
									<switch checked @change="switch1Change" color="#FFCC33" style="transform:scale(0.7)" />
								</view>
							</view>

							<view class="logout">退出群聊</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 弹出层 -->
			<view class="detail-popup" :animation="animationData1">
				<Popup
				@cancal='cancal'
				@confirm='confirm'
				:title='type'
				/>
			</view>
			
		</view>
	</view>
</template>

<script>
	import TopBar from '../../components/TopBar.vue'
	import TabBar from '../../components/TabBar.vue'
	import Popup from '../../components/Popup.vue'
	
	export default {
		data() {
			return {
				mainTop: 0,
				animationData: {}, // TopBar动画
				iconShow:false,
				
				animationData1: {},// 弹出层动画
				groupinfo:{
					groupName:'开心就好',
					groupAvatar:'../../static/images/index/a.png',
					groupNotice:'特别的爱给特别库，大哭高科啊老哭sfsdf',
					groupNickname:'高兴就好',
				},
				type:{} // 类型
				
			};
		},
		computed:{
			newTilte() {
				return Object.keys(this.type)[0]
			}
		},

		onReady() {
			this.getElement()
		},
		// 页面滚动生命周期
		onPageScroll() {
			this.getElement()
		},
		methods: {
			changeAvatar: function() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:  (res) => {
						this.groupinfo.groupAvatar = res.tempFilePaths[0]
					}
				});
			},
			// 修改群信息,弹出弹出层
			addFriend: function(is,type={}) {
				this.type = type
				this.isAdd = is
				var animation1 = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				this.animation1 = animation1
			
				if(this.isAdd) {
					animation1.top(0).step()
				}else{
					animation1.top('-100vh').step()
				}
				this.animationData1 = animation1.export()
			
			},
			// 取消修改
			cancal:function() {
				console.log(123)
				this.addFriend(false)
				
			},
			// 确定修改
			confirm:function(obj) {
				this.addFriend(false)
				this.groupinfo[obj.type] = obj.content
			},
			
			// 动态获取页面高度
			getElement: function() {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(".main")
					.boundingClientRect((data) => {
						// console.log("得到布局位置信息" + JSON.stringify(data));
						// console.log("节点离页面顶部的距离为" + data.top);
						this.mainTop = data.top
						var animation = uni.createAnimation({
							duration: 200,
							timingFunction: 'linear',
						})
						this.animation = animation
						if (this.mainTop < -106) {
							animation.backgroundColor('#fff').step()
							this.iconShow = false
						}else{
							animation.backgroundColor('transparent').step()
							this.iconShow = true
						}
						this.animationData = animation.export()
					})
					.exec();
			},
			handleCancal: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
			},
		},
		components: {
			TopBar,
			TabBar,
			Popup
		}
	}
</script>

<style lang="scss">
	.group {
		box-sizing: border-box;

		.top-bar {
			background-color: transparent;
			
			
			.more {
				height: 6px;
			}
		}

		.bg {
			image {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				width: 100%;
				z-index: -1;
			}
		}

		.main {
			box-sizing: border-box;
			padding-top: 150px;
			z-index: -1;

			.top {
				background: #fff;
				padding: 8px 16px;
				border-radius: 12px 12px 0 0;

				.info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.text {
						font-size: 24px;
					}

					.time {
						font-size: 14px;
						color: rgba(39, 40, 50, 0.50);
					}
				}

				.title {
					font-size: 14px;
					color: #272832;
					margin-top: 10px;
				}
			}

			.center {
				background: #fff;

				.center-top {
					display: flex;
					justify-content: space-between;
					padding: 0 16px;

					.member {
						font-size: 18px;
						color: #272832;
						font-weight: 700;
					}

					.manage {
						font-size: 16px;
						color: rgba(39, 40, 50, 0.60);

						image {
							width: 12px;
							height: 12px;
							padding-left: 10px;
						}
					}
				}

				.center-main {
					padding: 6px;

					.list {
						display: flex;
						flex-wrap: wrap;

						.item {
							display: flex;
							flex-direction: column;
							align-items: center;

							margin: 10px;

							.avatar-box {
								width: 52px;
								height: 52px;
								position: relative;

								.avatar {
									width: 52px;
									height: 52px;
									border-radius: 10px;
								}

								.cancal {
									position: absolute;
									top: -8px;
									right: -8px;
									width: 20px;
									height: 20px;
								}
							}

							.name {
								width: 52px;
								font-size: 14px;
								text-align: center;
								overflow: hidden;
								/* 隐藏溢出的内容 */
								white-space: nowrap;
								/* 强制不换行 */
								text-overflow: ellipsis;
								/* 超出部分显示省略号 */
							}

							.add-box {
								width: 52px;
								height: 52px;
								border-radius: 10px;
								background: rgba(255, 228, 49, 1);
								display: flex;
								justify-content: center;
								align-items: center;

								.add {
									width: 20px;
									height: 20px;

								}

								.name {
									font-size: 14px;
									text-align: center;
								}
							}
						}
					}
				}

				.center-fooler {
					.main1 {
						.list {
							padding: 21px 16px 0 16px;

							.item {
								height: 54px;
								line-height: 54px;
								display: flex;
								align-items: center;

								.title {
									font-size: 16px;
									color: #272832;

								}

								.info {
									flex: 1;
									margin-left: 16px;
									line-height: 54px;


									overflow: hidden;
									/* 隐藏溢出的内容 */
									white-space: nowrap;
									/* 强制不换行 */
									text-overflow: ellipsis;
									/* 超出部分显示省略号 */

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

									.avatar {
										width: 54px;
										height: 54px;
										line-height: 54px;
										width: 45px;
										height: 45px;
									}
								}

								.icon {
									switch {
										width: 50px;
									}

								}

							}
						}

						.logout {
							padding-bottom: 12px;
							text-align: center;
							color: $uni-color-warning;
						}
					}
				}
			}
		}

		.bottom {
			position: fixed;
			left: 0;
			right: 10px;
			bottom: 10px;

			.isColor {
				background: #FFE431;
			}

		}
	}
	
	.detail-popup{
		position: fixed;
		top: -100vh;
		z-index: 3;
	}
</style>