<template>
	<view class="my-container">
		<!-- 用户未登录 -->
		<my-login v-if="!token">
			<my-login></my-login>
		</my-login>
		<!-- 用户登录后 -->
		<my-userinfo v-else>
			<my-userinfo></my-userinfo>
		</my-userinfo>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				
			}
		},
		computed:{
			...mapState('m_user',['token'])
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
