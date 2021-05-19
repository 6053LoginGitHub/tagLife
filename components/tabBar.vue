<template>
	<view>
		<view class="tabbar">
			<view 
				class="tabbar-item"
				v-for="(item,index) in tabbars"
				:key="index"
				@click="tab(index, item)">
				<view class="img-bg" :class="index == 1 ? 'active' : ''">
					<image class="img" :src="item.active"></image>
				</view>
				<view class="text">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabBar",
		data() {
			return {
				currIndex: 0,
				active: 0,
				tabbars: [
					{
						name: "agent",
						title: "诚招代理",
						normal: require("../static/tabbar/person.png"),
						active: require("../static/tabbar/person.png")
					},
					{
						name: "bag",
						title: "免费领袋",
						normal: require("../static/tabbar/bag.png"),
						active: require("../static/tabbar/bag.png")
					},
					{
						name: "backstage",
						title: "代理后台",
						normal: require("../static/tabbar/backstage.png"),
						active: require("../static/tabbar/backstage.png")
					}
				]
			};
		},
		methods:{
			tab(index, val) {
				this.currIndex = index;
				this.$emit('currentPage', val.name)
			}
		}
	}
</script>

<style lang="scss" scoped>
.tabbar{
	width: 100%;
	height: 150rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background: url(../static/tabbar/tabbar-bg.png) no-repeat;
	background-size: 100%;
	.tabbar-item{
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		.img-bg{
			width: 73rpx;
			height: 73rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			&.active{
				background-color: #60BA9E;
				border-radius: 50%;
			}
		}
		.img{
			width: 34rpx;
			height: 34rpx;
		}
		.text{
			font-size: 24rpx;
			color: #BDBDBD;
		}
	}
}

</style>
