<template>
	<view class="content">
		<home class="home"  @overlayShow="overlayShow"></home>
		<tab-bar @currentPage="currentPage"></tab-bar>
		
		<van-overlay :show="show">
		  <view class="wrapper">
		    <view class="loading">
					<image class="img" src="../../static/home/loading.png"></image>
					<view class="loading-text">出袋中</view>
					<view class="text">请等待出袋完成</view>
				</view>
		  </view>
		</van-overlay>
	</view>
</template>

<script>
import home from './components/home.vue'
import tabBar from '../../components/tabBar.vue'
export default {
	components:{
		home,
		tabBar
	},
	data() {
		return {
			active: 'bag',
			show: false,
		}
	},
	onLoad() {

	},
	methods: {
		/** 当前tabbar选中 */
		currentPage(val) {
			this.active = val
		},
		/** 出袋弹窗 */
		overlayShow(val) {
			this.show = val
		}
	}
}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.home{
			width: 100%;
		}
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.wrapper{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.loading{
			width: 330rpx;
			height: 350rpx;
			background: #FFFFFF;
			border: 1px solid #707070;
			opacity: 1;
			border-radius: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.img{
				width: 130rpx;
				height: 130rpx;
			}
			.loading-text{
				font-size: 30rpx;
				color: #090909;
				margin: 20rpx 0 14rpx;
			}
			.text{
				font-size: 26rpx;
				color: #9C9C9C;
			}
		}
	}
</style>
