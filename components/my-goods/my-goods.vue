<template>
	<view>
		<view class="goods-item">
			<!-- 商品左侧图片区域 -->
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<!-- 商品右侧信息区域 -->
			<view class="goods-item-right">
				<!-- 商品标题 -->
				<view class="goods-name">
					{{ goods.goods_name }}
				</view>
				<view class="goods-info-box">
					<!-- 商品价格 -->
					<view class="goods-price">
						￥{{ goods.goods_price | tofixed }}
					</view>
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="radioChangeHandler"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		filters: {
			tofixed(num) {
				// 保留两位小数
				return Number(num).toFixed(2)
			}
		},
		data() {
			return {
				// 为防止某些商品的图片不存在， 需要在 data 中定义一个默认图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props: {
			// 商品的信息对象
			goods: {
				type: Object,
				default: {}
			},
			// 是否显示图片左侧的radio
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum:{
				type:Boolean,
				default:false
			},
		},
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			radioChangeHandler(val) {
				this.$emit('num-change',{
					// 商品的 Id
					goods_id:this.goods.goods_id,
					// 商品的最新数量
					goods_count: +val,
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		// 让 goods-item 项占满整个屏幕的宽度
		  width: 750rpx;
		  // 设置盒模型为 border-box
		  box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 5px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}

	.goods-item-left {
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.goods-pic {
			width: 100px;
			height: 100px;
			display: block;
		}
	}
</style>
