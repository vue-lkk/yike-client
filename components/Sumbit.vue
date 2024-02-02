<template>
	<view class="submit">
		<view class="sumbit-chat">
			<!-- 切换语音图标 -->
			<view class="bt-img" @tap="changeRecord">
				<image src="../static/images/submit/yy.png" mode="" v-show="isRecord"></image>
				<image src="../static/images/submit/jp.png" mode="" v-show="!isRecord"></image>
			</view>
			<!-- 输入文本 -->
			<textarea @focus="focusEmoji" cursor-color='#ffe431' auto-height class="chat-send btn" v-if="isRecord" v-model="message" @input='sendMsg'></textarea>
			<!-- 输入语音 -->
			<view class="record btn" v-else 
			@touchstart="startRecord" 
			@touchend="endRecord" 
			@touchmove='moveRecord'>按住 说话</view>
			<!-- 表情图标 -->
			<view class="bt-img" @tap="changeEmoji">
				<image :src="!isEmoji?require('../static/images/submit/bq.png'):require('../static/images/submit/jp.png')" mode="" ></image>
			</view>
			<!-- 更多图标 -->
			<view class="bt-img" @tap="more">
				<image src="../static/images/index/add.png" mode=""></image>
			</view>
		</view>
		<!-- 表情 -->
		<view class="emoji" v-show="isEmoji">
			<view class="send-box">
				<view class="del" @tap="back">
					<image src="../static/images/submit/back.png" mode=""></image>
				</view>
				<view class="send" @tap="sendEmoji">发送</view>
			</view>
			<Emoji @emoji='handleEmoji'/>
		</view>
		<!-- 更多 -->
		<view class="more" v-show="isMore">
			<view class="more-list">
				<view class="more-itme" v-for="(item,index) in iconList" :key="index">
					<div @tap="sendMore(item.type)">
						<image :src="item.icon"></image>
					</div>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<!-- 取消音频遮罩层 -->
		<view class="voice-mask" v-show="ismask">
			<view class="voice">
				<view class="progress" :style="{width:recordTime/0.6*10 + 'px'}">{{recordTime}}"</view>
			</view>
			<view class="cancal">
				上滑取消语音
			</view>
		</view>
	</view>
</template>

<script>
import { conforms, forEach } from 'lodash';
import Emoji from '../components/emoji.vue'

// 录音对象
const recorderManager = uni.getRecorderManager();
	
	export default {
		name: "Sumbit",
		data() {
			return {
				isRecord:true, //切换语音
				isEmoji:false, //切换表情
				isMore:false,  //切换更多
				message:'',    //发送内容
				timer:null,    //计时器
				recordTime:0,  //录音计数
				voicePath: '', //语音路径
				ismask:false,  //控制语音遮罩层
				pageY:'',      //上滑动
				isSend:true,   //控制发送
				iconList:[
					{
						icon: require('../static/images/submit/tp.png'),
						name:'图片',
						type:'album'
					},
					{
						icon:require('../static/images/submit/pz.png'),
						name:'拍照',
						type:'camera'
					},
					{
						icon:require('../static/images/submit/sp.png'),
						name:'视频通话',
						type:''
					},
					{
						icon:require('../static/images/submit/dw.png'),
						name:'位置',
						type:'location'
					},
					{
						icon:require('../static/images/submit/wj.png'),
						name:'文件',
						type:''
					}
				]
			};
		},
		components:{
			Emoji
		},
		computed:{
			
		},
		watch:{
			isEmoji() {
				console.log(123)
				if(this.isEmoji) {
					this.isRecord = true
				}
			}
		},
		methods:{
			// 开始录音
			startRecord:function(e) {
				this.ismask = true
				console.log(e.changedTouches[0].pageY)
				this.pageY = e.changedTouches[0].pageY
				this.recordTime = 0
				this.timer = setInterval(() => {
					this.recordTime++
				},1000)
				recorderManager.start(); 
			},
			// 结束录音
			endRecord:function(e) {
				this.ismask = false
				console.log(this.voicePath)
				clearInterval(this.timer)
				if(this.recordTime !== 0 && this.isSend) {
					// 录音结束
					recorderManager.stop();
					// console.log(e)
					clearInterval(this.timer)
					
					// 监听录音结束
					recorderManager.onStop((res) => {
						console.log('recorder stop' + JSON.stringify(res));
						// 拿到录音:{"tempFilePath":"_doc/uniapp_temp_1706608456922/recorder/1706608460769.mp3"}
						this.voicePath = res.tempFilePath;
						let data = this.types({voice:this.voicePath,time:this.recordTime,}, 2)
						this.$emit('msgs', data)
						this.getHeight()
					});
				}
			},
			// 上滑取消语音
			moveRecord:function(e) {
				if(this.pageY - e.changedTouches[0].pageY  > 55) {
					this.ismask = false
					this.isSend = false
				}
			},
			// 切换更多
			more:function() {
				this.isMore = !this.isMore
				this.isEmoji = false
				this.$nextTick(() => {
					this.getHeight()
				})
			},
			// 获取表情
			handleEmoji:function(emoji) {
				console.log(emoji)
				this.message += emoji
			},
			// 获取高度
			getHeight:function() {
				const query = uni.createSelectorQuery().in(this);
				query
				  .select(".submit")
				  .boundingClientRect((data) => {
				    console.log("得到布局位置信息" + JSON.stringify(data));
				    console.log("节点离页面顶部的距离为" + data.height);
						let {height} = data
						this.$emit('getHeight',height)
				  })
				  .exec();
			},
			// 切换语音
			changeRecord:function() {
				this.isRecord = !this.isRecord
				this.isEmoji = false
				this.isMore = false
				this.$nextTick(() => {
					this.getHeight()
				})
			},
			// 输入框聚焦
			focusEmoji:function() {
				this.isEmoji = false
				this.isMore = false
				this.$nextTick(() => {
					this.getHeight()
				})
			},
			// 切换表情
			changeEmoji:function() {
				this.isEmoji = !this.isEmoji
				this.isMore = false
				this.$nextTick(() => {
					this.getHeight()
				})
				
			},
			// 文字发送
			sendMsg:function(e) {
				let chatm = e.detail.value
				// 判断回车
				let pos = chatm.indexOf('\n')
				if(pos != -1 && chatm.length > 1) {
					let data = this.types(this.message, 0)
					this.$emit('msgs', data)
					setTimeout(() => {
						this.message = ''
					},10)
				}
			},
			// 发送表情
			sendEmoji:function() {
				let data = this.types(this.message, 0)
				this.$emit('msgs', data)
				this.message = ''
			},
			sendMore:function(sendType) {
				// 图片/拍照
				if(sendType === 'album' || sendType === 'camera') {
					uni.chooseImage({
						count: 9, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册、拍照选择
						success: (res) => {
							console.log(JSON.stringify(res.tempFilePaths));
							// 遍历发送多张图片
							res.tempFilePaths.forEach(item => {
								let data = this.types(item,1)
								this.$emit('msgs',data)
							})
						}
					});
				}
				// 地图位置
				if(sendType === 'location') {
					uni.chooseLocation({
						success:(res) => {
							let location = { 
								name:res.name,
								address:res.address,
								latitude:res.latitude,
								longitude:res.longitude
							}
							let data = this.types(location,3)
							this.$emit('msgs',data)
					
							console.log('位置名称：' + res.name);
							console.log('详细地址：' + res.address);
							console.log('纬度：' + res.latitude);
							console.log('经度：' + res.longitude);
						}
					})
				}

			},
			// 处理发送内容的类型 【文字、图片、音频】
			types:function(message,types) {
				let data = {
					message,
					types
				}
				return data
			},
			// 回退
			back:function() {
				this.message = this.message.slice(0, this.message.length - 1)
			}
		}
	}
</script>

<style lang="scss">
	.submit {
		position: fixed;
		width: 100%;
		bottom: 0;
		background: #f7f7f7;
		box-shadow: inset 0px 0.5px 0px 0px rgba(0,0,0,0.1);  
		box-sizing: border-box;
		padding: 8px;
		z-index: 1000;
		
		// 提交消息
		.sumbit-chat {
			display: flex;
			align-items: flex-end;
			
			// 图标
			.bt-img {
				image {
					width: 28px;
					height: 28px;
					margin: 0 5px;
				}
			}
			// 发送聊天
			.chat-send {
				flex: 1;
				background: #FFFFFF;
				border-radius: 10px;
				padding: 8px;
				max-height: 80px;
				overflow: hidden;
			
			}
			// 语音
			.record {
				display: flex;
				flex: 1;
				background: #FFFFFF;
				border-radius: 10px;
				padding: 8px;
				max-height: 80px;
				overflow: hidden;
				justify-content: center;
				
			}
		}
		
		// 表情
		.emoji {
			height: 218px;
			background: #f1f1f1;
			padding-bottom: 50px;
			margin-top: 10px;
			border-radius: 8px;
			bottom: env(safe-area-inset-bottom);
			
			.send-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 88px;
				height: 30px;
				padding: 6px 10px 20px;
				position: absolute;
				right: 8px;
				bottom: 8px;
				background-color: #f1f1f1;
				
				.del,.send{
					width: 40px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					background-color: $uni-color-primary;
					font-size: 14px;
					border-radius: 5px;
				}
				.del{
					background-color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						height: 19px;
						width: 23px;
					}
				}
				.send{
					
				}
			}
		
		}
		
		// 更多
		.more{
			height: 218px;
			background: #f1f1f1;
			padding-bottom: 50px;
			margin-top: 10px;
			border-radius: 8px;
			bottom: env(safe-area-inset-bottom);
			.more-list{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				.more-itme{
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					width: 15%;
					height: 25%;
					margin: 10px 5%;
					
					image{
						width: 25px;
						height: 25px;
						background: #FFFFFF;
						border-radius: 10px;
						padding: 10px;
					}
					.name{
						font-size: 12px;
						margin-top: 5px;
					}
				}
		
			}
		}
		
		// 取消语音遮罩层
		.voice-mask{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 53px;
			background: rgba(0,0,0,0.5);
			.voice{
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: auto;
				width: 230px;
				height: 35px;
				background: #fff;
				border-radius: 34px;
				display: flex;
				justify-content: center;
						
				.progress{
					min-width: 50px;
					max-width: 230px;
					height: 35px;
					background: rgba(255,228,49,1);
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 35px;
				}
			}
			.cancal{
				position: absolute;
				bottom: 10px;
				left: 50%;
				transform:translate(-50%);
				color: #FFFFFF;
				font-size: 14px;
			}
			
		}
	}
</style>