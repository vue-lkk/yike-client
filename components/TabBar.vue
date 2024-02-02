<template>
	<view class="tabbar">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="center">
			<slot name="center"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"TabBar",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.tabbar{
	display: flex;
	justify-content: center;
	
	.left{
		
	}
	.center{
		flex: 1;
		margin-left:10px;
		
	}
	.right{
		// margin-left:10px;
	}
	
}
</style>