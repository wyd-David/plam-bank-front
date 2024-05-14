import { defineStore } from 'pinia'
import { Service } from '@/api/services/Service'
import type { IUserInfo } from './types/user.type'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {} as IUserInfo
    }
  },
  getters: {},
  actions: {
    // 获取用户数据
    async getUserData() {
      const res = await Service.updateUserInfoUsingGet1()
      if (res.code === 0) {
        this.userInfo = res.data as IUserInfo
      }
    },

    // 退出登录
    async logOut() {
      const res = await Service.logoutUsingPost()
      if (res.code === 0) {
        router.push({
          path: '/login'
        })
      }
    }
  }
})
