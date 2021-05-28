<template>
	<view class="content">
		<view class="title">
			<view class="text">欢迎使用</view>
			<view class="text">代理商管理后台</view>
		</view>
		<button class="login-btn" @click="login">代理商登录</button>
		<login ref="userLogin"></login>
	</view>
</template>

<script>
import login from '../../../components/login.vue'
export default {
	components: {
		login
	},
	methods:{
		login(){
			this.$refs.userLogin.open()
		}
	}
}
</script>

<style lang="scss" scoped>
.content{
	width: 100%;
	height: 100%;
	background-color: #76C9B0;
	.title{
		width: 100%;
		height: 484rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background: url(../../../static/home/backstage_bg.png) no-repeat;
		background-size: 100% 100%;
		.text{
			font-size: 70rpx;
			font-weight: bold;
			line-height: 100rpx;
			color: #fff;
			text-align: center;
			letter-spacing: 5rpx;
		}
	}
	.login-btn{
		width: calc(100% - 160rpx);
		height: 88rpx;
		background: rgba(250, 250, 250, 0.9);
		border-radius: 100rpx;
		margin-top: 218rpx;
		font-size: 30rpx;
		color: #5CB79B;
		font-weight: 400;
		line-height: 88rpx;
	}
}
</style>
