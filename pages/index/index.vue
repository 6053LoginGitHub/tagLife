<template>
	<view class="content">
		<view class="top" :style="{height: height }">
			<home v-if="active == 'bag'"></home>
			<backstage v-if="active == 'backstage'"></backstage>
			<agent v-if="active == 'agent'"></agent>
		</view>
		<tab-bar @currentPage="currentPage"></tab-bar>
	</view>
</template>

<script>
import home from './components/home.vue'
import tabBar from '../../components/tabBar.vue'
import backstage from './components/backstage.vue'
import agent from './components/agent.vue'
export default {
	components:{
		home,
		tabBar,
		backstage,
		agent
	},
	data() {
		return {
			active: 'bag',
			
			height: 0
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.height = res.windowHeight+"px"
			}
		});
	},
	methods: {
		/** 当前tabbar选中 */
		currentPage(val) {
			this.active = val
		},
	}
}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.top{
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
	
</style>
