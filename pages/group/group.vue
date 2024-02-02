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
			
			<view class="">
				123
			</view>
		</view>
	</view>
</template>

<script>
	import TopBar from '../../components/TopBar.vue'
	
	export default {
		data() {
			return {
				
			};
		},
		components:{
			TopBar
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
		padding-top: 120px;
		.top{
			background: #fff;
			padding: 8px 12px;
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
				ont-size: 14px;
				color: #272832;
			}
		}
	}
}
</style>
