<template>
	<view class="create-group">
		<!-- 头部 -->
		<TopBar
			@avatar="handleCancal"
			isBorderBottom
		>
			<template #left>
				<view class="">取消</view>
			</template>
			<template #center>
				<view class="">创建群聊</view>
			</template>
		</TopBar>
		
		<view class="main">
			<view class="group">
				<view class="avatar-box">
					<uni-file-picker 
					limit="1" 
					:del-icon="false" 
					disable-preview 
					:imageStyles="imageStyles"
					file-mediatype="image"
					class="change-avatar"
					@select="change">
						<image class="avatar" src="../../static/images/creategroup/group.png" mode=""></image>
						<image class="update" src="../../static/images/creategroup/change.png" mode=""></image>
					</uni-file-picker>
				</view>
				<view class="name">
					<input type="text"  placeholder="群名称群名称" v-model="groupName"/>
				</view>
			</view>
			
			<view class="users">
				<view class="title">
					用户({{this.users.length}}/{{total}})
				</view>
				<view class="user-list">
					<view class="user-item" v-for="(item,index) in users">
						<view class="selected" :class="{isSelected:!item.selected}" @tap="handleSelect(item.id)">
							<image src="../../static/images/creategroup/choose.png" v-show="item.selected"></image>
						</view>
						<view class="img">
							<image :src="item.avatar" mode=""></image>
						</view>
						<view class="sign">
							{{item.sign}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="bottom">
			<TabBar>
				<template #center>
					<button @click="createGroup" :class="{isColor:color}">创建({{total}})</button>
				</template>
			</TabBar>
		</view>
		
	</view>
</template>

<script>
	import TopBar from '../../components/TopBar.vue'
	import TabBar from '../../components/TabBar.vue'
	
	export default {
		name:'CreateGroup',
		data() {
			return {
				avatar:'../../static/images/creategroup/group.png', //群头像
				groupName:'',  //群名
				imageStyles: {
					width: 80,
					height: 80,
					border: {
						"color":"#FFE431",		// 边框颜色
						"width":"1px",		// 边框宽度
						"style":"solid", 	// 边框样式
						"radius":"50%" 		// 边框圆角，支持百分比
					}
				},
				users:[
					{
						id:1,
						selected:false,
						avatar:'../../static/images/index/b.png',
						sign:'是否色弱'
					},
					{
						id:2,
						selected:true,
						avatar:'../../static/images/index/c.png',
						sign:'实际付款时间'
					},
					{
						id:3,
						selected:true,
						avatar:'../../static/images/index/f.png',
						sign:'让我二批无人陪我日额外时间'
					},
					{
						id:4,
						selected:false,
						avatar:'../../static/images/index/n.png',
						sign:'仍然'
					},
					{
						id:5,
						selected:true,
						avatar:'../../static/images/index/m.png',
						sign:'热日恶评日特额头儿热特头儿皮特如图菲特泰热熔胎额哦热评热帖'
					},
					{
						id:6,
						selected:false,
						avatar:'../../static/images/index/s.png',
						sign:'尔特人'
					},
					{
						id:7,
						selected:false,
						avatar:'../../static/images/index/t.png',
						sign:'绒哦人'
					},
					{
						id:8,
						selected:true,
						avatar:'../../static/images/index/m.png',
						sign:'热日恶评日特额头儿热特头儿皮特如图菲特泰热熔胎额哦热评热帖'
					},
					{
						id:9,
						selected:false,
						avatar:'../../static/images/index/s.png',
						sign:'尔特人'
					},
					{
						id:10,
						selected:false,
						avatar:'../../static/images/index/t.png',
						sign:'绒哦人'
					},
					{
						id:11,
						selected:true,
						avatar:'../../static/images/index/m.png',
						sign:'热日恶评日特额头儿热特头儿皮特如图菲特泰热熔胎额哦热评热帖'
					},
					{
						id:12,
						selected:false,
						avatar:'../../static/images/index/s.png',
						sign:'尔特人'
					},
					{
						id:13,
						selected:false,
						avatar:'../../static/images/index/t.png',
						sign:'绒哦人'
					}
					
				]
			};
		},
		components:{
			TopBar,
			TabBar
		},
		computed:{
			// 统计创建人数
			total() {
				return this.users.reduce((prev,next) =>  {
					if(next.selected) {
						prev++
					}
					return prev
				},0)
			},
			// 控制建群按钮
			color() {
				return this.total > 0 && this.groupName.length > 0
			}
		},
		methods:{
			// 选中
			handleSelect:function(id) {
				console.log(id)
				this.users.forEach(item => {
					if(item.id === id) {
						return item.selected = !item.selected
						
					}
				})
			},
			// 创群
			createGroup:function() {
				if(this.color) {
					console.log(123)
				}
			},
			change:function(e) {
				console.log(e)
			},
			handleCancal:function() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">

.create-group{
	// 处理导航层叠
	padding-top: calc(44px + var(--status-bar-height));
	
	.main{
		
		.group{
			.avatar-box{
				position: relative;
				margin: 30px auto;
				width: 98px;
				height: 98px;
				background: #FFE431;
				box-shadow: 0px 18px 20px 0px rgba(39,40,50,0.1);
				border-radius: 20px;
				.change-avatar{
					width: 80px;
					height: 80px;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				
					.avatar{
						width: 80px;
						height: 80px;
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
					
					}
				}

				.update{
					width: 20px;
					height: 20px;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				}
			}
			.name{
				width: 343px;
				height: 46px;
				background: #F3F4F6;
				border-radius: 23px;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				input{
					text-align: center;
				}
				
			}
		}
		
		.users{
			margin: 20px 16px;
			.title{
				height: 30px;
				font-family: PingFangSC-Semibold;
				font-size: 22px;
				color: #272832;
				padding-bottom: 5px;
				
			}
			.user-list{
				height: calc(100vh - 380px);
				overflow: auto;
				.user-item{
					display: flex;
					align-items: center;
					height: 50px;
					margin: 10px 0px;
					
					.selected{
						width: 24px;
						height: 24px;
						line-height: 24px;
						text-align: center;
						background: #FFE431;
						border-radius: 12px;
						image{
							width: 15px;
							height: 12px;
						}
					}
					.isSelected{
						background: rgba(255,228,49,0.50);
					}
					.img{
						margin: 0px 16px;
						height: 100%;
						display: flex;
						align-items: center;
						image{
							width: 40px;
							height: 40px;
							border-radius: 10px;
						}
					}
					.sign{
						flex: 1;
						height: 25px;
						font-family: PingFangSC-Regular;
						font-size: 18px;
						color: #272832;
						letter-spacing: -0.62px;
						font-weight: 400;
						overflow: hidden; /* 隐藏溢出的内容 */
						  white-space: nowrap; /* 强制不换行 */
						  text-overflow: ellipsis; /* 超出部分显示省略号 */
						
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
