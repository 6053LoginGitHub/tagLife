<template>
	<scroll-view class="content" :scroll-y="true">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,itex) in swipers" :key="index">
					<view class="swiper-item">
						<image class="img" :src="item.img"></image>
					</view>
			</swiper-item>
		</swiper>
		<view class="get-bag-box">
			<view class="device-name">观音桥香港城2号机</view>
			<view class="notice">{{nums == 0 ? '' : '观看广告视频'}}</view>
			<button class="btn" :class="nums == 0 ? 'gray' : ''" :disabled="nums == 0" @click="showFullScreenVideoAd">免费领取可降解环保袋</button>
			<view class="get-nums">今日还可领取 <text class="num">{{ nums }}</text> 个</view>
			<view class="result" v-show="isSuccess">出袋成功</view>
		</view>
		
		<view class="ad-view">
			<ad unit-id="https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/ad/rewarded-video-ad.html" ad-intervals="100"></ad>
		</view>
		<van-overlay :show="show">
		  <view class="wrapper">
		    <view class="loading">
					<image class="img" src="../../../static/home/loading.png"></image>
					<view class="loading-text">出袋中</view>
					<view class="text">请等待出袋完成</view>
				</view>
		  </view>
		</van-overlay>
	</scroll-view>
</template>

<script>
import AD from '../../../api/ad.js'
export default{
	data(){
		return{
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			swipers: [
				{ img: require('../../../static/swiper/1.jpg')},
				{ img: require('../../../static/swiper/2.jpg')},
				{ img: require('../../../static/swiper/3.jpg')},
			],
			show: false,
			nums: 10,
			isSuccess: false,
			height: 0,
			title: '激励视频'
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.height = res.windowHeight+"px"
			}
		});
	},
	methods:{
		/** 领袋 */
		receiveBag() {
			this.show = !this.show;
			setTimeout(()=>{
				this.show = !this.show;
				this.isSuccess = true;
				setTimeout(()=>{
					this.isSuccess = false;
				},2000)
				if(this.nums == 0){
					
				}else{ 
					this.nums--
				}
			},3000)
		},
		showRewardedVideoAd() {
			// 调用后会显示 loading 界面
			AD.show({
				adpid: 1507000689, // HBuilder 基座测试广告位
				adType: "RewardedVideo"
			}, (res) => {
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束
					console.log("onClose " + res.isEnded);
				} else {
					// 播放中途退出
					console.log("onClose " + res.isEnded);
				}
			}, (err) => {
				// 广告加载错误
				console.log(err)
			})
		},
		showFullScreenVideoAd() {
			// 调用后会显示 loading 界面
			AD.show({
				adpid: 1507000611, // HBuilder 基座测试广告位
				adType: "FullScreenVideo"
			}, (res) => {
				// 用户点击了【关闭广告】按钮
				if (res && res.isEnded) {
					// 正常播放结束
					console.log("onClose " + res.isEnded);
				} else {
					// 播放中途退出
					console.log("onClose " + res.isEnded);
				}
			}, (err) => {
				// 广告加载错误
				console.log(err)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.content{
	width: 100%;
	height: 100%;
}
.swiper{
	width: 100%;
	.swiper-item{
		width: 100%;
		height: 375rpx;
		.img{
			width: 100%;
			height: 100%;
		}
	}
}
.get-bag-box{
	width: 100%;
	position: relative;
	height: 700rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.device-name{
		font-size: 24rpx;
		color: #919191;
		position: absolute;
		left: 30rpx;
		top: 30rpx;
	}
	.notice{
		font-size: 24rpx;
		min-height: 17rpx;
		color: #60BA9E;
	}
	.btn{
		width: 586rpx;
		height: 100rpx;
		background: #60BA9E;
		opacity: 1;
		border-radius: 50rpx;
		font-size: 30rpx;
		color: #fff;
		line-height: 100rpx;
		margin: 20rpx 0;
		&.gray{
			background: #919191;
		}
	}
	.get-nums{
		font-size: 24rpx;
		color: #090909;
		.num{
			color: #FF0707;
			display: inline-block;
			margin: 0 8rpx;
		}
	}
	.result{
		padding: 18rpx 100rpx;
		color: #fff;
		font-size: 24rpx;
		background-color: #000000;
		position: absolute;
		bottom: 60rpx;
		opacity: 0.6;
	}
}
.ad-view{
	width: calc( 100% - 40rpx );
	margin: 0 auto;
	background-color: #E3E3E3;
	height: 140rpx;
	margin-bottom: 150rpx;
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
