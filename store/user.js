export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		token:uni.getStorageSync('token') || '',
		redirectInfo:null
	}),
	mutations: {
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStoreage')
		},
		saveAddressToStoreage(state) {
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		updateUserInfo(state,userinfo) {
			state.userinfo = userinfo
			
			this.commit('m_user/saveuserInfoToStoreage')
		},
		saveuserInfoToStoreage(state) {
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken(state,token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token',state.token)
		},
		// 重定向的信息对象
		updateRedirectInfo(state,info) {
			state.redirectInfo = info
		}
	},
	getters: {
		addstr(state) {
				if (!state.address.provinceName) return ''
		
				// 拼接省.市,区,详细地址, 的字符串并返回给用户
				return state.address.provinceName + state.address.cityName + state.address.countyName + state.address
					.detailInfo
			}
		},
}
