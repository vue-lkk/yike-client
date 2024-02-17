<template>
	<!-- 头部 -->
	<view class="top-bar" 
	:class="isBorderBottom?'borderBottom':''" 
	:animation='animation'>
		<view class="top-bar-left" @click="avatar">
			<slot name="left"></slot>
		</view>
		<view class="top-bar-center">
			<slot name="center"></slot>
		</view>
		<view class="top-bar-right">
			<view class="search" @click="search">
				<slot name="search"></slot>
			</view>
			<view class="add" @click="add">
				<slot name="add"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TopBar",
		props: {
			isBorderBottom: {
				type: Boolean, //类型 
				required: false, //必要性 
				default: false //默认值 
			},
			animation:{
				type:Object
			}
		},
		data() {
			return {

			};
		},
		mounted() {
			// console.log('@',this.$props.isBorderBottom)
		},
		methods: {
			search() {
				// 触发自定义的 search 事件，向外传递点击事件
				this.$emit('search')
			},
			add() {
				// 触发自定义的 add 事件，向外传递点击事件
				this.$emit('add')
			},
			avatar() {
				// 触发自定义的 avatar 事件，向外传递点击事件
				this.$emit('avatar')
			}

		}
	}
</script>

<style lang="scss">
	// 头部
	::v-deep.top-bar {
		z-index: 2;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		// 粘性定位
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		// 处理导航层叠
		height: calc(44px + var(--status-bar-height));
		// 处理导航层叠
		padding-top: var(--status-bar-height);
		background: $uni-bg-color;
		// background: #FF5D5B;
		padding-left: $uni-spacing-col-base;
		padding-right: $uni-spacing-col-base;
		

		// 头部-左边
		.top-bar-left {
			image {
				width: 34px;
				height: 34px;
				border-radius: $uni-border-radius-sm;
			}
		}
		// 头部-中间
		.top-bar-center {
			margin-left: 20px;

			image {
				width: 44px;
				height: 21px;
			}
		}
		// 头部-右边
		.top-bar-right {
			display: flex;

			.search {
				margin-right: 20px;

				image {
					width: 26px;
					height: 26px;
				}
			}

			.add {
				image {
					width: 24px;
					max-height: 24px;
				}
			}
		}
	}
	::v-deep.borderBottom {
		border-bottom: 1px solid $uni-border-color;
	}
	
	.isBackground{
		background: transparent;
	}
</style>