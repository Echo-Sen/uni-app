<template>
	<view>
	<view class="goods-list">
		<view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
			<my-goods :goods="item"></my-goods>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类 ID
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isloading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods: {
			// 跳转到商品详情页面
			gotoDetail(item) {
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			async getGoodsList(cb) {
				// 打开节流阀
				this.isloading = true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				// 关闭节流阀
				this.isloading = false
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				// 为数据赋值
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			}
		},
		onReachBottom() {
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total)  return uni.$showMsg('数据加载完毕!')
			// 判断是否正在请求数据，若是则退出
			if (this.isloading) return 
			// 让页码自增 +1
			this.queryObj.pagenum += 1
			// 重新回去列表数据
			this.getGoodsList()
		},
		onPullDownRefresh() {
			// 重置重要关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			
			// 重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
