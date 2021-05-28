<template>
	<view class="content">
		<van-overlay :show="show">
		  <view class="wrapper">
		    <view class="box">
					<view class="title">微信授权登录</view>
					<image class="img" src="../static/home/login.png"></image>
					<view class="text">
						<view>点击“立即登录”，选择您常用的手机号点击“允许”。</view>
						<view class="bottom">如您不想登录，请点击“暂不登录”</view>
					</view>
					<view class="btns">
						<button class="cancel" @click="close">暂不登录</button>
						<button class="login">立即登录</button>
					</view>
				</view>
		  </view>
		</van-overlay>
	</view>
</template>

<script>
export default{
	data() {
		return{
			show: false,
			
		}
	},
	methods: {
		// 打开弹窗
		open() {
			this.show = true;
		},
		// 关闭弹窗
		close() {
			this.show = false;
		}
	}
}
</script>

<style lang="scss" scoped>
.wrapper{
	width: 100%;
	.box{
		width: 514rpx;
		background-color: #fff;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		.title{
			font-size: 30rpx;
			color: #000;
			margin-top: 46rpx;
		}
		.img{
			display: block;
			width: 130rpx;
			height: 130rpx;
			margin: 54rpx 0;
		}
		.text{
			width: calc(100% - 100rpx);
			font-size: 26rpx;
			color: #9C9C9C;
			line-height: 40rpx;
			.bottom{
				margin-top: 6rpx;
			}
		}
		.btns{
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 60rpx 0;
			.cancel,.login{
				width: 160rpx;
				height: 50rpx;
				border-radius: 8rpx;
				line-height: 50rpx;
				font-size: 26rpx;
			}
			.cancel{
				background-color: #DBDBDB;
				color: #585858;
				margin-right: 50rpx;
			}
			.login{
				color: #fff;
				background-color: #76C9B0;
			}
		}
	}
}
</style>
