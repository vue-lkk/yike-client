<template>
	<view class="group">
		<!-- 头部 -->
		<TopBar
			@avatar="handleCancal"
			isBorderBottom
			class="top-bar"
		>
			<template #left>
				<uni-icons class="left" type="left" size="23" color="#fff"/>
			</template>
			<template #add>
				<image class="more" src="../../static/images/creategroup/more1.png" mode=""></image>
			</template>
		</TopBar>
		
		<view class="bg">
			<image src="../../static/images/index/k.png" mode="aspectFill"></image>
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
							<view class="item">
								<view class="title">签名</view>
								<view class="img">
									<view class="text">
										123
									</view>
								</view>
								<view class="icon">
									<uni-icons class="right" type="right" size="23" />
								</view>
							</view>
							
							<view class="item">
								<view class="title">昵称</view>
								<view class="img">123</view>
								<view class="icon">
									<uni-icons class="right" type="right" size="23" />
								</view>
							</view>
						
						<view class="logout">退出应用</view>
					</view>
				</view>
				</view>
			</view>
			
			<!-- 底部 -->
<!-- 			<view class="bottom">
				<TabBar>
					<template #center>
						<button @click="createGroup" :class="{isColor:color}">创建({{total}})</button>
					</template>
				</TabBar>
			</view> -->
		</view>
	</view>
</template>

<script>
	import TopBar from '../../components/TopBar.vue'
	import TabBar from '../../components/TabBar.vue'
	export default {
		data() {
			return {
				
			};
		},
		components:{
			TopBar,
			TabBar
		}
	}
</script>

<style lang="scss">
.group{
	box-sizing: border-box;
	.top-bar{
		background: transparent;
		.more{
			height: 6px;
		}
	}
	.bg{
		image{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			z-index: -1;
		}
	}
	.main{
		box-sizing: border-box;
		padding-top: 150px;
		.top{
			background: #fff;
			padding: 8px 16px;
			border-radius: 12px 12px 0 0;
			.info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.text{
					font-size: 24px;
				}
				.time{
					font-size: 14px;
					color: rgba(39,40,50,0.50);
				}
			}
			.title{
				font-size: 14px;
				color: #272832;
				margin-top: 10px;
			}
		}
		
		.center{
			.center-top{
				display: flex;
				justify-content: space-between;
				padding: 0 16px;
				margin-top: 14px;
				.member{
					font-size: 18px;
					color: #272832;
					font-weight: 700;
				}
				.manage{
					font-size: 16px;
					color: rgba(39,40,50,0.60);
					image{
						width: 12px;
						height: 12px;
						padding-left: 10px;
					}
				}
			}
			.center-main{
				padding: 6px;
				.list{
					display: flex;
					flex-wrap: wrap;
					
					.item{
						display: flex;
						flex-direction: column;
						align-items: center;
						
						margin: 10px;
						
						.avatar-box{
							width: 52px;
							height: 52px;
							position: relative;
							
							.avatar{
								width: 52px;
								height: 52px;
								border-radius: 10px;
							}
							.cancal{
								position: absolute;
								top: -8px;
								right: -8px;
								width: 20px;
								height: 20px;
							}
						}
						.name{
							width: 52px;
							font-size: 14px;
							text-align: center;
							overflow: hidden; /* 隐藏溢出的内容 */
							white-space: nowrap; /* 强制不换行 */
							text-overflow: ellipsis; /* 超出部分显示省略号 */
						}
						.add-box{
							width: 52px;
							height: 52px;
							border-radius: 10px;
							background: rgba(255,228,49,1);
							display: flex;
							justify-content: center;
							align-items: center;
							
							.add{
								width: 20px;
								height: 20px;
								
							}
							.name{
								font-size: 14px;
								text-align: center;
							}
						}
					}
				}
			}
			
			.center-fooler{
				.main1 {
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
			}
		}
	}
	.bottom{
		position: fixed;
		left: 0;
		right: 10px;
		bottom: 10px;
		.isColor{
			background: #FFE431;
		}
	
	}
}
</style>
