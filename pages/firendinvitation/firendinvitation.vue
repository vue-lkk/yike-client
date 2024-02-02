<template>
	<view class="firendinvitation">
		<!-- 头部 -->
		<TopBar isBorderBottom>
			<template #left>
				<uni-icons type="left" size="30"></uni-icons>
			</template>
			<template #center>
				<view class="">
					好友邀请
				</view>
			</template>
		</TopBar>
		<view class="main">
			<view class="invitation" v-for="item in friends" :key="item.id">
				<view class="top">
					<view class="reject">拒绝</view>
					<view class="avatar">
						<image :src="item.imgurl" mode=""></image>
					</view>
					<view class="agree">同意</view>
				</view>
				<view class="center">
					<view class="name">{{item.name}}</view>
					<view class="time">{{formatTime(item.time)}}</view>
				</view>
				<view class="floor">留言：{{item.news}}</view>
			</view>

		</view>
	</view>
</template>

<script>
	import data from '../../components/js/data.js'
	// 格式化时间
	import formatTime,{changeTime} from '../../components/js/formatTime.js'
	import TopBar from '../../components/TopBar.vue'
	export default {
		data() {
			return {
				friends:[]
			};
		},
		components:{
			TopBar
		},
		onLoad() {
			this.getRequesters()
		},
		computed:{
	
		},
		methods:{
			// 格式化时间
			formatTime(time) {
				return changeTime(time)
			},
			getRequesters:function() {
				this.friends = data.friends()
				this.friends.map(item => {
					item.imgurl = '../../static/images/index/' + item.imgurl
				})
				console.log(this.friends)
			}
		}
	}
</script>

<style lang="scss">
.firendinvitation{
	// 处理导航层叠
	padding-top: calc(44px + var(--status-bar-height));
	box-sizing: border-box;

	.main{
		.invitation{
			// border: 1px solid red;
			padding: 20px;
			margin: 25px 20px;
			border-radius: 10px;
			box-shadow: 0px 5px 20px 0px #e7e4e4;
			
			.top{
				display: flex;
				align-items: flex-end;
				justify-content: center;
				
				.reject,.agree{
					flex: 3;
					display: flex;
					justify-content: center;
					padding: 5px 0px;
					border-radius: $uni-border-radius-lg;
				}
				.reject{
					background: #ffe8e8;
					color: $uni-color-warning;
				}
				.agree{
					background-color: $uni-color-primary;
				}
				.avatar{
					flex: 2;
					display: flex;
					justify-content: center;
					position: relative;
					margin-top: -90px;
							
					image{
						width: 60px;
						height: 60px;
						border-radius: 50%;
						
					}
				}
			
			}
			.center{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 10px 0;
				.time{
					font-size: 12px;
					color: #ccc;
				}
			}
			.floor{
				background: #edecec;
				border-radius: 10px;
				padding: 5px;
			}
		}
	}
}
</style>
