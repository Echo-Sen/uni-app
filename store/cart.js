export default {
	// 为当前模块开启命名空间
	namespaced: true,

	// 模块的 state 数据
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	// 模块的 mutations 方法
	mutations: {
		addToCart(state, goods) {
			// 根据提交的商品的 Id ,查询购物车是否存在这件商品
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 这里的 goods 在
		updateGoodsState(state, goods) {
			const findReult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findReult) {
				findReult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		updateGoodsCount(state, goods) {
			const findReult = state.cart.find(x => x.goods_id === goods.goods_id)

			if (findReult) {
				findReult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		},
	},

	// 模块的 getters 属性
	getters: {
		checkedCount(state) {
			// 先使用 filter 方法，从购物车中过滤器已勾选的商品
			// 再使用 reduce 方法，将已勾选的商品总数量进行累加
			// reduce() 的返回值就是已勾选的商品的总数量
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		total(state) {
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state)
				.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
				.toFixed(2)
		}
	}

}
