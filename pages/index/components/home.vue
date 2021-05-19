<template>
	<view class="content">
		<scroll-view :scroll-y="true" :style="{height: 'calc(' + height +' - 150rpx)'}">
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
				<button class="btn" :class="nums == 0 ? 'gray' : ''" :disabled="nums == 0" @click="receiveBag">免费领取可降解环保袋</button>
				<view class="get-nums">今日还可领取 <text class="num">{{ nums }}</text> 个</view>
				<view class="result" v-show="isSuccess">出袋成功</view>
			</view>
			
			<view class="ad-view">
				<!-- <ad unit-id="" ad-intervals="100"></ad> -->
			</view>
			
		</scroll-view>
		
		
	</view>
</template>

<script>
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
			height: 0
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
		receiveBag() {
			this.show = !this.show;
			this.$emit('overlayShow', this.show)
			setTimeout(()=>{
				this.show = !this.show;
				this.$emit('overlayShow', this.show)
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
	}
}
</script>

<style lang="scss" scoped>
.content{
	width: 100%;
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
}
</style>
