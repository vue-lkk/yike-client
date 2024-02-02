<template>
	<view class="chat">
		<!-- 头部 -->
		<view class="top">
			<TopBar @avatar="handleAvatar" @add='toGroup' isBorderBottom>
				<template #left>
					<uni-icons type="left" size="23"></uni-icons>
				</template>
				<template #center>
					<view class="">小米</view>
				</template>
				<template #add>
					<image src="../../static/images/index/m.png"></image>
				</template>
			</TopBar>
		</view>

		<scroll-view 
		scroll-y="true" 
		class="scroll-Y" 
		:scroll-into-view='scrollToView' 
		scroll-with-animation
		@scroll='handleScroll' 
		:style="{ height: computedHeight }"
		refresher-enabled
		:refresher-threshold='50'
		refresher-background='rgb(249 249 249)'
		:refresher-triggered="triggered"
		@refresherpulling="onPulling"
		@refresherrefresh="onRefresh" 
		@refresherrestore="onRestore" 
		>
			<view class="main">
				<view class="chat-msg" v-for="item in msgs" :key="item.tip" :id="'lkk'+item.tip">
					<view class="time" v-if="item.istime">{{formatTime(item.time)}}</view>
					<view class="chat-info" :class="item.id === 'a'?'left':'right'">
						<view class="img">
							<image :src='item.imgurl' mode=""></image>
						</view>
						<view class="msg" :class="item.types===1 || item.types===3 ?'isbg':''">
							<!-- 语音 类型：3 -->
							<view class="" v-if="item.types===3">
								<view class="map" @tap='openLocation(item.message)'>
									<view class="map-name">{{item.message.name}}</view>
									<view class="map-address">{{item.message.address}}</view>
									<!-- <cover-view style="position: relative">
										<map class="map-img"
										:latitude="item.message.latitude" 
										:longitude="item.message.longitude" 
										:markers="covers(item.message)"
										></map>
									</cover-view> -->
									<image class="map-img" src="../../static/images/chat/map.png" mode="widthFix"></image>
								</view>
							</view>
							<!-- 语音 类型：2 -->
							<view class="" v-if="item.types===2" @tap="playVoice(item.message.voice)">
								<view class="voice" :style="{width:item.message.time*10 + 'px'}" >
									<image src="../../static/images/chat/yy.png" mode=""></image>
									<view class="" :style="">
										{{item.message.time}}s
									</view>
								</view>
							</view>
							<!-- 图片 类型：1 -->
							<view class="" v-if="item.types===1" @tap="previewImage(item.message)">
								<image :src="item.message" mode="widthFix"></image>
							</view>
							<!-- 文字 类型：0 -->
							<view class="" v-if="item.types===0">
								{{item.message}}
							</view>
						</view>
					</view>
				</view>
				<!-- 占位 var(--status-bar-height)-->
				<view class="zw"></view>
			</view>
		</scroll-view>

		<Sumbit @msgs='handleMsg' @getHeight='handleHeight' ></Sumbit>

	</view>
</template>

<script>
	import data from '../../components/js/data.js'
	// 格式化时间
	import formatTime, {spaceTime,spaceTime1} from '../../components/js/formatTime.js'
	import TopBar from '../../components/TopBar.vue'
	import Sumbit from '../../components/Sumbit.vue'
import { now } from 'lodash';
	// 音频
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		name:"Chat",
		data() {
			return {
				msgs: [],  // 聊天数据
				chatLists:[], // 模拟聊天数据
				imgUrls: [], //图片预览
				nowTime: new Date(), // 当前时间
				scrollToView: '', // 动态设置滚动到对应DOM的id
				activeHeight: '53', // 动态控制底部输入框的高度
				id:0, // 使用 marker点击事件 需要填写id
				triggered:true, // 控制下拉
				page:1,  // 页码
				pageSize:5, //每页条数
			};
		},
		components: {
			TopBar,
			Sumbit
		},
		onLoad() {
			// 获取模拟聊天数据
			this.chatLists = data.message()
			
			this._freshing = false;
			setTimeout(() => {
					this.triggered = true;
			}, 1000)
		},
		onReady() {
			this.getMsg()
		},
		computed: {
			computedHeight() {
				// 在这里进行计算，可以使用动态值 activeHeight
				return `calc(100vh - 45px - ${this.activeHeight}px)`;
			},
			limit() {
				return (this.page - 1) * this.pageSize
			}
		},
		methods: {
			toGroup:function() {
				uni.navigateTo({
					url:'/pages/group/group'
				})
			},
			// 下拉
			onPulling(e) {
					// console.log("onpulling", e);
			},
			// 下拉刷新
			onRefresh() {
				if (this._freshing) return;
				this._freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
					// 页码+1
					this.page++
					// 获取下一页聊天数据
					this.getMsg(this.page,this.pageSize,false)
					// 先清空之前的滚动位置
					this.scrollToView = ''
					// 通过$nextTick() 修改scrollToView,实现一进来滚动到顶部
					this.$nextTick(() => {
						this.scrollToView = 'lkk' + this.msgs[this.pageSize-2].tip
					})
				}, 1000)
			},
			// 下拉复位
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			// 查看地图位置
			openLocation:function(data) {
				uni.openLocation({
					latitude: data.latitude,
					longitude: data.longitude,
					name:data.name,
					address:data.address,
					success: function () {
						console.log('success');
					}
				});
			},
			// 设置地图定位图标
			covers:function(data) {
				console.log(data)
				let map = [{
					latitude: data.lastInde,
					longitude: data.longitude,
					iconPath: '../../static/images/chat/dw.png'
				}]
				return (map)
			},
			// 播放语音
			playVoice:function(voicePath) {
				innerAudioContext.src = voicePath
				innerAudioContext.play();
			},
			// 接收发送过来的高度
			handleHeight: function(height) {  
				console.log(height)
				this.activeHeight = height
				this.goBottom()
			},
			// 滚动到底部
			goBottom: function() {
				// 先清空之前的滚动位置
				this.scrollToView = ''
				// 通过$nextTick() 修改scrollToView,实现一进来滚动到底部
				this.$nextTick(() => {
					let lastInde = this.msgs.length - 1
					this.scrollToView = 'lkk' + this.msgs[lastInde].tip
				})
			},
			// 接收发送过来的消息
			handleMsg: function(data) {
				const {message, types} = data
				// let len = this.msgs.length
				let len = +new Date()
				console.log(len)
				let datas = {
					id: 'b', // 用户id
					imgurl: '../../static/images/index/a.png',
					message,
					types, // 内容类型（0文字、1图片链接、2音频链接、3地图）
					time: new Date() ,
					tip: len
				}
				// 3.时间间隔,5分钟
				let t = spaceTime1(this.nowTime, datas.time)
				if (t) {
					// 如果成立,修改初始化的时间
					this.nowTime = t
				}
				// 添加标识，来判断是否显示时间
				datas.istime = t
				// 将一条消息push到最后
				this.msgs.push(datas)
				// 如果发送的时图片,将图片加入到预览
				if(types === 1) {
					this.imgUrls.push(datas.message)
				}
				// 滚动到指定的dom
				this.goBottom()
			},
			// 监听滚动
			handleScroll: function(e) {
				
			},
			// 格式化时间
			formatTime(time) {
				// console.log(formatTime.dateTime(new Date() - 60 * 60))
				return formatTime.dateTime(time)
			},
			handleAvatar: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 根据页码获取聊天数据并处理
			getMsg: function(page=this.page,pageSize=this.pageSize,isScroll=true) {
				console.log(this.limit,isScroll)
				// 先按照时间大到小排序，从最近聊天取到历史聊天记录
				let arr = this.chatLists.sort((a,b) => b.time-a.time).slice(this.limit,pageSize*page)
				// console.log('#arr',arr)
				// console.log('@',this.msgs)
				
				// 判断下拉历史聊天记录全部加载
				if(arr.length > 0) {
					this.msgs = [...arr,...this.msgs]
				}else{
					return false
				}
				
				// 遍历
				this.msgs.map(item => {
					// 1.补充图片地址,防止再次补充图片地址
					if(item.imgurl.length < 30) {
						item.imgurl = `../../static/images/index/${item.imgurl}`
					}
					// 2.判断消息类型  // 补充图片地址,防止再次补充图片地址
					if (item.types === 1 && item.message.length < 30) {
						item.message = `../../static/images/index/${item.message}`
						// 收集预览图片
						this.imgUrls.unshift(item.message)
					}
					// 3.时间间隔,5分钟
					let t = spaceTime(this.nowTime, item.time)
					if (t) {
						// 如果成立,修改初始化的时间
						this.nowTime = t
					}
					// 添加标识，来判断是否显示时间
					item.istime = t
				})
				// 排序
				console.log('$$',this.msgs)
				this.msgs = this.msgs.sort((a, b) => a.time - b.time)
					
				if(!isScroll) {
					return
					
				}
				this.goBottom()
				
			},
			// 图片预览
			previewImage: function(imgurl) {
				uni.previewImage({
					current: imgurl,
					urls: this.imgUrls,
					loop: true
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background: #f9f9f9;
	}

	.chat {
		box-sizing: border-box;
		// 处理导航层叠
		padding-top: calc(44px + var(--status-bar-height));
		height: 100%;
		background: #f9f9f9;

		.top {
			.top-bar {
				background: #f9f9f9;

				.image {
					border-radius: 5px;
				}
			}
		}

		.main {

			.chat-msg {
				padding: 0 16px;
				overflow: hidden;

				.time {
					text-align: center;
					font-size: 12px;
					color: rgba(39, 40, 50, 0.30);
					padding: 10px 0;
				}

				.chat-info {
					display: flex;
					margin: 10px 0;

					.img {
						image {
							width: 40px;
							height: 40px;
							border-radius: 10px;
						}
					}

					.msg {
						max-width: 190px;
						border-radius: 0px 10px 10px 10px;
						padding: 5px 10px;
						margin: 0px 10px;
						line-height: 25px;
						font-size: 14px;
						color: #272832;
						display: flex;
						align-items: center;

						image {
							max-width: 160px;
							max-height: 200px;
							border-radius: 10px;
							border: 1px solid #ebeaea;
						}
					}

				}
				// 左
				.left {
					.msg {
						background: $uni-bg-color;
						// 地图
						.map{
							border-radius: 5px;
							overflow: hidden;
							.map-name{
								font-size: 14px;
								background-color: #fff;
								padding: 0 10px;
								display: -webkit-box; /* 使用flex布局 */
								-webkit-box-orient: vertical; /* 垂直方向 */
								overflow: hidden;
								text-overflow: ellipsis; /* 超出部分显示省略号 */
								-webkit-line-clamp: 3; /* 显示的行数 */
							}
							.map-address{
								padding: 0 10px;
								font-size: 10px;
								color: #ccc;
								background-color: #fff;
								height: 15px;
								line-height: 8px;
								display: -webkit-box; /* 使用flex布局 */
								-webkit-box-orient: vertical; /* 垂直方向 */
								overflow: hidden;
								text-overflow: ellipsis; /* 超出部分显示省略号 */
								-webkit-line-clamp: 3; /* 显示的行数 */
							}
							.map-img{
								border: none;
								border-radius: 0;
								width: 300px;
								height: 100px;
							}
						}
						
						// 语音
						.voice{
							display: flex;
							align-items: center;
							max-width: 200px;
							min-width: 50px;
							image{
								width: 14px;
								height: 18px;
								border: none;
								transform:rotate(180deg);
								margin-right:10px;
							}
						}
					}
					// 判断图片时背景透明
					.isbg {
						background: transparent;
					}
				}
				// 右
				.right {
					flex-direction: row-reverse;
					.msg {
						border-radius: 10px 0px 10px 10px;
						background: $uni-color-primary;
					
						// 地图
						.map{
							border-radius: 5px;
							overflow: hidden;
							max-width: 160px;
							.map-name{
								font-size: 14px;
								background-color: #fff;
								padding: 0 8px;
								display: -webkit-box; /* 使用flex布局 */
								-webkit-box-orient: vertical; /* 垂直方向 */
								overflow: hidden;
								text-overflow: ellipsis; /* 超出部分显示省略号 */
								-webkit-line-clamp: 1; /* 显示的行数 */
								
							}
							.map-address{
								padding: 0 8px;
								font-size: 10px;
								color: #ccc;
								background-color: #fff;
								height: 15px;
								line-height: 15px;
								display: -webkit-box; /* 使用flex布局 */
								-webkit-box-orient: vertical; /* 垂直方向 */
								overflow: hidden;
								text-overflow: ellipsis; /* 超出部分显示省略号 */
								-webkit-line-clamp: 1; /* 显示的行数 */
								
							}
							.map-img{
								border: none;
								border-radius: 0;
								height: 100px;
							}
						}
						
						// 语音
						.voice{
							display: flex;
							align-items: center;
							flex-direction: row-reverse;
							max-width: 200px;
							min-width: 50px;
							image{
								width: 14px;
								height: 18px;
								border: none;
								margin-left:10px;
							}
						}
					}
					// 判断图片时背景透明
					.isbg {
						background: transparent;
					}
				}
			}

			.zw {
				height: calc(var(--status-bar-height));
				width: 100%;
			}
		}

		.chat-send {
			// width: 100%;
			// max-width: 200px;
		}
	}
</style>