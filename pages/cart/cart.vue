<template>
	<view>
		<view class="cart-container" v-if="cart.length !== 0">
			<my-address></my-address>
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title">
				<!-- 左侧的图标 -->
				<uni-icons type="shop" size="18"></uni-icons>
				<!-- 右侧文本 -->
				<text class="cart-title-text">购物车</text>
			</view>
		
			<uni-swipe-action>
				<!-- 商品列表区域 -->
				<block v-for="(goods,i) in cart" :key="i">
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
						<!-- 使用的时候 传入展示勾选按钮 -->
						<my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
							@num-change="numberChangeHandler"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<!-- 结算区域 -->
			<my-settle></my-settle>
		</view>
		<!-- 空白购物车区域 -->
		<view class="empty-cart" v-else>
			<image src="/static/cart_empty@2x.png" class="empty-img"></image>
			<text class="tip-text">空空如也~</text>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: '删除', // 显示的文本内容
					style: {
						backgroundColor: '#C00000' // 按钮的背景颜色
					}
				}],
			}
		},
		computed: {
			...mapState('m_cart', ['cart']),
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
				this.setBadge()
			},
			// 点击了滑动操作按钮
			swipeActionClickHandler(goods) {
				this.removeGoodsById(goods.goods_id)
				this.setBadge()
			},
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			margin-left: 10px;
		}
	}

	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;

		.goods-name {
			font-size: 13px;
		}

		.goods-info-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.goods-price {
			font-size: 16px;
			color: #c00000;
		}
	}

	.cart-container {
		padding-bottom: 50px;
	}
	
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	
	  .empty-img {
	    width: 90px;
	    height: 90px;
	  }
	
	  .tip-text {
	    font-size: 12px;
	    color: gray;
	    margin-top: 15px;
	  }
	}
</style>
