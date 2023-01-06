<template>
	<view>
		<view class="search-box">
			<!-- 使用 uni-ui 提供的搜索组件 -->
			<uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入搜索内容"></uni-search-bar>
		</view>
	<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">
					{{ item.goods_name }}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题历史 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag custom-style="font-size: 12px;margin-right:5px" circle="true" size="normal" :inverted="true" type="default" :text="item" v-for="(item,i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 防抖 延时器
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索关键词的历史数据
				historyList: []
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			gotoDetail(goods_id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id' + goods_id
				})
			},
			input(e) {
				// 清除 timer 对应的延时器
				if (this.timer) {
					clearTimeout(this.timer)
				}
				// 重启延时器 并把 timerId 赋值给 this.timer
				this.timer = setTimeout(() => {
					// 如果 毫秒内，没有触发新的输入事件，则为关键词赋值
					this.kw = e
					this.getSearchList()
				}, 500)
			},
			async getSearchList() {
				if (this.kw.length === 0) {
					this.searchResults = []
					return
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					// 需要查询的参数
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				this.saveSearchHistory()
			},
			saveSearchHistory() {
				// 直接把搜索关键词 push 到 historyList 数组中
				// this.historyList.push(this.kw)
				
				// 解决关键词重复问题
				
				// 1.将 Array 数组转化为 Set 对象
				const set = new Set(this.historyList)
				// 2.调用 set 对象的 delete 方法,移除对应的元素
				set.delete(this.kw)
				// 3.调用 set 对象的 add 方法,向 Set 中添加元素
				set.add(this.kw)
				// 4.将 Set 对象转化为 Array 数组
				this.historyList = Array.from(set)
				 // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			cleanHistory() {
				// 清空 data 里面的数据
				this.historyList = []
				// 清空本地存储的数据
				uni.setStorageSync('kw',[])
			},
			gotoGoodsList(kw) {
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed:{
			historys() {
				// 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
				// 而是应该新建一个内存无关的数组，再进行 reverse 反转
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	// 实现搜索的 吸顶 效果
	.search-box {
		// 设置定位效果为“吸顶”  粘性布局
		position: sticky;
		// 吸顶的“位置”
		top: 0;
		// 提高层级，防止被轮播图覆盖
		z-index: 999;
	}

	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
.history-box {
		padding: 0 5px;

		.history-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 15px;
			border-bottom: 1px solid #efefef;
		}

		.history-list {
			display: flex;
			flex-wrap: wrap;
		}
	}
	
</style>
