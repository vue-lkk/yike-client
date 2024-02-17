<template>
	<view class="cropping-image">
		<input type="file" @change="handleFileSelect">
		<canvas ref="canvas" width="300" height="300"></canvas>
	</view>
</template>

<script>
	export default {
		name: "avatarClip",
		data() {
			return {
				ctx: null
			};
		},
		methods: {
			handleFileSelect(event) {
				const file = event.target.files[0];
				const reader = new FileReader();
				reader.onload = () => {
					const img = new Image();
					img.onload = () => {
						const canvas = this.$refs.canvas;
						const ctx = canvas.getContext('2d');
						canvas.width = 200;
						canvas.height = 200;
						ctx.drawImage(img, 0, 0, 200, 200);
					}
					img.src = reader.result;
				}
				reader.readAsDataURL(file);
			}
		}
	}
</script>

<style lang="less">
.cropping-image {
  text-align: center;
}
</style>