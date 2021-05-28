<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.login({
				success: function(res) {
					console.log(res)
					uni.request({
						url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc1c89066d8e48776&secret=0208a37397e5bb928d63a905cedd0540&js_code=' + res.code + '&grant_type=authorization_code',
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						method: 'post',
						success: (res)=>{
							console.log(res)
						}
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
