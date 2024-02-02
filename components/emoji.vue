<template>
	<view class="emoji">
		<view class="emoji-j" v-for="(emo,index) in emoji" 
		:key="index">
			<view class="emoji-i" v-for="(item,index) in emo" 
			:key="index" @tap="changeEmoji(item)">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"emoji",
		data() {
			return {
				emoji:[
					['😀','😁','😂','🤣','😃','😄','😅'],
					['😆','😉','😊','😋','😎','😍','😘'],
					['😗','😚','🤗','🙂','🤔','😐','😑'],
					['😣','😥','😮','🤐','😶','🙄','😏'],
					['😴','😌','😜','🤤','😒','😪','😫'],
					['🙃','😔','🤑','😲','😤','😭','😓'],
					['😨','😬','😰','😱','😳','😵','😡'],
					['😷','🤒','🤕','🤢','🤧','😇','🤠'],
					['🤡','🤥','🤓','👹','👺','💀','👻'],
					['👽','😺','😹','😻','😼','😽','😽'],
					['😿','😾']
					
				]
			};
		},
		methods: {
			changeEmoji:function(item) {
				this.$emit('emoji',item)
			}
		}
	}
</script>

<style lang="scss">
.emoji{
	height: 218px;
	overflow: auto;
	
	.emoji-j{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 50px;
		
		.emoji-i{
			font-size: 23px;
		}
	}
}
</style>