<template>
	<view class="popup">
		<view class="top">
			<view class="left" @click='handleCancal'>取消</view>
			<view class="center">{{newTilte}}</view>
			<view class="right" @click="handleConfirm">确定</view>
		</view>
		
		<view class="main">
			<view class="update">
				<input v-if="isPassword" type="text" value="" placeholder="请输入原密码"/>
				<textarea v-model="message" name="" id="" cols="30" rows="10" :placeholder="newTilte" />
			</view>
		</view>
	</view>
</template>

<script>
	import TopBar from '../components/TopBar.vue'
	
	export default {
		name:"Popup",
		props:{
			title:Object,
			isPassword:Boolean
		},
		data() {
			return {
				message:''
			};
		},
		components:{
			TopBar
		},
		computed:{
			newTilte() {
				return Object.values(this.title)[0]
			}
		},
		methods:{
			// 取消
			handleCancal:function() {
				this.$emit('cancal')
			},
			// 确定
			handleConfirm:function() {
				let type = Object.keys(this.title)[0]
				let data = {
					type,
					content:this.message
				}
				this.$emit('confirm',data )
				
			}
		}
	}
</script>

<style lang="scss">
.popup{
	width: 100vw;
	height: 100vh;
	z-index: 3;
	background: #fff;
	
	.top{
		padding: 0 16px;
		height: calc(44px + var(--status-bar-height));
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid $uni-border-color;
		
		.right{
			color: $uni-color-success;
		}
	}
	
	.main{
		.update{
			margin-top: 17px;
			display: flex;
			flex-direction: column;
			align-items: center;
		
			textarea,input{
				box-sizing: border-box;
				width: 90%;
				height: 193px;
				background: #F3F4F6;
				border-radius: 10px;
				padding: 10px;
				margin: 8px 0;
			}
			input{
				height: 50px;
			}
		}
	}
	
}
</style>